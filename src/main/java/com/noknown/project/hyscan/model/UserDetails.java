package com.noknown.project.hyscan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.context.annotation.Lazy;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "hyscan_user_details")
@JsonIgnoreProperties({ "handler","hibernateLazyInitializer" }) 
@Lazy(value=false)
public class UserDetails extends com.noknown.framework.security.model.UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2749822998371247582L;
	

}
