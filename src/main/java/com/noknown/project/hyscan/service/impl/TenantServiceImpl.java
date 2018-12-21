package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.base.BaseServiceImpl;
import com.noknown.project.hyscan.dao.TenantDao;
import com.noknown.project.hyscan.model.Tenant;
import com.noknown.project.hyscan.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author guodong
 * @date 2018/11/2
 */
@Service
@Transactional(rollbackOn = Exception.class)
public class TenantServiceImpl extends BaseServiceImpl<Tenant, Integer>  implements TenantService{

	private final TenantDao tenantDao;

	@Autowired
	public TenantServiceImpl(TenantDao tenantDao) {
		this.tenantDao = tenantDao;
	}

	@Override
	public JpaRepository<Tenant, Integer> getRepository() {
		return tenantDao;
	}

	@Override
	public JpaSpecificationExecutor<Tenant> getSpecificationExecutor() {
		return tenantDao;
	}

	@Override
	public List<Tenant> findByAdminId(Integer adminId) {
		return tenantDao.findByAdminId(adminId);
	}

	@Override
	public Long countByAdminId(Integer adminId) {
		return tenantDao.countByAdminId(adminId);
	}
}
