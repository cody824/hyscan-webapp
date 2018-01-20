package com.noknown.project.hyscan.model;

public class WDAlgoItem {

	private String key;
	
	private String chineseName;
	
	private int[] waveIndex;
	
	private String unit;
	
	private int decimal;
	
	private int seq;

	public String getKey() {
		return key;
	}

	public WDAlgoItem setKey(String key) {
		this.key = key;
		return this;
	}

	public String getChineseName() {
		return chineseName;
	}

	public WDAlgoItem setChineseName(String chineseName) {
		this.chineseName = chineseName;
		return this;
	}

	public int[] getWaveIndex() {
		return waveIndex;
	}

	public WDAlgoItem setWaveIndex(int[] waveIndex) {
		this.waveIndex = waveIndex;
		return this;
	}

	public String getUnit() {
		return unit;
	}

	public WDAlgoItem setUnit(String unit) {
		this.unit = unit;
		return this;
	}

	public int getSeq() {
		return seq;
	}

	public WDAlgoItem setSeq(int seq) {
		this.seq = seq;
		return this;
	}

	public int getDecimal() {
		return decimal;
	}

	public WDAlgoItem setDecimal(int decimal) {
		this.decimal = decimal;
		return this;
	}
}
