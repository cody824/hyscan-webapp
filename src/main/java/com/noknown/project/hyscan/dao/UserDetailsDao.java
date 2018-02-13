package com.noknown.project.hyscan.dao;

import com.noknown.project.hyscan.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface UserDetailsDao extends JpaRepository<UserDetails, Integer>, JpaSpecificationExecutor<UserDetails> {

}
