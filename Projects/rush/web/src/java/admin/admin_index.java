/*
 * admin_index.java 管理员中心首页
 *
 * Created on 2007年5月23日, 下午7:31
 */

package admin;

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class admin_index
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();

    out.println("\r\n");
    out.println("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\">\r\n");
    out.println("<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n");
    out.println("<head>\r\n");
    out.println(
        "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\" />\r\n");
    out.println("<title>企业信息交流系统</title>\r\n");
    out.println("\r\n");
    out.println("</head>\r\n");
    out.println("\r\n");
    out.println("<frameset rows=\"40,*\" cols=\"*\" frameborder=\"no\" border=\"0\" framespacing=\"0\">\r\n");
    out.println("  <frame src=\"admin_top.do\" name=\"topFrame\" scrolling=\"No\" noresize=\"noresize\" id=\"topFrame\" title=\"topFrame\" />\r\n");
    out.println("  <frameset cols=\"200,*\" frameborder=\"no\" border=\"0\" framespacing=\"0\">\r\n");
    out.println("    <frame src=\"admin_left.do\" name=\"leftFrame\" scrolling=\"No\" noresize=\"noresize\" id=\"leftFrame\" title=\"leftFrame\" />\r\n");
    out.println("    <frame src=\"admin_right.do\" name=\"mainFrame\" id=\"mainFrame\" title=\"mainFrame\" />\r\n");
    out.println("  </frameset>\r\n");
    out.println("</frameset>\r\n");
    out.println("<noframes><body>\r\n");
    out.println("</body>\r\n");
    out.println("</noframes></html>\r\n");

  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    doGet(request, response);
  }
}
