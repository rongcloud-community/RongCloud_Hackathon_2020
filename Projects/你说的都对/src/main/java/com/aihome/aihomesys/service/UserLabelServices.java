package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IUserLabelDao;
import com.aihome.aihomesys.vo.UserLabel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserLabelServices {
    @Autowired
    IUserLabelDao iUserLabelDao;

    public List<UserLabel> getAll(String userId){
        return this.iUserLabelDao.getAllitems(userId);
    }

    public int insertBeach(List<UserLabel> list){
        return this.iUserLabelDao.insertForeach(list);
    }
}
