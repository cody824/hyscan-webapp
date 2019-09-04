package com.noknown.project.hyscan.service;

import com.noknown.framework.common.base.BaseService;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.project.hyscan.model.SpDevice;
import com.noknown.project.hyscan.model.SpDeviceConfig;

/**
 * (SpDevice)表服务接口
 *
 * @author makejava
 * @since 2019-09-03 20:52:38
 */
public interface SpDeviceService extends BaseService<SpDevice, String> {


	/**
	 * 保存设备配置
	 *
	 * @param spDeviceConfig
	 * @return
	 */
	SpDeviceConfig saveSpDeviceConfig(SpDeviceConfig spDeviceConfig) throws DaoException;

	/**
	 * 获取设备配置
	 *
	 * @param serial
	 * @return
	 */
	SpDeviceConfig getSpDeviceConfig(String serial) throws DaoException;

	/**
	 * 删除设备配置
	 *
	 * @param serial
	 */
	void deleteSpDeviceConfig(String serial) throws DaoException;
}