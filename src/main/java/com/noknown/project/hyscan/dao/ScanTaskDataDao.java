package com.noknown.project.hyscan.dao;

import com.noknown.framework.common.exception.DAOException;
import com.noknown.project.hyscan.model.ScanTaskData;

public interface ScanTaskDataDao {
	
	 ScanTaskData getTaskData(String taskId) throws DAOException;
	 
	 void saveTaskData(ScanTaskData data) throws DAOException;
	 
	 void removeTaskData(String taskId) throws DAOException;
}
