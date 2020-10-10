package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IUserInfoDao;
import com.aihome.aihomesys.dao.IUserPlanDao;
import com.aihome.aihomesys.vo.UserInfo;
import com.aihome.aihomesys.vo.UserPlan;
import com.fasterxml.jackson.databind.util.ObjectBuffer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserPlanService {
    @Autowired
    IUserPlanDao iUserPlanDao;

    public void infoinsert(Map<String,Object> map){
        this.iUserPlanDao.infoinsert(map);
    }

    public int countById(Map<String,Object> map){
        return this.iUserPlanDao.countById(map);
    }

    public int countMyClassNum(String userId){
        return this.iUserPlanDao.countMyClassNum(userId);
    }

    public List<UserPlan> selectTodayTask(Map<String, Object> map){
        return this.iUserPlanDao.selectTodayTask(map);
    }

    public List<UserPlan> selectMyTask(Map<String,Object> map){
        return this.iUserPlanDao.selectMyTask(map);
    }

    public int countTodayIsCom(Map<String,Object> map){
        return this.iUserPlanDao.countTodayIsCom(map);
    };
    public void updateOneClass(Map<String,Object> map){
        this.iUserPlanDao.updateOneClass(map);
    };
    public void updateIsCom(Map<String,Object> map){
        this.iUserPlanDao.updateIsCom(map);
    };

    public UserPlan selectByClassIdAndUserId(Map<String,Object>map){
        return this.iUserPlanDao.selectByClassIdAndUserId(map);
    };

    public void updateFatB(Map<String,Object>map){
        this.iUserPlanDao.updateFatB(map);
    };
}
