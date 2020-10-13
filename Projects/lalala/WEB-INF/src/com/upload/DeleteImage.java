package com.upload;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.datalink.DataLink;

public class DeleteImage extends HttpServlet {

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
		String strid = request.getParameter("id");
		if(strid==null){
			session.setAttribute("deleteimagemsg","É¾³ýÍ¼Æ¬Ê§°Ü!");
			out.print("<script language='javascript'>");
			out.print("alert('É¾³ýÊ§°Ü!');history.back();");
			out.print("</script>");
			out.flush();
			out.close();
		}
		int id = Integer.parseInt(strid);
		String username = request.getParameter("username");
		if(!deleteImageById(id)){
			session.setAttribute("deleteimagemsg","É¾³ýÍ¼Æ¬Ê§°Ü!");
			out.print("<script language='javascript'>");
			out.print("alert('É¾³ýÊ§°Ü!');history.back();");
			out.print("</script>");
			out.flush();
			out.close();
		}
		session.setAttribute("deleteimagemsg","É¾³ýÍ¼Æ¬³É¹¦!");
		username = new String(username.getBytes("gb2312"),"ISO8859_1");
		response.sendRedirect("photo.jsp?username="+username+"&&numberpage=3");
		return;
	}
	
	public boolean deleteImageById(int id){
		String DELETE_SQL = "delete from images where id = ?";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			con.setAutoCommit(false);
			ps = con.prepareStatement(DELETE_SQL);
			ps.setInt(1,id);
			ps.executeUpdate();
			con.commit();
			try{
				ps.close();
				con.close();
			}catch(SQLException e2){
				System.out.print(e2.getMessage());
				return false;
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return false;			
		}
		return true;
	}

}
