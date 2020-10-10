package com.pyblind.controller;

import com.pyblind.services.UserService;
import io.rong.RongCloud;
import io.rong.methods.user.User;
import io.rong.models.response.TokenResult;
import io.rong.models.user.UserModel;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

public class getTokenController {
    UserService userService;
    String appKey = "k51hidwqkv1cb";
    String appSecret = "bIN7u5s5GN";
    @RequestMapping(value="/getToken")
    @ResponseBody
    public Object getToken(@RequestBody Map<String, Object> map){
        Map<String,Object> mapper = new HashMap<>();
        try{
            RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
            User user = rongCloud.user;
            String userName = map.get("loginUsername").toString();
            String userId = userService.getId(userName).toString();


            /**
             * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/user/user.html#register
             *
             * 注册用户，生成用户在融云的唯一身份标识 Token
             */
            UserModel userModel = new UserModel()
                    .setId(userId)
                    .setName(userName)
                    .setPortrait("http://www.rongcloud.cn/images/logo.png");

            TokenResult result = null;
            result = user.register(userModel);
            System.out.println("getToken:  " + result.toString());
            mapper.put("tokenResult",result);
            mapper.put("code","0");
            mapper.put("msg","登录成功");
        }catch(Exception e){
            e.printStackTrace();
            mapper.put("code","1");
            mapper.put("msg","登录失败");
        }

        return mapper;

    }


}
