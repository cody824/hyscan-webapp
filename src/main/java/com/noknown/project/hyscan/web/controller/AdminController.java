package com.noknown.project.hyscan.web.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.framework.security.service.RoleService;
import com.noknown.project.hyscan.common.APP_TYPE;
import com.noknown.project.hyscan.common.Constants;
import com.noknown.project.hyscan.model.Tenant;
import com.noknown.project.hyscan.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Controller
public class AdminController extends BaseController {

	private final TenantService tenantService;

	private final RoleService roleService;

	@Autowired
	public AdminController(TenantService tenantService, RoleService roleService) {
		this.tenantService = tenantService;
		this.roleService = roleService;
	}

	@RequestMapping(value = "/admin")
	public String gotoAdmin(HttpServletRequest request, HttpSession session) throws ServiceException, DaoException {
		Integer loginId = this.loginId();

		if (this.hasRole("ROLE_ADMIN")) {
			request.setAttribute("tenantAdmin", false);
		} else if (hasRole(Constants.ROLE_TENANT_ADMIN)) {
			Long tenantNum = tenantService.countByAdminId(loginId);
			if (tenantNum == 0) {
				roleService.detachRoleFromUser(loginId, Constants.ROLE_TENANT_ADMIN);
			}
			request.setAttribute("tenantAdmin", true);

			List<Tenant> tenantList = tenantService.findByAdminId(loginId);
			Set<String> serials = new HashSet<>(20);
			for (Tenant tenant : tenantList) {
				if (StringUtil.isNotBlank(tenant.getSerials())) {
					String[] serialArr = tenant.getSerials().split(",");
					for (String serial : serialArr) {
						if (!serials.contains(serial)) {
							serials.add(serial);
						}
					}
				}
			}
			session.setAttribute("tenantSerials", serials);
		}

		List<APP_TYPE> supportApps = supportApp();
		session.setAttribute("supportApps", supportApps);

		return "admin";
	}
	
	@RequestMapping(value = "/")
	public String gotoMain(){
		return "redirect:/admin";
	}


	private List<APP_TYPE> supportApp() {
		List<APP_TYPE> appIds = new ArrayList<>();
		if (this.hasRole("ROLE_ADMIN")) {
			if (this.hasRole(Constants.ROLE_HYSCAN_ADMIN)) {
				appIds.add(APP_TYPE.caizhi);
			}
			if (this.hasRole(Constants.ROLE_WQ_ADMIN)) {
				appIds.add(APP_TYPE.shuise);
			}
			if (this.hasRole(Constants.ROLE_NONGSE_ADMIN)) {
				appIds.add(APP_TYPE.nongse);
			}
			if (this.hasRole(Constants.ROLE_MEISE_ADMIN)) {
				appIds.add(APP_TYPE.meise);
			}
		} else if (hasRole(Constants.ROLE_TENANT_ADMIN)) {
			if (this.hasRole(Constants.ROLE_HYSCAN_TENANT)) {
				appIds.add(APP_TYPE.caizhi);
			}
			if (this.hasRole(Constants.ROLE_WQ_TENANT)) {
				appIds.add(APP_TYPE.shuise);
			}
			if (this.hasRole(Constants.ROLE_NONGSE_TENANT)) {
				appIds.add(APP_TYPE.nongse);
			}
			if (this.hasRole(Constants.ROLE_MEISE_TENANT)) {
				appIds.add(APP_TYPE.meise);
			}
		}
		return appIds;
	}
}
