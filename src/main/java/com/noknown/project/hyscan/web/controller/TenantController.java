package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.web.model.PageData;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.framework.security.model.Role;
import com.noknown.framework.security.service.RoleService;
import com.noknown.project.hyscan.common.APP_TYPE;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.common.config.RunConfig;
import com.noknown.project.hyscan.model.Tenant;
import com.noknown.project.hyscan.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Date;

/**
 * @author guodong
 */
@RestController
@RequestMapping(value = Constants.ADMIN_BASE_URL)
public class TenantController extends BaseController {

	private final TenantService tenantService;

	private final RoleService roleService;

	private final RunConfig runConfig;

	@Autowired
	public TenantController(TenantService tenantService, RoleService roleService, RunConfig runConfig) {
		this.tenantService = tenantService;
		this.roleService = roleService;
		this.runConfig = runConfig;
	}

	private void checkAndBuildRole(String name, String comment) throws ServiceException, DaoException {
		Role role = roleService.getRoleByName(name);
		if (role == null) {
			roleService.createRole(name, comment);
		}
	}

	@PostConstruct
	private void init(){
		if (!runConfig.supportTenant) {
			return;
		}
		try {
			checkAndBuildRole(Constants.ROLE_TENANT_ADMIN, "租户管理员");
			checkAndBuildRole(Constants.ROLE_HYSCAN_TENANT, "材质检测租户管理员");
			checkAndBuildRole(Constants.ROLE_MEISE_TENANT, "煤色租户管理员");
			checkAndBuildRole(Constants.ROLE_NONGSE_TENANT, "农色租户管理员");
			checkAndBuildRole(Constants.ROLE_WQ_TENANT, "水色租户管理员");
			checkAndBuildRole(Constants.ROLE_SCHOOL_TENANT, "校园版租户管理员");
		} catch (DaoException e) {
			e.printStackTrace();
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/tenant/", method = RequestMethod.POST)
	public ResponseEntity<?> createTenant(@RequestBody Tenant tenant)
			throws Exception {
		Authentication user = loginAuth();
		tenant.setCreateTime(new Date())
				.setCreateUserId(this.loginUser().getUser().getId());
		tenantService.create(tenant);
		attachTenantRole(tenant);
		return ResponseEntity.ok(tenant);
	}

	@RequestMapping(value = "/tenant/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateTenant(@PathVariable Integer id, @RequestBody Tenant tenant)
			throws Exception {
		Authentication user = loginAuth();
		tenant = tenantService.update(id, tenant, null);
		attachTenantRole(tenant);
		return ResponseEntity.ok(tenant);
	}

	@RequestMapping(value = "/tenant/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable Integer id)
			throws Exception {
		tenantService.delete(new Integer[]{id});
		return ResponseEntity.ok(null);
	}

	@RequestMapping(value = "/tenant/", method = RequestMethod.GET)
	public ResponseEntity<?> findScanTask(@RequestParam(required = false) String filter,
	                                      @RequestParam(required = false) String sort,
	                                      @RequestParam(required = false, defaultValue = "0") int start,
	                                      @RequestParam(required = false, defaultValue = "-1") int limit)
			throws Exception {
		SQLFilter sqlFilter = this.buildFilter(filter, sort);
		PageData<Tenant> pd = tenantService.find(sqlFilter, start, limit);
		return ResponseEntity.ok(pd);
	}

	private void attachTenantRole(Tenant tenant) throws ServiceException, DaoException {
		if (tenant.getAdminId() != null) {
			roleService.attachRoleForUser(tenant.getAdminId(), Constants.ROLE_TENANT_ADMIN);
			roleService.detachRoleFromUser(tenant.getAdminId(), Constants.ROLE_HYSCAN_TENANT);
			roleService.detachRoleFromUser(tenant.getAdminId(), Constants.ROLE_NONGSE_TENANT);
			roleService.detachRoleFromUser(tenant.getAdminId(), Constants.ROLE_MEISE_TENANT);
			roleService.detachRoleFromUser(tenant.getAdminId(), Constants.ROLE_WQ_TENANT);
			roleService.detachRoleFromUser(tenant.getAdminId(), Constants.ROLE_SCHOOL_TENANT);
			String[] appIds = tenant.getAppIds().split(",");
			for (String appId : appIds) {
				if (APP_TYPE.caizhi.name().equals(appId)) {
					roleService.attachRoleForUser(tenant.getAdminId(), Constants.ROLE_HYSCAN_TENANT);
				} else if (APP_TYPE.nongse.name().equals(appId)) {
					roleService.attachRoleForUser(tenant.getAdminId(), Constants.ROLE_NONGSE_TENANT);
				} else if (APP_TYPE.meise.name().equals(appId)) {
					roleService.attachRoleForUser(tenant.getAdminId(), Constants.ROLE_MEISE_TENANT);
				} else if (APP_TYPE.shuise.name().equals(appId)) {
					roleService.attachRoleForUser(tenant.getAdminId(), Constants.ROLE_WQ_TENANT);
				} else if (APP_TYPE.school.name().equals(appId)) {
					roleService.attachRoleForUser(tenant.getAdminId(), Constants.ROLE_SCHOOL_TENANT);
				}
			}
		}
	}

}
