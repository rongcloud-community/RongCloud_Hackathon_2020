package com.aihome.aihomesys.dao;

import com.aihome.aihomesys.base.IBaseDao;
import com.aihome.aihomesys.vo.ActionInfo;
import com.aihome.aihomesys.vo.FitnessRecord;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Repository
public interface IFitnessRecordDao extends IBaseDao<FitnessRecord, Serializable> {
    void recordInsert(Map<String,Object> mapper);
    int countFitnessTime(String userId);
    int countCumFatB(String userId);
    int countCumFatBToday(String userId);
    int countCumday(String userId);
    int countPerfect(String userId);
    int countGood(String userId);
    int countBad(String userId);
    int countEchartFatB(String userId,String recordTime);
    int countEchartFitnessTime(String userId,String recordTime);
    int countEchartPlan(String userId,String recordTime);

    int count69(String userId);
    int count912(String userId);
    int count1215(String userId);
    int count1518(String userId);
    int count1821(String userId);
    int count210(String userId);
    int count0after(String userId);
}
