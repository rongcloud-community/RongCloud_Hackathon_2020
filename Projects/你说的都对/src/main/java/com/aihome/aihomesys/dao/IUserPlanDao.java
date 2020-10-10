package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.ActionInfo;
import com.aihome.aihomesys.vo.UserPlan;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public interface IUserPlanDao extends IBaseDao<UserPlan, Serializable> {
    void infoinsert(Map<String,Object> map);
    int countById(Map<String,Object> map);
    List<UserPlan> selectTodayTask(Map<String,Object> map);
    List<UserPlan> selectMyTask(Map<String,Object> map);
    int countTodayIsCom(Map<String,Object> map);
    void updateOneClass(Map<String,Object> map);
    void updateIsCom(Map<String,Object> map);
    UserPlan selectByClassIdAndUserId(Map<String,Object>map);
    void updateFatB(Map<String,Object>map);
    int countMyClassNum(String userId);
}
