package com.noknown.project.hyscan.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @author guodong
 */
@Configuration
public class CommonConfig {

	@Bean
	public PasswordEncoder getPasswordEncoderBean() {
		return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
	}
}