<%
	/**
	 *本文件被客户端调用用来管理联系人
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
<table width="808" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="801" bgcolor="#E4F2FF">通讯录：</td>
  </tr>
</table>
<br />
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
String scomClient=vid;
ResultSet rs=null; 
String sql="";
String submit=request.getParameter("submit");
String delete=request.getParameter("delete");
String edit=request.getParameter("edit");
String editConfirm=request.getParameter("editConfirm");
String id=null,name=null,address=null,postCode=null,telephone=null,mobile=null,companyName=null,qq=null,msn=null;
String id1=null,name1=null,address1=null,postCode1=null,telephone1=null,mobile1=null,companyName1=null,qq1=null,msn1=null;
id=request.getParameter("id");
postCode=request.getParameter("postCode");
telephone=request.getParameter("telephone");
mobile=request.getParameter("mobile");
qq=request.getParameter("qq");
msn=request.getParameter("msn");

id1=request.getParameter("id1");
postCode1=request.getParameter("postCode1");
telephone1=request.getParameter("telephone1");
mobile1=request.getParameter("mobile1");
qq1=request.getParameter("qq1");
msn1=request.getParameter("msn1");
try{
	name=new String( (request.getParameter("name")).getBytes("iso-8859-1"),"utf-8" );
	address=new String( (request.getParameter("address")).getBytes("iso-8859-1"),"utf-8" );
	companyName=new String( (request.getParameter("companyName")).getBytes("iso-8859-1"),"utf-8" );
	 
}catch(Exception e){}
try{	 
	name1=new String( (request.getParameter("name1")).getBytes("iso-8859-1"),"utf-8" );
	address1=new String( (request.getParameter("address1")).getBytes("iso-8859-1"),"utf-8" );
	companyName1=new String( (request.getParameter("companyName1")).getBytes("iso-8859-1"),"utf-8" );
}catch(Exception e){}
if(name==null) name="";
if(address==null) address="";
if(postCode==null) postCode="";
if(telephone==null) telephone="";
if(mobile==null) mobile="";
if(companyName==null) companyName="";
if(qq==null) qq="";
if(msn==null) msn="";

if(name1==null) name1="";
if(address1==null) address1="";
if(postCode1==null) postCode1="";
if(telephone1==null) telephone1="";
if(mobile1==null) mobile1="";
if(companyName1==null) companyName1="";
if(qq1==null) qq1="";
if(msn1==null) msn1="";
try
{	 
	if(submit!=null)
	{
		sql="insert into contact values(null,\""+scomClient+"\",\""+name+"\",\""+address+"\",\""+postCode+"\",\""+
			telephone+"\",\""+mobile+"\",\""+companyName+"\",\""+qq+"\",\""+msn+"\")"; 
	 	//连接数据库
		if(db.getConnection()==null || db.isClosed())			 
	 		db.setConnection();  		 
		db.setSqlQuery(sql);	 
		db.executeUpdate();		  
	}	 
}catch(Exception ee){}	
try
{	 
	if(editConfirm!=null)
	{
		sql="update contact set name=\""+name1+"\",address=\""+address1+"\",postCode=\""+postCode1+"\",telephone=\""+telephone1+
			"\",mobile=\""+mobile1+"\",companyName=\""+companyName1+"\",qq=\""+qq1+"\",msn=\""+msn1+"\" where id=\""+id1+"\""; 
			//out.println(sql);
	 	//连接数据库
		if(db.getConnection()==null || db.isClosed())			 
	 		db.setConnection();  		 
		db.setSqlQuery(sql);	 
		db.executeUpdate();		  
	}	
	
}catch(Exception ee){}	
try
{	
	if (delete!=null){
		sql="delete from contact where id=\""+id+"\""; 
	 	//连接数据库
		if(db.getConnection()==null || db.isClosed())			 
	 		db.setConnection();  		 
		db.setSqlQuery(sql);	 
		db.executeUpdate();		 	
	}
}catch(Exception ee){}	
try
{	 
	sql="select * from contact where userId=\""+scomClient+"\" ORDER BY id DESC"; 
	//连接数据库
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection();  
	 
	db.setSqlQuery(sql);	 
	rs=db.getResult();
		  
	 
}catch(Exception ee){}	
%>

  <table width="800" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="content9">
    <tr>
      <td height="19" colspan="9" bgcolor="#E4F2FF">&nbsp;&nbsp;&nbsp;添加新的联系人</td>
    </tr>
    <tr>
      <td width="36" height="19" align="left" valign="middle" bgcolor="#FFFFFF">姓名</td>
      <td width="70" align="left" valign="middle" bgcolor="#FFFFFF">地址</td>
      <td width="56" align="left" valign="middle" bgcolor="#FFFFFF">邮编</td>
      <td width="35" align="left" valign="middle" bgcolor="#FFFFFF">电话</td>
      <td width="70" align="left" valign="middle" bgcolor="#FFFFFF">手机</td>
      <td width="140" align="left" valign="middle" bgcolor="#FFFFFF">公司名称</td>
      <td width="35" align="left" valign="middle" bgcolor="#FFFFFF">QQ</td>
      <td width="75" align="left" valign="middle" bgcolor="#FFFFFF">MSN</td>
      <td width="275" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
    </tr>
   <form id="form1" name="form1" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">   
    <tr>
      <td height="16"  valign="middle" bgcolor="#FFFFFF"> 
	  <input type="text" name="name" size=4  /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF"> 
	  <input type="text" name="address" size=12  /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="postCode" size=4  /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="telephone" size=9  /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="mobile" size=8  /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="companyName" size=14  /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="qq" size=5  /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="msn" size=8  /> </td>
      <td align="left" valign="middle" bgcolor="#FFFFFF"><input type="submit" size=3 name="submit" value='添加联系人'/></td>
    </tr>
	</form>
	
	<%if(edit!=null && editConfirm==null){%>
	<form id="form2" name="form2" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
	 <tr>
      <td height="16"  valign="middle" bgcolor="#FFFFFF"> 
	  <input type="text" name="name1" size=4 value='<%=(name!=null)?name:""%>' /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF"> 
	  <input type="text" name="address1" size=12 value='<%=(address!=null)?address:""%>' /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="postCode1" size=4 value='<%=(postCode!=null)?postCode:""%>' /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="telephone1" size=9 value='<%=(telephone!=null)?telephone:""%>' /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="mobile1" size=8 value='<%=(mobile!=null)?mobile:""%>' /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="companyName1" size=14 value='<%=(companyName!=null)?companyName:""%>' /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	  <input type="text" name="qq1" size=5 value='<%=(qq!=null)?qq:""%>' /></td>
      <td align="left" valign="middle" bgcolor="#FFFFFF">
	 <input type="text" name="msn1" size=8 value='<%=(msn!=null)?msn:""%>' />
	 <input type="hidden" name="id1" value='<%=id%>'/> </td>
      <td align="left" valign="middle" bgcolor="#FFFFFF"><input type="submit"  size=3 name="editConfirm" value='修改联系人'/></td>
    </tr>
	</form>
	<%}%>
</table>

<table width="807" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="content9">
<tr>
      <td height="19" colspan="10" bgcolor="#E4F2FF">&nbsp;&nbsp;&nbsp;通讯录</td>
  </tr>
    <tr>
      <td width="29" align="right" valign="middle" bgcolor="#FFFFFF">删除</td>
      <td width="30" align="right" valign="middle" bgcolor="#FFFFFF">修改</td>
      <td width="60" height="19" align="right" valign="middle" bgcolor="#FFFFFF">姓名</td>
	  <td width="120" align="left" valign="middle" bgcolor="#FFFFFF">地址</td>
      <td width="72" align="left" valign="middle" bgcolor="#FFFFFF">邮编</td>
      <td width="138" align="left" valign="middle" bgcolor="#FFFFFF">电话</td>
      <td width="99" align="left" valign="middle" bgcolor="#FFFFFF">手机</td>
      <td width="117" align="left" valign="middle" bgcolor="#FFFFFF">公司名称</td>
      <td width="83" align="left" valign="middle" bgcolor="#FFFFFF">QQ</td>
      <td width="46" align="left" valign="middle" bgcolor="#FFFFFF">MSN</td>   
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
 <form id="form<%=rs.getString("id")%>"   method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
    <tr>
      <td align="center" valign="middle" bgcolor="#FFFFFF">
	  	<a href="?id=<%=rs.getString("id")%>&delete=true&vid=<%=vid%>&sid=<%=sid%>"><img src="pic/del.gif" width="15" height="15"  border="0" /></a></td>
      <td align="center" valign="middle" bgcolor="#FFFFFF">  	 
		<img src="pic/edit.gif" width="5" height="8"  border="0"  style="cursor:hand" onclick="form<%=rs.getString("id")%>.action='';form<%=rs.getString("id")%>.submit();" /> </td>
      <td height="18" align="right" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("name")%></td>      
      <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("address")%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("postCode")%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("telephone")%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("mobile")%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("companyName")%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("qq")%></td>
	  <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("msn")%></td>
    </tr>	
	<input type="hidden" name="name" size=5 value='<%=rs.getString("name")%>' />
	<input type="hidden" name="address" size=5 value='<%=rs.getString("address")%>' />
	<input type="hidden" name="postCode" size=5 value='<%=rs.getString("postCode")%>' />
	<input type="hidden" name="telephone" size=5 value='<%=rs.getString("telephone")%>' />
	<input type="hidden" name="mobile" size=5 value='<%=rs.getString("mobile")%>' />
	<input type="hidden" name="companyName" size=5 value='<%=rs.getString("companyName")%>' />
	<input type="hidden" name="qq" size=5 value='<%=rs.getString("qq")%>' />
	<input type="hidden" name="msn" size=5 value='<%=rs.getString("msn")%>' />
	<input type="hidden" name="id" size=5 value='<%=rs.getString("id")%>' />
	<input type="hidden" name="edit" size=5 value='true' />
  </form>
<%			rs.next();
				}
			}
	}
 
%>	 	
	
    <tr>
      <td align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
      <td align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
      <td height="19" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
      <td align="center" colspan=7 valign="middle" bgcolor="#FFFFFF">
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
  %></td>
    </tr>
</table>

  <br />
  
</body>
</html>
