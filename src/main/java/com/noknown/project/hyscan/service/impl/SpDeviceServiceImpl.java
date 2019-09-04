package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.base.BaseServiceImpl;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.project.hyscan.dao.SpDeviceConfigRepo;
import com.noknown.project.hyscan.model.SpDevice;
import com.noknown.project.hyscan.model.SpDeviceConfig;
import com.noknown.project.hyscan.repositories.jpa.SpDeviceRepo;
import com.noknown.project.hyscan.service.SpDeviceService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

/**
 * (SpDevice)表服务实现类
 *
 * @author makejava
 * @since 2019-09-03 20:52:38
 */
@Service("spDeviceService")
public class SpDeviceServiceImpl extends BaseServiceImpl<SpDevice, String> implements SpDeviceService {

	private final SpDeviceRepo spDeviceRepo;

	private final SpDeviceConfigRepo spDeviceConfigRepo;

	public SpDeviceServiceImpl(SpDeviceRepo spDeviceRepo, SpDeviceConfigRepo spDeviceConfigRepo) {
		this.spDeviceRepo = spDeviceRepo;
		this.spDeviceConfigRepo = spDeviceConfigRepo;
	}

	@Override
	public JpaRepository<SpDevice, String> getRepository() {
		return spDeviceRepo;
	}

	@Override
	public JpaSpecificationExecutor<SpDevice> getSpecificationExecutor() {
		return spDeviceRepo;
	}

	@Override
	public SpDeviceConfig saveSpDeviceConfig(SpDeviceConfig spDeviceConfig) throws DaoException {
		spDeviceConfigRepo.save(spDeviceConfig);
		return spDeviceConfig;
	}

	@Override
	public SpDeviceConfig getSpDeviceConfig(String serial) throws DaoException {
		return spDeviceConfigRepo.get(serial);
	}

	@Override
	public void deleteSpDeviceConfig(String serial) throws DaoException {
		spDeviceConfigRepo.delete(serial);
	}
}