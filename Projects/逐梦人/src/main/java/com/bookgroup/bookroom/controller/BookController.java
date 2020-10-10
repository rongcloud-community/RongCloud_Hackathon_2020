package com.bookgroup.bookroom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/book")
public class BookController {

    @RequestMapping("/detail")
    public String bookdetail(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "pages/detail";
    }

    @RequestMapping("/detailbook")
    public String detailbook(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "pages/book";
    }

    @RequestMapping("/content")
    public String content(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "pages/content";
    }

}
