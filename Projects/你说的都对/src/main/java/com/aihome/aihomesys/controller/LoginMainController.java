package com.aihome.aihomesys.controller;

import com.aihome.aihomesys.service.HotelInfoServices;
import com.aihome.aihomesys.service.UserEnrollService;
import com.aihome.aihomesys.vo.UserEnroll;
import com.aihome.component.ZhenziyunService;
import com.aihome.utils.ConstantUtils;
import com.aihome.utils.DateUtils;
import com.aihome.utils.ShaUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/main")
public class LoginMainController {

    @Autowired
    UserEnrollService userEnrollService = new UserEnrollService();
    @Autowired
    HotelInfoServices hotelInfoServices = new HotelInfoServices();

    Logger logger = LoggerFactory.getLogger(getClass());
    ZhenziyunService zhenziyunService = new ZhenziyunService();

    @GetMapping
    public String welcome() {
        return "main";
    }

    @RequestMapping("/signOut")
    public String signout(HttpServletRequest request) {
        //移除session
        request.getSession().removeAttribute(ConstantUtils.USER_SESSION_KEY);
        return "main";
    }

    @RequestMapping("/getCode")
    @ResponseBody
    public Object getCode(@RequestBody Map<String,String> result) {
        Map<String, Object> mapper = new HashMap<>();
        if(!result.get("phonefram").isEmpty()){
            //先验证是否重复注册
            int isIn = 0;
            try {
                Map<String, Object> qur = new HashMap<>();
                qur.put("userId",result.get("phonefram"));
                isIn = userEnrollService.countById(qur);
                if(isIn == 0){
                    //发送验证码
                    String code = zhenziyunService.randomCode();
                    try {
                        zhenziyunService.sendMesg(result.get("phonefram"),code);
                        mapper.put("code","0");
                        mapper.put("pcode",code);
                        mapper.put("msg","验证码已发送");
                    } catch (Exception e) {
                        e.printStackTrace();
                        mapper.put("code","1");
                        mapper.put("msg","服务器出错");
                    }
                }else {
                    mapper.put("code","1");
                    mapper.put("msg","手机号已被注册");
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错");
            }
        }else{
            mapper.put("code","1");
            mapper.put("msg","服务器出错");
        }
        return mapper;
    }

    @RequestMapping("/getCode_refind")
    @ResponseBody
    public Object getCode_refind(@RequestBody Map<String,String> result){
        Map<String, Object> mapper = new HashMap<>();
        if(!result.get("phonefram").isEmpty()){
            //先验证是否存在
            int isIn = 0;
            try {
                Map<String, Object> qur = new HashMap<>();
                qur.put("userId",result.get("phonefram"));
                isIn = userEnrollService.countById(qur);
                if(isIn == 1){
                    String code = zhenziyunService.randomCode();
                    try {
                        zhenziyunService.sendMesg(result.get("phonefram"),code);
                        mapper.put("code","0");
                        mapper.put("pcode",code);
                        mapper.put("msg","验证码已发送");
                    } catch (Exception e) {
                        e.printStackTrace();
                        mapper.put("code","1");
                        mapper.put("msg","服务器出错");
                    }
                }else {
                    mapper.put("code","1");
                    mapper.put("msg","账号未被注册，请先注册");
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错");
            }
        }else{
            mapper.put("code","1");
            mapper.put("msg","未获取手机号");
        }
        return mapper;
    }

    @RequestMapping("/userEnroll")
    @ResponseBody
    public Object userEnroll(@RequestBody Map<String,String> result,HttpServletRequest request) {
        Map<String, Object> mapper = new HashMap<>();
        if(!result.isEmpty()){
            try {
                UserEnroll userEnroll = new UserEnroll();
                {
                    userEnroll.setUserId(result.get("phonefram"));
                    userEnroll.setPassword(result.get("userpass"));
                    userEnroll.setUserName(result.get("username"));
                    userEnroll.setUserType(0);
                    String curtime = DateUtils.getCurTime();
                    userEnroll.setEnrollTime(curtime);
                    userEnroll.setLoginTime(curtime);
                }
                userEnrollService.userEnroll(userEnroll);
                //存储session
                request.getSession().setAttribute(ConstantUtils.USER_SESSION_KEY,result.get("phonefram"));
                mapper.put("code","0");
                mapper.put("msg","注册成功");
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器异常");
            }
        }else{
            mapper.put("code","1");
            mapper.put("msg","有异常数值");
        }
        return mapper;
    }

    @RequestMapping("/userLogin")
    @ResponseBody
    public Object userLogin(@RequestBody Map<String,Object> result,HttpServletRequest request) {
        Map<String, Object> mapper = new HashMap<>();
        if(result.isEmpty()){
            mapper.put("code","1");
            mapper.put("msg","有异常数值");
        }else{
            try {
                //查询是否存在账户
                if(userEnrollService.countById(result)==0){
                    mapper.put("code","1");
                    mapper.put("msg","账号不存在");
                }else{
                    String realpass = userEnrollService.loginCheck(result);
                    if(realpass.equals(result.get("passWord"))){
                        //修改登录时间
                        Map<String, Object> time = new HashMap<>();{
                            time.put("userId",result.get("userId"));
                            time.put("loginTime",DateUtils.getCurTime());
                        }
                        userEnrollService.loginTimeUpdate(time);
                        //存储session
                        request.getSession().setAttribute(ConstantUtils.USER_SESSION_KEY,time.get("userId"));
                        mapper.put("code","0");
                        mapper.put("msg","登录成功");

                    }else{
                        mapper.put("code","1");
                        mapper.put("msg","账号密码错误");
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错");
            }
        }
        return mapper;
    }

    @RequestMapping("/loginAdmin")
    @ResponseBody
    public Object loginAdmin(@RequestBody Map<String,Object> result,HttpServletRequest request) {
        Map<String, Object> mapper = new HashMap<>();
        Map<String, Object> mapperr = new HashMap<>();
        if(result.isEmpty()){
            mapperr.put("code","1");
            mapperr.put("msg","有异常数值");
        }else{
            try {
                //查询是否存在
                mapper.put("userId",result.get("adminId").toString());
                mapper.put("passWord",result.get("adminPass").toString());
                //查询是否存在账户
                if(userEnrollService.countById(mapper)==0){
                    mapperr.put("code","1");
                    mapperr.put("msg","账号不存在");
                }else{
                    String realpass = userEnrollService.loginCheck(mapper);
                    if(realpass.equals(mapper.get("passWord"))){
                        //修改登录时间
                        Map<String, Object> time = new HashMap<>();{
                            time.put("userId",mapper.get("userId"));
                            time.put("loginTime",DateUtils.getCurTime());
                        }
                        userEnrollService.loginTimeUpdate(time);
                        //存储session
                        request.getSession().setAttribute(ConstantUtils.USER_SESSION_KEY,time.get("userId"));
                        mapperr.put("code","0");
                        mapperr.put("msg","登录成功");

                    }else{
                        mapperr.put("code","1");
                        mapperr.put("msg","账号密码错误");
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapperr.put("code","1");
                mapperr.put("msg","服务器出错");
            }
        }
        return mapperr;
    }

    @RequestMapping("/adminEnroll")
    @ResponseBody
    public Object adminEnroll(@RequestBody Map<String,Object> result,HttpServletRequest request) {
        Map<String, Object> mapper = new HashMap<>();
        Map<String, Object> mapperr = new HashMap<>();
        if(!result.isEmpty()){
            try {
                mapper.put("userId",result.get("userid").toString());
                int userIs = this.userEnrollService.countById(mapper);
                if(userIs==0){
                    //判断酒店绑定码是否正确
                    int isIn = this.hotelInfoServices.isIn(Long.valueOf(result.get("hotelid").toString()));
                    if(isIn == 1){
                        UserEnroll userEnroll = new UserEnroll();
                        {
                            userEnroll.setUserId(result.get("userid").toString());
                            userEnroll.setPassword(result.get("password").toString());
                            String username = "admin_"+result.get("userid").toString();
                            userEnroll.setUserName(username);
                            userEnroll.setHotelId(Integer.valueOf(result.get("hotelid").toString()));
                            userEnroll.setUserType(1);
                            String curtime = DateUtils.getCurTime();
                            userEnroll.setEnrollTime(curtime);
                            userEnroll.setLoginTime(curtime);
                        }
                        userEnrollService.userEnroll(userEnroll);
                        //存储session
                        request.getSession().setAttribute(ConstantUtils.USER_SESSION_KEY,result.get("userid"));
                        mapperr.put("code","0");
                        mapperr.put("msg","注册成功");
                    }else {
                        mapperr.put("code","1");
                        mapperr.put("msg","酒店不存在");
                    }
                }else {
                    mapperr.put("code","1");
                    mapperr.put("msg","用户名已存在");
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapperr.put("code","1");
                mapperr.put("msg","服务器异常");
            }
        }else{
            mapperr.put("code","1");
            mapperr.put("msg","有异常数值");
        }
        return mapperr;
    }

    @RequestMapping("/userRefind")
    @ResponseBody
    public Object userRefind(@RequestBody Map<String,Object> result,HttpServletRequest request) {
        Map<String, Object> mapper = new HashMap<>();
        if(result.isEmpty()){
            mapper.put("code","1");
            mapper.put("msg","有异常数值");
        }else{
            try {
                //查询是否存在账户
                if(userEnrollService.countById(result)==0){
                    mapper.put("code","1");
                    mapper.put("msg","账号不存在");
                }else{
                    userEnrollService.passUpdate(result);
                    request.getSession().setAttribute(ConstantUtils.USER_SESSION_KEY,result.get("userId"));
                    mapper.put("code","0");
                    mapper.put("msg","密码已重置");
                }
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错");
            }
        }
        return mapper;
    }

    @RequestMapping(value = "/index-regs")
    public String reg() { return "register/regfram"; }
    @RequestMapping(value = "/index-find")
    public String findPass(){ return "register/refindfram"; }

    @RequestMapping(value = "/login-success")
    public String sucsNavto(String userId,HttpServletRequest request){
        Map<String, Object> mapper = new HashMap<>();
        if(userId!=""&&userId!=null&&request.getSession().getAttribute(ConstantUtils.USER_SESSION_KEY)!=null){
            mapper.put("userId",userId);
            try {
                int isfirst = this.userEnrollService.getIsFirstLogin(mapper);
                if(isfirst==0){
                    return "comm/getinfo/info-user";
                }else {
                    return "tabs/tabfram";
                }
            } catch (Exception e) {
                return "error/error";
            }
        }
        return "main";
    }

    @RequestMapping(value = "/admin-frame")
    public String adminframe(String adminId,HttpServletRequest request){
        Map<String, Object> mapper = new HashMap<>();
        if(adminId!=""&&adminId!=null&&request.getSession().getAttribute(ConstantUtils.USER_SESSION_KEY)!=null){
            mapper.put("userId",adminId);
            try {
                return "tabs/adminfram";
            } catch (Exception e) {
                return "error/error";
            }
        }
        return "main";
    }

    @RequestMapping("/getUserInfo")
    @ResponseBody
    public Object getUserInfo(@RequestBody Map<String,Object> result) {
        Map<String, Object> mapper = new HashMap<>();
        if(result.isEmpty()){
            mapper.put("code","1");
            mapper.put("msg","有异常数值");
        }else{
            try {
                UserEnroll userEnroll = this.userEnrollService.findById(result.get("userId").toString());
                mapper.put("code","0");
                mapper.put("userEnroll",userEnroll);
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code","1");
                mapper.put("msg","服务器出错");
            }
        }
        return mapper;
    }
}
