package com.noknown.project.hyscan.model;

import com.noknown.framework.common.base.BaseObj;

import java.io.Serializable;


/**
 * 光谱仪型号对应配置
 * @author cody
 *
 */
public class ModelConfig  implements Serializable, BaseObj {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7531357836202317875L;

	/**
	 * 型号
	 */
	private String model;

	/**
	 * 辐亮度参数
	 */
	private float[] radianceParams;


	/**
	 * 描述
	 */
	private String desc;

	/**
	 * 光谱坐标范围
	 */
	private int[] spectralRange;
	
	/**
	 * 波长范围
	 */
	private double[] wavelengths;

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getModel() {
		return model;
	}

	public ModelConfig setModel(String model) {
		this.model = model;
		return this;
	}

	public String getDesc() {
		return desc;
	}

	public ModelConfig setDesc(String desc) {
		this.desc = desc;
		return this;
	}

	public int[] getSpectralRange() {
		return spectralRange;
	}

	public ModelConfig setSpectralRange(int[] spectralRange) {
		this.spectralRange = spectralRange;
		return this;
	}

	public double[] getWavelengths() {
		return wavelengths;
	}

	public ModelConfig setWavelengths(double[] wavelengths) {
		this.wavelengths = wavelengths;
		return this;
	}

	public float[] getRadianceParams() {
		return radianceParams;
	}

	public ModelConfig setRadianceParams(float[] radianceParams) {
		this.radianceParams = radianceParams;
		return this;
	}

	@Override
	public String getKey() {
		return model;
	}
}
