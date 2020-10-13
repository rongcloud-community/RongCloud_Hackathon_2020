package com.admin;

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

public class ModifyMessage extends HttpServlet {

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
		//String name = (String)session.getAttribute("currentLoginAdminName");
		String msgid = request.getParameter("msgid");
		if(msgid == null){
			response.sendRedirect("showmessage.jsp?numberpage=5");
			return;
		}
		int id = Integer.parseInt(msgid);
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		title = title.replaceAll("\\\"","'");
		content = content.replaceAll("\\\"","'");
		if(!MessageDAO(title,content,id)){
			out.println("<script language=javascript>");
			out.println("alert('修改信息失败!');history.back();");
			out.println("</script>");
			out.flush();
			out.close();
		}
		//session.setAttribute("sendMessageOK","发布成功");
		response.sendRedirect("viewmessage.jsp?numberpage=5&id="+id);
		return;
	}
	
	public boolean MessageDAO(String title,String content,int id){
		String INSERT_SQL = "update message set title = ?,content = ? where id = ?";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			con.setAutoCommit(false);
			ps = con.prepareStatement(INSERT_SQL);
			ps.setString(1,title);
		    ps.setString(2,content);
		    ps.setInt(3,id);
		    ps.executeUpdate();
			con.commit();
			try{
				ps.close();
				con.close();
			}catch(SQLException e2){
				System.out.print("数据库关闭失败!");
				return false;
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
		}
		return true;
	}
}
