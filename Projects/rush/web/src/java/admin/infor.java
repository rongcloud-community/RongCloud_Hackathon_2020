/*
 * infor.java 查看所有信息页面
 *
 * Created on 2007年5月23日, 下午7:20
 */

package admin;

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class infor
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    try {
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
      out.println(
          "    <td width=\"50\" height=\"25\" align=\"center\">ID</td>\r\n");
      out.println("    <td width=\"250\" align=\"center\">主题</td>\r\n");
      out.println("    <td width=\"80\" align=\"center\">发件人</td>\r\n");
      out.println("\t<td width=\"80\" align=\"center\">收件人</td>\r\n");
      out.println("   \r\n");
      out.println("    <td align=\"center\">点击操作</td>\r\n");
      out.println("  </tr>\r\n");
      out.println("  <tr>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("  </tr>\r\n");
      out.println("  <tr>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("  </tr>\r\n");
      out.println("  <tr>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("  </tr>\r\n");
      out.println("  <tr>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("    <td>&nbsp;</td>\r\n");
      out.println("  </tr>\r\n");
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
