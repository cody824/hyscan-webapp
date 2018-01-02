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
	 * 叶绿素浓度
	 */
	private int yls;

	/**
	 * 悬浊物浓度
	 */
	private int xzw;

	/**
	 * 浊度
	 */
	private int zd;

	/**
	 * 浊度
	 */
	private int ss;

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

	public int getYls() {
		return yls;
	}

	public void setYls(int yls) {
		this.yls = yls;
	}

	public int getXzw() {
		return xzw;
	}

	public void setXzw(int xzw) {
		this.xzw = xzw;
	}

	public int getZd() {
		return zd;
	}

	public void setZd(int zd) {
		this.zd = zd;
	}

	public int getSs() {
		return ss;
	}

	public void setSs(int ss) {
		this.ss = ss;
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

}
