package com.pyblind.controller;

import com.pyblind.entity.Comment;
import com.pyblind.entity.Send;
import com.pyblind.entity.User;
import com.pyblind.services.CommentService;
import com.pyblind.services.FocusService;
import com.pyblind.services.SendService;
import com.pyblind.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class detailController {
    @Autowired
    UserService userService;
    @Autowired
    SendService sendService;
    @Autowired
    CommentService commentService;
    @Autowired
    FocusService focusService;

    @RequestMapping(value="/detail")
    public String ddetail(Map<String, Object> map, Long id ,Long sendid, String content){
//        id=(long)1;
        User model = userService.load(id);
        map.put("n", model);
        map.put("id",id);
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        String nowtime = formatter.format(date);

        if(content!=null&&content!=""){
            commentService.insertNew(id,sendid,content,nowtime);
        }
        map.put("sendid",sendid);
        int focus1 = focusService.count1(id);
        int focus2 = focusService.count2(id);
        List<Send> sendList = sendService.getList(id);

        map.put("focus1",focus1);
        map.put("focus2",focus2);
        map.put("sendList",sendList);

        if(sendid!=null){
            Send s = sendService.getSend( sendid);
            String name = userService.getName(s.getId());
            User author = userService.load(s.getId());
            map.put("s",s);
            map.put("author",author);
            map.put("content",content);

            List<Comment> commentList = commentService.getList(sendid);
            map.put("commentList",commentList);
            List headList = new ArrayList<String>();
            for(int i = 0 ; i < commentList.size() ; i++){
                String head=userService.getHead(commentList.get(i).getId());
                headList.add(head);
            }
            map.put("headList",headList);
        }

        return "Interaction/detail";
    }



}