/*
 * myinfor.java 管理员收件信息
 *
 * Created on 2007年5月23日, 下午7:16
 */

package admin;

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class myinfor
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    HttpSession session = request.getSession();
    String username = (String) session.getAttribute("username");
    if (username == null) {
      response.sendRedirect("../index.html");
      return;
    }
    try {
      ResultSet rs = null;
      condb conn = new condb();
      String sql = "select * from messageinfo where messageincept='" + username +
          "'";
      rs = conn.executeQuery(sql);
      rs.next();

      out.println("\r\n");
      /*   out.println("<SCRIPT LANGUAGE=\"javascript\"> \r\n");
             out.println("\r\n");
             out.println("function openwin() \r\n");
             out.println("{ \r\n");
             out.println("\tvar id=document.form1.a1.value;\r\n");
             out.println("OpenWindow=window.open (\"in_message.do?show=id\", \"newwindow\", \"height=500, width=550,top=150,left=200, toolbar=no, menubar=no, scrollbars=yes,  resizable=no, location=no, status=no\") \r\n");
             out.println("} \r\n");
             out.println("</SCRIPT>");*/
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
      out.println(
          "    <td width=\"50\" height=\"25\" align=\"center\">ID</td>\r\n");
      out.println("    <td width=\"250\" align=\"center\">主题</td>\r\n");
      out.println("    <td width=\"80\" align=\"center\">发件人</td>\r\n");
      out.println("    <td width=\"150\" align=\"center\">发送时间</td>\r\n");
      out.println("    <td align=\"center\">点击查看</td>\r\n");
      out.println("  </tr>\r\n");
      int i = 0; //定义用户信息数
      while (rs.next()) {
        out.println("  <tr>\r\n");
        out.println("    <td bgcolor=\"#9BCDFF\" align=\"center\">" + (++i) +
                    "</td>\r\n");
        out.println("    <td bgcolor=\"#9BCDFF\" align=\"center\">" +
                    rs.getString("messagetitle") + "</td>\r\n");
        out.println("    <td bgcolor=\"#9BCDFF\" align=\"center\">" +
                    rs.getString("messagesender") + "</td>\r\n");
        out.println(
            "    <td bgcolor=\"#9BCDFF\" align=\"center\"><font color=\"red\">" +
            rs.getString("messagesendtime").substring(0, 16) +
            "</font></td>\r\n");
        out.println(
            "    <td bgcolor=\"#9BCDFF\" align=\"center\"><a href=\"inbox.do?id=" +
            rs.getInt("messageid") + "\">阅读</a></td>\r\n");
        out.println("  </tr>\r\n");

        out.println("  <tr>\r\n");
        out.println("    <td >&nbsp;</td>\r\n");
        out.println("    <td >&nbsp;</td>\r\n");
        out.println("    <td >&nbsp;</td>\r\n");
        out.println("    <td >&nbsp;</td>\r\n");
        out.println("    <td >&nbsp;</td>\r\n");

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
