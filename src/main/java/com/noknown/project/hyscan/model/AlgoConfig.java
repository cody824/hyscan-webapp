package com.noknown.project.hyscan.model;

import com.noknown.framework.common.base.BaseObj;

import java.io.Serializable;
import java.util.Map;


/**
 * 通用算法配置
 *
 * @author cody
 */
public class AlgoConfig implements Serializable, BaseObj {


	private static final long serialVersionUID = -831056812767023490L;

	/**
	 * 型号
	 */
	private String model;

	/**
	 * 应用ID
	 */
	private String appId;

	/**
	 * 检测算法配置
	 */
	private Map<String, AlgoItem> algos;

	public String getModel() {
		return model;
	}

	public AlgoConfig setModel(String model) {
		this.model = model;
		return this;
	}

	public String getAppId() {
		return appId;
	}

	public AlgoConfig setAppId(String appId) {
		this.appId = appId;
		return this;
	}

	public Map<String, AlgoItem> getAlgos() {
		return algos;
	}

	public AlgoConfig setAlgos(Map<String, AlgoItem> algos) {
		this.algos = algos;
		return this;
	}

	@Override
	public String getKey() {
		return model + "-" + appId;
	}
}
