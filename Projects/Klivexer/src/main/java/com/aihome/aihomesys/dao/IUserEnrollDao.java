package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.UserEnroll;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public interface IUserEnrollDao extends IBaseDao<UserEnroll, Serializable> {
    List<UserEnroll> getAllitems();
    int countById(Map<String, Object> mapper);
    void loginTimeUpdate(Map<String,Object> mapper);
    String loginCheck(Map<String,Object> mapper);
    void passUpdate(Map<String,Object> mapper);
    int enableInfoco(Map<String, Object> mapper);
    void eableUpdate(Map<String,Object> mapper);
    void userAvaUpdate(String userId,String userAva);
    void userNameUpdate(Map<String,Object> map);
}
