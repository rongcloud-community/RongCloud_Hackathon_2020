/*
 * admin_password.java �û������޸�ҳ��
 *
 * Created on 2007��5��23��, ����7:09
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
        out.println("function yanzheng()/*��֤����*/ \r\n");
        out.println("{ \r\n");
        out.println(
            "if(document.form1.oldmima.value==\"\")/*��֤ԭʼ�����Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"������ԭʼ����\"); \r\n");
        out.println("document.form1.oldmima.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println(
            " if(document.form1.newmima.value==\"\")/*��֤�����Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"������������\"); \r\n");
        out.println("document.form1.newmima.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println(
            "if(document.form1.newmima1.value==\"\")/*��֤�����Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"��������һ��������\"); \r\n");
        out.println("document.form1.newmima1.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.newmima.value!=document.form1.newmima1.value)/*��֤���������Ƿ����*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"�������벻��ȣ�����������\"); \r\n");
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
        out.println("    <td>�û������޸�</td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println(
            "    <td width=\"120\" height=\"25\" align=\"right\">ԭʼ����:</td>\r\n");
        out.println("    <td>\r\n");
        out.println(
            "      <input type=\"password\" name=\"oldmima\" />\r\n");
        out.println("   </td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td height=\"25\" align=\"right\">������:</td>\r\n");
        out.println(
            "    <td><input type=\"password\" name=\"newmima\" /></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println(
            "    <td height=\"25\" align=\"right\">������һ��������:</td>\r\n");
        out.println(
            "    <td><input type=\"password\" name=\"newmima1\" /></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td>&nbsp;</td>\r\n");
        out.println("    <td>\r\n");
        out.println(
            "      <input type=\"submit\" name=\"Submit\" value=\"ȷ��\" />\r\n");
        out.println("\t  ��\r\n");
        out.println(
            "\t  <input type=\"reset\" name=\"Submit\" value=\"����\" />\r\n");
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
        if (!oldmima.equals(rs.getString("userpassword"))) { //�ж�ԭʼ�����Ƿ���ȷ
          out.println("<script>\r\n");
          out.println("{ \r\n");
          out.println("alert(\"�������ԭʼ���벻��ȷ������������룬�������Ա��ϵ\"); \r\n");
          out.println(
              "window.document.location.href=\"admin_password.do\";\r\n");
          out.println("}\r\n");
          out.println("</script>");
        }
        //������Һ�壬��ζ��ʳ��
        else {
          String upsql = "UPDATE userInfo SET  userPassword='" + newmima1 +
              "' WHERE username='" + username + "'";
          conn.executeUpdate(upsql);

          out.println("<script>\r\n");
          out.println("{ \r\n");
          out.println("alert(\"��ϲ�㣬�޸ĳɹ�\"); \r\n");
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
