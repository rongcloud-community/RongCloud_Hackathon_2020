package com.friends;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.datalink.DataLink;
import com.friends.FriendsMessage;

public class GetFriends {
	List items = new ArrayList();
	private String face = "";
	
	public List getFriendsName(String username){
		try{
			DataLink datalink = new DataLink();
			Connection conn = datalink.getConnection();
			Statement stmt=conn.createStatement();
			ResultSet rs=null;
			rs = stmt.executeQuery("select * from friends where user_name = '" + username + "'");
			while(rs.next()){
				FriendsMessage fmsg = new FriendsMessage();
				fmsg.setId(rs.getInt("id"));
				fmsg.setUser_name(rs.getString("user_name"));
				fmsg.setFriend_name(rs.getString("friend_name"));
				fmsg.setFriends_type(rs.getString("friends_type"));
				fmsg.setPhoto(getFace(rs.getString("friend_name")));
				items.add(fmsg);
			}
			rs.close();
			stmt.close();
			conn.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return items;
	}	
	
	public FriendsMessage getSearchFriend(String friend_name){
		FriendsMessage fmg = new FriendsMessage();
		try{
			DataLink datalink = new DataLink();
			Connection conn = datalink.getConnection();
			Statement stmt=conn.createStatement();
			ResultSet rs=null;
			rs = stmt.executeQuery("select * from user where name = '" + friend_name + "'");
			if(rs.next()){
				//fmg.setId(rs.getInt("id"));
				fmg.setUser_name(rs.getString("name"));
				fmg.setFriend_name(friend_name);
				//fmg.setFriends_type(rs.getString("friends_type"));
				fmg.setPhoto(rs.getString("face"));
			}
			rs.close();
			stmt.close();
			conn.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return fmg;
	}
	
	public String getFace(String friend_name){
		try{
			DataLink datalink = new DataLink();
			Connection conn = datalink.getConnection();
			Statement stmt=conn.createStatement();
			ResultSet RS=null;
			RS = stmt.executeQuery("select face from user where name = '" + friend_name + "'");
			if(RS.next()){
				face = RS.getString("face");
			}
			RS.close();
			stmt.close();
			conn.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return this.face;
	}
}
