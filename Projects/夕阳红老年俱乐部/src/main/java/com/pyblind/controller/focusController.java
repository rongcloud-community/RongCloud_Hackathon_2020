package com.pyblind.controller;

import com.pyblind.entity.Focus;
import com.pyblind.entity.User;
import com.pyblind.services.FocusService;
import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class focusController {
    @Autowired
    UserService userService;
    @Autowired
    FocusService focusService;
    @RequestMapping(value="/focus")
    public String display(Map<String, Object> map,Long id,int type,Long uid){
        if(uid != null){
            List<User> userList = new ArrayList<>();
            if(type == 0){//关注
                List userid = focusService.getList2(uid);
                for(int i = 0 ; i < userid.size(); i++){
                    userList.add(userService.load((Long) userid.get(i)));
                }
            }
            if(type == 1){//粉丝
                List userid = focusService.getList1(uid);
                for(int i = 0 ; i < userid.size(); i++){
                    userList.add(userService.load((Long) userid.get(i)));
                }
            }
            System.out.println("type"+type);
            boolean t = true;
            if(type == 1){
                t=false;
            }else{
                if(uid != id){
                    t = false;
                }
            }
            map.put("id",id);
            map.put("t",t);
            map.put("userList", userList);

        }
        return "Interaction/focus";
    }

    @RequestMapping(value="/delete")
    @ResponseBody
    public Object delete(@RequestBody Map<String, Object> map){
        Map<String,Object> mapper = new HashMap<>();

        Long id = Long.parseLong(map.get("id").toString());
        Long fid = Long.parseLong(map.get("fid").toString());
        System.out.println(id +" "+fid);

        if(id != null && fid != null){

            focusService.delete(id,fid);
            mapper.put("code",0);
            mapper.put("msg","已取消关注");
        }
        return mapper;

    }
    @RequestMapping(value="/addFocus")
    @ResponseBody
    public Object addFocus(@RequestBody Map<String, Object> map){
        System.out.println("添加关注");

        Map<String,Object> mapper = new HashMap<>();
        Long id = Long.parseLong(map.get("id").toString());
        Long fid = Long.parseLong(map.get("fid").toString());
        if(id != null && fid != null){
            focusService.newFocus(id,fid);
            mapper.put("code",0);
            mapper.put("msg","已添加关注");
        }
        return mapper;
    }


}
