package com.noknown.project.hyscan.pojo;

import com.noknown.framework.common.util.StringUtil;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;

import java.io.Serializable;
import java.sql.Date;

/**
 * @param <T> 结果配置
 * @author guodong
 */
public class AppScanTask<T extends AbstractResult> implements Serializable {

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

	private String targetType;

	public ScanTask toTaskInfo() {
		ScanTask task = new ScanTask();
		task.setId(getId());
		task.setUserId(getUserId());
		task.setAppId(getAppId());
		
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
		if (StringUtil.isNotBlank(getTargetType())) {
			task.setTargetType(getTargetType());
		}
		return task;
	}
	
	public ScanTaskData toTaskData() {
		ScanTaskData scanTaskData = new ScanTaskData();
		scanTaskData.setId(getId());
		
		if (getDevice() != null) {
			scanTaskData.setRange(getDevice().getSpectralRange());
			scanTaskData.setVnir(getDevice().getVnir());
			scanTaskData.setVnirRange(getDevice().getVnirRange());
			scanTaskData.setSwir(getDevice().getSwir());
			scanTaskData.setSwirRange(getDevice().getSwirRange());
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

	public String getId() {
		return id;
	}

	public AppScanTask<T> setId(String id) {
		this.id = id;
		return this;
	}

	public Integer getUserId() {
		return userId;
	}

	public AppScanTask<T> setUserId(Integer userId) {
		this.userId = userId;
		return this;
	}

	public T getResult() {
		return result;
	}

	public AppScanTask<T> setResult(T result) {
		this.result = result;
		return this;
	}

	public Position getPosition() {
		return position;
	}

	public AppScanTask<T> setPosition(Position position) {
		this.position = position;
		return this;
	}

	public String getName() {
		return name;
	}

	public AppScanTask<T> setName(String name) {
		this.name = name;
		return this;
	}

	public String getImagePath() {
		return imagePath;
	}

	public AppScanTask<T> setImagePath(String imagePath) {
		this.imagePath = imagePath;
		return this;
	}

	public Device getDevice() {
		return device;
	}

	public AppScanTask<T> setDevice(Device device) {
		this.device = device;
		return this;
	}

	public DataSet getData() {
		return data;
	}

	public AppScanTask<T> setData(DataSet data) {
		this.data = data;
		return this;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public AppScanTask<T> setTimestamp(long timestamp) {
		this.timestamp = timestamp;
		return this;
	}

	public String getAppId() {
		return appId;
	}

	public AppScanTask<T> setAppId(String appId) {
		this.appId = appId;
		return this;
	}

	public String getTargetType() {
		return targetType;
	}

	public AppScanTask<T> setTargetType(String targetType) {
		this.targetType = targetType;
		return this;
	}
}
