package com.rongyunpro.istudylive.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/class_detail")
public class ClassDetailController {

    @GetMapping
    public String test(){
        return "class_detail";
    }

}
