package com.pyblind.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Feedback {
    private Long fid;
    private String title;
    private String content;
    private String image;
    private String time;
    private Long id;

    @Override
    public String toString() {
        return "Feedback{" +
                "fid=" + fid +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", image='" + image + '\'' +
                ", time='" + time + '\'' +
                ", id='" + id + '\'' +
                '}';
    }
}
