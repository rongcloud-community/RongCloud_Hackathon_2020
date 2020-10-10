package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IActionInfoDao;
import com.aihome.aihomesys.dao.IHotelInfoDao;
import com.aihome.aihomesys.vo.ActionInfo;
import com.aihome.aihomesys.vo.HotelInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class HotelInfoServices {
    @Autowired
    IHotelInfoDao iHotelInfoDao;

    public int isIn(long hotelId){
        return this.iHotelInfoDao.isIn(hotelId);
    }

    public HotelInfo getHotelInfo(Map<String, Object> result) {
        return this.iHotelInfoDao.getHotelInfo(result);
    }

    public void setHotelInfo(Map<String, Object> result) {
        this.iHotelInfoDao.setHotelInfo(result);
    }
}
