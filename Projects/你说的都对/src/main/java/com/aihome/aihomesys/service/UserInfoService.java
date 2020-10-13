package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IUserInfoDao;
import com.aihome.aihomesys.vo.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserInfoService {
    @Autowired
    IUserInfoDao iUserInfoDao;

    public int skipinsert(Map<String,Object> map){
        return this.iUserInfoDao.skipinsert(map);
    }

    public int infoinsert(Map<String,Object> map){
        return this.iUserInfoDao.infoinsert(map);
    }

    public int counById(Map<String,Object> map){
        return this.iUserInfoDao.countById(map);
    }

    public void skipUpdate(Map<String,Object> map){
        this.iUserInfoDao.skipUpdate(map);
    }

    public void infoUpdate(Map<String,Object> map){
        this.iUserInfoDao.infoUpdate(map);
    }

    public UserInfo findById(String userId){return this.iUserInfoDao.findById(userId);}

    public int todayIsTrain(Map<String, Object> mapper){
        return this.iUserInfoDao.todayIsTrain(mapper);
    };

    public void trainUpdate(Map<String, Object> mapper){
        this.iUserInfoDao.trainUpdate(mapper);
    };
}
