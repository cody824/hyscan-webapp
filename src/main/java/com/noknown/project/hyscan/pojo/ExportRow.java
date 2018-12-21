package com.noknown.project.hyscan.pojo;

/**
 * @author guodong
 * @date 2018/12/21
 */
public class ExportRow {

	private double wavelength;

	private Integer dn;

	private Integer darkCurrent;

	private Integer whiteboardData;

	private double radiance;

	private double reflectivity;

	private double rmPacketLine;

	public double getWavelength() {
		return wavelength;
	}

	public ExportRow setWavelength(double wavelength) {
		this.wavelength = wavelength;
		return this;
	}

	public Integer getDn() {
		return dn;
	}

	public ExportRow setDn(Integer dn) {
		this.dn = dn;
		return this;
	}

	public Integer getDarkCurrent() {
		return darkCurrent;
	}

	public ExportRow setDarkCurrent(Integer darkCurrent) {
		this.darkCurrent = darkCurrent;
		return this;
	}

	public Integer getWhiteboardData() {
		return whiteboardData;
	}

	public ExportRow setWhiteboardData(Integer whiteboardData) {
		this.whiteboardData = whiteboardData;
		return this;
	}

	public double getRadiance() {
		return radiance;
	}

	public ExportRow setRadiance(double radiance) {
		this.radiance = radiance;
		return this;
	}

	public double getReflectivity() {
		return reflectivity;
	}

	public ExportRow setReflectivity(double reflectivity) {
		this.reflectivity = reflectivity;
		return this;
	}

	public double getRmPacketLine() {
		return rmPacketLine;
	}

	public ExportRow setRmPacketLine(double rmPacketLine) {
		this.rmPacketLine = rmPacketLine;
		return this;
	}
}
