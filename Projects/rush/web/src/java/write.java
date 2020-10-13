/*
 * write.java 用户写信息页面
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

public class write
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    //判断session是否为空
    HttpSession session = request.getSession();
    String username = (String) session.getAttribute("username");
    String action = request.getParameter("action");
    if (username == null) {
      response.sendRedirect("index.html");
      return;
    }
    try {
      ResultSet rs = null;
      condb conn = new condb();
      String sql = "select username from userinfo where username!='" + username +
          "'";
      rs = conn.executeQuery(sql);
      if (null == action || !"fasong".equals(action)) {

        out.println("\r\n");
        out.println("<style type=\"text/css\">\r\n");
        out.println("<!--\r\n");
        out.println("body,td,th {\r\n");
        out.println("\tfont-size: 12px;\r\n");
        out.println("}\r\n");
        out.println("\r\n");
        out.println("-->\r\n");
        out.println("</style>\r\n");
        out.println("<script>\r\n");
        out.println("function yanzheng()/*验证函数*/ \r\n");
        out.println("{ \r\n");
        out.println("if(document.form1.user.value==\"0\")/*验证用户名是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请选择用户\"); \r\n");
        out.println("document.form1.user.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println(" if(document.form1.zhuti.value==\"\")/*验证主题是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"没有主题\"); \r\n");
        out.println("document.form1.zhuti.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.neir.value==\"\")/*验证内容是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请输入内容\"); \r\n");
        out.println("document.form1.neir.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("\r\n");
        out.println("else \r\n");
        out.println("{ \r\n");
        out.println("return true; \r\n");
        out.println("} \r\n");
        out.println("} \r\n");
        out.println("</script><body>\r\n");
        out.println("<form action=\"write.do?action=fasong\" method=\"post\" name=\"form1\" onSubmit=\"return yanzheng();\">\r\n");
        out.println(
            "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
        out.println("  <tr>\r\n");
        out.println(
            "    <td width=\"50\" height=\"25\" align=\"right\">收件人:</td>\r\n");
        out.println("    <td><label>\r\n");
        out.println("      <select name=\"user\">\r\n");
        out.println("        <option value=\"0\">选择用户</option>\r\n");
        while (rs.next()) {
          out.println("        <option value=\"" + rs.getString("username") +
                      "\">" + rs.getString("username") + "</option>\r\n");
        }

        out.println("      </select>\r\n");
        out.println("    </label></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td height=\"25\" align=\"right\">主题:</td>\r\n");
        out.println("    <td><input type=\"text\" name=\"zhuti\" /></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td height=\"25\" align=\"right\">内容:</td>\r\n");
        out.println("    <td><textarea name=\"neir\" cols=\"50\" rows=\"10\" >内容信息</textarea></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td height=\"50\" align=\"center\">附件:</td>\r\n");
        out.println("    <td><iframe src=\"upload.do\" height=\"50\" scrolling=\"no\" frameborder=\"0\"  ></iframe></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td>&nbsp;</td>\r\n");
        out.println("    <td><label>\r\n");
        out.println(
            "      <input type=\"submit\" name=\"Submit\" value=\"发送\">\r\n");
        out.println(
            "      <input type=\"reset\" name=\"Submit2\" value=\"重置\">\r\n");
        out.println("    </label></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("</table>\r\n");
        out.println("</form>\r\n");
        out.println("\r\n");
        out.println("</body>");
      }
      else {
        String user = request.getParameter("user");
        String zhuti = request.getParameter("zhuti");
        String neir = request.getParameter("neir");
        //下面是执行写信息的SQL插入语句,等你
        String insql = "insert into messageinfo(messageTitle, messageSender, messageIncept, messageContents)" +
            " values ('" + zhuti + "','" + username + "','" + user + "','" +
            neir + "')";
        String historysql =
            "insert into listinfo(messageTitle, messageSender, messageIncept)" +
            " values ('" + zhuti + "','" + username + "','" + user + "')";
        String outsql = "UPDATE userInfo SET  outnum=outnum+1 WHERE username='" +
            username + "'"; //统计发送信息数
        String incousql = "UPDATE userInfo SET  innum=innum+1 WHERE username='" +
            user + "'"; //统计接受信息数
        conn.executeUpdate(insql);
        conn.executeUpdate(historysql);
        conn.executeUpdate(outsql);
        conn.executeUpdate(incousql);
        out.println("<script>\r\n");
        out.println("{ \r\n");
        out.println("alert(\"恭喜你，发送成功\"); \r\n");
        out.println("window.document.location.href=\"write.do\";\r\n");
        out.println("}\r\n");
        out.println("</script>");

      }

    }
    catch (SQLException e) {

    }

  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    doGet(request, response);
  }
}
