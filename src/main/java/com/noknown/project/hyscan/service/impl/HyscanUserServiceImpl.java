package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.security.model.BaseUserDetails;
import com.noknown.framework.security.model.ThirdPartyAccount;
import com.noknown.framework.security.pojo.UserWarpForReg;
import com.noknown.framework.security.service.UserService;
import com.noknown.framework.security.service.impl.AbstractUserServiceImpl;
import com.noknown.project.hyscan.dao.UserDetailsDao;
import com.noknown.project.hyscan.model.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author guodong
 */
@Service
@Transactional(rollbackOn = Exception.class)
public class HyscanUserServiceImpl extends AbstractUserServiceImpl implements UserService {

	private final UserDetailsDao udDao;

	@Autowired
	public HyscanUserServiceImpl(UserDetailsDao udDao) {
		this.udDao = udDao;
	}

	@Override
	public BaseUserDetails addUser(UserWarpForReg userToAdd) throws ServiceException {
		UserDetails udDetails = (UserDetails) this.addUser(userToAdd, UserDetails.class);
		if (udDetails != null) {
			udDao.save(udDetails);
		}
		return udDetails;
	}

	@Override
	public BaseUserDetails addUserFromTpa(String tpaType, String tpaId, String avatar, String avatarHd,
	                                      String nickname) {
		UserDetails udDetails = (UserDetails) super.addUserFromTpaBase(tpaType, tpaId, avatar, avatarHd, nickname, UserDetails.class);
		if (udDetails != null) {
			udDao.save(udDetails);
		}
		return udDetails;
	}


	@Override
	public BaseUserDetails addUserFromTpa(ThirdPartyAccount tpa) {
		UserDetails udDetails = (UserDetails) super.addUserFromTpaBase(tpa, UserDetails.class);
		if (udDetails != null) {
			udDao.save(udDetails);
		}
		return udDetails;
	}

	@Override
	public BaseUserDetails addUserFromWx(String wxId, String unionId, String openId, String avatar,
	                                     String avatarHd, String nickname) {
		UserDetails udDetails = (UserDetails) super.addUserFromWxBase(wxId, unionId, openId, avatar, avatarHd, nickname, UserDetails.class);
		if (udDetails != null) {
			udDao.save(udDetails);
		}
		return udDetails;
	}

	@Override
	public void bindEmail(Integer userId, String email) throws DaoException, ServiceException {
		super.bindEmail(userId, email);
		UserDetails ud = udDao.getOne(userId);
		if (ud != null) {
			ud.setEmail(email);
			udDao.save(ud);
		}
	}

	@Override
	public void unbindEmail(Integer userId) throws DaoException, ServiceException {
		super.unbindEmail(userId);
		UserDetails ud = udDao.getOne(userId);
		if (ud != null) {
			ud.setEmail(null);
			udDao.save(ud);
		}
	}

	@Override
	public void bindMobile(Integer userId, String mobile) throws DaoException, ServiceException {
		super.bindMobile(userId, mobile);
		UserDetails ud = udDao.getOne(userId);
		if (ud != null) {
			ud.setMobile(mobile);
			udDao.save(ud);
		}
	}

	@Override
	public void unbindMobile(Integer userId) throws DaoException, ServiceException {
		super.unbindMobile(userId);
		UserDetails ud = udDao.getOne(userId);
		if (ud != null) {
			ud.setMobile(null);
			udDao.save(ud);
		}
	}


}
