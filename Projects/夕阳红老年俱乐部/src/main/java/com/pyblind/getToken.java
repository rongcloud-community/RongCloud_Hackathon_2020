//package com.pyblind;
//
//import java.util.*;
//import io.rong.RongCloud;
//import io.rong.methods.user.User;
//import io.rong.models.response.TokenResult;
//import io.rong.models.user.UserModel;
//
//public class getToken {
//    String appKey = "k51hidwqkv1cb";
//    String appSecret = "bIN7u5s5GN";
//
//    RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
//    User user = rongCloud.user;
//
//    /**
//     * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/user/user.html#register
//     *
//     * 注册用户，生成用户在融云的唯一身份标识 Token
//     */
//    UserModel userModel = new UserModel()
//            .setId("hHjap87")
//            .setName("RongCloud")
//            .setPortrait("http://www.rongcloud.cn/images/logo.png");
//    TokenResult result = user.register(userModel);
//
//}
