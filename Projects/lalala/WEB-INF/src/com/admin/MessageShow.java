package com.admin;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.datalink.DataLink;
import com.admin.MessageDetail;

public class MessageShow {
	private List messageList = new ArrayList();
	private String SELECT_SQL = "select * from message";
	private String SELECT_SQL1 = "SELECT * FROM message ORDER BY id DESC";
	private String SELECT_SQL2 = "select * from message where id = ?";
	private int pagesize = 9;
	private int introwcount; //记录总数
	
	public List getMessage(int page){
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			ResultSet rs = null;
			ps = con.prepareStatement(SELECT_SQL1);
			rs = ps.executeQuery();
			
			int pSize = getPageSize();
			if(page>pSize){
				page = pSize;
			}
			if(pSize>1){
				//rs.absolute((page-1)*pagesize+1);
				rs.absolute((page-1)*pagesize+1);
				rs.previous();
			}
			//if(pSize==1){
			//rs.next()
			//}
			
			int i = 0;
			if(rs.next()){
				while(i<pagesize&&!rs.isAfterLast()){
					MessageDetail message = new MessageDetail();
					message.setId(rs.getInt("id"));
					message.setAdmin_name(rs.getString("admin_name"));
					message.setTitle(rs.getString("title"));
					message.setContent(rs.getString("content"));
					message.setInsert_time(rs.getString("insert_time"));
					messageList.add(message);
					rs.next();
					i++;
				}
			}
			
			try{
				rs.close();
				ps.close();
				con.close();
			}catch(SQLException e2){
				System.out.print("数据库关闭失败!");
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return messageList;
	}
	
	public int getPageSize(){
		int pageall = 1;
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			ResultSet rs = null;
			ps = con.prepareStatement(SELECT_SQL);
			rs = ps.executeQuery();
			rs.last();
			pageall = rs.getRow();
			pageall = (pageall+pagesize-1)/pagesize;
			try{
				rs.close();
				ps.close();
				con.close();
			}catch(SQLException e2){
				System.out.print("数据库关闭失败!");
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return 1;
		}
		return pageall;
	}
	
	public MessageDetail getMessageDetailById(int id){
		MessageDetail message = new MessageDetail();
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			ResultSet rs = null;
			ps = con.prepareStatement(SELECT_SQL2);
			ps.setInt(1,id);
			rs = ps.executeQuery();
			if(rs.next()){
				message.setId(rs.getInt("id"));
				message.setAdmin_name(rs.getString("admin_name"));
				message.setTitle(rs.getString("title"));
				message.setContent(rs.getString("content"));
				message.setInsert_time(rs.getString("insert_time"));
			}
			try{
				rs.close();
				ps.close();
				con.close();
			}catch(SQLException e2){
				System.out.print("数据库关闭失败!");
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return message;
	}
	
}
