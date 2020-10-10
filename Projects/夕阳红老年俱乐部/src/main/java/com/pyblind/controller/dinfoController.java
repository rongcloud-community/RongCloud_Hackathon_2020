package com.pyblind.controller;

import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Controller
public class dinfoController {
    @Autowired
    UserService userService;
    @RequestMapping(value="/dinfo")
    public String dinfo(Map<String, Object> map, Long id ,String name , String tel , String qq , String wechat , String describe , String head){
        System.out.println("goin deinfo");

//        id = (long)1;
        head=userService.getHead(id);
        map.put("id", id);

        map.put("name", name);
        map.put("tel", tel);
        map.put("qq", qq);
        map.put("wechat", wechat);
        map.put("describe", describe);
        map.put("head", head);
        if((name!=null&&name!="")||(name!=null&&name!="")||(tel!=null&&tel!="")||(qq!=null&&qq!="")||(wechat!=null&&wechat!="")||(describe!=null&&describe!="")) {
            userService.updateInfo(id,name,tel,qq,wechat,describe,head);
        }
        return "infofram/dinfo";
    }

    @RequestMapping(value = "/upload", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public Object uploadAction(@RequestParam("file") MultipartFile file, Long id) {
//        id=(long)1;
        Map<String, Object> mapper = new HashMap<>();
        MultipartFile img = file;
        if(img.isEmpty()){
            mapper.put("code", "1");
            mapper.put("msg", "服务器出错");
        }else{
            String fileName = file.getOriginalFilename();
            File dest = new File(new File("E:\\pyblind\\src\\main\\resources\\static\\view\\image\\").getAbsolutePath()+ "/" + fileName);
            userService.setNewHead(id,fileName);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            try {
                file.transferTo(dest); // 保存文件
                mapper.put("code", "0");
                mapper.put("msg", "上传成功");
            } catch (Exception e) {
                e.printStackTrace();
                mapper.put("code", "1");
                mapper.put("msg", "服务器出错");
            }
        }
        return mapper;
    }

}