package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.ActionInfo;
import com.aihome.aihomesys.vo.MealInfo;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public interface IMealInfoDao extends IBaseDao<MealInfo, Serializable> {
    List<MealInfo> getMealList(Map<String, Object> result);

    MealInfo getCommMeal(Map<String, Object> result);
}
