package com.pyblind.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Focus {
    private Long focusid;
    private Long user1;
    private Long user2;

    @Override
    public String toString() {
        return "Focus{" +
                "focusid=" + focusid +
                ", user1='" + user1 + '\'' +
                ", user2='" + user2 + '\'' +
                '}';
    }
}
