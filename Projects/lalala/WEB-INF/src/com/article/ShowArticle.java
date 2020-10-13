package com.article;

import com.datalink.DataLink;
import java.util.List;
import java.util.ArrayList;
import java.sql.*;

import com.article.ReArticle;
import com.article.Article;
import com.article.add.ViewArticleAdd;

public class ShowArticle {
	private List ReArtList = new ArrayList();
	private String SELECT_SQLS[] = {"select * from article where article_no = ?",
			"select * from re_article where article_no = ?"};
	
	public Article getArticleByNo(int article_no){
		Article art = new Article();
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = con.prepareStatement(SELECT_SQLS[0]);
			ResultSet rs = null;
			ps.setInt(1,article_no);
			rs = ps.executeQuery();
			if(rs.next()){				
		    	art.setArticle_no(rs.getInt("article_no"));
		    	art.setTitle(rs.getString("title"));
		    	art.setSpeaker(rs.getString("speaker"));
		    	art.setSent_time(rs.getString("sent_time"));
		    	art.setReply_num(rs.getInt("reply_num"));
		    	art.setClick_num(rs.getInt("click_num"));
		    	art.setContent(rs.getString("content"));
		    	art.setType(rs.getString("type"));
			}
			ViewArticleAdd viewAdd = new ViewArticleAdd();
			viewAdd.addViewArticle(article_no);
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return art;
	}
	
	public List getReArt(int article_no,int intpage){
		int pageall = 1;
		int intpagecount; //总页数
		int intpagesize = 1;  //一页显示的记录数
		int introwcount; //记录总数
		int i = 0;
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = con.prepareStatement(SELECT_SQLS[1]);
			ResultSet rs = null;
			ps.setInt(1,article_no);
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
			    	ReArticle ReArt = new ReArticle();
			    	ReArt.setId(rs.getInt("id"));
			    	ReArt.setArticle_no(rs.getInt("article_no"));
			    	ReArt.setRe_name(rs.getString("re_name"));
			    	ReArt.setInsert_time(rs.getString("insert_time"));
			    	ReArt.setContent(rs.getString("content"));
			    	ReArtList.add(ReArt);
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
		return ReArtList;
	}
	
	public int getPageSize(int article_no){
		int pageall = 1;
		int intpagecount; //总页数
		int intpagesize = 1;  //一页显示的记录数
		int introwcount; //记录总数
		int i = 0;
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = con.prepareStatement(SELECT_SQLS[1]);
			ResultSet rs = null;
			ps.setInt(1,article_no);
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
	
	public List getReArtByArticle_no(int article_no){
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = con.prepareStatement(SELECT_SQLS[1]);
			ResultSet rs = null;
			ps.setInt(1,article_no);
			rs = ps.executeQuery();
			while(rs.next()){
				ReArticle ReArt = new ReArticle();
		    	ReArt.setId(rs.getInt("id"));
		    	ReArt.setArticle_no(rs.getInt("article_no"));
		    	ReArt.setRe_name(rs.getString("re_name"));
		    	ReArt.setInsert_time(rs.getString("insert_time"));
		    	ReArt.setContent(rs.getString("content"));
		    	ReArtList.add(ReArt);
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return ReArtList;
	}
	
}
