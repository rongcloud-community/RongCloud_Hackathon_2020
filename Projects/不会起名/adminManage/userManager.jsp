<%
	/**
	 *本文件被admin调用来修改某个网站的客服人员
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />

<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<html>
<head>
 
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<script language=javascript>
function userCheck(formName)
{
	if(formName.id.value=="")
	{
		alert("登录名不能为空！");
		formName.id.focus();
		return false;
	}
	if(formName.password.value=="")
	{
		alert("密码不能为空！");
		formName.password.focus();
		return false;
	}
	if(formName.type.value=="")
	{
		alert("所属部门不能为空！");
		formName.type.focus();
		return false;
	}
	if(formName.name.value=="")
	{
		alert("用户名称不能为空！");
		formName.name.focus();
		return false;
	}
}
</script>
</head>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid="admin";
String sid=request.getParameter("sid");
out.println(vid +" " +sid);
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	//out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		//return;	
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
String domainId = "";

//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名，也就是id
//id = (String)session.getValue("scomClient");
//超级管理后台中该id通过参数获取
id=request.getParameter("id");
domainId=userManager.getUserDomainId(id); 
%>
<body>
<table width="790" height="223" border="0" cellpadding="0" cellspacing="0">
  <tr class="content10White">
    <td width="200" height="25"></td>
    <td width="588" height="25">用户管理</td>
  </tr>
  <tr class="content10White">
    <td width="200" height="25"> </td>
    <td width="588" height="25"><form  method="post" action="userManager.jsp">
      <label>输入站点管理员ID:
      <input type="text" name="id">
      </label>
      <label>
      <input type="submit" name="Submit" value="提交">
      </label>
    </form></td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="100" align="left" valign="middle">	
	<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
      <tr style="">
        <td width="42" height="25" align="center" valign="middle" class="content10hui">序号</td>
        <td width="174" height="25" align="center" valign="middle" class="content10hui">用户</td>
        <td width="117" height="25" align="center" valign="middle" class="content10hui">密码</td>
        <td width="111" height="25" align="center" valign="middle" class="content10hui">所属部门</td>
        <td width="111" height="25" align="center" valign="middle" class="content10hui">用户名称</td>
        <td width="111" height="25" align="center" valign="middle" class="content10hui">性别</td>
        <td width="114" height="25" align="center" valign="middle" class="content10hui">操作</td>
      </tr>
	  <%
	  sql = "select * from user where type<>'visitor' and domainId='"+domainId+"' order by type";
 	  if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
	  db.setSqlQuery(sql);
	  rs=db.getResult();
	  int i = 1;
	  while(rs!=null && rs.next())
	  {
	  %>
	  <form id="UserForm" name="UserForm" method="post" action="userSave.jsp?action=editUser">
      <tr>
        <td height="30" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><%=i%></td>
        <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("id")%></td>
        <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("password")%></td>
        <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("type")%></td>
        <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("name")%></td>
        <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("sex")%></td>
        <td height="30" align="center" valign="middle" style="border-right: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC">
		<a href="userEdit.jsp?id=<%=rs.getString("id")%>">修改</a>&nbsp;/ 
		<a href='javascript:if(confirm("确认删除?")) location="userEditSave.jsp?id=<%=rs.getString("id")%>&action=delUser"'>删除</a></td>
      </tr>
	  </form>
	  <%
	   i = i+1;
	   }
if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();	
	  %>
    </table>
</td>
  </tr>  
  <tr>
    <td height="25">&nbsp;</td>
    <td height="100">登陆名中不可含有.符号,如abc@uniscom.cn<br />
    <table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
      <tr style="">
        <td width="144" height="25" align="center" valign="middle" class="content10hui">登录名*</td>
        <td width="99" height="25" align="center" valign="middle" class="content10hui">密码*</td>
        <td width="102" height="25" align="center" valign="middle" class="content10hui">所属部门*</td>
        <td width="130" height="25" align="center" valign="middle" class="content10hui">用户名称*</td>
        <td width="118" height="25" align="center" valign="middle" class="content10hui">办公电话</td>
        <td width="187" height="25" align="center" valign="middle" class="content10hui">性别</td>
      </tr>
	  <!--注意这里如果要上传图像就要 enctype="multipart/form-data"，但method="get"-->
      <form action="userEditSave.jsp?action=addUser" method="post" name="UserForm2" id="UserForm2">
        <tr>
          <td height="30" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><input name="id" type="text" id="id" size="16"/></td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><input name="password" type="text" id="password" size="12"/></td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><input name="type" type="text" id="type" size="12"/></td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><input name="name" type="text" id="name" size="12"/></td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC">
            <input name="workphone" type="text" id="workphone" size="11" />          </td>
          <td height="30" align="center" valign="middle" style="border-right: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC">
            <select name="sex" id="sex">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>          </td>
        </tr>
        <tr class="content10hui">
          <td height="25" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC">常用邮箱</td>
          <td height="25" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC">手机</td>
          <td height="25" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC">QQ</td>
          <td height="25" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC">MSN</td>
          <td height="25" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC">自定义头像</td>
          <td height="25" align="center" valign="middle" style="border-right: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC">建议大小 &nbsp;110X90像素</td>
        </tr>
        <tr>
          <td height="30" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><input name="email" type="text" id="email" size="18" /></td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><input name="mobilephone" type="text" id="mobilephone" size="11" /></td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><input name="qq" type="text" id="qq" size="11" /></td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><input name="msn" type="text" id="msn" size="16" /></td>
          <td height="30" colspan="2" align="left" valign="middle" style="border-right: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC">
		    <input name="tag" type="text" id="tag" size="25" readonly="true"/>
		  <input type="button" name="Submit22" value="我的照片" onClick="window.open('upfile1.jsp?formname=UserForm2&amp;editname=tag&amp;uppath=/scom/img/userHead/','','status=yes,scrollbars=yes,top=20,left=110,width=440,height=110')" /></td>
        </tr>
        <tr>
          <td height="30" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC">
            <input type="submit" name="Submit3" value="增加新用户" onClick="return userCheck(UserForm2)" />
          </td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC">&nbsp;</td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC">&nbsp;</td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC">&nbsp;</td>
          <td height="30" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC">&nbsp;</td>
          <td height="30" align="center" valign="middle" style="border-right: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC">&nbsp;</td>
        </tr>
      </form>
    </table></td></tr>
</table>
</body>
</html>
