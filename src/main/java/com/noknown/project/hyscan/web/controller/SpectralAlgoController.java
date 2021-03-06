package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.service.GlobalConfigService;
import com.noknown.framework.common.util.BaseUtil;
import com.noknown.framework.common.util.FileUtil;
import com.noknown.project.hyscan.algorithm.Loader;
import com.noknown.project.hyscan.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.ADMIN_BASE_URL)
public class SpectralAlgoController extends BaseController {

	private final static String FILE_PREFIX = "file:";

	private final GlobalConfigService gcService;

	private final Loader loader;

	@Value("${hyscan.algo.libPath:/var/hyscan/algo/lib/}")
	private String basePath;

	@Autowired
	public SpectralAlgoController(GlobalConfigService gcService, Loader loader) {
		this.gcService = gcService;
		this.loader = loader;
	}

	@RequestMapping(value = "/algorithm/", method = RequestMethod.POST)
	public ResponseEntity<?> uploadAlgo(HttpServletResponse response, @RequestParam("file") MultipartFile uploadFile, @RequestParam String version, @RequestParam String name)
			throws Exception {

		String fileName = uploadFile.getOriginalFilename();
		BaseUtil.createFile(basePath + "/" + version + "/" + fileName);
		File file = new File(basePath + "/" + version, fileName);
		uploadFile.transferTo(file);
		String value = FILE_PREFIX + file.getPath() + "," + name;
		String key = "algo_" + version;
		gcService.updateValue(Constants.ALGO_CONFIG, Constants.APP_ID, key, value);
		loader.init();
		response.setHeader("X-Frame-Options", "SAMEORIGIN");
		Map<String, Object> ret = new HashMap<>(1);
		ret.put("success", true);
		return ResponseEntity.ok().body(ret);
	}

	@RequestMapping(value = "/algorithm/{version}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteAlgo(@PathVariable String version) {
		Properties props = gcService.getProperties(Constants.ALGO_CONFIG, Constants.APP_ID, true);
		if (props != null) {
			String key = "algo_" + version;
			String pnString = props.getProperty(key);
			if (pnString != null) {
				String[] pns = pnString.split(",");
				if (pns.length > 0 && pns[0].startsWith(FILE_PREFIX)) {
					String filePath = pns[0].substring(5);
					File file = new File(filePath);
					FileUtil.delFile(file.getParent());
				}
			}
			gcService.deleteValue(Constants.ALGO_CONFIG, Constants.APP_ID, key);
			key =  "algo_" + version + "_invalid";
			pnString = props.getProperty(key);
			if (pnString != null) {
				String[] pns = pnString.split(",");
				if (pns.length > 0 && pns[0].startsWith(FILE_PREFIX)) {
					String filePath = pns[0].substring(5);
					File file = new File(filePath);
					FileUtil.delFile(file.getParent());
				}
			}
			gcService.deleteValue(Constants.ALGO_CONFIG, Constants.APP_ID, key);
			loader.init();
		}
		return ResponseEntity.ok(null);
	}

	@RequestMapping(value = "/algorithm/{version}/current", method = RequestMethod.PUT)
	public ResponseEntity<?> currentAlgo(@PathVariable String version) {

		gcService.updateValue(Constants.ALGO_CONFIG, Constants.APP_ID, "currentAlgoVersion", version);
		loader.setCurrentAlgoVersion(version);

		return ResponseEntity.ok(null);
	}

}
