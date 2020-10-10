package com.pyblind.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Type {
    private Long typeid;
    private String tname;

    @Override
    public String toString() {
        return "Type{" +
                "typeid=" + typeid +
                ", tname='" + tname + '\'' +
                '}';
    }
}
