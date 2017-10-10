package com.noknown.project.hyscan.common.config;

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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.noknown.framework.security.authentication.SMSAuthenticationProvider;
import com.noknown.framework.security.authentication.TpaAuthenticationProvider;
import com.noknown.framework.security.authentication.UPAuthenticationProvider;
import com.noknown.framework.security.authentication.filter.JwtAuthenticationTokenFilter;
import com.noknown.framework.security.authentication.oauth2.handler.QQOauth2Handler;
import com.noknown.framework.security.authentication.oauth2.handler.WechatOauth2Handler;
import com.noknown.framework.security.authentication.oauth2.handler.WeiboOauth2Handler;
import com.noknown.framework.security.web.authentication.AjaxLoginUrlAuthenticationEntryPoint;
import com.noknown.framework.security.web.authentication.SureProcessingFilter;

@Configuration
// @EnableWebSecurity: 禁用Boot的默认Security配置，配合@Configuration启用自定义配置
// （需要扩展WebSecurityConfigurerAdapter）
@EnableWebSecurity
// @EnableGlobalMethodSecurity(prePostEnabled = true): 启用Security注解，
// 例如最常用的@PreAuthorize
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
    private AjaxLoginUrlAuthenticationEntryPoint unauthorizedHandler;
	
	@Autowired
	private SureProcessingFilter loginAction;
    
    @Autowired
    private UPAuthenticationProvider upProvider;
    
    @Autowired
    private SMSAuthenticationProvider smsProvider;
    
    @Autowired
    private TpaAuthenticationProvider tpaProvider;
    
    @Autowired
    private QQOauth2Handler qqOauth2Handler;
    
    @Autowired
    private WechatOauth2Handler wechatOauth2Handler;
    
    @Autowired
    private WeiboOauth2Handler weibiOauth2Handler;
    
    @Value("${security.login.smsLogin:false}")
    private boolean supportSMSLogin;
    
    @Value("${security.login.qq:false}")
    private boolean supportQQLogin;
    
    @Value("${security.login.weibo:false}")
    private boolean supportWeiboLogin;
    
    @Value("${security.login.wechat:false}")
    private boolean supportWechatLogin;
    

    @Autowired
    public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
    	authenticationManagerBuilder.authenticationProvider(upProvider);
    	if (supportSMSLogin) {
    		authenticationManagerBuilder.authenticationProvider(smsProvider);
    	}
    	if (supportQQLogin)
    		tpaProvider.addHandler("qq", qqOauth2Handler);
    	if (supportWechatLogin)
    		tpaProvider.addHandler("wechat", wechatOauth2Handler);
    	if (supportWeiboLogin)
    		tpaProvider.addHandler("weibo", weibiOauth2Handler);
    	if (supportQQLogin || supportWechatLogin || supportWeiboLogin)
    		authenticationManagerBuilder.authenticationProvider(tpaProvider);
    }
    
    @Bean
    public PasswordEncoder getPasswordEncoderBean(){
    	return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }
    
    @Bean
    public JwtAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
        return new JwtAuthenticationTokenFilter();
    }

	@Override
	// configure(HttpSecurity): Request层面的配置，对应XML Configuration中的<http>元素
	// 定义URL路径应该受到保护，哪些不应该
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
				// 数据监测API开放访问
				.antMatchers("/app/spAnalysis").permitAll()
				//.antMatchers("/admin.html").authenticated()
				// 除上面外的所有请求全部需要鉴权认证
				.anyRequest().authenticated();

		// 添加JWT filter
		httpSecurity.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
		
		httpSecurity.addFilterAfter(loginAction, UsernamePasswordAuthenticationFilter.class);

		// 禁用缓存
		httpSecurity.headers().cacheControl();
		
	}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
	return super.authenticationManagerBean();
	}
}
