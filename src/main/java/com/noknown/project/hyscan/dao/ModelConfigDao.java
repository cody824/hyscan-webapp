package com.noknown.project.hyscan.dao;

import java.util.List;

import com.noknown.framework.common.exception.DAOException;
import com.noknown.project.hyscan.model.ModelConfig;


public interface ModelConfigDao {
	
	 ModelConfig getModelConfig(String model) throws DAOException;
	 
	 void saveModelConfig(ModelConfig data) throws DAOException;
	 
	 void removeModelConfig(String model) throws DAOException;
	 
	 List<ModelConfig> findAll() throws DAOException;
}
