package com.noknown.project.hyscan.pojo;

import com.noknown.project.hyscan.model.ScanTask;

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

}
