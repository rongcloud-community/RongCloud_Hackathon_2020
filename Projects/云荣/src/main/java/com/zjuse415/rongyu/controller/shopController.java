package com.zjuse415.rongyu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/shop")
public class shopController {

    @RequestMapping("/index")
    public String shopindex(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "shangcheng/index";
    }

    @RequestMapping("/selectcity")
    public String selectcity(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "shangcheng/city-select";
    }

    @RequestMapping("/dianqi")
    public String dianqi(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "shangcheng/dianqi";
    }

    @RequestMapping("/goods-detail")
    public String goodsdetail(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "shangcheng/goods-detail";
    }

    @RequestMapping("/search-goods")
    public String search(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "shangcheng/search-goods";
    }

    @RequestMapping("/shengxian")
    public String shengxian(String userId, String token){
        Map<String, Object> mapper = new HashMap<>();
        return "shangcheng/shengxian";
    }

}
