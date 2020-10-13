<%
	/**
	 *本文件被客户端调用用来查询网站访问统计信息
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,com.ccmedia.cbu.util.security.Create_Code;" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="webStat" scope="page"  class="msg.WebStat" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
}
-->
</style></head> 
<jsp:include page="sessionChecker.jsp" flush="true"/>
<%
	String theFirstDomainId=userManager.getUserDomainId((String)session.getValue("scomClient"));
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	if(payLevel<=0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用本功能，如果需要，请申请专业版以上版本。</font>");
%> 
<%	 
	String scomClient = (String)session.getValue("scomClient");		
	String domains=userManager.getUserDomain(scomClient); 
	 
%>
<%
	String url=request.getParameter("url");	
	if(url==null){		 
		url=domains;		 
		int index=url.indexOf(",");
		if(index>0)
			url=url.substring(0,index);		
	}	 
	String code = new Create_Code().Create_Url(url); 
    String codeURL = java.net.URLEncoder.encode(code,"UTF-8");	
	String destUrl="http://report.webnibbler.com.cn/index_uniscom.jsp?puniscom="+codeURL;
	out.println("<script language=jscript>window.open(\""+destUrl+"\",\"sw\");</script>");	 
%>
<body>
<form id="form1" name="form1" method="post" action="">
<table width="793" height="25" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
  <td height="23">
  <table width="870" height="21" border="0" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="214" height="21" bgcolor="#E4F2FF">网站统计报告：</td>
	<td width="254" bgcolor="#E4F2FF" >
	
	<select  name="url" >
<%			 
			StringTokenizer st = new StringTokenizer(domains,",");			 
			String t="";
			while(st.hasMoreTokens()){			
				t=st.nextToken();
%>            	
				<option value="<%=t%>" <%=(url!=null && url.equals(t))?"selected":""%>><%=t%></option> 
			<%}%>
    </select></td>
    <td width="402" bgcolor="#E4F2FF" ><label>
      <input type="submit" name="submit" value="提交" />
    </label>
	
	</td>    
  </tr>
</table>
  </td>
  </tr>
</table> 
</form>
<!--
<table >
  <tr>
  <td width="1600" height="2000"> 
<iframe src="http://report.webnibbler.com.cn/index_uniscom.jsp?puniscom=<%=codeURL%>" border="0"  style="width:1200px;height:100%" ></iframe>
</td>
  </tr>
</table> 
-->
</body>

<%if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();	%>
</html>
	