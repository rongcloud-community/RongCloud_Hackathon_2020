package com.config;

import com.aihome.utils.ConstantUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class signinHandlerIntercepter implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        Object user = request.getSession().getAttribute(ConstantUtils.USER_SESSION_KEY);
        if(user == null){
            request.getRequestDispatcher("/main").forward(request, response);
            return false;
        }
        else {
            return true;
        }
    }
}
