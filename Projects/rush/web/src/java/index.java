/*
 * index.java ��ҳ��֤
 *
 * Created on 2007��5��23��, ����8:43
 */

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class index
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    //ȡ���û���������
    String username = request.getParameter("username");
    String password = request.getParameter("userpassword");
    HttpSession session = request.getSession();
    try {
      String sql = "select * from userinfo where username='" + username +
          "' and userpassword='" + password + "'";
      ResultSet rs = null;
      condb conn = new condb();
      rs = conn.executeQuery(sql);
      //��������ڣ��ͷ�����ҳ
      if (!rs.next()) {
        out.println("<script>\r\n");
        out.println("{ \r\n");
        out.println("alert(\"�Բ�����������û������������󣬻��߲����ڣ��������Ա��ϵ\"); \r\n");
        out.println("window.document.location.href=\"index.html\";\r\n");
        out.println("}\r\n");
        out.println("</script>");
        //response.sendRedirect("index.html");
        //return;
      }
      else {
        User user = new User(username);
        String useradmin = rs.getString("admin"); //ȡ��Ȩ��
        session.setAttribute("username", username);
        session.setAttribute("user", user);
        //session.setAttribute("user",username);

        if ("1".equals(useradmin)) {
          response.sendRedirect("admin/admin_index.do");
          return;
        }
        else {
          response.sendRedirect("user_index.do");
          return;
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
