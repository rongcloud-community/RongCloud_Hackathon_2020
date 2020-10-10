package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.ClassInfo;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
@Repository
public interface IClassInfoDao extends IBaseDao<ClassInfo, Serializable> {

    List<ClassInfo> selectByKeys(Map<String,Object> map);

    List<ClassInfo> getAllitems(Map<String,Object> map);
    int getAllCounts();

    List<ClassInfo> selectByTitle(Map<String,Object> map);
    int countByTitle(Map<String,Object> map);

    ClassInfo selectById(Map<String,Object> map);

    void updateSub(Map<String,Object> map);

    List<ClassInfo> selectByUserId(String userId);

    List<ClassInfo> getSearch(String val);

}
