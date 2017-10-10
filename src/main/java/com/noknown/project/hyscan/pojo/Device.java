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
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @param address the address to set
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * @return the model
	 */
	public String getModel() {
		return model;
	}

	/**
	 * @param model the model to set
	 */
	public void setModel(String model) {
		this.model = model;
	}

	/**
	 * @return the serial
	 */
	public String getSerial() {
		return serial;
	}

	/**
	 * @param serial the serial to set
	 */
	public void setSerial(String serial) {
		this.serial = serial;
	}

	/**
	 * @return the firmware
	 */
	public String getFirmware() {
		return firmware;
	}

	/**
	 * @param firmware the firmware to set
	 */
	public void setFirmware(String firmware) {
		this.firmware = firmware;
	}

	/**
	 * @return the spectralRange
	 */
	public Integer[] getSpectralRange() {
		return spectralRange;
	}

	/**
	 * @param spectralRange the spectralRange to set
	 */
	public void setSpectralRange(Integer[] spectralRange) {
		this.spectralRange = spectralRange;
	}

	/**
	 * @return the radianceA
	 */
	public Float getRadianceA() {
		return radianceA;
	}

	/**
	 * @param radianceA the radianceA to set
	 */
	public void setRadianceA(Float radianceA) {
		this.radianceA = radianceA;
	}

	/**
	 * @return the radianceB
	 */
	public Float getRadianceB() {
		return radianceB;
	}

	/**
	 * @param radianceB the radianceB to set
	 */
	public void setRadianceB(Float radianceB) {
		this.radianceB = radianceB;
	}

	
	
}
