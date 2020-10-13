package com.user;

import java.sql.*;

import com.datalink.DataLink;

public class VisitAdd {
	public void addClickNum(String username){
		String UPDATE_SQL = "update user set click_num = click_num+1 where name = ?";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(false);
			PreparedStatement ps = con.prepareStatement(UPDATE_SQL);
			ps.setString(1,username);
			ps.executeUpdate();
			con.commit();
			ps.close();
			con.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
		}
	}
}
