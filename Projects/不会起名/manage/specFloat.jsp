<%
	/**
	 *本文件被客户端管理员调用用来选择何种页面显示方式
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,cache.*"%>
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
	margin-left: 0px;
	margin-top: 0px;
}
-->
</style>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.STYLE1 {color: #FF0000}
-->
</style>
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
 String id = "";
String domainId = "";
 
 id = vid; //取出登录用户的用户名，也就是id
 domainId=userManager.getUserDomainId(id);
 String sql = "";
 ResultSet rs = null;
 String[] ids=null;
 sql = "select id from user where domainId='"+domainId+"' order by type";
 db.setSqlQuery(sql);
 if(db.getConnection()==null || db.isClosed())			 
	 db.setConnection(); 
rs=db.getResult();
 if(rs!=null && rs.last()){
 	ids=new String[rs.getRow()];
	rs.beforeFirst();
 }	 
 for(int i=0;i<ids.length && rs!=null && rs.next(); i++)
 {
		ids[i]=rs.getString("id");
 }
 if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>
<body>
<table width="834" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="830" bgcolor="#E4F2FF">高级定制</td>
  </tr>
</table>
<br />
<table width="802" height="10" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="802" height="30"><table width="830" border="0">
      <tr bordercolor="#A5AdC4">
        <td width="326" bgcolor="#E4F2FF" >页面固定位置的多个客服点击免费通话设置：</td>
        <td width="494" bgcolor="#E4F2FF" >如：<br />
		<SCRIPT language=javascript src="http://webim.100im.cn/webCall.jsp"></SCRIPT> 

          销售 01051668337 <img src="../img/talk/freeTalk.gif" width="67" height="20" style="cursor:hand" alt="点击通话" onclick='webTalkto("admin@100im_cn");'/> 北京 01051668337 <img src="../img/talk/freeTalk.gif" width="67" height="20" style="cursor:hand" alt="点击通话" onclick='webTalkto("admin@100im_cn");'/><br />
          业务 02151668337 <img src="../img/talk/freeTalk.gif" width="67" height="20" style="cursor:hand" alt="点击通话" onclick='webTalkto("admin@100im_cn");' /> 上海 02151668337 <img src="../img/talk/freeTalk.gif" width="67" height="20" style="cursor:hand" alt="点击通话" onclick='webTalkto("admin@100im_cn");' /><br />
          客服 02851668337 <img src="../img/talk/freeTalk.gif" width="67" height="20" style="cursor:hand" alt="点击通话" onclick='webTalkto("admin@100im_cn");' /> 成都 02851668337 <img src="../img/talk/freeTalk.gif" width="67" height="20" style="cursor:hand" alt="点击通话" onclick='webTalkto("admin@100im_cn");' /></td>
      </tr>
      <tr bordercolor="#A5AdC4" style="font-size:12px; ">
        <td colspan='2'>步骤：<br />
          1、在你的页面的“免费电话”图片前面添加如下代码(只添加一次):<br />
           &lt;SCRIPT language=javascript src=&quot;http://webim.100im.cn/webCall.jsp&quot;&gt;&lt;/SCRIPT&gt; <br />
           <br />
           2、在图片的&lt;img &gt;中添加： style=&quot;cursor:hand&quot; alt=&quot;点击通话&quot; onclick=&quot;webTalkto('ID');&quot;, 添加后的内容如下：<br />
		 <%for(int i=0;ids!=null && i<ids.length;i++){%>
           &lt;img src=&quot;../img/talk/freeTalk.gif&quot; width=&quot;20&quot; height=&quot;24&quot; style=&quot;cursor:hand&quot; alt=&quot;点击通话&quot; onclick='webTalkto(&quot;<%=ids[i]%>&quot;);'&gt;<br />
		 <%}%>
           
           <br />
           注：其中admin@dns118_com为用户ID，即用户的登陆用户名<br />
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="STYLE1">&nbsp;该定制不能监控访问者是否上线</span></td>
        
      </tr>
      
    </table></td>
  </tr>
</table>
<br />
<table width="802" height="10" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="802" height="30"><table width="831" border="0">
      <tr bordercolor="#A5AdC4">
        <td width="329" bgcolor="#E4F2FF" >页面固定位置的多个客服点击对话设置：</td>
        <td width="492" bgcolor="#E4F2FF" >如：<br />
		<SCRIPT language=javascript src="http://webim.100im.cn/webMsg.jsp"></SCRIPT>
          销售（XXX）<img src="../img/talk/freeMsg.gif" width="67" height="20" style="cursor:hand" alt="点击咨询" onclick='webTalkto("admin@dns118_com");'/><br />
          业务（XXX）<img src="../img/talk/freeMsg.gif" width="67" height="20" style="cursor:hand" alt="点击咨询" onclick='webTalkto("admin@dns118_com");'/><br />
          客服（XXX）<img src="../img/talk/freeMsg.gif" width="67" height="20" style="cursor:hand" alt="点击咨询" onclick='webTalkto("admin@dns118_com");'/></td>
      </tr>
     <tr bordercolor="#A5AdC4" style="font-size:12px; ">
        <td colspan='2'>步骤：<br />
          1、在你的页面的“点击咨询”图片前面添加如下代码(只添加一次):<br />
           &lt;SCRIPT language=javascript src=&quot;http://webim.100im.cn/webMsg.jsp&quot;&gt;&lt;/SCRIPT&gt; <br />
           <br />
           2、在图片的&lt;img &gt;中添加： style=&quot;cursor:hand&quot; alt=&quot;点击咨询&quot; onclick=&quot;webTalkto('ID');&quot;, 添加后的内容如下：<br /> 
		<%for(int i=0;ids!=null && i<ids.length;i++){%>
           &lt;img src=&quot;../img/talk/freeMsg.gif&quot; width=&quot;20&quot; height=&quot;24&quot; style=&quot;cursor:hand&quot; alt=&quot;点击咨询&quot; onclick='webTalkto(&quot;<%=ids[i]%>&quot;);'&gt;<br />
            <%}%>
           <br />
          注：其中admin@dns118_com为用户ID，即用户的登陆用户名,你需要修改图片的位置和名称<br /> 
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="STYLE1">&nbsp;该定制不能监控访问者是否上线</span> </td>
        
      </tr>
    </table></td>
  </tr>
</table>
<br />
<table width="802" height="10" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="802" height="30"><table width="831" border="0">
      <tr bordercolor="#A5AdC4">
        <td width="568" bgcolor="#E4F2FF" >如何获取客服人员的当前状态(可以用来显示在线或离线的不同图像)：</td>
        <td width="253" bgcolor="#E4F2FF" >&nbsp; </td>
      </tr>
      <tr bordercolor="#A5AdC4" style="font-size:12px; ">
        <td colspan='2'>步骤：<br />
1、在你的页面需要访问用户状态的前面添加如下代码(只添加一次):<br />
&lt;SCRIPT&gt;var online= new Array(); &lt;/SCRIPT&gt; <br />
&lt;SCRIPT src=&quot;http://webim.100im.cn/getonline.jsp?ids=admin@dns118_com,yan@3yan_com&quot;&gt;&lt;/SCRIPT&gt;<br />
<br />
2、在图片的&lt;img &gt;中添加： style=&quot;cursor:hand&quot; alt=&quot;点击通话&quot; onclick=&quot;webTalkto('ID');&quot;, 添加后的内容如下：<br />
<br />
3、online数组中保存有按照你给定用户的当前状态，等同如：online={true,false}; 值为true时表明在线，false为离线<br />
<br />
注：其中admin@dns118_com为用户ID，即用户的登陆用户名,多个用户用逗号隔开</td>
      </tr>
    </table></td>
  </tr>
</table>
<br />

<table width="833" height="10" border="0" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="833" height="30">&nbsp;</td>
  </tr>
</table>
<br />
 

<br>
<br>
</body>
</html>
