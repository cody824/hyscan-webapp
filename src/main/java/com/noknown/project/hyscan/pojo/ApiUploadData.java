package com.noknown.project.hyscan.pojo;

/**
 * @author guodong
 */
public class ApiUploadData {

	private Device device;

	private String appId;

	private String name;

	/**
	 * 暗电流数据
	 */
	private Integer[] darkCurrent;

	/**
	 * 白板数据
	 */
	private Integer[] whiteboardData;

	/**
	 * 数据集
	 */
	private UploadTaskData[] dataSets;

	public Device getDevice() {
		return device;
	}

	public ApiUploadData setDevice(Device device) {
		this.device = device;
		return this;
	}

	public String getAppId() {
		return appId;
	}

	public ApiUploadData setAppId(String appId) {
		this.appId = appId;
		return this;
	}

	public String getName() {
		return name;
	}

	public ApiUploadData setName(String name) {
		this.name = name;
		return this;
	}

	public Integer[] getDarkCurrent() {
		return darkCurrent;
	}

	public ApiUploadData setDarkCurrent(Integer[] darkCurrent) {
		this.darkCurrent = darkCurrent;
		return this;
	}

	public Integer[] getWhiteboardData() {
		return whiteboardData;
	}

	public ApiUploadData setWhiteboardData(Integer[] whiteboardData) {
		this.whiteboardData = whiteboardData;
		return this;
	}

	public UploadTaskData[] getDataSets() {
		return dataSets;
	}

	public ApiUploadData setDataSets(UploadTaskData[] dataSets) {
		this.dataSets = dataSets;
		return this;
	}
}
