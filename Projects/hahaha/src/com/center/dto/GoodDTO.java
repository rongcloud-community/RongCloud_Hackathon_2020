package com.center.dto;

public class GoodDTO {

	public int goodid;
	public String goodname;
	public String goodtype;
	public String gooddesc;
	public double goodprice;
	public String publisher;
	public String publishtime;
	
	public GoodDTO(){
		
	}

	public String getGooddesc() {
		return gooddesc;
	}

	public void setGooddesc(String gooddesc) {
		this.gooddesc = gooddesc;
	}

	public int getGoodid() {
		return goodid;
	}

	public void setGoodid(int goodid) {
		this.goodid = goodid;
	}

	public String getGoodname() {
		return goodname;
	}

	public void setGoodname(String goodname) {
		this.goodname = goodname;
	}

	public double getGoodprice() {
		return goodprice;
	}

	public void setGoodprice(double goodprice) {
		this.goodprice = goodprice;
	}

	public String getGoodtype() {
		return goodtype;
	}

	public void setGoodtype(String goodtype) {
		this.goodtype = goodtype;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getPublishtime() {
		return publishtime;
	}

	public void setPublishtime(String publishtime) {
		this.publishtime = publishtime;
	}
	
	
}
