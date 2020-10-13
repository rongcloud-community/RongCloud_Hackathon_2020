package com.admin;

public class MessageDetail {
	private int id;
	public void setId(int id){
		this.id = id;
	}
	public int getId(){
		return this.id;
	}
	
	private String admin_name;
	public void setAdmin_name(String admin_name){
		this.admin_name = admin_name;
	}
	public String getAdmin_name(){
		return this.admin_name;
	}
	
	private String title;
	public void setTitle(String title){
		this.title = title;
	}
	public String getTitle(){
		return this.title;
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
