package com.noknown.project.hyscan.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.dao.ModelConfigDao;
import com.noknown.project.hyscan.model.ModelConfig;
import com.noknown.project.hyscan.service.ModelConfigService;

@Service
public class ModelConfigServiceImpl implements ModelConfigService {

	@Autowired
	private ModelConfigDao modelConfigDao;

	@Override
	public List<ModelConfig> findAll() throws ServiceException, DAOException {
		return modelConfigDao.findAll();
	}

	@Override
	public void saveModelConfig(ModelConfig modelConfig) throws ServiceException, DAOException {
		modelConfigDao.saveModelConfig(modelConfig);
	}

	@Override
	public void removeModelConfig(String model) throws ServiceException, DAOException {
		modelConfigDao.removeModelConfig(model);
	}

	@Override
	public ModelConfig getModelConfig(String model) throws ServiceException, DAOException {
		return modelConfigDao.getModelConfig(model);
	}



}
