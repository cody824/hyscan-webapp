package com.noknown.project.hyscan.service;

import com.noknown.framework.common.base.BaseService;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.DownloadInfo;


public interface ScanTaskService extends BaseService<ScanTask, String> {

	
	/**
	 * 删除任务以及任务数据
	 * @param taskId
	 * @throws ServiceException
	 * @throws DAOException
	 */
	void removeTask(String taskId) throws ServiceException, DAOException;
	
	/**
	 * 获取扫描任务数据
	 * @param taskId
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	ScanTaskData getData(String taskId)throws ServiceException, DAOException;
	
	/**
	 * 保存任务数据
	 * @param data
	 * @throws ServiceException
	 * @throws DAOException
	 */
	void saveScanTaskData(ScanTaskData data)throws ServiceException, DAOException;

	/**
	 * 导出选择的任务数据包
	 * @param filter
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	DownloadInfo exportScanTaskPackage(SQLFilter filter)throws ServiceException, DAOException;

	/**
	 * 导出单个任务
	 * @param taskId
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	DownloadInfo exportScanTask(String taskId)throws ServiceException, DAOException;
	
}
