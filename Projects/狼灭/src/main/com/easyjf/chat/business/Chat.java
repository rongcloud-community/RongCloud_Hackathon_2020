package com.easyjf.chat.business;

import java.util.Date;
/**
 * 会议发言信息
 * @author 大峡
 *
 */
public class Chat  {
private String cid;
private String sender;
private String reciver;
private String content;
private Date vdate;
private Integer types;
private Integer status;
public Chat()
{
	this.vdate=new Date();
	this.status=new Integer(0);	
}
public String getCid() {
	return cid;
}
public void setCid(String cid) {
	this.cid = cid;
}
public String getContent() {
	return content;
}
public void setContent(String content) {
	this.content = content;
}
public String getReciver() {
	return reciver;
}
public void setReciver(String reciver) {
	this.reciver = reciver;
}
public String getSender() {
	return sender;
}

public void setSender(String sender) {
	this.sender = sender;
}

public Integer getStatus() {
	return status;
}

public void setStatus(Integer status) {
	this.status = status;
}

public Integer getTypes() {
	return types;
}

public void setTypes(Integer types) {
	this.types = types;
}

public Date getVdate() {
	return vdate;
}

public void setVdate(Date vdate) {
	this.vdate = vdate;
}

/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
}
