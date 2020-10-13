<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,javax.mail.*, java.util.*, javax.mail.internet.*,mail.*"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<title>找回我的淘客登陆信息</title>
<link href="css/talk.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
body,td,th {
	font-family: 宋体;
	font-size: 12px;
	color: #000000;
}
.STYLE13 {font-size: 16px}
-->
</style>
</head> 
<body>
<%
String toAddr=null;
String fromAddr="service@100im.cn";
String subject="您的淘客管理员登陆信息";
String body="";
String errorMsg="";
try{  
	/**
	//发送邮件示列
	mail.Mail.sendMail(toAddr,fromAddr,subject,body,smtpHost,username,password);
	sendMail("qdk@3yan.com,qindakun@yahoo.com","service@100im.cn","test for html","<h1>Hello world</h1>","mail.3yan.com","qdk@3yan.com","690125");  
	sendMail("qdk@3yan.com,qindakun@yahoo.com","service@100im.cn","mail test 邮件测试","<h1><a href=\"http://www.100im.cn\">淘客邮件发送测试</a></h1>");  
	**/
String domain=request.getParameter("domain");
String submit=request.getParameter("submit");	
if(submit!=null){
	if(domain!=null && !domain.equals("")){
		String sql="select id,contactEmail,companyName,name,email,sex,password,domain from user,site where "+
				   " user.domainId=site.domainIds and parentId=0 and domain=\""+domain+"\"";
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 
		db.setSqlQuery(sql);
		ResultSet rs=db.getResult();
		String email="";
		if(rs!=null && rs.next()){
			toAddr=rs.getString("contactEmail");
			if( toAddr==null || toAddr.equals("") )
				toAddr=rs.getString("email");
			if( toAddr!=null && !toAddr.equals("") ){
				if(rs.getString("name")!=null && rs.getString("sex")!=null)
					body ="尊敬的"+rs.getString("name")+((rs.getString("sex").equals("男"))?"先生":"女士")+":<br><br>";
				else
					body ="尊敬的淘客用户:<br><br>";
				body +="您的淘客管理员帐户登陆信息如下:<br>";
				body +="用户名: "+rs.getString("id")+"<br>";
				body +="密  码: "+rs.getString("password")+"<br>";
				body +="域  名: "+rs.getString("domain")+"<br>";
				body +="公  司: "+rs.getString("companyName")+"<br><br>";
				
				body +="淘客登陆地址： http://www.100im.cn <a href=\"http://client.100im.cn/loginValidation.jsp?"+
						"username="+rs.getString("id")+"&password="+rs.getString("password")+"&loginType=0"+
						"\">您也可以点击此处直接登陆</a><br><br>";
				body +="我们再次感谢您对淘客的关心和支持！<br><br>";
				body +="公司地址： 北京上地信息产业基地上地佳园4-2-901<br>";
				body +="联系电话： 86-10-51668337-淘客业务部<br>";
				body +="公司网址： http://www.dns118.com<br>";
			}	
		 }
		 else
		 	errorMsg="系统没有找到您的域名： "+domain+" 请确认您输入的域名正确，这个域名必须是您注册时输入的域名。";
		 if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();	
		 if( toAddr!=null && !toAddr.equals("") ){
	 		mail.Mail.sendMail(toAddr,fromAddr,subject,body,"mail.3yan.com","qdk@3yan.com","690125");
	 		errorMsg="系统已经将您的登陆信息发送到您的邮箱： "+toAddr+" 请登陆您的邮箱获取登陆信息。";
 		 }
  	 }	
	 
}	 
 
}catch(Exception e){  
	errorMsg="获取登陆信息失败，请稍候再试。";  
}  

%>
 
<BODY>
<TABLE cellSpacing=0 cellPadding=0 width="100%" align=center border=0>
  <TBODY>
  <TR>
    <TD colSpan=3 height=89>
      <TABLE width="100%" border=0 cellPadding=0 cellSpacing=0 background="images/top_bg.gif">
        <TBODY>
        <TR>
          <TD align=right width=290><a href="http://www.100im.cn"><img src="images/logo2.gif" width="152" height="70" border="0"></a></TD>
          <TD width="584" align="right" valign="bottom"><table width="380" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td height="30" valign="bottom"><table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#A4C1EA">
                <tr>
                  <td width="18%" height="30" align="center" background="images/daohang.gif"><a href="http://www.100im.cn/aboutTaoke.html">适用人群</a></td>
                  <td width="17%" align="center" background="images/daohang.gif"><a href="http://www.100im.cn/jcty.html">精彩体验</a></td>
                  <td width="17%" align="center" background="images/daohang.gif"><a href="http://www.100im.cn/lxwm.html">联系我们</a></td>
                  <td width="17%" align="center" background="images/daohang.gif"><a href="http://www.100im.cn/proFunction.html">使用帮助</a></td>
                  <td width="15%" align="center" background="images/daohang.gif"><a href="http://bbs.100im.cn">淘客论坛</a></td>
                  <td width="16%" align="center" background="images/daohang.gif"><a href="http://www.100im.cn/aboutTaoke.html">关于淘客</a></td>
                </tr>
              </table></td>
              </tr>
            <tr>
              <td>&nbsp;</td>
              </tr>
          </table></TD>
          <TD width="104" valign="bottom">&nbsp;</TD>
        </TR></TBODY></TABLE></TD></TR></TBODY></TABLE>
<br />
<center><font color=red><%=errorMsg%></font></center>
<form id="form1" name="form1" method="post" action="findMyLoginInfo.jsp">
<table width="794" border="1" align="center" cellspacing="0" cellpadding="0" bordercolor="#66CC99">
  <tr>
    <td width="784"><table width="804" height="178" border="0" cellspacing="0">
      <tr>
        <td width="163" bgcolor="#66CC99">&nbsp;</td>
        <td width="631" height="18" bgcolor="#66CC99"><span class="STYLE13">找回我的淘客登陆信息</span></td>
      </tr>
      <tr>
        <td align="right">请输入您的网站地址： </td>
        <td><label>
          <input type="text" name="domain" />
          </label>
          （您注册时的网站地址如：www.100im.cn）</td>
      </tr>
      <tr>
        <td height="43">&nbsp;</td>
        <td><label>
          <input type="submit" name="submit" value="点击获取我的登陆信息" />
          </label>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><p>注：系统回自动将你的淘客登陆信息发送到您的邮箱</p></td>
      </tr>
    </table></td>
  </tr>
</table>
<br />
</form>
</body>
</html>