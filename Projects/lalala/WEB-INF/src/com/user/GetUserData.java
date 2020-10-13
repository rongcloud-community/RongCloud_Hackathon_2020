package com.user;

import java.sql.*;

import com.datalink.DataLink;
import com.user.UserData;

public class GetUserData {
	public UserData getCurrentUserData(String name){
		UserData userdata = new UserData();		
		try{
			DataLink datalink = new DataLink();
			Connection conn = datalink.getConnection();
			Statement stmt=conn.createStatement();
			ResultSet RS=null;
			RS = stmt.executeQuery("select * from user where name = '" + name + "'");
			if(RS.next()){
				userdata.setName(RS.getString("name"));
			    userdata.setPassword(RS.getString("password"));
			    userdata.setQq(RS.getString("QQ"));
			    userdata.setEmail(RS.getString("e_mail"));
			    userdata.setWww(RS.getString("www"));
			    userdata.setPower(RS.getString("power"));
			    userdata.setRegeditTime(RS.getString("registertime"));
			    userdata.setSendArticle(RS.getInt("sent_article"));
			    userdata.setReplyNum(RS.getInt("reply_num"));
			    userdata.setSex(RS.getString("sex"));
			    userdata.setFace(RS.getString("face"));
			    userdata.setSignname(RS.getString("signname"));
			    userdata.setClick_num(RS.getInt("click_num"));
			}
			RS.close();
			stmt.close();
			conn.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return userdata;
	}
}
