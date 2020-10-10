package com.pyblind.controller;

import com.pyblind.entity.Send;
import com.pyblind.entity.User;
import com.pyblind.services.FocusService;
import com.pyblind.services.SendService;
import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class homepageController {
    @Autowired
    UserService userService;
    @Autowired
    SendService sendService;
    @Autowired
    FocusService focusService;
    @RequestMapping(value="/homepage")
    public String detail(Map<String, Object> map, Long uid , Long id){
//        id = (long)1;
        if(uid == null){
            uid = id;
        }
        System.out.println("homepage"+uid +" "+id);
        if (uid != null) {
            User model = userService.load(uid);
            List<Send> sendList = sendService.getList(uid);
            int focus1 = focusService.count1(uid);
            int focus2 = focusService.count2(uid);
            List<User> userList = new ArrayList<>();
            List userid = focusService.getList2(uid);
            for(int i = 0 ; i < userid.size(); i++){
                userList.add(userService.load((Long) userid.get(i)));
            }
            boolean test = true;
            if(uid==id){
                test = false;
            }
            boolean test2 = true;
            if(focusService.exist(id,uid) > 0){
                test2 = false;
            }
            map.put("id",id);
            map.put("uid",uid);
            map.put("userList",userList);
            map.put("focus1",focus1);
            map.put("focus2",focus2);
            map.put("n", model);
            map.put("sendList",sendList);
            map.put("test",test);
            map.put("test2",test2);

        }

        return "Interaction/homepage";
    }

}