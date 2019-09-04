package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.ModelConfigRepo;
import com.noknown.project.hyscan.model.SpDeviceConfig;
import com.noknown.project.hyscan.service.ScanTaskService;
import com.noknown.project.hyscan.service.SpDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * (SpDevice)表控制层
 *
 * @author makejava
 * @since 2019-09-03 20:52:38
 */
@RestController
@RequestMapping(value = Constants.ADMIN_BASE_URL + "taskResult")
public class TaskResultController extends BaseController {


	/**
	 * 服务对象
	 */
	private final SpDeviceService spDeviceService;

	private final ModelConfigRepo modelConfigRepo;

	private final ScanTaskService scanTaskService;

	private final MessageSource messageSource;

	@Autowired
	public TaskResultController(SpDeviceService spDeviceService, ModelConfigRepo modelConfigRepo, ScanTaskService scanTaskService, MessageSource messageSource) {
		this.spDeviceService = spDeviceService;
		this.modelConfigRepo = modelConfigRepo;
		this.scanTaskService = scanTaskService;
		this.messageSource = messageSource;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public
	@ResponseBody
	Object getSpDevice(@PathVariable String id)
			throws Exception {
		SpDeviceConfig spDeviceConfig = spDeviceService.getSpDeviceConfig(id);
		return outActionReturn(spDeviceConfig, HttpStatus.OK);
	}


	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public
	@ResponseBody
	Object deleteSpDevice(@PathVariable Integer id)
			throws Exception {
		scanTaskService.deleteTaskResult(id);
		return outActionReturn(null, HttpStatus.OK);
	}

}