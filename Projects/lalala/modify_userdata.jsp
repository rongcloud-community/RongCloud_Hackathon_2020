<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*" errorPage="" %>
<%@ page import="com.user.GetUserData" %>
<%@ page import="com.user.UserData" %>

<%
  String currentusername = "";
  if((String)session.getAttribute("currentLoginUserDataName")!=null){
    currentusername = (String)session.getAttribute("currentLoginUserDataName");
  }
  
  String username = request.getParameter("username");
  
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  GetUserData getuserdata = new GetUserData();
  UserData userdata = getuserdata.getCurrentUserData(username);
  
  
  String modifymsg = (String)session.getAttribute("modifymsg");
  if(modifymsg == null){
    modifymsg = "";
  }
  else{
    session.removeAttribute("modifymsg");
  }
  
 %>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
     <title><%=username %> �� blog</title>
      <link rel="stylesheet" type="text/css" href="css/toolbar.css">
  </head>
   <script language="javascript"  src="javaScript/modifyConfirm.js">
   </script>

<body>

    <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=username %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
 
 <%
   if(currentusername.equals(username)){
  %>

  <table align="center" width="760px" class="datagridstyle" id="modifymsg" cellSpacing=0 cellPadding=3 border=0>
   <tr height="20px">
    <td align="center"><b><%=modifymsg %></b></td>
   </tr>
  </table>
  
  
  <form action="ModifyUserData?username=<%=currentusername %>" method="post" name="ModifyBData" onSubmit="return ModifyUserData(this);">
   <input type="hidden" name="reoldpassword" value="<%=userdata.getPassword()%>" />
   <table align="center" width="760px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
     <tr class="datagridhead">
      <td align="center" colspan="2">�޸��û���Ϣ</td>
     </tr>
     <tr class="datagrid1212">
	  <td>���������룺</td>
	  <td>
	   <input type="password" name="oldpassword" value="" />(�޸�����Ҫ��������)
	  </td>
	</tr>
	<tr>
	 <td>
	   �����������룺
	 </td>
	 <td>
	   <input type="password" name="newpassword" value="" />(���޸�����)
	 </td>
	</tr>
	<tr class="datagrid1212">
	  <td>
	   ����ȷ�ϣ�
	  </td>
	  <td>
	   <input type="password" name="renewpassword" value="" />
	  </td>
	</tr>
 
    <tr>
	  <td>
	    �û�����
	  </td>
	  <td>
	    <%=userdata.getName()%>
	  </td>
	</tr>
	<tr class="datagrid1212">
	  <td>
	    �Ա�
	  </td>
	  <td>
	  <%
	    if(userdata.getSex().equals("�к�")){
	   %>
        <input type="radio"  value="�к�" name="sex" checked/> �к� &nbsp;&nbsp;&nbsp;&nbsp; 
        <input type="radio" value="Ů��" name="sex"/> Ů��
       <%} 
        else{
       %>
       <input type="radio"  value="�к�" name="sex"/> �к� &nbsp;&nbsp;&nbsp;&nbsp; 
        <input type="radio" value="Ů��" name="sex" checked/> Ů��
        <%} %>
	  </td>
	</tr>
	<tr>
	  <td>
	    ͷ��
	  </td>
	  <td>
	    <select name="face" size=1 onChange="document.images['face'].src=options[selectedIndex].value;" style="BACKGROUND-COLOR: #99CCFF; BORDER-BOTTOM: 1px double; BORDER-LEFT: 1px double; BORDER-RIGHT: 1px double; BORDER-TOP: 1px double; COLOR: #000000">
          <option value="<%=userdata.getFace()%>">Image0</option>
          <option value="images/face/Image1.gif">Image1</option>
          <option value="images/face/Image2.gif">Image2</option>
          <option value="images/face/Image3.gif">Image3</option>
          <option value="images/face/Image4.gif">Image4</option>
          <option value="images/face/Image5.gif">Image5</option>
          <option value="images/face/Image6.gif">Image6</option>
          <option value="images/face/Image7.gif">Image7</option>
          <option value="images/face/Image8.gif">Image8</option>
          <option value="images/face/Image9.gif">Image9</option>
          <option value="images/face/Image10.gif">Image10</option>
        </select>
       &nbsp;<img id="face" src="<%=userdata.getFace()%>">
	  </td>
	</tr>
	<tr class="datagrid1212">
	 <td>
	   QQ:
	 </td>
	 <td>
	  <input type="text" name="qq" value="<%=userdata.getQq()%>" />
	 </td>
	</tr>
	<tr>
	  <td>
	  Email��
	  </td>
	  <td>
	    <input name="email" type="text" value="<%=userdata.getEmail()%>" />
	  </td>
	</tr>
	<tr class="datagrid1212">
	  <td>
	   ������ҳ(��ѡ)��
	  </td>
	  <td>
	   <input type="text" name="www" value="<%=userdata.getWww()%>" />
	  </td>
	</tr>
	<tr> 
      <td>����ǩ����(���150�ֽ�) </td>
      <td> 
       <textarea name="signname" rows="5" cols="60"><%=userdata.getSignname() %></textarea>
      </td>
    </tr>
	<tr class="datagrid1212">
	  <td>
	    ע��ʱ�䣺
	  </td>
	  <td>
	    <%=userdata.getRegeditTime()%>
	  </td>
	</tr>
	<tr>
     <td align="center" colspan="2">
	   <input type="submit" value="�ύ" />
	 </td>
   </tr>
  </table>
 </form>
<%}
   else{
 %>
 <table align="center" width="760px" id="modifymsg" cellSpacing=0 cellPadding=3 border=0>
   <tr height="20px">
    <td align="center"></td>
   </tr>
  </table>
   <table align="center" width="560px" class="datagridstyle" id="DataGrid1" cellSpacing=0 cellPadding=3 border=0>
     <tr class="datagridhead">
      <td align="center" colspan="2">�û���Ϣ</td>
     </tr>
     <tr>
      <td>�û���:</td>
      <td>
        <a href="pass.jsp?username=<%=userdata.getName() %>" title="���ҵ� blog ����" target="_blank"><%=userdata.getName() %></a>
      </td>
     </tr>
     <tr class="datagrid1212">
      <td>�Ա�:</td>
      <td><%=userdata.getSex() %></td>
     </tr>
     <tr>
      <td>ͷ��</td>
      <td>
        <a href="pass.jsp?username=<%=userdata.getName() %>" title="���ҵ� blog ����" target="_blank">
         <img src="<%=userdata.getFace() %>" width="30px" height="30px" align="middle" border="0" alt="���ҵ� blog ����"/>
        </a>
      </td>
     </tr>
     <tr class="datagrid1212">
      <td>QQ:</td>
      <td>
        <a href="tencent://message/?uin=<%=userdata.getQq() %>&Site=��վ����QQ��ϵ&Menu=yes" target="_blank"><%=userdata.getQq() %></a>
	  </td>
     </tr>
     <tr>
      <td>Email:</td>
      <td><a href="mailto:<%=userdata.getEmail()%>"><%=userdata.getEmail()%></a></td>
     </tr>
     <tr class="datagrid1212">
      <td>������ҳ:</td>
      <td><a href="http://<%=userdata.getWww()%>" target="_blank"><%=userdata.getWww()%></a></td>
     </tr>
     <tr>
      <td>��������:</td>
      <td><%=userdata.getSendArticle() %> ƪ</td>
     </tr>
     <tr class="datagrid1212">
      <td>����ǩ��:</td>
      <td><%=userdata.getSignname() %></td>
     </tr>
     <tr>
      <td>ע��ʱ��:</td>
      <td><%=userdata.getRegeditTime() %></td>
     </tr>
     </table> 
<%} %>


   <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
</body>
</html>
