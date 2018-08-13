package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.common.model.ConfigRepo;
import com.noknown.framework.common.service.GlobalConfigService;
import com.noknown.framework.fss.service.FileStoreService;
import com.noknown.framework.fss.service.FileStoreServiceRepo;
import com.noknown.framework.security.model.BaseUserDetails;
import com.noknown.framework.security.service.UserDetailsService;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.AlgoConfigRepo;
import com.noknown.project.hyscan.model.AlgoConfig;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.AppScanTask;
import com.noknown.project.hyscan.pojo.CommonResult;
import com.noknown.project.hyscan.pojo.DataSet;
import com.noknown.project.hyscan.service.ScanTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class UserController extends BaseController {

	private final FileStoreServiceRepo repo;

	private final UserDetailsService udService;

	private final ScanTaskService taskService;

	private final AlgoConfigRepo acDao;

	private final GlobalConfigService globalConfigService;

	@Autowired
	public UserController(FileStoreServiceRepo repo, UserDetailsService udService, ScanTaskService taskService, AlgoConfigRepo acDao, GlobalConfigService globalConfigService) {
		this.repo = repo;
		this.udService = udService;
		this.taskService = taskService;
		this.acDao = acDao;
		this.globalConfigService = globalConfigService;
	}

	@RequestMapping(value = "/user/avatar", method = RequestMethod.POST)
	public ResponseEntity<?> saveUserAvatar(@RequestParam("file") MultipartFile uploadFile) throws WebException, ServiceException {
		Authentication user = loginAuth();
		if (user == null) {
			throw new WebException("请登录");
		}

		InputStream is;
		try {
			is = uploadFile.getInputStream();
		} catch (IOException e) {
			throw new WebException("文件上传失败！");
		}
		FileStoreService fss = repo.getOS(null);
		if (fss == null) {
			throw new WebException("没有配置图片服务器");
		}

		String key = "user/avatar" + user.getPrincipal() + ".png";
		String url;
		try {
			url = fss.put(is, key);
		} catch (IOException e) {
			e.printStackTrace();
			throw new WebException("图片服务错误：" + e.getLocalizedMessage());
		}

		BaseUserDetails uDetails = udService.getUserDetail((Integer) user.getPrincipal());
		uDetails.setAvatar(url);
		uDetails.setAvatarHd(url);
		udService.updateUserDetails(uDetails);

		return ResponseEntity.ok(uDetails);
	}

	@RequestMapping(value = "/user/task/", method = RequestMethod.GET)
	public ResponseEntity<?> userTask(HttpServletRequest request, @RequestParam String appId, @RequestParam(required = false, defaultValue = "false") boolean containData) throws WebException, ServiceException {
		Authentication user = loginAuth();
		if (user == null) {
			throw new WebException("请登录");
		}
		Properties dict = null;
		ConfigRepo repo = globalConfigService.getConfigRepo(Constants.RESULT_DICT_CONFIG, true);
		if (repo != null) {
			dict = repo.getConfigs().get(appId);
		}
		if (dict == null) {
			dict = new Properties();
		}
		Map<String, AlgoConfig> algoConfigMap = new HashMap<>(10);

		List<ScanTask> tasks = taskService.findByUserId((Integer) user.getPrincipal(), appId);
		List<AppScanTask<CommonResult>> appScanTasks = new ArrayList<>(tasks.size());
		for (ScanTask task : tasks) {
			AlgoConfig algoConfig = algoConfigMap.get(task.getDeviceModel());
			if (algoConfig == null) {
				try {
					algoConfig = acDao.get(appId + "-" + task.getDeviceModel());
				} catch (DaoException e) {
					e.printStackTrace();
				}
			}
			if (algoConfig != null) {
				DataSet dataSet = null;
				if (containData) {
					ScanTaskData data = null;
					try {
						data = taskService.getData(task.getId());
						if (data != null) {
							dataSet = new DataSet();
							dataSet.setDn(data.getDn());
							dataSet.setDnList(data.getDnList());
						}

					} catch (DaoException e) {
						e.printStackTrace();
					}
				}
				appScanTasks.add(task.toAppScanTask(algoConfig.getAlgos(), dict, dataSet));
			}
		}
		return ResponseEntity.ok(appScanTasks);
	}

}
