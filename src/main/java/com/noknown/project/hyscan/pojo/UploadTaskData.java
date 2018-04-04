package com.noknown.project.hyscan.pojo;

/**
 * @author guodong
 */
public class UploadTaskData {

	private String id;

	private Position position;

	private String imagePath;

	private long timestamp;

	/**
	 * 采集数据平均值
	 */
	private Integer[] dn;

	/**
	 * 所有采集数据集合
	 */
	private Integer[][] dnList;

	/**
	 * 反射率数据
	 */
	private double[] reflectivity;

	public Integer[] getDn() {
		return dn;
	}

	public UploadTaskData setDn(Integer[] dn) {
		this.dn = dn;
		return this;
	}

	public Integer[][] getDnList() {
		return dnList;
	}

	public UploadTaskData setDnList(Integer[][] dnList) {
		this.dnList = dnList;
		return this;
	}

	public double[] getReflectivity() {
		return reflectivity;
	}

	public UploadTaskData setReflectivity(double[] reflectivity) {
		this.reflectivity = reflectivity;
		return this;
	}

	public String getId() {
		return id;
	}

	public UploadTaskData setId(String id) {
		this.id = id;
		return this;
	}

	public Position getPosition() {
		return position;
	}

	public UploadTaskData setPosition(Position position) {
		this.position = position;
		return this;
	}

	public String getImagePath() {
		return imagePath;
	}

	public UploadTaskData setImagePath(String imagePath) {
		this.imagePath = imagePath;
		return this;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public UploadTaskData setTimestamp(long timestamp) {
		this.timestamp = timestamp;
		return this;
	}
}
