package com.noknown.project.hyscan.pojo;

import com.noknown.project.hyscan.model.AlgoItem;
import com.noknown.project.hyscan.model.ScanTask;

import java.util.Map;
import java.util.Properties;

/**
 * @author cody
 */
public abstract class AbstractResult {


	/**
	 * 填充结果集
	 *
	 * @param scanTask 要填充的扫描任务
	 */
	public abstract void fillTask(ScanTask scanTask);

	public abstract void loadFormTask(ScanTask task, Map<String, AlgoItem> algos, Properties dict);
}
