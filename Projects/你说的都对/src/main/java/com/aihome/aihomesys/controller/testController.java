package com.aihome.aihomesys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/test")
public class testController {
    @GetMapping
    public String  circle(){
        return "comm/test/video";
    }
}
