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
//***********************************
//获取变量值
//***********************************
String id=null;
ResultSet rs=null; 
String key=null;//request.getParameter("key");  
String submit=request.getParameter("submit"); 
if(submit!=null)
	try{key=new String( (request.getParameter("key")).getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
else	
	try{key=new String( (request.getParameter("key")).getBytes("iso-8859-1"),"GBK");}catch(Exception e){}	 
if(key!=null && !key.equals("")){
	try{
		id= (String)session.getValue("scomClient");
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection();
		String sql = "select * from message where (toId='"+id+"' or fromId='"+id+"') and type='TALKMSG' and "+
					"(isRead='1' or isRead='4') and content like \"%"+msg.Escape.escape(key)+"%\" order by sendTime DESC";		
					out.println(sql); 
		db.setSqlQuery(sql);
		rs = db.getResult();		
 	}catch(Exception e){}
} 
%>

<table width="840" border="0">
  <tr>
    <td width="834"><form id="form1" name="form1" method="post" action="">
      请输入短信息部分内容
        <input type="text" name="key" />     
      <input type="submit" name="submit" value="提交" />     
    </form></td>
  </tr>
</table>
<table width="946" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="content9">
    <tr>
      <td height="25" colspan="5" class="content10White">&nbsp;&nbsp;&nbsp;
	  历史短信息：以下是搜索结果</td>
    </tr>
    <tr>
      <td width="36" height="25" align="left" valign="middle" bgcolor="#FFFFFF">发送者</td>	  
      <td width="36" align="left" valign="middle" bgcolor="#FFFFFF">接受者</td>
      <td width="100" align="left" valign="middle" bgcolor="#FFFFFF">发送时间</td>   
	  <td width="54" align="left" valign="middle" bgcolor="#FFFFFF">手机短信</td>   
      <td width="499" height="25" align="left" valign="middle" bgcolor="#FFFFFF">留言内容</td>
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
      <td height="20" align="left" valign="middle" bgcolor="#FFFFFF"><%=fromName%></td>          
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=toName%></td>
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
      <td height="25" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
      <td align="center" colspan=4 valign="middle" bgcolor="#FFFFFF">
	  第<%=intPage%>页/共<%=intPageCount%>页&nbsp;&nbsp;
	    <%
  if(intPage>1)
  {
  %>
            <a href="?page=<%=intPage-1%>">上一页</a>
            <%
  }
  %>
          &nbsp;&nbsp;
          <%
  if(intPage<intPageCount)
  {
  %>
          <a href="?page=<%=intPage+1%>">下一页</a>
          <%
  }
  if(db.getConnection()!=null && !db.isClosed())		
  	db.closeConnection();
  %>     
	  
	 </td>
    </tr>
</table>

</body>
</html>
