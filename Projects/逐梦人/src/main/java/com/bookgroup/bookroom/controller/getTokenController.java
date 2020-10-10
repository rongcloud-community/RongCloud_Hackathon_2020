package com.bookgroup.bookroom.controller;

import io.rong.RongCloud;
import io.rong.methods.user.User;
import io.rong.models.response.TokenResult;
import io.rong.models.user.UserModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/adam")
public class getTokenController {
    private String appKey = "sfci50a7sx7ti";
    private String appSecret = "GWSSPy6nYP";

    @RequestMapping("/getToken")
    @ResponseBody
    public Object getToken(@RequestBody Map<String,Object> result){
        Map<String, Object> mapper = new HashMap<>();
        try {
            RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
            User user = rongCloud.user;
            String userName = result.get("username").toString();
            UserModel userModel = new UserModel()
                    .setId(userName)
                    .setName(userName)
                    .setPortrait("http://www.rongcloud.cn/images/logo.png");
            TokenResult tokenResult = null;
            tokenResult = user.register(userModel);
            mapper.put("tokenResult",tokenResult);
            mapper.put("code","0");
            mapper.put("msg","登录成功");
        } catch (Exception e) {
            e.printStackTrace();
            mapper.put("code","1");
            mapper.put("msg","登录失败");
        }
        return mapper;
    }

    @RequestMapping("/main")
    public String mainfram(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "main/p2p";
    }

    @RequestMapping("/check")
    public String check(String userId, String token, String targetId){
        Map<String, Object> mapper = new HashMap<>();
        return "main/charthome";
    }

}
