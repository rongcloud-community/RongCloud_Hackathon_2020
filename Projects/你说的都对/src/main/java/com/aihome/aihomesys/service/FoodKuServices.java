package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IActionInfoDao;
import com.aihome.aihomesys.dao.IFoodKuDao;
import com.aihome.aihomesys.vo.ActionInfo;
import com.aihome.aihomesys.vo.FoodKu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FoodKuServices {
    @Autowired
    IFoodKuDao iFoodKuDao;

    public FoodKu selectById(int foodId){
        return this.iFoodKuDao.selectById(foodId);
    }

    public List<FoodKu> selectFoodListByHotel(int hotelId){
        return this.iFoodKuDao.selectFoodListByHotel(hotelId);
    }

}
