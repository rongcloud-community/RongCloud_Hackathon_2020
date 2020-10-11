package com.rongyunpro.istudylive.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class loginController {

    @GetMapping
    public String login(){
        System.out.println("login success");
        return "index";
    }

    @RequestMapping("/list")
    public String dochange(String userid, String token){
        return "pages/list";
    }

    @RequestMapping("/choice")
    public String choice(String userid, String token){
        return "pages/choice";
    }
}
