package com.noknown.project.hyscan.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.pojo.Result;
import com.noknown.project.hyscan.service.SpectralAnalysisService;

@RestController
@RequestMapping(value = Constants.appBaseUrl)
public class SpectralAnalysisController extends BaseController {

	@Autowired
	private SpectralAnalysisService analysisService;

	@RequestMapping(value = "/spAnalysis", method = RequestMethod.POST)
	public ResponseEntity<?> analysis(@RequestParam String model, @RequestParam(required = false) String algo, @RequestBody double[] reflectivitys)
			throws Exception {
		/*reflectivitys = reflectivitys.substring(1, reflectivitys.indexOf("]"));
		
		String[] attrs = reflectivitys.split(",");
		System.out.println(attrs.length);
		double[] rArray = new double[attrs.length];
		int i = 0;
		for (String str : attrs) {
			try {
				double d =  Double.parseDouble(str);
				rArray[i++] = d;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}*/
		
		Result result = analysisService.analysis(reflectivitys, model, algo);
		return ResponseEntity.ok(result);
	}
	
	
	
	
	
}
