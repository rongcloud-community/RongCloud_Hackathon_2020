package com.regedit;

import javax.servlet.*;
import javax.servlet.http.*;

import java.io.*;
import java.sql.*;
import com.datalink.DataLink;
import com.user.UserData;

public class RegeditConfirm extends HttpServlet{
	public void doPost(HttpServletRequest request,HttpServletResponse response)throws IOException,ServletException{
		response.setContentType("text/html;charset=gb2312");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		String name = request.getParameter("user_name");
	    String password = request.getParameter("password");
		String email = request.getParameter("email");
		String www = request.getParameter("www");  
		String qq = request.getParameter("qq");	
		String sex = request.getParameter("sex");
		String face = request.getParameter("face");
		String signname = request.getParameter("signname");
		
		String url = "";
		try{
			DataLink datalink = new DataLink();
			Connection con = datalink.getConnection();
			PreparedStatement ps = null;
			ResultSet rs = null;
			String SELECT_SQL = "select * from user where name = ?";
			String INSERT_SQL = "insert into user (name,password,e_mail,QQ,www,sex,face,signname) values(?,?,?,?,?,?,?,?)";
			con.setAutoCommit(false);
			ps = con.prepareStatement(SELECT_SQL);
			ps.setString(1, name);
			rs = ps.executeQuery();
			if(rs.next()){
				try{
					rs.close();
					ps.close();
					con.close();
				}catch(SQLException e3){
					out.print("数据库关闭失败!");
				}
				out.print("<script language='javascript'>");
				out.print("alert('用户名已存在!请重新注册:');history.back();");
				out.print("</script>");
			}
			else{
				ps = con.prepareStatement(INSERT_SQL);
				ps.setString(1, name);
				ps.setString(2, password);
				ps.setString(3, email);
				ps.setString(4, qq);
				ps.setString(5,www);
				ps.setString(6,sex);
				ps.setString(7,face);
				ps.setString(8,signname);
				ps.executeUpdate();
				con.commit();
				try{
					rs.close();
					ps.close();
					con.close();
				}catch(SQLException e2){
					out.print("数据库关闭失败!");
				}
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
		}catch(SQLException err){
			System.out.print(err.getMessage());
		}
	}
	
	public void doGet(HttpServletRequest request,HttpServletResponse response)throws IOException,ServletException{
		doPost(request,response);
	}
	
	public UserData getUserData(String name){
		UserData userdata = new UserData();		
		try{
			DataLink datalink = new DataLink();
			Connection conn = datalink.getConnection();
			Statement stmt=conn.createStatement();
			ResultSet RS=null;
			RS = stmt.executeQuery("select * from user where name = '" + name + "'");
			if(RS.next()){
				userdata.setName(RS.getString("name"));
			    userdata.setPassword(RS.getString("password"));
			    userdata.setQq(RS.getString("QQ"));
			    userdata.setEmail(RS.getString("e_mail"));
			    userdata.setWww(RS.getString("www"));
			    userdata.setRegeditTime(RS.getString("registertime"));
			    userdata.setSendArticle(RS.getInt("sent_article"));
			    userdata.setReplyNum(RS.getInt("reply_num"));
			}
		}catch(SQLException e){
			System.out.print(e.getMessage());
			return null;
		}
		return userdata;
	}
}
