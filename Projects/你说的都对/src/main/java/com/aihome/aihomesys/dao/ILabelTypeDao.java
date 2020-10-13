package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.LabelType;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface ILabelTypeDao extends IBaseDao<LabelType, Serializable> {
    List<LabelType> getAllitems();
}
