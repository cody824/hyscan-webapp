package com.noknown.project.hyscan.dao;

import com.noknown.project.hyscan.model.TaskResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

/**
 * @author guodong
 */
public interface TaskResultDao extends JpaRepository<TaskResult, Integer>, JpaSpecificationExecutor<TaskResult> {

	/**
	 * 获取任务所有的结果集
	 *
	 * @param taskId
	 * @return
	 */
	List<TaskResult> findAllByTaskId(String taskId);

	/**
	 * 获取任务对应来源的结果
	 *
	 * @param taskId
	 * @param source
	 * @return
	 */
	TaskResult getByTaskIdAndSource(String taskId, String source);

	/**
	 * 删除结果集
	 *
	 * @param taskId
	 */
	void deleteByTaskId(String taskId);

	/**
	 * 删除结果集
	 *
	 * @param taskId
	 * @param source
	 */
	void deleteByTaskIdAndSource(String taskId, String source);

}
