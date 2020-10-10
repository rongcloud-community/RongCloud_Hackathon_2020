package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.ActionInfo;
import com.aihome.aihomesys.vo.HotelInfo;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public interface IHotelInfoDao extends IBaseDao<HotelInfo, Serializable> {
    int isIn(long hotelId);

    HotelInfo getHotelInfo(Map<String, Object> result);

    void setHotelInfo(Map<String, Object> result);
}
