package com.aihome.aihomesys.vo;

import java.util.Arrays;

public class CircleContent {
    private int conId;
    private String userId;
    private int fkId;
    private int fkType;
    private String userName;
    private String userImg;
    private String conTime;
    private String conImg;
    private String conCont;
    private int conGood;
    private int conValid;
    private int conContNum;
    private int isGood;
    private String[] imglist;

    @Override
    public String toString() {
        return "CircleContent{" +
                "conId=" + conId +
                ", userId='" + userId + '\'' +
                ", fkId=" + fkId +
                ", fkType=" + fkType +
                ", userName='" + userName + '\'' +
                ", userImg='" + userImg + '\'' +
                ", conTime='" + conTime + '\'' +
                ", conImg='" + conImg + '\'' +
                ", conCont='" + conCont + '\'' +
                ", conGood=" + conGood +
                ", conValid=" + conValid +
                ", conContNum=" + conContNum +
                ", isGood=" + isGood +
                ", imglist=" + Arrays.toString(imglist) +
                '}';
    }

    public int getIsGood() {
        return isGood;
    }

    public void setIsGood(int isGood) {
        this.isGood = isGood;
    }

    public int getConContNum() {
        return conContNum;
    }

    public void setConContNum(int conContNum) {
        this.conContNum = conContNum;
    }

    public int getConId() {
        return conId;
    }

    public void setConId(int conId) {
        this.conId = conId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserImg() {
        return userImg;
    }

    public void setUserImg(String userImg) {
        this.userImg = userImg;
    }

    public String getConTime() {
        return conTime;
    }

    public void setConTime(String conTime) {
        this.conTime = conTime;
    }

    public String getConImg() {
        return conImg;
    }

    public void setConImg(String conImg) {
        this.conImg = conImg;
    }

    public String getConCont() {
        return conCont;
    }

    public void setConCont(String conCont) {
        this.conCont = conCont;
    }

    public int getConGood() {
        return conGood;
    }

    public void setConGood(int conGood) {
        this.conGood = conGood;
    }

    public int getConValid() {
        return conValid;
    }

    public void setConValid(int conValid) {
        this.conValid = conValid;
    }

    public String[] getImglist() {
        return imglist;
    }

    public void setImglist(String[] imglist) {
        this.imglist = imglist;
    }
}
