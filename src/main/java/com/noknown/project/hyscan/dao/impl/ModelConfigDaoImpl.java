package com.noknown.project.hyscan.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.noknown.framework.common.dao.impl.ObjectStoreJSONFileDaoImpl;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.util.BaseUtil;
import com.noknown.project.hyscan.dao.ModelConfigDao;
import com.noknown.project.hyscan.model.ModelConfig;

@Component
public class ModelConfigDaoImpl extends ObjectStoreJSONFileDaoImpl implements ModelConfigDao {
	

	private final static String dirName = "modelConfig";
	
	@Value("${hyscan.modelConfig.bashPath:/var/hyscan/dataStore/}")
	private String basePath;

	@Override
	public ModelConfig getModelConfig(String model) throws DAOException {
		return (ModelConfig) getObjectByKey(dirName, model + ".json", ModelConfig.class);
	}

	@Override
	public void saveModelConfig(ModelConfig data) throws DAOException {
		String model = data.getModel();
		this.saveObject(dirName, model + ".json", data);
		
	}

	@Override
	public void removeModelConfig(String model) throws DAOException {
		this.removeObject(dirName, model + ".json");
	}
	

	@Override
	public List<ModelConfig> findAll() throws DAOException {
		List<Object> objects = this.getObjectList(dirName, ModelConfig.class);
		List<ModelConfig> models = new ArrayList<>();
		for (Object object : objects){
			if (object instanceof ModelConfig) {
				models.add((ModelConfig)object);
			}
		}
		return models;
	}
	
	public String getBasePath() {
		if (basePath.startsWith("classpath")) {
			basePath = BaseUtil.getClassPath()
					+ basePath.substring(basePath.indexOf(":") + 1);
		}
		return basePath;
	}


}
