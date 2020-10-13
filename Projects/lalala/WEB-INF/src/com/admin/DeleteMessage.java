package com.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.datalink.DataLink;

public class DeleteMessage extends HttpServlet {

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
		if(strid == null){
			session.setAttribute("dealmsg","删除信息失败!");
			response.sendRedirect("showmessage.jsp?numberpage=5");
			return;
		}
		int id = Integer.parseInt(strid);
		if(!deleteMessage(id)){
			out.println("<script language=javascript>");
			out.println("alert('删除信息失败!');history.back();");
			out.println("</script>");
			out.flush();
			out.close();
		}
		session.setAttribute("dealmsg","删除信息成功!");
		response.sendRedirect("showmessage.jsp?numberpage=5");
		return;
	}
	
	public boolean deleteMessage(int id){
		String DELETE_SQL = "delete from message where id = ?";
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
