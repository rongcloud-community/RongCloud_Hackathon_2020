package com.pyblind.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Send {
    private Long sendid;
    private String title;
    private String content;
    private int state;
    private Long id;
    private String sendtime;

    public Long getSendid() {
        return sendid;
    }

    public void setSendid(Long sendid) {
        this.sendid = sendid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSendtime() {
        return sendtime;
    }

    public void setSendtime(String sendtime) {
        this.sendtime = sendtime;
    }

    @Override
    public String toString() {
        return "Send{" +
                "sendid=" + sendid +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", state='" + state + '\'' +
                ", id='" + id + '\'' +
                ", sendtime='" + sendtime + '\'' +
                '}';
    }
}
