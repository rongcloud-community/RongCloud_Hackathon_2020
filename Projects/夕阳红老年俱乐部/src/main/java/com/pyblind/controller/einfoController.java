package com.pyblind.controller;

import com.pyblind.entity.Equipment;
import com.pyblind.services.EquipentService;
import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@Controller
public class einfoController {
    @Autowired
    EquipentService equipentService;
    @Autowired
    UserService userService;
    @RequestMapping(value="/einfo")
    public String einfo(Map<String, Object> map , Long id){
//        id = (long)1;
        String eid = userService.getEid(id);
        if(eid != null) {
            Equipment e = equipentService.getInfo(eid);

            if (e.getBindingTime() != null) {
                SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date d2 = new Date();
                Date d1 = new Date();
                try {
                    d2 = sdf2.parse(e.getBindingTime());
                    System.out.println("binding" + e.getBindingTime());
                } catch (ParseException ex) {
                    ex.printStackTrace();
                }
                Long time = ((d1.getTime() - d2.getTime()) / 1000 / 60 / 60 / 24);
                map.put("time", time);
            }
            map.put("e",e);
            map.put("count",true);
        }else{
            map.put("count",false);
        }
//        String neweid = null;
//        map.put("neweid",neweid);

        map.put("id",id);
        return "infofram/einfo";
    }


    @RequestMapping(value="/unbinding")
    public void unbinding(Long id){
        userService.unbinding(id);
//        return result;
    }

    @RequestMapping(value="/binding")
    public String binding(Map<String, Object> map, Long id,String eid){
        System.out.println("binding ing");

        if(eid != null){
            userService.binding(id,eid);
        }
        map.put("eid",eid);
        map.put("id",id);
        System.out.println("neweid"+eid);
        System.out.println("newid"+id);

        return "infofram/binding";
    }

    @RequestMapping(value="/doBinding")
    public void doBinding(Map<String, Object> map, Long id,String eid){
//        System.out.println("binding ing");

        if(eid != null){
            userService.binding(id,eid);
        }
        map.put("eid",eid);
        map.put("id",id);
        System.out.println("neweid"+eid);
        System.out.println("newid"+id);

//        return "infofram/binding";
    }

}
