package com.aihome.aihomesys.vo;

public class UserInfo {
    private int infoId;
    private String userId;
    private String sex;
    private String age;
    private double height;
    private double weight;
    private double bust;
    private double waist;
    private double hipline;
    private double BMI;
    private int RHR;
    private int MHR;
    private String modifyTime;
    private int trainDay;
    private int todayIsTrain;

    public int getTrainDay() {
        return trainDay;
    }

    public void setTrainDay(int trainDay) {
        this.trainDay = trainDay;
    }

    public int getTodayIsTrain() {
        return todayIsTrain;
    }

    public void setTodayIsTrain(int todayIsTrain) {
        this.todayIsTrain = todayIsTrain;
    }

    public int getInfoId() {
        return infoId;
    }

    public void setInfoId(int infoId) {
        this.infoId = infoId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getBust() {
        return bust;
    }

    public void setBust(double bust) {
        this.bust = bust;
    }

    public double getWaist() {
        return waist;
    }

    public void setWaist(double waist) {
        this.waist = waist;
    }

    public double getHipline() {
        return hipline;
    }

    public void setHipline(double hipline) {
        this.hipline = hipline;
    }

    public double getBMI() {
        return BMI;
    }

    public void setBMI(double BMI) {
        this.BMI = BMI;
    }

    public int getRHR() {
        return RHR;
    }

    public void setRHR(int RHR) {
        this.RHR = RHR;
    }

    public int getMHR() {
        return MHR;
    }

    public void setMHR(int MHR) {
        this.MHR = MHR;
    }

    public String getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(String modifyTime) {
        this.modifyTime = modifyTime;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "infoId=" + infoId +
                ", userId='" + userId + '\'' +
                ", sex='" + sex + '\'' +
                ", age='" + age + '\'' +
                ", height=" + height +
                ", weight=" + weight +
                ", bust=" + bust +
                ", waist=" + waist +
                ", hipline=" + hipline +
                ", BMI=" + BMI +
                ", RHR=" + RHR +
                ", MHR=" + MHR +
                ", modifyTime='" + modifyTime + '\'' +
                ", trainDay=" + trainDay +
                ", todayIsTrain=" + todayIsTrain +
                '}';
    }
}
