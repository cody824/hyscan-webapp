package com.noknown.project.hyscan.common.config;

import com.noknown.framework.security.authentication.SMSAuthenticationProvider;
import com.noknown.framework.security.authentication.TpaAuthenticationProvider;
import com.noknown.framework.security.authentication.UserPasswordAuthenticationProvider;
import com.noknown.framework.security.authentication.filter.JwtAuthenticationTokenFilter;
import com.noknown.framework.security.authentication.oauth2.handler.QQOauth2Handler;
import com.noknown.framework.security.authentication.oauth2.handler.WechatOauth2Handler;
import com.noknown.framework.security.authentication.oauth2.handler.WeiboOauth2Handler;
import com.noknown.framework.security.web.authentication.AjaxLoginUrlAuthenticationEntryPoint;
import com.noknown.framework.security.web.authentication.SureProcessingFilter;
import com.noknown.framework.security.web.authentication.SureUrlAuthenticationFailureHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author guodong
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final AjaxLoginUrlAuthenticationEntryPoint unauthorizedHandler;

	private final SureProcessingFilter loginAction;

	private final UserPasswordAuthenticationProvider upProvider;

	private final SMSAuthenticationProvider smsProvider;

	private final TpaAuthenticationProvider tpaProvider;

	private final QQOauth2Handler qqOauth2Handler;

	private final WechatOauth2Handler wechatOauth2Handler;

	private final WeiboOauth2Handler weibiOauth2Handler;

	@Value("${security.login.smsLogin:false}")
	private boolean supportSMSLogin;

	@Value("${security.login.qq:false}")
	private boolean supportQQLogin;

	@Value("${security.login.weibo:false}")
	private boolean supportWeiboLogin;

	@Value("${security.login.wechat:false}")
	private boolean supportWechatLogin;

	@Autowired
	public SecurityConfig(AjaxLoginUrlAuthenticationEntryPoint unauthorizedHandler, SureProcessingFilter loginAction, UserPasswordAuthenticationProvider upProvider, SMSAuthenticationProvider smsProvider, TpaAuthenticationProvider tpaProvider, QQOauth2Handler qqOauth2Handler, WechatOauth2Handler wechatOauth2Handler, WeiboOauth2Handler weibiOauth2Handler) {
		this.unauthorizedHandler = unauthorizedHandler;
		this.loginAction = loginAction;
		this.upProvider = upProvider;
		this.smsProvider = smsProvider;
		this.tpaProvider = tpaProvider;
		this.qqOauth2Handler = qqOauth2Handler;
		this.wechatOauth2Handler = wechatOauth2Handler;
		this.weibiOauth2Handler = weibiOauth2Handler;
	}

	@Bean
	public AuthenticationFailureHandler getFailureHandler() {
		SureUrlAuthenticationFailureHandler failureHandler = new SureUrlAuthenticationFailureHandler();
		failureHandler.setTargetUrlParameter("errorGoto");
		return failureHandler;
	}

	@Bean
	public AuthenticationSuccessHandler getSuccessHandler() {
		SimpleUrlAuthenticationSuccessHandler successHandler = new SimpleUrlAuthenticationSuccessHandler();
		successHandler.setAlwaysUseDefaultTargetUrl(true);
		successHandler.setDefaultTargetUrl("/");
		return successHandler;
	}


	@Autowired
	public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) {
		authenticationManagerBuilder.authenticationProvider(upProvider);
		if (supportSMSLogin) {
			authenticationManagerBuilder.authenticationProvider(smsProvider);
		}
		if (supportQQLogin) {
			tpaProvider.addHandler("qq", qqOauth2Handler);
		}
		if (supportWechatLogin) {
			tpaProvider.addHandler("wechat", wechatOauth2Handler);
		}
		if (supportWeiboLogin) {
			tpaProvider.addHandler("weibo", weibiOauth2Handler);
		}
		if (supportQQLogin || supportWechatLogin || supportWeiboLogin) {
			authenticationManagerBuilder.authenticationProvider(tpaProvider);
		}
	}


	@Bean
	public JwtAuthenticationTokenFilter authenticationTokenFilterBean() {
		return new JwtAuthenticationTokenFilter();
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
				.csrf().disable()

				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED).and()

				.authorizeRequests()
				// .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

				// 允许对于网站静态资源的无授权访问
				.antMatchers(HttpMethod.GET, "/", "/favicon.ico", "/**/*.html", "/**/*.css", "/**/*.js")
				.permitAll()
				.antMatchers(HttpMethod.GET, "/img/**", "/js/**")
				.permitAll()
				.antMatchers(HttpMethod.GET, "/globalconfig/**", "/test/**", "/error/**", "/sms/test/send")
				.permitAll()
				// 对于获取token的rest api要允许匿名访问
				.antMatchers("/security/auth/**", "/security/authcode/**", "/gotoLoginView", "/base/auth").permitAll()
				// APP开放接口
				.antMatchers("/app/spAnalysis", "/api/task/**").permitAll()
				.antMatchers(HttpMethod.GET, "/app/modelConfig/").permitAll()
				//管理员页面
				.antMatchers("/admin").hasAnyRole("ADMIN", "TENANT_ADMIN")
				// 除上面外的所有请求全部需要鉴权认证
				.anyRequest().authenticated().and().headers().frameOptions().disable();

		// 添加JWT filter
		httpSecurity.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

		httpSecurity.addFilterAfter(loginAction, UsernamePasswordAuthenticationFilter.class);

		// 禁用缓存
		//httpSecurity.headers().cacheControl();

	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
}
