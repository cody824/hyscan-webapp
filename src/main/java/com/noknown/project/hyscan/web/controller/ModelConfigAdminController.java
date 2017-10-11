package com.noknown.project.hyscan.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.model.ModelConfig;
import com.noknown.project.hyscan.service.ModelConfigService;


@RestController
@RequestMapping(value = Constants.appBaseUrl)
public class ModelConfigAdminController extends BaseController {

	@Autowired
	private ModelConfigService modelConfigService;

	@RequestMapping(value = "/modelConfig/", method = {RequestMethod.POST, RequestMethod.PUT})
	public ResponseEntity<?> save(@RequestBody ModelConfig modelConfig)
			throws Exception {
		modelConfigService.saveModelConfig(modelConfig);
		return ResponseEntity.ok(modelConfig);
	}
	
	@RequestMapping(value = "/modelConfig/", method = RequestMethod.GET)
	public ResponseEntity<?> find()
			throws Exception {
		List<ModelConfig> modelConfigs = modelConfigService.findAll();
		return ResponseEntity.ok(modelConfigs);
	}
	
	@RequestMapping(value = "/modelConfig/{model}", method = RequestMethod.GET)
	public ResponseEntity<?> getModelConfig(@PathVariable String model)
			throws Exception {
		ModelConfig modelConfig = modelConfigService.getModelConfig(model);
		if (modelConfig == null)
			return ResponseEntity.notFound().build();
		else 
			return ResponseEntity.ok(modelConfig);
	}
	
	@RequestMapping(value = "/modelConfig/", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeModelConfigs(@RequestParam String models)
			throws Exception {
		String[] modelArray = models.split(",");
		for (String model : modelArray) {
			try {
				modelConfigService.removeModelConfig(model);
			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			}
		}
		return ResponseEntity.ok(null);
	}
	
	@RequestMapping(value = "/modelConfig/{model}", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeModelConfig(@PathVariable String model)
			throws Exception {
		modelConfigService.removeModelConfig(model);
		return ResponseEntity.ok(null);
	}
	
}
