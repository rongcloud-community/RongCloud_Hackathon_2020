<%@ page contentType="text/html; charset=gb2312"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>用户注册</title>
<link rel="stylesheet" type="text/css" href="css/toolbar.css">
 
</head>

<script language="JavaScript">
function isRight(f){
  if(f.user_name.value == "")
  {
     alert("注册名不能为空!");
	 return false;
   }
   else if(f.user_name.value.length>20)
   {
     alert("注册名必须小于20!");
	 return false;
   }
   else if((f.password.value.length<3)||(f.password.value.length>18))
   {
      alert("密码必须是大于3小于18的数字或字母!");
	  return false;
   }
  else if(f.password.value != f.repassword.value)
  {
      alert("两次输入的密码不同!");
	  return false;
  }	
   else if((f.qq.value.length>15)||(f.qq.value.length<3))
   {
      alert("QQ号码必须大于3小于15!");
	  return false;
   }
  else if((f.email.value == "")||(f.email.value.indexOf('@',0) == -1)||(f.email.value.indexOf('.',0) == -1))
  {
      alert("请输入合法的邮箱地址!");
	  return false;
  }
  else if(f.signname.value.length >150){
      alert("个性签名太长了!");
      return false;
  }
  else
  { 
     return true;
   }
  
}

</script>

<body>


<table height="60px">
 <tr>
  <td></td>
 </tr>
</table>

<form method="post" action="Regedit" onSubmit="return isRight(this);">
	 <table align="center" width="700px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
         <tr class="datagridhead">
			<td colspan="2" align="center"><B>新用户注册:（带'*'的内容必须填写）</B></td>
		</tr>
 <tr >
  <td>登 录 名:</td>
  <td><input type="text" name="user_name"/>&nbsp;&nbsp;*</td>
 </tr>
 <tr class="datagrid1212">
 <td>密 码:</td>
 <td><input type="password" name="password"/>&nbsp;&nbsp;*  </td>
</tr>
<tr >
<td>确认密码:</td>
<td><input type="password" name="repassword"/>&nbsp;&nbsp;*  </td>
  </tr> 
  
   <tr class="datagrid1212"> 
  <td>性别:</td>
  <td>
   <input type=radio  value="男孩" name="sex" checked> 男孩 &nbsp;&nbsp;&nbsp;&nbsp; 
   <input type=radio value="女孩" name="sex"> 女孩
   </td>
</tr>
<tr> 
<td>头像:</td>
<td> 
<select name="face" size=1 onChange="document.images['face'].src=options[selectedIndex].value;" style="BACKGROUND-COLOR: #99CCFF; BORDER-BOTTOM: 1px double; BORDER-LEFT: 1px double; BORDER-RIGHT: 1px double; BORDER-TOP: 1px double; COLOR: #000000">

<option value="images/face/Image1.gif">Image1</option>
<option value="images/face/Image2.gif">Image2</option>
<option value="images/face/Image3.gif">Image3</option>
<option value="images/face/Image4.gif">Image4</option>
<option value="images/face/Image5.gif">Image5</option>
<option value="images/face/Image6.gif">Image6</option>
<option value="images/face/Image7.gif">Image7</option>
<option value="images/face/Image8.gif">Image8</option>
<option value="images/face/Image9.gif">Image9</option>
<option value="images/face/Image10.gif">Image10</option>

</select>
&nbsp;<img id="face" src="images/face/Image1.gif">
</tr>
   
<tr class="datagrid1212">
<td>QQ:</td>    
<td>
  <input type="text" name="qq" height="20"/>&nbsp;&nbsp;*  </td>
  </tr>  
<tr>
<td>邮箱地址:</td>    
<td><input type="text" name="email" height="20"/>&nbsp;&nbsp;*  </td>
  </tr>
  
<tr class="datagrid1212">
<td>个人主页:</td>
<td><input name="www" type="text" value="" height="20"/></td>
  </tr>

<tr> 
<td>签名：最多150字节</td>
<td> 
<TEXTAREA name="signname" rows=5 wrap=PHYSICAL cols=60></TEXTAREA>
</td>
</tr>
<tr class="datagrid1212">
 <td colspan="2" align="center">
  <input type="submit" value="立即注册"/>&nbsp;&nbsp;&nbsp;
  <input type="reset" value="重新填写"/>&nbsp;&nbsp;&nbsp;
  <input type="button" value="回 主 页" onClick="history.go(-1)"/>
 </td>
</tr>
</table>

</form>
<div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>

</body>
</html>
