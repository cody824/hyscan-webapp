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
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Locale;
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
	private final MessageSource messageSource;

	private Map<String, Properties> dictMap = new HashMap<>();

	@Autowired
	public AnalysisServiceImpl(ModelConfigRepo mcDao, AlgoConfigRepo acDao, GlobalConfigDao gcDao, Loader algoLoader, ScanTaskDao scanTaskDao, ScanTaskDataRepo scanTaskDataDao, MessageSource messageSource) {
		this.mcDao = mcDao;
		this.acDao = acDao;
		this.gcDao = gcDao;
		this.algoLoader = algoLoader;
		this.scanTaskDao = scanTaskDao;
		this.scanTaskDataDao = scanTaskDataDao;
		this.messageSource = messageSource;
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
		Locale locale = LocaleContextHolder.getLocale();

		ScanTask task = scanTaskDao.findById(taskId).orElse(null);
		if (task == null) {
			throw new ServiceException(messageSource.getMessage("task_not_found", null, locale));
		}
		ScanTaskData taskData = scanTaskDataDao.get(taskId);
		if (taskData == null) {
			throw new ServiceException(messageSource.getMessage("data_not_exist", null, locale));
		}
		double[] ref = AlgoUtil.getReflectivity(taskData.getDn(), taskData.getDarkCurrent(), taskData.getWhiteboardData());

		AbstractResult resultIF = analysis(ref, task.getAppId(), task.getDeviceModel(), task.getTargetType(), algoVersion);
		resultIF.fillTask(task);
		scanTaskDao.save(task);
		return resultIF;
	}

	@Override
	public AbstractResult analysis(double[] reflectivity, String appId, String model, String target, String algoVersion) throws ServiceException, DaoException {
		Locale locale = LocaleContextHolder.getLocale();
		ModelConfig mc = mcDao.get(model);
		if (mc == null) {
			throw new ServiceException(messageSource.getMessage("model_not_support", null, "不支持该型号的设备", locale));
		}
		AlgoConfig algoConfig = acDao.get(appId + "-" + model);
		if (algoConfig == null) {
			throw new ServiceException(messageSource.getMessage("app_not_support_or_model_not_setup", null, "不支持该应用类型或者设置型号", locale));
		}

		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException(messageSource.getMessage("data_length_error", new Object[]{wavelengths.length, reflectivity.length}, "数据长度不正确, 该型号对应数据长度为【{0}】,提供长度为【{1}】", locale));
		}
		AbstractAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)) {
			algo = algoLoader.getAlgo(algoVersion);
		} else {
			algo = algoLoader.getCurrentAlgo();
		}
		if (algo == null) {
			throw new ServiceException(messageSource.getMessage("algo_not_setup_or_load_error", null, "算法未指定，或者没有正确加载，请联系管理员", locale));
		}

		double[][] sampleData = new double[wavelengths.length][2];
		for (int i = 0; i < wavelengths.length; i++) {
			sampleData[i] = new double[]{wavelengths[i], reflectivity[i] * 0.01};
		}

		Map<String, AlgoItem> algos = algoConfig.getAlgos();
		if (algos == null || algos.isEmpty()) {
			throw new ServiceException(messageSource.getMessage("no_algo_config_for_app", new Object[]{appId}, "没有{0}检测算法配置", locale));
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
			throw new ServiceException(messageSource.getMessage("algo_exec_error", new Object[]{e.getCause().getMessage()}, "执行算法出错：{0}", locale), e);
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
