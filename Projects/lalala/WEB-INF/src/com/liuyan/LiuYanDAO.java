package com.liuyan;

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
import javax.servlet.http.HttpSession;

import com.article.add.ReArticleAdd;
import com.datalink.DataLink;

public class LiuYanDAO extends HttpServlet {

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

		response.setContentType("text/html;charset=gb2312");
		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();
		String strserial = request.getParameter("strserial");
		int article_no = 1;
		if(strserial != null){
		    article_no = Integer.parseInt(strserial);
		}
		String name = request.getParameter("re_name");
		String content = request.getParameter("content");
		String INSERT_SQL = "insert into liuyan (name,content) values(?,?)";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			con.setAutoCommit(false);
			ps = con.prepareStatement(INSERT_SQL);
			ps.setString(1,name);
			ps.setString(2,content);
			ps.executeUpdate();
			con.commit();
			try{
				ps.close();
				con.close();
			}catch(SQLException e2){
				session.setAttribute("liuyanmsg","发表留言失败!");
				out.print("数据库关闭失败!");
				out.print("<script language='javascript'>");
				out.print("alert('操作出错');history.back();");
				out.print("</script>");
			}
			ReArticleAdd replyadd = new ReArticleAdd();
			replyadd.addReplyNum(article_no);
		}catch(SQLException e){
			System.out.print(e.getMessage());
			session.setAttribute("liuyanmsg","发表留言失败!");
			out.print("数据库关闭失败!");
			out.print("<script language='javascript'>");
			out.print("alert('操作出错');history.back();");
			out.print("</script>");
		}
		session.setAttribute("liuyanmsg","发表留言成功!");
		response.sendRedirect("newliuyan.jsp");
		return;
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
		doGet(request,response);
	}

}
