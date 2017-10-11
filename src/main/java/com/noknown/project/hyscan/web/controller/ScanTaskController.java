package com.noknown.project.hyscan.web.controller;

import java.util.List;

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
import org.springframework.web.util.HtmlUtils;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.WebException;
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
