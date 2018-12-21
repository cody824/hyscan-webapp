package com.noknown.project.hyscan.service;

import com.noknown.framework.common.base.BaseService;
import com.noknown.project.hyscan.model.Tenant;

import java.util.List;


/**
 * @author guodong
 */
public interface TenantService extends BaseService<Tenant, Integer> {


	/**
	 * 通过adminId获取租户
	 *
	 * @param adminId
	 * @return
	 */
	List<Tenant> findByAdminId(Integer adminId);

	/**
	 * 管理员管理的租户数量
	 *
	 * @param adminId
	 * @return
	 */
	Long countByAdminId(Integer adminId);
}
