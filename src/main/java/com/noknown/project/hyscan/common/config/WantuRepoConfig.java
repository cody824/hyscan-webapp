package com.noknown.project.hyscan.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.alibaba.media.upload.UploadPolicy;
import com.noknown.framework.others.wantu.config.WantuConfig;
import com.noknown.framework.others.wantu.utils.WantuRepo;

@Configuration
@PropertySource(value = "${spring.config.custom-path:classpath:}conf/${spring.profiles.active}/wantu.properties", ignoreResourceNotFound = true)
public class WantuRepoConfig extends WantuConfig {

	
	@Value("${wantu.hyscan.taskImg.up.sizeLimit:20971520}")
	private long taskImgSizeLimit;
	
	@Value("${wantu.hyscan.taskImg.up.mimeLimit:image/*}")
	private String taskImgMimeLimit;
	
	@Value("${wantu.hyscan.taskImg.up.insertOnly:0}")
	private int taskImgInsertOnly;
	
	
	@Bean
	public UploadPolicy getTaskImgUP() {
		UploadPolicy up = new UploadPolicy();
		up.setDir("/taskImg/${year}/${month}/${day}");
		up.setInsertOnly(taskImgInsertOnly);
		up.setSizeLimit(taskImgSizeLimit);
		up.setMimeLimit(taskImgMimeLimit);
		return up;
	}
	
	@Bean
	public WantuRepo getWantuRepo() {
		WantuRepo repo = new WantuRepo();
		repo.getMediaClientMap().put("hyscan_deviceImg", getDefaultMediaClient());
		repo.getUpMap().put("hyscan_deviceInfo", getTaskImgUP());
		repo.getUtClientMap().put("hyscan_deviceImg", getDefaultUploadTokenClient());
		
		
		return repo;
	}
	
}
