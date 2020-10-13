<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.user.UserData" %>
<%@ page import="com.article.Article" %>
<%@ page import="com.article.ReArticle" %>
<%@ page import="com.article.ShowArticle" %>

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
  
  String username = request.getParameter("username");
  String strserial = request.getParameter("serial");
  int serial = Integer.parseInt(strserial);  //获得文章的系列号
  
  String strpage = request.getParameter("page");

  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  if(strpage == null||strpage == ""){
     strpage = "1";
  }
  
  ShowArticle showArt = new ShowArticle();
  Article art = showArt.getArticleByNo(serial);
  List ReArtItems = showArt.getReArtByArticle_no(serial);
  Iterator artItems = ReArtItems.iterator();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title><%=username %> 的 blog</title>
<link rel="stylesheet" type="text/css" href="css/toolbar.css">
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
</head>



<body>
  <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=username %>" />
      <jsp:param name="numberpage" value="2" />
    </jsp:include>
  
  
  <%
  if(currentusername.equals(username)&&!("".equals(currentusername))){
   %>
  <div id="clear">
    <a href="forum_send.jsp?username=<%=currentusername %>"><img src="images/icon_appeararticle.gif" border="0" alt="发表新话题"></a>
  </div>
  <%} %>
  
<br><br>
        
        <table align="center" height="10px">
          <tr>
           <td><b><%=dealforummsg %></b></td>
          </tr>
         </table>


<br>
    <table align="center" width="960px" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
     <tr class="datagridhead">
        <td>发表的文章</td>
      </tr>
      <tr>
        <td align='right'>
          <%
          if(currentusername.equals(username)&&currentusername!=null){
          %>
           <a href="forum_modify.jsp?serial=<%=strserial %>&&username=<%=currentusername %>">
              <img src='image/bbs_modify.gif' border='0' alt='修   改'>&nbsp;修改
           </a>
           <a href="DeleteArticleDAO?currentusername=<%=currentusername %>&&article_no=<%=strserial %>" onClick="return confirm('是否要删除该文章?');">
             <img src='image/bbs_delete.gif' border='0' alt='删   除'>&nbsp;删除
           </a>
           <%}%>
        </td>
      </tr>
      <tr>
         <td>&nbsp;&nbsp;&nbsp;主题:&nbsp;&nbsp;<%=art.getTitle() %>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分类:&nbsp;&nbsp;<%=art.getType() %></td>
      </tr>
      <tr class="datagrid1212">
         <td>&nbsp;&nbsp;&nbsp;发表者:&nbsp;&nbsp;
          <a href="modify_userdata.jsp?username=<%=art.getSpeaker() %>&numberpage=5" target="_blank" title="到我的 blog 看看"><%=art.getSpeaker() %></a>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发表时间:&nbsp;&nbsp;<%=art.getSent_time() %>
	         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点击数:&nbsp;&nbsp;<%=art.getClick_num() %>
	         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回帖数:&nbsp;&nbsp;<%=art.getReply_num() %>
	     </td>
	  </tr>
	  <tr>
	    <td></td>
	  </tr>
	    <tr>
	      <td>&nbsp;&nbsp;&nbsp;&nbsp;<%=art.getContent() %></td>
	    </tr>
	  </table>
	  
	  <br><br>
	  
	  <br><br>
	  
	  <table align="center" width="960px"  id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
       <tr class="datagridhead">
	      <td>回复的留言</td>
	    </tr>
	    <%
         for(int i=1;artItems.hasNext();i++){
           ReArticle ReArt = (ReArticle)artItems.next();
        %>
	    <tr class="datagrid1212">
	      <td>
	      &nbsp;&nbsp;&nbsp;回帖者:&nbsp;&nbsp;<a href="modify_userdata.jsp?username=<%=ReArt.getRe_name() %>&numberpage=5" target="_blank" title="到我的 blog 看看"><%=ReArt.getRe_name() %></a>&nbsp;&nbsp;&nbsp;
	      &nbsp;&nbsp;&nbsp;回复时间:&nbsp;&nbsp;<%=ReArt.getInsert_time() %>
	      <%
          if(currentusername.equals(username)&&currentusername!=null){
          %>
	      <a href="DeleteReply?currentusername=<%=currentusername %>&&article_no=<%=strserial %>&&id=<%=ReArt.getId() %>" onClick="return confirm('是否要删除该回复?');">
	          <img src='image/bbs_delete.gif' border='0' alt='删   除'>&nbsp;删除
	      </a>
	      <%}%>
	      </td>
	    </tr>
	    <tr>
	      <td>&nbsp;&nbsp;&nbsp;&nbsp;<%=ReArt.getContent() %></td>
	    </tr>
	    <tr height="30px">
	      <td>
	      </td>
	    </tr>
	    <%} %>
	  </table>
	 
<br>
     <form method="post" action="ReArticleDAO?strserial=<%=strserial %>&&username=<%=username %>" onSubmit="return isOK(this);">
      <table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
       <tr class="datagridhead">
         <th><font color='white'>发表评论:</font></th>
        </tr>
        <%
         if(!currentusername.equals("")){
         %>
        <tr>
         <td>姓名:<input type="text" name="re_name" value="<%=currentusername %>" size="25"/></td>
        </tr>
        <%}else{ %>
        <tr>
         <td>姓名:<input type="text" name="re_name" value="匿名" size="25"/></td>
        </tr>
        <%} %>
        <tr>
         <td>内容:</td>
        </tr>
        <tr>
         <td><textarea name="content" cols="80" rows="15"></textarea></td>
        </tr>
        <tr>
         <td><input type="submit" size="10" value="回  复"/></td>
        </tr>
      </table>
           
     </form>
   
   <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
   
   
</body>
</html>
