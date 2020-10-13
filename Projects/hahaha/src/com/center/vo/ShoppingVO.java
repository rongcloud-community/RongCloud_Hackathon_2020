package com.center.vo;

public class ShoppingVO {

	private int id;
	private int goodid;
	private int userid;
	private int goodnum;
	private String shoptime;
	private String username;
	private double price;
	private double payment;
	private int payy;
	private int auditing;
	private int selled;
	private String auditingtime;
	private String province;
	private String goodname;
	
	public ShoppingVO(){
		
	}
	public int getAuditing() {
		return auditing;
	}
	
	public String getGoodname() {
		return goodname;
	}
	public void setGoodname(String goodname) {
		this.goodname = goodname;
	}
	public void setAuditing(int auditing) {
		this.auditing = auditing;
	}
	public String getAuditingtime() {
		return auditingtime;
	}
	public void setAuditingtime(String auditingtime) {
		this.auditingtime = auditingtime;
	}
	public int getGoodid() {
		return goodid;
	}
	public void setGoodid(int goodid) {
		this.goodid = goodid;
	}
	public double getPayment() {
		return payment;
	}
	public void setPayment(double payment) {
		this.payment = payment;
	}
	public int getPayy() {
		return payy;
	}
	public void setPayy(int payy) {
		this.payy = payy;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getSelled() {
		return selled;
	}
	public void setSelled(int selled) {
		this.selled = selled;
	}
	public String getShoptime() {
		return shoptime;
	}
	public void setShoptime(String shoptime) {
		this.shoptime = shoptime;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getGoodnum() {
		return goodnum;
	}
	public void setGoodnum(int goodnum) {
		this.goodnum = goodnum;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	
	
	
}
