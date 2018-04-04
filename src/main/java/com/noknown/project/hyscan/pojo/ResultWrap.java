package com.noknown.project.hyscan.pojo;

/**
 * 通用监测结果
 *
 * @author cody
 */
public class ResultWrap {

	private double[] data;

	private int[] decimal;

	private String[] unit;

	private String[] name;

	private String[] chineseName;

	private String[] render;

	public double[] getData() {
		return data;
	}

	public void setData(double[] data) {
		this.data = data;
	}

	public String[] getUnit() {
		return unit;
	}

	public void setUnit(String[] unit) {
		this.unit = unit;
	}

	public String[] getName() {
		return name;
	}

	public void setName(String[] name) {
		this.name = name;
	}

	public String[] getChineseName() {
		return chineseName;
	}

	public void setChineseName(String[] chineseName) {
		this.chineseName = chineseName;
	}

	public int[] getDecimal() {
		return decimal;
	}

	public void setDecimal(int[] decimal) {
		this.decimal = decimal;
	}

	public String[] getRender() {
		return render;
	}

	public ResultWrap setRender(String[] render) {
		this.render = render;
		return this;
	}
}
