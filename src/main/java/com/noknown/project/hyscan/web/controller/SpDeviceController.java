package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.ModelConfigRepo;
import com.noknown.project.hyscan.model.ModelConfig;
import com.noknown.project.hyscan.model.SpDevice;
import com.noknown.project.hyscan.model.SpDeviceConfig;
import com.noknown.project.hyscan.service.SpDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

/**
 * (SpDevice)表控制层
 *
 * @author makejava
 * @since 2019-09-03 20:52:38
 */
@RestController
@RequestMapping(value = Constants.ADMIN_BASE_URL + "spDevice")
public class SpDeviceController extends BaseController {


	/**
	 * 服务对象
	 */
	private final SpDeviceService spDeviceService;

	private final ModelConfigRepo modelConfigRepo;

	private final MessageSource messageSource;

	@Autowired
	public SpDeviceController(SpDeviceService spDeviceService, ModelConfigRepo modelConfigRepo, MessageSource messageSource) {
		this.spDeviceService = spDeviceService;
		this.modelConfigRepo = modelConfigRepo;
		this.messageSource = messageSource;
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public
	@ResponseBody
	Object getAllSpDevice(
			@RequestParam(value = "filter", required = false) String filter,
			@RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "start", required = false, defaultValue = "0") int start,
			@RequestParam(value = "limit", required = false, defaultValue = "10000") int limit)
			throws Exception {
		SQLFilter sqlFilter = this.buildFilter(filter, sort);
		return spDeviceService.find(sqlFilter, start, limit);
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
	Object deleteSpDevice(@PathVariable String id)
			throws Exception {
		spDeviceService.delete(new String[]{id});
		spDeviceService.deleteSpDeviceConfig(id);
		return outActionReturn(null, HttpStatus.OK);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public
	@ResponseBody
	Object addSpDevice(@RequestBody SpDevice spDevice)
			throws Exception {
		Locale locale = LocaleContextHolder.getLocale();
		ModelConfig modelConfig = modelConfigRepo.get(spDevice.getModel());
		if (modelConfig == null) {
			throw new WebException(messageSource.getMessage("model_not_support", null, "不支持该型号的设备", locale));
		}
		spDeviceService.update(spDevice);
		return outActionReturn(spDevice, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public
	@ResponseBody
	Object updateSpDevice(@PathVariable String id, @RequestBody SpDeviceConfig spDeviceConfig)
			throws Exception {
		Locale locale = LocaleContextHolder.getLocale();
		spDeviceConfig.setSerial(id);
		SpDevice spDevice = new SpDevice().setSerial(spDeviceConfig.getSerial())
				.setAddress(spDeviceConfig.getAddress())
				.setFirmware(spDeviceConfig.getFirmware())
				.setModel(spDeviceConfig.getModel());
		spDeviceService.update(spDevice);

		ModelConfig modelConfig = modelConfigRepo.get(spDevice.getModel());
		if (modelConfig == null) {
			throw new WebException(messageSource.getMessage("model_not_support", null, "不支持该型号的设备", locale));
		}

		if (spDeviceConfig.getDarkCurrent() != null && spDeviceConfig.getWhiteboardData() != null) {
			if (spDeviceConfig.getDarkCurrent().length != modelConfig.getWavelengths().length) {
				throw new ServiceException(messageSource.getMessage("data_length_error", new Object[]{modelConfig.getWavelengths().length, spDeviceConfig.getDarkCurrent().length}, "数据长度不正确, 该型号对应数据长度为【{0}】,提供长度为【{1}】", locale));
			}
			if (spDeviceConfig.getWhiteboardData().length != modelConfig.getWavelengths().length) {
				throw new ServiceException(messageSource.getMessage("data_length_error", new Object[]{modelConfig.getWavelengths().length, spDeviceConfig.getWhiteboardData().length}, "数据长度不正确, 该型号对应数据长度为【{0}】,提供长度为【{1}】", locale));
			}
			spDeviceService.saveSpDeviceConfig(spDeviceConfig);
		}
		return outActionReturn(spDevice, HttpStatus.OK);
	}

}