package com.noknown.project.hyscan.web.controller;

import com.google.common.util.concurrent.ThreadFactoryBuilder;
import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.common.service.GlobalConfigService;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.framework.common.web.model.PageData;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.framework.common.web.model.SQLOrder;
import com.noknown.framework.security.authentication.SureApiAuthToken;
import com.noknown.framework.security.model.User;
import com.noknown.framework.security.service.ApiKeyService;
import com.noknown.project.hyscan.common.APP_TYPE;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.Tenant;
import com.noknown.project.hyscan.pojo.ApiTaskData;
import com.noknown.project.hyscan.pojo.ApiUploadData;
import com.noknown.project.hyscan.service.AnalysisService;
import com.noknown.project.hyscan.service.AppService;
import com.noknown.project.hyscan.service.ScanTaskService;
import com.noknown.project.hyscan.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.concurrent.*;

/**
 * 任务api
 *
 * @author guodong
 */
@Controller
@RequestMapping("/api/")
public class TaskApiController extends BaseController {

	private final static long EXPIRE_TIME = 1000 * 60 * 5;

	private final ApiKeyService apiKeyService;

	private final GlobalConfigService globalConfigService;

	private final MessageSource messageSource;

	private final AppService appService;

	private final AnalysisService analysisService;

	private final ScanTaskService scanTaskService;

	private final TenantService tenantService;

	private final BlockingQueue<List<ScanTask>> blockingDeque = new LinkedBlockingQueue<>();

	private ExecutorService analysisExecutor;

	@Autowired
	public TaskApiController(ApiKeyService apiKeyService, GlobalConfigService globalConfigService, MessageSource messageSource, AppService appService, AnalysisService analysisService, ScanTaskService scanTaskService, TenantService tenantService) {
		this.apiKeyService = apiKeyService;
		this.globalConfigService = globalConfigService;
		this.messageSource = messageSource;
		this.appService = appService;
		this.analysisService = analysisService;
		this.scanTaskService = scanTaskService;
		this.tenantService = tenantService;
	}

	@PostConstruct
	void init() {
		analysisExecutor = new ThreadPoolExecutor(1, 1,
				0L, TimeUnit.MILLISECONDS,
				new LinkedBlockingQueue<>(8), new ThreadFactoryBuilder().setNameFormat("analysisThread-%d").build());
		Runnable runnable = new AnalysisRunnable();
		analysisExecutor.execute(runnable);
	}

	/**
	 * 保存任务
	 */
	@RequestMapping(value = "/task/{appId}", method = RequestMethod.POST)
	public ResponseEntity<?> saveTask(HttpServletRequest request, @PathVariable String appId, @RequestParam String sign, @RequestParam("access_key") String accessKey, @RequestParam("sign_method") String signMethod, @RequestParam long timestamp, @RequestBody ApiUploadData apiData)
			throws Exception {
		Locale locale = LocaleContextHolder.getLocale();

		Properties properties = globalConfigService.getProperties(Constants.APP_ALGO_CONFIG, appId, false);
		if (properties == null) {
			throw new WebException(messageSource.getMessage("app_type_do_not_support", null, locale), -1);
		}
		long now = System.currentTimeMillis();
		if (now - timestamp > EXPIRE_TIME) {
			throw new WebException(messageSource.getMessage("request_expire", null, locale), -2);
		}

		SureApiAuthToken token = new SureApiAuthToken(null);
		Map<String, String[]> paramsMap = request.getParameterMap();
		Map<String, String> params = new HashMap<>(10);
		paramsMap.forEach((key, values) -> params.put(key, StringUtil.join(values, ",")));
		params.remove("sign");
		token.setAccessKey(accessKey).setSign(sign).setParams(params).setTimestamp(timestamp).setSignMethod(signMethod);
		User user = apiKeyService.check(token);

		String oldAppId = "wq";

		//处理遗留问题
		if (oldAppId.equals(appId)) {
			appId = "shuise";
		}
		apiData.setAppId(appId);

		List<ScanTask> scanTaskList = appService.buildScanTask(apiData, user.getId(), locale);
		blockingDeque.put(scanTaskList);
		return ResponseEntity.ok(scanTaskList);
	}

	/**
	 * 保存任务
	 */
	@RequestMapping(value = "/task/", method = RequestMethod.POST)
	public ResponseEntity<?> saveTaskNew(HttpServletRequest request, @RequestParam String appId, @RequestParam String sign, @RequestParam("access_key") String accessKey, @RequestParam("sign_method") String signMethod, @RequestParam long timestamp, @RequestBody ApiUploadData apiData)
			throws Exception {
		Locale locale = LocaleContextHolder.getLocale();

		Properties properties = globalConfigService.getProperties(Constants.APP_ALGO_CONFIG, appId, false);
		if (properties == null) {
			throw new WebException(messageSource.getMessage("app_type_do_not_support", null, locale), -1);
		}
		long now = System.currentTimeMillis();
		if (now - timestamp > EXPIRE_TIME) {
			throw new WebException(messageSource.getMessage("request_expire", null, locale), -2);
		}

		SureApiAuthToken token = new SureApiAuthToken(null);
		Map<String, String[]> paramsMap = request.getParameterMap();
		Map<String, String> params = new HashMap<>(10);
		paramsMap.forEach((key, values) -> params.put(key, StringUtil.join(values, ",")));
		params.remove("sign");
		token.setAccessKey(accessKey).setSign(sign).setParams(params).setTimestamp(timestamp).setSignMethod(signMethod);
		User user = apiKeyService.check(token);

		String oldAppId = "wq";

		//处理遗留问题
		if (oldAppId.equals(appId)) {
			appId = "shuise";
		}
		apiData.setAppId(appId);

		List<ScanTask> scanTaskList = appService.buildScanTask(apiData, user.getId(), locale);
		blockingDeque.put(scanTaskList);
		return ResponseEntity.ok(scanTaskList);
	}


	/**
	 * 获取任务信息
	 */
	@RequestMapping(value = "/task/{taskId}/info", method = RequestMethod.GET)
	public ResponseEntity<?> getTaskInfo(HttpServletRequest request, @PathVariable String taskId, @RequestParam String sign, @RequestParam("access_key") String accessKey, @RequestParam("sign_method") String signMethod, @RequestParam long timestamp)
			throws Exception {
		Locale locale = request.getLocale();

		long now = System.currentTimeMillis();
		if (now - timestamp > EXPIRE_TIME) {
			throw new WebException(messageSource.getMessage("request_expire", null, locale), -2);
		}

		SureApiAuthToken token = new SureApiAuthToken(null);
		Map<String, String[]> paramsMap = request.getParameterMap();
		Map<String, String> params = new HashMap<>(10);
		paramsMap.forEach((key, values) -> params.put(key, StringUtil.join(values, ",")));
		params.remove("sign");
		token.setAccessKey(accessKey).setSign(sign).setParams(params).setTimestamp(timestamp).setSignMethod(signMethod);
		User user = apiKeyService.check(token);

		ScanTask task = scanTaskService.get(taskId);

		if (task == null) {
			throw new ServiceException(messageSource.getMessage("task_not_found", null, "任务不存在", locale));
		}
		Set<String> supportApps = supportApp(user);
		Set<String> serials = new HashSet<>(20);
		boolean isTenant = false;
		if (supportApps.size() == 0) {
			List<Tenant> tenantList = tenantService.findByAdminId(user.getId());
			for (Tenant tenant : tenantList) {
				isTenant = true;
				String[] apps = tenant.getAppIds().split(",");
				for (String app : apps) {
					supportApps.add(app);
				}
				if (StringUtil.isNotBlank(tenant.getSerials())) {
					String[] serialArr = tenant.getSerials().split(",");
					for (String s : serialArr) {
						if (!serials.contains(s)) {
							serials.add(s);
						}
					}
				}
			}
		}
		if (supportApps.isEmpty()) {
			throw new WebException(messageSource.getMessage("no_app_has_access_privileges", null, locale));
		}
		if (!supportApps.contains(task.getAppId())) {
			throw new WebException(messageSource.getMessage("not_permit_for_app_data", null, locale));
		}
		if (isTenant) {
			if (!serials.contains(task.getDeviceSerial())) {
				throw new WebException(messageSource.getMessage("not_permit_for_device_data", null, locale));
			}
		}
		return ResponseEntity.ok(task);
	}

	/**
	 * 获取任务数据
	 */
	@RequestMapping(value = "/task/{taskId}/data", method = RequestMethod.GET)
	public ResponseEntity<?> getTaskData(
			HttpServletRequest request,
			@PathVariable String taskId,
			@RequestParam String sign,
			@RequestParam("access_key") String accessKey,
			@RequestParam("sign_method") String signMethod,
			@RequestParam long timestamp)
			throws Exception {
		Locale locale = request.getLocale();

		long now = System.currentTimeMillis();
		if (Math.abs(now - timestamp) > EXPIRE_TIME) {
			throw new WebException(messageSource.getMessage("request_expire", null, locale), -2);
		}

		SureApiAuthToken token = new SureApiAuthToken(null);
		Map<String, String[]> paramsMap = request.getParameterMap();
		Map<String, String> params = new HashMap<>(10);
		paramsMap.forEach((key, values) -> params.put(key, StringUtil.join(values, ",")));
		params.remove("sign");
		token.setAccessKey(accessKey).setSign(sign).setParams(params).setTimestamp(timestamp).setSignMethod(signMethod);
		User user = apiKeyService.check(token);
		ScanTask scanTask = scanTaskService.get(taskId);
		if (scanTask == null) {
			throw new ServiceException(messageSource.getMessage("task_not_found", null, "任务不存在", locale));
		}
		Set<String> supportApps = supportApp(user);
		Set<String> serials = new HashSet<>(20);
		boolean isTenant = false;
		if (supportApps.size() == 0) {
			List<Tenant> tenantList = tenantService.findByAdminId(user.getId());
			for (Tenant tenant : tenantList) {
				isTenant = true;
				String[] apps = tenant.getAppIds().split(",");
				for (String app : apps) {
					supportApps.add(app);
				}
				if (StringUtil.isNotBlank(tenant.getSerials())) {
					String[] serialArr = tenant.getSerials().split(",");
					for (String s : serialArr) {
						if (!serials.contains(s)) {
							serials.add(s);
						}
					}
				}
			}
		}
		if (supportApps.isEmpty()) {
			throw new WebException(messageSource.getMessage("no_app_has_access_privileges", null, locale));
		}
		if (!supportApps.contains(scanTask.getAppId())) {
			throw new WebException(messageSource.getMessage("not_permit_for_app_data", null, locale));
		}
		if (isTenant) {
			if (!serials.contains(scanTask.getDeviceSerial())) {
				throw new WebException(messageSource.getMessage("not_permit_for_device_data", null, locale));
			}
		}
		ApiTaskData data = scanTaskService.getApiData(taskId);
		return ResponseEntity.ok(data);
	}

	/**
	 * 查询任务数据
	 */
	@RequestMapping(value = "/task/", method = RequestMethod.GET)
	public ResponseEntity<?> findTask(HttpServletRequest request,
	                                  @RequestParam String sign,
	                                  @RequestParam("access_key") String accessKey,
	                                  @RequestParam("sign_method") String signMethod,
	                                  @RequestParam long timestamp,
	                                  @RequestParam(name = "app_id", required = false) String appId,
	                                  @RequestParam(required = false) String model,
	                                  @RequestParam(required = false) String serial,
	                                  @RequestParam(required = false) Long begin,
	                                  @RequestParam(required = false) Long end,
	                                  @RequestParam(name = "target", required = false) String scanTarget,
	                                  @RequestParam(required = false, defaultValue = "0") int start,
	                                  @RequestParam(required = false, defaultValue = "10") int limit)
			throws Exception {
		Locale locale = LocaleContextHolder.getLocale();

		long now = System.currentTimeMillis();
		if (Math.abs(now - timestamp) > EXPIRE_TIME) {
			throw new WebException(messageSource.getMessage("request_expire", null, locale), -2);
		}

		SureApiAuthToken token = new SureApiAuthToken(null);
		Map<String, String[]> paramsMap = request.getParameterMap();
		Map<String, String> params = new HashMap<>(10);
		paramsMap.forEach((key, values) -> params.put(key, StringUtil.join(values, ",")));
		params.remove("sign");
		token.setAccessKey(accessKey).setSign(sign).setParams(params).setTimestamp(timestamp).setSignMethod(signMethod);
		User user = apiKeyService.check(token);

		SQLFilter sqlFilter = new SQLFilter();
		sqlFilter.addSQLOrder(new SQLOrder("scanTime", "desc"));


		Set<String> supportApps = supportApp(user);
		Set<String> serials = new HashSet<>(20);
		boolean isTenant = false;
		if (supportApps.size() == 0) {
			List<Tenant> tenantList = tenantService.findByAdminId(user.getId());
			for (Tenant tenant : tenantList) {
				isTenant = true;
				String[] apps = tenant.getAppIds().split(",");
				for (String app : apps) {
					supportApps.add(app);
				}
				if (StringUtil.isNotBlank(tenant.getSerials())) {
					String[] serialArr = tenant.getSerials().split(",");
					for (String s : serialArr) {
						if (!serials.contains(s)) {
							serials.add(s);
						}
					}
				}
			}
		}
		if (supportApps.isEmpty()) {
			throw new WebException(messageSource.getMessage("no_app_has_access_privileges", null, locale));
		}
		if (StringUtil.isNotBlank(appId)) {
			if (!supportApps.contains(appId)) {
				throw new WebException(messageSource.getMessage("not_permit_for_app_data", null, locale));
			}
			sqlFilter.addSQLExpression("appId", "=", appId);
		} else {
			sqlFilter.addSQLExpression("appId", "in", supportApps.toArray(new String[]{}));
		}

		if (isTenant) {
			if (StringUtil.isNotBlank(serial)) {
				if (!serials.contains(serial)) {
					throw new WebException(messageSource.getMessage("not_permit_for_device_data", null, locale));
				}
				sqlFilter.addSQLExpression("deviceSerial", "=", serial);
			} else {
				sqlFilter.addSQLExpression("deviceSerial", "in", serials.toArray(new String[]{}));
			}
		} else {
			if (StringUtil.isNotBlank(serial)) {
				sqlFilter.addSQLExpression("deviceSerial", "=", serial);
			}
		}

		if (StringUtil.isNotBlank(model)) {
			sqlFilter.addSQLExpression("deviceModel", "=", model);
		}

		if (StringUtil.isNotBlank(scanTarget)) {
			sqlFilter.addSQLExpression("scanTarget", "=", scanTarget);
		}

		if (begin != null || end != null) {
			Date beginDate = begin == null ? new Date(0) : new Date(begin);
			Date endDate = end == null ? new Date() : new Date(end);
			sqlFilter.addSQLExpression("scanTime", "between", new Date[]{beginDate, endDate});
		}
		PageData<ScanTask> pageData = scanTaskService.find(sqlFilter, start, limit);
		return ResponseEntity.ok(pageData);
	}

	@RequestMapping(value = "/timestamp", method = RequestMethod.GET)
	public @ResponseBody
	Object timestamp() {
		return System.currentTimeMillis();
	}


	private Set<String> supportApp(User user) {
		Set<String> appIds = new HashSet<>();
		if (this.hasRole("ROLE_ADMIN")) {
			if (user.hasRole(Constants.ROLE_HYSCAN_ADMIN)) {
				appIds.add(APP_TYPE.caizhi.name());
			}
			if (user.hasRole(Constants.ROLE_WQ_ADMIN)) {
				appIds.add(APP_TYPE.shuise.name());
			}
			if (user.hasRole(Constants.ROLE_NONGSE_ADMIN)) {
				appIds.add(APP_TYPE.nongse.name());
			}
			if (user.hasRole(Constants.ROLE_MEISE_ADMIN)) {
				appIds.add(APP_TYPE.meise.name());
			}
		}
		return appIds;
	}

	class AnalysisRunnable implements Runnable {

		@Override
		public void run() {
			while (true) {
				try {
					List<ScanTask> scanTasks = blockingDeque.take();
					for (ScanTask task : scanTasks) {
						try {
							analysisService.analysis(task.getId(), null);
						} catch (ServiceException | DaoException e) {
							logger.error(e.getLocalizedMessage());
						}
					}
				} catch (InterruptedException e) {
					break;
				}
			}

		}
	}
}
