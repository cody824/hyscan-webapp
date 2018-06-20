package com.noknown.project.hyscan.pojo;

import com.noknown.project.hyscan.model.ScanTask;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Properties;

/**
 * 水质监测结果
 *
 * @author cody
 */
public class CommonResult extends AbstractResult {

	private String appId;

	private double[] data;

	private int[] decimal;

	private String[] unit;

	private String[] name;

	private String[] chineseName;

	/**
	 * 结果数据字典
	 */
	private Properties dict;

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

	public String getAppId() {
		return appId;
	}

	public CommonResult setAppId(String appId) {
		this.appId = appId;
		return this;
	}

	public double[] getData() {
		return data;
	}

	public CommonResult setData(double[] data) {
		this.data = data;
		return this;
	}

	public int[] getDecimal() {
		return decimal;
	}

	public CommonResult setDecimal(int[] decimal) {
		this.decimal = decimal;
		return this;
	}

	public String[] getUnit() {
		return unit;
	}

	public CommonResult setUnit(String[] unit) {
		this.unit = unit;
		return this;
	}

	public String[] getName() {
		return name;
	}

	public CommonResult setName(String[] name) {
		this.name = name;
		return this;
	}

	public String[] getChineseName() {
		return chineseName;
	}

	public CommonResult setChineseName(String[] chineseName) {
		this.chineseName = chineseName;
		return this;
	}

	public Properties getDict() {
		return dict;
	}

	public CommonResult setDict(Properties dict) {
		this.dict = dict;
		return this;
	}
}
