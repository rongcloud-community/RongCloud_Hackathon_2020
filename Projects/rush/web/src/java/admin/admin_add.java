/*
 * admin_add.java //�������û�
 *
 * Created on 2007��5��27��, ����3:32
 */

package admin;

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class admin_add
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    HttpSession session = request.getSession();
    String username = (String) session.getAttribute("username");
    String action = request.getParameter("action");
    if (username == null) {
      response.sendRedirect("../index.html");
      return;
    }
    try {

      if (!"add".equals(action)) {

        out.println("\r\n");
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
        out.println("if(document.form1.idname.value==\"\")/*��֤�û����Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"�������û���\"); \r\n");
        out.println("document.form1.idname.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println(" if(document.form1.password.value==\"\")/*��֤�����Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"����������\"); \r\n");
        out.println("document.form1.password.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.password1.value==\"\")/*��֤�����Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"��������һ������\"); \r\n");
        out.println("document.form1.password1.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.password.value!=document.form1.password1.value)/*��֤���������Ƿ����*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"�������벻��ȣ�����������\"); \r\n");
        out.println("document.form1.password1.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.xming.value==\"\")/*��֤�������Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"����������\"); \r\n");
        out.println("document.form1.xming.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println(" if(document.form1.xbie.value==\"\")/*��֤�Ա��Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"�������Ա�\"); \r\n");
        out.println("document.form1.xbie.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.email.value==\"\")/*��֤EMAIL�Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"������EMAIL\"); \r\n");
        out.println("document.form1.email.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.dianhua.value==\"\")/*��֤�绰�Ƿ�Ϊ��*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"������绰\"); \r\n");
        out.println("document.form1.dianhua.focus(); \r\n");
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
        out.println("<form name=\"form1\" method=\"post\" action=\"admin_add.do?action=add\" onSubmit=\"return yanzheng();\">\r\n");
        out.println("  <table width=\"640\" border=\"0\">\r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"3\"><div align=\"center\" class=\"STYLE1\">������Ϣ</div></td>\r\n");
        out.println("    </tr>\r\n");
        out.println("\t  <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">�û���:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"idname\">\r\n");
        out.println("        ����д�û���.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("\t  <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">����:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"password\" name=\"password\">\r\n");
        out.println("        ����������.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("\t  <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">��������:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"password\" name=\"password1\">\r\n");
        out.println("       ��������������.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">����:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"xming\">\r\n");
        out.println("        ����д��ʵ����.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("       <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">�Ա�:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"xbie\">\r\n");
        out.println("        ����д��ʵ�Ա�.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">EMAIL:</td>\r\n");
        out.println("      <td>\r\n");
        out.println("        <input type=\"text\" name=\"email\">\r\n");
        out.println("       ����д��ʵEMAIL��ַ.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">��ϵ�绰:</td>\r\n");
        out.println("      <td>\r\n");
        out.println("        <input type=\"text\" name=\"dianhua\">\r\n");
        out.println("        ����д��ʵ��ϵ�绰.       </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">�û�����:</td>\r\n");
        out.println("      <td>\r\n");
        out.println(
            "        <input type=\"text\" name=\"admin\" value=\"2\">\r\n");
        out.println(
            "   <font color=\"red\">     1Ϊ����Ա,2Ϊ��ͨ�û�. </font>      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println(
            "      <td colspan=\"3\"><div align=\"center\"></div></td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  </table>\r\n");
        out.println("  <table width=\"400\" border=\"0\">\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td><label>\r\n");
        out.println("      <div align=\"center\">\r\n");
        out.println(
            "        <input type=\"submit\" name=\"Submit\" value=\"�ύ\">\r\n");
        out.println("        </div>\r\n");
        out.println("    </label></td>\r\n");
        out.println("    <td><label>\r\n");
        out.println("      <div align=\"center\">\r\n");
        out.println(
            "        <input type=\"reset\" name=\"Submit2\" value=\"����\">\r\n");
        out.println("        </div>\r\n");
        out.println("    </label></td>\r\n");
        out.println("  </tr>\r\n");
        out.println("</table>\r\n");
        out.println("</form>\r\n");
        out.println("\r\n");
        out.println("</div>\r\n");
        out.println("</body>\r\n");
        out.println("</html>\r\n");
      }
      else {
        ResultSet rs = null;
        condb conn = new condb();
        String idname = request.getParameter("idname");
        String password = request.getParameter("password1");
        String xming = request.getParameter("xming");
        String xbie = request.getParameter("xbie");
        String email = request.getParameter("email");
        String dianhua = request.getParameter("dianhua");
        String admin = request.getParameter("admin");
        String sql = "select * from userinfo where username='" + idname + "'";
        String insql = "insert into userinfo(username, userpassword, zsname, usersex,useremail,usertel,admin)" +
            " values ('" + idname + "','" + password + "','" + xming + "','" +
            xbie + "','" + email + "','" + dianhua + "','" + admin + "')";
        rs = conn.executeQuery(sql);
        //��ѯ�û����Ƿ���ڣ�������ʲô

        if (null == rs || rs.next()) {
          out.println("<script>\r\n");
          out.println("{ \r\n");
          out.println("alert(\"�����ӵ��û����Ѿ����ڣ�����������\"); \r\n");
          out.println(
              "window.document.location.href=\"admin_add.do\";\r\n");
          out.println("}\r\n");
          out.println("</script>");

        }
        //��������
        else {

          conn.executeUpdate(insql);
          out.println("<script>\r\n");
          out.println("{ \r\n");
          out.println("alert(\"��ϲ�㣬�����û��ɹ�\"); \r\n");
          out.println("window.document.location.href=\"admin_add.do\";\r\n");
          out.println("}\r\n");
          out.println("</script>");
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