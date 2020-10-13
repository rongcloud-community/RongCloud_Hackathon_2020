<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.article.Article" %>
<%@ page import="com.article.ShowArticle" %>
<%@ page import="com.article.ArticleType" %>


<%
  String currentusername = null;
  if((String)session.getAttribute("currentLoginUserDataName")!=null){
    currentusername = (String)session.getAttribute("currentLoginUserDataName");
  }
  
  String username = request.getParameter("username");
  String strserial = request.getParameter("serial");
  int serial = Integer.parseInt(strserial);  //������µ�ϵ�к�
  
  String strpage = request.getParameter("page");

  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  if(strpage == null||strpage == ""){
     strpage = "1";
  }
  
  ShowArticle showArt = new ShowArticle();
  Article art =  showArt.getArticleByNo(serial);
  
  
  List typeItems = null;
  ArticleType articlety = new ArticleType();
  typeItems = articlety.getType(username);
  Iterator arttypeItems = typeItems.iterator();
%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title><%=username %> �� blog</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/toolbar.css">

  </head>
  <script language="javascript"  src="javaScript/addnew.js">
   </script>
<script language="javascript">
function add()
{
    document.frames.cnEditBox.setHTML("<%=art.getContent() %>");
}    
    
function isOK(f)
{
  f.content.value = document.frames.cnEditBox.getHTML(true);
  if(f.title.value == "")
  {
     alert("���ⲻ��Ϊ��!");
	 return false;
   }
   else if(f.title.value.length>250)
   {
      alert("���ⲻ��̫��!");
	  return false;
   }
   else if(f.content.value == "<DIV></DIV>")
   {
      alert("���ݲ���Ϊ��!");
	  return false;
   }
   else if(f.content.value.length>80000){
     alert("�������ݲ���̫��");
     return false;
   }
   else if(f.type.value == ""){
     alert("���Ͳ���Ϊ��!");
     return false;
   }
   else if(f.type.value.length>10){
     alert("���Ͳ��ܳ���10�ַ�!");
     return false;
   }
  else
  { 
     return true;
   }
} 
</script> 
  
  <body onLoad="add();">
   <%
     if(currentusername == null&&(!currentusername.equals(username))){
   %>
  <script language="javascript">
     alert("��û��Ȩ���޸�!");
     history.back();
  </script>
  <%} %>
    
    <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=username %>" />
      <jsp:param name="numberpage" value="2" />
    </jsp:include>
	
	<table>
	 <tr height="10px">
	  <td></td>
	 </tr>
	</table>
    
    
    
    <form method="post" action="ModifyArticle?currentusername=<%=currentusername %>&&article_no=<%=strserial %>" onSubmit="return isOK(this);">
     <input type="hidden" name="content"/>
     <table align="center" width="960px" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
     <tr class="datagridhead">
      <td align="center" colspan="2">�޸�����</td>
     </tr>
      <tr>
       <td align="left">����:<input name="title" value="<%=art.getTitle() %>" type="text" height="20" size="50"/></td>
     </tr>
     <tr>
       <td align="left">����:
         <select name="type" id="typeselect">
           <option value="<%=art.getType() %>"><%=art.getType() %></option>
           <%
            while(arttypeItems.hasNext()){  
             String typename = (String)arttypeItems.next();
             if(!typename.equals(art.getType())){
            %>
            <option value="<%=typename %>"><%=typename %></option>
            <%}
            }
             %>
         </select>
         <a href="javascript:showinput()">�������</a>
         <input type="text" id="newtype" name="addtypevalue" value="������������������" onFocus="resetvalue();" onBlur="addType();" style="visibility:hidden"/>
      </td>
     </tr>
     <tr>
      <td align="center">
        <iframe style="border: none" name="cnEditBox" src="editbox/editbox.htm" width="100%" height="400"> </iframe> 
      </td>
     </tr> 
     <tr>
      <td>
        <input type="submit" value="�ύ">&nbsp;&nbsp;&nbsp;
	    <input type="button" value="����" onClick="history.go(-1);"/>
      </td>
     </tr>
    </table> 
   </form>
    
    
    
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
  </body>
</html>
