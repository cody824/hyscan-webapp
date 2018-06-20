package com.noknown.project.hyscan.model;

/**
 * @author guodong
 */
public class AlgoItem {

	private String key;

	private String chineseName;

	private int[] waveIndex;

	private String unit;

	private int decimal;

	private int seq;

	private Boolean useDict;

	public String getKey() {
		return key;
	}

	public AlgoItem setKey(String key) {
		this.key = key;
		return this;
	}

	public String getChineseName() {
		return chineseName;
	}

	public AlgoItem setChineseName(String chineseName) {
		this.chineseName = chineseName;
		return this;
	}

	public int[] getWaveIndex() {
		return waveIndex;
	}

	public AlgoItem setWaveIndex(int[] waveIndex) {
		this.waveIndex = waveIndex;
		return this;
	}

	public String getUnit() {
		return unit;
	}

	public AlgoItem setUnit(String unit) {
		this.unit = unit;
		return this;
	}

	public int getSeq() {
		return seq;
	}

	public AlgoItem setSeq(int seq) {
		this.seq = seq;
		return this;
	}

	public int getDecimal() {
		return decimal;
	}

	public AlgoItem setDecimal(int decimal) {
		this.decimal = decimal;
		return this;
	}

	public Boolean getUseDict() {
		return useDict;
	}

	public AlgoItem setUseDict(Boolean useDict) {
		this.useDict = useDict;
		return this;
	}
}
