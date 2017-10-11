package com.noknown.project.hyscan.service.impl;

import java.sql.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.util.JpaUtil;
import com.noknown.framework.common.web.model.PageData;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.project.hyscan.dao.ScanTaskDao;
import com.noknown.project.hyscan.dao.ScanTaskDataDao;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.AppScanTask;
import com.noknown.project.hyscan.service.ScanTaskService;

@Service
public class ScanTaskServiceImpl implements ScanTaskService {

	@Autowired
	private ScanTaskDao taskDao;

	@Autowired
	private ScanTaskDataDao taskDataDao;
	

	@Override
	public PageData<ScanTask> find(SQLFilter filter, int start, int limit) throws ServiceException, DAOException {
		
		Pageable pageable = new PageRequest(start * limit, limit);
		Specification<ScanTask> spec = new Specification<ScanTask>(){

			@Override
			public Predicate toPredicate(Root<ScanTask> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				Predicate predicate = JpaUtil.sqlFilterToPredicate(ScanTask.class, root, query, cb, filter);
				return predicate;
			}} ;
		Page<ScanTask> pd = taskDao.findAll(spec , pageable);
		
		PageData<ScanTask> pageData = new PageData<>();
		pageData.setTotal(pd.getTotalElements());
		pageData.setTotalPage(pd.getTotalPages());
		pageData.setData(pd.getContent());
		pageData.setStart(start);
		pageData.setLimit(limit);
		
		return pageData;
	}

	public Page<ScanTask> find(int page, int size) throws ServiceException, DAOException {
		Pageable pageable = new PageRequest(page, size);
		return taskDao.findAll(pageable);
	}

	@Override
	public ScanTask saveTask(AppScanTask appTask) throws ServiceException, DAOException {
		ScanTask task = new ScanTask();
		
		
		task.setId(appTask.getId());
		task.setUserId(appTask.getUserId());
		
		task.setImagePath(appTask.getImagePath());
		task.setScanTarget(appTask.getName());
		task.setScanTime(new Date(appTask.getTimestamp()));
		
		ScanTaskData scanTaskData = new ScanTaskData();
		scanTaskData.setId(appTask.getId());
		
		if (appTask.getPosition() != null) {
			task.setCity(appTask.getPosition().getCity());
			task.setLon(appTask.getPosition().getLon());
			task.setLat(appTask.getPosition().getLat());
		}
		
		if (appTask.getResult() != null) {
			task.setLevel(appTask.getResult().getLevel());
			task.setMaterial(appTask.getResult().getMaterial());
		}
		
		if (appTask.getDevice() != null) {
			task.setDeviceAddress(appTask.getDevice().getAddress());
			task.setDeviceFirmware(appTask.getDevice().getFirmware());
			task.setDeviceModel(appTask.getDevice().getModel());
			task.setDeviceSerial(appTask.getDevice().getSerial());
			
			scanTaskData.setRange(appTask.getDevice().getSpectralRange());
			Float[] radianceConfig = new Float[2];
			
			radianceConfig[0] = appTask.getDevice().getRadianceA();
			radianceConfig[1] = appTask.getDevice().getRadianceB();
			scanTaskData.setRadianceConfig(radianceConfig);
		}
		task = taskDao.save(task);
		
		if (appTask.getData() != null) {
			scanTaskData.setDn(appTask.getData().getDn());
			scanTaskData.setDarkCurrent(appTask.getData().getDarkCurrent());
			scanTaskData.setWhiteboardData(appTask.getData().getWhiteboardData());
		}
		taskDataDao.saveTaskData(scanTaskData);
		
		return task;
	}
	

	@Override
	public void removeTask(String taskId) throws ServiceException, DAOException {
		taskDao.delete(taskId);
		taskDataDao.removeTaskData(taskId);
	}

	@Override
	public ScanTask get(String taskId) throws ServiceException, DAOException {
		return taskDao.getOne(taskId);
	}
	
	@Override
	public ScanTaskData getData(String taskId) throws ServiceException, DAOException {
		return taskDataDao.getTaskData(taskId);
	}
	

	public ScanTask saveTask(ScanTask task, Integer[] dn, Integer[] dc, Integer[] wd, Integer[] range,
			Float[] radianceConfig) throws ServiceException, DAOException {
		task = taskDao.save(task);

		ScanTaskData scanTaskData = new ScanTaskData();

		scanTaskData.setId(task.getId());
		scanTaskData.setDn(dn);
		scanTaskData.setDarkCurrent(dc);
		scanTaskData.setWhiteboardData(wd);
		scanTaskData.setRange(range);
		scanTaskData.setRadianceConfig(radianceConfig);
		taskDataDao.saveTaskData(scanTaskData);
		return task;
	}

	public ScanTask saveTask(ScanTask task, ScanTaskData taskData) throws ServiceException, DAOException {
		task = taskDao.save(task);
		taskDataDao.saveTaskData(taskData);
		return task;
	}


}
