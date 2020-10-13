<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%>
<%@ page import="com.user.UserData" %>
<%@ page import="com.article.Article" %>
<%@ page import="com.article.getArticle" %>
<%@ page import="com.article.ArticleType" %>

<%@ page import="com.admin.UserMessage" %>
<%@ page import="com.user.UserData" %>
<%@ page import="com.admin.AdminPower" %>

<%
  //String currentLoginUserDataName = (String)session.getAttribute("currentLoginUserDataName");
  //String username=new String((request.getParameter("username")).getBytes("ISO-8859-1"),"gb2312");
  //String eusername = new String(username.getBytes("gb2312"),"ISO8859_1");
  String adminname = (String)session.getAttribute("currentLoginAdminName");
  //int intpage = 1;
  //int intpagecount = 1;
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  
  String arttype=request.getParameter("arttype");
  if(arttype == null||arttype == ""){
    arttype="全部";
  }
  
  String strpage = request.getParameter("page");
  int intpage = 1;
  int intpagecount = 1;
  String username = request.getParameter("username");

  if(strpage == null||strpage == ""){
     strpage = "1";
  }
  intpage = java.lang.Integer.parseInt(strpage);
  
  getArticle getArt = new getArticle();
  List items = getArt.getArticleMessage(username,intpage,arttype);
  Iterator artItems = items.iterator();
  
  
  
  List typeItems = null;
  ArticleType articlety = new ArticleType();
  typeItems = articlety.getType(username);
  Iterator arttypeItems = typeItems.iterator();
  
  
  intpagecount = getArt.getPageSize(username,arttype);
  
  
  UserMessage usermessage = new UserMessage();
  List userItems = usermessage.getAllUserMessage(intpage,adminname);
  Iterator userIter = userItems.iterator();
  
  
  AdminPower adminP = new AdminPower();
  String adminpo = adminP.getAdminPower(adminname);
  
  if(adminname==null||adminpo.equals("普通会员")){
     response.sendRedirect("../index.jsp");
  }
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP blog manage page</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="../css/toolbar.css">

  </head>
  
  <body>
    <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=adminname %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
    
    
    <table height="10px">
          <tr>
           <td></td>
          </tr>
         </table>
         
<hr />
<script language="javascript">
  function loadType(){
     var typeid=document.getElementById("selecttype");
     var typevalue=typeid.value;
     window.location="adminforum.jsp?username=<%=username%>&numberpage=3&arttype="+typevalue;
  }
  
  function loadUserArticle(){
     var user=document.getElementById("selectuser");
     var uservalue=user.value;
     var url="adminforum.jsp?username=";
     url+=uservalue;
     url+="&numberpage=3";
     window.location=url;
  }
</script>
<p>用户 
<select name="selectusername" id="selectuser" onchange="loadUserArticle();">
 <%
  if(username!=null){
    out.print("<option value="+username+">"+username+"</option>");
  } 
  else{
     out.print("<option>请选择用户名</option>");
  }
  while(userIter.hasNext()){        
      UserData userdata = (UserData)userIter.next();
      if(!userdata.getName().equals(username)){
        out.print("<option value="+userdata.getName()+">"+userdata.getName()+"</option>");
      } 
  }
   %>
</select>

已有的 <select name="type" id="selecttype" onchange="loadType();">
           <%
             if(username==null){
               out.print("<option>----</option>");
             }
             else{
               out.print("<option value="+arttype+">"+arttype+"</option>");
             }
             if(!arttype.equals("全部")){
               out.print("<option value='全部'>全部</option>");
             }
             while(arttypeItems.hasNext()){  
               String typename = (String)arttypeItems.next();        
               out.print("<option value="+typename+">"+typename+"</option>");
             }
           %>
         </select> 帖子:</p>
         
         <table height="10px">
          <tr>
           <td></td>
          </tr>
         </table>
         
<table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
  <tr class="datagridhead">
   <td>文章数</td>
   <td>主题</td>
   <td>发表者</td>
   <td>发表时间</td>
   <td>回帖数</td>
   <td>点击数</td>
 </tr> 
  <%
         int lili = 0;
         for(int i=1;artItems.hasNext();i++){
           Article art = (Article)artItems.next();
           if(i%2==0){
        %>
        <tr class="datagrid1212">
          <td>
            <a href="adminforum_action.jsp?username=<%=username %>&&numberpage=3&&serial=<%=art.getArticle_no() %>"><%=i %></a>
          </td>
          <td>
            <a href="adminforum_action.jsp?username=<%=username %>&&numberpage=3&&serial=<%=art.getArticle_no() %>"><%=art.getTitle() %></a>
          </td>
          <td>
            <a href="adminforum_action.jsp?username=<%=username %>&&numberpage=3&&serial=<%=art.getArticle_no() %>"><%=art.getSpeaker() %></a>
          </td>
          <td>
            <%=art.getSent_time() %>
          </td>
          <td>
            <%=art.getReply_num() %>
          </td>
          <td>
            <%=art.getClick_num() %>
          </td>
        </tr>
        <%}else{ %>
        <tr>
          <td>
            <a href="adminforum_action.jsp?username=<%=username %>&&numberpage=3&&serial=<%=art.getArticle_no() %>"><%=i %></a>
          </td>
          <td>
            <a href="adminforum_action.jsp?username=<%=username %>&&numberpage=3&&serial=<%=art.getArticle_no() %>"><%=art.getTitle() %></a>
          </td>
          <td>
            <a href="adminforum_action.jsp?username=<%=username %>&&numberpage=3&&serial=<%=art.getArticle_no() %>"><%=art.getSpeaker() %></a>
          </td>
          <td>
            <%=art.getSent_time() %>
          </td>
          <td>
            <%=art.getReply_num() %>
          </td>
          <td>
            <%=art.getClick_num() %>
          </td>
        </tr>
        <%} 
        }%>
</table>
<br>
<br>
第<%=intpage%>页&nbsp;&nbsp;共<%=intpagecount%>页&nbsp;&nbsp;
 <%if(intpage>1)
 {%>
     <a href="adminforum.jsp?username=<%=username %>&&numberpage=3&&page=<%=intpage-1%>">上一页</a>
<%}%>&nbsp;&nbsp;
<%if(intpage<intpagecount)
  {%>
     <a href="adminforum.jsp?username=<%=username %>&&numberpage=3&&page=<%=intpage+1%>">下一页</a>
 <%}%>
    
    
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
    </div>
  </body>
</html>