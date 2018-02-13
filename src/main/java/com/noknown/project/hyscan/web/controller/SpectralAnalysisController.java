package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.pojo.MaterialResult;
import com.noknown.project.hyscan.pojo.WQResult;
import com.noknown.project.hyscan.service.SpectralAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class SpectralAnalysisController extends BaseController {

	@Autowired
	private SpectralAnalysisService analysisService;

	@RequestMapping(value = "/spAnalysis", method = RequestMethod.POST)
	public ResponseEntity<?> analysis(@RequestParam String model, @RequestParam(required = false) String algo, @RequestBody double[] reflectivitys)
			throws Exception {
		MaterialResult result = analysisService.materialAnalysis(reflectivitys, model, algo);
		return ResponseEntity.ok(result);
	}
	
	@RequestMapping(value = "/spAnalysis/material", method = RequestMethod.POST)
	public ResponseEntity<?> materialAnalysis(@RequestParam String model, @RequestParam(required = false) String algo, @RequestBody double[] reflectivitys)
			throws Exception {
		MaterialResult result = analysisService.materialAnalysis(reflectivitys, model, algo);
		return ResponseEntity.ok(result);
	}
	
	@RequestMapping(value = "/spAnalysis/wq", method = RequestMethod.POST)
	public ResponseEntity<?> wqAnalysis(@RequestParam String model, @RequestParam(required = false) String algo, @RequestBody double[] reflectivitys)
			throws Exception {
		WQResult result = analysisService.wqAnalysis(reflectivitys, model, algo);
		return ResponseEntity.ok(result);
	}
	
}
