<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
<jsp:useBean id="msgManager" scope="page"  class="msg.MsgManager" /> 
<%
String msg=Escape.escape("对方("+request.getParameter("id")+")正在给你传送文件......");
//msgManager.sendMsg(new msg.Message(request.getParameter("id"),request.getParameter("toid"),msg,"TALKMSG","0")); 
msgManager.sendMsg(new msg.Message("0",request.getParameter("toid"),msg,"SYSNOTIFY")); 
%>
<html>
<head>
<title>文件上传</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

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
<link href="Css/google20.css" rel="stylesheet" type="text/css">
</head>
<body bgcolor="#FFFFFF" text="#000000">

  <table width="360" border="0" cellspacing="0" cellpadding="5" align="center" bordercolordark="#CCCCCC" bordercolorlight="#000000">
  <form name="form1" method="post" action="http://webim.100im.cn/uploadSave.jsp?id=<%=request.getParameter("id")%>&toid=<%=request.getParameter("toid")%>" enctype="multipart/form-data" >
    <input type="hidden" name="act" value="upload">
	 
	<tr bgcolor="#CCCCCC"> 
      <th height="20" align="left" valign="middle" bgcolor="#CCCCCC" class="trYello">上传文件(允许的文件jpg,gif,bmp,doc,rar,zip,xsl)</th>
    </tr>
    <tr align="center" valign="middle"> 
      <td height="33" align="left" id="upid">文件: 
        <input type="file" name="file1" size="30" class="tx1" value=""></td>
    </tr>
    <tr align="center" valign="middle"> 
      <td height="20"> 
        <input type="submit" name="Submit" value="· 提交 ·" >
           </td>
    </tr>
	</form>
</table>
</body>
</html>