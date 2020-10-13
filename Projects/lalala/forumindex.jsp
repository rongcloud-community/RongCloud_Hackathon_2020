<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%>
<%@ page import="com.user.UserData" %>
<%@ page import="com.article.Article" %>
<%@ page import="com.article.getArticle" %>
<%@ page import="com.article.ArticleType" %>


<%
  String dealforummsg = (String)session.getAttribute("dealforummsg");
  if(dealforummsg==null){
    dealforummsg = "";
  }
  else{
    session.removeAttribute("dealforummsg");
  }



  String currentusername = "";
  if((String)session.getAttribute("currentLoginUserDataName")!=null){
    currentusername = (String)session.getAttribute("currentLoginUserDataName");
  }
  
  String arttype=request.getParameter("arttype");
  if(arttype == null||arttype == ""){
    arttype="ȫ��";
  }
  
  String strpage = request.getParameter("page");
  int intpage = 1;
  int intpagecount = 1;
  String username = request.getParameter("username");
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
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
%>
	 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title><%=username %> �� blog</title>
<link rel="stylesheet" type="text/css" href="css/toolbar.css">

</head>

<body>
   <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=username %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
  
  <%
  if(currentusername.equals(username)&&!("".equals(currentusername))){
   %>
  <div id="clear">
    <a href="forum_send.jsp?username=<%=currentusername %>"><img src="images/icon_appeararticle.gif" border="0" alt="�����»���"></a>
  </div>
  <%} %>
  
<br>
<br>
         
         <table align="center" height="10px">
          <tr>
           <td><b><%=dealforummsg %></b></td>
          </tr>
         </table>
         
<hr />
<script language="javascript">
  function loadType(){
     var typeid=document.getElementById("selecttypeid");
     var typevalue=typeid.value;
     window.location="forumindex.jsp?username=<%=username%>&numberpage=2&arttype="+typevalue;
  }
</script>
<p>���е� <select name="type" id="selecttypeid" onchange="loadType();">
           <option value="<%=arttype %>"><%=arttype %></option>
           <%
             if(!arttype.equals("ȫ��")){
               out.print("<option value='ȫ��'>ȫ��</option>");
             }
           while(arttypeItems.hasNext()){  
             String typename = (String)arttypeItems.next();
             out.print("<option value="+typename+">"+typename+"</option>");
           }
           %>
         </select> ����:</p>
         
         <table height="10px">
          <tr>
           <td></td>
          </tr>
         </table>
         
<table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
  <tr class="datagridhead">
   <td>������</td>
   <td>����</td>
   <td>������</td>
   <td>����ʱ��</td>
   <td>������</td>
   <td>�����</td>
 </tr> 
  <%
         int lili = 0;
         for(int i=1;artItems.hasNext();i++){
           Article art = (Article)artItems.next();
           if(i%2==0){
        %>
        <tr class="datagrid1212">
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=2&&serial=<%=art.getArticle_no() %>"><%=i %></a>
          </td>
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=2&&serial=<%=art.getArticle_no() %>"><%=art.getTitle() %></a>
          </td>
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=2&&serial=<%=art.getArticle_no() %>"><%=art.getSpeaker() %></a>
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
            <a href="forum.jsp?username=<%=username %>&&numberpage=2&&serial=<%=art.getArticle_no() %>"><%=i %></a>
          </td>
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=2&&serial=<%=art.getArticle_no() %>"><%=art.getTitle() %></a>
          </td>
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=2&&serial=<%=art.getArticle_no() %>"><%=art.getSpeaker() %></a>
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
��<%=intpage%>ҳ&nbsp;&nbsp;��<%=intpagecount%>ҳ&nbsp;&nbsp;
 <%if(intpage>1)
 {%>
     <a href="forumindex.jsp?username=<%=username %>&&numberpage=2&&page=<%=intpage-1%>">��һҳ</a>
<%}%>&nbsp;&nbsp;
<%if(intpage<intpagecount)
  {%>
     <a href="forumindex.jsp?username=<%=username %>&&numberpage=2&&page=<%=intpage+1%>">��һҳ</a>
 <%}%>
 
   <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
   
</body>
</html>
