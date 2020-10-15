<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.admin.MessageShow" %>
<%@ page import="com.admin.MessageDetail" %>
<%@ page import="com.user.TopTen" %>
<%@ page import="com.user.UserData" %>

<%  
  
  String strpage = request.getParameter("page");
  int intpage = 1;
  int intpagecount = 1;
  if(strpage == null||strpage == ""){
     strpage = "1";
  }
  intpage = java.lang.Integer.parseInt(strpage);
  
  MessageShow showMsg = new MessageShow();
  
  List messageItems = showMsg.getMessage(intpage);
  Iterator messItems = messageItems.iterator();
  
  intpagecount = showMsg.getPageSize();
  
  TopTen topT = new TopTen();
  List topItems = topT.getTopTen();
  Iterator toptenItems = topItems.iterator();
 %>
 
 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>index</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="css/index.css" rel="stylesheet" type="text/css" />
    <link href="css/index_div.css" rel="stylesheet" type="text/css" />
    

    <style type="text/css">
<!--
.STYLE1 {font-family: "宋体"}
-->
    </style>
</head>
  
  <script language="javascript">
function isOK(f)
{
  if(f.re_name.value=="")
  {
     alert("姓名不能为空!");
	 return false;
   }
   else if(f.re_name.value.length>18)
  {
     alert("姓名不能太长!");
	 return false;
   }
   else if(f.content.value == "")
  {
     alert("内容不能为空!");
	 return false;
   }
   else if(f.content.value.length>300)
  {
     alert("内容不能多于 300 个字符!");
	 return false;
   }
   else{  return true;  }
}
</script>
  
  <body>
  
<div id="all">
  <div id="top">
    <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="900" height="200">
      <param name="movie" value="image/top.swf">
      <param name="quality" value="high">
      <embed src="image/top.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="900" height="200"></embed>
    </object>
  </div>
  
  
  <div id="menu">
    <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="150" height="300">
      <param name="movie" value="image/menu.swf">
      <param name="quality" value="high">
      <embed src="image/menu.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="150" height="300"></embed>
    </object>
  </div>
    
 <div id="publication"> 
 <div id="messageshow">
   <table width="100%" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
  <tr class="datagridhead12">
   <td>&nbsp;</td>
   <td>主题</td>
   <td>发布者</td>
   <td>发布时间</td>
 </tr> 
 <%
         int lili = 0;
         for(int i=1;messItems.hasNext();i++){
           MessageDetail msgDetail = (MessageDetail)messItems.next();
           if(i%2==0){
        %>
        <tr class="datagrid1212">
          <td>
            <a href="viewmsg.jsp?id=<%=msgDetail.getId() %>" target="_blank" title="查看公告"><%=i %></a>
          </td>
          <td>
            <a href="viewmsg.jsp?id=<%=msgDetail.getId() %>" target="_blank" title="查看公告"><%=msgDetail.getTitle() %></a>
          </td>
          <td>
            <a href="pass.jsp?username=<%=msgDetail.getAdmin_name() %>" target="_blank" title="到我的 blog 看看"><%=msgDetail.getAdmin_name() %></a>            
          </td>
          <td>
            <%=msgDetail.getInsert_time() %>
          </td>
        </tr>
        <%}else{ %>
        <tr>
          <td>
            <a href="viewmsg.jsp?id=<%=msgDetail.getId() %>" target="_blank" title="查看公告"><%=i %></a>
          </td>
          <td>
            <a href="viewmsg.jsp?id=<%=msgDetail.getId() %>" target="_blank" title="查看公告"><%=msgDetail.getTitle() %></a>
          </td>
          <td>
            <a href="pass.jsp?username=<%=msgDetail.getAdmin_name() %>" target="_blank" title="到我的 blog 看看"><%=msgDetail.getAdmin_name() %></a>
          </td>
          <td>
            <%=msgDetail.getInsert_time() %>
          </td>
        </tr>
        <%} 
        }%>
</table>
</div>
 <div id="pagechange">
第<%=intpage%>页&nbsp;&nbsp;共<%=intpagecount%>页&nbsp;&nbsp;
 <%if(intpage>1)
 {%>
     <a href="index.jsp?page=<%=intpage-1%>">上一页</a>
<%}%>&nbsp;&nbsp;
<%if(intpage<intpagecount)
  {%>
     <a href="index.jsp?page=<%=intpage+1%>">下一页</a>
 <%}%>   
  </div>
  </div>
  
  
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
  <tr height="20px">
   <td></td>
   <td></td>
  </tr>
  <tr class="datagrid1212">
   <td align="center"><img src="image/name.gif"/>用 户 名：</td>
   <td><input type="text" name="login_name" height="25" /></td>
  </tr>
  <tr height="20px">
   <td></td>
   <td></td>
  </tr>
  <tr class="datagrid1212">
   <td align="center"><img src="image/mm.gif"/>密 码：</td>
   <td><input type="password" name="password" height="25" /></td>
  </tr>
  <tr>
   <td colspan="2" align="center"><input type="submit" value="登录"/>&nbsp;&nbsp;<a href="register.jsp" target="_top">注册</a>&nbsp;&nbsp;<a href="admin/login.jsp" target="_top">管理员登录</a>   </td>
  </tr>
</table>
</form>
  </div>
  
  
  <div id="friendlink">
    <p>友情链接</p>
    <ul>
     <li><a href="http://www.gdut.edu.cn" target="_blank">广东工业大学</a></li>
     <li><a href="http://www.baidu.com" target="_blank">百度</a></li>
     <li><a href="http://www.google.com" target="_blank">Google</a></li>
	 <li><a href="http://www.sina.com.cn" target="_blank">新浪</a></li>
     <li><a href="http://www.163.com" target="_blank">网易</a></li>
    </ul>
  </div>
  
  
  <div id="photolist">
    <div id="message">
	 <p>&nbsp;我们的相册</p>
	</div>
    <div id="ourclass">
    <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="900" height="150">
      <param name="movie" value="image/photolist.swf">
      <param name="quality" value="high">
      <embed src="image/photolist.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="900" height="150"></embed>
    </object>
	</div>
  </div>
  
  <div id="clearf">
  </div>
  

    <div id="footer">
      <p align="center">&nbsp;	    </p>
      <p align="center"><a href="footerpage1.jsp">关于本站</a>|
        <a href="aboutus.jsp">关于作者</a>|<a href=""></a>
		<a href="mailto:29676941@qq.com">联系我们</a></p>
      <p align="center">Copyright @ 梁仕田,关志辉,张顺兴, 06计科四班 版权所有</p>
  </div>
  </div>




    
  </body>
</html>
