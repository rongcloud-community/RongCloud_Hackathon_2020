/*
 * admin_infor.java 查看管理员信息页面
 *
 * Created on 2007年5月23日, 下午7:22
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
      if (null == action || !"xiugai".equals(action)) { //判断action的值
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
        out.println("function yanzheng()/*验证函数*/ \r\n");
        out.println("{ \r\n");
        out.println("if(document.form1.xming.value==\"\")/*验证姓名名是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请输入姓名\"); \r\n");
        out.println("document.form1.xming.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println(" if(document.form1.xbie.value==\"\")/*验证性别是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请输入性别\"); \r\n");
        out.println("document.form1.xbie.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.email.value==\"\")/*验证EMAIL是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请输入EMAIL\"); \r\n");
        out.println("document.form1.email.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.dianhua.value==\"\")/*验证电话是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请输入电话\"); \r\n");
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
        out.println("      <td colspan=\"3\"><div align=\"center\" class=\"STYLE1\">个人信息</div></td>\r\n");
        out.println("    </tr>\r\n");
        out.println("\t  <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">用户名:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("      <font color=red>  " + username + "</font>\r\n");
        out.println("          这是你的用户名   </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">姓名:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"xming\" value=\"" +
                    rs.getString("zsname") + "\">\r\n");
        out.println("        请填写您的真实姓名.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("       <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">性别:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"xbie\" value=\"" +
                    rs.getString("usersex") + "\">\r\n");
        out.println("        请填写您的性别.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">EMAIL:</td>\r\n");
        out.println("      <td>\r\n");
        out.println("        <input type=\"text\" name=\"email\" value=\"" +
                    rs.getString("useremail") + "\">\r\n");
        out.println("        请输入你常用的EMAIL地址.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">联系电话:</td>\r\n");
        out.println("      <td>\r\n");
        out.println("        <input type=\"text\" name=\"dianhua\" value=\"" +
                    rs.getString("usertel") + "\">\r\n");
        out.println("       请输入的手机或者联系电话.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println(
            "      <td colspan=\"3\"><div align=\"center\">请如实填写,以备公司紧急调用或通知.</div></td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  </table>\r\n");
        out.println("  <table width=\"400\" border=\"0\">\r\n");
        out.println("  <tr>\r\n");
        out.println("    <td><label>\r\n");
        out.println("      <div align=\"center\">\r\n");
        out.println(
            "        <input type=\"submit\" name=\"Submit\" value=\"提交\">\r\n");
        out.println("        </div>\r\n");
        out.println("    </label></td>\r\n");
        out.println("    <td><label>\r\n");
        out.println("      <div align=\"center\">\r\n");
        out.println(
            "        <input type=\"reset\" name=\"Submit2\" value=\"重置\">\r\n");
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
        out.println("alert(\"恭喜你，修改成功\"); \r\n");
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
