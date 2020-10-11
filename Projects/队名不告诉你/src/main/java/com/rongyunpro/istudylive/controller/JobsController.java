package com.rongyunpro.istudylive.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/jobs")
public class JobsController {

    @GetMapping
    public String test(){
        return "jobs";
    }

}
