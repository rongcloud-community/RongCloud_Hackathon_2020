/*
 * in_message.java
 *
 * Created on 2007年5月27日, 下午12:34
 */

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class in_message
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    HttpSession session = request.getSession();
    String username = (String) session.getAttribute("username");
    String id = request.getParameter("id");
    int Id = Integer.parseInt(id);
    if (username == null) {
      response.sendRedirect("index.html");
      return;
    }
    try {
      ResultSet rs = null;
      String sql = "select * from messageinfo where messageid=" + Id + "";
      condb conn = new condb();
      rs = conn.executeQuery(sql);
      rs.next();

      out.println("\r\n");
      out.println("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n");
      out.println("<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n");
      out.println("<head>\r\n");
      out.println(
          "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\" />\r\n");
      out.println("\r\n");
      out.println("<style type=\"text/css\">\r\n");
      out.println("<!--\r\n");
      out.println(".STYLE1 {color: #FF0000}\r\n");
      out.println("body {\r\n");
      out.println("\tmargin-left: 0px;\r\n");
      out.println("\tmargin-top: 0px;\r\n");
      out.println("}\r\n");
      out.println("body,td,th {\r\n");
      out.println("\tfont-size: 12px;\r\n");
      out.println("}\r\n");
      out.println("-->\r\n");
      out.println("</style>\r\n");

      out.println("</head>\r\n");
      out.println("\r\n");
      out.println("<body>\r\n");
      out.println(
          "<table width=\"550\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
      out.println("  <tr>\r\n");
      out.println(
          "    <td width=\"70\" height=\"25\" align=\"right\">发件人:</td>\r\n");
      out.println("    <td><label>" + rs.getString("messagesender") +
                  "</label></td>\r\n");
      out.println("  </tr>\r\n");
      out.println("    <tr>\r\n");
      out.println("    <td height=\"25\" align=\"right\">发送时间:</td>\r\n");
      out.println("    <td><font color=\"#FF0000\">" +
                  rs.getString("messagesendtime").substring(0, 16) +
                  "</font></td>\r\n");
      out.println("  </tr>\r\n");
      out.println("  <tr>\r\n");
      out.println("    <td height=\"25\" align=\"right\">主题:</td>\r\n");
      out.println("    <td>" + rs.getString("messagetitle") + "</td>\r\n");
      out.println("  </tr>\r\n");
      out.println("  <tr>\r\n");
      out.println("    <td height=\"25\" align=\"right\">内容:</td>\r\n");
      out.println(
          "    <td><textarea readonly name=\"neir\" cols=\"50\" rows=\"20\"  >" +
          rs.getString("messagecontents") + "</textarea></td>\r\n");
      out.println("  </tr>\r\n");
      out.println("  <tr>\r\n");
      out.println("    <td height=\"25\" align=\"right\">附件:</td>\r\n");
      out.println("    <td><a href=\"Download.do?name=" +
                  rs.getString("filesrc") + "\">下载</a></td>\r\n");
      out.println("  </tr>\r\n");
      out.println("    <tr>\r\n");
      out.println("    <td height=\"25\" align=\"right\">&nbsp;</td>\r\n");
      out.println("    <td><a href=\"myinfor.do\">返回</a>&nbsp;&nbsp;<a href=\"write.do\" target=\"_self\">回复信息</a>&nbsp;&nbsp;<a href=\"../delete.do?id=" +
                  rs.getInt("messageid") + "\">删除该信息</a></td>\r\n");
      out.println("  </tr>\r\n");
      out.println("\r\n");
      out.println("</table>\r\n");
      out.println("</body>\r\n");
      out.println("</html>\r\n");
      out.println("\r\n");
    }
    catch (Exception e) {

    }

  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    doGet(request, response);
  }
}
