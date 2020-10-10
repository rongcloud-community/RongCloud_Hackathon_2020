package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.ICircleContentDao;
import com.aihome.aihomesys.vo.CircleContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CircleContentServices {
    @Autowired
    ICircleContentDao iCircleContentDao;

    public int insert(Map<String,Object> map){
        return this.iCircleContentDao.insertCont(map);
    }

    public List<CircleContent> getHot(Map<String,Object> map){
        return this.iCircleContentDao.getHot(map);
    }
    public int countHot(Map<String,Object> map){
        return this.iCircleContentDao.countHot(map);
    }

    public List<CircleContent> getFollow(Map<String,Object> map){
        Map<String,Object> re = new HashMap<>();
        re.put("fuserId",map.get("userId"));
        re.put("page",map.get("page"));
        re.put("number",map.get("number"));
        return this.iCircleContentDao.getFollow(re);
    }
    public int countFollow(Map<String,Object> map){
        Map<String,Object> re = new HashMap<>();
        re.put("fuserId",map.get("userId"));
        return this.iCircleContentDao.countFollow(map);
    }

    public List<CircleContent> getMycont(Map<String,Object> map){
        return this.iCircleContentDao.getMycont(map);
    }
    public int countMycont(Map<String,Object> map){
        return this.iCircleContentDao.countMycont(map);
    }

    public CircleContent getUserCont(int conId){
        return this.iCircleContentDao.getUserCont(conId);
    }

    public List<CircleContent> getUsers2Contents(int contId){
        return this.iCircleContentDao.getUsers2Contents(contId);
    }

    public void contAdd(Map<String,Object> map){
        this.iCircleContentDao.contAdd(map);
    }

    public void goodAdd(Map<String,Object> map){
        this.iCircleContentDao.goodAdd(map);
    }

    public void goodSub(Map<String,Object> map){
        this.iCircleContentDao.goodSub(map);
    }

    public List<CircleContent> fromClass2Content(int classId){
        return this.iCircleContentDao.fromClass2Content(classId);
    };

    public List<CircleContent> getMycontAndCallback(Map<String,Object> map){
        return this.iCircleContentDao.getMycontAndCallback(map);
    };

    public List<CircleContent> getSearchItems(Map<String,Object> map){
        return this.iCircleContentDao.getSearchItems(map);
    }

}
