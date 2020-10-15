package com.easyjf.chat.business;

import java.util.Date;
/**
 * 当前发言人
 * @author 大峡
 *
 */
public class Talker {
private Date beginTime;
private String userName;
private Integer talkTime;
private Integer status;
public Date getBeginTime() {
	return beginTime;
}

public void setBeginTime(Date beginTime) {
	this.beginTime = beginTime;
}

public Integer getStatus() {
	return status;
}

public void setStatus(Integer status) {
	this.status = status;
}

public Integer getTalkTime() {
	return talkTime;
}

public void setTalkTime(Integer talkTime) {
	this.talkTime = talkTime;
}

public String getUserName() {
	return userName;
}

public void setUserName(String userName) {
	this.userName = userName;
}

/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	}
}
