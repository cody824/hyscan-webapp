package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.common.service.GlobalConfigService;
import com.noknown.framework.common.util.BaseUtil;
import com.noknown.framework.common.util.DateUtil;
import com.noknown.framework.fss.service.FileStoreService;
import com.noknown.framework.fss.service.FileStoreServiceRepo;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.AlgoConfigRepo;
import com.noknown.project.hyscan.pojo.*;
import com.noknown.project.hyscan.service.ScanTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class ImgAnalysisController extends BaseController {

	private final ScanTaskService taskService;

	private final FileStoreServiceRepo repo;

	private final AlgoConfigRepo acDao;

	private final GlobalConfigService globalConfigService;


	@Value("${hyscan.exportPath:/export/}")
	private String exportPath;

	@Autowired
	public ImgAnalysisController(ScanTaskService taskService, FileStoreServiceRepo repo, AlgoConfigRepo acDao, GlobalConfigService globalConfigService) {
		this.taskService = taskService;
		this.repo = repo;
		this.acDao = acDao;
		this.globalConfigService = globalConfigService;
	}

	@RequestMapping(value = "/analysis/img", method = RequestMethod.POST)
	public ResponseEntity<?> saveTaskImg(@RequestParam("file") MultipartFile uploadFile, @RequestParam String type) throws WebException, ServiceException, DaoException {
		InputStream is;
		try {
			is = uploadFile.getInputStream();
		} catch (IOException e) {
			throw new WebException("文件上传失败！");
		}
		Date now = new Date();
		FileStoreService fss = repo.getOS(null);
		if (fss == null) {
			throw new WebException("没有配置图片服务器");
		}

		String key = "analysis/" + DateUtil.getCurrentYear(now) + "/" +
				DateUtil.getCurrentMonth(now) + "/" + DateUtil.getCurrentDay(now) + "/" + BaseUtil.getTimeCode(now) + ".png";
		String url;
		try {
			url = fss.put(is, key);
		} catch (IOException e) {
			e.printStackTrace();
			throw new WebException("图片服务错误：" + e.getLocalizedMessage());
		}

		long beginTs = System.currentTimeMillis();
		long endTs = System.currentTimeMillis();
		String name = "大白菜";
		float similarityDegree = 0.8f;
		ImgAnalysisResult result = new ImgAnalysisResult(name, "", similarityDegree, url, beginTs, endTs, new ArrayList<>());
		//TODO 真实检测


		return ResponseEntity.ok(result);
	}
}
