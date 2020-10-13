package com.aihome.aihomesys.vo;

public class UserGood {
    private int goodId;
    private String userId;
    private String userName;
    private String userImg;
    private int conId;
    private String conCont;
    private String goodTime;
    private int goodValid;

    @Override
    public String toString() {
        return "UserGood{" +
                "goodId=" + goodId +
                ", userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", userImg='" + userImg + '\'' +
                ", conId=" + conId +
                ", conCont='" + conCont + '\'' +
                ", goodTime='" + goodTime + '\'' +
                ", goodValid=" + goodValid +
                '}';
    }

    public int getGoodId() {
        return goodId;
    }

    public void setGoodId(int goodId) {
        this.goodId = goodId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public int getConId() {
        return conId;
    }

    public void setConId(int conId) {
        this.conId = conId;
    }

    public String getConCont() {
        return conCont;
    }

    public void setConCont(String conCont) {
        this.conCont = conCont;
    }

    public String getGoodTime() {
        return goodTime;
    }

    public void setGoodTime(String goodTime) {
        this.goodTime = goodTime;
    }

    public int getGoodValid() {
        return goodValid;
    }

    public void setGoodValid(int goodValid) {
        this.goodValid = goodValid;
    }
}
