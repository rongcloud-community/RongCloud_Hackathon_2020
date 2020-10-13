package org.apache.jsp.manage;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.sql.*;
import java.util.*;
import java.io.*;
import java.net.*;
import msg.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public final class pageName_jsp extends org.apache.jasper.runtime.HttpJspBase
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

      out.write('﻿');

	/**
	 *本文件被客户端管理员调用用做管理所有客服人员
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/

      out.write("\r\n");
      out.write("\r\n");
      msg.UserManager userManager = null;
      synchronized (_jspx_page_context) {
        userManager = (msg.UserManager) _jspx_page_context.getAttribute("userManager", PageContext.PAGE_SCOPE);
        if (userManager == null){
          userManager = new msg.UserManager();
          _jspx_page_context.setAttribute("userManager", userManager, PageContext.PAGE_SCOPE);
        }
      }
      out.write('\r');
      out.write('\n');
      msg.DbConn db = null;
      synchronized (_jspx_page_context) {
        db = (msg.DbConn) _jspx_page_context.getAttribute("db", PageContext.PAGE_SCOPE);
        if (db == null){
          db = new msg.DbConn();
          _jspx_page_context.setAttribute("db", db, PageContext.PAGE_SCOPE);
        }
      }
      out.write("\r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n");
      out.write("<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\r\n");
      out.write("<title></title>\r\n");
      out.write("<link href=\"../css/talk.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n");
      out.write("<link href=\"css/style.css\" rel=\"stylesheet\" type=\"text/css\" />\r\n");
      out.write("<!--让页面顶到最左最上-->\r\n");
      out.write("<style type=\"text/css\">\r\n");
      out.write("<!--\r\n");
      out.write("body {\r\n");
      out.write("\tmargin-left: 0px;\r\n");
      out.write("\tmargin-top: 0px;\r\n");
      out.write("}\r\n");
      out.write(".STYLE1 {color: #FF0000}\r\n");
      out.write(".data{\r\n");
      out.write("text-align:left;\r\n");
      out.write("font-size:12px;\r\n");
      out.write("background-color:#fff;\r\n");
      out.write("border-collapse:collapse;\r\n");
      out.write("empty-cells: show; \r\n");
      out.write("margin:0px;\r\n");
      out.write("padding:0px;\r\n");
      out.write("\r\n");
      out.write("}\r\n");
      out.write(".STYLE2 {color: #66CC00}\r\n");
      out.write(".STYLE4 {color: #FF0000; font-size: 24pt; }\r\n");
      out.write("-->\r\n");
      out.write("</style>\r\n");
      out.write("</head>\r\n");

//start: 判断登陆session是否超时/////
if( session.getValue("userType")==null ){
	out.println("<script language=jscript>alert('您登陆超时或没有登陆，请重新登陆。');"+
					"window.parent.location.assign('../index.htm');</script>");
	return;
}
//end: 判断登陆session是否超时/////

      out.write(' ');
      out.write('\r');
      out.write('\n');

//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;
String id = "";
String domainId = "";
//***********************************
//获取变量值
//***********************************
id = (String)session.getValue("scomClient"); //取出登录用户的用户名，也就是id
domainId=userManager.getUserDomainId(id);
session.setAttribute("domainId",domainId); 

String domain=request.getParameter("domain"); // 
String pageUrl=""; // 
String name=""; // 
try
{ 
	pageUrl =  new String( (request.getParameter("pageUrl")).getBytes("iso-8859-1"),"utf-8" ); 
	name =  new String( (request.getParameter("name")).getBytes("iso-8859-1"),"utf-8" ); 
}catch(Exception ee){}

String delete=request.getParameter("delete"); // 
String submit =request.getParameter("submit");
if(domainId!=null ){ 
	domainId=request.getParameter("domainId"); 
	if(domainId==null )
		domainId=domainId.substring(0,domainId.indexOf(",")); 	
}	
if(delete!=null){
	try{
		sql="delete from pageName where domainId=\""+domainId+"\"";
		db.setSqlQuery(sql);		
		if(db.getConnection()==null || db.isClosed())			 
	  		db.setConnection();
		db.executeUpdate();
	}catch(Exception e){}
}
else if(submit!=null){
	try{
		sql="insert into pageName values(\""+domainId+"\",\""+pageUrl+"\",\""+name+"\")";
		db.setSqlQuery(sql);		
		if(db.getConnection()==null || db.isClosed())			 
	  		db.setConnection();
		db.executeUpdate();
	}catch(Exception e){}
}

      out.write("\r\n");
      out.write("<body>\r\n");
      out.write("<br />\r\n");
      out.write("<table width=\"790\" height=\"34\" border=\"1\" cellpadding=\"0\" cellspacing=\"0\" bordercolor=\"#A5AdC4\">\r\n");
      out.write("  <tr>\r\n");
      out.write("    <td width=\"790\" bgcolor=\"#E4F2FF\">页面友好名称定义（监控时访问轨迹显示名称而非页面URL）</td>\r\n");
      out.write("  </tr>\r\n");
      out.write("</table>\r\n");
      out.write("<table width=\"791\" border=\"1\" bordercolor=\"#A5AdC4\" cellpadding=\"0\" cellspacing=\"0\">\r\n");
      out.write("  <tr>\r\n");
      out.write("    <td width=\"787\"><table width=\"787\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\" >\r\n");
      out.write("      <form id=\"form1\" name=\"form1\" method=\"post\" action=\"\">\r\n");
      out.write("        <tr >\r\n");
      out.write("          <td width=\"785\" height=\"25\">请选择域名：\r\n");
      out.write("            <label>\r\n");
      out.write("                <select name=\"domain\"  onchange=\"this.form.submit()\">\r\n");
      out.write("                  ");

			//UserManager userManager=new UserManager(); 
			StringTokenizer st = new StringTokenizer(userManager.getUserDomain(id),",");	
			int counter=0;
			String t="";
			int counter1=0;
			while(st.hasMoreTokens()){
				counter1++;
 				t=st.nextToken();
      out.write("\r\n");
      out.write("                  <option value=\"");
      out.print(t);
      out.write('"');
      out.write(' ');
      out.print(( (domain!=null &&domain.equals(t)) || counter1==1)?"selected":"");
      out.write('>');
      out.print(t);
      out.write("</option>\r\n");
      out.write("                  ");
}
      out.write("\r\n");
      out.write("                </select>\r\n");
      out.write("                </label>\r\n");
      out.write("          </td>\r\n");
      out.write("        </tr>\r\n");
      out.write("      \r\n");
      out.write("        \r\n");
      out.write("        \r\n");
      out.write("      </form>\r\n");
      out.write("    </table></td>\r\n");
      out.write("  </tr>\r\n");
      out.write("</table>\r\n");
      out.write("<br />\r\n");
      out.write("<table width=\"790\" border=\"1\" cellpadding=\"0\" cellspacing=\"0\" bordercolor=\"#A5AdC4\">\r\n");
      out.write("  <tr>\r\n");
      out.write("    <td><table width=\"787\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"data\">\r\n");
      out.write("      <tr style=\"\">\r\n");
      out.write("        <td width=\"69\" height=\"20\" align=\"center\" valign=\"middle\" bgcolor=\"#E4F2FF\"  >序号</td>\r\n");
      out.write("        <td width=\"451\" height=\"20\" align=\"center\" valign=\"middle\" bgcolor=\"#E4F2FF\" >页面</td>\r\n");
      out.write("        <td width=\"267\" height=\"20\" align=\"center\" valign=\"middle\" bgcolor=\"#E4F2FF\" >名称</td>\r\n");
      out.write("        </tr>\r\n");
      out.write("      ");

	  sql = "select page,name from pageName where domainId='"+domainId+"'";
	  db.setSqlQuery(sql);
	  if(db.getConnection()==null || db.isClosed())			 
	  	db.setConnection(); 
	  rs=db.getResult();
	  int i = 1;
	  while(rs!=null && rs.next())
	  {
	  
      out.write("\r\n");
      out.write("      <form id=\"UserForm\" name=\"UserForm\" method=\"post\" action=\"\">\r\n");
      out.write("        <tr>\r\n");
      out.write("          <td height=\"20\" align=\"center\" valign=\"middle\" style=\"border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC\"><a  href=\"pageName.jsp?action=delete&domainId=");
      out.print(domainId);
      out.write("&pageUrl=");
      out.print(rs.getString("pageUrl"));
      out.write("\">删除</a></td>\r\n");
      out.write("          <td height=\"20\" align=\"left\" valign=\"middle\" style=\"border-bottom: 1px solid #CCCCCC\">");
      out.print(rs.getString("pageUrl"));
      out.write("</td>\r\n");
      out.write("          <td height=\"20\" align=\"left\" valign=\"middle\" style=\"border-bottom: 1px solid #CCCCCC\">");
      out.print(rs.getString("name"));
      out.write("</td>\r\n");
      out.write("          </tr>\r\n");
      out.write("      </form>\r\n");
      out.write("      ");

	   i = i+1;
	   }
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
	  
      out.write("\r\n");
      out.write("    </table></td>\r\n");
      out.write("  </tr>\r\n");
      out.write("</table>\r\n");
      out.write("<br />\r\n");
      out.write("<table width=\"790\" height=\"\" border=\"1\" cellpadding=\"0\" cellspacing=\"0\" bordercolor=\"#A5AdC4\">\r\n");
      out.write("  \r\n");
      out.write("\r\n");
      out.write("  <tr>\r\n");
      out.write("    \r\n");
      out.write("    <td width=\"788\" height=\"78\" style=\"border-bottom: 1px solid #CCCCCC\"><table width=\"788\" border=\"0\" bordercolor=\"#A5AdC4\">\r\n");
      out.write("      <tr>\r\n");
      out.write("        <td width=\"782\"><table width=\"782\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"content9\">\r\n");
      out.write("            \r\n");
      out.write("            <!--注意这里如果要上传图像就要 enctype=\"multipart/form-data\"，但method=\"get\"-->\r\n");
      out.write("            <form action=\"\" method=\"post\" name=\"UserForm2\" id=\"UserForm2\">\r\n");
      out.write("              <tr>\r\n");
      out.write("                <td width=\"783\" height=\"19\" align=\"left\" valign=\"middle\" >页面URL：\r\n");
      out.write("                  <input name=\"pageUrl\" type=\"text\" id=\"id\" size=\"90\"/></td>\r\n");
      out.write("                </tr>\r\n");
      out.write("              \r\n");
      out.write("              <tr>\r\n");
      out.write("                <td height=\"21\" align=\"left\" valign=\"middle\" >名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n");
      out.write("                  <input name=\"name\" type=\"text\" id=\"email\" size=\"30\" /></td>\r\n");
      out.write("                </tr>\r\n");
      out.write("              <tr>\r\n");
      out.write("                <td height=\"30\" align=\"center\" valign=\"middle\" ><input type=\"submit\" name=\"submit\" value=\"添加\"  />                </td>\r\n");
      out.write("                </tr>\r\n");
      out.write("            </form>\r\n");
      out.write("        </table></td>\r\n");
      out.write("      </tr>\r\n");
      out.write("    </table></td></tr>\r\n");
      out.write("</table>\r\n");
      out.write("</body>\r\n");
      out.write("</html>\r\n");
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
