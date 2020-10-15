package com.upload;

import com.datalink.DataLink;
import java.util.List;
import java.util.ArrayList;
import java.sql.*;

public class ImagesType {
	private String SELECT_SQL = "SELECT DISTINCT image_type FROM images WHERE user_name = ?";
	private List items = new ArrayList();
	public List getImagesType(String username){
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = null;
			ResultSet rs = null;
			ps = con.prepareStatement(SELECT_SQL);
			ps.setString(1,username);
			rs = ps.executeQuery();
			while(rs.next()){
				items.add(rs.getString("image_type"));
			}
			rs.close();
			ps.close();
			con.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return items;
	}
}
