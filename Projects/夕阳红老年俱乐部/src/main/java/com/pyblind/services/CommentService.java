package com.pyblind.services;

import com.pyblind.dao.ICommentDao;
import com.pyblind.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    ICommentDao iCommentDao;
    public List<Comment> getList(Long sendid){
        return this.iCommentDao.getList(sendid);
    };

    public void insertNew( Long id, Long sendid, String comment, String nowtime){
        this.iCommentDao.insertNew(id,sendid,comment,nowtime);
    };
}
