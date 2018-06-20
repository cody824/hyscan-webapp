package com.noknown.project.hyscan.pojo;

import com.noknown.project.hyscan.model.ScanTask;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * 水质监测结果
 *
 * @author cody
 */
public class WqResult extends AbstractResult {

	private double[] data;

	private int[] decimal;

	private String[] unit;

	private String[] name;

	private String[] chineseName;

	@Override
	public void fillTask(ScanTask scanTask) {
		int length = data.length > 10 ? 10 : data.length;
		for (int i = 0; i < length; i++) {
			Method setMethod;
			try {
				setMethod = ScanTask.class.getMethod("setResult" + i, Double.class);
				setMethod.invoke(scanTask, data[i]);
			} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
				e.printStackTrace();
			}
		}
	}

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

}