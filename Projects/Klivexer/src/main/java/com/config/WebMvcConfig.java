package com.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**/**").addResourceLocations("file:E:/Program Files/Klivexer/src/main/resources/static/images/");
    }

    @Override
    //通过此处加载拦截器
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new signinHandlerIntercepter())
                .addPathPatterns("/**","/main/login-success")
                .excludePathPatterns("/main",  "/main/**", "/error/**","/components/**","/classVideo/**","/fonts/**","/images/**","webview/**");
    }
}
