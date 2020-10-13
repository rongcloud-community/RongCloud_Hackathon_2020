<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%>
<%@ page import="com.user.UserData" %>
<%@ page import="com.user.VisitAdd" %>
<%@ page import="com.user.GetUserData" %>
<%@ page import="com.article.Article" %>
<%@ page import="com.article.getArticle" %>
<%@ page import="com.article.ArticleType" %>

<%
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
  
  VisitAdd visitadd = new VisitAdd();
  visitadd.addClickNum(username);
  
  getArticle getArt = new getArticle();
  List items = getArt.getArticleMessage(username,intpage,"ȫ��");
  Iterator artItems = items.iterator();
  intpagecount = getArt.getPageSize(username,"ȫ��");
  
  GetUserData getuserdata = new GetUserData();
  UserData userdata = getuserdata.getCurrentUserData(username);
  
  
  String arttype=request.getParameter("arttype");
  if(arttype == null||arttype == ""){
    arttype="ȫ��";
  }
  List typeItems = null;
  ArticleType articlety = new ArticleType();
  typeItems = articlety.getType(username);
  Iterator arttypeItems = typeItems.iterator();
  
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
    
        <table height="10px">
          <tr>
           <td></td>
          </tr>
         </table>
         
         
<script language="javascript">
  function loadType(){
     var typeid=document.getElementById("selecttype");
     var typevalue=typeid.value;
     window.location="forumindex.jsp?username=<%=username%>&numberpage=2&arttype="+typevalue;
  }
</script>
<p>���е� <select name="type" id="selecttype" onChange="loadType()">
           <option value="<%=arttype %>"><%=arttype %></option>
           <%
             if(!arttype.equals("ȫ��")){
               out.print("<option value='ȫ��'>ȫ��</option>");
             }
           while(arttypeItems.hasNext()){  
             String typename = (String)arttypeItems.next();
             //if(!typename.equals(arttype)){
               out.print("<option value="+typename+">"+typename+"</option>");
            //}       
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
		  <td>&nbsp;</td>
          <td>����</td>
          <td>������</td>
          <td>����ʱ��</td>
          <td>������</td>
          <td>�����</td>
         </tr> 
        <%
         int li = 0;
         for(int i=1;artItems.hasNext();i++){
           li++;
           Article art = (Article)artItems.next();
           if(i%2==0){
        %>
        <tr class="datagrid1212">
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=1&&serial=<%=art.getArticle_no() %>"><%=i %></a>
          </td>
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=1&&serial=<%=art.getArticle_no() %>"><%=art.getTitle() %></a>
          </td>
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=1&&serial=<%=art.getArticle_no() %>"><%=art.getSpeaker() %></a>
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
            <a href="forum.jsp?username=<%=username %>&&numberpage=1&&serial=<%=art.getArticle_no() %>"><%=i %></a>
          </td>
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=1&&serial=<%=art.getArticle_no() %>"><%=art.getTitle() %></a>
          </td>
          <td>
            <a href="forum.jsp?username=<%=username %>&&numberpage=1&&serial=<%=art.getArticle_no() %>"><%=art.getSpeaker() %></a>
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
        <%
         }
        } %>
		</table>
	
		
		<br>
<br>
��<%=intpage%>ҳ&nbsp;&nbsp;��<%=intpagecount%>ҳ&nbsp;&nbsp;
 <%if(intpage>1)
 {%>
     <a href="pass.jsp?username=<%=username %>&&numberpage=1&&page=<%=intpage-1%>">��һҳ</a>
<%}%>&nbsp;&nbsp;
<%if(intpage<intpagecount)
  {%>
     <a href="pass.jsp?username=<%=username %>&&numberpage=1&&page=<%=intpage+1%>">��һҳ</a>
 <%}%>



<jsp:include flush="false" page="footer.jsp" />    
</body>
</html>
