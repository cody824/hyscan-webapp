package com.noknown.project.hyscan.service;

import com.noknown.framework.common.base.BaseService;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.AppScanTask;


public interface ScanTaskService extends BaseService<ScanTask, String> {
	
	/**
	 * 保存任务
	 * @param appTask
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	ScanTask saveTask(AppScanTask appTask)throws ServiceException, DAOException;

	
	/**
	 * 删除任务以及任务数据
	 * @param taskId
	 * @throws ServiceException
	 * @throws DAOException
	 */
	void removeTask(String taskId) throws ServiceException, DAOException;
	
	ScanTaskData getData(String taskId)throws ServiceException, DAOException;
	
}
