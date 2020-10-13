package com.upload.image;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;

import com.upload.image.ImageData;
import com.datalink.DataLink;

public class ImageDetail {
	List imageItems = new ArrayList();
	private String SELECT_SQL = "select * from images where user_name = ?";
	private String SELECTSQL = "select * from images where user_name = ? and image_type = ?";
	
	public List getImageDetail(String user_name,String imagestype){
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			ResultSet rs = null;
			PreparedStatement ps = null;			
			if(imagestype.equals("È«²¿")){
				ps = con.prepareStatement(SELECT_SQL);
				ps.setString(1,user_name);
			}
			else{
				ps = con.prepareStatement(SELECTSQL);
				ps.setString(1,user_name);
				ps.setString(2,imagestype);
			}
			rs = ps.executeQuery();
			while(rs.next()){
				ImageData images = new ImageData();
				images.setId(rs.getInt("id"));
				images.setUser_name(rs.getString("user_name"));
				images.setImage_path(rs.getString("image_path"));
				images.setMessage(rs.getString("message"));
				imageItems.add(images);
			}
			rs.close();
			ps.close();
			con.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return imageItems;
	}
}
