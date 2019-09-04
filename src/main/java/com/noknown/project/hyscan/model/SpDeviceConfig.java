package com.noknown.project.hyscan.model;

import com.noknown.framework.common.base.BaseObj;

import java.io.Serializable;

/**
 * @author guodong
 * @date 2019/9/3
 */
public class SpDeviceConfig implements Serializable, BaseObj {

	private String serial;

	private String address;

	private String model;

	private String firmware;

	private Integer[] darkCurrent;

	private Integer[] whiteboardData;

	public String getSerial() {
		return serial;
	}

	public SpDeviceConfig setSerial(String serial) {
		this.serial = serial;
		return this;
	}

	public String getAddress() {
		return address;
	}

	public SpDeviceConfig setAddress(String address) {
		this.address = address;
		return this;
	}

	public String getModel() {
		return model;
	}

	public SpDeviceConfig setModel(String model) {
		this.model = model;
		return this;
	}

	public String getFirmware() {
		return firmware;
	}

	public SpDeviceConfig setFirmware(String firmware) {
		this.firmware = firmware;
		return this;
	}

	public Integer[] getDarkCurrent() {
		return darkCurrent;
	}

	public SpDeviceConfig setDarkCurrent(Integer[] darkCurrent) {
		this.darkCurrent = darkCurrent;
		return this;
	}

	public Integer[] getWhiteboardData() {
		return whiteboardData;
	}

	public SpDeviceConfig setWhiteboardData(Integer[] whiteboardData) {
		this.whiteboardData = whiteboardData;
		return this;
	}

	@Override
	public String getKey() {
		return serial;
	}
}
