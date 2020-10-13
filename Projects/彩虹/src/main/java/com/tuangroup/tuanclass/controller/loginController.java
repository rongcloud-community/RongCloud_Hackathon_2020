package com.tuangroup.tuanclass.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class loginController {

    @GetMapping
    @RequestMapping("/main")
    public String test(){
        return "index";
    }

    @RequestMapping("/study")
    public String study(String userid, String token){
        return "pages/study";
    }

    @RequestMapping("/news")
    public String news(String userid, String token){
        return "pages/news";
    }

    @RequestMapping("/community")
    public String community(String userid, String token){
        return "pages/community";
    }

    @RequestMapping("/my")
    public String my(String userid, String token){
        return "pages/my";
    }

    @RequestMapping("/course")
    public String course(String userid, String token){
        return "pages/course";
    }

    @RequestMapping("/topic")
    public String topic(String userid, String token){
        return "pages/topic";
    }

    @RequestMapping("/score")
    public String score(String userid, String token){
        return "pages/score";
    }

    @RequestMapping("/chat")
    public String chat(String userid, String token){
        return "pages/chatRoom/room";
    }
}
