package com.pyblind.entity;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class Equipment {
    private String eid;
    private String ename;
    private String bindingTime;
    private int state;

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public String getBindingTime() {
        return bindingTime;
    }

    public void setBindingTime(String bindingTime) {
        this.bindingTime = bindingTime;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Equipment{" +
                "eid=" + eid +
                ", ename='" + ename + '\'' +
                ", bindingTime='" + bindingTime + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
