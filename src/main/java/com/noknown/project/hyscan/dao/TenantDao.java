package com.noknown.project.hyscan.dao;

import com.noknown.project.hyscan.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author guodong
 */
public interface TenantDao extends JpaRepository<Tenant, Integer>,JpaSpecificationExecutor<Tenant>{

}
