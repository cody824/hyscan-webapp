package com.noknown.project.hyscan.pojo;

import com.noknown.project.hyscan.model.ScanTaskData;

/**
 * @author guodong
 * @date 2019/8/23
 */
public class ApiTaskData {

	private String id;

	/**
	 * DN值
	 */
	private Integer[] dn;

	/**
	 * 暗电流数据
	 */
	private Integer[] darkCurrent;

	/**
	 * 白板数据
	 */
	private Integer[] whiteboardData;

	/**
	 * 波长
	 */
	private double[] wavelengths;


	public ApiTaskData() {

	}

	public ApiTaskData(ScanTaskData scanTaskData, double[] wavelengths) {
		this.wavelengths = wavelengths;
		this.darkCurrent = scanTaskData.getDarkCurrent();
		this.dn = scanTaskData.getDn();
		this.whiteboardData = scanTaskData.getWhiteboardData();
		this.id = scanTaskData.getId();
	}

	public String getId() {
		return id;
	}

	public ApiTaskData setId(String id) {
		this.id = id;
		return this;
	}

	public Integer[] getDn() {
		return dn;
	}

	public ApiTaskData setDn(Integer[] dn) {
		this.dn = dn;
		return this;
	}

	public Integer[] getDarkCurrent() {
		return darkCurrent;
	}

	public ApiTaskData setDarkCurrent(Integer[] darkCurrent) {
		this.darkCurrent = darkCurrent;
		return this;
	}

	public Integer[] getWhiteboardData() {
		return whiteboardData;
	}

	public ApiTaskData setWhiteboardData(Integer[] whiteboardData) {
		this.whiteboardData = whiteboardData;
		return this;
	}

	public double[] getWavelengths() {
		return wavelengths;
	}

	public ApiTaskData setWavelengths(double[] wavelengths) {
		this.wavelengths = wavelengths;
		return this;
	}
}
