package com.noknown.project.hyscan.util;

/**
 * @author guodong
 * @date 2018/4/3
 */
public class AlgoUtil {

	public static double[] getReflectivity(Integer[] datas, Integer[] dc, Integer[] wd) {
		double[] newData = new double[datas.length];
		for (int i = 0; i < datas.length; i++) {
			double data = 0;
			if (wd[i] - dc[i] != 0) {
				data = 1.0 * (datas[i] - dc[i]) / (wd[i] - dc[i]);
			}
			newData[i] = data;
		}
		return newData;
	}

	public static Integer[] getDn(double[] datas, Integer[] dc, Integer[] wd) {
		Integer[] newData = new Integer[datas.length];
		for (int i = 0; i < datas.length; i++) {
			int data = 0;
			if (wd[i] - dc[i] != 0) {
				data = (int) Math.rint((wd[i] - dc[i]) * datas[i] + dc[i]);
			}
			newData[i] = data;
		}
		return newData;
	}

}
