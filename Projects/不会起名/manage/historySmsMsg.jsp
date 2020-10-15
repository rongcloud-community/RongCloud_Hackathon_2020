<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<%@ include file="chkLogin.jsp"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
 
<body>
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
//***********************************
//获取变量值
//***********************************
String id=null;
ResultSet rs=null; 
String deleteHistorySmsMsg=request.getParameter("deleteHistorySmsMsg");
try
{
	id = request.getParameter("id");
	if(id==null)
	 	id= vid;

	if(deleteHistorySmsMsg!=null && id!=null && !id.equals("") && !id.equals("null"))
	{
		//连接数据库
		db.setConnection();
		String sql = "delete from sms where toId='"+id+"'";
		db.setSqlQuery(sql);	 
		db.executeUpdate();
	}
	if(id!=null && !id.equals("") && !id.equals("null"))
	{
		//连接数据库
		db.setConnection();
		String sql = "select * from sms where toId='"+id+"'";
		db.setSqlQuery(sql);
		rs = db.getResult();		
	}
	
}catch(Exception ee){}	
%>
 
  <table width="783" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="content9">
    <tr>
      <td height="25" colspan="4" class="content10White">&nbsp;&nbsp;&nbsp;
	  历史手机短信记录：以下是在你和客户发生的手机短信记录	     </td>
    </tr>
    <tr>
      <td width="127" height="30" align="right" valign="middle" bgcolor="#FFFFFF">客户ID</td>
	  <td width="178" align="left" valign="middle" bgcolor="#FFFFFF">客户姓名</td>
      <td width="160" align="left" valign="middle" bgcolor="#FFFFFF">发送短信时间</td>
      <td width="313" align="left" valign="middle" bgcolor="#FFFFFF">短信内容</td>   
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
				 
				for(int i = 0;i<intPageSize && !rs.isAfterLast();i++)
				{
%>	
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("fromId")%></td>      
      <td align="left" valign="middle" bgcolor="#FFFFFF"><%=userManager.getName(rs.getString("fromId"))%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("date")%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("content")%></td>
    </tr>	 
<%			rs.next();
				}
			}
	}
 
%>	 	
	
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
      <td align="center" colspan=3 valign="middle" bgcolor="#FFFFFF">
	  第<%=intPage%>页/共<%=intPageCount%>页&nbsp;&nbsp;
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
  db.closeConnection();
  %>     
	  
	  <a href="historySmsMsg.jsp?deleteHistorySmsMsg=true&vid=<%=vid%>&sid=<%=sid%>">删除所有手机短信记录 </a>历史短信记录将至长保留一个月，请自行备份存留。</td>
    </tr>
  </table>

</body>
</html>
