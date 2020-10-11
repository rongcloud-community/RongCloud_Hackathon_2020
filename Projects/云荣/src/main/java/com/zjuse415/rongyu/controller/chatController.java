package com.zjuse415.rongyu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/chat")
public class chatController {

    @RequestMapping("/chatroom")
    public String chatroom(String userId, String token, String userName, String chatId){
        Map<String, Object> mapper = new HashMap<>();
        return "main/chatroom";
    }
}
