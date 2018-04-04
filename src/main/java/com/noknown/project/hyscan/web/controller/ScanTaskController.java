package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.common.util.DateUtil;
import com.noknown.framework.common.util.JsonUtil;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.framework.common.web.model.PageData;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.framework.common.web.model.SQLOrder;
import com.noknown.framework.fss.service.FileStoreService;
import com.noknown.framework.fss.service.FileStoreServiceRepo;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.AppScanTask;
import com.noknown.project.hyscan.pojo.DownloadInfo;
import com.noknown.project.hyscan.pojo.MaterialResult;
import com.noknown.project.hyscan.pojo.WqResult;
import com.noknown.project.hyscan.service.ScanTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.HtmlUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class ScanTaskController extends BaseController {

	private final ScanTaskService taskService;

	private final FileStoreServiceRepo repo;

	@Value("${hyscan.exportPath:/export/}")
	private String exportPath;

	@Autowired
	public ScanTaskController(ScanTaskService taskService, FileStoreServiceRepo repo) {
		this.taskService = taskService;
		this.repo = repo;
	}

	@Deprecated
	@RequestMapping(value = "/scanTask/", method = RequestMethod.POST)
	public ResponseEntity<?> saveTask(@RequestBody AppScanTask<MaterialResult> appTask)
			throws Exception {
		Authentication user = loginAuth();
		if (user == null) {
			throw new WebException("请登录");
		}
		appTask.setUserId((Integer) user.getPrincipal());
		ScanTaskData data = appTask.toTaskData();
		taskService.saveScanTaskData(data);
		ScanTask task = appTask.toTaskInfo();
		taskService.update(task);
		return ResponseEntity.ok(task);
	}

	/**
	 * 保存材质检测任务
	 */
	@RequestMapping(value = "/scanTask/material", method = RequestMethod.POST)
	public ResponseEntity<?> saveMaterialTask(@RequestBody AppScanTask<MaterialResult> appTask)
			throws Exception {
		Authentication user = loginAuth();
		if (user == null) {
			throw new WebException("请登录");
		}
		appTask.setUserId((Integer) user.getPrincipal());
		ScanTaskData data = appTask.toTaskData();
		taskService.saveScanTaskData(data);
		ScanTask task = appTask.toTaskInfo();
		taskService.update(task);
		return ResponseEntity.ok(task);
	}

	/**
	 * 保存水质检测任务
	 */
	@RequestMapping(value = "/scanTask/wq", method = RequestMethod.POST)
	public ResponseEntity<?> saveWQTask(@RequestBody AppScanTask<WqResult> appTask)
			throws Exception {
		Authentication user = loginAuth();
		if (user == null) {
			throw new WebException("请登录");
		}
		appTask.setUserId((Integer) user.getPrincipal());
		ScanTaskData data = appTask.toTaskData();
		taskService.saveScanTaskData(data);
		ScanTask task = appTask.toTaskInfo();
		taskService.update(task);
		return ResponseEntity.ok(task);
	}

	@RequestMapping(value = "/scanTask/img", method = RequestMethod.POST)
	public ResponseEntity<?> saveTaskImg(@RequestParam("file") MultipartFile uploadFile, @RequestParam String taskId) throws WebException, ServiceException, DaoException {
		ScanTask task = taskService.get(taskId);
		if (task == null) {
			throw new WebException("任务不存在");
		}

		InputStream is;
		try {
			is = uploadFile.getInputStream();
		} catch (IOException e) {
			throw new WebException("文件上传失败！");
		}
		Date taskTime = task.getScanTime();
		DateUtil.getCurrentYear(taskTime);

		FileStoreService fss = repo.getOS(null);
		if (fss == null) {
			throw new WebException("没有配置图片服务器");
		}

		String key = "taskImg/" + DateUtil.getCurrentYear(taskTime) + "/" +
				DateUtil.getCurrentMonth(taskTime) + "/" + DateUtil.getCurrentDay(taskTime) + "/" + taskId + ".png";
		String url;
		try {
			url = fss.put(is, key);
		} catch (IOException e) {
			e.printStackTrace();
			throw new WebException("图片服务错误：" + e.getLocalizedMessage());
		}
		Map<String, String> ret = new HashMap<>(2);
		ret.put("taskId", taskId);
		ret.put("imagePath", url);
		task.setImagePath(url);
		taskService.update(task);
		return ResponseEntity.ok(ret);
	}

	@RequestMapping(value = "/scanTask/", method = RequestMethod.GET)
	public ResponseEntity<?> findScanTask(@RequestParam(required = false) String appId,
	                                      @RequestParam(required = false) String model,
	                                      @RequestParam(required = false) String filter,
	                                      @RequestParam(required = false) String sort,
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
		} else {
			sqlFilter.addSQLOrder(new SQLOrder("scanTime", "desc"));
		}
		if (StringUtil.isNotBlank(appId)) {
			sqlFilter.addSQLExpression("appId", "=", appId);
		}
		if (StringUtil.isNotBlank(model)) {
			sqlFilter.addSQLExpression("deviceModel", "=", model);
		}
		tasks = taskService.find(sqlFilter, start, limit);
		return ResponseEntity.ok(tasks);
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
		ScanTaskData data = taskService.getData(taskId);
		if (data == null) {
			throw new WebException("数据不存在", HttpStatus.NOT_FOUND);
		} else {
			return ResponseEntity.ok(data);
		}
	}

	@RequestMapping(value = "/scanTask/export/", method = RequestMethod.POST)
	public ResponseEntity<?> exportByFilter(@RequestParam(required = false) String appId,
	                                        @RequestParam(required = false) String model,
	                                        @RequestParam(required = false) String filter)
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
		DownloadInfo downloadInfo = taskService.exportScanTaskPackage(sqlFilter);
		File file = new File(downloadInfo.getFilePath());
		String url = exportPath + file.getName();
		downloadInfo.setUrl(url);
		return ResponseEntity.ok(downloadInfo);

	}

	@RequestMapping(value = "/scanTask/export/{taskId}", method = RequestMethod.POST)
	public ResponseEntity<?> exportOne(@PathVariable String taskId)
			throws Exception {
		DownloadInfo downloadInfo = taskService.exportScanTask(taskId);
		File file = new File(downloadInfo.getFilePath());
		String url = exportPath + file.getName();
		downloadInfo.setUrl(url);
		return ResponseEntity.ok(downloadInfo);

	}


}
