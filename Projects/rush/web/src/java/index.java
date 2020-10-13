/*
 * index.java 首页验证
 *
 * Created on 2007年5月23日, 下午8:43
 */

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class index
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    //取得用户名和密码
    String username = request.getParameter("username");
    String password = request.getParameter("userpassword");
    HttpSession session = request.getSession();
    try {
      String sql = "select * from userinfo where username='" + username +
          "' and userpassword='" + password + "'";
      ResultSet rs = null;
      condb conn = new condb();
      rs = conn.executeQuery(sql);
      //如果不存在，就返回首页
      if (!rs.next()) {
        out.println("<script>\r\n");
        out.println("{ \r\n");
        out.println("alert(\"对不起，你输入的用户名和密码有误，或者不存在，请与管理员联系\"); \r\n");
        out.println("window.document.location.href=\"index.html\";\r\n");
        out.println("}\r\n");
        out.println("</script>");
        //response.sendRedirect("index.html");
        //return;
      }
      else {
        User user = new User(username);
        String useradmin = rs.getString("admin"); //取得权限
        session.setAttribute("username", username);
        session.setAttribute("user", user);
        //session.setAttribute("user",username);

        if ("1".equals(useradmin)) {
          response.sendRedirect("admin/admin_index.do");
          return;
        }
        else {
          response.sendRedirect("user_index.do");
          return;
        }

      }

    }
    catch (Exception e) {

    }

  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    doGet(request, response);
  }
}
