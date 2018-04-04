package com.noknown.project.hyscan.service;

import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.pojo.ApiUploadData;

import java.util.List;
import java.util.Locale;

/**
 * APP的通用服务接口
 *
 * @author guodong
 */
public interface AppService {

	/**
	 * 构建扫描任务
	 *
	 * @param apiUploadData 上传数据
	 * @param userId        用户ID
	 * @param locale        语言环境
	 * @return 成功的任务列表
	 * @throws ServiceException 服务异常
	 * @throws DaoException     dao异常
	 */
	List<ScanTask> buildScanTask(ApiUploadData apiUploadData, Integer userId, Locale locale) throws ServiceException, DaoException;

}
