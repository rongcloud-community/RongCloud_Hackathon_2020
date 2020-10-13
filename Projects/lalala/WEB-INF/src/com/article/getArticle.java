package com.article;

import com.datalink.DataLink;
import java.util.List;
import java.util.ArrayList;
import java.sql.*;

import com.article.Article;

public class getArticle {
	private List articleList = new ArrayList();
	private String SELECT_SQL = "select * from article where speaker = ?";
	private String SELECTSQL = "select * from article where speaker = ? and type = ?";
	
	private int intpagecount; //总页数
	private int intpagesize = 15;  //一页显示的记录数
	private int introwcount; //记录总数
	private int i = 0;
	
	public List getArticleMessage(String username,int intpage,String arttype){
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = null;
			ResultSet rs = null;
			if(arttype.equals("全部")){
				ps = con.prepareStatement(SELECT_SQL);
				ps.setString(1,username);
			}
			else{
				ps = con.prepareStatement(SELECTSQL);
				ps.setString(1,username);
				ps.setString(2,arttype);
			}
			rs = ps.executeQuery();
//			获取记录总数
			rs.last();
			introwcount = rs.getRow();
			 //计算总页数
			intpagecount = (introwcount+intpagesize-1)/intpagesize;
			 //调整待显示的页码
			 if(intpage>intpagecount){
			    intpage = intpagecount;
			 }
			 if(intpagecount>0){
			    //将记录数定位到待显示页的最后一条记录上
				  if(intpagecount==1){
				     rs.absolute(introwcount);
				  }
				  else{    //有多页的情况
				     rs.absolute(introwcount-(intpage-1)*intpagesize);
				  }
				 //显示数据
				 i = 0;  
			    while(i<intpagesize&&!rs.isBeforeFirst()){
			    	Article art = new Article();
			    	art.setArticle_no(rs.getInt("article_no"));
			    	art.setTitle(rs.getString("title"));
			    	art.setSpeaker(rs.getString("speaker"));
			    	art.setSent_time(rs.getString("sent_time"));
			    	art.setReply_num(rs.getInt("reply_num"));
			    	art.setClick_num(rs.getInt("click_num"));
			    	art.setContent(rs.getString("content"));
			    	art.setType(rs.getString("type"));
			    	articleList.add(art);
			    	rs.previous();
			    	i++;
			    }
			 }  
			rs.close();
			ps.close();
			con.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return articleList;
	}
	
	public int getPageSize(String username,String arttype){
		int pageall = 1;
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = null;
			ResultSet rs = null;
			if(arttype.equals("全部")){
				ps = con.prepareStatement(SELECT_SQL);
				ps.setString(1,username);
			}
			else{
				ps = con.prepareStatement(SELECTSQL);
				ps.setString(1,username);
				ps.setString(2,arttype);
			}
			rs = ps.executeQuery();
//			获取记录总数
			rs.last();
			pageall = rs.getRow();
			 //计算总页数
			pageall = (pageall+intpagesize-1)/intpagesize;
		}catch(SQLException e){
			System.out.print(e.getMessage());
		}
		return pageall;
	}
}