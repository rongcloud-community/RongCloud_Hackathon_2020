package com.pyblind.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Vital {
    private long vid;
    private String vtime;
    private String place;
    private String remark;
    private int typeid;
    private String eid;

    public long getVid() {
        return vid;
    }

    public void setVid(long vid) {
        this.vid = vid;
    }

    public String getVtime() {
        return vtime;
    }

    public void setVtime(String vtime) {
        this.vtime = vtime;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public int getTypeid() {
        return typeid;
    }

    public void setTypeid(int typeid) {
        this.typeid = typeid;
    }

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    @Override
    public String toString() {
        return "Vital{" +
                "vid=" + vid +
                ", vtime='" + vtime + '\'' +
                ", place='" + place + '\'' +
                ", remark='" + remark + '\'' +
                ", typeid='" + typeid + '\'' +
                ", eid='" + eid + '\'' +
                '}';
    }
}
