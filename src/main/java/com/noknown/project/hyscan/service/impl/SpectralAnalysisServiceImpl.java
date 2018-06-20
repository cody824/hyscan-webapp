package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.dao.GlobalConfigDao;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.model.ConfigRepo;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.project.hyscan.algorithm.AbstractAnalysisAlgo;
import com.noknown.project.hyscan.algorithm.Loader;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.*;
import com.noknown.project.hyscan.model.*;
import com.noknown.project.hyscan.pojo.AbstractResult;
import com.noknown.project.hyscan.pojo.MaterialResult;
import com.noknown.project.hyscan.pojo.Result;
import com.noknown.project.hyscan.pojo.WqResult;
import com.noknown.project.hyscan.service.SpectralAnalysisService;
import com.noknown.project.hyscan.util.AlgoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * @deprecated
 * @author guodong
 */
@SuppressWarnings("deprecation")
@Service
@Transactional(rollbackOn = Exception.class)
public class SpectralAnalysisServiceImpl implements SpectralAnalysisService {

	private static Properties materialProps;
	private final ModelConfigRepo mcDao;
	private final MaterialAlgoConfigRepo macDao;
	private final WDAlgoConfigRepo wdacDao;
	private final AlgoConfigRepo acDao;
	private final GlobalConfigDao gcDao;
	private final Loader algoLoader;
	private final ScanTaskDao scanTaskDao;
	private final ScanTaskDataRepo scanTaskDataDao;

	private Map<String, Properties> dictMap = new HashMap<>();

	@Autowired
	public SpectralAnalysisServiceImpl(ModelConfigRepo mcDao, MaterialAlgoConfigRepo macDao, WDAlgoConfigRepo wdacDao, AlgoConfigRepo acDao, GlobalConfigDao gcDao, Loader algoLoader, ScanTaskDao scanTaskDao, ScanTaskDataRepo scanTaskDataDao) {
		this.mcDao = mcDao;
		this.macDao = macDao;
		this.wdacDao = wdacDao;
		this.acDao = acDao;
		this.gcDao = gcDao;
		this.algoLoader = algoLoader;
		this.scanTaskDao = scanTaskDao;
		this.scanTaskDataDao = scanTaskDataDao;
	}

	@PostConstruct
	public void init(){
		Properties materialProps = gcDao.getProperties(Constants.MATERIAL_CONFIG, Constants.APP_ID);
		if (materialProps == null) {
			materialProps = new Properties();
		}
		SpectralAnalysisServiceImpl.materialProps = materialProps;
		ConfigRepo repo = gcDao.getConfigRepo(Constants.RESULT_DICT_CONFIG);
		if (repo != null) {
			dictMap = repo.getConfigs();
		}
	}


	/**
	 * @deprecated
	 */
	@Override
	public Result analysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DaoException {
		ModelConfig mc = mcDao.get(model);
		if (mc == null) {
			throw new ServiceException("不支持该型号的设备");
		}
		MaterialAlgoConfig mac = macDao.get(model);
		if (mac == null) {
			throw new ServiceException("不支持该型号的设备");
		}


		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException("数据长度不正确, 该型号对应数据长度为【" + wavelengths.length + "】,提供长度为【" + reflectivity.length + "】");
		}
		AbstractAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)){
			algo = algoLoader.getAlgo(algoVersion);
		} else {
			algo = algoLoader.getCurrentAlgo();
		}
		if (algo == null) {
			throw new ServiceException("算法未指定，或者没有正确加载，请联系管理员");
		}


		double[][] sampleData = new double[wavelengths.length][2];
		for (int i = 0; i < wavelengths.length; i++) {
			sampleData[i] = new double[]{wavelengths[i], reflectivity[i]};
		}

		double[][] olderLevelNormData = mac.getOlderLevelNormData();

		double [][]normData = new double[1 + olderLevelNormData.length][wavelengths.length];
		normData[0] = wavelengths;
		System.arraycopy(olderLevelNormData, 0, normData, 1, normData.length - 1);
		int oldLevel = (int) algo.analysis(sampleData, "caizhi", null, "oldLevel");

		double[][] materialNormData = mac.getMaterialNormData();


		normData = new double[1 + materialNormData.length][wavelengths.length];
		normData[0] = wavelengths;
		System.arraycopy(materialNormData, 0, normData, 1, normData.length - 1);
		int materialIndex = (int) algo.analysis(sampleData, "caizhi", null, "material");

		String material = materialProps.getProperty("" + materialIndex, "未知材料");

		Result result = new Result();
		result.setMaterialIndex(materialIndex);
		result.setLevel(oldLevel);
		result.setMaterial(material);
		return result;
	}

	@Override
	public AbstractResult analysis(String taskId, String algo) throws ServiceException, DaoException {
		ScanTask task = scanTaskDao.findOne(taskId);
		if (task == null) {
			throw new ServiceException("任务不存在");
		}
		ScanTaskData taskData = scanTaskDataDao.get(taskId);
		if (taskData == null) {
			throw new ServiceException("任务数据不存在");
		}
		String methodName = gcDao.getConfig(Constants.APP_ALGO_CONFIG, task.getAppId(), "algo");
		if (methodName == null) {
			throw new ServiceException("算法配置不存在");
		}
		try {
			Method method = this.getClass().getMethod(methodName, double[].class, String.class, String.class);
			double[] ref = AlgoUtil.getReflectivity(taskData.getDn(), taskData.getDarkCurrent(), taskData.getWhiteboardData());
			AbstractResult resultIF = (AbstractResult) method.invoke(this, ref, task.getDeviceModel(), algo);
			resultIF.fillTask(task);
			scanTaskDao.save(task);
			return resultIF;
		} catch (NoSuchMethodException e) {
			throw new ServiceException(e);
		} catch (IllegalAccessException | InvocationTargetException e) {
			throw new ServiceException(e.getCause());
		}
	}


	@Override
	public MaterialResult materialAnalysis(double[] reflectivity, String model, String algoVersion)
			throws ServiceException, DaoException {
		ModelConfig mc = mcDao.get(model);
		if (mc == null) {
			throw new ServiceException("不支持该型号的设备");
		}
		MaterialAlgoConfig mac = macDao.get(model);
		if (mac == null) {
			throw new ServiceException("不支持该型号的设备");
		}
		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException("数据长度不正确, 该型号对应数据长度为【" + wavelengths.length + "】,提供长度为【" + reflectivity.length + "】");
		}
		AbstractAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)){
			algo = algoLoader.getAlgo(algoVersion);
		} else {
			algo = algoLoader.getCurrentAlgo();
		}
		if (algo == null) {
			throw new ServiceException("算法未指定，或者没有正确加载，请联系管理员");
		}


		double[][] sampleData = new double[wavelengths.length][2];
		for (int i = 0; i < wavelengths.length; i++) {
			sampleData[i] = new double[]{wavelengths[i], reflectivity[i]};
		}

		double[][] olderLevelNormData = mac.getOlderLevelNormData();

		double [][]normData = new double[wavelengths.length][2];
		for (int i = 0; i < normData.length; i++){
			normData[i] = new double[]{wavelengths[i], olderLevelNormData[0][i]};
		}
		int oldLevel = (int) algo.analysis(sampleData, "caizhi", null, "oldLevel");

		double[][] materialNormData = mac.getMaterialNormData();
		normData = new double[wavelengths.length][materialNormData.length + 1];
		for (int i = 0; i < normData.length; i++){
			normData[i][0] = wavelengths[i];
			for (int j = 1; j <= materialNormData.length; j++){
				normData[i][j] = materialNormData[j - 1][i];
			}
		}
		int materialIndex = (int) algo.analysis(sampleData, "caizhi", null, "material");

		String material = materialProps.getProperty("" + materialIndex, "未知材料");
		MaterialResult result = new MaterialResult();
		result.setMaterialIndex(materialIndex);
		result.setLevel(oldLevel);
		result.setMaterial(material);
		return result;
	}


	@Override
	public WqResult wqAnalysis(double[] reflectivity, String model, String algoVersion)
			throws ServiceException, DaoException {
		ModelConfig mc = mcDao.get(model);
		if (mc == null) {
			throw new ServiceException("不支持该型号的设备");
		}
		WDAlgoConfig wdac = wdacDao.get(model);
		if (wdac == null) {
			throw new ServiceException("不支持该型号的设备");
		}

		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException("数据长度不正确, 该型号对应数据长度为【" + wavelengths.length + "】,提供长度为【" + reflectivity.length + "】");
		}
		AbstractAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)){
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

		Map<String, WDAlgoItem> algos = wdac.getWdAlgos();
		if (algos == null || algos.isEmpty()) {
			throw new ServiceException("没有水质检测算法配置");
		}

		double[] data = new double[algos.size()];
		String[] unit = new String[algos.size()];
		String[] name = new String[algos.size()];
		int[] decimal = new int[algos.size()];
		String[] chineseName =  new String[algos.size()];

		for (WDAlgoItem ac : algos.values()) {
			double value = algo.analysis(sampleData, "shuise", null, ac.getKey());
			if (Double.isInfinite(value)) {
				value = 0;
			}
			data[ac.getSeq()] = value;
			unit[ac.getSeq()] = ac.getUnit();
			name[ac.getSeq()] = ac.getKey();
			chineseName[ac.getSeq()] = ac.getChineseName();
			decimal[ac.getSeq()] = ac.getDecimal();
		}
		WqResult result = new WqResult();
		result.setChineseName(chineseName);
		result.setData(data);
		result.setName(name);
		result.setUnit(unit);
		result.setDecimal(decimal);
		return result;
	}

}
