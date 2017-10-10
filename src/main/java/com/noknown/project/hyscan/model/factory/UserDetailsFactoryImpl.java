package com.noknown.project.hyscan.model.factory;

import org.springframework.stereotype.Component;

import com.noknown.framework.common.util.JsonUtil;
import com.noknown.framework.security.model.UserDetails;
import com.noknown.framework.security.model.factory.UserDetailsFactory;

@Component
public class UserDetailsFactoryImpl implements UserDetailsFactory {

	@Override
	public UserDetails createUD(Integer id) {
		UserDetails udDetails = new com.noknown.project.hyscan.model.UserDetails();
		udDetails.setId(id);
		return udDetails;
	}

	@Override
	public UserDetails parseUD(String text) {
		UserDetails udDetails = (UserDetails) JsonUtil.toObject(text, com.noknown.project.hyscan.model.UserDetails.class);
		return udDetails;
	}
	
}
