package com.bookgroup.bookroom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/chat")
public class RoomController {

    @RequestMapping("/chatroom")
    public String chatroom(String userId, String token, String userName, String chatId){
        Map<String, Object> mapper = new HashMap<>();
        return "pages/room";
    }
}
