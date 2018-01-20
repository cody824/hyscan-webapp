package com.noknown.project.hyscan.model;

import com.noknown.framework.common.base.BaseObj;

import java.io.Serializable;
import java.util.Map;


/**
 * 光谱仪型号对应配置
 * @author cody
 *
 */
public class WDAlgoConfig implements Serializable, BaseObj{


    private static final long serialVersionUID = -2333771196492515115L;

    /**
	 * 型号
	 */
	private String model;

	/**
	 * 水质检测算法配置
	 */
	private Map<String, WDAlgoItem> wdAlgos;

	public String getModel() {
		return model;
	}

	public WDAlgoConfig setModel(String model) {
		this.model = model;
		return this;
	}

	public Map<String, WDAlgoItem> getWdAlgos() {
		return wdAlgos;
	}

	public WDAlgoConfig setWdAlgos(Map<String, WDAlgoItem> wdAlgos) {
		this.wdAlgos = wdAlgos;
		return this;
	}

	@Override
	public String getKey() {
		return model;
	}
}
