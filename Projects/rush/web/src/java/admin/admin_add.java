/*
 * admin_add.java //添加新用户
 *
 * Created on 2007年5月27日, 下午3:32
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
        out.println("function yanzheng()/*验证函数*/ \r\n");
        out.println("{ \r\n");
        out.println("if(document.form1.idname.value==\"\")/*验证用户名是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请输入用户名\"); \r\n");
        out.println("document.form1.idname.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println(" if(document.form1.password.value==\"\")/*验证密码是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请输入密码\"); \r\n");
        out.println("document.form1.password.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.password1.value==\"\")/*验证密码是否为空*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"请再输入一次密码\"); \r\n");
        out.println("document.form1.password1.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
        out.println("if(document.form1.password.value!=document.form1.password1.value)/*验证二次密码是否相等*/ \r\n");
        out.println("{ \r\n");
        out.println("alert(\"两次密码不相等，请重新输入\"); \r\n");
        out.println("document.form1.password1.focus(); \r\n");
        out.println("return false; \r\n");
        out.println("exit;\r\n");
        out.println("}\r\n");
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
        out.println("<form name=\"form1\" method=\"post\" action=\"admin_add.do?action=add\" onSubmit=\"return yanzheng();\">\r\n");
        out.println("  <table width=\"640\" border=\"0\">\r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"3\"><div align=\"center\" class=\"STYLE1\">个人信息</div></td>\r\n");
        out.println("    </tr>\r\n");
        out.println("\t  <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">用户名:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"idname\">\r\n");
        out.println("        请填写用户名.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("\t  <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">密码:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"password\" name=\"password\">\r\n");
        out.println("        请输入密码.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("\t  <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">二次密码:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"password\" name=\"password1\">\r\n");
        out.println("       再输入密码密码.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">姓名:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"xming\">\r\n");
        out.println("        请填写真实姓名.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("       <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">性别:</td>\r\n");
        out.println("      <td width=\"550\">\r\n");
        out.println("        <input type=\"text\" name=\"xbie\">\r\n");
        out.println("        请填写真实性别.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">EMAIL:</td>\r\n");
        out.println("      <td>\r\n");
        out.println("        <input type=\"text\" name=\"email\">\r\n");
        out.println("       请填写真实EMAIL地址.      </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("  \r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">联系电话:</td>\r\n");
        out.println("      <td>\r\n");
        out.println("        <input type=\"text\" name=\"dianhua\">\r\n");
        out.println("        请填写真实联系电话.       </td>\r\n");
        out.println("    </tr>\r\n");
        out.println("    <tr>\r\n");
        out.println("      <td colspan=\"2\" align=\"right\">用户身份:</td>\r\n");
        out.println("      <td>\r\n");
        out.println(
            "        <input type=\"text\" name=\"admin\" value=\"2\">\r\n");
        out.println(
            "   <font color=\"red\">     1为管理员,2为普通用户. </font>      </td>\r\n");
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
        //查询用户名是否存在，你在做什么

        if (null == rs || rs.next()) {
          out.println("<script>\r\n");
          out.println("{ \r\n");
          out.println("alert(\"你添加的用户名已经存在，请重新输入\"); \r\n");
          out.println(
              "window.document.location.href=\"admin_add.do\";\r\n");
          out.println("}\r\n");
          out.println("</script>");

        }
        //插入数据
        else {

          conn.executeUpdate(insql);
          out.println("<script>\r\n");
          out.println("{ \r\n");
          out.println("alert(\"恭喜你，添加用户成功\"); \r\n");
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
