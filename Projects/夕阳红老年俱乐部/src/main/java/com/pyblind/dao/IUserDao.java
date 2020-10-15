package com.pyblind.dao;

import com.base.IBaseDao;
import com.pyblind.entity.User;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface IUserDao extends IBaseDao<User, Serializable> {

   List<User> SelAll();
   User loadId(long id);
   String getEid(long id);
   void unbinding(long id);
   void binding(long id,String eid);
   void updateInfo(long id,String name,String tel,String qq,String wechat,String describe,String head);
   String getPass(long id);
   void setNewPass(String newPassword,long id);
   String getName(long id);
   void setNewHead(long id , String newHead);
   String getHead(long id);
   int ifExist(String name);
   String getPassword(String name);
   Long getId(String name);
   void createNew(String name,String password,String head);


}
