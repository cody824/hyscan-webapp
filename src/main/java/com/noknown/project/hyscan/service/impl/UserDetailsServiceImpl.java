package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.util.ObjectUtil;
import com.noknown.framework.security.model.UserDetails;
import com.noknown.framework.security.service.UserDetailsService;
import com.noknown.project.hyscan.dao.UserDetailsDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserDetailsServiceImpl  implements UserDetailsService {
	
	public final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private UserDetailsDao udDao;

	@Value("${security.auth.email:true}")
	private boolean emailAuth;
	
	@Value("${security.auth.mobile:true}")
	private boolean mobileAuth;

	@Override
	public UserDetails updateUserDetails(UserDetails ud) throws ServiceException {
		UserDetails udDetails = udDao.getOne(ud.getId());
		if (udDetails == null)
			throw new ServiceException("用户不存在");
		
		if (udDetails instanceof com.noknown.project.hyscan.model.UserDetails){
			List<String> ignore = new ArrayList<>();
			if (emailAuth)
				ignore.add("email");
			if (mobileAuth)
				ignore.add("mobile");
			com.noknown.project.hyscan.model.UserDetails hyUD = (com.noknown.project.hyscan.model.UserDetails) udDetails;
			ObjectUtil.copy(hyUD, ud, ignore);
			udDao.save(hyUD);
			return hyUD;
		} else {
			throw new ServiceException("不支持该用户类型");
		}
	}

	@Override
	public UserDetails get(Integer id) throws ServiceException {
		return udDao.findOne(id);
	}
}
