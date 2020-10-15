/*
 * delete.java //删除信息
 *
 * Created on 2007年5月27日, 下午7:01
 */

package inc;

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class delete
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    HttpSession session = request.getSession();
    String username = (String) session.getAttribute("username");
    String id = request.getParameter("id");
    int Id = Integer.parseInt(id);
    if (username == null) {
      response.sendRedirect("index.html");
      return;
    }
    try {

      String delesql = "delete from messageinfo where messageid=" + Id + "";
      condb conn = new condb();
      conn.executeUpdate(delesql);
      out.println("<script>\r\n");
      out.println("{ \r\n");
      out.println("alert(\"恭喜你，删除成功\"); \r\n");
      out.println("window.document.location.href=\"#\";\r\n");
      out.println("}\r\n");
      out.println("</script>");
    }
    catch (Exception e) {

    }

  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    doGet(request, response);
  }
}
