package com.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.datalink.DataLink;

public class DeleteUser extends HttpServlet {

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request,response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=gb2312");
		PrintWriter out = response.getWriter();
		String username = request.getParameter("username");
		try{
			deleteUserData(username);
		    deleteArticle(username);
		    deleteFriends(username);
		    deleteImages(username);
		    deleteReArticle(username);
		    response.sendRedirect("user.jsp?numberpage=2");
		    return;
	    }catch(Exception e){
	    	System.out.print("É¾³ýÊ§°Ü");
	    }
	    out.println("<script language=javascript>");
		out.println("alert('É¾³ýÊ§°Ü!');history.back();");
		out.println("</script>");
		out.flush();
		out.close();
	}
	
	public boolean deleteUserData(String username){
		try{
	    	//UserData userdata = new UserData();
	    	DataLink datalink = new DataLink();
		    Connection con = datalink.getConnection();
		    con.setAutoCommit(true);
		    Statement stmt=con.createStatement(); 
			stmt.executeUpdate("delete from user where name ='"+ username +"'");
		    stmt.close();
		    con.close();
		}catch(SQLException e){
	    	System.out.print("É¾³ýÓÃ»§ÃûÐÅÏ¢Ê§°Ü");
	    	return false;
	    }
		return true;
	}
	
	public boolean deleteArticle(String username){
		try{
	    	//UserData userdata = new UserData();
	    	DataLink datalink = new DataLink();
		    Connection con = datalink.getConnection();
		    con.setAutoCommit(true);
		    Statement stmt=con.createStatement(); 
			stmt.executeUpdate("delete from article where speaker ='"+ username +"'");
		    stmt.close();
		    con.close();
	    }catch(SQLException e){
	    	System.out.print("É¾³ýÎÄÕÂÊ§°Ü");
	    	return false;
	    }
	    return true;
	}
	
	public boolean deleteFriends(String username){
		try{
	    	//UserData userdata = new UserData();
	    	DataLink datalink = new DataLink();
		    Connection con = datalink.getConnection();
		    con.setAutoCommit(true);
		    Statement stmt=con.createStatement(); 
			stmt.executeUpdate("delete from friends where user_name ='"+ username +"' or friend_name ='"+username+"'");
		    stmt.close();
		    con.close();
	    }catch(SQLException e){
	    	System.out.print("É¾³ýºÃÓÑÊ§°Ü");
	    	return false;
	    }
	    return true;
	}
	
	public boolean deleteImages(String username){
		try{
	    	//UserData userdata = new UserData();
	    	DataLink datalink = new DataLink();
		    Connection con = datalink.getConnection();
		    con.setAutoCommit(true);
		    Statement stmt=con.createStatement(); 
			stmt.executeUpdate("delete from images where user_name ='"+ username +"'");
		    stmt.close();
		    con.close();
	    }catch(SQLException e){
	    	System.out.print("É¾³ýÍ¼Æ¬Ê§°Ü");
	    	return false;
	    }
	    return true;
	}
	
	public boolean deleteReArticle(String username){
		try{
	    	//UserData userdata = new UserData();
	    	DataLink datalink = new DataLink();
		    Connection con = datalink.getConnection();
		    con.setAutoCommit(true);
		    Statement stmt=con.createStatement(); 
			stmt.executeUpdate("delete from re_article where re_name ='"+ username +"'");
		    stmt.close();
		    con.close();
	    }catch(SQLException e){
	    	System.out.print("É¾³ýÎÄÕÂ»Ø¸´Ê§°Ü");
	    	return false;
	    }
	    return true;
	}
}
