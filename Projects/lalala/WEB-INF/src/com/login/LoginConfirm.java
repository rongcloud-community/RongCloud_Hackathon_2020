package com.login;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import com.datalink.DataLink;
import com.user.UserData;

public class LoginConfirm extends HttpServlet{
	
	public void doPost(HttpServletRequest request,HttpServletResponse response)throws IOException,ServletException{
		response.setContentType("text/html;charset=gb2312");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		String name = request.getParameter("login_name");
		String password = request.getParameter("password");
		String url = "";
	    try{
	    	UserData userdata = new UserData();
	    	DataLink datalink = new DataLink();
		    Connection conn = datalink.getConnection();
		    Statement stmt=conn.createStatement(); 
		    ResultSet RS=null; 
		    RS = stmt.executeQuery("select * from user where name = '" + name + "' and password='" + password +"'" );
		    if(RS.next()){
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
			      session.setMaxInactiveInterval(15*60);
			      //session.setAttribute("username",name);			      
			      session.setAttribute("currentLoginUserDataName",name);
			      //RequestDispatcher requestDispatcher = request.getRequestDispatcher("pass.jsp");
				  //requestDispatcher.forward(request,response);
			      name = new String(name.getBytes("gb2312"),"ISO8859_1");
			      url = "pass.jsp?username="+name;
				  //url=new String(url.getBytes("gb2312"),"ISO8859_1");
			      response.sendRedirect(url);
			      return;
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
	} 
	
    public void doGet(HttpServletRequest request,HttpServletResponse response)throws IOException,ServletException{
		doPost(request,response);
	}

}
