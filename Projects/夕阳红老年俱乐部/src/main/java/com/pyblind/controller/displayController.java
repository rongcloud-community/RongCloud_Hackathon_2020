package com.pyblind.controller;

import com.pyblind.entity.Send;
import com.pyblind.entity.User;
import com.pyblind.services.FocusService;
import com.pyblind.services.SendService;
import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class displayController {
    @Autowired
    UserService userService;
    @Autowired
    SendService sendService;
    @Autowired
    FocusService focusService;
    @RequestMapping(value="/display")
    public String display(Map<String, Object> map, Long id , String title , String content , String search){
//        id = (long)1;
        User model = userService.load(id);
        map.put("n", model);
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        String nowtime = formatter.format(date);
        if(title != null && title != "" && content!=null && content!=""){
            sendService.insertNew(id,title,content,nowtime);
        }
        List<Send> sendList = new ArrayList<>();

        if(search!=null&&search!=""){
            sendList = sendService.getSearch(search);
        }else{
            sendList = sendService.getall();
        }
        int focus1 = focusService.count1(id);
        int focus2 = focusService.count2(id);

        List<User> userList1 = new ArrayList<>();
        List userid = focusService.getList2(id);
        for(int i = 0 ; i < userid.size(); i++){
            userList1.add(userService.load((Long) userid.get(i)));
        }
        List<User> userList2 = new ArrayList<>();
        userid = focusService.getList1(id);
        for(int i = 0 ; i < userid.size(); i++){
            userList2.add(userService.load((Long) userid.get(i)));
        }
        List<String> contentList = new ArrayList<>();

        for(int i = 0 ; i < sendList.size(); i++){
            if(sendList.get(i).getContent().length() > 40){
                contentList.add(sendList.get(i).getContent().substring(0,39)+"……");
            }
            else{
                contentList.add(sendList.get(i).getContent());
            }
        }
        map.put("id",id);
        map.put("search",search);
        map.put("userList1",userList1);
        map.put("userList2",userList2);
        map.put("title",title);
        map.put("content",content);
        map.put("focus1",focus1);
        map.put("focus2",focus2);
        map.put("sendList",sendList);
        map.put("contentList",contentList);

        return "Interaction/display";
    }

}