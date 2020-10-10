package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.UserEnroll;
import com.aihome.aihomesys.vo.UserInfo;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Map;

@Repository
public interface IUserInfoDao extends IBaseDao<UserInfo, Serializable> {
    int skipinsert(Map<String,Object> map);
    int infoinsert(Map<String,Object> map);
    int countById(Map<String, Object> mapper);
    void skipUpdate(Map<String, Object> mapper);
    void infoUpdate(Map<String, Object> mapper);
    int todayIsTrain(Map<String, Object> mapper);
    void trainUpdate(Map<String, Object> mapper);
}
