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
	 * 光谱检测DN最大值
	 */
	private int dnMaxValue;

	/**
	 * 辐亮度参数
	 */
	private Float[] radianceParams;


	/**
	 * 描述
	 */
	private String desc;

	/**
	 * 光谱坐标范围
	 */
	private Integer[] spectralRange;


	/**
	 * 可见近红外型号
	 */
	private String vnir;

	/**
	 * 可见近红外光谱坐标范围
	 */
	private Integer[] vnirRange;

	/**
	 * 短波红外型号
	 */
	private String swir;

	/**
	 * 短波红外光谱坐标范围
	 */
	private Integer[] swirRange;
	
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

	public Integer[] getSpectralRange() {
		return spectralRange;
	}

	public ModelConfig setSpectralRange(Integer[] spectralRange) {
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

	public Float[] getRadianceParams() {
		return radianceParams;
	}

	public ModelConfig setRadianceParams(Float[] radianceParams) {
		this.radianceParams = radianceParams;
		return this;
	}

	public int getDnMaxValue() {
		return dnMaxValue;
	}

	public ModelConfig setDnMaxValue(int dnMaxValue) {
		this.dnMaxValue = dnMaxValue;
		return this;
	}

	public Integer[] getVnirRange() {
		return vnirRange;
	}

	public ModelConfig setVnirRange(Integer[] vnirRange) {
		this.vnirRange = vnirRange;
		return this;
	}

	public Integer[] getSwirRange() {
		return swirRange;
	}

	public ModelConfig setSwirRange(Integer[] swirRange) {
		this.swirRange = swirRange;
		return this;
	}

	public String getVnir() {
		return vnir;
	}

	public ModelConfig setVnir(String vnir) {
		this.vnir = vnir;
		return this;
	}

	public String getSwir() {
		return swir;
	}

	public ModelConfig setSwir(String swir) {
		this.swir = swir;
		return this;
	}

	@Override
	public String getKey() {
		return model;
	}
}
