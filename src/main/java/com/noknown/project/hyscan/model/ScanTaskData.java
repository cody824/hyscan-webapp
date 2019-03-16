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
	 * 可见光设备类型
	 */
	private String vnir;

	/**
	 * 可见光坐标范围
	 */
	private Integer[] vnirRange;

	/**
	 * 短波设备类型
	 */
	private String swir;

	/**
	 * 短波坐标范围
	 */
	private Integer[] swirRange;

	/**
	 * 辐亮度参数
	 */
	private Float[] radianceConfig;

	public boolean check() {
		if (dn == null ||
				darkCurrent == null || whiteboardData == null) {
			return false;
		}
		if (dn.length != darkCurrent.length || dn.length != whiteboardData.length) {
			return false;
		}

		int wl = 0;
		if (vnirRange != null) {
			if (vnirRange.length != 2) {
				return false;
			}
			wl += vnirRange[1] - vnirRange[0] + 1;
		}
		if (swirRange != null) {
			if (swirRange.length != 2) {
				return false;
			}
			wl += swirRange[1] - swirRange[0] + 1;
		}
		if (wl == 0 && range != null) {
			if (range.length != 2) {
				return false;
			}
			wl = range[1] - range[0] + 1;
		}
		return wl == dn.length;
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

	public String getVnir() {
		return vnir;
	}

	public ScanTaskData setVnir(String vnir) {
		this.vnir = vnir;
		return this;
	}

	public Integer[] getVnirRange() {
		return vnirRange;
	}

	public ScanTaskData setVnirRange(Integer[] vnirRange) {
		this.vnirRange = vnirRange;
		return this;
	}

	public String getSwir() {
		return swir;
	}

	public ScanTaskData setSwir(String swir) {
		this.swir = swir;
		return this;
	}

	public Integer[] getSwirRange() {
		return swirRange;
	}

	public ScanTaskData setSwirRange(Integer[] swirRange) {
		this.swirRange = swirRange;
		return this;
	}

	@Override
	public String getKey() {
		return id;
	}
}
