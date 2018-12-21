package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.framework.security.service.UserDetailsService;
import com.noknown.project.hyscan.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.ADMIN_BASE_URL)
public class UseDetailrController extends BaseController {

	private final UserDetailsService udService;

	@Autowired
	public UseDetailrController(UserDetailsService udService) {
		this.udService = udService;
	}

	@RequestMapping(value = "/user-detail/", method = RequestMethod.GET)
	public
	@ResponseBody
	Object getAllUds(
			@RequestParam(value = "filter", required = false) String filter,
			@RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "start", required = false, defaultValue = "0") int start,
			@RequestParam(value = "limit", required = false, defaultValue = "-1") int limit)
			throws Exception {
		SQLFilter sqlFilter = this.buildFilter(filter, sort);
		return udService.find(sqlFilter, start, limit);
	}

}
