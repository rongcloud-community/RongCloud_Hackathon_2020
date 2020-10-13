<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.liuyan.LiuYanData" %>
<%@ page import="com.liuyan.GetLiuYan" %>
<%@ page import="com.admin.AdminPower" %>

<%
  String DeleteLiuYanMSG = (String)session.getAttribute("DeleteLiuYanMSG");
  if(DeleteLiuYanMSG==null){
    DeleteLiuYanMSG = "";
  }
  else{
    session.removeAttribute("DeleteLiuYanMSG");
  }
  

  String strpage = request.getParameter("page");
  int intpage = 1;
  int intpagecount = 1;
  if(strpage == null||strpage == ""){
     strpage = "1";
  }
  intpage = java.lang.Integer.parseInt(strpage);
  
  
  GetLiuYan showMsg = new GetLiuYan();
  List messageItems = showMsg.getAllLiuYan(intpage);
  Iterator messItems = messageItems.iterator();
  
  intpagecount = showMsg.getPageSize();
  
  
  String adminname = (String)session.getAttribute("currentLoginAdminName");
  //int intpage = 1;
  //int intpagecount = 1;
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  AdminPower adminP = new AdminPower();
  String adminpo = adminP.getAdminPower(adminname);
  
  if(adminname==null||adminpo.equals("普通会员")){
     response.sendRedirect("../index.jsp");
  }
 %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'liuyan.jsp' starting page</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="../css/toolbar.css">
	
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
      <jsp:param name="username" value="<%=adminname %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
    
    
    <table height="30px" align="center">
          <tr>
           <td><%=DeleteLiuYanMSG %></td>
          </tr>
         </table>
         
         
         <table align="center" width="960px" id="liuyanshow" cellSpacing=0 cellPadding=3 border=0>
 <%
         for(int i=1;messItems.hasNext();i++){
           LiuYanData msgDetail = (LiuYanData)messItems.next();
        %>
        <tr class="datagridhead">
          <td>
            留言者:<%=msgDetail.getName() %>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发表时间:<%=msgDetail.getInsert_time() %>
            <a href="AdminDeleteLiuYan?id=<%=msgDetail.getId() %>" onClick="return confirm('是否删除该留言?');">
	          <img src="../image/bbs_delete.gif" border='0' alt='删   除'>&nbsp;删除
	        </a>
          </td>
         </tr>
         <tr>
          <td>
           <%=msgDetail.getContent() %>
          </td>
        </tr>
        <tr height="20px">
         <td></td>
         <td></td>
        </tr>
        <%} %>
 </table>
 <br>
第<%=intpage%>页&nbsp;&nbsp;共<%=intpagecount%>页&nbsp;&nbsp;
 <%if(intpage>1)
 {%>
     <a href="liuyan.jsp?numberpage=6&page=<%=intpage-1%>">上一页</a>
<%}%>&nbsp;&nbsp;
<%if(intpage<intpagecount)
  {%>
     <a href="liuyan.jsp?numberpage=6&page=<%=intpage+1%>">下一页</a>
 <%}%>
 
 <table height="30px">
  <tr>
   <td></td>
  </tr>
 </table>
 
 
 
         
         
    <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
    </div>
  </body>
</html>
