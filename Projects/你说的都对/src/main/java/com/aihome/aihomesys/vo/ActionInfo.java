package com.aihome.aihomesys.vo;

public class ActionInfo {
    private int actionId;
    private int classId;
    private String actionName;
    private String actionImg;
    private String actionUrl;
    private String actionTime;
    private String actionPoints;
    private String actionSteps;
    private String actionBreak;
    private String actionFeel;
    private String actionError;

    public int getActionId() {
        return actionId;
    }

    public void setActionId(int actionId) {
        this.actionId = actionId;
    }

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public String getActionName() {
        return actionName;
    }

    public void setActionName(String actionName) {
        this.actionName = actionName;
    }

    public String getActionImg() {
        return actionImg;
    }

    public void setActionImg(String actionImg) {
        this.actionImg = actionImg;
    }

    public String getActionUrl() {
        return actionUrl;
    }

    public void setActionUrl(String actionUrl) {
        this.actionUrl = actionUrl;
    }

    public String getActionTime() {
        return actionTime;
    }

    public void setActionTime(String actionTime) {
        this.actionTime = actionTime;
    }

    public String getActionPoints() {
        return actionPoints;
    }

    public void setActionPoints(String actionPoints) {
        this.actionPoints = actionPoints;
    }

    public String getActionSteps() {
        return actionSteps;
    }

    public void setActionSteps(String actionSteps) {
        this.actionSteps = actionSteps;
    }

    public String getActionBreak() {
        return actionBreak;
    }

    public void setActionBreak(String actionBreak) {
        this.actionBreak = actionBreak;
    }

    public String getActionFeel() {
        return actionFeel;
    }

    public void setActionFeel(String actionFeel) {
        this.actionFeel = actionFeel;
    }

    public String getActionError() {
        return actionError;
    }

    public void setActionError(String actionError) {
        this.actionError = actionError;
    }

    @Override
    public String toString() {
        return "ActionInfo{" +
                "actionId=" + actionId +
                ", classId=" + classId +
                ", actionName='" + actionName + '\'' +
                ", actionImg='" + actionImg + '\'' +
                ", actionUrl='" + actionUrl + '\'' +
                ", actionTime='" + actionTime + '\'' +
                ", actionPoints='" + actionPoints + '\'' +
                ", actionSteps='" + actionSteps + '\'' +
                ", actionBreak='" + actionBreak + '\'' +
                ", actionFeel='" + actionFeel + '\'' +
                ", actionError='" + actionError + '\'' +
                '}';
    }
}
