<%
//查看用户的session值是否过期或未登录
String chkScomClient = "";
String chkScomPwd = "";
try
{
	chkScomClient = (String)session.getValue("scomClient");
	chkScomPwd = (String)session.getValue("scomPwd");
	
	if(chkScomClient==null || chkScomClient.equals("") || chkScomPwd==null || chkScomPwd.equals(""))
	{
		out.print("<script language=javascript>alert('您还未登录或登录超时');parent.window.location='../index.htm';</script>");
	}
}catch(Exception ee){}
%>