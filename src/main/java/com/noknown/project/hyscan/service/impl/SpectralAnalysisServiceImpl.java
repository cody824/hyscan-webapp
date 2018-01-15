package com.noknown.project.hyscan.service.impl;

import java.util.Map;
import java.util.Properties;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noknown.framework.common.dao.GlobalConfigDao;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.project.hyscan.algorithm.Loader;
import com.noknown.project.hyscan.algorithm.SpectralAnalysisAlgo;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.dao.ModelConfigDao;
import com.noknown.project.hyscan.model.ModelConfig;
import com.noknown.project.hyscan.model.WDAlgoConfig;
import com.noknown.project.hyscan.pojo.MaterialResult;
import com.noknown.project.hyscan.pojo.Result;
import com.noknown.project.hyscan.pojo.WQResult;
import com.noknown.project.hyscan.service.SpectralAnalysisService;

@SuppressWarnings("deprecation")
@Service
public class SpectralAnalysisServiceImpl implements SpectralAnalysisService {
	
	@Autowired
	private ModelConfigDao mcDao;
	
	@Autowired
	private GlobalConfigDao gcDao;
	
	@Autowired
	private Loader algoLoader;
	
	private static Properties materialProps;
	
	@PostConstruct
	public void init(){
		Properties materialProps = gcDao.getProperties(Constants.materialConfig, Constants.appId);
		if (materialProps == null)
			materialProps = new Properties();
		SpectralAnalysisServiceImpl.materialProps = materialProps;
	}
	

	/**
	 * @deprecated
	 */
	@Override
	public Result analysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DAOException  {
		ModelConfig mc = mcDao.getModelConfig(model);
		if (mc == null)
			throw new ServiceException("不支持该型号的设备");
		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException("数据长度不正确, 该型号对应数据长度为【" + wavelengths.length + "】,提供长度为【" + reflectivity.length + "】");
		}
		SpectralAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)){
			algo = algoLoader.getAlgo(algoVersion);
		} else {
			algo = algoLoader.getCurrentAlgo();
		}
		if (algo == null)
			throw new ServiceException("算法未指定，或者没有正确加载，请联系管理员");
		
		
		double[][] sampleData = new double[wavelengths.length][2];
		for (int i = 0; i < wavelengths.length; i++) {
			sampleData[i] = new double[]{wavelengths[i], reflectivity[i]};
		}
		
		double[][] olderLevelNormData = mc.getOlderLevelNormData();
		
		double [][]normData = new double[1 + olderLevelNormData.length][wavelengths.length];
		normData[0] = wavelengths;
		for (int i = 1; i < normData.length; i++){
			normData[i] = olderLevelNormData[i - 1];
		}
		int oldLevel = algo.olderLevel(sampleData, normData);
		
		double[][] materialNormData = mc.getMaterialNormData();
		
		
		normData = new double[1 + materialNormData.length][wavelengths.length];
		normData[0] = wavelengths;
		for (int i = 1; i < normData.length; i++){
			normData[i] = materialNormData[i - 1];
		}
		int materialIndex = algo.material(sampleData, normData, mc.getMaterialThreshold());
		
		String material = materialProps.getProperty("" + materialIndex, "未知材料");
		
		Result result = new Result();
		result.setMaterialIndex(materialIndex);
		result.setLevel(oldLevel);
		result.setMaterial(material);
		return result;
	}


	@Override
	public int analysisOldLevel(double[] reflectivity, String model, String algoVersion)
			throws ServiceException, DAOException {
		ModelConfig mc = mcDao.getModelConfig(model);
		if (mc == null)
			throw new ServiceException("不支持该型号的设备");
		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException("数据长度不正确, 该型号对应数据长度为【" + wavelengths.length + "】,提供长度为【" + reflectivity.length + "】");
		}
		SpectralAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)){
			algo = algoLoader.getAlgo(algoVersion);
		} else {
			algo = algoLoader.getCurrentAlgo();
		}
		if (algo == null)
			throw new ServiceException("算法未指定，或者没有正确加载，请联系管理员");
		
		
		double[][] sampleData = new double[wavelengths.length][2];
		for (int i = 0; i < wavelengths.length; i++) {
			sampleData[i] = new double[]{wavelengths[i], reflectivity[i]};
		}
		
		double[][] olderLevelNormData = mc.getOlderLevelNormData();
		
		double [][]normData = new double[1 + olderLevelNormData.length][wavelengths.length];
		normData[0] = wavelengths;
		for (int i = 1; i < normData.length; i++){
			normData[i] = olderLevelNormData[i - 1];
		}
		return algo.olderLevel(sampleData, normData);
	}


	@Override
	public int analysisMaterial(double[] reflectivity, String model, String algoVersion)
			throws ServiceException, DAOException {
		ModelConfig mc = mcDao.getModelConfig(model);
		if (mc == null)
			throw new ServiceException("不支持该型号的设备");
		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException("数据长度不正确, 该型号对应数据长度为【" + wavelengths.length + "】,提供长度为【" + reflectivity.length + "】");
		}
		SpectralAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)){
			algo = algoLoader.getAlgo(algoVersion);
		} else {
			algo = algoLoader.getCurrentAlgo();
		}
		if (algo == null)
			throw new ServiceException("算法未指定，或者没有正确加载，请联系管理员");
		
		
		double[][] sampleData = new double[wavelengths.length][2];
		for (int i = 0; i < wavelengths.length; i++) {
			sampleData[i] = new double[]{wavelengths[i], reflectivity[i]};
		}
		
		double[][] materialNormData = mc.getMaterialNormData();
		double [][] normData = new double[1 + materialNormData.length][wavelengths.length];
		normData[0] = wavelengths;
		for (int i = 1; i < normData.length; i++){
			normData[i] = materialNormData[i - 1];
		}
		return algo.material(sampleData, normData, mc.getMaterialThreshold());
	}


	@Override
	public MaterialResult materialAnalysis(double[] reflectivity, String model, String algoVersion)
			throws ServiceException, DAOException {
		ModelConfig mc = mcDao.getModelConfig(model);
		if (mc == null)
			throw new ServiceException("不支持该型号的设备");
		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException("数据长度不正确, 该型号对应数据长度为【" + wavelengths.length + "】,提供长度为【" + reflectivity.length + "】");
		}
		SpectralAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)){
			algo = algoLoader.getAlgo(algoVersion);
		} else {
			algo = algoLoader.getCurrentAlgo();
		}
		if (algo == null)
			throw new ServiceException("算法未指定，或者没有正确加载，请联系管理员");
		
		
		double[][] sampleData = new double[wavelengths.length][2];
		for (int i = 0; i < wavelengths.length; i++) {
			sampleData[i] = new double[]{wavelengths[i], reflectivity[i]};
		}
		
		double[][] olderLevelNormData = mc.getOlderLevelNormData();
		
		double [][]normData = new double[1 + olderLevelNormData.length][wavelengths.length];
		normData[0] = wavelengths;
		for (int i = 1; i < normData.length; i++){
			normData[i] = olderLevelNormData[i - 1];
		}
		int oldLevel = algo.olderLevel(sampleData, normData);
		
		double[][] materialNormData = mc.getMaterialNormData();
		
		
		normData = new double[1 + materialNormData.length][wavelengths.length];
		normData[0] = wavelengths;
		for (int i = 1; i < normData.length; i++){
			normData[i] = materialNormData[i - 1];
		}
		int materialIndex = algo.material(sampleData, normData, mc.getMaterialThreshold());
		
		String material = materialProps.getProperty("" + materialIndex, "未知材料");
		
		MaterialResult result = new MaterialResult();
		result.setMaterialIndex(materialIndex);
		result.setLevel(oldLevel);
		result.setMaterial(material);
		return result;
	}


	@Override
	public WQResult wqAnalysis(double[] reflectivity, String model, String algoVersion)
			throws ServiceException, DAOException {
		ModelConfig mc = mcDao.getModelConfig(model);
		if (mc == null)
			throw new ServiceException("不支持该型号的设备");
		double[] wavelengths = mc.getWavelengths();
		if (reflectivity.length != wavelengths.length) {
			throw new ServiceException("数据长度不正确, 该型号对应数据长度为【" + wavelengths.length + "】,提供长度为【" + reflectivity.length + "】");
		}
		SpectralAnalysisAlgo algo;
		if (StringUtil.isNotBlank(algoVersion)){
			algo = algoLoader.getAlgo(algoVersion);
		} else {
			algo = algoLoader.getCurrentAlgo();
		}
		if (algo == null)
			throw new ServiceException("算法未指定，或者没有正确加载，请联系管理员");
		
		double[][] sampleData = new double[wavelengths.length][2];
		for (int i = 0; i < wavelengths.length; i++) {
			sampleData[i] = new double[]{wavelengths[i], reflectivity[i] * 0.01};
		}
		
		//TODO normal数据
		Map<String, WDAlgoConfig> algos = mc.getWdAlgos();
		if (algos == null || algos.isEmpty()) {
			throw new ServiceException("没有水质检测算法配置");
		}
		
		double[] data = new double[algos.size()];
		String[] unit = new String[algos.size()];
		String[] name = new String[algos.size()];
		int[] decimal = new int[algos.size()];
		String[] chineseName =  new String[algos.size()];
		
		for (WDAlgoConfig ac : algos.values()) {
			double value = algo.waterDetection(sampleData, ac.getWaveIndex(), ac.getKey());
			if (Double.isInfinite(value))
				value = -1;
			data[ac.getSeq()] = value;
			unit[ac.getSeq()] = ac.getUnit();
			name[ac.getSeq()] = ac.getKey();
			chineseName[ac.getSeq()] = ac.getChineseName();
			decimal[ac.getSeq()] = ac.getDecimal();
		}
		WQResult result = new WQResult();
		result.setChineseName(chineseName);
		result.setData(data);
		result.setName(name);
		result.setUnit(unit);
		result.setDecimal(decimal);
		return result;
	}

	

}
