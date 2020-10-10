package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.ILabelTypeDao;
import com.aihome.aihomesys.vo.LabelType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabelTypeService {

    @Autowired
    ILabelTypeDao iLabelTypeDao;

    public List<LabelType> getAll(){
        return this.iLabelTypeDao.getAllitems();
    }
}
