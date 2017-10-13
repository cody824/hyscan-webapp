package com.noknown.project.hyscan.service;

import org.springframework.data.domain.Page;

import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.web.model.PageData;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.AppScanTask;


public interface ScanTaskService {
	
	
	/**
	 * 分页查询任务
	 * @param page
	 * @param size
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	PageData<ScanTask> find(SQLFilter filter, int start , int limit) throws ServiceException, DAOException;

	/**
	 * 分页查询任务
	 * @param page
	 * @param size
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	Page<ScanTask> find(int page, int size) throws ServiceException, DAOException;
	
/*	*//**
	 * 保存任务
	 * @param task		任务属性
	 * @param dn		DN值
	 * @param dc		暗电流数据
	 * @param wd		白板数据
	 * @param range		坐标范围
	 * @param radianceConfig		辐亮度参数
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 *//*
	ScanTask saveTask(ScanTask task, Integer[] dn, Integer[] dc, Integer[] wd, Integer[] range, Float[] radianceConfig)throws ServiceException, DAOException;

	*/
	/**
	 * 更新任务
	 * @param task
	 * @param taskData
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	ScanTask updateTask(ScanTask task)throws ServiceException, DAOException;
	

	/**
	 * 保存任务
	 * @param appTask
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	ScanTask saveTask(AppScanTask appTask)throws ServiceException, DAOException;

	
	/**
	 * 删除任务
	 * @param taskId
	 * @throws ServiceException
	 * @throws DAOException
	 */
	void removeTask(String taskId) throws ServiceException, DAOException;

	ScanTask get(String taskId)throws ServiceException, DAOException;
	
	ScanTaskData getData(String taskId)throws ServiceException, DAOException;
	
}
