package com.admin;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.datalink.DataLink;
import com.user.UserData;

public class UserMessage {
	private List userdataItem = new ArrayList();
	private int intpagesize = 25;  //一页显示的记录数
	private int intpagecount = 1; //总页数
	private int introwcount = 1; //记录总数
	
	public List getAllUserMessage(int intpage,String usertype){
		int i = 0;
		String SELECT_SQL = "select * from user";
		if(usertype.equals("")||usertype.equals("全部")){
			SELECT_SQL = "select * from user";
		}
		if(usertype.equals("普通管理员")){
			SELECT_SQL = "select * from user where power='111'";
		}
		if(usertype.equals("超级管理员")){
			SELECT_SQL = "select * from user where power='1111'";
		}
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = con.prepareStatement(SELECT_SQL);
			ResultSet rs = null;
			rs = ps.executeQuery();
			if(intpage>getPageSize()){
				intpage = getPageSize();
			}
			rs.absolute((intpage-1)*intpagesize+1);		
			i = 0;  
		    while(i<intpagesize&&!rs.isAfterLast()){
		    	UserData alldata = new UserData();
		    	alldata.setId(rs.getInt("id"));
		    	alldata.setName(rs.getString("name"));
		    	alldata.setPassword(rs.getString("password"));
		    	alldata.setSex(rs.getString("sex"));
		    	alldata.setFace(rs.getString("face"));
		    	alldata.setQq(rs.getString("QQ"));
		    	alldata.setEmail(rs.getString("e_mail"));
		    	alldata.setWww(rs.getString("www"));
		    	alldata.setPower(rs.getString("power"));
		    	alldata.setRegeditTime(rs.getString("registertime"));
		    	alldata.setSendArticle(rs.getInt("sent_article"));
		    	alldata.setReplyNum(rs.getInt("reply_num"));
		    	alldata.setSignname(rs.getString("signname"));
		    	userdataItem.add(alldata);
		    	rs.next();
		    	i++;
		    } 
			rs.close();
			ps.close();
			con.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return userdataItem;
	}
	
	public int getPageSize(){
		String SELECT_SQL1 = "select * from user";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = con.prepareStatement(SELECT_SQL1);
			ResultSet rs = null;
			rs = ps.executeQuery();
			rs.last();
			introwcount = rs.getRow();
			 //计算总页数
			intpagecount = (introwcount+intpagesize-1)/intpagesize;
			rs.close();
			ps.close();
			con.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
		}
		return intpagecount;
	}
}
