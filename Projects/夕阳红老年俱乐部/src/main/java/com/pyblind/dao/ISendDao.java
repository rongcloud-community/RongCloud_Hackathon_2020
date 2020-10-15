package com.pyblind.dao;

import com.base.IBaseDao;
import com.pyblind.entity.Send;
import com.pyblind.entity.User;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface ISendDao extends IBaseDao<Send, Serializable> {
    List<Send> SelAll();
    List<Send> getList(long id);
    List<Send> getSearch(String search);
    Send getSend(long sendid);
    void insertNew(Long id, String title, String content, String nowtime);

}
