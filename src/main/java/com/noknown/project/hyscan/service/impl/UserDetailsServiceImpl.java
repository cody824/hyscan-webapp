package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.security.service.UserDetailsService;
import com.noknown.framework.security.service.impl.AbstractUseDetailsrServiceImpl;
import com.noknown.project.hyscan.dao.UserDetailsDao;
import com.noknown.project.hyscan.model.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author guodong
 */
@Service
@Transactional(rollbackOn = Exception.class)
public class UserDetailsServiceImpl extends AbstractUseDetailsrServiceImpl<UserDetails> implements UserDetailsService<UserDetails> {

	private final UserDetailsDao udDao;

	@Autowired
	public UserDetailsServiceImpl(UserDetailsDao udDao) {
		this.udDao = udDao;
	}

	@Override
	public JpaRepository<UserDetails, Integer> getRepository() {
		return udDao;
	}

	@Override
	public JpaSpecificationExecutor<UserDetails> getSpecificationExecutor() {
		return udDao;
	}

}
