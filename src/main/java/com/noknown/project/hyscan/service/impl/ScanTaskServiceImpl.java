package com.noknown.project.hyscan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import com.noknown.framework.common.base.BaseServiceImpl;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.dao.ScanTaskDao;
import com.noknown.project.hyscan.dao.ScanTaskDataDao;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.service.ScanTaskService;

@Service
public class ScanTaskServiceImpl extends BaseServiceImpl<ScanTask, String> implements ScanTaskService {

	@Autowired
	private ScanTaskDao taskDao;

	@Autowired
	private ScanTaskDataDao taskDataDao;
	

	@Override
	public void removeTask(String taskId) throws ServiceException, DAOException {
		taskDao.delete(taskId);
		taskDataDao.removeTaskData(taskId);
	}

	@Override
	public ScanTask get(String taskId) throws ServiceException, DAOException {
		return taskDao.findOne(taskId);
	}
	
	@Override
	public ScanTaskData getData(String taskId) throws ServiceException, DAOException {
		return taskDataDao.getTaskData(taskId);
	}

	@Override
	public JpaRepository<ScanTask, String> getRepository() {
		return taskDao;
	}

	@Override
	public JpaSpecificationExecutor<ScanTask> getSpecificationExecutor() {
		return taskDao;
	}


	@Override
	public void saveScanTaskData(ScanTaskData data) throws ServiceException, DAOException {
		taskDataDao.saveTaskData(data);
		
	}

}
