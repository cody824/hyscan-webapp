package com.noknown.project.hyscan.pojo;

import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;

import java.io.Serializable;
import java.sql.Date;

public class AppScanTask<T extends ResultIF> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5368126175585738537L;

	private String id;
	
	private Integer userId;
	
	private T result;
	
	private Position position;
	
	private String name;
	
	private String imagePath;
	
	private Device device;
	
	private DataSet data;
	
	private long timestamp;
	
	private String appId;
	
	public ScanTask toTaskInfo() {
		ScanTask task = new ScanTask();
		task.setId(getId());
		task.setUserId(getUserId());
		task.setAppId(getAppId());
		
		task.setImagePath(getImagePath());
		task.setScanTarget(getName());
		task.setScanTime(new Date(getTimestamp()));
		
		if (getPosition() != null) {
			task.setCity(getPosition().getCity());
			task.setLon(getPosition().getLon());
			task.setLat(getPosition().getLat());
			task.setAddress(getPosition().getAddress());
		}
		
		if (getResult() != null) {
			result.fillTask(task);
		}
		
		if (getDevice() != null) {
			task.setDeviceAddress(getDevice().getAddress());
			task.setDeviceFirmware(getDevice().getFirmware());
			task.setDeviceModel(getDevice().getModel());
			task.setDeviceSerial(getDevice().getSerial());
		}
		return task;
	}
	
	public ScanTaskData toTaskData() {
		ScanTaskData scanTaskData = new ScanTaskData();
		scanTaskData.setId(getId());
		
		if (getDevice() != null) {
			scanTaskData.setRange(getDevice().getSpectralRange());
			Float[] radianceConfig = new Float[2];
			
			radianceConfig[0] = getDevice().getRadianceA();
			radianceConfig[1] = getDevice().getRadianceB();
			scanTaskData.setRadianceConfig(radianceConfig);
		}
		
		if (getData() != null) {
			scanTaskData.setDn(getData().getDn());
			scanTaskData.setDnList(getData().getDnList());
			scanTaskData.setDarkCurrent(getData().getDarkCurrent());
			scanTaskData.setWhiteboardData(getData().getWhiteboardData());
		}
		return scanTaskData;
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
	 * @return the result
	 */
	public T getResult() {
		return result;
	}

	/**
	 * @param result the result to set
	 */
	public void setResult(T result) {
		this.result = result;
	}

	/**
	 * @return the position
	 */
	public Position getPosition() {
		return position;
	}

	/**
	 * @param position the position to set
	 */
	public void setPosition(Position position) {
		this.position = position;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the imagePath
	 */
	public String getImagePath() {
		return imagePath;
	}

	/**
	 * @param imagePath the imagePath to set
	 */
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	/**
	 * @return the device
	 */
	public Device getDevice() {
		return device;
	}

	/**
	 * @param device the device to set
	 */
	public void setDevice(Device device) {
		this.device = device;
	}

	/**
	 * @return the data
	 */
	public DataSet getData() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData(DataSet data) {
		this.data = data;
	}

	/**
	 * @return the timestamp
	 */
	public long getTimestamp() {
		return timestamp;
	}

	/**
	 * @param timestamp the timestamp to set
	 */
	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	/**
	 * @return the userId
	 */
	public Integer getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}
	
	
}
