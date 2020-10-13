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

import com.article.add.SendArticleAdd;
import com.datalink.DataLink;

public class SendMessage extends HttpServlet {

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
		String name = (String)session.getAttribute("currentLoginAdminName");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		title = title.replaceAll("\\\"","'");
		content = content.replaceAll("\\\"","'");
		if(!MessageDAO(name,title,content)){
			out.println("<script language=javascript>");
			out.println("alert('发布信息失败!');history.back();");
			out.println("</script>");
			out.flush();
			out.close();
		}
		//out.print(content);
		//out.flush();
		//out.close();
		session.setAttribute("dealmsg","发布信息成功!");
		response.sendRedirect("showmessage.jsp?numberpage=5");
		return;
	}
	
	public boolean MessageDAO(String name,String title,String content){
		String INSERT_SQL = "insert into message (admin_name,title,content) values(?,?,?)";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			con.setAutoCommit(false);
			ps = con.prepareStatement(INSERT_SQL);
			ps.setString(1,name);
		    ps.setString(2,title);
		    ps.setString(3,content);
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
