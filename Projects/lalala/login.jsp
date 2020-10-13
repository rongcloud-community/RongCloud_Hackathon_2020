<%@ page contentType="text/html;charset=gb2312"%>
<html>
<head>
<title>登录</title>
<link rel="stylesheet" type="text/css" href="css/toolbar.css">
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
		    
<body>

<table>
 <tr height="150px">
  <td>
   
  </td>
 </tr>
</table>


<form method="post" action="Login" onSubmit="return isOK(this);">
<table align="center" width="360px" height="250px" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
  <tr class="datagridhead">
    <td colspan="2" align="center">用户登录 </td>
  </tr>
  <tr>
   <td align="center"><img src="image/name.gif"/>用 户 名:</td>
   <td><input type="text" name="login_name" height="25" /></td>
  </tr>
  <tr class="datagrid1212">
   <td align="center"><img src="image/mm.gif"/>密 码:</td>
   <td><input type="password" name="password" height="25" /></td>
  </tr>
  <tr>
   <td colspan="2" align="center"><input type="submit" value="登  录" />&nbsp;&nbsp;<input type="button" value="返  回" onClick="history.go(-1)"/></td>
  </tr>
</table>
</form>
</body>
</html>
