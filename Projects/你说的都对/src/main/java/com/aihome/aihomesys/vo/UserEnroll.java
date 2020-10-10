package com.aihome.aihomesys.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class UserEnroll {
    private String userId;
    private String userAva;
    private String userName;
    private String password;
    private long hotelId;
    private long userType;
    private String loginTime;
    private String enrollTime;
    private int enableInfoco;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserAva() {
        return userAva;
    }

    public void setUserAva(String userAva) {
        this.userAva = userAva;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getHotelId() {
        return hotelId;
    }

    public void setHotelId(long hotelId) {
        this.hotelId = hotelId;
    }

    public long getUserType() {
        return userType;
    }

    public void setUserType(long userType) {
        this.userType = userType;
    }

    public String getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(String loginTime) {
        this.loginTime = loginTime;
    }

    public String getEnrollTime() {
        return enrollTime;
    }

    public void setEnrollTime(String enrollTime) {
        this.enrollTime = enrollTime;
    }

    public int getEnableInfoco() {
        return enableInfoco;
    }

    public void setEnableInfoco(int enableInfoco) {
        this.enableInfoco = enableInfoco;
    }

    @Override
    public String toString() {
        return "UserEnroll{" +
                "userId='" + userId + '\'' +
                ", userAva='" + userAva + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", hotelId=" + hotelId +
                ", userType=" + userType +
                ", loginTime='" + loginTime + '\'' +
                ", enrollTime='" + enrollTime + '\'' +
                ", enableInfoco='" + enableInfoco + '\'' +
                '}';
    }

}
