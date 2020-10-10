package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IActionInfoDao;
import com.aihome.aihomesys.dao.IMealInfoDao;
import com.aihome.aihomesys.vo.ActionInfo;
import com.aihome.aihomesys.vo.MealInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MealInfoServices {
    @Autowired
    IMealInfoDao iMealInfoDao;

    public List<MealInfo> getMealList(Map<String, Object> result) {
        return this.iMealInfoDao.getMealList(result);
    }

    public MealInfo getCommMeal(Map<String, Object> result) {
        return this.iMealInfoDao.getCommMeal(result);
    }
}
