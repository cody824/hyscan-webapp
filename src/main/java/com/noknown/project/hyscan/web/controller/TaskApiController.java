package com.noknown.project.hyscan.web.controller;

import com.google.common.util.concurrent.ThreadFactoryBuilder;
import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.common.service.GlobalConfigService;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.framework.security.authentication.SureApiAuthToken;
import com.noknown.framework.security.model.User;
import com.noknown.framework.security.service.ApiKeyService;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.pojo.ApiUploadData;
import com.noknown.project.hyscan.service.AppService;
import com.noknown.project.hyscan.service.SpectralAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
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

	private final SpectralAnalysisService analysisService;

	private final BlockingQueue<List<ScanTask>> blockingDeque = new LinkedBlockingQueue<>();

	private ExecutorService analysisExecutor;

	@Autowired
	public TaskApiController(ApiKeyService apiKeyService, GlobalConfigService globalConfigService, MessageSource messageSource, AppService appService, SpectralAnalysisService analysisService) {
		this.apiKeyService = apiKeyService;
		this.globalConfigService = globalConfigService;
		this.messageSource = messageSource;
		this.appService = appService;
		this.analysisService = analysisService;
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
		Locale locale = request.getLocale();

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

		apiData.setAppId(appId);

		List<ScanTask> scanTaskList = appService.buildScanTask(apiData, user.getId(), locale);
		blockingDeque.put(scanTaskList);
		return ResponseEntity.ok(scanTaskList);
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
