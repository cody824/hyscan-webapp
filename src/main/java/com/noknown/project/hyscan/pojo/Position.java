package com.noknown.project.hyscan.pojo;

/**
 * @author guodong
 */
public class Position {

	private Float lon;

	private Float lat;

	private String city;

	private String address;

	private String type;

	public Float getLon() {
		return lon;
	}

	public Position setLon(Float lon) {
		this.lon = lon;
		return this;
	}

	public Float getLat() {
		return lat;
	}

	public Position setLat(Float lat) {
		this.lat = lat;
		return this;
	}

	public String getCity() {
		return city;
	}

	public Position setCity(String city) {
		this.city = city;
		return this;
	}

	public String getAddress() {
		return address;
	}

	public Position setAddress(String address) {
		this.address = address;
		return this;
	}

	public String getType() {
		return type;
	}

	public Position setType(String type) {
		this.type = type;
		return this;
	}
}
