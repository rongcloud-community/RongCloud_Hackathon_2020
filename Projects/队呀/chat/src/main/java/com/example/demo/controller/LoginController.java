package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    @RequestMapping("")
    public String login_default(){
        return "login2";
    }

    @RequestMapping("login")
    public String login(){
        return "login2";
    }

    @RequestMapping("chat0")
    public String chat(){
        return "chat1";
    }

    @RequestMapping("chat1")
    public String chat2(){
        return "chat2";
    }

}
