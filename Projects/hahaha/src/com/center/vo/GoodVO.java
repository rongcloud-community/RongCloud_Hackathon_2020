package com.center.vo;

public class GoodVO {
	
	public int goodid;
	public String goodname;
	public String goodtype;
	public String gooddesc;
	public double goodprice;
	public String publisher;
	public String publishtime;
	public int goodreadcount;
	public int goodbuycount;
	public int goodspec;
	public int goodcommended;
	public int goodtop;
	
	public GoodVO(){
		
	}

	public int getGoodbuycount() {
		return goodbuycount;
	}

	public void setGoodbuycount(int goodbuycount) {
		this.goodbuycount = goodbuycount;
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

	public int getGoodreadcount() {
		return goodreadcount;
	}

	public void setGoodreadcount(int goodreadcount) {
		this.goodreadcount = goodreadcount;
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

	public int getGoodcommended() {
		return goodcommended;
	}

	public void setGoodcommended(int goodcommended) {
		this.goodcommended = goodcommended;
	}

	public int getGoodspec() {
		return goodspec;
	}

	public void setGoodspec(int goodspec) {
		this.goodspec = goodspec;
	}

	public int getGoodtop() {
		return goodtop;
	}

	public void setGoodtop(int goodtop) {
		this.goodtop = goodtop;
	}
	
	
}
