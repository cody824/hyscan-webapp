package com.noknown.project.hyscan.service;

import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.pojo.AbstractResult;

/**
 * @author guodong
 */
public interface AnalysisService {


	/**
	 * 分析结果
	 *
	 * @param reflectivity 反射率
	 * @param appId        应用ID
	 * @param model        设备型号
	 * @param target       检测类型
	 * @param algoVersion  算法版本
	 * @return 检测结果
	 * @throws ServiceException 服务异常
	 * @throws DaoException     dao异常
	 */
	AbstractResult analysis(double[] reflectivity, String appId, String model, String target, String algoVersion) throws ServiceException, DaoException;

	/**
	 * 对采集任务进行分析
	 *
	 * @param taskId      任务ID
	 * @param algoVersion 算法
	 * @param use         是否保存到任务结果中
	 * @return 检测结果
	 * @throws ServiceException 服务异常
	 * @throws DaoException     dao异常
	 */
	AbstractResult analysis(String taskId, String algoVersion, boolean use) throws ServiceException, DaoException;

}
