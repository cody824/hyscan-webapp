package com.noknown.project.hyscan.algorithm;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLClassLoader;

/**
 * @author guodong
 */
public abstract class AbstractAnalysisAlgo {

	private String version;

	private String jar;

	private String className;

	private ClassLoader classLoader;

	/**
	 * 通用算法
	 *
	 * @param data       是被测光谱数据，是一条数据，L*2，L是波长长度，数据的个数
	 *                   第一列是波长值，第2列是数据值
	 * @param appId      应用ID，meise，shuise
	 * @param targetType 检测目标类型，可以为null
	 * @param flag       检测参数的选项提示，叶绿素，浊度，悬浮度。。。。等等叶绿素: chlorophyll； 浊度: muddy ，悬浮度: suspendedmatter ,
	 *                   水色指数: watercolor,总氮含量:nitrogen;总磷含量：phosphorus; CDOM（有色可溶性有机物）;化学需氧量含量COD
	 * @return 数值
	 */
	public abstract double analysis(double[][] data, String appId, String targetType, String flag);

	public String getVersion() {
		return version;
	}

	public AbstractAnalysisAlgo setVersion(String version) {
		this.version = version;
		return this;
	}

	private String getJar() {
		return jar;
	}

	public AbstractAnalysisAlgo setJar(String jar) {
		this.jar = jar;
		return this;
	}

	public String getClassName() {
		return className;
	}

	public AbstractAnalysisAlgo setClassName(String className) {
		this.className = className;
		return this;
	}

	private ClassLoader getClassLoader() {
		if (classLoader == null) {
			try {
				URL url = new URL(getJar());
				classLoader = new URLClassLoader(new URL[]{url}, Thread.currentThread()
						.getContextClassLoader());
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		return classLoader;
	}

	/**
	 * 加载类
	 */
	public Class loadClass(String name) {
		if (getClassLoader() != null) {
			try {
				return classLoader.loadClass(name);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	/**
	 * 获取文件的输入流
	 */
	public InputStream loadFile(String path) {
		if (getClassLoader() != null) {
			return classLoader.getResourceAsStream(path);
		}
		return null;
	}

}
