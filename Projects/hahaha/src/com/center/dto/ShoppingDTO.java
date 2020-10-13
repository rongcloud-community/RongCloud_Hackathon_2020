package com.center.dto;

public class ShoppingDTO {

	private int goodid;
	private int userid;
	private String shoptime;
	private String username;
	private double price;
	private String goodname;

	public ShoppingDTO(){
		
	}

	public int getGoodid() {
		return goodid;
	}

	public String getGoodname() {
		return goodname;
	}

	public void setGoodname(String goodname) {
		this.goodname = goodname;
	}

	public void setGoodid(int goodid) {
		this.goodid = goodid;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
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
	
	
}
