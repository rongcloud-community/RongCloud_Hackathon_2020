package com.easyjf.chat.business;

import java.util.Date;

import com.easyjf.web.tools.IActiveUser;
/**
 * 参会用户
 * @author 大峡
 *
 */
public class ChatUser implements IActiveUser{
private String ip;
private String port;
private String userName;
private Date lastAccessTime;
private Integer status;
public String getIp() {
		// TODO Auto-generated method stub
		return ip;
	}
	public String getUserName() {		
		return userName;
	}

	public Date getLastAccessTime() {
		return lastAccessTime;
	}

	public void setLastAccessTime(Date lastAccessTime) {
		this.lastAccessTime = lastAccessTime;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}	
}
