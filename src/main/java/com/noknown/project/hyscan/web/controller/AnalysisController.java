package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.pojo.AbstractResult;
import com.noknown.project.hyscan.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class AnalysisController extends BaseController {

	private final AnalysisService analysisService;

	@Autowired
	public AnalysisController(AnalysisService analysisService) {
		this.analysisService = analysisService;
	}

	@RequestMapping(value = "/analysis/{appId}", method = RequestMethod.POST)
	public ResponseEntity<?> analysis(@PathVariable String appId,
	                                  @RequestParam String model,
	                                  @RequestParam(required = false) String target,
	                                  @RequestParam(required = false) String algo,
	                                  @RequestBody double[] reflectivitys)
			throws Exception {
		AbstractResult result = analysisService.analysis(reflectivitys, appId, model, target, algo);
		return ResponseEntity.ok(result);
	}

	@RequestMapping(value = "/analysis/task/{taskId}", method = RequestMethod.POST)
	public ResponseEntity<?> analysis(@PathVariable String taskId,
	                                  @RequestParam(required = false) String algo,
	                                  @RequestParam(required = false, defaultValue = "false") boolean use)
			throws Exception {
		AbstractResult result = analysisService.analysis(taskId, algo, use);
		return ResponseEntity.ok(result);
	}

}
