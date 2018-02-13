package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.ModelConfigRepo;
import com.noknown.project.hyscan.model.ModelConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class ModelConfigAdminController extends BaseController {

	@Autowired
	private ModelConfigRepo mcRepo;

	@RequestMapping(value = "/modelConfig/", method = {RequestMethod.POST, RequestMethod.PUT})
	public ResponseEntity<?> save(@RequestBody ModelConfig modelConfig)
			throws Exception {
		mcRepo.save(modelConfig);
		return ResponseEntity.ok(modelConfig);
	}
	
	@RequestMapping(value = "/modelConfig/", method = RequestMethod.GET)
	public ResponseEntity<?> find()
			throws Exception {
		List<ModelConfig> modelConfigs = mcRepo.findAll();
		return ResponseEntity.ok(modelConfigs);
	}
	
	@RequestMapping(value = "/modelConfig/{model}", method = RequestMethod.GET)
	public ResponseEntity<?> getModelConfig(@PathVariable String model)
			throws Exception {
		ModelConfig modelConfig = mcRepo.get(model);
		if (modelConfig == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(modelConfig);
		}
	}
	
	@RequestMapping(value = "/modelConfig/", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeModelConfigs(@RequestParam String models)
			throws Exception {
		String[] modelArray = models.split(",");
		for (String model : modelArray) {
			try {
				mcRepo.delete(model);
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
		mcRepo.delete(model);
		return ResponseEntity.ok(null);
	}
	
}
