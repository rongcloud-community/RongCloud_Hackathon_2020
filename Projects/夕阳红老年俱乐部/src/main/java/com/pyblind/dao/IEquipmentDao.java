package com.pyblind.dao;

import com.base.IBaseDao;
import com.pyblind.entity.Equipment;
import com.pyblind.entity.User;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public interface IEquipmentDao extends IBaseDao<Equipment, Serializable>{
    Equipment getInfo(String eid);
}
