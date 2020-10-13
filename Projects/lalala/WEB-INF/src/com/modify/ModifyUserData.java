package com.modify;

import javax.servlet.*;
import javax.servlet.http.*;

import java.io.*;
import java.sql.*;
import com.datalink.DataLink;
//import com.user.UserData;

public class ModifyUserData extends HttpServlet{
	public void doPost(HttpServletRequest request,HttpServletResponse response)throws IOException,ServletException{
		response.setContentType("text/html;charset=gb2312");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		String username = request.getParameter("username");
	    //String oldpassword = request.getParameter("reoldpassword");
	    String newpassword = request.getParameter("newpassword");
		String email = request.getParameter("email");
		String www = request.getParameter("www");  
		String qq = request.getParameter("qq");	
		String sex = request.getParameter("sex");
		String face = request.getParameter("face");
		String signname = request.getParameter("signname");
		String UPDATE_SQL = "";
		if("".equals(newpassword)){
		    UPDATE_SQL = "update user set e_mail = ?,QQ = ?,www = ?,sex = ?,face = ?,signname = ? where name = ?";
		   }
		else{
		    UPDATE_SQL = "update user set password = ?,e_mail = ?,QQ = ?,www = ?,sex = ?,face = ?,signname = ? where name = ?";
		}
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			con.setAutoCommit(false);
			PreparedStatement ps = con.prepareStatement(UPDATE_SQL);
			if("".equals(newpassword)){
				ps.setString(1,email);
				ps.setString(2,qq);
				ps.setString(3,www);
				ps.setString(4,sex);
				ps.setString(5,face);
				ps.setString(6,signname);
				ps.setString(7,username);
				
			 }
			 else{
				 ps.setString(1,newpassword);
				 ps.setString(2,email);
				 ps.setString(3,qq);
				 ps.setString(4,www);
				 ps.setString(5,sex);
			     ps.setString(6,face);
				 ps.setString(7,signname);
				 ps.setString(8,username);
				 
			 }
			 ps.executeUpdate();
			 con.commit();
			 ps.close();
		     con.close();
		}catch(SQLException e){
			System.out.print(e.getMessage());
			out.print("<script language='javascript'>");
		    out.print("alert('修改失败!');");
		    out.print("</script>");
		    out.flush();
		    out.close();
		}
		session.setAttribute("modifymsg","修改个人信息成功!");
		//RequestDispatcher requestDispatcher = request.getRequestDispatcher("modify_userdata.jsp");
	    //requestDispatcher.forward(request,response);
	    username = new String(username.getBytes("gb2312"),"ISO8859_1");
	    response.sendRedirect("modify_userdata.jsp?username="+username+"&numberpage=5");
	    return;
	}
	
	public void doGet(HttpServletRequest request,HttpServletResponse response)throws IOException,ServletException{
		doPost(request,response);
	}
}
