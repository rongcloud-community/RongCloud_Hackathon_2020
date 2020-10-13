<%
	/**
	 *本文件被客户端管理员调用用来将信用点在站点之间转换
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
  out.println("<script language=jscript>alert('您的帐号已经在其它地方登陆，只有重新登陆才可使用。');location.assign('index.htm');</script>");			
  return;	
}
///////////////////////////////////////////////////////////////////////////////		
%> 
<%
	String theFirstDomainId=userManager.getUserDomainId(vid);
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	 
%> 
<%
 
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String scomClient = "";
//String domainId = "";//用来标示库内是否有此用户的设置状态，不论是否为空
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
String domain = userManager.getUserDomain(vid);		 
String[] domains = domain.split(",");
//String domainId = userManager.getDomainId((String)session.getValue("scomClient"));		 
//String[] domainIds = domainId.split(",");

scomClient = vid;
String submit=request.getParameter("submit");
if(submit!=null) {
	if(payLevel>=2){
		try
		{
			String amount=request.getParameter("amount");
			int amountInt=Integer.parseInt(amount);
			String domainFrom=request.getParameter("domainFrom");
			String domainTo=request.getParameter("domainTo"); 
			String creditType=request.getParameter("creditType"); 
			String theDomainId=null;
			if(creditType!=null && creditType.equals("credit"))
				sql="select domainId from site where domain=\""+domainFrom+"\" and credit>="+amount;
			else if(creditType!=null && creditType.equals("smsCredit"))
				sql="select site.domainId as domainId from sms,site where site.domainId=sms.domainId and site.domain=\""+
					domainFrom+"\" and smsCredit>="+amount;
			db.setSqlQuery(sql);
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection();  			 
			rs=db.getResult();
			String domainIdFrom=null;
			if(rs!=null && rs.next())
					domainIdFrom=rs.getString("domainId");
			else{
			 
				out.print("<script language=javascript>alert('被转出的域名信用点不足。');history.back(1);</script>");			
				if(db.getConnection()!=null && !db.isClosed())
					db.closeConnection();	
				return;
			}
			sql="select domainId from site where domain=\""+domainTo+"\"";
			db.setSqlQuery(sql);
			rs=db.getResult();
			String domainIdTo=null;
			if(rs!=null && rs.next())
				domainIdTo=rs.getString("domainId");
				
			//先从数据库减去短信息信用点或手机短信信用点
			if(creditType!=null && creditType.equals("credit"))
				sql="update site set credit=credit-"+amount+" where domainId=\""+domainIdFrom+"\"";
			else if(creditType!=null && creditType.equals("smsCredit") )		
				sql="update sms set smsCredit=smsCredit-"+amount+" where domainId=\""+domainIdFrom+"\"";
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection();  
			db.setSqlQuery(sql);
			db.executeUpdate();
			//再添加去短信息信用点或手机短信信用		
			if(creditType!=null && creditType.equals("credit"))
				sql="update site set credit=credit+"+amount+" where domainId=\""+domainIdTo+"\"";
			else if(creditType!=null && creditType.equals("smsCredit"))			
				sql="update sms set smsCredit=smsCredit+"+amount+" where domainId=\""+domainIdTo+"\"";
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection();  
			db.setSqlQuery(sql);
			int result=db.executeUpdate();
			if(result==0 && creditType!=null && creditType.equals("smsCredit")){		
				sql="insert into sms values(\""+domainIdTo+"\",\""+amount+"\")";			 
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 
				db.setSqlQuery(sql);
				db.executeUpdate();		
			}
			if(db.getConnection()!=null && !db.isClosed())
					db.closeConnection();	
			out.println("已经从域名"+domainFrom+"转出"+amount+"信用点到域名"+domainTo);
		 }catch(Exception ee){}
	 }
	 else if(payLevel==0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用信用点转移，如果要使用信用点转移，请申请商务版以上版本。</font>");
	 else if(payLevel==1) 
		out.print("<font color=\'red\'>您使用的是增强版，不能使用信用点转移，如果要使用信用点转移，请申请商务版以上版本。</font>");
}
%>
<body>
<table width="785" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="781" bgcolor="#E4F2FF">信用点在域名之间转换:</td>
  </tr>
</table>
<br />
<table width="780" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4" class="content9">
  
  <tr>
     
    <td width="770" height="25"><form id="form1" name="form1" method="post" action="shiftCredit.jsp?vid=<%=vid%>&sid=<%=sid%>">
      <table width="780" border="0" cellpadding="0" cellspacing="0" class='data'>
        
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="129" height="25" align="center" valign="middle">
		  <%				 
 			if(domains.length>1){
 			%>  
            选择被转出的域名
            <%}else{%>
			 <p>只有一个域名，无需转移信用点。</p>
		<%}%>            </td>
          <td width="105"><label>
			<select name="domainFrom" >
			<%				 
 			for(int i=0;domains.length>1&& i<domains.length;i++){
 			%>            	
					<option value="<%=domains[i]%>" <%=(i==0)?"selected":""%>><%=domains[i]%></option> 
			<%}%>
			 </select>
            </label></td>
          <td width="117">选择转入的域名</td>
          <td width="425" height="25"><label>
			<select name="domainTo" >			 
			<%				 
 			for(int i=0;domains.length>1&& i<domains.length;i++){
 			%>            	
					<option value="<%=domains[i]%>" <%=(i==1)?"selected":""%>><%=domains[i]%></option> 
			<%}%>
			 </select>
            </label></td>
        </tr>
	 <%				 
 			if(domains.length>1){
 	 %>  	
        <tr bgcolor="#FFFFFF">           
          <td height="25" colspan=4 class="content9"><label>		 
            输入转移的数量：<input type="text" name="amount" value="100" size=6 />	转移前请先确认被转移的域名有足够的信用点。	 
          </label></td>
        </tr>       
		<tr bgcolor="#FFFFFF">
           
          <td height="25" colspan=4 class="content9"><label>		  
            <input type="radio" name="creditType" value="credit"   checked/>转移站点短信息信用点
			<input type="radio" name="creditType" value="smsCredit" />转移站点手机短信息信用点
          </label></td>
        </tr>		
		 <tr bgcolor="#FFFFFF">           
          <td height="25" colspan=4><label>		  
            <input type="submit" name="submit" value="提交" />		
          </label></td>
        </tr>
	<%}%>
      </table>
        </form>    </td>
  </tr>
</table>
</body>
</html>
