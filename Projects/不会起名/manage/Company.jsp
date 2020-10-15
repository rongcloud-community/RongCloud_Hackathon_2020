<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
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
</head>
<%
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;
%>
<body>
<table width="800" border="0" align="left" cellpadding="0" cellspacing="0" class="content9">
  <tr>
    <td height="30" class="content10White">&nbsp;&nbsp;现有业务部门</td>
  </tr>
  <tr>
    <td height="30"><br />
      <table width="334" border="0" cellspacing="0" cellpadding="0">

        <tr>
          <td width="52" height="25" align="center" valign="middle" bgcolor="#F2F2F2" class="content9">序号</td>
          <td width="132" height="25" align="center" valign="middle" bgcolor="#F2F2F2" class="content9">部门名称</td>
          <td width="103" align="center" valign="middle" bgcolor="#F2F2F2" class="content9">操作</td>
        </tr>
	<%
	db.setConnection();
	sql = "select * from department where domainId='"&&"'";
	
	%>
		<form id="form1" name="form1" method="post" action="">
        <tr>
          <td height="25" align="center" valign="middle" class="content9">&nbsp;</td>
          <td height="25" align="center" valign="middle" class="content9"><input name="textfield" type="text" size="20" /></td>
          <td align="center" valign="middle" class="content9"><label>
            <input type="submit" name="Submit" value="提交" />
          </label>
            &nbsp;
            <input type="reset" name="Submit2" value="重置" /></td>
        </tr>
		</form>
      </table>
      
        <br /></td>
  </tr>
  <tr>
    <td height="30" class="content10White">&nbsp;&nbsp;增加业务部门</td>
  </tr>
  <tr>
    <td height="30"><table width="334" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="152" height="25" align="center" valign="middle" bgcolor="#F2F2F2" class="content9">部门名称</td>
        <td width="135" align="center" valign="middle" bgcolor="#F2F2F2" class="content9">操作</td>
      </tr>
      <tr>
        <td height="25" align="center" valign="middle" class="content9"><input name="textfield2" type="text" size="20" /></td>
        <td align="center" valign="middle" class="content9"><input type="submit" name="Submit3" value="提交" /></td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
