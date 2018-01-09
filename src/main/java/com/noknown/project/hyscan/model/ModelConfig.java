package com.noknown.project.hyscan.model;

import java.io.Serializable;
import java.util.Map;


/**
 * 光谱仪型号对应配置
 * @author cody
 *
 */
public class ModelConfig  implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7531357836202317875L;

	/**
	 * 型号
	 */
	private String model;
	
	/**
	 * 描述
	 */
	private String desc;
	
	/**
	 * 辐亮度参数
	 */
	private float[] radianceParams;
	
	/**
	 * 光谱坐标范围
	 */
	private int[] spectralRange;
	
	/**
	 * 波长范围
	 */
	private double[] wavelengths;
	
	/**
	 * 标准光谱数据
	 */
	private double[][] olderLevelNormData;
	
	/**
	 * 材质光谱数据
	 */
	private double[][] materialNormData;
	
	/**
	 * 材料检测阈值
	 */
	private double materialThreshold;
	
	/**
	 * 水质检测算法配置
	 */
	private Map<String, WDAlgoConfig> wdAlgos;

	/**
	 * @return the model
	 */
	public String getModel() {
		return model;
	}

	/**
	 * @param model the model to set
	 */
	public void setModel(String model) {
		this.model = model;
	}

	/**
	 * @return the radianceParams
	 */
	public float[] getRadianceParams() {
		return radianceParams;
	}

	/**
	 * @param radianceParams the radianceParams to set
	 */
	public void setRadianceParams(float[] radianceParams) {
		this.radianceParams = radianceParams;
	}

	/**
	 * @return the spectralRange
	 */
	public int[] getSpectralRange() {
		return spectralRange;
	}

	/**
	 * @param spectralRange the spectralRange to set
	 */
	public void setSpectralRange(int[] spectralRange) {
		this.spectralRange = spectralRange;
	}

	/**
	 * @return the olderLevelNormData
	 */
	public double[][] getOlderLevelNormData() {
		return olderLevelNormData;
	}

	/**
	 * @param olderLevelNormData the olderLevelNormData to set
	 */
	public void setOlderLevelNormData(double[][] olderLevelNormData) {
		this.olderLevelNormData = olderLevelNormData;
	}

	/**
	 * @return the materialNormData
	 */
	public double[][] getMaterialNormData() {
		return materialNormData;
	}

	/**
	 * @param materialNormData the materialNormData to set
	 */
	public void setMaterialNormData(double[][] materialNormData) {
		this.materialNormData = materialNormData;
	}

	/**
	 * @return the materialThreshold
	 */
	public double getMaterialThreshold() {
		return materialThreshold;
	}

	/**
	 * @param materialThreshold the materialThreshold to set
	 */
	public void setMaterialThreshold(double materialThreshold) {
		this.materialThreshold = materialThreshold;
	}

	/**
	 * @return the desc
	 */
	public String getDesc() {
		return desc;
	}

	/**
	 * @param desc the desc to set
	 */
	public void setDesc(String desc) {
		this.desc = desc;
	}

	/**
	 * @return the wavelengths
	 */
	public double[] getWavelengths() {
		return wavelengths;
	}

	/**
	 * @param wavelengths the wavelengths to set
	 */
	public void setWavelengths(double[] wavelengths) {
		this.wavelengths = wavelengths;
	}

	public Map<String, WDAlgoConfig> getWdAlgos() {
		return wdAlgos;
	}

	public void setWdAlgos(Map<String, WDAlgoConfig> wdAlgos) {
		this.wdAlgos = wdAlgos;
	}
	
	
}
