package com.upload;

import java.sql.*;

import com.datalink.DataLink;

public class UploadImageDAO {
	private String INSERT_SQL = "insert into images (user_name,image_path,message,image_type) values(?,?,?,?)";
	public boolean InsertImage(String url,String name,String message,String image_type){
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = con.prepareStatement(INSERT_SQL);
			con.setAutoCommit(false);
			ps.setString(1, name);
			ps.setString(2,url);
			ps.setString(3,message);
			ps.setString(4,image_type);
			ps.executeUpdate();	
			con.commit();
			try{
				ps.close();
				con.close();
			}catch(SQLException e2){
				System.out.print("Êý¾Ý¿â¹Ø±ÕÊ§°Ü!");
				return false;
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return false;
		}
		return true;
	}
}
