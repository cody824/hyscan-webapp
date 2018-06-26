package com.noknown.project.hyscan.model;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.noknown.project.hyscan.pojo.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

/**
 * @author guodong
 */
@Entity
@Table(name = "hyscan_scan_task")
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
public class ScanTask implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = -4472463272007650751L;

	@Id
	@Column(length = 64)
	private String id;

	/**
	 * 用户ID
	 */
	private Integer userId;

	/**
	 * 扫描时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	private Date scanTime;

	/**
	 * 位置：lon信息
	 */
	private float lon;

	/**
	 * 位置 ：lat信息
	 */
	private float lat;

	/**
	 * 位置：城市信息
	 */
	@Column(length = 32)
	private String city;

	/**
	 * 位置：地址信息
	 */
	private String address;

	/**
	 * 设备：名称
	 */
	@Column(length = 32)
	private String scanTarget;

	/**
	 * 设备：照片
	 */
	private String imagePath;

	/**
	 * 光谱仪:地址
	 */
	@Column(length = 32)
	private String deviceAddress;

	/**
	 * 光谱仪:型号
	 */
	@Column(length = 8)
	private String deviceModel;

	/**
	 * 光谱仪:序列号
	 */
	@Column(length = 16)
	private String deviceSerial;

	/**
	 * 光谱仪:固件版本
	 */
	@Column(length = 8)
	private String deviceFirmware;

	@Column(length = 64)
	private String appId;


	@Column(length = 64)
	private String targetType;

	/**
	 * 结果 ：老化等级
	 */
	private int level;

	/**
	 * 结果 ：材质
	 */
	@Column(length = 16)
	private String material;

	/**
	 * 预留结果字段
	 */
	private Double result0;

	/**
	 * 预留结果字段
	 */
	private Double result1;

	/**
	 * 预留结果字段
	 */
	private Double result2;

	/**
	 * 预留结果字段
	 */
	private Double result3;

	/**
	 * 预留结果字段
	 */
	private Double result4;

	/**
	 * 预留结果字段
	 */
	private Double result5;

	/**
	 * 预留结果字段
	 */
	private Double result6;

	/**
	 * 预留结果字段
	 */
	private Double result7;

	/**
	 * 预留结果字段
	 */
	private Double result8;

	/**
	 * 预留结果字段
	 */
	private Double result9;

	/**
	 * 预留结果字段
	 */
	private Double result10;

	public AppScanTask<CommonResult> toAppScanTask(Map<String, AlgoItem> algos, Properties dict, DataSet dataSet) {
		AppScanTask<CommonResult> appScanTask = new AppScanTask<>();
		appScanTask.setImagePath(getImagePath())
				.setAppId(appId)
				.setUserId(userId)
				.setId(id)
				.setTargetType(targetType)
				.setName(getScanTarget())
				.setTimestamp(this.getScanTime().getTime());

		Device device = new Device();
		device.setAddress(deviceAddress);
		device.setFirmware(deviceFirmware);
		device.setModel(deviceModel);
		device.setSerial(deviceSerial);

		appScanTask.setDevice(device);

		CommonResult commonResult = new CommonResult();
		commonResult.loadFormTask(this, algos, dict);

		appScanTask.setResult(commonResult);
		Position position = new Position().setAddress(address)
				.setCity(city)
				.setLat(lat)
				.setLon(lon);

		appScanTask.setPosition(position);
		appScanTask.setData(dataSet);
		return appScanTask;

	}

	public String getId() {
		return id;
	}

	public ScanTask setId(String id) {
		this.id = id;
		return this;
	}

	public Integer getUserId() {
		return userId;
	}

	public ScanTask setUserId(Integer userId) {
		this.userId = userId;
		return this;
	}

	public Date getScanTime() {
		return scanTime;
	}

	public ScanTask setScanTime(Date scanTime) {
		this.scanTime = scanTime;
		return this;
	}

	public float getLon() {
		return lon;
	}

	public ScanTask setLon(float lon) {
		this.lon = lon;
		return this;
	}

	public float getLat() {
		return lat;
	}

	public ScanTask setLat(float lat) {
		this.lat = lat;
		return this;
	}

	public String getCity() {
		return city;
	}

	public ScanTask setCity(String city) {
		this.city = city;
		return this;
	}

	public String getAddress() {
		return address;
	}

	public ScanTask setAddress(String address) {
		this.address = address;
		return this;
	}

	public String getScanTarget() {
		return scanTarget;
	}

	public ScanTask setScanTarget(String scanTarget) {
		this.scanTarget = scanTarget;
		return this;
	}

	public String getImagePath() {
		return imagePath;
	}

	public ScanTask setImagePath(String imagePath) {
		this.imagePath = imagePath;
		return this;
	}

	public String getDeviceAddress() {
		return deviceAddress;
	}

	public ScanTask setDeviceAddress(String deviceAddress) {
		this.deviceAddress = deviceAddress;
		return this;
	}

	public String getDeviceModel() {
		return deviceModel;
	}

	public ScanTask setDeviceModel(String deviceModel) {
		this.deviceModel = deviceModel;
		return this;
	}

	public String getDeviceSerial() {
		return deviceSerial;
	}

	public ScanTask setDeviceSerial(String deviceSerial) {
		this.deviceSerial = deviceSerial;
		return this;
	}

	public String getDeviceFirmware() {
		return deviceFirmware;
	}

	public ScanTask setDeviceFirmware(String deviceFirmware) {
		this.deviceFirmware = deviceFirmware;
		return this;
	}

	public String getAppId() {
		return appId;
	}

	public ScanTask setAppId(String appId) {
		this.appId = appId;
		return this;
	}

	public int getLevel() {
		return level;
	}

	public ScanTask setLevel(int level) {
		this.level = level;
		return this;
	}

	public String getMaterial() {
		return material;
	}

	public ScanTask setMaterial(String material) {
		this.material = material;
		return this;
	}

	public Double getResult0() {
		return result0;
	}

	public ScanTask setResult0(Double result0) {
		this.result0 = result0;
		return this;
	}

	public Double getResult1() {
		return result1;
	}

	public ScanTask setResult1(Double result1) {
		this.result1 = result1;
		return this;
	}

	public Double getResult2() {
		return result2;
	}

	public ScanTask setResult2(Double result2) {
		this.result2 = result2;
		return this;
	}

	public Double getResult3() {
		return result3;
	}

	public ScanTask setResult3(Double result3) {
		this.result3 = result3;
		return this;
	}

	public Double getResult4() {
		return result4;
	}

	public ScanTask setResult4(Double result4) {
		this.result4 = result4;
		return this;
	}

	public Double getResult5() {
		return result5;
	}

	public ScanTask setResult5(Double result5) {
		this.result5 = result5;
		return this;
	}

	public Double getResult6() {
		return result6;
	}

	public ScanTask setResult6(Double result6) {
		this.result6 = result6;
		return this;
	}

	public Double getResult7() {
		return result7;
	}

	public ScanTask setResult7(Double result7) {
		this.result7 = result7;
		return this;
	}

	public Double getResult8() {
		return result8;
	}

	public ScanTask setResult8(Double result8) {
		this.result8 = result8;
		return this;
	}

	public Double getResult9() {
		return result9;
	}

	public ScanTask setResult9(Double result9) {
		this.result9 = result9;
		return this;
	}

	public Double getResult10() {
		return result10;
	}

	public ScanTask setResult10(Double result10) {
		this.result10 = result10;
		return this;
	}


	public String getTargetType() {
		return targetType;
	}

	public ScanTask setTargetType(String targetType) {
		this.targetType = targetType;
		return this;
	}
}
