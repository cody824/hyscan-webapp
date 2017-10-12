package com.noknown.project.hyscan.service;

import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.pojo.Result;

public interface SpectralAnalysisService {

	/**
	 * 分析结果
	 * @param reflectivity
	 * @param model
	 * @param algoVersion
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	Result analysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DAOException;
	
	
	/**
	 * 分析老化等级
	 * @param reflectivity
	 * @param model
	 * @param algoVersion
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	int analysisOldLevel(double[] reflectivity, String model, String algoVersion) throws ServiceException, DAOException;
	
	/**
	 * 分析材质
	 * @param reflectivity
	 * @param model
	 * @param algoVersion
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	int analysisMaterial(double[] reflectivity, String model, String algoVersion) throws ServiceException, DAOException;
	
}
