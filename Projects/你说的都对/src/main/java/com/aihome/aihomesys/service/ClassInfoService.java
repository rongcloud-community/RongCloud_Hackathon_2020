package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IClassInfoDao;
import com.aihome.aihomesys.vo.ClassInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClassInfoService {

    @Autowired
    IClassInfoDao iClassInfoDao;

    public List<ClassInfo> selectByKeys(Map<String,Object> map){
        return this.iClassInfoDao.selectByKeys(map);
    }

    public List<ClassInfo> getAll(Map<String,Object> map){
        return this.iClassInfoDao.getAllitems(map);
    }
    public int getAllCounts(){
        return this.iClassInfoDao.getAllCounts();
    }

    public List<ClassInfo> selectBytitles(Map<String,Object> map){
        return this.iClassInfoDao.selectByTitle(map);
    }
    public int countByTitle(Map<String,Object> map){
        return this.iClassInfoDao.countByTitle(map);
    };

    public ClassInfo selectById(Map<String,Object> map) {
        return this.iClassInfoDao.selectById(map);
    }

    public void updateSub(Map<String,Object> map){ this.iClassInfoDao.updateSub(map);}

    public List<ClassInfo> selectByUserId(String userId){
        return this.iClassInfoDao.selectByUserId(userId);
    }

    public List<ClassInfo> getSearch(String val){
        return this.iClassInfoDao.getSearch(val);
    }

}
