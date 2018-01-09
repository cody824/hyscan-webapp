package com.noknown.project.hyscan.pojo;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.noknown.project.hyscan.model.ScanTask;

/**
 * 水质监测结果
 * @author cody
 *
 */
public class WQResult extends ResultIF{

	private double[] data;
	
	private int[] decimal;
	
	private String[] unit;
	
	private String[] name;
	
	private String[] chineseName;
 	
	@Override
	void fillTask(ScanTask scanTask) {
		for (int i = 0; i < data.length; i++) {
			Method setMethod;
			try {
				setMethod = ScanTask.class.getMethod("setResult" + (i + 1), Double.class);
				setMethod.invoke(scanTask, data[0]);
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
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
