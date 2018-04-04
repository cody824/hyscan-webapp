package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.util.DateUtil;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.project.hyscan.dao.ModelConfigRepo;
import com.noknown.project.hyscan.dao.ScanTaskDao;
import com.noknown.project.hyscan.dao.ScanTaskDataRepo;
import com.noknown.project.hyscan.model.ModelConfig;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.ApiUploadData;
import com.noknown.project.hyscan.pojo.Device;
import com.noknown.project.hyscan.pojo.UploadTaskData;
import com.noknown.project.hyscan.service.AppService;
import com.noknown.project.hyscan.util.AlgoUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * @author guodong
 * @date 2018/4/3
 */
@Service("appService")
@Transactional(rollbackOn = Exception.class)
public class AppServiceImpl implements AppService {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private final MessageSource messageSource;

	private final ModelConfigRepo mcDao;

	private final ScanTaskDao taskDao;

	private final ScanTaskDataRepo taskDataDao;

	@Autowired
	public AppServiceImpl(MessageSource messageSource, ModelConfigRepo mcDao, ScanTaskDao taskDao, ScanTaskDataRepo taskDataDao) {
		this.messageSource = messageSource;
		this.mcDao = mcDao;
		this.taskDao = taskDao;
		this.taskDataDao = taskDataDao;
	}

	@Override
	public List<ScanTask> buildScanTask(ApiUploadData apiData, Integer userId, Locale locale) throws ServiceException, DaoException {
		if (apiData.getDataSets() == null || apiData.getDataSets().length == 0) {
			throw new ServiceException(messageSource.getMessage("need_data_set", null, locale), -5);
		}


		ModelConfig mc = mcDao.get(apiData.getDevice().getModel());
		if (mc == null) {
			throw new ServiceException(messageSource.getMessage("model_not_support", null, locale), -4);
		}

		if (apiData.getDevice() == null || StringUtil.isBlank(apiData.getDevice().getModel()) ||
				StringUtil.isBlank(apiData.getDevice().getSerial())) {
			throw new ServiceException(messageSource.getMessage("need_device_info", null, locale), -3);
		}


		if (apiData.getDarkCurrent() == null || apiData.getDarkCurrent().length != mc.getWavelengths().length) {
			throw new ServiceException(messageSource.getMessage("need_dark_current", new Object[]{mc.getWavelengths().length}, locale), -6);
		}
		if (apiData.getWhiteboardData() == null || apiData.getWhiteboardData().length != mc.getWavelengths().length) {
			throw new ServiceException(messageSource.getMessage("need_white_board_data", new Object[]{mc.getWavelengths().length}, locale), -7);
		}

		Device device = apiData.getDevice();
		List<ScanTask> list = new ArrayList<>();

		for (UploadTaskData dataSet : apiData.getDataSets()) {
			if (dataSet.getTimestamp() <= 0) {
				try {
					Thread.sleep(1);
				} catch (InterruptedException ignore) {
				}
				dataSet.setTimestamp(System.currentTimeMillis());
			}
			String id = dataSet.getId();
			if (StringUtil.isBlank(id)) {
				Date date = new Date(dataSet.getTimestamp());
				id = apiData.getDevice().getModel() + apiData.getDevice().getSerial() + DateUtil.toString(date, "yyyyMMddhhmmssS");
			}

			ScanTask scanTask = new ScanTask();
			scanTask.setId(id).setImagePath(dataSet.getImagePath())
					.setAppId(apiData.getAppId())
					.setDeviceAddress(device.getAddress())
					.setDeviceFirmware(device.getFirmware())
					.setDeviceModel(device.getModel())
					.setDeviceSerial(device.getSerial())
					.setScanTime(new Date(dataSet.getTimestamp()))
					.setScanTarget(apiData.getName())
					.setUserId(userId);

			if (dataSet.getPosition() != null) {
				scanTask.setAddress(dataSet.getPosition().getAddress())
						.setCity(dataSet.getPosition().getCity())
						.setLat(dataSet.getPosition().getLat())
						.setLon(dataSet.getPosition().getLon());
			}


			if (dataSet.getReflectivity() == null || dataSet.getReflectivity().length != mc.getWavelengths().length) {
				if (dataSet.getDn() == null || dataSet.getDn().length != mc.getWavelengths().length) {
					logger.error("数据错误，采集数据长度与型号要求不符:" + id);
					continue;
				} else {
					dataSet.setReflectivity(AlgoUtil.getReflectivity(dataSet.getDn(), apiData.getDarkCurrent(), apiData.getWhiteboardData()));
				}
			}

			ScanTaskData data = new ScanTaskData();
			data.setDarkCurrent(apiData.getDarkCurrent());
			data.setDn(dataSet.getDn());
			data.setDnList(dataSet.getDnList());
			data.setId(id);
			data.setRange(mc.getSpectralRange());
			data.setRadianceConfig(mc.getRadianceParams());
			data.setWhiteboardData(apiData.getWhiteboardData());
			taskDataDao.save(data);
			list.add(scanTask);
		}
		taskDao.save(list);
		return list;
	}
}
