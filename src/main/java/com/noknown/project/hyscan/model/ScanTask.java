package com.noknown.project.hyscan.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "hyscan_scan_task")
@JsonIgnoreProperties({ "handler", "hibernateLazyInitializer" })
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
	 * 预留结果字段1
	 */
	private Double result1;
	
	/**
	 * 预留结果字段2
	 */
	private Double result2;
	
	/**
	 * 预留结果字段2
	 */
	private Double result3;
	
	/**
	 * 预留结果字段2
	 */
	private Double result4;
	
	/**
	 * 预留结果字段2
	 */
	private Double result5;
	
	/**
	 * 预留结果字段2
	 */
	private Double result6;
	
	/**
	 * 预留结果字段2
	 */
	private Double result7;
	
	/**
	 * 预留结果字段2
	 */
	private Double result8;
	
	/**
	 * 预留结果字段2
	 */
	private Double result9;
	
	/**
	 * 预留结果字段2
	 */
	private Double result10;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the scanTime
	 */
	public Date getScanTime() {
		return scanTime;
	}

	/**
	 * @param scanTime
	 *            the scanTime to set
	 */
	public void setScanTime(Date scanTime) {
		this.scanTime = scanTime;
	}

	/**
	 * @return the lon
	 */
	public float getLon() {
		return lon;
	}

	/**
	 * @param lon
	 *            the lon to set
	 */
	public void setLon(float lon) {
		this.lon = lon;
	}

	/**
	 * @return the lat
	 */
	public float getLat() {
		return lat;
	}

	/**
	 * @param lat
	 *            the lat to set
	 */
	public void setLat(float lat) {
		this.lat = lat;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city
	 *            the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return the level
	 */
	public int getLevel() {
		return level;
	}

	/**
	 * @param level
	 *            the level to set
	 */
	public void setLevel(int level) {
		this.level = level;
	}

	/**
	 * @return the material
	 */
	public String getMaterial() {
		return material;
	}

	/**
	 * @param material
	 *            the material to set
	 */
	public void setMaterial(String material) {
		this.material = material;
	}

	/**
	 * @return the scanTarget
	 */
	public String getScanTarget() {
		return scanTarget;
	}

	/**
	 * @param scanTarget
	 *            the scanTarget to set
	 */
	public void setScanTarget(String scanTarget) {
		this.scanTarget = scanTarget;
	}

	/**
	 * @return the imagePath
	 */
	public String getImagePath() {
		return imagePath;
	}

	/**
	 * @param imagePath
	 *            the imagePath to set
	 */
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	/**
	 * @return the deviceAddress
	 */
	public String getDeviceAddress() {
		return deviceAddress;
	}

	/**
	 * @param deviceAddress
	 *            the deviceAddress to set
	 */
	public void setDeviceAddress(String deviceAddress) {
		this.deviceAddress = deviceAddress;
	}

	/**
	 * @return the deviceModel
	 */
	public String getDeviceModel() {
		return deviceModel;
	}

	/**
	 * @param deviceModel
	 *            the deviceModel to set
	 */
	public void setDeviceModel(String deviceModel) {
		this.deviceModel = deviceModel;
	}

	/**
	 * @return the deviceSerial
	 */
	public String getDeviceSerial() {
		return deviceSerial;
	}

	/**
	 * @param deviceSerial
	 *            the deviceSerial to set
	 */
	public void setDeviceSerial(String deviceSerial) {
		this.deviceSerial = deviceSerial;
	}

	/**
	 * @return the deviceFirmware
	 */
	public String getDeviceFirmware() {
		return deviceFirmware;
	}

	/**
	 * @param deviceFirmware
	 *            the deviceFirmware to set
	 */
	public void setDeviceFirmware(String deviceFirmware) {
		this.deviceFirmware = deviceFirmware;
	}

	/**
	 * @return the userId
	 */
	public Integer getUserId() {
		return userId;
	}

	/**
	 * @param userId
	 *            the userId to set
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @param address
	 *            the address to set
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public Double getResult1() {
		return result1;
	}

	public void setResult1(Double result1) {
		this.result1 = result1;
	}

	public Double getResult2() {
		return result2;
	}

	public void setResult2(Double result2) {
		this.result2 = result2;
	}

	public Double getResult3() {
		return result3;
	}

	public void setResult3(Double result3) {
		this.result3 = result3;
	}

	public Double getResult4() {
		return result4;
	}

	public void setResult4(Double result4) {
		this.result4 = result4;
	}

	public Double getResult5() {
		return result5;
	}

	public void setResult5(Double result5) {
		this.result5 = result5;
	}

	public Double getResult6() {
		return result6;
	}

	public void setResult6(Double result6) {
		this.result6 = result6;
	}

	public Double getResult7() {
		return result7;
	}

	public void setResult7(Double result7) {
		this.result7 = result7;
	}

	public Double getResult8() {
		return result8;
	}

	public void setResult8(Double result8) {
		this.result8 = result8;
	}

	public Double getResult9() {
		return result9;
	}

	public void setResult9(Double result9) {
		this.result9 = result9;
	}

	public Double getResult10() {
		return result10;
	}

	public void setResult10(Double result10) {
		this.result10 = result10;
	}

}
