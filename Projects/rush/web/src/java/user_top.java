/*
 * user_top.java 用户中心顶部页面
 *
 * Created on 2007年5月23日, 下午6:28
 */

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class user_top
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    HttpSession session = request.getSession();
    String username = (String) session.getAttribute("username");
    if (username == null) {
      response.sendRedirect("index.html");
      return;
    }

    out.println("\r\n");
    out.println(
        "<link href=\"css/css.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n");
    out.println("\r\n");
    out.println(
        "<div align=\"center\" class=\"top\">企业信息交流系统(CICS):<span class=\"red\">欢迎" +
        username + "的到来</span>\r\n");
    out.println("</div>\r\n");
    out.println("\r\n");

  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    doGet(request, response);
  }
}
