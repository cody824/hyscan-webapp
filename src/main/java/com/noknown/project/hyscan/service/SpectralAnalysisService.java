package com.noknown.project.hyscan.service;

import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.pojo.MaterialResult;
import com.noknown.project.hyscan.pojo.Result;
import com.noknown.project.hyscan.pojo.WQResult;

@SuppressWarnings("deprecation")
public interface SpectralAnalysisService {

	/**
	 * 分析结果
	 * @deprecated
	 * @param reflectivity
	 * @param model
	 * @param algoVersion
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	Result analysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DAOException;
	
	/**
	 * 分析结果
	 * @param reflectivity
	 * @param model
	 * @param algoVersion
	 * @return
	 * @throws ServiceException
	 * @throws DAOException
	 */
	MaterialResult materialAnalysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DAOException;

	/**
	 * 水质检测
	 * @param reflectivitys
	 * @param model
	 * @param algo
	 * @return
	 */
	WQResult wqAnalysis(double[] reflectivitys, String model, String algo) throws ServiceException, DAOException;
	
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
