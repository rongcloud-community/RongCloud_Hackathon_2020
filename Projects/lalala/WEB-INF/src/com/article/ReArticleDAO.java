package com.article;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.sql.*;

import com.datalink.DataLink;
import com.article.add.ReArticleAdd;

public class ReArticleDAO extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public ReArticleDAO() {
		super();
	}


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
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		String username = request.getParameter("username");
		String strserial = request.getParameter("strserial");
		int article_no = 1;
		if(strserial != null){
		    article_no = Integer.parseInt(strserial);
		}
		String re_name = request.getParameter("re_name");
		String content = request.getParameter("content");
		String INSERT_SQL = "insert into re_article (article_no,re_name,content) values(?,?,?)";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			con.setAutoCommit(false);
			ps = con.prepareStatement(INSERT_SQL);
			ps.setInt(1,article_no);
			ps.setString(2,re_name);
			ps.setString(3,content);
			ps.executeUpdate();
			con.commit();
			try{
				ps.close();
				con.close();
			}catch(SQLException e2){
				out.print("数据库关闭失败!");
				out.print("<script language='javascript'>");
				out.print("alert('操作出错');history.back();");
				out.print("</script>");
			}
			ReArticleAdd replyadd = new ReArticleAdd();
			replyadd.addReplyNum(article_no);
		}catch(SQLException e){
			System.out.print(e.getMessage());
		}
		username = new String(username.getBytes("gb2312"),"ISO8859_1");
		response.sendRedirect("forum.jsp?username="+username+"&&serial="+strserial);
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

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occure
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
