package com.aihome.aihomesys.vo;

public class UserFollow {
    private int followId;
    private String fuserId;
    private String fuserName;
    private String fuserImg;
    private String fuseredId;
    private String fuseredName;
    private String fuseredImg;
    private String followTime;
    private int followValid;
    private int isFollowed;

    @Override
    public String toString() {
        return "UserFollow{" +
                "followId=" + followId +
                ", fuserId='" + fuserId + '\'' +
                ", fuserName='" + fuserName + '\'' +
                ", fuserImg='" + fuserImg + '\'' +
                ", fuseredId='" + fuseredId + '\'' +
                ", fuseredName='" + fuseredName + '\'' +
                ", fuseredImg='" + fuseredImg + '\'' +
                ", followTime='" + followTime + '\'' +
                ", followValid=" + followValid +
                ", isFollowed=" + isFollowed +
                '}';
    }

    public int getFollowId() {
        return followId;
    }

    public void setFollowId(int followId) {
        this.followId = followId;
    }

    public String getFuserId() {
        return fuserId;
    }

    public void setFuserId(String fuserId) {
        this.fuserId = fuserId;
    }

    public String getFuserName() {
        return fuserName;
    }

    public void setFuserName(String fuserName) {
        this.fuserName = fuserName;
    }

    public String getFuserImg() {
        return fuserImg;
    }

    public void setFuserImg(String fuserImg) {
        this.fuserImg = fuserImg;
    }

    public String getFuseredId() {
        return fuseredId;
    }

    public void setFuseredId(String fuseredId) {
        this.fuseredId = fuseredId;
    }

    public String getFuseredName() {
        return fuseredName;
    }

    public void setFuseredName(String fuseredName) {
        this.fuseredName = fuseredName;
    }

    public String getFuseredImg() {
        return fuseredImg;
    }

    public void setFuseredImg(String fuseredImg) {
        this.fuseredImg = fuseredImg;
    }

    public String getFollowTime() {
        return followTime;
    }

    public void setFollowTime(String followTime) {
        this.followTime = followTime;
    }

    public int getFollowValid() {
        return followValid;
    }

    public void setFollowValid(int followValid) {
        this.followValid = followValid;
    }

    public int getIsFollowed() {
        return isFollowed;
    }

    public void setIsFollowed(int isFollowed) {
        this.isFollowed = isFollowed;
    }
}
