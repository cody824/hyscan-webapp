package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.WDAlgoConfigRepo;
import com.noknown.project.hyscan.model.WDAlgoConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class WDAlgoConfigAdminController extends BaseController {

	@Autowired
	private WDAlgoConfigRepo wdacRepo;

	@RequestMapping(value = "/wdAlgoConfig/", method = {RequestMethod.POST, RequestMethod.PUT})
	public ResponseEntity<?> save(@RequestBody WDAlgoConfig modelConfig)
			throws Exception {
		wdacRepo.save(modelConfig);
		return ResponseEntity.ok(modelConfig);
	}
	
	@RequestMapping(value = "/wdAlgoConfig/", method = RequestMethod.GET)
	public ResponseEntity<?> find()
			throws Exception {
		List<WDAlgoConfig> modelConfigs = wdacRepo.findAll();
		return ResponseEntity.ok(modelConfigs);
	}
	
	@RequestMapping(value = "/wdAlgoConfig/{model}", method = RequestMethod.GET)
	public ResponseEntity<?> getModelConfig(@PathVariable String model)
			throws Exception {
		WDAlgoConfig wdac = wdacRepo.get(model);
		if (wdac == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(wdac);
		}
	}
	
	@RequestMapping(value = "/wdAlgoConfig/", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeModelConfigs(@RequestParam String models)
			throws Exception {
		String[] modelArray = models.split(",");
		for (String model : modelArray) {
			try {
				wdacRepo.delete(model);
			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			}
		}
		return ResponseEntity.ok(null);
	}
	
	@RequestMapping(value = "/wdAlgoConfig/{model}", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeModelConfig(@PathVariable String model)
			throws Exception {
		wdacRepo.delete(model);
		return ResponseEntity.ok(null);
	}
	
}
