package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.UserFollow;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public interface IUserFollowDao extends IBaseDao<UserFollow, Serializable> {
    List<UserFollow> selectMyFollow(Map<String,Object> map);
    List<UserFollow> selectFollowMe(Map<String,Object> map);
    int countMyFollow(Map<String,Object> map);
    int countFollowMe(Map<String,Object> map);
    int isFollow(String fuserId,String fuseredId);
    void setFollow(Map<String,Object> map);
    void deleteFollow(Map<String,Object> map);
}
