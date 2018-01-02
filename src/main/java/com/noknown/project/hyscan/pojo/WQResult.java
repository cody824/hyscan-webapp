package com.noknown.project.hyscan.pojo;

import com.noknown.project.hyscan.model.ScanTask;

/**
 * 水质监测结果
 * @author cody
 *
 */
public class WQResult extends ResultIF{

	/**
	 * 叶绿素浓度
	 */
	private int yls;
	
	/**
	 * 悬浊物浓度
	 */
	private int xzw;
	
	/**
	 * 浊度
	 */
	private int zd;
	
	/**
	 * 浊度
	 */
	private int ss;

	@Override
	void fillTask(ScanTask scanTask) {
		scanTask.setYls(yls);
		scanTask.setXzw(xzw);
		scanTask.setZd(zd);
		scanTask.setSs(ss);
	}

	public int getYls() {
		return yls;
	}

	public WQResult setYls(int yls) {
		this.yls = yls;
		return this;
	}

	public int getXzw() {
		return xzw;
	}

	public WQResult setXzw(int xzw) {
		this.xzw = xzw;
		return this;
	}

	public int getZd() {
		return zd;
	}

	public WQResult setZd(int zd) {
		this.zd = zd;
		return this;
	}

	public int getSs() {
		return ss;
	}

	public WQResult setSs(int ss) {
		this.ss = ss;
		return this;
	}


	
}
