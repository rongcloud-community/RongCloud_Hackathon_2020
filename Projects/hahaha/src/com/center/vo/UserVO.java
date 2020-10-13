package com.center.vo;

public class UserVO {

	private int userid;
	private String username;
	private String userpsw;
	private String useremail;
	private int userlogincount;
	private String lastlogintime;
	private String thislogintime;
	private int userlevle;
	
	public UserVO(){
		
	}

	public String getUseremail() {
		return useremail;
	}

	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserpsw() {
		return userpsw;
	}

	public void setUserpsw(String userpsw) {
		this.userpsw = userpsw;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public int getUserlogincount() {
		return userlogincount;
	}

	public void setUserlogincount(int userlogincount) {
		this.userlogincount = userlogincount;
	}

	public String getLastlogintime() {
		return lastlogintime;
	}

	public void setLastlogintime(String lastlogintime) {
		this.lastlogintime = lastlogintime;
	}

	public String getThislogintime() {
		return thislogintime;
	}

	public void setThislogintime(String thislogintime) {
		this.thislogintime = thislogintime;
	}

	public int getUserlevle() {
		return userlevle;
	}

	public void setUserlevle(int userlevle) {
		this.userlevle = userlevle;
	}

	
	
}
