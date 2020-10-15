package com.pyblind.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class mapController {
    @RequestMapping(value="/map")
    public String map(){
        return "outfram/map";
    }

}
