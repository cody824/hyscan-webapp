package com.noknown.project.hyscan.model;

import com.noknown.framework.common.base.BaseObj;

import java.io.Serializable;


/**
 * 光谱仪型号对应配置
 * @author cody
 *
 */
public class MaterialAlgoConfig implements Serializable, BaseObj {


    private static final long serialVersionUID = -1585116345337818358L;
    /**
	 * 型号
	 */
	private String model;

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

	public String getModel() {
		return model;
	}

	public MaterialAlgoConfig setModel(String model) {
		this.model = model;
		return this;
	}

	public double[][] getOlderLevelNormData() {
		return olderLevelNormData;
	}

	public MaterialAlgoConfig setOlderLevelNormData(double[][] olderLevelNormData) {
		this.olderLevelNormData = olderLevelNormData;
		return this;
	}

	public double[][] getMaterialNormData() {
		return materialNormData;
	}

	public MaterialAlgoConfig setMaterialNormData(double[][] materialNormData) {
		this.materialNormData = materialNormData;
		return this;
	}

	public double getMaterialThreshold() {
		return materialThreshold;
	}

	public MaterialAlgoConfig setMaterialThreshold(double materialThreshold) {
		this.materialThreshold = materialThreshold;
		return this;
	}

	@Override
	public String getKey() {
		return model;
	}
}
