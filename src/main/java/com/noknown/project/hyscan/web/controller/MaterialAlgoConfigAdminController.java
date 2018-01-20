package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.MaterialAlgoConfigRepo;
import com.noknown.project.hyscan.model.MaterialAlgoConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = Constants.appBaseUrl)
public class MaterialAlgoConfigAdminController extends BaseController {

	@Autowired
	private MaterialAlgoConfigRepo mcRepo;

	@RequestMapping(value = "/materialAlgoConfig/", method = {RequestMethod.POST, RequestMethod.PUT})
	public ResponseEntity<?> save(@RequestBody MaterialAlgoConfig mac)
			throws Exception {
		mcRepo.save(mac);
		return ResponseEntity.ok(mac);
	}
	
	@RequestMapping(value = "/materialAlgoConfig/", method = RequestMethod.GET)
	public ResponseEntity<?> find()
			throws Exception {
		List<MaterialAlgoConfig> modelConfigs = mcRepo.findAll();
		return ResponseEntity.ok(modelConfigs);
	}
	
	@RequestMapping(value = "/materialAlgoConfig/{model}", method = RequestMethod.GET)
	public ResponseEntity<?> getModelConfig(@PathVariable String model)
			throws Exception {
		MaterialAlgoConfig modelConfig = mcRepo.get(model);
		if (modelConfig == null)
			return ResponseEntity.notFound().build();
		else 
			return ResponseEntity.ok(modelConfig);
	}
	
	@RequestMapping(value = "/materialAlgoConfig/", method = RequestMethod.DELETE)
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
	
	@RequestMapping(value = "/materialAlgoConfig/{model}", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeModelConfig(@PathVariable String model)
			throws Exception {
		mcRepo.delete(model);
		return ResponseEntity.ok(null);
	}
	
}
