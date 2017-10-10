package com.noknown.project.hyscan.dao.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.noknown.framework.common.dao.impl.ObjectStoreJSONFileDaoImpl;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.util.BaseUtil;
import com.noknown.project.hyscan.dao.ScanTaskDataDao;
import com.noknown.project.hyscan.model.ScanTaskData;

@Component
public class ScanTaskDataDaoImpl extends ObjectStoreJSONFileDaoImpl implements ScanTaskDataDao {
	

	@Value("${hyscan.taskData.dirName:taskData}")
	private String dirName;
	
	@Value("${hyscan.taskData.bashPath:/var/hyscan/dataStore/}")
	private String basePath;

	@Override
	public ScanTaskData getTaskData(String taskId) throws DAOException {
		return (ScanTaskData) getObjectByKey(dirName, taskId + ".json", ScanTaskData.class);
	}

	@Override
	public void saveTaskData(ScanTaskData data) throws DAOException {
		String taskId = data.getId();
		this.saveObject(dirName, taskId + ".json", data);
		
	}

	@Override
	public void removeTaskData(String taskId) throws DAOException {
		this.removeObject(dirName, taskId + ".json");
	}
	
	public String getBasePath() {
		if (basePath.startsWith("classpath")) {
			basePath = BaseUtil.getClassPath()
					+ basePath.substring(basePath.indexOf(":") + 1);
		}
		return basePath;
	}

}
