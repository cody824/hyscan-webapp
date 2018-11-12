package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class AdminController extends BaseController {

	@RequestMapping(value = "/admin")
	public String gotoAdmin() {
		return "admin";
	}
	
	@RequestMapping(value = "/")
	public String gotoMain(){
		return "redirect:/admin";
	}
	
}
