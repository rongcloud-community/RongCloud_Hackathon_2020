package com.liuyan;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import com.liuyan.LiuYanData;
import com.datalink.DataLink;

public class GetLiuYan {
	List liuyanList = new ArrayList();
	private String SELECT_SQL = "select * from liuyan";
	private String SELECT_SQL1 = "SELECT * FROM liuyan ORDER BY id DESC";
	private String SELECT_SQL2 = "select * from liuyan where id = ?";
	private int pagesize = 6;
	private int introwcount; //记录总数
	public List getAllLiuYan(int page){
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
				rs.absolute((page-1)*pagesize+1);
				rs.previous();
			}
			if(rs.next()){
				int i = 0;
				while(i<pagesize&&!rs.isAfterLast()){
					LiuYanData message = new LiuYanData();
					message.setId(rs.getInt("id"));
					message.setName(rs.getString("name"));
					message.setContent(rs.getString("content"));
					message.setInsert_time(rs.getString("insert_time"));
					liuyanList.add(message);
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
		return liuyanList;
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
	
	public LiuYanData getMessageDetailById(int id){
		LiuYanData message = new LiuYanData();
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
				message.setName(rs.getString("name"));
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
