package com.aihome.component;

import com.zhenzi.sms.ZhenziSmsClient;;
import java.util.Map;
import java.util.HashMap;

public class ZhenziyunService {
    // 位数，默认是6位
    private final static long w = 1000000;

    private String apiUrl = "https://sms_developer.zhenzikj.com";
    private String appId = "104984";
    private String appSecret = "5829d771-6ca4-4f8e-bb8e-73f451b72a0d";

    public String sendMesg(String phone,String code) throws Exception{
        ZhenziSmsClient client = new ZhenziSmsClient(apiUrl, appId, appSecret);
        Map<String, String> params = new HashMap<String, String>();
        params.put("message", "欢迎您注册Ai佳智能健身系统，本次注册验证码为: "+code+",请在1分钟内完成注册。");
        params.put("number", phone);
        return client.send(params);
    }

    public String randomCode() {
        long r = 0;
        r = (long) ((Math.random() + 1) * w);
        return String.valueOf(r).substring(1);
    }

//    public static void main(String[] args) throws Exception{
//        ZhenziyunService zhenziyunService = new ZhenziyunService();
//        String code = zhenziyunService.randomCode();
//        System.out.println(zhenziyunService.sendMesg("15893939016",code));
//    }

}
