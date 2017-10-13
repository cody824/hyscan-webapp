package com.noknown.project.hyscan.web.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.HtmlUtils;

import com.alibaba.media.MediaFile;
import com.alibaba.media.Result;
import com.alibaba.media.client.MediaClient;
import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.common.util.DateUtil;
import com.noknown.framework.common.util.JsonUtil;
import com.noknown.framework.common.web.model.PageData;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.framework.common.web.model.SQLOrder;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.AppScanTask;
import com.noknown.project.hyscan.service.ScanTaskService;

@RestController
@RequestMapping(value = Constants.appBaseUrl)
public class ScanTaskController extends BaseController {

	@Autowired
	private ScanTaskService taskService;
	
	@Autowired
	private MediaClient mediaClient;

	@RequestMapping(value = "/scanTask/", method = RequestMethod.POST)
	public ResponseEntity<?> saveTask(@RequestBody AppScanTask appTask)
			throws Exception {
		Authentication user = loginAuth();
		if (user == null)
			throw new WebException("请登录");
		appTask.setUserId((Integer)user.getPrincipal());
		ScanTask task = taskService.saveTask(appTask);
		return ResponseEntity.ok(task);
	}
	
	@RequestMapping(value = "/scanTask/img", method = RequestMethod.POST)
	public ResponseEntity<?> saveTaskImg(HttpServletResponse response, @RequestParam("file") MultipartFile uploadFile, @RequestParam String taskId) throws WebException, ServiceException, DAOException
		{
		ScanTask task = taskService.get(taskId);
		if (task == null)
			throw new WebException("任务不存在");
		
		InputStream is;
		try {
			is = uploadFile.getInputStream();
		} catch (IOException e) {
			throw new WebException("文件上传失败！");
		}
		Date taskTime = task.getScanTime();
		DateUtil.getCurrentYear(taskTime);
		Result<MediaFile> mf = mediaClient.upload("/taskImg/" + DateUtil.getCurrentYear(taskTime) + "/" + 
				DateUtil.getCurrentMonth(taskTime)+ "/" + DateUtil.getCurrentDay(taskTime), taskId + ".png", is, uploadFile.getSize());
		Map<String, String> ret = new HashMap<>();
		
		
		ret.put("taskId", taskId);
		if (mf.getHttpStatus() == 200) {
			ret.put("imagePath", mf.getData().getUrl());
			task.setImagePath(mf.getData().getUrl());
			taskService.updateTask(task);
		} else {
			throw new WebException("图片服务错误：" + mf.getHttpStatus());
		}
		return ResponseEntity.ok(ret);
	}
	
	@RequestMapping(value = "/scanTask/", method = RequestMethod.GET)
	public ResponseEntity<?> findScanTask(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value = "filter", required = false) String filter,
			@RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "start", required = false, defaultValue = "0") int start,
			@RequestParam(value = "limit", required = false, defaultValue = "-1") int limit)
			throws Exception {
		filter = HtmlUtils.htmlUnescape(filter);
		sort = HtmlUtils.htmlUnescape(sort);
		PageData<?> tasks;
		SQLFilter sqlFilter = null;
		if (filter != null) {
			sqlFilter = JsonUtil.toObject(filter, SQLFilter.class);
		}
		if (sort != null) {
			if (sqlFilter == null)
				sqlFilter = new SQLFilter();

			List<SQLOrder> sortL = JsonUtil.toList(sort, SQLOrder.class);
			for (SQLOrder order : sortL) {
				sqlFilter.addSQLOrder(order);
			}
		} else {
			sqlFilter.addSQLOrder(new SQLOrder("scanTime", "desc"));
		}
		tasks = taskService.find(sqlFilter, start, limit);
		return ResponseEntity.ok(tasks);
	}
	
	@RequestMapping(value = "/scanTask/info/{taskId}", method = RequestMethod.GET)
	public ResponseEntity<?> getScanTask(@PathVariable String taskId)
			throws Exception {
		ScanTask task = taskService.get(taskId);
		if (task == null)
			return ResponseEntity.notFound().build();
		else 
			return ResponseEntity.ok(task);
	}
	
	@RequestMapping(value = "/scanTask/info/{taskId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeScanTask(@PathVariable String taskId)
			throws Exception {
		taskService.removeTask(taskId);;
		return ResponseEntity.ok(null);
	}
	
	@RequestMapping(value = "/scanTask/data/{taskId}", method = RequestMethod.GET)
	public ResponseEntity<?> getScanTaskData(@PathVariable String taskId)
			throws Exception {
		ScanTaskData data = taskService.getData(taskId);
		if (data == null)
			throw new WebException("数据不存在", HttpStatus.NOT_FOUND);
		else 
			return ResponseEntity.ok(data);
	}
	
	
}
