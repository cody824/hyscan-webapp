package com.noknown.project.hyscan.pojo;

public class DataSet {

	/**
	 * 采集数据平均值
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

	public Integer[][] getDnList() {
		return dnList;
	}

	public void setDnList(Integer[][] dnList) {
		this.dnList = dnList;
	}
	
}
