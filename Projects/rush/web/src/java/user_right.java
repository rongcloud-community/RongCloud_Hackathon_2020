/*
 * user_right.java �û��ұ�ҳ��
 *
 * Created on 2007��5��23��, ����7:06
 */

import java.io.*;
import java.net.*;
import java.sql.*;
import javax.sql.*;
import inc.condb;
import javax.servlet.*;
import javax.servlet.http.*;

public class user_right
    extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    response.setContentType("text/html;charset=UTF-8");
    PrintWriter out = response.getWriter();
    out.println("<font size=\"14\">��ӭ�����û�����</font> \r\n");


  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws
      ServletException, IOException {
    doGet(request, response);
  }
}
