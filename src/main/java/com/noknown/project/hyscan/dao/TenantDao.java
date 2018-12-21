package com.noknown.project.hyscan.dao;

import com.noknown.project.hyscan.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

/**
 * @author guodong
 */
public interface TenantDao extends JpaRepository<Tenant, Integer>,JpaSpecificationExecutor<Tenant>{


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
