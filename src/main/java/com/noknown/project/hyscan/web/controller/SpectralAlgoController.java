package com.noknown.project.hyscan.web.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.service.GlobalConfigService;
import com.noknown.framework.common.util.BaseUtil;
import com.noknown.framework.common.util.FileUtil;
import com.noknown.project.hyscan.algorithm.Loader;
import com.noknown.project.hyscan.common.Constants;

@RestController
@RequestMapping(value = Constants.adminBaseUrl)
public class SpectralAlgoController extends BaseController {

	@Autowired
	private GlobalConfigService gcService;
	
	@Autowired
	private Loader loader;
	
	@Value("${hyscan.algo.libPath:D:/var/hyscan/algo/lib/}")
	private String basePath;

	@RequestMapping(value = "/algorithm/", method = RequestMethod.POST)
	public ResponseEntity<?> uploadAlgo(HttpServletResponse response, @RequestParam("file") MultipartFile uploadFile, @RequestParam String version, @RequestParam String name)
			throws Exception {
		
		String fileName = uploadFile.getOriginalFilename();
		BaseUtil.createFile(basePath + "/" + version + "/" + fileName);
		File file = new File(basePath + "/" + version, fileName);
		uploadFile.transferTo(file);
		String value = "file:" + file.getPath() + "," + name;
		String key = "algo_" + version;
		gcService.updateValue(Constants.algoConfig, Constants.appId, key, value);
		loader.init();
		response.setHeader("X-Frame-Options", "SAMEORIGIN");
		Map<String, Object> ret = new HashMap<>();
		ret.put("success", true);
		return ResponseEntity.ok().body(ret);
	}
	
	@RequestMapping(value = "/algorithm/{version}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteAlgo(@PathVariable String version)
			throws Exception {
		Properties props = gcService.getProperties(Constants.algoConfig, Constants.appId, false);
		if (props != null) {
			String key = "algo_" + version;	
			String pnString = props.getProperty(key);
			if (pnString != null) {
				String[] pns = pnString.split(",");
				if (pns.length > 0 && pns[0].startsWith("file:")) {
					String filePath = pns[0].substring(5);
					File file = new File(filePath);
					FileUtil.delFile(file.getParent());
				}
			}
			gcService.deleteValue(Constants.algoConfig, Constants.appId, key);
			key =  "algo_" + version + "_invalid";
			pnString = props.getProperty(key);
			if (pnString != null) {
				String[] pns = pnString.split(",");
				if (pns.length > 0 && pns[0].startsWith("file:")) {
					String filePath = pns[0].substring(5);
					File file = new File(filePath);
					FileUtil.delFile(file.getParent());
				}
			}
			gcService.deleteValue(Constants.algoConfig, Constants.appId, key);
			loader.init();
		}
		return ResponseEntity.ok(null);
	}
	
	@RequestMapping(value = "/algorithm/{version}/current", method = RequestMethod.PUT)
	public ResponseEntity<?> currentAlgo(@PathVariable String version)
			throws Exception {
		gcService.updateValue(Constants.algoConfig, Constants.appId, "currentAlgoVersion", version);
		loader.setCurrentAlgoVersion(version);
		return ResponseEntity.ok(null);
	}
	
}
