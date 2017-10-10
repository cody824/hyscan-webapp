package com.noknown.project.hyscan.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.noknown.project.hyscan.model.UserDetails;


public interface UserDetailsDao extends JpaRepository<UserDetails, Integer>{

}
