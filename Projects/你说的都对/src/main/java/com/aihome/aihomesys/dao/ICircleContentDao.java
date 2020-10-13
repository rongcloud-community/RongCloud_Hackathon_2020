package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.CircleContent;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public interface ICircleContentDao extends IBaseDao<CircleContent, Serializable> {
    int insertCont(Map<String,Object> map);
    List<CircleContent> getHot(Map<String,Object> map);
    int countHot(Map<String,Object> map);
    List<CircleContent> getFollow(Map<String,Object> map);
    int countFollow(Map<String,Object> map);
    List<CircleContent> getMycont(Map<String,Object> map);
    int countMycont(Map<String,Object> map);
    CircleContent getUserCont(int conId);
    List<CircleContent> getUsers2Contents(int conId);
    void contAdd(Map<String,Object> map);
    void goodAdd(Map<String,Object> map);
    void goodSub(Map<String,Object> map);
    List<CircleContent> fromClass2Content(int classId);
    List<CircleContent> getMycontAndCallback(Map<String,Object> map);
    List<CircleContent> getSearchItems(Map<String,Object> map);
}
