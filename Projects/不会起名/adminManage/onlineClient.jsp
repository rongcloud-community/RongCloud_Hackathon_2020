<%
	/**
	 *本文件被客户端调用用来查询历史VOIP
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
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
 
<body>
<table width="784" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="780" bgcolor="#E4F2FF">在线客户端列表：</td>
  </tr>
</table>
<br />
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid) || !mySession.getUserType().equals("0")){
	out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
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
try
{
 	//连接数据库
	if(db.getConnection()==null || db.isClosed())			 
	 	db.setConnection(); 
 	String sql = "select id,name,user.domainId,companyName from user,site where user.domainId=site.domainIds and parentId=0"+
				 " and user.type<>\"visitor\" and user.state<>\"OFFLINE\"";
	db.setSqlQuery(sql);
	rs = db.getResult();		
 }catch(Exception ee){}	
%>
 
  <table width="783" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="content9">
    <tr>
      <td height="25" colspan="4" bgcolor="#E4F2FF">&nbsp;&nbsp;在线客户端列表 </td>
    </tr>
    <tr>
      <td width="127" height="19" align="right" valign="middle" bgcolor="#FFFFFF">客户ID</td>
	  <td width="178" align="left" valign="middle" bgcolor="#FFFFFF">客户姓名</td>
      <td width="160" align="left" valign="middle" bgcolor="#FFFFFF">站点ID（s）</td>
      <td width="313" align="left" valign="middle" bgcolor="#FFFFFF">公司名称</td>   
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
      <td height="18" align="right" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("id")%></td>      
      <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("name")%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("domainId")%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("companyName")%></td>
    </tr>	 
<%			rs.next();
				}
			}
	}
 
%>	 	
	
    <tr>
      <td height="38" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
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
//关闭数据库
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
  %>     
	  
	  <a href="historyVoip.jsp?deleteHistoryVoip=true"></a></td>
    </tr>
  </table>

</body>
</html>
