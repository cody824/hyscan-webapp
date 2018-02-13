package com.noknown.project.hyscan.model.factory;

import com.noknown.framework.common.util.JsonUtil;
import com.noknown.framework.security.model.BaseUserDetails;
import com.noknown.framework.security.model.factory.UserDetailsFactory;
import com.noknown.project.hyscan.model.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsFactoryImpl implements UserDetailsFactory {

	@Override
	public BaseUserDetails createUD(Integer id) {
		BaseUserDetails udDetails = new com.noknown.project.hyscan.model.UserDetails();
		udDetails.setId(id);
		return udDetails;
	}

	@Override
	public BaseUserDetails parseUD(String text) {
		BaseUserDetails udDetails = (UserDetails) JsonUtil.toObject(text, UserDetails.class);
		return udDetails;
	}
	
}
