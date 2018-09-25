package com.noknown.project.hyscan.common.config;

import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.ErrorPageRegistrar;
import org.springframework.boot.web.server.ErrorPageRegistry;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

import javax.servlet.MultipartConfigElement;

/**
 * @author guodong
 */
@Configuration
public class WebConfig {

	private final static long TASK_ID_WORKER = 0L;

	@Bean
	public MultipartConfigElement multipartConfigElement() {
		MultipartConfigFactory factory = new MultipartConfigFactory();
		factory.setMaxFileSize("10MB");
		factory.setMaxRequestSize("10MB");
		return factory.createMultipartConfig();
	}


	@Bean
	public ErrorPageRegistrar errorPageRegistrar() {
		return new MyErrorPageRegistrar();
	}

	private static class MyErrorPageRegistrar implements ErrorPageRegistrar {

		@Override
		public void registerErrorPages(ErrorPageRegistry registry) {
			ErrorPage error400Page = new ErrorPage(HttpStatus.BAD_REQUEST, "/error/400");
			ErrorPage error401Page = new ErrorPage(HttpStatus.UNAUTHORIZED, "/error/401");
			ErrorPage error403Page = new ErrorPage(HttpStatus.FORBIDDEN, "/error/403");
			ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/error/404");
			ErrorPage error500Page = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/error/500");
			registry.addErrorPages(error400Page, error401Page, error403Page, error404Page, error500Page);
		}

	}
}