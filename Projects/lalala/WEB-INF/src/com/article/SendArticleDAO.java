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
import com.user.UserData;
import com.article.add.SendArticleAdd;

public class SendArticleDAO extends HttpServlet {


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
		String speaker = request.getParameter("currentusername");
		String title = request.getParameter("title");
		String type = request.getParameter("type");
		String content = request.getParameter("content");
		title = title.replaceAll("\\\"","'");
		type = type.replaceAll("\\\"","'");
		content = content.replaceAll("\\\"","'");
		String INSERT_SQL = "insert into article (title,speaker,content,type) values(?,?,?,?)";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			con.setAutoCommit(false);
			ps = con.prepareStatement(INSERT_SQL);
			ps.setString(1,title);
		    ps.setString(2,speaker);
		    ps.setString(3,content);
		    ps.setString(4,type);
		    ps.executeUpdate();
			con.commit();
			SendArticleAdd sendarticleadd = new SendArticleAdd();
			sendarticleadd.addSendNum(speaker);
			try{
				ps.close();
				con.close();
			}catch(SQLException e2){
				session.setAttribute("dealforummsg","发表文章失败!");
				out.print("数据库关闭失败!");
				out.print("<script language='javascript'>");
				out.print("alert('操作出错');history.back();");
				out.print("</script>");
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
		}
		int artid = getAllArtId();
		session.setAttribute("dealforummsg","发表文章成功!");
		speaker = new String(speaker.getBytes("gb2312"),"ISO8859_1");
		response.sendRedirect("forum.jsp?username="+speaker+"&&numberpage=2&&serial="+artid);
		//response.sendRedirect("forumindex.jsp?username="+speaker+"&&numberpage=2");
		return;
	}
	
	public int getAllArtId(){
		int aId = 1;
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			Statement stmt = null;
			ResultSet rs = null;
			stmt = con.createStatement();
			rs = stmt.executeQuery("SELECT max(article_no) as maxid FROM article");
			if(rs.next()){
				aId = rs.getInt("maxid");
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return 1;
		}
		return aId;
	}
	
}
