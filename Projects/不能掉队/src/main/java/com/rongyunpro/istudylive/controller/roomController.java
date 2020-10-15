package com.rongyunpro.istudylive.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/chat")
public class roomController {

    @GetMapping
    public String test(){
        return "room";
    }

}
