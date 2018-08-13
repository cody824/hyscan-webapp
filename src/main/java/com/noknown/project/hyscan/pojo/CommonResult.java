package com.noknown.project.hyscan.pojo;

import com.noknown.project.hyscan.model.AlgoItem;
import com.noknown.project.hyscan.model.ScanTask;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.Properties;

/**
 * 水质监测结果
 *
 * @author cody
 */
public class CommonResult extends AbstractResult {


	private final Logger logger = LoggerFactory.getLogger(getClass());

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

	@Override
	public void loadFormTask(ScanTask task, Map<String, AlgoItem> algos, Properties dict) {
		double[] data = new double[algos.size()];
		String[] unit = new String[algos.size()];
		String[] name = new String[algos.size()];
		int[] decimal = new int[algos.size()];
		String[] chineseName = new String[algos.size()];


		for (AlgoItem ac : algos.values()) {
			Method getMethod;
			double value = 0;
			try {
				getMethod = ScanTask.class.getMethod("getResult" + ac.getSeq());
				if (getMethod != null && task != null) {
					Double ret = (Double) getMethod.invoke(task);
					if (ret != null) {
						value = ret;
					}
				}
			} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
				e.printStackTrace();
				logger.error(ExceptionUtils.getFullStackTrace(e));
			}
			data[ac.getSeq()] = value;
			unit[ac.getSeq()] = ac.getUnit();
			name[ac.getSeq()] = ac.getKey();
			chineseName[ac.getSeq()] = ac.getChineseName();
			decimal[ac.getSeq()] = ac.getDecimal();
		}
		this.setChineseName(chineseName)
				.setData(data)
				.setName(name)
				.setUnit(unit)
				.setDecimal(decimal)
				.setAppId(task.getAppId())
				.setDict(dict);
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
