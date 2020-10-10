package com.pyblind.controller;

import com.pyblind.entity.User;
import com.pyblind.services.FeedbackService;
import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class aboutController {
    @Autowired
    FeedbackService feedbackService;
    @Autowired
    UserService userService;

    @RequestMapping(value="/feedback")
    public String feedback(Map<String, Object> map, Long id , String title , String content){
        User model = userService.load(id);
        map.put("n", model);
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        String nowtime = formatter.format(date);
        if(title != null && title != "" && content!=null && content!=""){
            feedbackService.insertNew(id,title,content,nowtime);
        }
        map.put("id",id);
        map.put("title",title);
        map.put("content",content);
        return "about/feedback";

    }

    @RequestMapping(value="/introduction")
    public String introduction(){
        return "about/introduction";
    }

}