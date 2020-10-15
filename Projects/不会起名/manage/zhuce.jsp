<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage="" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<!-- saved from url=(0046)http://www.kehu.com.cn/index.html?mod=register -->
<HTML><HEAD>
<title>淘客——淘尽天下客，我的客户，我作主</title>
<meta name=keywords content="网站客服,主动营销,QQ客服,在线客服,即时通讯,免费短信,免费电话,流量统计">
<meta name="description" content="最好的网络营销工具，比QQ客服更专业、更出色的网站在线客服工具，具有网站监控、流量统计、即时通讯的功能">
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2900.3020" name=GENERATOR>
<style type="text/css">
<!--
.STYLE2 {color: #FFFFFF}
.STYLE3 {color: #FF9900}
.STYLE4 {color: #000000}
body,td,th {
	font-family: 宋体;
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
		alert("请输入您的完整域名");
		UserForm.domain.focus();
		return false;
	}
	var domain = UserForm.domain.value;
	if(domain.indexOf("http://")!=-1)
	{
		alert("不需要输入http://");
		UserForm.domain.focus();
		return false;
	}
	if(UserForm.companyName.value=="")
	{
		alert("请输入您的公司名称");
		UserForm.companyName.focus();
		return false;
	}
	if(UserForm.contactName.value=="")
	{
		alert("请输入您的联 系 人");
		UserForm.contactName.focus();
		return false;
	}
	if(UserForm.contactTel.value=="")
	{
		alert("请输入您的联系电话");
		UserForm.contactTel.focus();
		return false;
	}
	if(UserForm.contactEmail.value=="")
	{
		alert("请输入您的电子信箱");
		UserForm.contactEmail.focus();
		return false;
	}
	if(UserForm.password.value=="")
	{
		alert("请输入您的密   码");
		UserForm.password.focus();
		return false;
	}
	if(UserForm.password2.value=="")
	{
		alert("请输入您的确认密码");
		UserForm.password2.focus();
		return false;
	}
	if(UserForm.password2.value!=UserForm.password.value)
	{
		alert("两次输入的密码不一致");
		UserForm.password2.value="";
		return false;
	}
}
</script>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
  out.println("<script language=jscript>alert('您的帐号已经在其它地方登陆，只有重新登陆才可使用。');location.assign('index.htm');</script>");			
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
    <td width="790" bgcolor="#E4F2FF">代理注册下级网站</td>
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
height=26 colspan="2" align=left bgcolor="#E9F3FC">&nbsp;&nbsp;&nbsp;<span class="STYLE4">站点基本信息：</span><span class="STYLE3">（免费注册\免费使用标准版）</span></td>
                  </tr>
                  <tr>
                    <td align=right width=97 
height=25><span>公司主页：</span></td>
                    <td width="473" height=25><input name=domain class=input 
                        id=domain value="www." size=30 
                        msg="请正确输入网站域名" model="domain">
                        <br>
                        <span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">请不要在此添加多个域名，直接输入您的域名即可，</span><span class="STYLE3">不需要输入http://</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25><span>公司名称：</span></td>
                    <td height=25><input class=input id=companyName size=30 name=companyName >
                        <span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">填写完整的公司注册信息</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25><span>联 系 人：</span></td>
                    <td height=25><input name="contactName" type="text" id="contactName" size="20">
                        <span class="STYLE3"><strong>*</strong></span></td>
                  </tr>
                  <tr>
                    <td align=right height=25><span>联系电话：</span></td>
                    <td height=25><input class=input id=contactTel size=20 name=contactTel >
                      <span class="STYLE3"><strong>*</strong></span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>电子信箱：</td>
                    <td height=25><span class="content9">
                      <INPUT id=contactEmail name=contactEmail>
                      <strong class="STYLE3">*</strong></span><span class="STYLE9">注册后信息会发到您的邮箱里，请使用常用邮箱</span></td>
                  </tr>
                  <tr>
                    <td height=26 colspan="2" align=left bgcolor="#E9F3FC">&nbsp;&nbsp;&nbsp;<span class="STYLE2"><span class="STYLE4">管理员基本信息：</span></span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>密&nbsp;&nbsp;&nbsp;码：</td>
                    <td height=25><input name=password type="password" class=input id=password size=15 >
                        <span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">请使用英文字母及数字组合，6-20位之间</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>确认密码：</td>
                    <td height=25><input name=password2 type="password" class=input id=password2 size=15 >
                        <span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">确认两次输入的密码是否一致，6-20位之间</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>所属部门：</td>
                    <td height=25><span class="content9">
                      <SELECT id=type name=type>
                        <OPTION value=业务部>业务部</OPTION>
                        <OPTION value=技术部>技术部</OPTION>
                        <OPTION value=客服部>客服部</OPTION>
                      </SELECT>
                    </span><span class="STYLE3"><strong>*</strong></span> <span class="STYLE9">部门在注册后可以修改也可以添加新的部门</span></td>
                  </tr>
                  <tr>
                    <td align=right height=25>性&nbsp;&nbsp;&nbsp;别：</td>
                    <td height=25><input name="sex" type="radio" value="男" checked>
                      男
                      <input type="radio" name="sex" value="女">
                      女</td>
                  </tr>
                </tbody>
            </table></td>
          </tr>
          <tr>
            <td height="32" align=center valign=middle bgcolor="#FFFFFF"><input type="submit" name="Submit3" value=" 免费注册 " onClick="javascript:return submit_onclick()" >
              &nbsp;&nbsp;&nbsp;&nbsp;
			  <input type="hidden" name="agentId" value="<%=agentId%>">
              <input type="reset" name="Submit22" value=" 重填 "></td>
          </tr>
          <tr>
            <td 
                height=36 align=center bgcolor="#FFFFFF" >&nbsp;&nbsp;</td></tr>
          </form>
    </table></TD>
</TR></TBODY></TABLE>
</BODY></HTML>