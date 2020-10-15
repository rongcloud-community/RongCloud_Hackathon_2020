package com.article;

import com.datalink.DataLink;
import java.util.List;
import java.util.ArrayList;
import java.sql.*;

public class ArticleType {
	private String SELECT_SQL = "SELECT DISTINCT type FROM article WHERE speaker = ?";
	private List items = new ArrayList();
	public List getType(String username){
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
				items.add(rs.getString("type"));
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
