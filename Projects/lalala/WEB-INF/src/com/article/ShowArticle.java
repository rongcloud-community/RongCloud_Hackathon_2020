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
		int intpagecount; //��ҳ��
		int intpagesize = 1;  //һҳ��ʾ�ļ�¼��
		int introwcount; //��¼����
		int i = 0;
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = con.prepareStatement(SELECT_SQLS[1]);
			ResultSet rs = null;
			ps.setInt(1,article_no);
			rs = ps.executeQuery();
//			��ȡ��¼����
			rs.last();
			introwcount = rs.getRow();
			 //������ҳ��
			intpagecount = (introwcount+intpagesize-1)/intpagesize;
			 //��������ʾ��ҳ��
			 if(intpage>intpagecount){
			    intpage = intpagecount;
			 }
			 if(intpagecount>0){
			    //����¼����λ������ʾҳ�����һ����¼��
				  if(intpagecount==1){
				     rs.absolute(introwcount);
				  }
				  else{    //�ж�ҳ�����
				     rs.absolute(introwcount-(intpage-1)*intpagesize);
				  }
				 //��ʾ����
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
		int intpagecount; //��ҳ��
		int intpagesize = 1;  //һҳ��ʾ�ļ�¼��
		int introwcount; //��¼����
		int i = 0;
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = con.prepareStatement(SELECT_SQLS[1]);
			ResultSet rs = null;
			ps.setInt(1,article_no);
			rs = ps.executeQuery();
//			��ȡ��¼����
			rs.last();
			pageall = rs.getRow();
			 //������ҳ��
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
