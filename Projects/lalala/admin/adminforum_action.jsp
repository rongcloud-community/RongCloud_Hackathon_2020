<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.user.UserData" %>
<%@ page import="com.article.Article" %>
<%@ page import="com.article.ReArticle" %>
<%@ page import="com.article.ShowArticle" %>

<%@ page import="com.admin.AdminPower" %>

<%
  String adminname = (String)session.getAttribute("currentLoginAdminName");
  
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  
  String username = request.getParameter("username");
  String strserial = request.getParameter("serial");
  int serial = Integer.parseInt(strserial);  //������µ�ϵ�к�
  
  String strpage = request.getParameter("page");

  if(strpage == null||strpage == ""){
     strpage = "1";
  }
  
  ShowArticle showArt = new ShowArticle();
  Article art = showArt.getArticleByNo(serial);
  List ReArtItems = showArt.getReArtByArticle_no(serial);
  Iterator artItems = ReArtItems.iterator();
  
  AdminPower adminP = new AdminPower();
  String adminpo = adminP.getAdminPower(adminname);
  
  if(adminname==null||adminpo.equals("��ͨ��Ա")){
     response.sendRedirect("../index.jsp");
  }
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'adminforum_action.jsp' starting page</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/toolbar.css">
	
	<script language="javascript">
function isOK(f)
{
  if(f.re_name.value=="")
  {
     alert("��������Ϊ��!");
	 return false;
   }
   else if(f.re_name.value.length>18)
  {
     alert("��������̫��!");
	 return false;
   }
   else if(f.content.value == "")
  {
     alert("���ݲ���Ϊ��!");
	 return false;
   }
   else if(f.content.value.length>300)
  {
     alert("���ݲ��ܶ��� 300 ���ַ�!");
	 return false;
   }
   else{  return true;  }
}

function isDelete(){
              if(confirm("�Ƿ�ɾ��������?")){
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
    
    
    <table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
     <tr class="datagridhead">
        <td>���������</td>
      </tr>
      <tr>
        <td align='right'>
          <%
          if(adminname!=null){
          %>
           <a href="AdminDeleteArticleDAO?currentusername=<%=username %>&&article_no=<%=strserial %>" onClick="return isDelete();">
             <img src='../image/bbs_delete.gif' border='0' alt='ɾ   ��'>&nbsp;ɾ��
           </a>
           <%}%>
        </td>
      </tr>
      <tr>
         <td>&nbsp;&nbsp;&nbsp;����:&nbsp;&nbsp;<%=art.getTitle() %>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;����:&nbsp;&nbsp;<%=art.getType() %></td>
      </tr>
      <tr class="datagrid1212">
         <td>&nbsp;&nbsp;&nbsp;������:&nbsp;&nbsp;
          <a href="modify_userdata.jsp?username=<%=art.getSpeaker() %>&numberpage=5" target="_blank" title="���ҵ� blog ����"><%=art.getSpeaker() %></a>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;����ʱ��:&nbsp;&nbsp;<%=art.getSent_time() %>
	         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�����:&nbsp;&nbsp;<%=art.getClick_num() %>
	         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;������:&nbsp;&nbsp;<%=art.getReply_num() %>
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
	  
	  <table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
       <tr class="datagridhead">
	      <td>�ظ�������</td>
	    </tr>
	    <%
         for(int i=1;artItems.hasNext();i++){
           ReArticle ReArt = (ReArticle)artItems.next();
        %>
	    <tr class="datagrid1212">
	      <td>
	      &nbsp;&nbsp;&nbsp;������:&nbsp;&nbsp;<a href="modify_userdata.jsp?username=<%=ReArt.getRe_name() %>&numberpage=5" target="_blank" title="���ҵ� blog ����"><%=ReArt.getRe_name() %></a>&nbsp;&nbsp;&nbsp;
	      &nbsp;&nbsp;&nbsp;�ظ�ʱ��:&nbsp;&nbsp;<%=ReArt.getInsert_time() %>
	      
	      <%
          if(adminname!=null){
          %>
          
	      <a href="AdminDeleteReply?currentusername=<%=username %>&&article_no=<%=strserial %>&&id=<%=ReArt.getId() %>" onClick="return isDelete();">
	          <img src="../image/bbs_delete.gif" border='0' alt='ɾ   ��'>&nbsp;ɾ��
	      </a>
	      <%} %>
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
     <form method="post" action="AdminReArticleDAO?strserial=<%=strserial %>&&username=<%=adminname %>" onSubmit="return isOK(this);">
      <table align="center" width="960px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
       <tr class="datagridhead">
         <th><font color='white'>��������:</font></th>
        </tr>
        <%
         if(!adminname.equals("")){
         %>
        <tr>
         <td>����:<input type="text" name="re_name" value="<%=adminname %>" size="25"/></td>
        </tr>
        <%}else{ %>
        <tr>
         <td>����:<input type="text" name="re_name" value="����" size="25"/></td>
        </tr>
        <%} %>
        <tr>
         <td>����:</td>
        </tr>
        <tr>
         <td><textarea name="content" cols="80" rows="15"></textarea></td>
        </tr>
        <tr>
         <td><input type="submit" size="10" value="��  ��"/></td>
        </tr>
      </table>
           
     </form>
    
    
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
    </div>
  </body>
</html>
