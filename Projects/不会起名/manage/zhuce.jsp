<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage="" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<!-- saved from url=(0046)http://www.kehu.com.cn/index.html?mod=register -->
<HTML><HEAD>
<title>�Կ͡����Ծ����¿ͣ��ҵĿͻ���������</title>
<meta name=keywords content="��վ�ͷ�,����Ӫ��,QQ�ͷ�,���߿ͷ�,��ʱͨѶ,��Ѷ���,��ѵ绰,����ͳ��">
<meta name="description" content="��õ�����Ӫ�����ߣ���QQ�ͷ���רҵ������ɫ����վ���߿ͷ����ߣ�������վ��ء�����ͳ�ơ���ʱͨѶ�Ĺ���">
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2900.3020" name=GENERATOR>
<style type="text/css">
<!--
.STYLE2 {color: #FFFFFF}
.STYLE3 {color: #FF9900}
.STYLE4 {color: #000000}
body,td,th {
	font-family: ����;
	font-size: 12px;
	color: #000000;
}
a:link {
	text-decoration: none;
	color: #000099;
}
a:visited {
	text-decoration: none;
	color: #000099;
}
a:hover {
	text-decoration: none;
	color: #FF6600;
}
a:active {
	text-decoration: none;
}
body {
	background-repeat: no-repeat;
}
.STYLE9 {color: #666666}
.STYLE12 {color: #66ABEA}
-->
</style>
<script language="javascript" type="text/javascript">
function submit_onclick()
{
	if(UserForm.domain.value=="" || UserForm.domain.value=="www.")
	{
		alert("������������������");
		UserForm.domain.focus();
		return false;
	}
	var domain = UserForm.domain.value;
	if(domain.indexOf("http://")!=-1)
	{
		alert("����Ҫ����http://");
		UserForm.domain.focus();
		return false;
	}
	if(UserForm.companyName.value=="")
	{
		alert("���������Ĺ�˾����");
		UserForm.companyName.focus();
		return false;
	}
	if(UserForm.contactName.value=="")
	{
		alert("������������ ϵ ��");
		UserForm.contactName.focus();
		return false;
	}
	if(UserForm.contactTel.value=="")
	{
		alert("������������ϵ�绰");
		UserForm.contactTel.focus();
		return false;
	}
	if(UserForm.contactEmail.value=="")
	{
		alert("���������ĵ�������");
		UserForm.contactEmail.focus();
		return false;
	}
	if(UserForm.password.value=="")
	{
		alert("������������   ��");
		UserForm.password.focus();
		return false;
	}
	if(UserForm.password2.value=="")
	{
		alert("����������ȷ������");
		UserForm.password2.focus();
		return false;
	}
	if(UserForm.password2.value!=UserForm.password.value)
	{
		alert("������������벻һ��");
		UserForm.password2.value="";
		return false;
	}
}
</script>
<%
/////////////////////session���////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
  out.println("<script language=jscript>alert('�����ʺ��Ѿ��������ط���½��ֻ�����µ�½�ſ�ʹ�á�');location.assign('index.htm');</script>");			
  return;	
}
///////////////////////////////////////////////////////////////////////////////		
%> 
<%
 
String agentId = vid;
%>
</HEAD>
<BODY>
<table width="782" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF">����ע���¼���վ</td>
  </tr>
</table>
<br>
<TABLE width="780" border=0 align="left" cellPadding=0 cellSpacing=1 bgcolor="#A4C1EA">
  <TBODY>
  <TR>
    <TD 
      vAlign=top bgcolor="#FFFFFF"><table width=100% 
            border=0 align="left" cellpadding=0 cellspacing=0 class=setup_table>
	  <FORM id=UserForm name=UserForm action="http://client.100im.cn/regSave.jsp" method=post >
        <tbody>
          <tr>
            <td height="300" align=right valign=top bgcolor="#FFFFFF"><table width="100%" border=0 align="left" cellpadding=3 cellspacing=0 bgcolor="#FFFFFF">
                <tbody>
                  <tr>
                    <td 
height=26 colspan="2" align=left bgcolor="#E9F3FC">&nbsp;&nbsp;&nbsp;<span class="STYLE4">վ�������Ϣ��</span><span class="STYLE3">�����ע��\���ʹ�ñ�׼�棩</span></td>
                  </tr>
                  <tr>
                    <td align=right width=97 
height=25><span>��˾��ҳ��</span></td>
                    <td width="473" height=25><input name=domain class=input 
                        id=domain value="www." size=30 
                        msg="����ȷ������վ����" model="domain">
                        <br>
                        <span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">�벻Ҫ�ڴ���Ӷ��������ֱ�����������������ɣ�</span><span class="STYLE3">����Ҫ����http://</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25><span>��˾���ƣ�</span></td>
                    <td height=25><input class=input id=companyName size=30 name=companyName >
                        <span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">��д�����Ĺ�˾ע����Ϣ</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25><span>�� ϵ �ˣ�</span></td>
                    <td height=25><input name="contactName" type="text" id="contactName" size="20">
                        <span class="STYLE3"><strong>*</strong></span></td>
                  </tr>
                  <tr>
                    <td align=right height=25><span>��ϵ�绰��</span></td>
                    <td height=25><input class=input id=contactTel size=20 name=contactTel >
                      <span class="STYLE3"><strong>*</strong></span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>�������䣺</td>
                    <td height=25><span class="content9">
                      <INPUT id=contactEmail name=contactEmail>
                      <strong class="STYLE3">*</strong></span><span class="STYLE9">ע�����Ϣ�ᷢ�������������ʹ�ó�������</span></td>
                  </tr>
                  <tr>
                    <td height=26 colspan="2" align=left bgcolor="#E9F3FC">&nbsp;&nbsp;&nbsp;<span class="STYLE2"><span class="STYLE4">����Ա������Ϣ��</span></span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>��&nbsp;&nbsp;&nbsp;�룺</td>
                    <td height=25><input name=password type="password" class=input id=password size=15 >
                        <span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">��ʹ��Ӣ����ĸ��������ϣ�6-20λ֮��</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>ȷ�����룺</td>
                    <td height=25><input name=password2 type="password" class=input id=password2 size=15 >
                        <span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">ȷ����������������Ƿ�һ�£�6-20λ֮��</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>�������ţ�</td>
                    <td height=25><span class="content9">
                      <SELECT id=type name=type>
                        <OPTION value=ҵ��>ҵ��</OPTION>
                        <OPTION value=������>������</OPTION>
                        <OPTION value=�ͷ���>�ͷ���</OPTION>
                      </SELECT>
                    </span><span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">������ע�������޸�Ҳ��������µĲ���</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>��&nbsp;&nbsp;&nbsp;��</td>
                    <td height=25><input name="sex" type="radio" value="��" checked>
                      ��
                      <input type="radio" name="sex" value="Ů">
                      Ů</td>
                  </tr>
                </tbody>
            </table></td>
          </tr>
          <tr>
            <td height="32" align=center valign=middle bgcolor="#FFFFFF"><input type="submit" name="Submit3" value=" ���ע�� " onClick="javascript:return submit_onclick()" >
              &nbsp;&nbsp;&nbsp;&nbsp;
			  <input type="hidden" name="agentId" value="<%=agentId%>">
              <input type="reset" name="Submit22" value=" ���� "></td>
          </tr>
          <tr>
            <td 
                height=36 align=center bgcolor="#FFFFFF" >&nbsp;&nbsp;</td></tr>
          </form>
    </table></TD>
</TR></TBODY></TABLE>
</BODY></HTML>