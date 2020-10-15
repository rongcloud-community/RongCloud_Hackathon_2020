<%
	/**
	 *本文件被客户端调用用来缉拿将某个ID加进为黑名单，然后该浏览者将不再显示浮动或嵌入图标
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head> 
<body>
<table width="785" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="785" bgcolor="#E4F2FF">黑名单管理：</td>
  </tr>
</table>
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
	if(payLevel<=0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用本功能，如果需要，请申请商务版以上版本。</font>");
%> 
<%
//***********************************
//获取变量值
//***********************************
String id=null;
ResultSet rs=null; 
ResultSet rs1=null;  
String condition= null;
String sql=null;
if(payLevel>=1){
	try
	{
		String action=request.getParameter("action");
		String blockId=request.getParameter("blockId");
		if(action!=null &&action.equals("block") && blockId!=null){	 
			try{
				sql="insert into block values(\""+blockId+"\")";
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 
				db.setSqlQuery(sql);	 
				db.executeUpdate();
				out.println("系统已将浏览者("+blockId+")列入黑名单。");
			}catch(Exception ee1){out.println(ee1.getMessage());}	
		}
		else if(action!=null &&action.equals("resume") && blockId!=null){	 
			try{
				sql="delete from block where blockId=\""+blockId+"\"";
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 
				db.setSqlQuery(sql);	 
				db.executeUpdate();
				out.println("系统已将浏览者("+blockId+")从黑名单中删除。");
			}catch(Exception ee1){out.println(ee1.getMessage());}	
		}
		id = request.getParameter("id");
		if(id==null)
			id= vid;	 
		try{condition=new String( (request.getParameter("condition")).getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
		if(condition!=null && !condition.equals("") && !condition.equals("null"))
		{
			try{
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection();  
				sql = "select * from message where (fromId='"+condition+"' or content like '%"+msg.Escape.escape(condition)+"%') and type='TALKMSG' and (isRead='1' or isRead='4') and toId='"+id+"' order by sendTime DESC";		
				db.setSqlQuery(sql);
				rs = db.getResult();	
				//out.println(sql);
			}catch(Exception ee2){}	
		}
	
		try{
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection();  
			String domainIds=userManager.getUserDomainId(id);
			sql = "select * from visitor,block where block.blockId=visitor.id and domainId in("+domainIds+") and type='visitor'";
			db.setSqlQuery(sql);	 
			rs1 = db.getResult();
			//out.println(sql);
		}catch(Exception ee3){}
	}catch(Exception ee){out.println(ee.getMessage());}	
}
%>
<br />
<table width="780" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="776"><table width="781" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="data">
      <tr>
        <td height="25" colspan="3" bgcolor="#E7F3FF" >&nbsp;黑名单列表</td>
      </tr>
      <tr>
        <td width="55" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
        <td width="165" height="25" align="left" valign="middle" bgcolor="#FFFFFF">发送者ID</td>
        <td width="557" align="left" valign="middle" bgcolor="#FFFFFF">发送者姓名</td>
      </tr>
      <%
int intPageSize1 = 20;//设置一页显示的记录数//设置最好是7的倍数，下面显示数据每行7个。
int intRowCount1 = 0;//记录总数
int intPageCount1 = 0;//总页数
int intPage1 = 0;	 //待显示页码
String strPage1 = request.getParameter("page1");//取得显示的记录数;
if(rs1 !=null)
	{


			if(strPage1==null || strPage1.equals("")){
				intPage1 = 1;//当前页为空时，默认为第1页
			}else{
				intPage1 = Integer.parseInt(strPage1);
				if(intPage1<1)
				{
					intPage1=1;//当前页小于1时，默认为第1页
				}
			}
			rs1.last();		//移到最后
			intRowCount1 = rs1.getRow();//得到记录总数
			intPageCount1 = (intRowCount1+ intPageSize1-1)/intPageSize1;//记录总页数
			rs1.beforeFirst();
			if(intPage1>intPageCount1)
				intPage1 = intPageCount1;//调整待显示的页面
			
			if(intPageCount1>0)
			{
				rs1.absolute((intPage1-1)*intPageSize1+1);			 
				String fromName1=null;			 		 
				for(int i = 0;i<intPageSize1 && !rs1.isAfterLast();i++)
				{						 
						fromName1=userManager.getName( rs1.getString("id") );
						if(fromName1==null || fromName1.equals(""))
							fromName1="";					 
%>
      <tr>
        <td align="left" valign="middle" bgcolor="#FFFFFF"><a href='block.jsp?action=resume&amp;blockId=<%=rs1.getString("id")%>&vid=<%=vid%>&sid=<%=sid%>'>恢复</a></td>
        <td height="20" align="left" valign="middle" bgcolor="#FFFFFF"><%=rs1.getString("id")%></td>
        <td align="left" valign="middle" bgcolor="#FFFFFF"><%=fromName1%></td>
      </tr>
      <%			rs1.next();
				}
			}
	}
 
%>
      <tr>
        <td align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
        <td height="25" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
        <td align="center" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>
<br />
<form id="form1" name="form1" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
  <label>请输入要列入黑名单的ID/短信息部分内容
  <input type="text" name="condition" />
  </label>
  <label>
  <input type="submit" name="submit" value="查找" />
  </label>
</form>
<table width="785" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="785"><table width="782" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="data">
      <tr>
        <td height="25" colspan="5" bgcolor="#E7F3FF" >&nbsp;&nbsp;点击左边图标可以禁止浏览者</td>
      </tr>
      <tr>
        <td width="30" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
        <td width="68" height="25" align="left" valign="middle" bgcolor="#FFFFFF">发送者</td>
        <td width="133" align="left" valign="middle" bgcolor="#FFFFFF">发送时间</td>
        <td width="78" align="left" valign="middle" bgcolor="#FFFFFF">手机短信</td>
        <td width="467" height="25" align="left" valign="middle" bgcolor="#FFFFFF">短信息内容</td>
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
					//if(id.equals(rs.getString("fromId")))	
							//fromName=myName;
					//else{
						fromName=userManager.getName( rs.getString("fromId") );
						if(fromName==null || fromName.equals(""))
							fromName=rs.getString("fromId");
					//}
							 
%>
      <tr>
        <td align="left" valign="middle" bgcolor="#FFFFFF"><a href="block.jsp?action=block&amp;blockId=<%=rs.getString("fromId")%>&vid=<%=vid%>&sid=<%=sid%>"><img src="pic/block.gif" width="22" height="22" border="0"  alt='点击加入黑名单'/></a></td>
        <td height="20" align="left" valign="middle" bgcolor="#FFFFFF"><%=fromName%></td>
        <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("sendTime")%></td>
        <td align="left" valign="middle" bgcolor="#FFFFFF"><%=(rs.getString("isRead").equals("4"))?"是":""%></td>
        <td height="20" align="left" valign="middle" bgcolor="#FFFFFF"><%=msg.Escape.unescape(rs.getString("content"))%></td>
      </tr>
      <%			rs.next();
				}
			}
	}
 
%>
      <tr>
        <td align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
        <td height="25" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
        <td align="center" colspan="3" valign="middle" bgcolor="#FFFFFF"> 第<%=intPage%>页/共<%=intPageCount%>页&nbsp;&nbsp;
            <%
  if(intPage>1)
  {
  %>
            <a href="?page=<%=intPage-1%>&vid=<%=vid%>&sid=<%=sid%>">上一页</a>
            <%
  }
  %>
          &nbsp;&nbsp;
          <%
  if(intPage<intPageCount)
  {
  %>
          <a href="?page=<%=intPage+1%>&vid=<%=vid%>&sid=<%=sid%>">下一页</a>
          <%
  }
//关闭数据库
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();	
  %></td>
      </tr>
    </table></td>
  </tr>
</table>
<br />
<br>

</body>
</html>
