<%@ page contentType="text/html; charset=gb2312"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>�û�ע��</title>
<link rel="stylesheet" type="text/css" href="css/toolbar.css">
 
</head>

<script language="JavaScript">
function isRight(f){
  if(f.user_name.value == "")
  {
     alert("ע��������Ϊ��!");
	 return false;
   }
   else if(f.user_name.value.length>20)
   {
     alert("ע��������С��20!");
	 return false;
   }
   else if((f.password.value.length<3)||(f.password.value.length>18))
   {
      alert("��������Ǵ���3С��18�����ֻ���ĸ!");
	  return false;
   }
  else if(f.password.value != f.repassword.value)
  {
      alert("������������벻ͬ!");
	  return false;
  }	
   else if((f.qq.value.length>15)||(f.qq.value.length<3))
   {
      alert("QQ����������3С��15!");
	  return false;
   }
  else if((f.email.value == "")||(f.email.value.indexOf('@',0) == -1)||(f.email.value.indexOf('.',0) == -1))
  {
      alert("������Ϸ��������ַ!");
	  return false;
  }
  else if(f.signname.value.length >150){
      alert("����ǩ��̫����!");
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
			<td colspan="2" align="center"><B>���û�ע��:����'*'�����ݱ�����д��</B></td>
		</tr>
 <tr >
  <td>�� ¼ ��:</td>
  <td><input type="text" name="user_name"/>&nbsp;&nbsp;*</td>
 </tr>
 <tr class="datagrid1212">
 <td>�� ��:</td>
 <td><input type="password" name="password"/>&nbsp;&nbsp;*  </td>
</tr>
<tr >
<td>ȷ������:</td>
<td><input type="password" name="repassword"/>&nbsp;&nbsp;*  </td>
  </tr> 
  
   <tr class="datagrid1212"> 
  <td>�Ա�:</td>
  <td>
   <input type=radio  value="�к�" name="sex" checked> �к� &nbsp;&nbsp;&nbsp;&nbsp; 
   <input type=radio value="Ů��" name="sex"> Ů��
   </td>
</tr>
<tr> 
<td>ͷ��:</td>
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
<td>�����ַ:</td>    
<td><input type="text" name="email" height="20"/>&nbsp;&nbsp;*  </td>
  </tr>
  
<tr class="datagrid1212">
<td>������ҳ:</td>
<td><input name="www" type="text" value="" height="20"/></td>
  </tr>

<tr> 
<td>ǩ�������150�ֽ�</td>
<td> 
<TEXTAREA name="signname" rows=5 wrap=PHYSICAL cols=60></TEXTAREA>
</td>
</tr>
<tr class="datagrid1212">
 <td colspan="2" align="center">
  <input type="submit" value="����ע��"/>&nbsp;&nbsp;&nbsp;
  <input type="reset" value="������д"/>&nbsp;&nbsp;&nbsp;
  <input type="button" value="�� �� ҳ" onClick="history.go(-1)"/>
 </td>
</tr>
</table>

</form>
<div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>

</body>
</html>
