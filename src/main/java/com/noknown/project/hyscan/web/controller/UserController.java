package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.fss.service.FileStoreService;
import com.noknown.framework.fss.service.FileStoreServiceRepo;
import com.noknown.framework.security.model.BaseUserDetails;
import com.noknown.framework.security.service.UserDetailsService;
import com.noknown.project.hyscan.common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.APP_BASE_URL)
public class UserController extends BaseController {

	private final FileStoreServiceRepo repo;

	private final UserDetailsService udService;

	@Autowired
	public UserController(FileStoreServiceRepo repo, UserDetailsService udService) {
		this.repo = repo;
		this.udService = udService;
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

}
