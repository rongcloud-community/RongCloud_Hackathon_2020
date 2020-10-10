package com.aihome.aihomesys.vo;

public class UserPlan {
    private int planId;
    private String userId;
    private int classId;
    private String className;
    private String classImg;
    private String comTime;
    private String classTime;
    private int isComplete;
    private String subTime;
    private String todayTime;
    private int totalFatB;
    private int todayComplete;

    @Override
    public String toString() {
        return "UserPlan{" +
                "planId=" + planId +
                ", userId='" + userId + '\'' +
                ", classId=" + classId +
                ", className='" + className + '\'' +
                ", classImg='" + classImg + '\'' +
                ", comTime='" + comTime + '\'' +
                ", classTime='" + classTime + '\'' +
                ", isComplete=" + isComplete +
                ", subTime='" + subTime + '\'' +
                ", todayTime='" + todayTime + '\'' +
                ", totalFatB='" + totalFatB + '\'' +
                ", todayComplete=" + todayComplete +
                '}';
    }

    public int getPlanId() {
        return planId;
    }

    public void setPlanId(int planId) {
        this.planId = planId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getClassImg() {
        return classImg;
    }

    public void setClassImg(String classImg) {
        this.classImg = classImg;
    }

    public String getComTime() {
        return comTime;
    }

    public void setComTime(String comTime) {
        this.comTime = comTime;
    }

    public String getClassTime() {
        return classTime;
    }

    public void setClassTime(String classTime) {
        this.classTime = classTime;
    }

    public int getIsComplete() {
        return isComplete;
    }

    public void setIsComplete(int isComplete) {
        this.isComplete = isComplete;
    }

    public String getSubTime() {
        return subTime;
    }

    public void setSubTime(String subTime) {
        this.subTime = subTime;
    }

    public String getTodayTime() {
        return todayTime;
    }

    public void setTodayTime(String todayTime) {
        this.todayTime = todayTime;
    }

    public int getTotalFatB() {
        return totalFatB;
    }

    public void setTotalFatB(int totalFatB) {
        this.totalFatB = totalFatB;
    }

    public int getTodayComplete() {
        return todayComplete;
    }

    public void setTodayComplete(int todayComplete) {
        this.todayComplete = todayComplete;
    }
}
