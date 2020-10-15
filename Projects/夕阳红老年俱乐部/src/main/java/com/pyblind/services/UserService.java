package com.pyblind.services;

import com.pyblind.dao.IUserDao;
import com.pyblind.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    IUserDao iUserDao;

    public List<User> getall(){
        return this.iUserDao.SelAll();
    }
    public User load(long id){
        return this.iUserDao.loadId(id);
    }
    public String getEid(Long id){return this.iUserDao.getEid(id);}
    public void unbinding(Long id){this.iUserDao.unbinding(id);}
    public void binding(Long id,String eid){this.iUserDao.binding(id,eid);}
    public void updateInfo(Long id,String name,String tel,String qq,String wechat,String describe,String head){this.iUserDao.updateInfo(id,name,tel,qq,wechat,describe,head);}
    public String getPass(Long id){ return this.iUserDao.getPass(id);}
    public void setNewPass(String newPassword,long id){this.iUserDao.setNewPass(newPassword,id);}
    public String getName(Long id){return this.iUserDao.getName(id);}
    public void setNewHead(long id,String newHead){this.iUserDao.setNewHead(id,newHead);}
    public String getHead(Long id){return this.iUserDao.getHead(id);}
    public int ifExist(String name){return this.iUserDao.ifExist(name);}
    public String getPassword(String name){return this.iUserDao.getPassword(name);}
    public Long getId(String name){return this.iUserDao.getId(name);}
    public void createNew(String name,String password,String head){this.iUserDao.createNew(name,password,head);}






}
