package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.ICircleContentDao;
import com.aihome.aihomesys.dao.IUserFollowDao;
import com.aihome.aihomesys.vo.UserFollow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserFollowServices {
    @Autowired
    IUserFollowDao iUserFollowDao;

    public List<UserFollow> selectMyFollow(String userId){
        Map<String,Object> map = new HashMap<>();
        map.put("fuserId",userId);
        return this.iUserFollowDao.selectMyFollow(map);
    }

    public List<UserFollow> selectFollowMe(String userId){
        Map<String,Object> map = new HashMap<>();
        map.put("fuseredId",userId);
        return this.iUserFollowDao.selectFollowMe(map);
    }

    public int countMyFollow(String userId){
        Map<String,Object> map = new HashMap<>();
        map.put("fuserId",userId);
        return this.iUserFollowDao.countMyFollow(map);
    }

    public int countFollowMe(String userId){
        Map<String,Object> map = new HashMap<>();
        map.put("fuseredId",userId);
        return this.iUserFollowDao.countFollowMe(map);
    }

    public int isFollow(String fuserId,String fuseredId){
        return this.iUserFollowDao.isFollow(fuserId,fuseredId);
    }

    public void setFollow(Map<String,Object> map){
        this.iUserFollowDao.setFollow(map);
    }

    public void deleteFollow(Map<String,Object> map){
        this.iUserFollowDao.deleteFollow(map);
    }

}
