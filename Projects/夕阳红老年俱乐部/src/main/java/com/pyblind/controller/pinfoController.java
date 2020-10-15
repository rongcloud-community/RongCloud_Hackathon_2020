package com.pyblind.controller;

import com.pyblind.entity.User;
import com.pyblind.services.UserService;
import com.pyblind.utils.ShaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.NoSuchAlgorithmException;
import java.util.Map;

@Controller
public class pinfoController {
    @Autowired
    UserService userService;
    ShaUtils shaUtils;
    @RequestMapping(value="/pinfo")
    public String pinfo(Map<String, Object> map, Long id , String oldPassword , String newPassword1 , String newPassword2) throws NoSuchAlgorithmException {
//        id = (long)1;
        User model = userService.load(id);
        map.put("id",id);
        map.put("n",model);
        map.put("oldPassword",oldPassword);
        map.put("newPassword1",newPassword1);
        map.put("newPassword2",newPassword2);
        if((oldPassword!=null&&oldPassword!="")||(newPassword1!=null&&newPassword1!="")||(newPassword2!=null&&newPassword2!="")){
            String password = userService.getPass(id);
            if(shaUtils.getShaPass(oldPassword).equals(password)){
                if(newPassword1.equals(newPassword2)){
                    newPassword1=shaUtils.getShaPass(newPassword1);
                    userService.setNewPass(newPassword1,id);
                }
            }
        }
        return "infofram/pinfo";
    }
}
