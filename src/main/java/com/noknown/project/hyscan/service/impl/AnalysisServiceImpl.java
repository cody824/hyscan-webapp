package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.dao.GlobalConfigDao;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.model.ConfigRepo;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.project.hyscan.algorithm.AbstractAnalysisAlgo;
import com.noknown.project.hyscan.algorithm.Loader;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.AlgoConfigRepo;
import com.noknown.project.hyscan.dao.ModelConfigRepo;
import com.noknown.project.hyscan.dao.ScanTaskDao;
import com.noknown.project.hyscan.dao.ScanTaskDataRepo;
import com.noknown.project.hyscan.model.*;
import com.noknown.project.hyscan.pojo.AbstractResult;
import com.noknown.project.hyscan.pojo.CommonResult;
import com.noknown.project.hyscan.service.AnalysisService;
import com.noknown.project.hyscan.util.AlgoUtil;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * @author guodong
 */
@Service
@Transactional(rollbackOn = Exception.class)
public class AnalysisServiceImpl implements AnalysisService {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private final ModelConfigRepo mcDao;
	private final AlgoConfigRepo acDao;
	private final GlobalConfigDao gcDao;
	private final Loader algoLoader;
	private final ScanTaskDao scanTaskDao;
	private final ScanTaskDataRepo scanTaskDataDao;

	private Map<String, Properties> dictMap = new HashMap<>();

	@Autowired
	public AnalysisServiceImpl(ModelConfigRepo mcDao, AlgoConfigRepo acDao, GlobalConfigDao gcDao, Loader algoLoader, ScanTaskDao scanTaskDao, ScanTaskDataRepo scanTaskDataDao) {
		this.mcDao = mcDao;
		this.acDao = acDao;
		this.gcDao = gcDao;
		this.algoLoader = algoLoader;
		this.scanTaskDao = scanTaskDao;
		this.scanTaskDataDao = scanTaskDataDao;
	}

	@PostConstruct
	public void init() {
		ConfigRepo repo = gcDao.getConfigRepo(Constants.RESULT_DICT_CONFIG);
		if (repo != null) {
			dictMap = repo.getConfigs();
		}
	}

	@Override
	public AbstractResult analysis(String taskId, String algoVersion) throws ServiceException, DaoException {
		ScanTask task = scanTaskDao.findById(taskId).orElse(null);
		if (task == null) {
			throw new ServiceException("任务不存在");
		}
		ScanTaskData taskData = scanTaskDataDao.get(taskId);
		if (taskData == null) {
			throw new ServiceException("任务数据不存在");
		}
		double[] ref = AlgoUtil.getReflectivity(taskData.getDn(), taskData.getDarkCurrent(), taskData.getWhiteboardData());

		AbstractResult resultIF = analysis(ref, task.getAppId(), task.getDeviceModel(), task.getTargetType(), algoVersion);
		resultIF.fillTask(task);
		scanTaskDao.save(task);
		return resultIF;
	}

	@Override
	public AbstractResult analysis(double[] reflectivity, String appId, String model, String target, String algoVersion) throws ServiceException, DaoException {
		ModelConfig mc = mcDao.get(model);
		if (mc == null) {
			throw new ServiceException("不支持该型号的设备");
		}
		AlgoConfig algoConfig = acDao.get(appId + "-" + model);
		if (algoConfig == null) {
			throw new ServiceException("不支持该应用类型或者设置型号");
		}

		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException("数据长度不正确, 该型号对应数据长度为【" + wavelengths.length + "】,提供长度为【" + reflectivity.length + "】");
		}
		AbstractAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)) {
			algo = algoLoader.getAlgo(algoVersion);
		} else {
			algo = algoLoader.getCurrentAlgo();
		}
		if (algo == null) {
			throw new ServiceException("算法未指定，或者没有正确加载，请联系管理员");
		}

		double[][] sampleData = new double[wavelengths.length][2];
		for (int i = 0; i < wavelengths.length; i++) {
			sampleData[i] = new double[]{wavelengths[i], reflectivity[i] * 0.01};
		}

		Map<String, AlgoItem> algos = algoConfig.getAlgos();
		if (algos == null || algos.isEmpty()) {
			throw new ServiceException("没有" + appId + "检测算法配置");
		}

		double[] data = new double[algos.size()];
		String[] unit = new String[algos.size()];
		String[] name = new String[algos.size()];
		int[] decimal = new int[algos.size()];
		String[] chineseName = new String[algos.size()];

		try {
			for (AlgoItem ac : algos.values()) {
				double value = algo.analysis(sampleData, appId, target, ac.getKey());
				if (Double.isInfinite(value)) {
					value = 0;
				}
				data[ac.getSeq()] = value;
				unit[ac.getSeq()] = ac.getUnit();
				name[ac.getSeq()] = ac.getKey();
				chineseName[ac.getSeq()] = ac.getChineseName();
				decimal[ac.getSeq()] = ac.getDecimal();
			}
		} catch (Throwable e) {
			logger.error(ExceptionUtils.getFullStackTrace(e));
			throw new ServiceException("算法执行出错:" + e.getCause().getMessage(), e);
		}

		ConfigRepo repo = gcDao.getConfigRepo(Constants.RESULT_DICT_CONFIG);
		if (repo != null) {
			dictMap = repo.getConfigs();
		}
		return new CommonResult()
				.setChineseName(chineseName)
				.setData(data)
				.setName(name)
				.setUnit(unit)
				.setDecimal(decimal)
				.setAppId(appId)
				.setDict(dictMap.get(appId));
	}


}
