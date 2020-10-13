<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*, java.util.*, java.net.*,msg.*,cache.*"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" /> 
<%
	String jspReferer=request.getHeader("Referer");
	if(jspReferer==null || jspReferer.equals("")){ //如果直接访问本页 那就什莫也不做
		out.println("Are you sure? Baby!");
		return;
	}
	String frmurl="";//request.getParameter("frmurl");  //是否来源链接或搜索引擎
	String remoteIP= request.getRemoteAddr();
	 
	String curURL0=request.getParameter("curURL");  
	String curURL=Keyword.getCleanURL(curURL0);
	Calendar c= Calendar.getInstance();
	long time=c.getTimeInMillis();
	while( userManager.hasSameId(String.valueOf(time)) ){ //为新来的访问者获取一个不重复的ID
		c= Calendar.getInstance();
		time=c.getTimeInMillis();
	}
	String vid=String.valueOf(time);		
	if(!userManager.addNewVisitor(vid,"visitor","","","","","","","","","",curURL,remoteIP,frmurl,"OFFLINE"))
		return;
%> 
function addCookie(name, value, expires, path, domain, secure){
	var expString    = ((expires == null)? "" : ("; expires=" + expires.toGMTString()));
	var pathString   = ((path == null)   ? "" : ("; path   =" + path));
	var domainString = ((domain == null) ? "" : ("; domain =" + domain));
	var secureString = ((secure == true) ? "; secure" : "");
	var cookiev      = name+"="+value+expString+pathString+domainString+secureString;
	document.cookie  = cookiev;
} 
var expDate   = new Date();
expDate.setTime( expDate.getTime() + 365 * 24 * 60 * 60 * 1000);
try{addCookie("vMAC", "lhs(<%=vid%>)", expDate, "/", null, false);	}catch(e){}
  	