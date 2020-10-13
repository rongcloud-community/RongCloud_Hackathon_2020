package com.article.add;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.datalink.DataLink;

public class SendArticleAdd {
	public void addSendNum(String username){
		String UPDATE_SQL = "update user set sent_article = sent_article+1 where name = ?";
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
