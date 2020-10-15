/**
 * 
 */
package com.user;

import com.datalink.DataLink;

import java.util.List;
import java.util.ArrayList;
import java.sql.*;

import com.user.UserData;

/**
 * @author Liangst
 *
 */
public class TopTen {
	private List topTenUserList = new ArrayList();
	private String SELECT_SQL = "SELECT * FROM user ORDER BY click_num DESC";
	private int pagesize = 10;
	public List getTopTen(){
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			ResultSet rs = null;
			ps = con.prepareStatement(SELECT_SQL);
			rs = ps.executeQuery();
			int i = 0;
			rs.next();
			while(i<pagesize&&!rs.isAfterLast()){
				UserData message = new UserData();
				message.setId(rs.getInt("id"));
				message.setName(rs.getString("name"));
				message.setPassword(rs.getString("password"));
				message.setQq(rs.getString("QQ"));
				message.setEmail(rs.getString("e_mail"));
				message.setWww(rs.getString("www"));
				message.setPower(rs.getString("power"));
				message.setRegeditTime(rs.getString("registertime"));
				message.setSendArticle(rs.getInt("sent_article"));
				message.setReplyNum(rs.getInt("reply_num"));
				message.setFace(rs.getString("face"));
				message.setSex(rs.getString("sex"));
				message.setSignname(rs.getString("signname"));
				message.setClick_num(rs.getInt("click_num"));
				topTenUserList.add(message);
				rs.next();
				i++;
			}
			try{
				rs.close();
				ps.close();
				con.close();
			}catch(SQLException e2){
				System.out.print("Êý¾Ý¿â¹Ø±ÕÊ§°Ü!");
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return topTenUserList;
	}
}
