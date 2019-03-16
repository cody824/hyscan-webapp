package com.noknown.project.hyscan.device;

/**
 * @author guodong
 * @date 2019/3/16
 */
public abstract class SpDevice {

	private String name;

	private int[] range;

	public String getName() {
		return name;
	}

	public SpDevice setName(String name) {
		this.name = name;
		return this;
	}

	public int[] getRange() {
		return range;
	}

	public SpDevice setRange(int[] range) {
		this.range = range;
		return this;
	}

	/**
	 * 根据索引返回波长
	 *
	 * @param index
	 * @return
	 */
	abstract double toW(int index);
}
