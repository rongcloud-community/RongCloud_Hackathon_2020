package com.pyblind.services;

import com.pyblind.dao.IFocusDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FocusService {
    @Autowired
    IFocusDao iFocusDao;

    public List<Long> getList1(long id){
        return this.iFocusDao.getList1(id);
    }
    public List<Long> getList2(long id){
        return this.iFocusDao.getList2(id);
    }
    public int count1(long id){
        return this.iFocusDao.count1(id);
    }
    public int count2(long id){
        return this.iFocusDao.count2(id);
    }
    public void delete(long id, long fid){ this.iFocusDao.delete(id,fid);}
    public int exist(long id, long fid){ return this.iFocusDao.exist(id,fid);}
    public void newFocus(long id,long fid){this.iFocusDao.newFocus(id,fid);}


}
