package com.friends;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.datalink.DataLink;

public class FriendsSearch extends HttpServlet {

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
		String friendsname = request.getParameter("friendsname");
		String isfound = "no";
		//out.print(username+friendsname);
		try{
			DataLink datalink = new DataLink();
			Connection conn = datalink.getConnection();
			Statement stmt=conn.createStatement();
			ResultSet rs=null;
			rs = stmt.executeQuery("select * from user where name = '" + friendsname + "'");
			if(rs.next()){
				isfound = "yes";
			}
			else{
				isfound = "no";
			}
			rs.close();
			stmt.close();
			conn.close();
		}catch(SQLException e){
			System.out.print("²Ù×÷³ö´í!");
			//return null;
		}
		//out.flush();
		//out.close();
		//request.setAttribute("isfound",isfound);
		//RequestDispatcher requestDispatcher = request.getRequestDispatcher("friendsadd.jsp?username="+username+"&numberpage=4&friendsname="+friendsname);
		//requestDispatcher.forward(request,response);
		username = new String(username.getBytes("gb2312"),"ISO8859_1");
		friendsname = new String(friendsname.getBytes("gb2312"),"ISO8859_1");
		response.sendRedirect("friendsadd.jsp?username="+username+"&numberpage=4&friendsname="+friendsname+"&isfound="+isfound);
		return;
	}

}
