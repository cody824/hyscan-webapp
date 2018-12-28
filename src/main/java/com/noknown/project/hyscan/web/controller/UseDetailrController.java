package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.framework.security.model.BaseUserDetails;
import com.noknown.framework.security.pojo.UserWarpForReg;
import com.noknown.framework.security.service.UserDetailsService;
import com.noknown.framework.security.service.UserService;
import com.noknown.project.hyscan.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.ADMIN_BASE_URL)
public class UseDetailrController extends BaseController {

	private final UserDetailsService udService;

	private final UserService userService;

	@Autowired
	public UseDetailrController(UserDetailsService udService, UserService userService) {
		this.udService = udService;
		this.userService = userService;
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

	@RequestMapping(value = "/user-detail/", method = RequestMethod.POST)
	public
	@ResponseBody
	Object addUswer(@RequestBody UserWarpForReg userWarp) throws Exception {
		BaseUserDetails udDetails = userService.addUser(userWarp);
		return outActionReturn(udDetails, HttpStatus.OK);
	}

}
