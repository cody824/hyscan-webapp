package com.noknown.project.hyscan.service;

import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.pojo.AbstractResult;
import com.noknown.project.hyscan.pojo.MaterialResult;
import com.noknown.project.hyscan.pojo.Result;
import com.noknown.project.hyscan.pojo.WqResult;

/**
 * @deprecated
 * @author guodong
 */
@SuppressWarnings("deprecation")
public interface SpectralAnalysisService {

	/**
	 * 分析结果
	 * @deprecated
	 * @param reflectivity  反射率
	 * @param model         型号
	 * @param algoVersion   算法版本
	 * @return 结果
	 * @throws ServiceException 服务异常
	 * @throws DaoException     dao异常
	 */
	Result analysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DaoException;

	/**
	 * 分析结果
	 * @param reflectivity  反射率
	 * @param model         型号
	 * @param algoVersion   算法版本
	 * @return 结果
	 * @throws ServiceException 服务异常
	 * @throws DaoException     dao异常
	 */
	MaterialResult materialAnalysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DaoException;

	/**
	 * 水质检测
	 * @param reflectivity  反射率
	 * @param model         型号
	 * @param algoVersion   算法版本
	 * @return 结果
	 * @throws ServiceException 服务异常
	 * @throws DaoException     dao异常
	 */
	WqResult wqAnalysis(double[] reflectivity, String model, String algoVersion) throws ServiceException, DaoException;



	/**
	 * 对采集任务进行分析
	 *
	 * @param taskId 任务ID
	 * @param algo   算法
	 * @return 检测结果
	 * @throws ServiceException 服务异常
	 * @throws DaoException     dao异常
	 */
	AbstractResult analysis(String taskId, String algo) throws ServiceException, DaoException;

}
