<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<%@ page import="com.liuyan.LiuYanData" %>
<%@ page import="com.liuyan.GetLiuYan" %>

<%
  String liuyanmsg = (String)session.getAttribute("liuyanmsg");
  if(liuyanmsg==null){
    liuyanmsg = "";
  }
  else{
    session.removeAttribute("liuyanmsg");
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
 %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'leavemessage.jsp' starting page</title>

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
</script>
</head>

<body>
     <div id="headImage">
        <img src="image/EasyShopping.jpg" width="960px" height="200px" alt="">
    </div>
    
        <table align="center" height="30px">
          <tr>
           <td><b><%=liuyanmsg %></b></td>
          </tr>
         </table>
    
        <table align="center" height="30px">
          <tr>
           <td><b>վ �� �� ��</b></td>
          </tr>
         </table>
         
         
         <table align="center" width="960px" class="datagridstyle" id="liuyanshow" cellSpacing=0 cellPadding=3 border=0>
 <%
         for(int i=1;messItems.hasNext();i++){
           LiuYanData msgDetail = (LiuYanData)messItems.next();
        %>
        <tr class="datagridhead">
          <td>������:<%=msgDetail.getName() %>&nbsp;&nbsp;&nbsp;����ʱ��:<%=msgDetail.getInsert_time() %></td>
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
��<%=intpage%>ҳ&nbsp;&nbsp;��<%=intpagecount%>ҳ&nbsp;&nbsp;
 <%if(intpage>1)
 {%>
     <a href="leavemessage.jsp?page=<%=intpage-1%>">��һҳ</a>
<%}%>&nbsp;&nbsp;
<%if(intpage<intpagecount)
  {%>
     <a href="leavemessage.jsp?page=<%=intpage+1%>">��һҳ</a>
 <%}%>
 
 <table height="30px">
  <tr>
   <td></td>
  </tr>
 </table>       


<form method="post" action="LiuYanDAO" onSubmit="return isOK(this);">
      <table align="center" width="500px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
       <tr class="datagridhead">
         <th><font color='black'>��������:</font></th>
        </tr>
        <tr>
         <td>����:<input type="text" name="re_name" value="����" size="25"/></td>
        </tr>
        <tr>
         <td>����:����Ҫ����300���ַ�����100�����֣�</td>
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
