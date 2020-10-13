package com.bookgroup.bookroom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/main")
public class loginController {

    @GetMapping
    public String hello(String userId, String token, String userName){
        Map<String, Object> mapper = new HashMap<>();
        return "main";
    }
}
