package com.noknown.project.hyscan.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * @author guodong
 */
@Configuration
public class RunConfig {


	/**
	 * 是否支持租户
	 */
	@Value("${hyscan.support.tenant:true}")
	public boolean supportTenant;

	/**
	 * 是否支持水色
	 */
	@Value("${hyscan.support.shuise:true}")
	public boolean supportShuise;

	/**
	 * 是否支持煤色
	 */
	@Value("${hyscan.support.meise:true}")
	public boolean supportMeise;

	/**
	 * 是否支持农色
	 */
	@Value("${hyscan.support.nongse:true}")
	public boolean supportNongse;

	/**
	 * 是否支持材质检测
	 */
	@Value("${hyscan.support.caizhi:true}")
	public boolean supportCaizhi;

	/**
	 * 是否支持校园版
	 */
	@Value("${hyscan.support.school:true}")
	public boolean supportSchool;

	/**
	 * 是否地图显示
	 */
	@Value("${hyscan.support.map:true}")
	public boolean supportMap;

	/**
	 * 是否支持添加用户
	 */
	@Value("${hyscan.support.addUser:false}")
	public boolean supportAddUser;

	/**
	 * 默认语言
	 */
	@Value("${hyscan.defaultLang:zh_CN}")
	public String defaultLang;


}