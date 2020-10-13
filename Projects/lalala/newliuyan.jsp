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

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<title>Calendar</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link rel="stylesheet" href="css/mm_health_nutr.css" type="text/css" />
<script language="JavaScript" type="text/javascript">

var d=new Date();
var monthname=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var TODAY = monthname[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
</script>
    <!-- HTTP �� -->
    <script src="http://cdn.ronghub.com/RongIMLib-2.5.9.js"></script>

</head>
<body bgcolor="#F4FFE4">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr bgcolor="#D5EDB3">
    <td width="382" colspan="2" rowspan="2"><img src="image/mm_health_photo.jpg" alt="Header image" width="382" height="101" border="0" /></td>
    <td width="378" height="50" id="logo" valign="bottom" align="center" nowrap="nowrap">��վ����</td>
    <td width="100%">&nbsp;</td>
  </tr>

  <tr bgcolor="#D5EDB3">
    <td height="51" id="tagline" valign="top" align="center"></td>
	<td width="100%">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#5C743D"><img src="mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#99CC66" background="mm_dashed_line.gif"><img src="mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr bgcolor="#99CC66">
  <td>&nbsp;</td>
  	<td colspan="3" id="dateformat" height="20"><a href="index.jsp">��ҳ</a>&nbsp;&nbsp;&nbsp;&nbsp;�����������:<script language="JavaScript" type="text/javascript">
      document.write(TODAY);	</script>	</td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#99CC66" background="mm_dashed_line.gif"><img src="mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#5C743D"><img src="mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>
 <tr>
    <td colspan="4" >

   <table border="0" align="center"  cellspacing="0" cellpadding="2" width="504">
        <tr>
          <td class="pageName">��ӭ�����վ����</td>
        </tr>
        <tr>
          <td class="bodyText"><p>����վ����������������</p>		  </td>
        </tr>
		 <%
         for(int i=1;messItems.hasNext();i++){
           LiuYanData msgDetail = (LiuYanData)messItems.next();
        %>
        <tr>
          <td  class="subHeader" id="monthformat">&nbsp;<br />������:<%=msgDetail.getName() %>&nbsp;&nbsp;&nbsp;����ʱ��:<%=msgDetail.getInsert_time() %></td>
         </tr>
         <tr>
          <td class="bodyText" valign="top">
           <%=msgDetail.getContent() %>
          </td>
        </tr>
        <tr height="20px">
         <td></td>
        </tr>
        <%} %>
		<tr>
		 <td>
		 ��<%=intpage%>ҳ&nbsp;&nbsp;��<%=intpagecount%>ҳ&nbsp;&nbsp;
 <%if(intpage>1)
 {%>
     <a href="newliuyan.jsp?page=<%=intpage-1%>">��һҳ</a>
<%}%>&nbsp;&nbsp;
<%if(intpage<intpagecount)
  {%>
     <a href="newliuyan.jsp?page=<%=intpage+1%>">��һҳ</a>
 <%}%>
		 </td>
		 
		</tr>
        </table>
<hr align="center"  style="width:600px;"/>
        <script>
            var config = {
                appkey: 'cpj2xarlchjtn',
            };
            var im = RongIMLib.init(config);

            var params = {
                onChanged: function (status) {
                    // status ��ʶ��ǰ����״̬
                    switch (status) {
                        case RongIMLib.ConnectionStatus.CONNECTED:
                            console.log('���ӳɹ�');
                            break;
                        case RongIMLib.ConnectionStatus.CONNECTING:
                            console.log('��������');
                            break;
                        case RongIMLib.ConnectionStatus.DISCONNECTED:
                            console.log('�Ͽ�����');
                            break;
                        case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                            console.log('�����豸��¼, ���˱���');
                            break;
                        case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                            console.log('��������ȷ, ���������ߺ�̨�鿴��ȫ��������');
                            break;
                        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                            console.log('���粻����, ��ʱ�ɵ��� reconnect ��������');
                            break;
                        default:
                            console.log('����״̬Ϊ', status);
                            break;
                    }
                }
            }

            RongIMClient.setConnectionStatusListener(params);

            var params = {
                // ���յ�����Ϣ
                onReceived: function (message) {
                    console.info(message);
                }
            }
            };
            RongIMClient.setOnReceiveMessageListener(params);

            var params = {
                //status ��ʶ��ǰ�������ĻỰ״̬
                onChanged: function(status) {
                    console.log(status);
                }
            };
            RongIMClient.setConversationStatusListener(params);


        </script>

        <script>
            var token = "mKmyKqTSf7aNDinwAFMnz7NXKI3dV3X0+Cd1BOxmtO2pmvsjW2HViWrePIfq0GuTu9jELQqsckv4AhfjCAKgQ==";

            RongIMClient.connect(token, {
                onSuccess: function(userId) {
                    console.log('���ӳɹ�, �û� ID Ϊ', userId);
                    // �����ѳɹ�, ��ʱ��ͨ�� getConversationList ��ȡ�Ự�б�չʾ
                },
                onTokenIncorrect: function() {
                    console.log('����ʧ��, ʧ��ԭ��: token ��Ч');
                },
                onError: function(errorCode) {
                    console.log('����ʧ��, ʧ��ԭ��: ', errorCode);
                }
            });
            var count = 150;
            var callback = {
                onSuccess: function(list) {
                    console.log('��ȡ�Ự�б�ɹ�', list);
                },
                onError: function(error) {
                    console.log('��ȡ�Ự�б�ʧ��', error);
                }
            }
            RongIMClient.getInstance().getConversationList(callback, null, count);
        </script>
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
	</td>
</table>
 <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
</body>
</html>
