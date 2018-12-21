package com.noknown.project.hyscan.model;

import com.noknown.framework.common.base.BaseObj;

import java.io.Serializable;


public class ScanTaskData implements Serializable, BaseObj{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6706729246664883358L;

	private String id;
	
	/**
	 * DN值
	 */
	private Integer[] dn;

	/**
	 * 所有采集数据集合
	 */
	private Integer[][] dnList;
	
	/**
	 * 暗电流数据
	 */
	private Integer[] darkCurrent;
	
	/**
	 * 白板数据
	 */
	private Integer[] whiteboardData;
	
	/**
	 * 坐标范围
	 */
	private Integer[] range;
	
	/**
	 * 辐亮度参数
	 */
	private Float[] radianceConfig;

	public boolean check() {
		if (range == null || dn == null ||
				darkCurrent == null || whiteboardData == null) {
			return false;
		}
		if (dn.length != darkCurrent.length || dn.length != whiteboardData.length) {
			return false;
		}
		if (range.length != 2) {
			return false;
		}
		return (range[1] - range[0]) == (dn.length - 1);
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the dn
	 */
	public Integer[] getDn() {
		return dn;
	}

	/**
	 * @param dn the dn to set
	 */
	public void setDn(Integer[] dn) {
		this.dn = dn;
	}

	/**
	 * @return the darkCurrent
	 */
	public Integer[] getDarkCurrent() {
		return darkCurrent;
	}

	/**
	 * @param darkCurrent the darkCurrent to set
	 */
	public void setDarkCurrent(Integer[] darkCurrent) {
		this.darkCurrent = darkCurrent;
	}

	/**
	 * @return the whiteboardData
	 */
	public Integer[] getWhiteboardData() {
		return whiteboardData;
	}

	/**
	 * @param whiteboardData the whiteboardData to set
	 */
	public void setWhiteboardData(Integer[] whiteboardData) {
		this.whiteboardData = whiteboardData;
	}

	/**
	 * @return the range
	 */
	public Integer[] getRange() {
		return range;
	}

	/**
	 * @param range the range to set
	 */
	public void setRange(Integer[] range) {
		this.range = range;
	}

	/**
	 * @return the radianceConfig
	 */
	public Float[] getRadianceConfig() {
		return radianceConfig;
	}

	/**
	 * @param radianceConfig the radianceConfig to set
	 */
	public void setRadianceConfig(Float[] radianceConfig) {
		this.radianceConfig = radianceConfig;
	}

	public Integer[][] getDnList() {
		return dnList;
	}

	public void setDnList(Integer[][] dnList) {
		this.dnList = dnList;
	}

	@Override
	public String getKey() {
		return id;
	}
}
