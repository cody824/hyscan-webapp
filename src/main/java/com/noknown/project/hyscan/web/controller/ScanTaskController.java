package com.noknown.project.hyscan.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.WebException;
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
	
	@RequestMapping(value = "/scanTask/", method = RequestMethod.GET)
	public ResponseEntity<?> findScanTask(@RequestParam int page, @RequestParam int size)
			throws Exception {
		Page<ScanTask> pd = taskService.find(page, size);
		return ResponseEntity.ok(pd);
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
			return ResponseEntity.notFound().build();
		else 
			return ResponseEntity.ok(data);
	}
	
	
}
