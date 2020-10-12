package com.rongyunpro.istudylive.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/reg")
public class regController {

    @GetMapping
    public String test(){
        return "reg";
    }

}
