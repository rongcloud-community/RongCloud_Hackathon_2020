<%
	/**
	 *本文件被客户端管理员调用用来修改所有客服人员
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
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
<table width="802" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="798" bgcolor="#E4F2FF">修改用户信息</td>
  </tr>
</table>
<br />
<%
//***********************************
//获取变量值
//***********************************
try
{
	id = request.getParameter("id");
	//id = new String((request.getParameter("id")).getBytes("iso-8859-1"),"utf-8" );
	//out.println(id);
	if(id==null)
	 	id= vid;
}catch(Exception ee){}

if(id!=null && !id.equals("") && !id.equals("null"))
{
	//连接数据库
	
	if(db.getConnection()==null || db.isClosed())			 
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
		if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
%>
<form id="UserForm2" name="UserForm2" method="post" action="userEditSave.jsp?action=editUser&vid=<%=vid%>&sid=<%=sid%>">
  <table width="497" border="1" bordercolor="#A5AdC4" cellpadding="0" cellspacing="0">
    <tr>
      <td width="493"><table width="803" border="0" cellpadding="0" cellspacing="1"  class="data">
        <tr>
          <td height="25" colspan="2" bgcolor="#E7F3FF" >&nbsp;用户信息</td>
        </tr>
        <tr>
          <td width="110" height="20" align="right" valign="middle" bgcolor="#FFFFFF">登录名：</td>
          <td width="382" height="20" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input  name="id" type="hidden" id="id" size="16" value="<%=id%>"/>
            <%=id%></td>
        </tr>
        <tr>
          <td height="17" align="right" valign="middle" bgcolor="#FFFFFF">密码：</td>
          <td height="17" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input name="password" type="text" id="password" size="12" value="<%=password%>"/>
            * </td>
        </tr>
        <tr>
          <td height="17" align="right" valign="middle" bgcolor="#FFFFFF">所属部门：</td>
          <td height="17" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input name="type" type="text" id="type" size="12" value="<%=type%>"/>
            * </td>
        </tr>
        <tr>
          <td height="17" align="right" valign="middle" bgcolor="#FFFFFF">用户名称：</td>
          <td height="17" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input name="name" type="text" id="name" size="12" value="<%=name%>"/>
            * </td>
        </tr>
        <tr>
          <td height="17" align="right" valign="middle" bgcolor="#FFFFFF">呼入电话：</td>
          <td height="17" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input name="workphone" type="text" id="workphone" size="11" value="<%=workphone%>"/>
              访问者呼入电话, 座机前加区号如 01051668337，手机前加0， 建议输入手机号码</td>
        </tr>
        <tr>
          <td height="21" align="right" valign="middle" bgcolor="#FFFFFF">性别：</td>
          <td height="21" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <select name="sex" id="sex">
                <option value="男" <%if(sex=="男" || sex.equals("男")) {%> selected="selected" <%}%>>男</option>
                <option value="女" <%if(sex=="女" || sex.equals("女")) {%> selected="selected" <%}%>>女</option>
              </select>
          </td>
        </tr>
        <tr>
          <td height="17" align="right" valign="middle" bgcolor="#FFFFFF">常用邮箱：</td>
          <td height="17" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input name="email" type="text" id="email" size="18" value="<%=email%>" />
          </td>
        </tr>
        <tr>
          <td height="17" align="right" valign="middle" bgcolor="#FFFFFF">手机：</td>
          <td height="17" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input name="mobilephone" type="text" id="mobilephone" size="11" value="<%=mobilephone%>" />
          </td>
        </tr>
        <tr>
          <td height="17" align="right" valign="middle" bgcolor="#FFFFFF">QQ：</td>
          <td height="17" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input name="qq" type="text" id="qq" size="11" value="<%=qq%>" />
          </td>
        </tr>
        <tr>
          <td height="17" align="right" valign="middle" bgcolor="#FFFFFF">MSN：</td>
          <td height="17" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input name="msn" type="text" id="msn" size="16" value="<%=msn%>" />
          </td>
        </tr>
        <tr>
          <td height="22" align="right" valign="middle" bgcolor="#FFFFFF">自定义头像：</td>
          <td height="22" align="left" valign="middle" bgcolor="#FFFFFF">&nbsp;
              <input name="tag" type="text" id="tag" size="25" readonly="true" value="<%=tag%>"/>
              <input type="button" name="Submit22" value="我的照片" onclick="window.open('upfile1.jsp?formname=UserForm2&amp;editname=tag&amp;uppath=/scom/img/userHead/','','status=yes,scrollbars=yes,top=20,left=110,width=440,height=110')" />
          </td>
        </tr>
        <tr>
          <td height="22" colspan="2" align="left" valign="middle" bgcolor="#FFFFFF"><input type="submit" name="Submit" value="提交修改" />
            &nbsp;&nbsp;
            <input type="reset" name="Submit2" value="重置" /></td>
        </tr>
      </table></td>
    </tr>
  </table>
  <br />
</form>
<%
	}
}
%>
</body>
</html>
