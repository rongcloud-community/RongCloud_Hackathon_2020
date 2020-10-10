package com.pyblind.controller;

import com.mysql.cj.PreparedQuery;
import com.pyblind.entity.User;
import com.pyblind.services.UserService;
import com.pyblind.utils.ConstantUtils;
import com.pyblind.utils.ShaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@Controller
public class loginController {
    @Autowired
    UserService userService;
    ShaUtils shaUtils;
    @RequestMapping(value="/login")
    public String login(){
        return "login/loginfram";
    }
    @RequestMapping(value="/verify")
    @ResponseBody
    public Object verify(@RequestBody Map<String, Object> map, HttpServletRequest request) throws NoSuchAlgorithmException {
        System.out.println("登录验证………………………………………………………………name："+map.get("loginUsername")+" pass："+map.get("loginPassword"));
        String name = map.get("loginUsername").toString();
        String password = map.get("loginPassword").toString();
        Map<String,Object> mapper = new HashMap<>();
        Long id = (long)0;
        System.out.println("exist:"+userService.ifExist(name));
        if (userService.ifExist(name) == 0){
            mapper.put("code",1);
            mapper.put("msg","用户不存在");
        }else{
            System.out.println("password:"+userService.getPassword(name));

            if(shaUtils.getShaPass(password).equals(userService.getPassword(name))){
                mapper.put("code",0);
                mapper.put("msg","登录成功");
                id = userService.getId(name);
                User user = userService.load(id);
                request.getSession().setAttribute(ConstantUtils.USER_SESSION_KEY,user);
                mapper.put("id",id);
                map.put("id",id);
            }else{
                mapper.put("code",1);
                mapper.put("msg","密码错误");
            }
        }
        return mapper;
    }

    @RequestMapping(value="/enroll")
    @ResponseBody
    public Object enroll(@RequestBody Map<String, Object> map) throws NoSuchAlgorithmException {
        System.out.println("进行注册………………………………………………………………name："+map.get("registerUsername")+" pass："+map.get("registerPassword")+" pass2："+map.get("registerWellPassword"));
        String name = map.get("registerUsername").toString();
        String password = map.get("registerPassword").toString();
        String password2 = map.get("registerWellPassword").toString();

        Map<String,Object> mapper = new HashMap<>();
        if(userService.ifExist(name) == 1){
            mapper.put("code",1);
            mapper.put("msg","该用户名已被注册");
        }else{
            if(password.length()<6){
                mapper.put("code",1);
                mapper.put("msg","密码长度过短（需要大于6位）");
            }else{
                if(!password.equals(password2)){
                    mapper.put("code",1);
                    mapper.put("msg","两次输入密码不一致");
                }else{
                    String head = "normal.jpg";
                    password = shaUtils.getShaPass(password);
                    userService.createNew(name,password,head);
                    mapper.put("code",0);
                    mapper.put("msg","注册成功");
                }
            }


        }

        return mapper;
    }
    @RequestMapping("/logout")
    public String logout(HttpServletRequest request){
        request.getSession().removeAttribute(ConstantUtils.USER_SESSION_KEY);
        return "/login";
    }
}