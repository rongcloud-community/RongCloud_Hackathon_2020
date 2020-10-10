package com.pyblind.services;

import com.pyblind.dao.ITravelDao;
import com.pyblind.entity.Travel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravelService {
    @Autowired
    ITravelDao iTravelDao;

    public List<Travel> getAll(String eid){
        return this.iTravelDao.SelEid(eid);
    }
    public List<Travel>  getTList(String d,String search,String eid){
        return this.iTravelDao.getTList(d,search,eid);
    };
}
