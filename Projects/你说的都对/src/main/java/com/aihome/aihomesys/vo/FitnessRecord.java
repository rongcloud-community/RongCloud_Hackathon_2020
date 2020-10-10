package com.aihome.aihomesys.vo;

public class FitnessRecord {
    private int frId;
    private String userId;
    private String recordTime;
    private int fitnessTime;
    private int cumFatB;
    private int fkId;
    private int fkType;
    private double score;

    @Override
    public String toString() {
        return "FitnessRecord{" +
                "frId=" + frId +
                ", userId='" + userId + '\'' +
                ", recordTime='" + recordTime + '\'' +
                ", fitnessTime=" + fitnessTime +
                ", cumFatB=" + cumFatB +
                ", fkId=" + fkId +
                ", fkType=" + fkType +
                ", score=" + score +
                '}';
    }

    public int getFrId() {
        return frId;
    }

    public void setFrId(int frId) {
        this.frId = frId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(String recordTime) {
        this.recordTime = recordTime;
    }

    public int getFitnessTime() {
        return fitnessTime;
    }

    public void setFitnessTime(int fitnessTime) {
        this.fitnessTime = fitnessTime;
    }

    public int getCumFatB() {
        return cumFatB;
    }

    public void setCumFatB(int cumFatB) {
        this.cumFatB = cumFatB;
    }

    public int getFkId() {
        return fkId;
    }

    public void setFkId(int fkId) {
        this.fkId = fkId;
    }

    public int getFkType() {
        return fkType;
    }

    public void setFkType(int fkType) {
        this.fkType = fkType;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
