package com.noknown;


import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableAutoConfiguration
@EnableTransactionManagement
@ComponentScan(basePackages = {
        "com.noknown.framework.cache",
        "com.noknown.framework.common",
        "com.noknown.framework.email",
        "com.noknown.framework.fss",
        "com.noknown.framework.security",
        "com.noknown.framework.sms",
        "com.noknown.framework.wechat",
        "com.noknown.framework.admin",
        "com.noknown.project.hyscan"
})
public class HyscanApplication  extends SpringBootServletInitializer{
    public static void main(String[] args) {
        SpringApplication.run(HyscanApplication.class, args);
    }
    
    /**
     * 使用 @Bean 注入 FastJsonHttpMessageConverter
     * @return
     */
    @Bean
    public HttpMessageConverters fastJsonHttpMessageConverters()
    {
        //1、需要先定义一个 convert 转换消息对象；
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();

        //2、添加 fastJson 的配置信息，比如: 是否要格式化返回的Json数据；
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
        fastJsonConfig.setSerializerFeatures(SerializerFeature.DisableCircularReferenceDetect);
        //3、在 Convert 中添加配置信息;
        fastConverter.setFastJsonConfig(fastJsonConfig);

        //4、
        HttpMessageConverter<?> converter = fastConverter;
        return new HttpMessageConverters(converter);
    }
}
