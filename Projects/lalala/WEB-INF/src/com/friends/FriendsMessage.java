package com.friends;

public class FriendsMessage {
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
	
	private String friend_name;
	public void setFriend_name(String friend_name){
		this.friend_name = friend_name;
	}
	public String getFriend_name(){
		return this.friend_name;
	}
	
	private String friends_type;
	public void setFriends_type(String friends_type){
		this.friends_type = friends_type;
	}
	public String getFriends_type(){
		return this.friends_type;
	}
	
	private String photo;
	public void setPhoto(String photo){
		this.photo = photo;
	}
	public String getPhoto(){
		return this.photo;
	}
}
