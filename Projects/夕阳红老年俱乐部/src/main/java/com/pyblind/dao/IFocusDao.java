package com.pyblind.dao;

import com.base.IBaseDao;
import com.pyblind.entity.Focus;
import com.pyblind.entity.User;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public interface IFocusDao extends IBaseDao<Focus, Serializable> {
    List<Long> getList1(long id);
    List<Long> getList2(long id);
    int count1(long id);
    int count2(long id);
    void delete(long id, long fid);
    int exist(long id, long fid);
    void newFocus(long id,long fid);
}
