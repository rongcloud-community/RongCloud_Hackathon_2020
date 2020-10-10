package com.pyblind.dao;

import com.base.IBaseDao;
import com.pyblind.entity.User;
import com.pyblind.entity.Vital;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface IVitalDao  extends IBaseDao<Vital, Serializable> {
    List<Vital> getTList(String d, String search, String eid);
    String getTpye(int typeid);
}
