package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IActionInfoDao;
import com.aihome.aihomesys.vo.ActionInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ActionInfoServices {
    @Autowired
    IActionInfoDao iActionInfoDao;

    public List<ActionInfo> selectByclassId(Map<String,Object> map){
        return this.iActionInfoDao.selectByclassId(map);
    }

    public int countById(Map<String,Object> map){
        return this.iActionInfoDao.countById(map);
    }

    public List<ActionInfo> randGetpos(){return this.iActionInfoDao.randGetpos();}

    public ActionInfo selectById(Map<String,Object> map){return this.iActionInfoDao.selectById(map);}
}
