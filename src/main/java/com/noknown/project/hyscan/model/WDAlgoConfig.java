package com.noknown.project.hyscan.model;

public class WDAlgoConfig {

	private String key;
	
	private String chineseName;
	
	private int[] waveIndex;
	
	private String unit;
	
	private int decimal;
	
	private int seq;

	public String getKey() {
		return key;
	}

	public WDAlgoConfig setKey(String key) {
		this.key = key;
		return this;
	}

	public String getChineseName() {
		return chineseName;
	}

	public WDAlgoConfig setChineseName(String chineseName) {
		this.chineseName = chineseName;
		return this;
	}

	public int[] getWaveIndex() {
		return waveIndex;
	}

	public WDAlgoConfig setWaveIndex(int[] waveIndex) {
		this.waveIndex = waveIndex;
		return this;
	}

	public String getUnit() {
		return unit;
	}

	public WDAlgoConfig setUnit(String unit) {
		this.unit = unit;
		return this;
	}

	public int getSeq() {
		return seq;
	}

	public WDAlgoConfig setSeq(int seq) {
		this.seq = seq;
		return this;
	}

	public int getDecimal() {
		return decimal;
	}

	public WDAlgoConfig setDecimal(int decimal) {
		this.decimal = decimal;
		return this;
	}
}
