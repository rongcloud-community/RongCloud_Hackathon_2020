package com.pyblind.services;

import com.pyblind.dao.IVitalDao;
import com.pyblind.entity.Vital;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VitalService {
    @Autowired
    IVitalDao iVitalDao;

    public List<Vital> getTList(String d, String search, String eid){
        return this.iVitalDao.getTList(d,search,eid);
    };
    public String getTpye(int typeid){
        return this.iVitalDao.getTpye(typeid);
    }
}
