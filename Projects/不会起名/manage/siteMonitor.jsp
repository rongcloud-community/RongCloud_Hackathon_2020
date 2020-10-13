<%
	/**
	 *本文件被客户端管理员调用用来选择何种页面显示方式
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>
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
<script language='javascript'>
		function copyToClipBoard(){
			var clipBoardContent=''; 
			clipBoardContent+=document.getElementById('code').innerText;
			//clipBoardContent+='\r\n'+document.URL;
			window.clipboardData.setData("Text",clipBoardContent);
 		}
		function copyToClipBoard1(){
			var clipBoardContent=''; 
			clipBoardContent+=document.getElementById('code1').innerText;
			//clipBoardContent+='\r\n'+document.URL;
			window.clipboardData.setData("Text",clipBoardContent);
 		}
	</script>
<link href="css/style.css" rel="stylesheet" type="text/css" />
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
	String theFirstDomainId=userManager.getUserDomainId(vid);
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	if(payLevel<=0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用本功能，如果需要，请申请专业版以上版本。</font>");
%> 
<%
//***********************************
//变量初始化
//***********************************
String sql = null;
ResultSet rs = null;

String scomClient = "";
 
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = vid;
String domain=request.getParameter("domain");
String port =request.getParameter("port");
String timeOut =request.getParameter("timeOut");
if(timeOut!=null)
	try{timeOut=String.valueOf((Integer.parseInt(timeOut)) * 1000);}catch(Exception e){}
String adminMobile =request.getParameter("adminMobile");
String maxNotifyTimes =request.getParameter("maxNotifyTimes");
String valid =request.getParameter("valid");
String siteId=theFirstDomainId;
 
String add =request.getParameter("add");
String modify =request.getParameter("modify");
String delete =request.getParameter("delete");
if(modify!=null || delete!=null || add!=null) {
	if(payLevel>=2){		 
		sql="update sitemonitor set port=\""+port+"\",timeOut=\""+timeOut+"\",adminMobile=\""+adminMobile+"\",maxNotifyTimes=\""+
				maxNotifyTimes+"\",valid=\""+valid+"\" where domain=\""+domain+"\"";
		if(delete!=null)  
			sql="delete from sitemonitor where domain=\""+domain+"\"";
		else if(add!=null)  
			sql="insert into sitemonitor values(\""+siteId+"\",\""+domain+"\",\""+port+"\",\""+timeOut+"\",\"0\",\""+maxNotifyTimes+
				"\",\"alive\",\""+scomClient+"\",\""+adminMobile+"\",\"true\",\"0000-00-00 00:00:00\",\"0000-00-00 00:00:00\")";  
		try
		{
			if(sql!=null && sql.length()>0){
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 
				db.setSqlQuery(sql);
				db.executeUpdate();
			}			 
		  }catch(Exception ee){
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();
			out.println(ee.getMessage());
		 }
	}
	else if(payLevel==0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用站点监控功能，如果要使用站点监控功能，请申请商务版以上版本。</font>");
	else if(payLevel==1) 
		out.print("<font color=\'red\'>您使用的是增强版，不能使用站点监控功能，如果要使用站点监控功能，请申请商务版以上版本。</font>");
} 
try
{	 
	sql="select * from sitemonitor where adminId=\""+scomClient+"\"";	 
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	db.setSqlQuery(sql);
	rs=db.getResult(); 
  }catch(Exception ee){
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
	out.println(ee.getMessage());
 }
 %>
<body>
<table width="851" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="851" bgcolor="#E4F2FF">站点/服务器宕机监控：宕站/宕机 短信通知</td>
  </tr>
</table>
<br />
修改已有站点或服务器监控属性： <br />
<table width="841" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4" class="data">
  <tr>
    <td width="837" ><table width="840" border="0" cellpadding="0" cellspacing="1" class="data">
      <tr class="content10hui">
        <td width="123" bgcolor="#E7F3FF">网址(IP)</td>
        <td width="25" bgcolor="#E7F3FF">端口</td>
        <td width="69" bgcolor="#E7F3FF">当前状态</td>
        <td width="90" bgcolor="#E7F3FF">监控超时(秒)</td>
        <td width="80" bgcolor="#E7F3FF">手机号码</td>
        <td width="55" bgcolor="#E7F3FF">通知次数</td>
        <td width="126" bgcolor="#E7F3FF">上次宕机时间</td>
        <td width="160" bgcolor="#E7F3FF">启用/暂停</td>
        <td width="120" height="19" bgcolor="#E7F3FF"><label></label></td>
      </tr>
      <%
	while(rs!=null && rs.next()){
%>
      <form id="form1" name="form1" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
        <tr>
          <td ><label>
            <input type="hidden" name="domain" size='12' value='<%=rs.getString("domain")%>'/>
            <%=rs.getString("domain")%> </label></td>
          <td ><label>
            <input type="text" name="port2"  size='2' value='<%=rs.getString("port")%>'/>
          </label></td>
          <td ><%=( (rs.getString("state")).equals("alive") )?"正常":"宕机"%></td>
          <td ><label>
            <input type="text" name="timeOut"  size='5' value='<%=rs.getInt("timeOut")/1000%>'/>
          </label></td>
          <td ><label>
            <input type="text" name="adminMobile"  size='10' value='<%=rs.getString("adminMobile")%>'/>
          </label></td>
          <td ><label>
            <input type="text" name="maxNotifyTimes" size='3'  value='<%=rs.getString("maxNotifyTimes")%>'/>
          </label></td>
          <td ><%=rs.getString("lastDeadTime")%></td>
          <td ><label> 启用
                <input name="valid" type="radio" value="true" <%=(rs.getString("valid")).equals("true")?"checked":""%>/>
            暂停
            <input type="radio" name="valid" value="false" <%=(rs.getString("valid")).equals("false")?"checked":""%>/>
          </label></td>
          <td ><label>
            <input type="submit" name="modify" value="修改" />
            </label>
              </a>
              <label>
              <input type="submit" name="delete" value="删除" />
            </label></td>
        </tr>
      </form>
      <%}
	if(db.getConnection()!=null && !db.isClosed()) 
		db.closeConnection();	
%>
    </table></td>
  </tr>
</table>
<br />
添加新的监控对象：<br />
<table width="849" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4" class="content9">
  
  <tr>    
    <td width="849" height="25"><form id="form1" name="form2" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
      <table width="849" border="0" cellpadding="0" cellspacing="1" class="data">
        
        <tr>
          <td width="849" >域名/服务器IP
            <input type="text" name="domain" size='18'/>
            <label> 如果你要监控站点请填写域名如www.dns118.com</label></td>
        </tr>
        <tr>
          <td>监控超时
            <input name="timeOut" type="text" value="30" size='18'/>
秒 监控端口
            <label>
            <input name="port" type="text" value="80" size='18'/>
            </label></td>
        </tr>
        <tr>
          <td>通知次数
            <input name="maxNotifyTimes" type="text" value="2" size='18'/>
            次 接受短信手机号
            <input name="adminMobile" type="text"  value="13" size='18'/></td>
        </tr>
        
        <tr>
          <td><label>
            <input type="submit" name="add" value="点击添加新的站点或服务器" />
          </label></td>
        </tr>
        <tr>
          <td height="19" >当网站启用监控后，系统会每5分钟根据您设定的监控超时判断您的网站是否在正常运行，如果宕站，系统会按您设定的通知次数通知您。</td>
        </tr>
      </table>
      </form>
	  
	  
</td></tr></table>
<br />
交易监控：<br />
<table width="849" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4" >
  <tr>
    <td width="849"><form id="form1" name="form3" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
    
      <table width="849" border="0" cellpadding="0" cellspacing="1" class="data">
        <tr>
          <td width="849" height="25"><label>监控代码:</label></td>
        </tr>
        <tr>
          <td ><div id='code' align="left">&lt;script&gt;document.write(&quot;&lt;scrip&quot;+&quot;t src=\&quot;http://client.100im.cn/smsNoticer.jsp?msg=收到转款()\&quot;&gt;&lt;/scrip&quot;+&quot;t&gt;&quot;); &lt;/script&gt; </div>
		  </td>
        </tr>
        <tr>
          <td ><label>
          <input type="submit" name="Submit" value="复制监控代码" onclick='copyToClipBoard()' />
          </label></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr >
          <td >将监控代码放置在贵网站需要监控的页面，如在线支付成功返回页面，</td>
        </tr>
        <tr >
          <td>客户一旦在线支付成功，系统便会自动以手机短信通知您。</td>
        </tr>
      </table>
</form></td>
  </tr>
</table>
<br>
<br>
</body>
</html>
