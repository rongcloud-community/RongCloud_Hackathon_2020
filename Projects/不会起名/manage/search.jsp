<%
	/**
	 *本文件被客户端调用用来查询自己和浏览者所发的短信息
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>

<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*" errorPage="" %>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="webStat" scope="page"  class="msg.WebStat" />

<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
}
-->
</style></head> 
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
%> <%
	String theFirstDomainId=userManager.getUserDomainId(vid);
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	
%> 
<%
//***********************************
//获取变量值
//***********************************
String id=null;
ResultSet rs=null;  
String sql=null;
String condition=null;//request.getParameter("condition");
String condition1=null;
String submit=request.getParameter("submit");
String currentId=request.getParameter("currentId");
String todayInfo=request.getParameter("todayInfo");
id= vid; 
if(payLevel<=0 && currentId!=null && !currentId.equals(id)) {
	currentId=id;
	todayInfo=null;
	out.print("<font color=\'red\' size=\'3\'>您使用的是标准版，只能查询自己的消息记录，如需要，请申请专业版以上版本。</font>");	
}		
try
{
	
	if(submit!=null){
		try{condition1=new String( (request.getParameter("condition1")).getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
		condition=condition1;
	}
	else	
		try{condition=new String( (request.getParameter("condition")).getBytes("iso-8859-1"),"GBK");}catch(Exception e){}	
	if(condition==null)
		condition=""; 
	try{
		
		if(currentId==null || currentId.equals(""))
			currentId=id;
		sql = "select * from message where (type='TALKMSG' or type='GKMSG') and (toId='"+currentId+"' or fromId='"+currentId+"') and "+
				"(isRead='1' or isRead='4') and content like \"%"+msg.Escape.escape(condition)+"%\" order by sendTime DESC";	
		if((currentId!=null && currentId.equals("all")) || todayInfo!=null)	{
			String ids="";
			sql="select id from user where domainId=\""+userManager.getUserDomainId(id)+"\"";
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection();  
			db.setSqlQuery(sql);
			rs = db.getResult();	
			while(rs!=null && rs.next())
				ids +=",\""+rs.getString("id")+"\"";
			if(ids.indexOf(",")==0)
				ids=ids.substring(1);
			String startOfToday=webStat.getTimeString("startOfToday");
			String endOfToday=webStat.getTimeString("endOfToday");
			if(currentId!=null && currentId.equals("all"))
				sql="select * from message where (type='TALKMSG' or type='GKMSG') and (toId in("+ids+") or fromId in("+ids+
					")) and (isRead='1' or isRead='4') order by sendTime DESC";	
			if(todayInfo!=null && !todayInfo.equals("") && !todayInfo.equals("null")) 			
				sql="select * from message where (type='TALKMSG' or type='GKMSG') and sendTime>=\'"+startOfToday+"\' and sendTime<=\'"+endOfToday+
					"\' and (toId in("+ids+") or fromId in("+ids+")) and (isRead='1' or isRead='4') order by sendTime DESC";	
 		} 
 		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection();  			 
		db.setSqlQuery(sql);
		rs = db.getResult();	 
	}catch(Exception ee2){}	
 }catch(Exception ee){out.println(ee.getMessage());}	
%>
<body>
<table width="778" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="774" bgcolor="#E4F2FF">对话记录查询：</td>
  </tr>
</table>
<br />
<table width="777" border="0" >
  <tr>   
<%
	String userType=mySession.getUserType(); 	
	if(userType!=null && userType.equals("2")) {%> 
	<td width="147"><form id="form3" name="form3" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
	  <label>
	  <input type="submit" name="todayInfo" size='10' value="查询今天全部信息" />
	  </label>
	</form>  </td>
    	
<%}%>
 <td width="620"><form id="form1" name="form1" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
 <%
	userType=mySession.getUserType(); 	
	if(userType!=null && userType.equals("2")) {%> 
		选择客服<select name="currentId" >		
		<%
			ResultSet rs1=null;
			try{
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection();  
				sql = "select id from user where type<>\'visitor\' and domainId=\""+userManager.getUserDomainId(id)+"\"";			 
				db.setSqlQuery(sql);
				rs1 = db.getResult();	
			}catch(Exception ee2){}	
			while(rs1!=null&& rs1.next()){ %>            	
				<option value="<%=rs1.getString("id")%>" <%=(currentId!=null && currentId.equals(rs1.getString("id")))?"selected":""%>><%=rs1.getString("id")%></option> 
			<%}%>
			<option value="all" <%=currentId!=null && currentId.equals("all")?"selected":""%> >---全部---</option> 	
	<%}%>
		
	    </select>
      短信息关键字<input type="text" name="condition1" size='8' />     
    <input type="submit" name="submit" value="搜索" />
    </form> </td>
  </tr>
</table> 
<table width="776" border="0" cellpadding="0" cellspacing="1" bgcolor="#E4F2FF" class="content9">
  <tr>
    <td height="19" colspan="5" bgcolor="#E4F2FF" >
      历史短信息：以下是搜索结果(包括留言)</td>
  </tr>
  <tr>
    <td width="50" height="19" align="left" valign="middle" bgcolor="#FFFFFF">发送者</td>
    <td width="70" align="left" valign="middle" bgcolor="#FFFFFF">接受者</td>
    <td width="134" align="left" valign="middle" bgcolor="#FFFFFF">发送时间</td>
    <td width="66" align="left" valign="middle" bgcolor="#FFFFFF">手机短信</td>
    <td width="450" height="19" align="left" valign="middle" bgcolor="#FFFFFF">消息内容</td>
  </tr>
  <%
int intPageSize = 20;//设置一页显示的记录数//设置最好是7的倍数，下面显示数据每行7个。
int intRowCount = 0;//记录总数
int intPageCount = 0;//总页数
int intPage = 0;	 //待显示页码
String strPage = request.getParameter("page");//取得显示的记录数;
if(rs !=null)
	{


			if(strPage==null || strPage.equals("")){
				intPage = 1;//当前页为空时，默认为第1页
			}else{
				intPage = Integer.parseInt(strPage);
				if(intPage<1)
				{
					intPage=1;//当前页小于1时，默认为第1页
				}
			}
			rs.last();		//移到最后
			intRowCount = rs.getRow();//得到记录总数
			intPageCount = (intRowCount+ intPageSize-1)/intPageSize;//记录总页数
			rs.beforeFirst();
			if(intPage>intPageCount)
				intPage = intPageCount;//调整待显示的页面
			
			if(intPageCount>0)
			{
				rs.absolute((intPage-1)*intPageSize+1);
				String myName=userManager.getName(id);	
				String fromName=null;
				String toName=null;			 
				for(int i = 0;i<intPageSize && !rs.isAfterLast();i++)
				{	
					if(id.equals(rs.getString("fromId")))	
							fromName=myName;
					else{
						fromName=userManager.getName( rs.getString("fromId") );
						if(fromName==null || fromName.equals(""))
							fromName=rs.getString("fromId");
					}
					if(id.equals(rs.getString("toId")))	
							toName=myName;
					else{
						toName=userManager.getName( rs.getString("toId") );
						if(toName==null || toName.equals(""))
							toName=rs.getString("toId");
					}					 
%>
  <tr>
    <td height="18" align="left" valign="middle" bgcolor="#FFFFFF"><%=fromName%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=toName%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("sendTime")%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=(rs.getString("isRead").equals("4"))?"是":""%></td>
    <td height="18" align="left" valign="middle" bgcolor="#FFFFFF"><%=msg.Escape.unescape(rs.getString("content"))%></td>
  </tr>
  <%			rs.next();
				}
			}
	}
 
%>
  <tr>
    <td height="19" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
    <td align="center" colspan="4" valign="middle" bgcolor="#FFFFFF"> 第<%=intPage%>页/共<%=intPageCount%>页&nbsp;&nbsp;
        <%
  if(intPage>1)
  {
  %>
        <a href="?page=<%=intPage-1%>&currentId=<%=currentId%>&vid=<%=vid%>&sid=<%=sid%>">上一页</a>
        <%
  }
  %>
      &nbsp;&nbsp;
      <%
  if(intPage<intPageCount)
  {
  %>
      <a href="?page=<%=intPage+1%>&currentId=<%=currentId%>&vid=<%=vid%>&sid=<%=sid%>">下一页</a>
      <%
  }
  if(db.getConnection()!=null && !db.isClosed())		
  	db.closeConnection();
  %>
    <a href="?deleteHistoryMsg=true&vid=<%=vid%>&sid=<%=sid%>"></a>历史短信息将至长保留一个月，请自行备份存留</td>
  </tr>
</table>
</body>
</html>
