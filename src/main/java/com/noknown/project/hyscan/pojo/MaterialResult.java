package com.noknown.project.hyscan.pojo;

import com.noknown.project.hyscan.model.AlgoItem;
import com.noknown.project.hyscan.model.ScanTask;

import java.util.Map;
import java.util.Properties;

/**
 * @author cody
 *
 */
public class MaterialResult extends AbstractResult {

	private int level;
	
	private int materialIndex;
	
	private String material;

	@Override
	public void fillTask(ScanTask scanTask) {
		scanTask.setMaterial(material);
		scanTask.setLevel(level);

	}

	@Override
	public void loadFormTask(ScanTask task, Map<String, AlgoItem> algos, Properties dict) {
		this.level = task.getLevel();
		this.materialIndex = this.getMaterialIndex();
	}

	/**
	 * @return the level
	 */
	public int getLevel() {
		return level;
	}

	/**
	 * @param level the level to set
	 */
	public void setLevel(int level) {
		this.level = level;
	}

	/**
	 * @return the material
	 */
	public String getMaterial() {
		return material;
	}

	/**
	 * @param material the material to set
	 */
	public void setMaterial(String material) {
		this.material = material;
	}

	/**
	 * @return the materialIndex
	 */
	public int getMaterialIndex() {
		return materialIndex;
	}

	/**
	 * @param materialIndex the materialIndex to set
	 */
	public void setMaterialIndex(int materialIndex) {
		this.materialIndex = materialIndex;
	}
	
	
}
