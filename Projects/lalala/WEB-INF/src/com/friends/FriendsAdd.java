package com.friends;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.datalink.DataLink;

public class FriendsAdd extends HttpServlet {

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
		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();
		String username = request.getParameter("username");
		String friendsname = request.getParameter("friendsname");
		String INSERT_SQL = "insert into friends (user_name,friend_name) values(?,?)";
		try{
			if(isOK(friendsname,username)){
				DataLink datalink = new DataLink();
				Connection con = datalink.getConnection();
				con.setAutoCommit(false);
				PreparedStatement ps = null;
				ps = con.prepareStatement(INSERT_SQL);
				ps.setString(1,username);
				ps.setString(2,friendsname);
				ps.executeUpdate();
				con.commit();
				try{
					ps.close();
					con.close();
				}catch(SQLException e2){
					session.setAttribute("addfriendsmsg","加好友失败!");
					out.print("数据库关闭失败!");
				}
			}
			else{
				session.setAttribute("addfriendsmsg","好友 "+friendsname+" 已存在!");
				username = new String(username.getBytes("gb2312"),"ISO8859_1");
				response.sendRedirect("friends.jsp?username="+username+"&numberpage=4");
				return;
			}
		}catch(SQLException e){
			session.setAttribute("addfriendsmsg","加好友失败!");
			System.out.print("操作出错!");
			//return null;
		}
		session.setAttribute("addfriendsmsg","成功将 "+friendsname+" 加为你的好友!");
		username = new String(username.getBytes("gb2312"),"ISO8859_1");
		response.sendRedirect("friends.jsp?username="+username+"&numberpage=4");
		return;
	}
	
	public boolean isOK(String friend_name,String user_name){
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			Statement stmt=con.createStatement();
			ResultSet rs=null;
			rs = stmt.executeQuery("select * from friends where friend_name='"+friend_name + "'and user_name='"+user_name+"'");
			if(rs.next()){
				return false;
			}
			try{
				rs.close();
				stmt.close();
				con.close();
			}catch(SQLException e2){
				System.out.print("数据库关闭失败!");
				return false;
			}
		}catch(SQLException e){
			System.out.print("操作出错!");
			return false;
		}
		return true;
	}

}
