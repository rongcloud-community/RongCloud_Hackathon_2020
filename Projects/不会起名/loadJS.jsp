<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*, java.util.*, java.io.*,msg.*"%> 
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />

<%
	String jspReferer=request.getHeader("Referer");
	//如果直接访问本页 那就什莫也不做 或如果没有注册这个站点
	if(jspReferer==null || (jspReferer.indexOf("uniscom.cn")<=0 &&  
		!userManager.hasSite( msg.Keyword.getCleanURL(jspReferer) )  ) ){ 
		//out.println("Are you sure? Baby!");
		//return;		 
	}
//out.println("alert(\""+jspReferer+"\");");
 	 
	String data=request.getParameter("data");
	if(data!=null && data.equals("float"))
		out.print(userManager.getJS("float"));
	else if(data!=null && data.equals("manage"))
 		out.print(userManager.getJS("manage"));
	else if(data!=null && data.equals("talk"))
 		out.print(userManager.getJS("talk"));
	else if(data!=null && data.equals("qianru"))
 		out.print(userManager.getJS("qianru"));
	//else if(data!=null && data.equals("floatqrTalk"))
 	//	out.print(userManager.getJS("floatqrTalk"));
	//else if(data!=null && data.equals("floatqrMT"))
 	//	out.print(userManager.getJS("floatqrMT"));
    else if(data!=null && data.equals("msg"))
 		out.print(userManager.getJS("msg"));
	else if(data!=null && data.equals("tree"))
 		out.print(userManager.getJS("tree"));
	else if(data!=null && data.equals("hostids"))
 		out.print(userManager.getSiteUserInXml_(request.getParameter("curUrl")) );


%>
 