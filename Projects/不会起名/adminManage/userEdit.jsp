<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>

<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
 <%
/////////////////////session检测////////////////////////////////////////////////
String vid="admin";
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<%
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String id = "";
String password = null;
String type = null;
String name = null;
String tag = null;
String sex = null;
String workphone = null;
String mobilephone = null;
String email = null;
String qq = null;
String msn = null;
%>
<body>
<%
//***********************************
//获取变量值
//***********************************
try
{
	id = request.getParameter("id");
	if(id==null)
	 	id= vid;
}catch(Exception ee){}

if(id!=null && !id.equals("") && !id.equals("null"))
{
	//连接数据库
	db.setConnection();
	sql = "select * from user where id='"+id+"'";
	db.setSqlQuery(sql);
	rs = db.getResult();
	if(rs!=null && rs.next())
	{
		try{
			password = rs.getString("password");
			type = rs.getString("type");
			name = rs.getString("name");
			tag = rs.getString("tag");
			//sex = new String( (rs.getString("sex")).getBytes("iso-8859-1"),"utf-8" );
			sex = rs.getString("sex");
			workphone = rs.getString("workphone");
			mobilephone = rs.getString("mobilephone");
			email = rs.getString("email");
			qq = rs.getString("qq");
			msn = rs.getString("msn");
		}catch(Exception ee){}
%>
<form id="UserForm2" name="UserForm2" method="post" action="userEditSave.jsp?action=editUser">
  <table width="476" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="content9">
    <tr>
      <td height="25" colspan="2" class="content10White">&nbsp;&nbsp;&nbsp;修改用户信息</td>
    </tr>
    <tr>
      <td width="110" height="30" align="right" valign="middle" bgcolor="#FFFFFF">登录名：</td>
      <td width="363" height="30" align="left" valign="middle" bgcolor="#FFFFFF">
&nbsp;        <input  name="id" type="hidden" id="id" size="16" value="<%=id%>"/><%=id%></td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">密码：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
        &nbsp;        <input name="password" type="text" id="password" size="12" value="<%=password%>"/>
        * </td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">所属部门：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
&nbsp;        <input name="type" type="text" id="type" size="12" value="<%=type%>"/>
* </td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">用户名称：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
&nbsp;        <input name="name" type="text" id="name" size="12" value="<%=name%>"/>
* </td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">办公电话：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
&nbsp;        <input name="workphone" type="text" id="workphone" size="11" value="<%=workphone%>"/>座机前加区号，手机前加0，以备VOIP呼入</td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">性别：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
&nbsp;<select name="sex" id="sex">
          <option value="男" <%if(sex=="男" || sex.equals("男")) {%> selected="selected" <%}%>>男</option>
          <option value="女" <%if(sex=="女" || sex.equals("女")) {%> selected="selected" <%}%>>女</option>
      </select>      </td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">常用邮箱：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
&nbsp;        <input name="email" type="text" id="email" size="18" value="<%=email%>" />      </td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">手机：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
&nbsp;        <input name="mobilephone" type="text" id="mobilephone" size="11" value="<%=mobilephone%>" />      </td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">QQ：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
&nbsp;        <input name="qq" type="text" id="qq" size="11" value="<%=qq%>" />      </td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">MSN：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
&nbsp;        <input name="msn" type="text" id="msn" size="16" value="<%=msn%>" />      </td>
    </tr>
    <tr>
      <td height="30" align="right" valign="middle" bgcolor="#FFFFFF">自定义头像：</td>
      <td height="30" align="left" valign="middle" bgcolor="#FFFFFF">
        &nbsp;
        <input name="tag" type="text" id="tag" size="25" readonly="true" value="<%=tag%>"/>        <input type="button" name="Submit22" value="我的照片" onClick="window.open('upfile1.jsp?formname=UserForm2&amp;editname=tag&amp;uppath=/scom/img/userHead/','','status=yes,scrollbars=yes,top=20,left=110,width=440,height=110')" />      </td>
    </tr>
    <tr>
      <td height="30" colspan="2" align="center" valign="middle" bgcolor="#FFFFFF"><input type="submit" name="Submit" value="修改" />
      &nbsp;&nbsp;
      <input type="reset" name="Submit2" value="重置" /></td>
    </tr>
  </table>
</form>
<%
	}
}
%>
</body>
</html>
