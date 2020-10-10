package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.UserGood;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Map;

@Repository
public interface IUserGoodDao extends IBaseDao<UserGood, Serializable> {
    int isGood(Map<String,Object> map);

    void insertGood(Map<String,Object> map);

    void deleteGood(Map<String,Object> map);

}
