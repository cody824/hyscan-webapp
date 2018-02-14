package com.noknown.project.hyscan.service;

import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.pojo.MaterialResult;
import com.noknown.project.hyscan.pojo.Result;
import com.noknown.project.hyscan.pojo.WQResult;

/**
 * @author guodong
 */
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
	 * @throws DaoException
	 */
	Result analysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DaoException;

	/**
	 * 分析结果
	 * @param reflectivity
	 * @param model
	 * @param algoVersion
	 * @return
	 * @throws ServiceException
	 * @throws DaoException
	 */
	MaterialResult materialAnalysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DaoException;

	/**
	 * 水质检测
	 * @param reflectivitys
	 * @param model
	 * @param algo
	 * @return
	 * @throws ServiceException
	 * @throws DaoException
	 */
	WQResult wqAnalysis(double[] reflectivitys, String model, String algo) throws ServiceException, DaoException;

	/**
	 * 分析老化等级
	 * @param reflectivity
	 * @param model
	 * @param algoVersion
	 * @return
	 * @throws ServiceException
	 * @throws DaoException
	 */
	int analysisOldLevel(double[] reflectivity, String model, String algoVersion) throws ServiceException, DaoException;

	/**
	 * 分析材质
	 * @param reflectivity
	 * @param model
	 * @param algoVersion
	 * @return
	 * @throws ServiceException
	 * @throws DaoException
	 */
	int analysisMaterial(double[] reflectivity, String model, String algoVersion) throws ServiceException, DaoException;

}
