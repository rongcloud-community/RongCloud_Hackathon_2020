package com.pyblind.dao;

import com.base.IBaseDao;
import com.pyblind.entity.Travel;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface ITravelDao extends IBaseDao<Travel, Serializable>{
    List<Travel> SelEid(String eid);
    List<Travel> getTList(String d,String search,String eid);
}
