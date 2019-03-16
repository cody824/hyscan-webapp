package com.noknown.project.hyscan.pojo;

public class Device {

	private String  address;
	
	private String model;
	
	private String serial;
	
	private String firmware;
	
	private Integer[] spectralRange;
	
	private Float radianceA;
	
	private Float radianceB;

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

	public String getAddress() {
		return address;
	}

	public Device setAddress(String address) {
		this.address = address;
		return this;
	}

	public String getModel() {
		return model;
	}

	public Device setModel(String model) {
		this.model = model;
		return this;
	}

	public String getSerial() {
		return serial;
	}

	public Device setSerial(String serial) {
		this.serial = serial;
		return this;
	}

	public String getFirmware() {
		return firmware;
	}

	public Device setFirmware(String firmware) {
		this.firmware = firmware;
		return this;
	}

	public Integer[] getSpectralRange() {
		return spectralRange;
	}

	public Device setSpectralRange(Integer[] spectralRange) {
		this.spectralRange = spectralRange;
		return this;
	}

	public Float getRadianceA() {
		return radianceA;
	}

	public Device setRadianceA(Float radianceA) {
		this.radianceA = radianceA;
		return this;
	}

	public Float getRadianceB() {
		return radianceB;
	}

	public Device setRadianceB(Float radianceB) {
		this.radianceB = radianceB;
		return this;
	}

	public String getVnir() {
		return vnir;
	}

	public Device setVnir(String vnir) {
		this.vnir = vnir;
		return this;
	}

	public Integer[] getVnirRange() {
		return vnirRange;
	}

	public Device setVnirRange(Integer[] vnirRange) {
		this.vnirRange = vnirRange;
		return this;
	}

	public String getSwir() {
		return swir;
	}

	public Device setSwir(String swir) {
		this.swir = swir;
		return this;
	}

	public Integer[] getSwirRange() {
		return swirRange;
	}

	public Device setSwirRange(Integer[] swirRange) {
		this.swirRange = swirRange;
		return this;
	}
}
