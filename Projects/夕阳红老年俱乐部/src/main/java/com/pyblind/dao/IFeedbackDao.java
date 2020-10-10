package com.pyblind.dao;

import com.base.IBaseDao;
import com.pyblind.entity.User;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public interface IFeedbackDao extends IBaseDao<User, Serializable>{
    void insertNew(Long id, String title, String content, String nowtime);
}
