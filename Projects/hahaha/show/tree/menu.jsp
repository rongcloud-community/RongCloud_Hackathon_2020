<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>银河IT教育</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<script>
function findObj(theObj, theDoc)
{
var p, i, foundObj;

if(!theDoc) theDoc = document;
if( (p = theObj.indexOf("?")) > 0 && parent.frames.length)
{
theDoc = parent.frames[theObj.substring(p+1)].document;
theObj = theObj.substring(0,p);
}
if(!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];
for (i=0; !foundObj && i < theDoc.forms.length; i++) 
foundObj = theDoc.forms[i][theObj];
for(i=0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) 
foundObj = findObj(theObj,theDoc.layers[i].document);
if(!foundObj && document.getElementById) foundObj = document.getElementById(theObj);

return foundObj;
}
</script>
<style type="text/css">
<!--
.folder {
font-family: "Verdana", "Arial", "Helvetica", "sans-serif";
font-size: 14px;
background-image: url(images/e.gif);
background-repeat: no-repeat;
background-position: left;
padding-left: 40px;
cursor: hand;
}
.collapsedFolder {
font-family: "Verdana", "Arial", "Helvetica", "sans-serif";
font-size: 14px;
background-image: url(images/c.gif);
background-repeat: no-repeat;
background-position: left;
padding-left: 40px;
cursor: hand;
}
.submenu {
padding-left: 18px;
}
.iefile {
background-image: url(images/ie.gif);
background-repeat: no-repeat;
background-position: left;
padding-left: 20px;
font-family: "Verdana", "Arial", "Helvetica", "sans-serif";
font-size: 14px;
}
a {
color: #003399;
text-decoration: none;
border: 1px solid #9bc2ed;
}
a:hover {
color: #FF0000;
background-color: #9bc2ed;
border: 1px solid #006699;
}
body {
margin: 0px;
background-color: #9bc2ed;
overflow: hidden;
border: 0px;
}
.ctrlbar {
border: 1px inset;
}
.explorer {
background-color: #9bc2ed;
border: 1px inset;
}
-->
</style>
<style type="text/css">
<!--
.ctbutton {
font-family: Arial, Helvetica, sans-serif;
font-size: 8px;
background-color: #9bc2ed;
border-width: 1px;
width: 9px;
height: 100px;
margin-bottom: 100px;
}
-->
</style>
<base target="browserframe"/>
</head>

<body>
<table width="216177%" height="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
<td width="124" align="center" valign="top" class="explorer" id="menubar"><br />
  
 
<table width="100%" border="0" cellspacing="0" cellpadding="2" onselectstart="return false">
<tr>
<td class="folder" onmouseup="with(findObj('blueidea').style){display=display=='none'?'':'none';this.style.backgroundImage=display!='none'?'url(images/e.gif)':'url(images/c.gif)'}">网上商城</td>
</tr>
<tr>
<td class="submenu" id="blueidea"><table width="100%" border="0" cellspacing="0" cellpadding="2">
<tr>
<td class="folder" onmouseup="with(findObj('forums').style){display=display=='none'?'':'none';this.style.backgroundImage=display!='none'?'url(images/e.gif)':'url(images/c.gif)'}">商城顾客</td>
</tr>
<tr>
<td class="submenu" id="forums"><table width="100%" border="0" cellspacing="0" cellpadding="2">
<tr>
<td  class="iefile"><a href="/shoppingcenter/show/admin/user.jsp" target="mainFrame">用户注册</a></td>
</tr>
<tr>
<td  class="iefile"><a href="/shoppingcenter/show/admin/userlogin.jsp" target="mainFrame">用户登陆</a></td>
</tr>
<tr>
</tr>
<td  class="iefile"><a href="/shoppingcenter/goodManager.do?method=show&goodname=1&goodtype=1" target="mainFrame">浏览商品</a></td>
</tr>
</table></td>
</tr>
<tr>
<td class="folder" onmouseup="with(findObj('others').style){display=display=='none'?'':'none';this.style.backgroundImage=display!='none'?'url(images/e.gif)':'url(images/c.gif)'}">商城管理</td>
</tr>
<tr>
<td class="submenu" id="others"><table width="100%" border="0" cellspacing="0" cellpadding="2">
<tr>
<td background="msystem.jsp" class="iefile"><a href="../admin/goodType.jsp" target="mainFrame">增加类别</a></td>
</tr>
<tr>
<td background="../addtemplate.htm" class="iefile"><a href="../admin/goodpublish.jsp" target="mainFrame">添加商品</a></td>
</tr>

</table></td>
</tr>
</table></td>
</tr>
</table></td>
<td width="11" class="ctrlbar">
<button class="ctbutton" onfocus="blur();" onmouseup="with(findObj('menubar').style){display=display=='none'?'':'none';this.innerText=display=='none'?'&gt;':'&lt;'}" onmouseover="this.style.backgroundColor='#ffffff'" onmouseout="this.style.backgroundColor='#eeeeee'">&lt;</button></td>
<td width="259277" class="explorer">
<iframe name="browserframe" id="browserframe" width="100%" height="300" scrolling="auto" frameborder="0"></iframe></td>

</tr>

</table>
</body>
</html>