package com.center.model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.center.dto.UserDTO;
import com.center.util.DealString;
import com.center.vo.UserVO;
import com.mysql.jdbc.Connection;

public class UserManager {

	private Connection conn;
	
	public UserManager(Connection conn) {
		// TODO Auto-generated constructor stub
		this.conn = conn;
	}

	public int regist(UserDTO userdto) throws SQLException {
		String registuser = "insert into user(USER_NAME,USER_PSW,USER_TIME,USER_EMAIL) value(?,?,?,?)";
		PreparedStatement registpre = conn.prepareStatement(registuser);
		registpre.setString(1, userdto.getUsername());
		registpre.setString(2, userdto.getUserpsw());
		registpre.setString(3, userdto.getUsertime());
		registpre.setString(4, userdto.getUseremail());
		int i = registpre.executeUpdate();

		registuser = null;
		return i;
		// TODO Auto-generated method stub
		
	}

	public UserVO login(UserDTO userdto) throws SQLException {
		// TODO Auto-generated method stub
		String login = "select USER_LASTLOGINTIME from user where USER_NAME=? and USER_PSW=?";
		
		PreparedStatement prelogin = conn.prepareStatement(login);
		
		prelogin.setString(1, userdto.getUsername());
		prelogin.setString(2, userdto.getUserpsw());
		ResultSet resultlogin = prelogin.executeQuery();
		UserVO uservo = null;
		
		while(resultlogin.next()){
			String lastlogintime = resultlogin.getString("USER_LASTLOGINTIME");
			
			String updatelogincount = "update user set USER_LASTLOGINTIME = '"+DealString.getDateTime()+"',USER_LOGINCOUNT = USER_LOGINCOUNT + 1 where USER_NAME = ? AND USER_PSW = ?";
			PreparedStatement prelogincount = conn.prepareStatement(updatelogincount);
			prelogincount.setString(1, userdto.getUsername());
			prelogincount.setString(2, userdto.getUserpsw());	
			int time = prelogincount.executeUpdate();

			
			if(time == 1){
			String loginuser = "select ID,USER_NAME,USER_PSW,USER_EMAIL,USER_LOGINCOUNT,USER_LASTLOGINTIME,USER_LEVER from user where USER_NAME=? and USER_PSW=?";
			PreparedStatement preloginuser = conn.prepareStatement(loginuser);
			preloginuser.setString(1, userdto.getUsername());
			preloginuser.setString(2, userdto.getUserpsw());		
			ResultSet resultuserlogin = preloginuser.executeQuery();
			
				while(resultuserlogin.next()){
					uservo = new UserVO();
					uservo.setUserid(resultuserlogin.getInt("ID"));
					uservo.setUsername(resultuserlogin.getString("USER_NAME"));
					uservo.setUserlogincount(resultuserlogin.getInt("USER_LOGINCOUNT"));
					uservo.setLastlogintime(lastlogintime);
					uservo.setThislogintime(resultuserlogin.getString("USER_LASTLOGINTIME"));
					uservo.setUserlevle(resultuserlogin.getInt("USER_LEVER"));
				}
			}
		}
		
		return uservo;
	}

}
