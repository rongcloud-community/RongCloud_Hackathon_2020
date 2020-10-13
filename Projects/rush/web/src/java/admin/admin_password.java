/*
 * admin_password.java 用户密码修改页面
 *
 * Created on 2007年5月23日, 下午7:09
 */
package admin;

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class admin_password
    extends HttpServlet {

  public void doGet(HttpServletRequest request,
                    HttpServletResponse response) throws ServletException,
      IOException {
    request.setCharacterEncoding("utf-8");
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    HttpSession session = request.getSession();
    String username = (String) session.getAttribute("username");
    String poste = request.getParameter("poste");
    if (username == null) {
      response.sendRedirect("../index.html");
      return;
    }
    try {

      ResultSet rs = null;
      condb conn = new condb();

      if (null == poste || !"xiugai".equals(poste)) {

        String sql = "select * from userinfo where username='" + username + "'";

        rs = conn.executeQuery(sql);
        rs.next();
        out.println("\r\n");
        out.println("<html>\r\n");
        out.println("<head>\r\n");
        out.println("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\" /><style type=\"text/css\">\r\n");
        out.println("<!--\r\n");
        out.println("body,td,th {\r\n");
        out.println("\tfont-size: 12px;\r\n");
        out.println("}\r\n");
        out.println("-->\r\n");
        out.println("</style></head>\r\n");
        out.println("<script>\r\n");
        out.println("function yanzheng()/*验证函数*/ \r\n");
        out.println("{ \r\n");
        out.println(
            "if(document.form1.oldmima.value==\"\")/*验证原始密码是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请输入原始密码\"); \r\n");
        out.println("document.form1.oldmima.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println(
            " if(document.form1.newmima.value==\"\")/*验证密码是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请输入新密码\"); \r\n");
        out.println("document.form1.newmima.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println(
            "if(document.form1.newmima1.value==\"\")/*验证密码是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请再输入一次新密码\"); \r\n");
        out.println("document.form1.newmima1.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.newmima.value!=document.form1.newmima1.value)/*验证二次密码是否相等*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"两次密码不相等，请重新输入\"); \r\n");
        out.println("document.form1.newmima1.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("\r\n");
        out.println("else \r\n");
        out.println("{ \r\n");
        out.println("return true; \r\n");
        out.println("} \r\n");
        out.println("} \r\n");
        out.println("</script>\r\n");
        out.println("<body>\r\n");
        out.println("<div align=\"center\">\r\n");
        out.println("<form action=\"admin_password.do?poste=xiugai\" method=\"post\" name=\"form1\" onSubmit=\"return yanzheng();\">\r\n");
        out.println(
            "<table width=\"70%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
        out.println(" <tr>\r\n");
        out.println(
            "    <td width=\"120\" height=\"20\" align=\"right\"></td>\r\n");
        out.println("    <td>用户密码修改</td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println(
            "    <td width=\"120\" height=\"25\" align=\"right\">原始密码:</td>\r\n");
        out.println("    <td>\r\n");
        out.println(
            "      <input type=\"password\" name=\"oldmima\" />\r\n");
        out.println("   </td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td height=\"25\" align=\"right\">新密码:</td>\r\n");
        out.println(
            "    <td><input type=\"password\" name=\"newmima\" /></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println(
            "    <td height=\"25\" align=\"right\">再输入一次新密码:</td>\r\n");
        out.println(
            "    <td><input type=\"password\" name=\"newmima1\" /></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td>&nbsp;</td>\r\n");
        out.println("    <td>\r\n");
        out.println(
            "      <input type=\"submit\" name=\"Submit\" value=\"确定\" />\r\n");
        out.println("\t  　\r\n");
        out.println(
            "\t  <input type=\"reset\" name=\"Submit\" value=\"重置\" />\r\n");
        out.println("   </td>\r\n");
        out.println("  </tr>\r\n");
        out.println("</table>\r\n");
        out.println("</form>\r\n");
        out.println("</div>\r\n");
        out.println("</body>\r\n");
        out.println("</html>\r\n");
      }
      else {
        String oldmima = request.getParameter("oldmima");
        String newmima = request.getParameter("newmima");
        String newmima1 = request.getParameter("newmima1");
        String firstsql = "select * from userinfo where username='" + username +
            "'";
        rs = conn.executeQuery(firstsql);
        rs.next();
        if (!oldmima.equals(rs.getString("userpassword"))) { //判断原始密码是否正确
          out.println("<script>\r\n");
          out.println("{ \r\n");
          out.println("alert(\"你输入的原始密码不正确，如果忘记密码，请与管理员联系\"); \r\n");
          out.println(
              "window.document.location.href=\"admin_password.do\";\r\n");
          out.println("}\r\n");
          out.println("</script>");
        }
        //淡淡的液体，无味的食物
        else {
          String upsql = "UPDATE userInfo SET  userPassword='" + newmima1 +
              "' WHERE username='" + username + "'";
          conn.executeUpdate(upsql);

          out.println("<script>\r\n");
          out.println("{ \r\n");
          out.println("alert(\"恭喜你，修改成功\"); \r\n");
          out.println(
              "window.document.location.href=\"admin_password.do\";\r\n");
          out.println("}\r\n");
          out.println("</script>");

          //response.sendRedirect("user_infor.do");
          return;

        }
      }
    }
    catch (SQLException e) {

    }

  }

  public void doPost(HttpServletRequest request,
                     HttpServletResponse response) throws ServletException,
      IOException {
    doGet(request, response);
  }
}
