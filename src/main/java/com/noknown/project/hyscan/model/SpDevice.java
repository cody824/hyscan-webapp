package com.noknown.project.hyscan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author guodong
 */
@Entity
@Table(name = "sp_device")
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
public class SpDevice {

	@Id
	@Column(length = 32)
	private String serial;

	@Column(length = 128)
	private String address;

	@Column(length = 8)
	private String model;

	@Column(length = 64)
	private String firmware;

	public String getAddress() {
		return address;
	}

	public SpDevice setAddress(String address) {
		this.address = address;
		return this;
	}

	public String getModel() {
		return model;
	}

	public SpDevice setModel(String model) {
		this.model = model;
		return this;
	}

	public String getSerial() {
		return serial;
	}

	public SpDevice setSerial(String serial) {
		this.serial = serial;
		return this;
	}

	public String getFirmware() {
		return firmware;
	}

	public SpDevice setFirmware(String firmware) {
		this.firmware = firmware;
		return this;
	}
}
