package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.ActionInfo;
import com.aihome.aihomesys.vo.FoodKu;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public interface IFoodKuDao extends IBaseDao<FoodKu, Serializable> {
    FoodKu selectById(int foodId);

    List<FoodKu> selectFoodListByHotel(int hotelId);
}
