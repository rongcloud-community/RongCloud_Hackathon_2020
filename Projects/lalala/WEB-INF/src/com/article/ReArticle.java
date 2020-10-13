package com.article;

public class ReArticle {
	private int id;
	public void setId(int id){
		this.id = id;
	}
	public int getId(){
		return this.id;
	}
	
	private int article_no;
	public void setArticle_no(int article_no){
		this.article_no = article_no;
	}
	public int getArticle_no(){
		return this.article_no;
	}
	
	private String re_name;
	public void setRe_name(String re_name){
		this.re_name = re_name;
	}
	public String getRe_name(){
		return this.re_name;
	}
	
	private String content;
	public void setContent(String content){
		this.content = content;
	}
	public String getContent(){
		return this.content;
	}
	
	private String insert_time;
	public void setInsert_time(String insert_time){
		this.insert_time = insert_time;
	}
	public String getInsert_time(){
		return this.insert_time;
	}
}
