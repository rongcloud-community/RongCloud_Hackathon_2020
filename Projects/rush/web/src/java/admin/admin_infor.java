/*
 * admin_infor.java �鿴����Ա��Ϣҳ��
 *
 * Created on 2007��5��23��, ����7:22
 */

package admin;

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class admin_infor
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    request.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    HttpSession session = request.getSession();
    String action = request.getParameter("action");
    String username = (String) session.getAttribute("username");
    if (username == null) {
      response.sendRedirect("../index.html");
      return;
    }
    try {
      if (null == action || !"xiugai".equals(action)) { //�ж�action��ֵ
        ResultSet rs = null;
        String sql = "select * from userinfo where username='" + username + "'";
        condb conn = new condb();

        rs = conn.executeQuery(sql);
        rs.next();
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
        out.println("<form name=\"form1\" method=\"post\" action=\"admin_infor.do?action=xiugai\" onSubmit=\"return yanzheng();\">\r\n");
        out.println("  <table width=\"640\" border=\"0\">\r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"3\"><div align=\"center\" class=\"STYLE1\">������Ϣ</div></td>\r\n");
        out.println("    </tr>\r\n");
        out.println("\t  <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">�û���:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("      <font color=red>  " + username + "</font>\r\n");
        out.println("          ��������û���   </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">����:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"xming\" value=\"" +
                    rs.getString("zsname") + "\">\r\n");
        out.println("        ����д������ʵ����.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("       <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">�Ա�:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"xbie\" value=\"" +
                    rs.getString("usersex") + "\">\r\n");
        out.println("        ����д�����Ա�.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">EMAIL:</td>\r\n");
        out.println("      <td>\r\n");
        out.println("        <input type=\"text\" name=\"email\" value=\"" +
                    rs.getString("useremail") + "\">\r\n");
        out.println("        �������㳣�õ�EMAIL��ַ.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">��ϵ�绰:</td>\r\n");
        out.println("      <td>\r\n");
        out.println("        <input type=\"text\" name=\"dianhua\" value=\"" +
                    rs.getString("usertel") + "\">\r\n");
        out.println("       ��������ֻ�������ϵ�绰.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println(
            "      <td colspan=\"3\"><div align=\"center\">����ʵ��д,�Ա���˾�������û�֪ͨ.</div></td>\r\n");
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
        String xming = request.getParameter("xming");
        String xbie = request.getParameter("xbie");
        String email = request.getParameter("email");
        String dianhua = request.getParameter("dianhua");
        String upsql = "UPDATE userInfo SET  zsname='" + xming + "',usersex='" +
            xbie + "',useremail='" + email + "',usertel='" + dianhua +
            "' WHERE username='" + username + "'";
        condb conn = new condb();
        conn.executeUpdate(upsql);

        out.println("<script>\r\n");
        out.println("{ \r\n");
        out.println("alert(\"��ϲ�㣬�޸ĳɹ�\"); \r\n");
        out.println("window.document.location.href=\"admin_infor.do\";\r\n");
        out.println("}\r\n");
        out.println("</script>");

        //response.sendRedirect("user_infor.do");
        return;

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
