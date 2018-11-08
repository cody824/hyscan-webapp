package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.exception.WebException;
import com.noknown.framework.common.web.model.PageData;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.framework.security.model.Role;
import com.noknown.framework.security.service.RoleService;
import com.noknown.project.hyscan.common.Constants;
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

	@PostConstruct
	private void init(){
		try {
			Role role = roleService.getRoleByName("ROLE_TENANT_ADMIN");
			if (role == null){
				roleService.createRole("ROLE_TENANT_ADMIN", "租户管理员");
			}
		} catch (DaoException e) {
			e.printStackTrace();
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

	@Autowired
	public TenantController(TenantService tenantService, RoleService roleService) {
		this.tenantService = tenantService;
		this.roleService = roleService;
	}

	@Deprecated
	@RequestMapping(value = "/tenant/", method = RequestMethod.POST)
	public ResponseEntity<?> createTenant(@RequestBody Tenant tenant)
			throws Exception {
		Authentication user = loginAuth();
		if (user == null) {
			throw new WebException("请登录");
		}
		tenant.setCreateTime(new Date())
				.setCreateUserId(this.loginUser().getUser().getId());
		tenantService.create(tenant);
		return ResponseEntity.ok(tenant);
	}

	@Deprecated
	@RequestMapping(value = "/tenant/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateTenant(@PathVariable Integer id, @RequestBody Tenant tenant)
			throws Exception {
		Authentication user = loginAuth();
		if (user == null) {
			throw new WebException("请登录");
		}
		tenantService.update(id, tenant, null);
		return ResponseEntity.ok(tenant);
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

}
