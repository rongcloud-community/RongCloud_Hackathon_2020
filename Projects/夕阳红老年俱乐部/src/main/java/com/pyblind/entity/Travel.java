package com.pyblind.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Travel {
    private Long tid;
    private String origin;
    private String terminal;
    private String starttime;
    private String finishtime;
    private double distance;
    private String eid;


    @Override
    public String toString() {
        return "Travel{" +
                "tid=" + tid +
                ", origin='" + origin + '\'' +
                ", terminal='" + terminal + '\'' +
                ", starttime='" + starttime + '\'' +
                ", finishtime='" + finishtime + '\'' +
                ", distance='" + distance + '\'' +
                ", eid='" + eid + '\'' +
                '}';
    }
}
