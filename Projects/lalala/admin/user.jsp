<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.admin.UserMessage" %>
<%@ page import="com.user.UserData" %>
<%@ page import="com.admin.AdminPower" %>

<%
  //String currentLoginUserDataName = (String)session.getAttribute("currentLoginUserDataName");
  //String username=new String((request.getParameter("username")).getBytes("ISO-8859-1"),"gb2312");
  //String eusername = new String(username.getBytes("gb2312"),"ISO8859_1");
  String adminname = (String)session.getAttribute("currentLoginAdminName");
  
  
  String usertype = request.getParameter("usertype");
  if(usertype==null||usertype==""){
    usertype = "全部";
  }
  
  
  String strpage = request.getParameter("page");
  int intpage = 1;
  int intpagecount = 1;
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  if(strpage == null||strpage == ""){
     strpage = "1";
  }
  intpage = java.lang.Integer.parseInt(strpage);
  
  UserMessage usermessage = new UserMessage();
  List userItems = usermessage.getAllUserMessage(intpage,usertype);
  Iterator userIter = userItems.iterator();
  
  intpagecount = usermessage.getPageSize();
  
  
  AdminPower adminP = new AdminPower();
  String adminpo = adminP.getAdminPower(adminname);
  
  if(adminname==null||adminpo.equals("普通会员")){
     response.sendRedirect("../index.jsp");
  }

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'user.jsp' starting page</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="../css/toolbar.css">
	<script language="javascript">
	function isDelete(){
              if(confirm("是否删除该用户的所有信息?")){
                return true;
              }
              else{
                return false;
              }
            }
   </script>

  </head>
  
  <body>
    <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=adminname %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
    
    <table height="10px" align="center">
     <tr>
      <td></td>
     </tr>
    </table>
    
<script language="javascript">
  function loadType(){
     var type=document.getElementById("selecttype");
     var typevalue=type.value;
     window.location="user.jsp?usertype="+typevalue+"&numberpage=2";
  }
</script>
<p>本站已有的 <select name="type" id="selecttype" onchange="loadType();">
           <%
             if(usertype.equals("全部")){
            %>
           <option value="全部">全部会员</option>
           <option value="普通管理员">普通管理员</option>
             <%
               if(adminpo.equals("超级管理员")){
              %>
                 <option value="超级管理员">超级管理员</option>
             <%} %>
           <%}%>
           <%
             if(usertype.equals("普通管理员")){
            %>
           <option value="普通管理员">普通管理员</option>
           <option value="全部">全部会员</option>
             <%
               if(adminpo.equals("超级管理员")){
              %>
                 <option value="超级管理员">超级管理员</option>
             <%} %>
           <%}%>
           <%
             if(usertype.equals("超级管理员")){
            %>
              <%
               if(adminpo.equals("超级管理员")){
              %>
                 <option value="超级管理员">超级管理员</option>
             <%} %>
           <option value="普通管理员">普通管理员</option>
           <option value="全部">全部会员</option>
           <%}%>
           
         </select></p>
         
    <table height="10px" align="center">
     <tr>
      <td></td>
     </tr>
    </table>
    
    <table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
     <tr class="datagridhead">
      <td>ID</td>
      <td>姓名</td>
      <td>头像</td>
      <td>性别</td>
      <td>QQ</td>
      <td>Email</td>
      <td>个人主页</td>
      <td>管理员</td>
      <td>发表文章</td>
      <td>注册时间</td>
      <td>修改</td>
      <td>删除</td>
     </tr>
     <%
       int i = 0;
       while(userIter.hasNext()){
          i++;          
          UserData userdata = (UserData)userIter.next();
          if(i%2==0){
      %>
     <tr class="datagrid1212">
      <td>
       <a href="adminforum.jsp?username=<%=userdata.getName() %>&numberpage=3" title="<%=userdata.getName() %> 的 blog" target="_top"><%=userdata.getId() %></a>
      </td>
      <td>
        <a href="adminforum.jsp?username=<%=userdata.getName() %>&numberpage=3" title="<%=userdata.getName() %> 的 blog" target="_top"><%=userdata.getName() %></a>
      </td>
      <td>
        <a href="../pass.jsp?username=<%=userdata.getName() %>" title="到我的 blog 看看" target="_blank">
         <img src="../<%=userdata.getFace() %>" width="30px" height="30px" align="middle" border="0" alt="到我的 blog 看看"/>
        </a>
      </td>
      <td><%=userdata.getSex() %></td>
      <td>
        <a href="tencent://message/?uin=<%=userdata.getQq() %>&Site=网站在线QQ联系&Menu=yes" target="_blank"><%=userdata.getQq() %></a>
	  </td>
      <td><a href="mailto:<%=userdata.getEmail()%>"><%=userdata.getEmail()%></a></td>
      <td><a href="http://<%=userdata.getWww()%>" target="_blank"><%=userdata.getWww()%></a></td>
      <td>
      <%
        if(userdata.getPower().equals("1111")){
       %>
       超级管理员
       <%}
         else if(userdata.getPower().equals("111")){
        %>
        普通管理员
      <%
       }else{
       %>
       否
       <%
        }
        %>
      </td> 
      <td><a href="adminforum.jsp?username=<%=userdata.getName() %>&numberpage=3"><%=userdata.getSendArticle() %> 篇</a></td>
      <td><%=userdata.getRegeditTime() %></td>
      <td>
        <%
         if(!userdata.getPower().equals("1111")&&!userdata.getPower().equals("111")){
        %>
        <a href="usermodify.jsp?username=<%=userdata.getName() %>&numberpage=2">修改</a>
        <%} 
         else{
        %>
          <%
           if(adminpo.equals("超级管理员")){
          %>
          <a href="usermodify.jsp?username=<%=userdata.getName() %>&numberpage=2">修改</a>
          <%}
           else if(adminpo.equals("普通管理员")&&userdata.getPower().equals("111")){
           %>
          <a href="usermodify.jsp?username=<%=userdata.getName() %>&numberpage=2">修改</a>
        <%}
        }
        
         %>
      </td>
      <td>
        <%
         if(!userdata.getPower().equals("1111")&&!userdata.getPower().equals("111")){
        %>
         <a href="DeleteUser?username=<%=userdata.getName() %>" onClick="return isDelete();">删除</a>
        <%} 
         else{
        %>
          <%
           if(adminpo.equals("超级管理员")){
          %>
          <a href="DeleteUser?username=<%=userdata.getName() %>" onClick="return isDelete();">删除</a>
          <%}
           else if(adminpo.equals("普通管理员")&&userdata.getPower().equals("111")){
           %>
          <a href="DeleteUser?username=<%=userdata.getName() %>" onClick="return isDelete();">删除</a>
        <%}
        }
        
         %>
       </td>
     </tr>
     <%
        }else{
      %> 
      <tr>
      <td>
        <a href="adminforum.jsp?username=<%=userdata.getName() %>&numberpage=3" title="<%=userdata.getName() %> 的 blog" target="_top"><%=userdata.getId() %></a>
      </td>
      <td>
        <a href="adminforum.jsp?username=<%=userdata.getName() %>&numberpage=3" title="<%=userdata.getName() %> 的 blog" target="_top"><%=userdata.getName() %></a>
      </td>
      <td>
        <a href="../pass.jsp?username=<%=userdata.getName() %>" title="到我的 blog 看看" target="_blank">
         <img src="../<%=userdata.getFace() %>" width="30px" height="30px" align="middle" border="0" alt="到我的 blog 看看"/>
        </a>
      </td>
      <td><%=userdata.getSex() %></td>
      <td>
        <a href="tencent://message/?uin=<%=userdata.getQq() %>&Site=网站在线QQ联系&Menu=yes" target="_blank"><%=userdata.getQq() %></a>
      </td>
      <td><a href="mailto:<%=userdata.getEmail()%>"><%=userdata.getEmail()%></a></td>
      <td><a href="http://<%=userdata.getWww()%>" target="_blank"><%=userdata.getWww()%></a></td>
      <td>
      <%
        if(userdata.getPower().equals("1111")){
       %>
       超级管理员
       <%}
         else if(userdata.getPower().equals("111")){
        %>
        普通管理员
      <%
       }else{
       %>
       否
       <%
        }
        %>
      </td>  
      <td><a href="adminforum.jsp?username=<%=userdata.getName() %>&numberpage=3"><%=userdata.getSendArticle() %> 篇</a></td>
      <td><%=userdata.getRegeditTime() %></td>
      <td>
        <%
         if(!userdata.getPower().equals("1111")&&!userdata.getPower().equals("111")){
        %>
        <a href="usermodify.jsp?username=<%=userdata.getName() %>&numberpage=2">修改</a>
        <%} 
         else{
        %>
          <%
           if(adminpo.equals("超级管理员")){
          %>
          <a href="usermodify.jsp?username=<%=userdata.getName() %>&numberpage=2">修改</a>
          <%}
           else if(adminpo.equals("普通管理员")&&userdata.getPower().equals("111")){
           %>
          <a href="usermodify.jsp?username=<%=userdata.getName() %>&numberpage=2">修改</a>
        <%}
        }
        
         %>
      </td>
      <td>
        <%
         if(!userdata.getPower().equals("1111")&&!userdata.getPower().equals("111")){
        %>
         <a href="DeleteUser?username=<%=userdata.getName() %>" onClick="return isDelete();">删除</a>
        <%} 
         else{
        %>
          <%
           if(adminpo.equals("超级管理员")){
          %>
          <a href="DeleteUser?username=<%=userdata.getName() %>" onClick="return isDelete();">删除</a>
          <%}
           else if(adminpo.equals("普通管理员")&&userdata.getPower().equals("111")){
           %>
          <a href="DeleteUser?username=<%=userdata.getName() %>" onClick="return isDelete();">删除</a>
        <%}
        }
        
         %>
       </td>
     </tr>
     <%
        }     
      }
      %>   
    </table>
    
    
    
    
<br>
<br>
第<%=intpage%>页&nbsp;&nbsp;共<%=intpagecount%>页&nbsp;&nbsp;
 <%if(intpage>1)
 {%>
     <a href="user.jsp?numberpage=2&page=<%=intpage-1%>">上一页</a>
<%}%>&nbsp;&nbsp;
<%if(intpage<intpagecount)
  {%>
     <a href="user.jsp?numberpage=2&page=<%=intpage+1%>">下一页</a>
 <%}%>
    
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
    </div>
  </body>
</html>
