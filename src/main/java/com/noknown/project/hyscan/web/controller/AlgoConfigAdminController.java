package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.AlgoConfigRepo;
import com.noknown.project.hyscan.model.AlgoConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class AlgoConfigAdminController extends BaseController {

	private final AlgoConfigRepo algoConfigRepo;

	@Autowired
	public AlgoConfigAdminController(AlgoConfigRepo algoConfigRepo) {
		this.algoConfigRepo = algoConfigRepo;
	}

	@RequestMapping(value = "/algo-config/", method = {RequestMethod.POST, RequestMethod.PUT})
	public ResponseEntity<?> save(@RequestBody AlgoConfig modelConfig)
			throws Exception {
		algoConfigRepo.save(modelConfig);
		return ResponseEntity.ok(modelConfig);
	}

	@RequestMapping(value = "/algo-config/", method = RequestMethod.GET)
	public ResponseEntity<?> find()
			throws Exception {
		List<AlgoConfig> modelConfigs = algoConfigRepo.findAll();
		return ResponseEntity.ok(modelConfigs);
	}

	@RequestMapping(value = "/algo-config/{model}", method = RequestMethod.GET)
	public ResponseEntity<?> getModelConfig(@PathVariable String model)
			throws Exception {
		AlgoConfig wdac = algoConfigRepo.get(model);
		if (wdac == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(wdac);
		}
	}

	@RequestMapping(value = "/algo-config/", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeModelConfigs(@RequestParam String keys) {
		String[] keyArray = keys.split(",");
		for (String model : keyArray) {
			try {
				algoConfigRepo.delete(model);
			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			}
		}
		return ResponseEntity.ok(null);
	}

	@RequestMapping(value = "/algo-config/{appId}/{model}", method = RequestMethod.DELETE)
	public ResponseEntity<?> removeModelConfig(@PathVariable String appId, @PathVariable String model)
			throws Exception {
		algoConfigRepo.delete(appId + "-" + model);
		return ResponseEntity.ok(null);
	}

}
