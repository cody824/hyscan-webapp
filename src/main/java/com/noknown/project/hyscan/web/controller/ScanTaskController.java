package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.common.model.ConfigRepo;
import com.noknown.framework.common.service.GlobalConfigService;
import com.noknown.framework.common.util.DateUtil;
import com.noknown.framework.common.util.JsonUtil;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.framework.common.web.model.PageData;
import com.noknown.framework.common.web.model.SQLExpression;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.framework.common.web.model.SQLOrder;
import com.noknown.framework.fss.service.FileStoreService;
import com.noknown.framework.fss.service.FileStoreServiceRepo;
import com.noknown.project.hyscan.common.APP_TYPE;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.AlgoConfigRepo;
import com.noknown.project.hyscan.model.AlgoConfig;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.AppScanTask;
import com.noknown.project.hyscan.pojo.CommonResult;
import com.noknown.project.hyscan.pojo.DataSet;
import com.noknown.project.hyscan.pojo.DownloadInfo;
import com.noknown.project.hyscan.service.ScanTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.HtmlUtils;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class ScanTaskController extends BaseController {

	private final ScanTaskService taskService;

	private final FileStoreServiceRepo repo;

	private final AlgoConfigRepo acDao;

	private final GlobalConfigService globalConfigService;

	private final MessageSource messageSource;

	@Value("${hyscan.exportPath:/export/}")
	private String exportPath;

	@Autowired
	public ScanTaskController(ScanTaskService taskService, FileStoreServiceRepo repo, AlgoConfigRepo acDao, GlobalConfigService globalConfigService, MessageSource messageSource) {
		this.taskService = taskService;
		this.repo = repo;
		this.acDao = acDao;
		this.globalConfigService = globalConfigService;
		this.messageSource = messageSource;
	}


	@RequestMapping(value = "/scanTask/", method = RequestMethod.POST)
	public ResponseEntity<?> saveTask(@RequestBody AppScanTask<CommonResult> appTask)
			throws Exception {
		Authentication user = loginAuth();
		appTask.setUserId((Integer) user.getPrincipal());
		ScanTaskData data = appTask.toTaskData();
		if (!data.check()) {
			throw new WebException("数据不符合格式要求，请检测型号配置，或者重新进行定标设置后再采集");
		}
		taskService.saveScanTaskData(data);
		ScanTask task = appTask.toTaskInfo();
		taskService.update(task);
		return ResponseEntity.ok(task);
	}

	@RequestMapping(value = "/scanTask/", method = RequestMethod.DELETE)
	public ResponseEntity<?> delTask(@RequestBody String[] ids)
			throws Exception {
		for (String id : ids) {
			taskService.removeTask(id);
		}
		return ResponseEntity.ok(null);
	}

	@RequestMapping(value = "/scanTask/", method = RequestMethod.GET)
	public ResponseEntity<?> findScanTask(
			HttpSession httpSession,
			@RequestParam(required = false) String appId,
			@RequestParam(required = false) String model,
			@RequestParam(required = false, defaultValue = "{}") String filter,
			@RequestParam(required = false, defaultValue = "{}") String sort,
			@RequestParam(required = false, defaultValue = "0") int start,
			@RequestParam(required = false, defaultValue = "-1") int limit)
			throws Exception {
		filter = HtmlUtils.htmlUnescape(filter);
		sort = HtmlUtils.htmlUnescape(sort);
		PageData<?> tasks;
		SQLFilter sqlFilter = null;
		if (filter != null) {
			sqlFilter = JsonUtil.toObject(filter, SQLFilter.class);
		}
		if (sqlFilter == null) {
			sqlFilter = new SQLFilter();
		}
		if (sort != null) {
			List<SQLOrder> sortL = JsonUtil.toList(sort, SQLOrder.class);
			if (sortL != null) {
				for (SQLOrder order : sortL) {
					sqlFilter.addSQLOrder(order);
				}
			}
		}
		if (sqlFilter.getOrderList() == null || sqlFilter.getOrderList().isEmpty()) {
			sqlFilter.addSQLOrder(new SQLOrder("scanTime", "desc"));
		}

		if (StringUtil.isNotBlank(appId)) {
			sqlFilter.addSQLExpression("appId", "=", appId);
		} else {
			String[] appIds = supportApp();
			sqlFilter.addSQLExpression("appId", "in", appIds);

		}
		if (StringUtil.isNotBlank(model)) {
			sqlFilter.addSQLExpression("deviceModel", "=", model);
		}

		Set<String> serials = (Set<String>) httpSession.getAttribute("tenantSerials");
		if (serials != null) {
			sqlFilter.addSQLExpression("deviceSerial", SQLExpression.in, serials.toArray(new String[]{}));
		}
		tasks = taskService.find(sqlFilter, start, limit);
		return ResponseEntity.ok(tasks);
	}

	@RequestMapping(value = "/scanTask/img", method = RequestMethod.POST)
	public ResponseEntity<?> saveTaskImg(@RequestParam("file") MultipartFile uploadFile, @RequestParam String taskId) throws WebException, ServiceException, DaoException {
		Locale locale = LocaleContextHolder.getLocale();

		ScanTask task = taskService.get(taskId);
		if (task == null) {
			throw new WebException(messageSource.getMessage("task_not_found", null, locale));
		}

		InputStream is;
		try {
			is = uploadFile.getInputStream();
		} catch (IOException e) {
			throw new WebException(messageSource.getMessage("file_upload_failed", new Object[]{e.getLocalizedMessage()}, locale));
		}
		Date taskTime = task.getScanTime();
		DateUtil.getCurrentYear(taskTime);

		FileStoreService fss = repo.getOS(null);
		if (fss == null) {
			throw new WebException(messageSource.getMessage("file_server_not_config", null, locale));
		}

		String key = "taskImg/" + DateUtil.getCurrentYear(taskTime) + "/" +
				DateUtil.getCurrentMonth(taskTime) + "/" + DateUtil.getCurrentDay(taskTime) + "/" + taskId + ".png";
		String url;
		try {
			url = fss.put(is, key);
		} catch (IOException e) {
			e.printStackTrace();
			throw new WebException(messageSource.getMessage("img_server_error", new Object[]{e.getMessage()}, locale));
		}
		Map<String, String> ret = new HashMap<>(2);
		ret.put("taskId", taskId);
		ret.put("imagePath", url);
		task.setImagePath(url);
		taskService.update(task);
		return ResponseEntity.ok(ret);
	}



	@RequestMapping(value = "/scanTask/info/latest", method = RequestMethod.GET)
	public ResponseEntity<?> getLatestScanTask(@RequestParam(required = false) String appId) {
		ScanTask task = taskService.findLatestTask(appId);
		if (task == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(task);
		}
	}

	@RequestMapping(value = "/scanTask/info/{taskId}", method = RequestMethod.GET)
	public ResponseEntity<?> getScanTask(@PathVariable String taskId)
			throws Exception {
		ScanTask task = taskService.get(taskId);
		if (task == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(task);
		}
	}

	@RequestMapping(value = "/scanTask/info/{taskId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeScanTask(@PathVariable String taskId)
			throws Exception {
		taskService.removeTask(taskId);
		return ResponseEntity.ok(null);
	}

	@RequestMapping(value = "/scanTask/data/{taskId}", method = RequestMethod.GET)
	public ResponseEntity<?> getScanTaskData(@PathVariable String taskId)
			throws Exception {
		Locale locale = LocaleContextHolder.getLocale();
		ScanTaskData data = taskService.getData(taskId);
		if (data == null) {
			throw new WebException(messageSource.getMessage("data_not_exist", null, locale), HttpStatus.NOT_FOUND);
		} else {
			return ResponseEntity.ok(data);
		}
	}

	@RequestMapping(value = "/scanTask/appData/{taskId}", method = RequestMethod.GET)
	public ResponseEntity<?> getAppScanTask(@PathVariable String taskId, @RequestParam(required = false, defaultValue = "true") boolean containData)
			throws Exception {
		ScanTask task = taskService.get(taskId);
		AppScanTask<CommonResult> appScanTask;
		if (task == null) {
			return ResponseEntity.notFound().build();
		}
		Properties dict = null;
		ConfigRepo repo = globalConfigService.getConfigRepo(Constants.RESULT_DICT_CONFIG, true);
		if (repo != null) {
			dict = repo.getConfigs().get(task.getAppId());
		}
		if (dict == null) {
			dict = new Properties();
		}
		Map<String, AlgoConfig> algoConfigMap = new HashMap<>(10);

		AlgoConfig algoConfig = algoConfigMap.get(task.getDeviceModel());
		if (algoConfig == null) {
			try {
				algoConfig = acDao.get(task.getAppId() + "-" + task.getDeviceModel());
			} catch (DaoException e) {
				e.printStackTrace();
			}
		}
		if (algoConfig != null) {
			DataSet dataSet = null;
			appScanTask = task.toAppScanTask(algoConfig.getAlgos(), dict, null);
			if (containData) {
				ScanTaskData data = taskService.getData(taskId);
				dataSet = new DataSet();
				dataSet.setDn(data.getDn());
				dataSet.setDnList(data.getDnList());
				dataSet.setWhiteboardData(data.getWhiteboardData());
				dataSet.setDarkCurrent(data.getDarkCurrent());
				appScanTask.getDevice().setSpectralRange(data.getRange());
			}
			appScanTask.setData(dataSet);
		} else {
			Locale locale = LocaleContextHolder.getLocale();
			throw new WebException(messageSource.getMessage("config_not_exist", null, locale), 403);
		}
		return ResponseEntity.ok(appScanTask);
	}

	@RequestMapping(value = "/scanTask/export/", method = RequestMethod.POST)
	public ResponseEntity<?> exportByFilter(@RequestParam(required = false) String appId,
	                                        @RequestParam(required = false) String model,
	                                        @RequestParam(required = false) String filter,
	                                        @RequestParam(required = false, defaultValue = "json") String exportType)
			throws Exception {
		filter = HtmlUtils.htmlUnescape(filter);
		SQLFilter sqlFilter = null;
		if (filter != null) {
			sqlFilter = JsonUtil.toObject(filter, SQLFilter.class);
		}
		if (StringUtil.isNotBlank(appId)) {
			if (sqlFilter == null) {
				sqlFilter = new SQLFilter();
			}
			sqlFilter.addSQLExpression("appId", "=", appId);
		}
		if (StringUtil.isNotBlank(model)) {
			if (sqlFilter == null) {
				sqlFilter = new SQLFilter();
			}
			sqlFilter.addSQLExpression("deviceModel", "=", model);
		}
		DownloadInfo downloadInfo = taskService.exportScanTaskPackage(sqlFilter, exportType);
		File file = new File(downloadInfo.getFilePath());
		String url = exportPath + file.getName();
		downloadInfo.setUrl(url);
		return ResponseEntity.ok(downloadInfo);

	}

	@RequestMapping(value = "/scanTask/export/{taskId}", method = RequestMethod.POST)
	public ResponseEntity<?> exportOne(@PathVariable String taskId,
	                                   @RequestParam(required = false, defaultValue = "json") String exportType)
			throws Exception {
		DownloadInfo downloadInfo = taskService.exportScanTask(taskId, exportType);
		File file = new File(downloadInfo.getFilePath());
		String url = exportPath + file.getName();
		downloadInfo.setUrl(url);
		return ResponseEntity.ok(downloadInfo);

	}

	private String[] supportApp() {
		List<String> appIds = new ArrayList<>();
		if (this.hasRole("ROLE_ADMIN")) {
			if (this.hasRole(Constants.ROLE_HYSCAN_ADMIN)) {
				appIds.add(APP_TYPE.caizhi.name());
			}
			if (this.hasRole(Constants.ROLE_WQ_ADMIN)) {
				appIds.add(APP_TYPE.shuise.name());
			}
			if (this.hasRole(Constants.ROLE_NONGSE_ADMIN)) {
				appIds.add(APP_TYPE.nongse.name());
			}
			if (this.hasRole(Constants.ROLE_MEISE_ADMIN)) {
				appIds.add(APP_TYPE.meise.name());
			}
		} else if (hasRole(Constants.ROLE_TENANT_ADMIN)) {
			if (this.hasRole(Constants.ROLE_HYSCAN_TENANT)) {
				appIds.add(APP_TYPE.caizhi.name());
			}
			if (this.hasRole(Constants.ROLE_WQ_TENANT)) {
				appIds.add(APP_TYPE.shuise.name());
			}
			if (this.hasRole(Constants.ROLE_NONGSE_TENANT)) {
				appIds.add(APP_TYPE.nongse.name());
			}
			if (this.hasRole(Constants.ROLE_MEISE_TENANT)) {
				appIds.add(APP_TYPE.meise.name());
			}
		}
		return appIds.toArray(new String[]{});
	}


}
