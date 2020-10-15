package com.pyblind.controller;

import com.pyblind.entity.Travel;
import com.pyblind.entity.User;
import com.pyblind.services.TravelService;
import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.List;
import java.util.Map;


@Controller
public class travelController {
    @Autowired
    TravelService travelService;
    @Autowired
    UserService userService;
    @RequestMapping(value="/travel")
    public String travel(String d , String search , Map<String, Object> map, Long id){
        System.out.println("请求页面");

        id = (long)1;

        if (id != null) {
            String eid = userService.getEid(id);
            List<Travel> travelList = travelService.getTList(d,search,eid);
            map.put("list", travelList);
            map.put("d",d);
            map.put("search",search);
        }
        System.out.println("d:"+d);
        System.out.println("search"+search);

        return "outfram/travel";
    }
}
