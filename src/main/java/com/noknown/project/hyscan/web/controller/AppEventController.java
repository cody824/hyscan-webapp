package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.project.hyscan.model.AppEvent;
import com.noknown.project.hyscan.service.AppEventService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * (AppEvent)表控制层
 *
 * @author makejava
 * @since 2019-06-02 21:26:37
 */
@RestController
@RequestMapping("appEvent")
public class AppEventController extends BaseController {
	/**
	 * 服务对象
	 */
	@Resource
	private AppEventService appEventService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public
	@ResponseBody
	Object getAllAppEvent(
			@RequestParam(value = "filter", required = false) String filter,
			@RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "start", required = false, defaultValue = "0") int start,
			@RequestParam(value = "limit", required = false, defaultValue = "10000") int limit)
			throws Exception {
		SQLFilter sqlFilter = this.buildFilter(filter, sort);
		return appEventService.find(sqlFilter, start, limit);
	}


	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public
	@ResponseBody
	Object deleteAppEvent(@PathVariable Integer id)
			throws Exception {
		appEventService.delete(new Integer[]{id});
		return outActionReturn(null, HttpStatus.OK);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public
	@ResponseBody
	Object addAppEvent(@RequestBody AppEvent appEvent)
			throws Exception {
		appEventService.update(appEvent);
		return outActionReturn(appEvent, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public
	@ResponseBody
	Object updateAppEvent(@PathVariable Integer id, @RequestBody AppEvent appEvent)
			throws Exception {
		appEvent.setId(id);
		appEventService.update(appEvent);
		return outActionReturn(appEvent, HttpStatus.OK);
	}

}