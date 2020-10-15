<%
	/**
	 *本文件被admin调用来发送手机短信
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
<%
//start: 判断登陆session是否超时/////
if( session.getValue("userType")==null || !((String)session.getValue("userType")).equals("admin")){
	out.println("<script language=jscript>alert('您登陆超时或没有登陆，请重新登陆。');"+
					"window.parent.location.assign('../index.htm');</script>");
	return;
}
//end: 判断登陆session是否超时/////
%> 
<%
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String scomClient = "";
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = (String)session.getValue("scomClient");
String submit=request.getParameter("submit");
String mobiles=request.getParameter("mobiles");
String content=null;
try{content=new String( (request.getParameter("content")).getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
if(submit!=null && mobiles!=null && content!=null){
    try{
		String domainIds=userManager.getDomainId(scomClient);
		int index=domainIds.indexOf(",");
		String domainId = null;
		if(index>0)
			domainId=domainIds.substring(0,index);
		//判断网站有足够的手机短信信用点	
		if(!userManager.hasMoreSmsCredit(domainId))
			out.println("你的网站没有足够的手机短信信用点，不能发送手机短信。");
		else{
			StringTokenizer st = new StringTokenizer(mobiles,";\r\n"); 
			int tokens=st.countTokens();
			String mNumbers="";
			while(st.hasMoreTokens())
				mNumbers +=";"+st.nextToken();
			mNumbers =mNumbers.substring(1);
			userManager.sendSms(scomClient,mNumbers,content);			
			userManager.dealSmsCredit(domainId,tokens);	 
			out.println("你的信息已经发出。");
	 	}	 
    }catch(Exception ee){}   
}
%>
<body>
<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
  <tr class="content10White">
    <td width="10" height="25">&nbsp;</td>
    <td width="770" height="25">输入手机号码和短信内容，点击确定即可发送短信。 </td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="25"><form id="form1" name="form1" method="post" action="sendSms.jsp">
<br />
<table width="700" border="0" cellpadding="0" cellspacing="1" bgcolor="#CCCCCC">
        <tr class="content10hui">
          <td height="25" colspan="2">&nbsp; 短信资费：0.1元/条</td>
          </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="116" height="25" align="center" valign="middle">输入手机号码：</td>
          <td width="584" height="25"><textarea name="mobiles" cols="30" rows="3"><%=(mobiles!=null)?mobiles:""%></textarea>
          多个手机号用分号；隔开, 可多行,数量在100以内
            </td>
        </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="116" height="25" align="center" valign="middle">输入短信内容：</td>
          <td width="584" height="25"><textarea name="content" cols="30" rows="5" /><%=(content!=null)?content:""%></textarea>最多70个汉字</td>
        </tr>
        <tr bgcolor="#FFFFFF">
          <td height="25">&nbsp;</td>
          <td height="25"><label>
            <input type="submit" name="submit" value="确定" />
          </label></td>
        </tr>
      </table>
        </form>
    </td>
  </tr>
</table>
</body>
</html>
