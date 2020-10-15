package com.pyblind.dao;

import com.base.IBaseDao;
import com.pyblind.entity.Comment;
import com.pyblind.entity.User;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface ICommentDao extends IBaseDao<User, Serializable> {
    List<Comment> getList(long sendid);
    void insertNew(Long id, Long sendid, String comment, String nowtime);
}
