package com.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.datalink.DataLink;
//import com.user.UserData;

public class AdminLogin extends HttpServlet {

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
		HttpSession session = request.getSession();
		String name = request.getParameter("login_name");
		String password = request.getParameter("password");
		String url = "";
		String power = "";
	    try{
	    	//UserData userdata = new UserData();
	    	DataLink datalink = new DataLink();
		    Connection conn = datalink.getConnection();
		    Statement stmt=conn.createStatement(); 
		    ResultSet RS=null; 
		    RS = stmt.executeQuery("select * from user where name = '" + name + "' and password='" + password +"'" );
		    if(RS.next()){
		    	  power = RS.getString("power");
			      //userdata.setName(RS.getString("name"));
			      //userdata.setPassword(RS.getString("password"));
			      //userdata.setQq(RS.getString("QQ"));
			      //userdata.setEmail(RS.getString("e_mail"));
			      //userdata.setWww(RS.getString("www"));
			      //userdata.setRegeditTime(RS.getString("registertime"));
			      //userdata.setSendArticle(RS.getInt("sent_article"));
			      //userdata.setReplyNum(RS.getInt("reply_num"));
			      //userdata.setPower(RS.getString("power"));
			      RS.close();
			      stmt.close();
			      conn.close();
			      if(power.equals("111")){
			    	  session.setMaxInactiveInterval(15*60);			      
				      session.setAttribute("currentLoginAdminName",name);
				      session.setAttribute("adminpower","一般管理员");
				      //name = new String(name.getBytes("gb2312"),"ISO8859_1");
				      url = "adminindex.jsp";
				      //url=new String(url.getBytes("gb2312"),"ISO8859_1");
				      response.sendRedirect(url);
				      return;
			      }	
			      else if(power.equals("1111")){		
			    	  session.setAttribute("currentLoginUserDataName",name);
				      session.setAttribute("currentLoginAdminName",name);
				      session.setAttribute("adminpower","超级管理员");
				      //name = new String(name.getBytes("gb2312"),"ISO8859_1");
				      url = "adminindex.jsp";
				      //url=new String(url.getBytes("gb2312"),"ISO8859_1");
				      response.sendRedirect(url);
				      return;
			      }
			      else{
			    	out.println("<script language=javascript>");
			  		out.println("alert('你的登录密码不正确!请重新登录:');history.back();");
			  		out.println("</script>");
			  		out.flush();
			  		out.close();
			      }
			}
		    else{
		    	RS.close();
		    	stmt.close();
			    conn.close();
			 }
	    }catch(SQLException e){
	    	System.out.print("数据库链接错误");
	    }
	    out.println("<script language=javascript>");
		out.println("alert('你的登录密码不正确!请重新登录:');history.back();");
		out.println("</script>");
		out.flush();
		out.close();
	}

}
