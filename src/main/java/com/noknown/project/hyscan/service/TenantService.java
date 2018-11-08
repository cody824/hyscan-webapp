package com.noknown.project.hyscan.service;

import com.noknown.framework.common.base.BaseService;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.model.Tenant;
import com.noknown.project.hyscan.pojo.DownloadInfo;

import java.util.List;


/**
 * @author guodong
 */
public interface TenantService extends BaseService<Tenant, Integer> {

}
