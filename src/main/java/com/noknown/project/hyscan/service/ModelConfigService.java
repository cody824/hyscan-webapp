package com.noknown.project.hyscan.service;

import java.util.List;

import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.model.ModelConfig;


public interface ModelConfigService {

	
	List<ModelConfig> findAll() throws ServiceException, DAOException;

	void saveModelConfig(ModelConfig modelConfig)throws ServiceException, DAOException;

	void removeModelConfig(String model) throws ServiceException, DAOException;

	ModelConfig getModelConfig(String model)throws ServiceException, DAOException;
	
	
}
