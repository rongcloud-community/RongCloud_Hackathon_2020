package com.pyblind.services;


import com.pyblind.dao.IEquipmentDao;
import com.pyblind.dao.IUserDao;
import com.pyblind.entity.Equipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipentService {
    @Autowired
    IEquipmentDao iEquipmentDao;
    public Equipment getInfo(String eid){return this.iEquipmentDao.getInfo(eid);}
}
