<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.user.TopTen" %>
<%@ page import="com.user.UserData" %>
<%    
  TopTen topT = new TopTen();
  List topItems = topT.getTopTen();
  Iterator toptenItems = topItems.iterator();
 %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<title>热门博客</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link rel="stylesheet" href="css/mm_health_nutr.css" type="text/css" />
<script language="JavaScript" type="text/javascript">
var d=new Date();
var monthname=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var TODAY = monthname[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
</script>
</head>
<body bgcolor="#F4FFE4">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr bgcolor="#D5EDB3">
    <td width="382" colspan="2" rowspan="2"><img src="image/mm_health_photo.jpg" alt="Header image" width="382" height="101" border="0" /></td>
    <td width="378" height="50" id="logo" valign="bottom" align="center" nowrap="nowrap">个人博客</td>
    <td width="100%">&nbsp;</td>
  </tr>

  <tr bgcolor="#D5EDB3">
    <td height="51" id="tagline" valign="top" align="center"></td>
	<td width="100%">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#5C743D"><img src="image/mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#99CC66" background="mm_dashed_line.gif"><img src="mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr bgcolor="#99CC66">
  <td>&nbsp;</td>
  	<td colspan="3" id="dateformat" height="20"><a href="index.jsp">主页</a>&nbsp;&nbsp;&nbsp;&nbsp;今天的日期:<script language="JavaScript" type="text/javascript">
      document.write(TODAY);	</script>	</td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#99CC66" background="mm_dashed_line.gif"><img src="mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#5C743D"><img src="mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>
 <tr>
    <td width="40">&nbsp;</td>
    <td colspan="2" valign="top">&nbsp;<br />
    &nbsp;<br />
    <table border="0" cellspacing="0" cellpadding="2" width="610px">
        <tr>
          <td colspan="7" class="pageName">十大排名</td>
        </tr>
		<tr>
		 <td>
		  <div id="photolist">
   
    <%
	  int i = 0;
      while(toptenItems.hasNext()){
	    i++;
        UserData toptenuser = (UserData)toptenItems.next();
		
     %>
       <div id="topten">
        <a href="pass.jsp?username=<%=toptenuser.getName() %>" title="到我的 blog 看看" target="_blank">
		  <img src="<%=toptenuser.getFace() %>" border="0px" width="40px" height="40px" alt="到我的 blog 看看"/>
		
		<p><%=toptenuser.getName() %></p>
		</a>
	  </div> 	
	<%
	  if(i%5==0){
	    out.print("<div id='clearf'></div>");
		if(i!=10){
		  out.print("<hr/>");
		}
	  }
	 }
	 %>
	 	
  </div>
   </td>
   </tr>
      </table>
	</td>
    <td width="100%">&nbsp;</td>
  </tr>

 <tr>
    <td width="40">&nbsp;</td>
    <td width="342">&nbsp;</td>
    <td width="378">&nbsp;</td>
	<td width="100%">&nbsp;</td>
  </tr>
</table>
  <div id="login">
   <script language="javascript">
function isLoginOK(f)
{
  if(f.login_name.value=="")
  {
     alert("登录名不能为空!");
	 return false;
   }
   else if((f.password.value.length<3)||(f.password.value.length>18))
   {
      alert("密码必须是大于3小于18的数字或字母!");
	  return false;
   }
   else{  
   return true;  }
}



</script> 
    <form method="post" name="loginform" id="loginformid" action="Login" onSubmit="return isLoginOK(this);">
<table align="center" width="100%" height="100%" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
  <tr class="datagridhead">
    <td colspan="2" align="center">用户登录 </td>
  </tr>
  <tr>
   <td align="center"><img src="image/name.gif"/>用 户 名：</td>
   <td><input type="text" name="login_name" height="25" /></td>
  </tr>
  <tr>
   <td align="center"><img src="image/mm.gif"/>密 码：</td>
   <td><input type="password" name="password" height="25" /></td>
  </tr>
  <tr>
   <td colspan="2" align="center"><input type="submit" value="登录"/>&nbsp;&nbsp;<a href="register.jsp" target="_blank">注册</a>&nbsp;&nbsp;<a href="admin/login.jsp" target="_blank">管理员登录</a>
   </td>
  </tr>
</table>
</form>
  </div>
  <div id="clearf">
  </div>
  <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
</body>
</html>
