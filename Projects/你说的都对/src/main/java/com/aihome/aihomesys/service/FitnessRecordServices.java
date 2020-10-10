package com.aihome.aihomesys.service;

import com.aihome.aihomesys.dao.IActionInfoDao;
import com.aihome.aihomesys.dao.IFitnessRecordDao;
import com.aihome.aihomesys.vo.ActionInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FitnessRecordServices {
    @Autowired
    IFitnessRecordDao iFitnessRecordDao;

    public void recordInsert(Map<String,Object> mapper){
        this.iFitnessRecordDao.recordInsert(mapper);
    }

    public int countFitnessTime(String userId){
        return this.iFitnessRecordDao.countFitnessTime(userId);
    }

    public int countCumFatB(String userId){
        return this.iFitnessRecordDao.countCumFatB(userId);
    }

    public int countCumFatBToday(String userId){
        return this.iFitnessRecordDao.countCumFatBToday(userId);
    }

    public int countCumday(String userId){
        return this.iFitnessRecordDao.countCumday(userId);
    }

    public int countPerfect(String userId){
        return this.iFitnessRecordDao.countPerfect(userId);
    }

    public int countGood(String userId){
        return this.iFitnessRecordDao.countGood(userId);
    }

    public int countBad(String userId){
        return this.iFitnessRecordDao.countBad(userId);
    }

    public int countEchartFatB(String userId,String recordTime){
        return this.iFitnessRecordDao.countEchartFatB(userId,recordTime);
    }

    public int countEchartFitnessTime(String userId,String recordTime){
        return this.iFitnessRecordDao.countEchartFitnessTime(userId,recordTime);
    }

    public int countEchartPlan(String userId,String recordTime){
        return this.iFitnessRecordDao.countEchartPlan(userId,recordTime);
    }

    public int count69(String userId){
        return this.iFitnessRecordDao.count69(userId);
    }
    public int count912(String userId){
        return this.iFitnessRecordDao.count912(userId);
    }
    public int count1215(String userId){
        return this.iFitnessRecordDao.count1215(userId);
    }
    public int count1518(String userId){
        return this.iFitnessRecordDao.count1518(userId);
    }
    public int count1821(String userId){
        return this.iFitnessRecordDao.count1821(userId);
    }
    public int count210(String userId){
        return this.iFitnessRecordDao.count210(userId);
    }
    public int count0after(String userId){
        return this.iFitnessRecordDao.count0after(userId);
    }

}
