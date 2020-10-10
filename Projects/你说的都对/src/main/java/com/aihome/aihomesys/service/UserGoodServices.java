package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IUserFollowDao;
import com.aihome.aihomesys.dao.IUserGoodDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserGoodServices {
    @Autowired
    IUserGoodDao iUserGoodDao;

    public int isGood(Map<String,Object> map){
        return this.iUserGoodDao.isGood(map);
    }

    public void insertGood(Map<String,Object> map){
        this.iUserGoodDao.insertGood(map);
    }

    public void  deleteGood(Map<String,Object> map){
        this.iUserGoodDao.deleteGood(map);
    }
}
