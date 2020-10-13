<%
	/**
	 *本文件被客户端管理员调用设置快捷恢复用语
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,com.jspsmart.upload.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.STYLE1 {color: #FF0000}
-->
</style>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<script language=javascript>
function userCheck(formName)
{
	if(formName.catalog.value=="")
	{
		alert("回复类型不能为空！");
		formName.catalog.focus();
		return false;
	}
	if(formName.content.value=="")
	{
		alert("内容不能为空！");
		formName.content.focus();
		return false;
	}
}
</script>
</head>
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
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;

String id = "";
String domainId = "";
String action = "";
String domainStr = "";
String[] domainIds = null;

//***********************************
//获取变量值
//***********************************
try
{
	domainId = userManager.getUserDomainId(vid);	
	id = request.getParameter("id");
	domainIds = domainId.split(",");
}catch(Exception ee){}
 

//取得所拥有的站点名称，以作说明
try
{
	sql="select * from site where domainId in("+domainId+")";
	db.setSqlQuery(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection();  
	rs=db.getResult();
	while( rs!=null && rs.next() )
	{
		domainStr = domainStr + rs.getString("domainId")+"："+rs.getString("domain")+"&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();		
}catch(Exception ee){}
%>
<body>
<table width="796" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="796" bgcolor="#E4F2FF">快捷回复管理</td>
  </tr>
</table>
<br />
<table width="780" border="0" cellpadding="0" cellspacing="0" class="content9">
  
  <tr>
    <td width="11" height="25">&nbsp;</td>
    <td width="769" height="25">
	
      <table width="786" border="1" bordercolor="#A5AdC4" cellpadding="0" cellspacing="0">
        <tr>
          <td width="776"><table width="776" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td height="25" colspan="4" align="left" valign="middle" ><%=domainStr%></td>
            </tr>
            <tr>
              <td width="81" height="25" align="center" valign="middle" bgcolor="#E7F3FF" >所属站点</td>
              <td width="91" height="25" align="center" valign="middle" bgcolor="#E7F3FF" >回复类型</td>
              <td width="501" height="25" align="center" valign="middle" bgcolor="#E7F3FF" >具体内容</td>
              <td width="103" height="25" align="center" valign="middle" bgcolor="#E7F3FF" >操作</td>
            </tr>
            <%
	  sql = "select * from shortcut where domainId in("+domainId+") order by domainId,catalog";
	  db.setSqlQuery(sql);
	  if(db.getConnection()==null || db.isClosed())			 
		db.setConnection();  
	  rs=db.getResult();
	  int j=0;
	  while(rs!=null && rs.next())
	  {
	   %>
            <form id="form1<%=j%>" name="form1" method="post" action="quickResumesSave.jsp?action=editResume&vid=<%=vid%>&sid=<%=sid%>">
              <tr>
                <td height="25" align="center" valign="middle"><%=rs.getString("domainId")%>
                    <input type="hidden" name="id" value="<%=rs.getString("Id")%>"/></td>
                <td height="25" align="center" valign="middle"><input name="catalog" type="text" value="<%=rs.getString("catalog")%>" size="10"/></td>
                <td height="25" align="center" valign="middle"><input name="content" type="text" value="<%=rs.getString("content")%>" size="65"/></td>
                <td height="25" align="center" valign="middle" class="content9"><input type="submit" name="submit" value="修改"/>
                  &nbsp;/&nbsp; <a href='javascript:if(confirm(&quot;确认删除?&quot;)) location=&quot;quickResumesSave.jsp?action=delResume&amp;id=<%=rs.getString("Id")%>&vid=<%=vid%>&sid=<%=sid%>&quot;'>删除</a> </td>
              </tr>
            </form>
            <%
	   j = j + 1;
	 }
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();			   
		%>
          </table></td>
        </tr>
      </table>
      <br /></td>
  </tr>
  <tr >
    <td height="25">&nbsp;</td>
    <td height="25">增加快捷回复</td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="25"><form id="form2" name="form2" method="post" action="quickResumesSave.jsp?action=addResume&vid=<%=vid%>&sid=<%=sid%>">
      <table width="776" border="1" bordercolor="#A5AdC4" cellpadding="0" cellspacing="0">
        <tr>
          <td><table width="784" border="0" cellspacing="0" cellpadding="0">
              <tr >
                <td width="81" height="25" align="center" valign="middle" bgcolor="#E7F3FF">所属站点</td>
                <td width="91" height="25" align="center" valign="middle" bgcolor="#E7F3FF">回复类型</td>
                <td width="502" height="25" align="center" valign="middle" bgcolor="#E7F3FF">内容</td>
                <td width="110" height="25" align="center" valign="middle" bgcolor="#E7F3FF">操作</td>
              </tr>
              <tr class="content9">
                <td height="25" align="center" valign="middle"><select name="ssdomainId" id="ssdomainId">
                    <%
			for(int i=0;domainIds!=null && i<domainIds.length;i++)
			{
			%>
                    <option value="<%=domainIds[i]%>"><%=domainIds[i]%></option>
                    <%
			}	
			%>
                  </select>
                </td>
                <td height="25" align="center" valign="middle"><input name="catalog" type="text" id="catalog" size="10"/></td>
                <td height="25" align="center" valign="middle"><input name="content" type="text" id="content" size="65"/></td>
                <td height="25" align="center" valign="middle"><input type="submit" name="Submit2" value="提交" onclick="return userCheck(form2)"/>
                    <input type="reset" name="Submit3" value="重置" /></td>
              </tr>
          </table></td>
        </tr>
      </table>
    </form>    </td>
  </tr>
  <tr>
    <td height="25">&nbsp;</td>
    <td height="25">回复类型可写如：邀请类、交谈类，相应内容可为：欢迎光临本网站，有什么可以帮到您？
	请稍等，马上回来。<br />
	替换规则：<span class="STYLE1">{关键词}</span>将被替换为该浏览者从搜索引擎输入的关键词  
	<span class="STYLE1">{地域}</span>将被替换为浏览者的IP地域。<br />
	<span class="STYLE1">广告推送类</span>：您可以添加一个特别的类即广告推送类，该类的内容为用来在对话窗口右下角显示的广告页面。<br />
	广告推送内容是不带http://的一个页面链接。添加多个广告页面，可以在对话时快速精准推送，页面内容可以<br />
	是静态，也可以是动态，推荐为产品动画或视频介绍。页面大小： 宽－90px 高－120px <br />
	添加完后，可以在客户端页面右边点击快捷回复左边的<span class="STYLE1">更新按钮</span>即时获取添加的快捷用语。<br /></td>
  <tr>
    <td height="25">&nbsp; </td>
    <td height="25">&nbsp;</td>
</table>
</body>
</html>
