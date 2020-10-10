package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.UserLabel;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface IUserLabelDao extends IBaseDao<UserLabel, Serializable> {
    int insertForeach(List<UserLabel> list);
    List<UserLabel> getAllitems(String userId);
}
