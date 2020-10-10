package com.pyblind.services;

import com.pyblind.dao.ISendDao;
import com.pyblind.entity.Send;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SendService {
    @Autowired
    ISendDao iSendDao;
    public List<Send> getall(){
        return this.iSendDao.SelAll();
    }
    public List<Send> getSearch(String search){
        return this.iSendDao.getSearch(search);
    }

    public List<Send> getList(Long id){
        return this.iSendDao.getList(id);
    };
    public Send getSend(Long sendid){
        return this.iSendDao.getSend(sendid);
    };
    public void insertNew( Long id, String title, String content, String nowtime){
        this.iSendDao.insertNew(id,title,content,nowtime);
    };
}
