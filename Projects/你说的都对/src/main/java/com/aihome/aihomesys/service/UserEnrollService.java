package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IUserEnrollDao;
import com.aihome.aihomesys.vo.UserEnroll;
import org.apache.catalina.User;
import org.apache.tomcat.util.buf.UEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserEnrollService {

    @Autowired
    IUserEnrollDao userEnrollDao;

    public List<UserEnroll> selectAll(){
        List<UserEnroll> list = this.userEnrollDao.getAllitems();
        return list;
    }

    public int userEnroll(UserEnroll userEnroll){
        return this.userEnrollDao.insert(userEnroll);
    }

    public int countById(Map<String,Object> map){
        return this.userEnrollDao.countById(map);
    }

    public String loginCheck(Map<String,Object> map){
        return this.userEnrollDao.loginCheck(map);
    }

    public void loginTimeUpdate(Map<String,Object> map){
        this.userEnrollDao.loginTimeUpdate(map);
    }

    public void passUpdate(Map<String,Object> map){
        this.userEnrollDao.passUpdate(map);
    }

    public void eableUpdate(Map<String,Object> map){ this.userEnrollDao.eableUpdate(map); }

    public int getIsFirstLogin(Map<String,Object> map){return this.userEnrollDao.enableInfoco(map);}

    public UserEnroll findById(String userId){return this.userEnrollDao.findById(userId);}

    public void userAvaUpdate(String userId,String userAva){
        this.userEnrollDao.userAvaUpdate(userId,userAva);
    }

    public void userNameUpdate(Map<String,Object> mapper){
        this.userEnrollDao.userNameUpdate(mapper);
    }

}
