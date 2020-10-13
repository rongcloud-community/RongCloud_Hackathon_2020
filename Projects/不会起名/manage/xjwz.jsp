<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
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
String agentId=vid;
 
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;
String domain=request.getParameter("domain");
String submit0=request.getParameter("submit0"); 
String submit1=request.getParameter("submit1"); 
 %>
<body>
<table width="783" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="783" bgcolor="#E4F2FF">代理商下级网站列表：</td>
  </tr>
</table>
<br />
<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF"><table width="779" height="22" border="0" cellpadding="0" cellspacing="0">
      
      <tr class="content10White">
        <td width="588" height="22"><form  method="post" action="">
          <label>输入站点域名:
            <input type="text" name="domain" value='<%=(domain!=null && !domain.equals(""))?domain:""%>' size='35' />
            </label>
          <label>
          <input type="submit" name="submit0" value="搜索" />
            </label>
          <input type="submit" name="submit1" value="全部" />
        </form></td>
      </tr>
    </table></td>
  </tr>
</table>
 代理商下级网站列表：<br />
<table width="780" height="60" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="776"><table width="780" border="0" cellpadding="0" cellspacing="0" class='data'>
      <tr >
        <td width="172" align="center" bgcolor="#E4F2FF">域名</td>
        <td width="46" align="center" bgcolor="#E4F2FF">版本</td>
        <td width="132" align="center" bgcolor="#E4F2FF">到期时间</td>
        <td width="67" align="center" bgcolor="#E4F2FF">定制</td>
        <td width="47" bgcolor="#E4F2FF">信用点</td>
        <td width="50" align="center" bgcolor="#E4F2FF"> 短信<br />
          信用点</td>
        <td width="49" align="center" bgcolor="#E4F2FF">话费<br />
          查询</td>
        <td width="73" align="center" bgcolor="#E4F2FF">升级</td>
        <td width="51" align="center" bgcolor="#E4F2FF">充值<br />
          信用点</td>
        <td width="41" align="center" bgcolor="#E4F2FF">充值<br />
          短信</td>
        <td width="40" align="center" bgcolor="#E4F2FF">充值<br />
          话费</td>
        <td width="12" height="20" bgcolor="#E4F2FF">&nbsp;</td>
<%
int pageNumber =1;
try
{	
	try{ pageNumber=Integer.parseInt(request.getParameter("page"));}catch(Exception e){}
	if(pageNumber<=0)
		pageNumber=1;
	int start=pageNumber*20-20;
	int counter=0;
	//连接数据库
	String[] domainIds=null;
	 
	String domainIdsStr="";
	String specDomainIdsStr=",";
	 
	Hashtable smsCredits=new Hashtable();
	Hashtable voipIds=new Hashtable();
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	
	sql = "select domainId from agentsites where agentId=\""+agentId+"\"";
	if(domain!=null && submit1==null)	
		sql = "select domainId from agentsites where agentId=\""+agentId+"\" and domainId=\""+
			  userManager.getDomainIdByDomain(domain)+"\"";
	db.setSqlQuery(sql);
	rs = db.getResult();	 
	while(rs!=null && rs.next())
		domainIdsStr +=","+rs.getString("domainId");	 
	if(domainIdsStr!=null && domainIdsStr.startsWith(","))
		domainIdsStr=domainIdsStr.substring(1);
	 
	/////////////////获取已经申请定制的网站id///////////////////////////
	sql="select logourl.domainId as domainId from logourl,site where logourl.domainId=site.domainId and  (parentId in ("+domainIdsStr+") or site.domainId in("+domainIdsStr+") )";
	//out.println(sql);
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	rs = db.getResult();
	while(rs!=null && rs.next())
		specDomainIdsStr +=rs.getString("domainId")+",";		
	///////////////////////////////////////////////////////////////
	/////////////////获取已经申请voip网站id///////////////////////////
	sql="select voip.domainId as domainId,accountId from voip,site where voip.domainId=site.domainId and  (parentId in ("+domainIdsStr+") or site.domainId in("+domainIdsStr+") )";
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	rs = db.getResult();
	while(rs!=null && rs.next())
		voipIds.put(rs.getString("domainId"),rs.getString("accountId"));		
	///////////////////////////////////////////////////////////////
	/////////////////获取短信信用点///////////////////////////
	sql="select sms.domainId as domainId,sms.smsCredit as credit from sms,site where sms.domainId=site.domainId and  (parentId in ("+domainIdsStr+") or site.domainId in("+domainIdsStr+") )";
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	rs = db.getResult();
	while(rs!=null && rs.next())
		smsCredits.put(rs.getString("domainId"),rs.getString("credit"));		
	///////////////////////////////////////////////////////////////
	///////////获取所有下级网站////////////////////////////
	sql = "select domainId,domain,payLevel,credit,end from site where parentId in ("+domainIdsStr+") or domainId in("+domainIdsStr+") order by domainId";
	//out.println(sql);
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	rs = db.getResult();	
	domainIdsStr =","+domainIdsStr+","; 
	while(rs!=null && rs.next())
	{ 
		counter++;		 
		if(counter<start)
			continue;
		if(counter>start+20)
			break;
	 %>
      <tr >
        <td align="left"><%=( domainIdsStr.indexOf(","+rs.getString("domainId")+",")>=0 )?"":"&nbsp;&nbsp;&nbsp;--"%><%=rs.getString("domain")%></td>
        <td align="center"><%=(rs.getInt("payLevel")==0)?"标准版":""%>
			<%=(rs.getInt("payLevel")==1)?"增强版":""%>
			<%=(rs.getInt("payLevel")==2)?"商务版":""%></td>
        <td align="center"><%=rs.getString("end")%></td>
        <td align="center"><%=( specDomainIdsStr.indexOf(","+rs.getString("domainId")+",")>=0 )?"已定制":"<a href='agentSiteSpecific.jsp?vid="+vid+"&sid="+sid+"&domain="+rs.getString("domain")+"'>申请定制</a>"%></td>
        <td><%=rs.getString("credit")%></td>
        <td><%=(smsCredits.get(rs.getString("domainId"))!=null)?smsCredits.get(rs.getString("domainId")):"0"%></td>
        <td align="center"><%=(voipIds.get(rs.getString("domainId"))!=null)?"<a href='http://voip.100im.cn/user/dc/cdrquery.asp?id="+voipIds.get(rs.getString("domainId"))+"' target='_blank'>查询</a>":"无VOIP"%></td>
        <td align="center"><%=(rs.getInt("payLevel")<2)?"<a href='agentSiteUpgrade.jsp?vid="+vid+"&sid="+sid+"&domain="+rs.getString("domain")+"'>升级站点</a>":""%></td>
        <td align="center"><%="<a href='agentSiteCredit.jsp?vid="+vid+"&sid="+sid+"&domain="+rs.getString("domain")+"'>充值</a>"%></td>
        <td align="center"><%="<a href='agentSmsCredit.jsp?vid="+vid+"&sid="+sid+"&domain="+rs.getString("domain")+"'>充值</a>"%></td>
        <td align="center"><%="<a href='agentVoipCredit.jsp?vid="+vid+"&sid="+sid+"&domain="+rs.getString("domain")+"'>充值</a>"%></td>
        <td height="25">&nbsp;</td>
      </tr>
      <%}if(counter==0){%>
	  <tr>
        <td height="20" colspan="14" align="center">
	 		无记录，请确认域名(<%=(domain!=null)?domain:""%>)正确并为你的下级网站。
	    </td>
      </tr>
	  <%
  	  }
  }catch(Exception ee){
  	if(db.getConnection()!=null || !db.isClosed())			 
		db.closeConnection(); 
  }
if(db.getConnection()!=null || !db.isClosed())			 
		db.closeConnection(); 
%>
      <tr>
        <td height="20" colspan="14" align="center">
	 
	<a href="?page=1">第一页</a>
        <a href="?page=<%=String.valueOf(pageNumber-1)%>&vid=<%=vid%>&sid=<%=sid%>">上一页</a>
      &nbsp;&nbsp;
        <a href="?page=<%=String.valueOf(pageNumber+1)%>&vid=<%=vid%>&sid=<%=sid%>">下一页</a>	</td>
      </tr>
    </table></td>
  </tr>
</table>
<br />
</body>
</html>
