package com.pyblind.controller;

import com.pyblind.entity.User;
import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Controller
public class mainController {
    @Autowired
    UserService userService;

    @RequestMapping(value="/main")
    public String mainpage(Map<String, Object> map,Long id){
        map.put("id",id);
        User user = userService.load(id);
        map.put("user",user);
        return "welcome";
    }

}