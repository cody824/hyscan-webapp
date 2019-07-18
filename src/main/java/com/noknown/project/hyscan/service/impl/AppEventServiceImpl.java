package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.base.BaseServiceImpl;
import com.noknown.project.hyscan.model.AppEvent;
import com.noknown.project.hyscan.repositories.jpa.AppEventRepo;
import com.noknown.project.hyscan.service.AppEventService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

/**
 * (AppEvent)表服务实现类
 *
 * @author makejava
 * @since 2019-06-02 21:26:37
 */
@Service("appEventService")
public class AppEventServiceImpl extends BaseServiceImpl<AppEvent, Integer> implements AppEventService {

	private final AppEventRepo appEventRepo;

	public AppEventServiceImpl(AppEventRepo appEventRepo) {
		this.appEventRepo = appEventRepo;
	}

	@Override
	public JpaRepository<AppEvent, Integer> getRepository() {
		return appEventRepo;
	}

	@Override
	public JpaSpecificationExecutor<AppEvent> getSpecificationExecutor() {
		return appEventRepo;
	}
}