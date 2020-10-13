package com.article.add;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.datalink.DataLink;

public class ReArticleAdd {
	
	public void addReplyNum(int article_no){
		String UPDATE_SQL = "update article set reply_num = reply_num+1 where article_no = ?";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(false);
			PreparedStatement ps = con.prepareStatement(UPDATE_SQL);
			ps.setInt(1,article_no);
			ps.executeUpdate();
			con.commit();
			ps.close();
			con.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
		}
	}
}
