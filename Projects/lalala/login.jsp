<%@ page contentType="text/html;charset=gb2312"%>
<html>
<head>
<title>��¼</title>
<link rel="stylesheet" type="text/css" href="css/toolbar.css">
</head>

<script language="javascript">
function isOK(f)
{
  if(f.login_name.value=="")
  {
     alert("��¼������Ϊ��!");
	 return false;
   }
   else if((f.password.value.length<3)||(f.password.value.length>18))
   {
      alert("��������Ǵ���3С��18�����ֻ���ĸ!");
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
    <td colspan="2" align="center">�û���¼ </td>
  </tr>
  <tr>
   <td align="center"><img src="image/name.gif"/>�� �� ��:</td>
   <td><input type="text" name="login_name" height="25" /></td>
  </tr>
  <tr class="datagrid1212">
   <td align="center"><img src="image/mm.gif"/>�� ��:</td>
   <td><input type="password" name="password" height="25" /></td>
  </tr>
  <tr>
   <td colspan="2" align="center"><input type="submit" value="��  ¼" />&nbsp;&nbsp;<input type="button" value="��  ��" onClick="history.go(-1)"/></td>
  </tr>
</table>
</form>
</body>
</html>
