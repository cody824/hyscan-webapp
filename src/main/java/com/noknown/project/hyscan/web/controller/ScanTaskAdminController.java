package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.service.ScanTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.ADMIN_BASE_URL)
public class ScanTaskAdminController extends BaseController {

	private final ScanTaskService taskService;

	@Autowired
	public ScanTaskAdminController(ScanTaskService taskService) {
		this.taskService = taskService;
	}

	@RequestMapping(value = "/scanTask/scanTarget/", method = RequestMethod.POST)
	public Object getLatestScanTask(@RequestParam String scanTarget, @RequestBody List<String> ids) {
		taskService.updateScanTarget(ids, scanTarget);
		return null;
	}

}
