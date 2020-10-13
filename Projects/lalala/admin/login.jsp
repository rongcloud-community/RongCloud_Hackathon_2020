<%@ page contentType="text/html;charset=gb2312"%>
<html>
<head>
<title>管理员登录</title>
<link rel="stylesheet" type="text/css" href="../css/toolbar.css">
</head>

<script language="javascript">
function isOK(f)
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
   else{  return true;  }
}
</script> 
		    
<body bgcolor="#F4FFE4">
<script language="JavaScript" type="text/javascript">
var d=new Date();
var monthname=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var TODAY = monthname[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
</script>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr bgcolor="#D5EDB3">
    <td width="382" colspan="2" rowspan="2"><img src="../image/mm_health_photo.jpg" alt="Header image" width="382" height="101" border="0" /></td>
    <td width="378" height="50" id="logo" valign="bottom" align="center" nowrap="nowrap">管理员登录</td>
    <td width="100%">&nbsp;</td>
  </tr>

  <tr bgcolor="#D5EDB3">
    <td height="51" id="tagline" valign="top" align="center"></td>
	<td width="100%">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#5C743D"><img src="../image/mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#99CC66" background="mm_dashed_line.gif"><img src="mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr bgcolor="#99CC66">
  <td>&nbsp;</td>
  	<td colspan="3" id="dateformat" height="20"><a href="../index.jsp">主页</a>&nbsp;&nbsp;&nbsp;&nbsp;今天的日期:<script language="JavaScript" type="text/javascript">
      document.write(TODAY);	</script>	</td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#99CC66" background="mm_dashed_line.gif"><img src="mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#5C743D"><img src="mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>
 <tr>
    <td colspan="4" valign="top">&nbsp;<br />
    &nbsp;<br />
	

<form method="post" action="AdminLogin" onSubmit="return isOK(this);">
<table align="center" width="360px" height="250px" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
  <tr class="datagridhead">
    <td colspan="2" align="center">用户登录 </td>
  </tr>
  <tr>
   <td align="center"><img src="../image/name.gif"/>用 户 名:</td>
   <td><input type="text" name="login_name" height="25" /></td>
  </tr>
  <tr class="datagrid1212">
   <td align="center"><img src="../image/mm.gif"/>密 码:</td>
   <td><input type="password" name="password" height="25" /></td>
  </tr>
  <tr>
   <td colspan="2" align="center"><input type="submit" value="登  录" /></td>
  </tr>
</table>
</form>
</td>
</tr></table>
<div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
</body>
</html>
