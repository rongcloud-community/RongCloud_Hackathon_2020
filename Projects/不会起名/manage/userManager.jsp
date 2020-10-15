<%
	/**
	 *本文件被客户端管理员调用用做管理所有客服人员
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
<!--让页面顶到最左最上-->
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
}
.STYLE1 {color: #FF0000}
.data{
text-align:left;
font-size:12px;
background-color:#fff;
border-collapse:collapse;
empty-cells: show; 
margin:0px;
padding:0px;

}
.STYLE2 {color: #66CC00}
.STYLE4 {color: #FF0000; font-size: 24pt; }
-->
</style>
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
String domainId = "";
//***********************************
//获取变量值
//***********************************
id = vid; //取出登录用户的用户名，也就是id
domainId=userManager.getUserDomainId(id);
//session.setAttribute("domainId",domainId); 
%>
<body>
<br />
<table width="790" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF">用户管理</td>
  </tr>
</table>
<br />
<table width="790" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td><table width="788" border="0" cellpadding="0" cellspacing="0" class="data">
      <tr style="">
        <td width="42" height="20" align="center" valign="middle" bgcolor="#E4F2FF"  >序号</td>
        <td width="174" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >用户</td>
        <td width="117" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >密码</td>
        <td width="111" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >所属部门</td>
        <td width="111" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >用户名称</td>
        <td width="111" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >性别</td>
        <td width="122" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >操作</td>
      </tr>
      <%
	  sql = "select * from user where type<>'visitor' and domainId='"+domainId+"' order by type";
	  db.setSqlQuery(sql);
	  if(db.getConnection()==null || db.isClosed())			 
	  	db.setConnection(); 
	  rs=db.getResult();
	  int i = 1;
	  while(rs!=null && rs.next())
	  {
	  %>
      <form id="UserForm" name="UserForm" method="post" action="">
        <tr>
          <td height="20" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><%=i%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("id")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("password")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("type")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("name")%></td>
          <td height="20" align="center" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("sex")%></td>
          <td height="20" align="center" valign="middle" style="border-right: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><a href="userEdit.jsp?id=<%=rs.getString("id")%>&vid=<%=vid%>&sid=<%=sid%>">修改</a>&nbsp;/
            <%if(rs.getString("id").indexOf("admin@")==0){}else{%>            
			  <a href='javascript:if(confirm(&quot;确认删除?&quot;)) location=&quot;userEditSave.jsp?id=<%=rs.getString("id")%>&amp;action=delUser&vid=<%=vid%>&sid=<%=sid%>&quot;'>删除</a>
              <%}%>
          </td>
        </tr>
      </form>
      <%
	   i = i+1;
	   }
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
	  %>
    </table></td>
  </tr>
</table>
<br />
<table width="790" height="138" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
<script language="javascript">	
	function userCheck(){
		var theForm=document.getElementById("UserForm2");
		if(theForm && theForm.id.value==""){
			alert("请输入登陆名");
			return;
		}
		if(theForm && theForm.password.value==""){
			alert("请输入密码");
			return;
		}
		if(theForm && theForm.type.value==""){
			alert("请输入类型");
			return;
		}
		if(theForm && theForm.name.value==""){
			alert("请输入名称");
			return;
		}
		if(theForm)
		 theForm.submit();
	}
</script>   

  <tr>
    
    <td width="788" height="136" style="border-bottom: 1px solid #CCCCCC"><table width="700" border="0" bordercolor="#A5AdC4">
      <tr>
        <td><table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
            <tr style="">
              <td width="144" height="19" align="center" valign="middle" >登录名*</td>
              <td width="99" height="19" align="center" valign="middle" >密码*</td>
              <td width="102" height="19" align="center" valign="middle" >所属部门*</td>
              <td width="130" height="19" align="center" valign="middle" >用户名称*</td>
              <td width="118" height="19" align="center" valign="middle" >办公电话</td>
              <td width="187" height="19" align="center" valign="middle" >性别</td>
            </tr>
            <!--注意这里如果要上传图像就要 enctype="multipart/form-data"，但method="get"-->
            <form action="userEditSave.jsp?action=addUser&vid=<%=vid%>&sid=<%=sid%>" method="post" name="UserForm2" id="UserForm2">
              <tr>
                <td height="19" align="center" valign="middle" ><input name="id" type="text" id="id" size="16"/></td>
                <td height="19" align="center" valign="middle" ><input name="password" type="text" id="password" size="12"/></td>
                <td height="19" align="center" valign="middle" ><input name="type" type="text" id="type" size="12"/></td>
                <td height="19" align="center" valign="middle" ><input name="name" type="text" id="name" size="16"/></td>
                <td height="19" align="center" valign="middle" ><input name="workphone" type="text" id="workphone" size="18" />                </td>
                <td height="19" align="center" valign="middle" ><select name="sex" id="sex">
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>                </td>
              </tr>
              <tr >
                <td height="19" align="center" valign="middle" >常用邮箱</td>
                <td height="19" align="center" valign="middle" >手机</td>
                <td height="19" align="center" valign="middle" >QQ</td>
                <td height="19" align="center" valign="middle" >MSN</td>
                <td height="19" align="center" valign="middle" >自定义头像</td>
                <td height="19" align="center" valign="middle" >建议大小 &nbsp;110X90像素</td>
              </tr>
              <tr>
                <td height="21" align="center" valign="middle" ><input name="email" type="text" id="email" size="16" /></td>
                <td height="21" align="center" valign="middle" ><input name="mobilephone" type="text" id="mobilephone" size="12" /></td>
                <td height="21" align="center" valign="middle" ><input name="qq" type="text" id="qq" size="12" /></td>
                <td height="21" align="center" valign="middle" ><input name="msn" type="text" id="msn" size="16" /></td>
                <td height="21"  align="left" valign="middle" ><input name="tag" type="text" id="tag" size="18" readonly="true"/></td>
                <td  height="21" align="center" valign="middle" ><input type="button" name="Submit22" value="我的照片" onclick="window.open('upfile1.jsp?formname=UserForm2&amp;editname=tag&amp;uppath=/scom/img/userHead/','','status=yes,scrollbars=yes,top=20,left=110,width=440,height=110')" /></td>
              </tr>
              <tr>
                <td height="30" align="center" valign="middle" ><input type="button" name="Submit3" value="增加新用户" onclick="userCheck();" />                </td>
                <td height="30" align="center" colspan='5' valign="middle" ><div align="left"><span class="content10hui">登陆名可由<span class="STYLE2">数字、字母或二者组合</span>构成，不可含有<span class="STYLE4">.</span>符号，不可有<span class="STYLE1">中文字符</span>， 不可以<span class="STYLE1">admin@</span>(管理员专用)开始</span></div></td>
              </tr>
            </form>
        </table></td>
      </tr>
    </table></td></tr>
</table>
</body>
</html>
