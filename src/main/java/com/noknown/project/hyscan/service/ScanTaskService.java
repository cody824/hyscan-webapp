package com.noknown.project.hyscan.service;

import com.noknown.framework.common.base.BaseService;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.ApiTaskData;
import com.noknown.project.hyscan.pojo.DownloadInfo;

import java.util.List;


/**
 * @author guodong
 */
public interface ScanTaskService extends BaseService<ScanTask, String> {


	/**
	 * 删除任务以及任务数据
	 * @param taskId
	 * @throws ServiceException
	 * @throws DaoException
	 */
	void removeTask(String taskId) throws ServiceException, DaoException;

	/**
	 * 获取扫描任务数据
	 * @param taskId
	 * @return
	 * @throws ServiceException
	 * @throws DaoException
	 */
	ScanTaskData getData(String taskId) throws ServiceException, DaoException;

	/**
	 * 获取扫描任务数据，包含波长数据
	 *
	 * @param taskId
	 * @return
	 * @throws ServiceException
	 * @throws DaoException
	 */
	ApiTaskData getApiData(String taskId) throws ServiceException, DaoException;

	/**
	 * 保存任务数据
	 * @param data
	 * @throws ServiceException
	 * @throws DaoException
	 */
	void saveScanTaskData(ScanTaskData data) throws ServiceException, DaoException;

	/**
	 * 导出选择的任务数据包
	 * @param filter
	 * @param type
	 * @return
	 * @throws ServiceException
	 * @throws DaoException
	 */
	DownloadInfo exportScanTaskPackage(SQLFilter filter, String type) throws ServiceException, DaoException;

	/**
	 * 导出单个任务
	 * @param taskId
	 * @param type
	 * @return
	 * @throws ServiceException
	 * @throws DaoException
	 */
	DownloadInfo exportScanTask(String taskId, String type) throws ServiceException, DaoException;

	/**
	 * 获取用户的任务记录
	 *
	 * @param userId 用户ID
	 * @param appId  应用ID
	 * @return 任务记录
	 */
	List<ScanTask> findByUserId(Integer userId, String appId);

	/**
	 * 获取最新的任务
	 *
	 * @param appId
	 * @return
	 */
	ScanTask findLatestTask(String appId);

	/**
	 * 更新任务标记
	 *
	 * @param ids
	 * @param scanTarget
	 */
	void updateScanTarget(List<String> ids, String scanTarget);

}
