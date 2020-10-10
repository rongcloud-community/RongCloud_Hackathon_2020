package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.ActionInfo;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public interface IActionInfoDao extends IBaseDao<ActionInfo, Serializable> {
    List<ActionInfo> selectByclassId(Map<String,Object> map);
    List<ActionInfo> getAllitems();
    int countById(Map<String,Object> map);
    List<ActionInfo> randGetpos();
    ActionInfo selectById(Map<String,Object> map);
}
