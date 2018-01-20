package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.WebException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ErrorTestController extends BaseController {


	@RequestMapping(value = "/test/json/{errorNum}", method = RequestMethod.GET)
	public ResponseEntity<?> saveJson(@PathVariable Integer errorNum)
			throws Exception {
		throw new WebException("测试一下", HttpStatus.valueOf(errorNum));
	}
	
	@RequestMapping(value = "/test/view/{errorNum}", method = RequestMethod.GET)
	public String testView(@PathVariable Integer errorNum)
			throws Exception {
		throw new WebException("测试一下", HttpStatus.valueOf(errorNum));
	}
	
	
}
