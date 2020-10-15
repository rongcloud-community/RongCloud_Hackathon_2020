package com.pyblind.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Comment {
    private long commentid;
    private String name;
    private String comment;
    private long id;
    private long sendid;
    private String cotime;

    public long getCommentid() {
        return commentid;
    }

    public void setCommentid(long commentid) {
        this.commentid = commentid;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSendid() {
        return sendid;
    }

    public void setSendid(long sendid) {
        this.sendid = sendid;
    }

    public String getCotime() {
        return cotime;
    }

    public void setCotime(String cotime) {
        this.cotime = cotime;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "commentid=" + commentid +
                ", name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", id='" + id + '\'' +
                ", sendid='" + sendid + '\'' +
                ", cotime='" + cotime + '\'' +
                '}';
    }
}
