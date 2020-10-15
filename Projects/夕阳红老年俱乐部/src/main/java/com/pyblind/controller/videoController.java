package com.pyblind.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class videoController {
    @RequestMapping(value="/video")
    public String video(){
        return "outfram/video";
    }
}
