package com.pyblind.controller;

import com.pyblind.entity.User;
import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/test")
public class hello {

    @Autowired
    UserService userService;

    @GetMapping
    public List<User> getAll(){
        return this.userService.getall();
    }

    @RequestMapping(value="/test")
    public String map(){
        return "test";
    }


}
