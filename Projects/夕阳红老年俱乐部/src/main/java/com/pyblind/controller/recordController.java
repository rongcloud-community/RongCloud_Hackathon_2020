package com.pyblind.controller;

import com.pyblind.entity.Travel;
import com.pyblind.entity.Vital;
import com.pyblind.services.TypeService;
import com.pyblind.services.UserService;
import com.pyblind.services.VitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class recordController {
    @Autowired
    VitalService vitalservice;
    @Autowired
    UserService userService;
    @Autowired
    TypeService typeService;

    @RequestMapping(value="/record")
    public String record(String d , String search , Map<String, Object> map, Long id){

        id = (long)1;
        List typeList = new ArrayList<String>();
        if (id != null) {
            String eid = userService.getEid(id);
            List<Vital> recordlList = vitalservice.getTList(d,search,eid);
            int size = recordlList.size();
            for(int i = 0; i < size ; i++){
                String type = vitalservice.getTpye(recordlList.get(i).getTypeid());
                typeList.add(type);
            }
            map.put("list", recordlList);
            map.put("d",d);
            map.put("search",search);
            map.put("type",typeList);
            map.put("count",recordlList.size());
        }
        System.out.println("d:"+d);
        System.out.println("search"+search);
        return "outfram/record";
    }
}
