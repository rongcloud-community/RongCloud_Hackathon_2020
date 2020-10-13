package com.article;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.datalink.DataLink;

public class ModifyArticle extends HttpServlet {

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
		String strarticle_no = request.getParameter("article_no");
		int article_no = Integer.parseInt(strarticle_no);
		String speaker = request.getParameter("currentusername");
		String title = request.getParameter("title");
		String type = request.getParameter("type");
		String content = request.getParameter("content");
		title = title.replaceAll("\\\"","'");
		type = type.replaceAll("\\\"","'");
		content = content.replaceAll("\\\"","'");
		String UPDATE_SQL = "update article set title = ?,type = ?,content = ? where article_no = ?";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			con.setAutoCommit(false);
			ps = con.prepareStatement(UPDATE_SQL);
			ps.setString(1,title);
		    ps.setString(2,type);
		    ps.setString(3,content);
		    ps.setInt(4,article_no);		    
		    ps.executeUpdate();
			con.commit();
			try{
				ps.close();
				con.close();
			}catch(SQLException e2){
				session.setAttribute("dealforummsg","修改文章失败!");
				out.print("数据库关闭失败!");
				out.print("<script language='javascript'>");
				out.print("alert('操作出错');history.back();");
				out.print("</script>");
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
		}
		session.setAttribute("dealforummsg","修改文章成功!");
		speaker = new String(speaker.getBytes("gb2312"),"ISO8859_1");
		response.sendRedirect("forum.jsp?username="+speaker+"&&numberpage=2&&serial="+strarticle_no);
		return;
	}

}
