package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.sql.*;
import java.util.*;
import java.io.*;
import java.net.*;
import msg.*;

public final class upload_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static java.util.Vector _jspx_dependants;

  public java.util.List getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    JspFactory _jspxFactory = null;
    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      _jspxFactory = JspFactory.getDefaultFactory();
      response.setContentType("text/html; charset=utf-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write('\r');
      out.write('\n');
      msg.MsgManager msgManager = null;
      synchronized (_jspx_page_context) {
        msgManager = (msg.MsgManager) _jspx_page_context.getAttribute("msgManager", PageContext.PAGE_SCOPE);
        if (msgManager == null){
          msgManager = new msg.MsgManager();
          _jspx_page_context.setAttribute("msgManager", msgManager, PageContext.PAGE_SCOPE);
        }
      }
      out.write(' ');
      out.write('\r');
      out.write('\n');

String msg=Escape.escape("对方("+request.getParameter("id")+")正在给你传送文件......");
//msgManager.sendMsg(new msg.Message(request.getParameter("id"),request.getParameter("toid"),msg,"TALKMSG","0")); 
msgManager.sendMsg(new msg.Message("0",request.getParameter("toid"),msg,"SYSNOTIFY")); 

      out.write("\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<title>文件上传</title>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
      out.write("\r\n");
      out.write("<style type=\"text/css\">\r\n");
      out.write("<!--\r\n");
      out.write("body {\r\n");
      out.write("\tmargin-left: 0px;\r\n");
      out.write("\tmargin-top: 0px;\r\n");
      out.write("\tmargin-right: 0px;\r\n");
      out.write("\tmargin-bottom: 0px;\r\n");
      out.write("}\r\n");
      out.write("-->\r\n");
      out.write("</style>\r\n");
      out.write("<link href=\"Css/google20.css\" rel=\"stylesheet\" type=\"text/css\">\r\n");
      out.write("</head>\r\n");
      out.write("<body bgcolor=\"#FFFFFF\" text=\"#000000\">\r\n");
      out.write("\r\n");
      out.write("  <table width=\"360\" border=\"0\" cellspacing=\"0\" cellpadding=\"5\" align=\"center\" bordercolordark=\"#CCCCCC\" bordercolorlight=\"#000000\">\r\n");
      out.write("  <form name=\"form1\" method=\"post\" action=\"uploadSave.jsp?id=");
      out.print(request.getParameter("id"));
      out.write("&toid=");
      out.print(request.getParameter("toid"));
      out.write("\" enctype=\"multipart/form-data\" >\r\n");
      out.write("    <input type=\"hidden\" name=\"act\" value=\"upload\">\r\n");
      out.write("\t \r\n");
      out.write("\t<tr bgcolor=\"#CCCCCC\"> \r\n");
      out.write("      <th height=\"20\" align=\"left\" valign=\"middle\" bgcolor=\"#CCCCCC\" class=\"trYello\">上传文件(允许的文件jpg,gif,bmp,doc,rar,zip,xsl)</th>\r\n");
      out.write("    </tr>\r\n");
      out.write("    <tr align=\"center\" valign=\"middle\"> \r\n");
      out.write("      <td height=\"33\" align=\"left\" id=\"upid\">文件: \r\n");
      out.write("        <input type=\"file\" name=\"file1\" size=\"30\" class=\"tx1\" value=\"\"></td>\r\n");
      out.write("    </tr>\r\n");
      out.write("    <tr align=\"center\" valign=\"middle\"> \r\n");
      out.write("      <td height=\"20\"> \r\n");
      out.write("        <input type=\"submit\" name=\"Submit\" value=\"· 提交 ·\" >\r\n");
      out.write("           </td>\r\n");
      out.write("    </tr>\r\n");
      out.write("\t</form>\r\n");
      out.write("</table>\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      if (_jspxFactory != null) _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
