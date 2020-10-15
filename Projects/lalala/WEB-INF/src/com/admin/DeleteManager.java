package com.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.datalink.DataLink;

public class DeleteManager extends HttpServlet {

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
		String UPDATE_SQL = "update user set power = ? where name = ?";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(true);
			PreparedStatement ps = con.prepareStatement(UPDATE_SQL);
			ps.setString(1,"000");
			ps.setString(2,username);
			ps.executeUpdate();
			ps.close();
			con.close();
			session.setAttribute("modifyUserPowermsg","取消该用户理员资格成功!");			username = new String(username.getBytes("gb2312"),"ISO8859_1");
		    response.sendRedirect("usermodify.jsp?numberpage=2&username="+username);
		    return;
	    }catch(Exception e){
	    	System.out.print("取消管理员资格失败");
	    }
	    out.println("<script language=javascript>");
		out.println("alert('操作失败!');history.back();");
		out.println("</script>");
		out.flush();
		out.close();
	}

}
