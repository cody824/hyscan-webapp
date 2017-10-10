package com.noknown.project.hyscan.service.impl;

import javax.transaction.Transactional;

import com.noknown.framework.common.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.security.model.ThirdPartyAccount;
import com.noknown.framework.security.model.User;
import com.noknown.framework.security.service.UserService;
import com.noknown.framework.security.service.impl.UserServiceImpl;
import com.noknown.project.hyscan.dao.UserDetailsDao;
import com.noknown.project.hyscan.model.UserDetails;

@Service
@Transactional
public  class HyscanUserServiceImpl extends UserServiceImpl implements UserService {
	
	@Autowired
	private UserDetailsDao udDao;

	@Override
	public com.noknown.framework.security.model.UserDetails addUser(User userToAdd) throws ServiceException{
		super.addUser(userToAdd);
		UserDetails udDetails = new UserDetails();
		udDetails.setId(userToAdd.getId());
        udDetails.setNick(userToAdd.getNick());
        if (StringUtil.isNotBlank(userToAdd.getMobile())){
        	udDetails.setMobile(userToAdd.getMobile());
        }
        if (StringUtil.isNotBlank(userToAdd.getEmail())){
        	udDetails.setEmail(userToAdd.getEmail());
        }
        udDetails.setFullName(userToAdd.getNick());
        udDao.save(udDetails);
		return udDetails;
	}
	
	@Override
	public com.noknown.framework.security.model.UserDetails  addUserFromTpa(String tpaType, String tpaId, String avatar, String avatar_hd,
			String nickname) throws ServiceException, DAOException {
		User userToAdd = super.addUserFromTpaBase(tpaType, tpaId, avatar, avatar_hd, nickname);
		UserDetails udDetails = new UserDetails();
		udDetails.setId(userToAdd.getId());
        udDetails.setNick(userToAdd.getNick());
        if (StringUtil.isNotBlank(userToAdd.getMobile())){
        	udDetails.setMobile(userToAdd.getMobile());
        }
        if (StringUtil.isNotBlank(userToAdd.getEmail())){
        	udDetails.setEmail(userToAdd.getEmail());
        }
        udDetails.setAvatar(avatar);
        udDetails.setAvatarHd(avatar_hd);
        udDetails.setFullName(nickname);
        udDao.save(udDetails);
		return udDetails;
	}
	

	@Override
	public com.noknown.framework.security.model.UserDetails addUserFromTpa(ThirdPartyAccount tpa)
			throws ServiceException, DAOException {
		User userToAdd = super.addUserFromTpaBase(tpa);
		UserDetails udDetails = new UserDetails();
		udDetails.setId(userToAdd.getId());
        udDetails.setNick(userToAdd.getNick());
        if (StringUtil.isNotBlank(userToAdd.getMobile())){
        	udDetails.setMobile(userToAdd.getMobile());
        }
        if (StringUtil.isNotBlank(userToAdd.getEmail())){
        	udDetails.setEmail(userToAdd.getEmail());
        }
        udDetails.setAvatar(tpa.getAvatar());
        udDetails.setAvatarHd(tpa.getAvatar_hd());
        udDetails.setFullName(tpa.getNickname());
        udDao.save(udDetails);
        return udDetails;
	}
	
	@Override
	public com.noknown.framework.security.model.UserDetails  addUserFromWx(String wxId, String unionId, String openId, String avatar,
			String avatar_hd, String nickname) throws ServiceException, DAOException {
		User userToAdd = super.addUserFromWxBase(wxId, unionId, openId, avatar, avatar_hd, nickname);
		UserDetails udDetails = new UserDetails();
		udDetails.setId(userToAdd.getId());
        udDetails.setNick(userToAdd.getNick());
        if (StringUtil.isNotBlank(userToAdd.getMobile())){
        	udDetails.setMobile(userToAdd.getMobile());
        }
        if (StringUtil.isNotBlank(userToAdd.getEmail())){
        	udDetails.setEmail(userToAdd.getEmail());
        }
        udDetails.setAvatar(avatar);
        udDetails.setAvatarHd(avatar_hd);
        udDetails.setFullName(nickname);
        udDao.save(udDetails);
		return udDetails;
	}

	@Override
	public void bindEmail(Integer userId, String email) throws DAOException, ServiceException {
		super.bindEmail(userId, email);
		UserDetails ud = udDao.getOne(userId);
		if (ud != null) {
			ud.setEmail(email);
			udDao.save(ud);
		}
	}

	@Override
	public void unbindEmail(Integer userId) throws DAOException, ServiceException {
		super.unbindEmail(userId);
		UserDetails ud = udDao.getOne(userId);
		if (ud != null) {
			ud.setEmail(null);
			udDao.save(ud);
		}
	}

	@Override
	public void bindMobile(Integer userId, String mobile) throws DAOException, ServiceException {
		super.bindMobile(userId, mobile);
		UserDetails ud = udDao.getOne(userId);
		if (ud != null) {
			ud.setMobile(mobile);
			udDao.save(ud);
		}
	}

	@Override
	public void unbindMobile(Integer userId) throws DAOException, ServiceException {
		super.unbindMobile(userId);
		UserDetails ud = udDao.getOne(userId);
		if (ud != null) {
			ud.setMobile(null);
			udDao.save(ud);
		}
	}



}
