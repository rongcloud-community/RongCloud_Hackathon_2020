/*
 * online.java 在线用户列表
 *
 * Created on 2007年5月23日, 下午6:28
 */

import inc.User;
import inc.UserList;
import java.io.*;
import java.net.*;
import java.sql.*;
import java.util.Enumeration;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class online
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
    try {
      ResultSet rs = null;
      condb conn = new condb();
      UserList ul = UserList.getInstance();
      Enumeration<String> enums = ul.getUserList();

      out.println("\r\n");
      out.println("<style type=\"text/css\">\r\n");
      out.println("<!--\r\n");
      out.println("body,td,th {\r\n");
      out.println("\tfont-size: 12px;\r\n");
      out.println("}\r\n");
      out.println("-->\r\n");
      out.println("</style><body>\r\n");
      out.println(
          "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
      out.println("  <tr>\r\n");
      out.println("    <td width=\"50\" align=\"center\">ID</td>\r\n");
      out.println("    <td width=\"100\" align=\"center\">用户名</td>\r\n");
      out.println("    <td width=\"100\" align=\"center\">姓名</td>\r\n");
      out.println("    <td width=\"100\" align=\"center\">EMAIL</td>\r\n");
      out.println("    <td width=\"100\" align=\"center\">电话</td>\r\n");
      out.println(" \r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("  </tr>\r\n");
      int i = 0;
      while (enums.hasMoreElements()) {

        String sql = "select * from userinfo where username='" +
            enums.nextElement() + "'";
        rs = conn.executeQuery(sql);
        rs.next();
        out.println("  <tr>\r\n");
        out.println("    <td align=\"center\">" + (++i) + "</td>\r\n");
        out.println("    <td align=\"center\">" + rs.getString("username") +
                    "</td>\r\n");
        out.println("    <td align=\"center\">" + rs.getString("zsname") +
                    "</td>\r\n");
        out.println("    <td align=\"center\">" + rs.getString("useremail") +
                    "</td>\r\n");
        out.println("    <td align=\"center\">" + rs.getString("usertel") +
                    "</td>\r\n");
        out.println("  </tr>\r\n");
      }
      out.println("</table>\r\n");
      out.println("</body>");

    }
    catch (Exception e) {

    }

  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    doGet(request, response);
  }
}
