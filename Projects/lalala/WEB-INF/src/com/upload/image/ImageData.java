package com.upload.image;

public class ImageData {
	private int id;
	public void setId(int id){
		this.id = id;
	}
	public int getId(){
		return this.id;
	}
	
	private String user_name;
	public void setUser_name(String user_name){
		this.user_name = user_name;
	}
	public String getUser_name(){
		return this.user_name;
	}
	
	private String image_path;
	public void setImage_path(String image_path){
		this.image_path = image_path;
	}
	public String getImage_path(){
		return this.image_path;
	}
	
	private String message;
	public void setMessage(String message){
		this.message = message;
	}
	public String getMessage(){
		return this.message;
	}
	
	private String image_type;
	public void setImage_type(String image_type){
		this.image_type = image_type;
	}
	public String getImage_type(){
		return this.image_type;
	}
}
