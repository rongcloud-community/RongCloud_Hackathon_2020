<%
	/**
	 *本文件被客户端调用用来发送手机短信
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
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
ResultSet rs1 = null;

String scomClient = "";
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = vid;
String submit=request.getParameter("submit");
String mobiles=request.getParameter("mobiles");
String content=null;
String saveKJYY=request.getParameter("saveKJYY");
String removeKJYY=request.getParameter("removeKJYY");
try{content=new String( (request.getParameter("content")).getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
String domainIds=userManager.getUserDomainId(scomClient);
int index=domainIds.indexOf(",");
String domainId = null;
if(index>0)
	domainId=domainIds.substring(0,index);
else
	domainId=domainIds;
if(db.getConnection()==null || db.isClosed())			 
	 db.setConnection(); 	
if(submit!=null && mobiles!=null && content!=null && !mobiles.equals("") && !content.equals("")){
    try{
		
		//判断网站有足够的手机短信信用点
		StringTokenizer st = new StringTokenizer(mobiles," ,\r\n"); 
		int tokens=st.countTokens();	
		if(!userManager.hasMoreSmsCredit(domainId,tokens))
			out.println("<font size=2>你的网站没有足够的手机短信信用点，不能发送手机短信。 </font>");
		else{
			//StringTokenizer st = new StringTokenizer(mobiles,",\r\n"); 
			//int tokens=st.countTokens();
			//String mNumbers="";
			//while(st.hasMoreTokens())
			//	mNumbers +=","+st.nextToken();
			//mNumbers =mNumbers.substring(1);
			int sentTotal=userManager.sendSms(scomClient,domainId,mobiles,content);	
			//int sentTotal=userManager.sendSms(scomClient,mNumbers,content);	
			//out.println(mNumbers);		
			//userManager.dealSmsCredit(domainId,tokens);	 
			out.println("<font size=2>你的信息已经发出。</font>");
	 	}	 
    }catch(Exception ee){out.println("Error:发送失败，<font color=\'red\'>请在用户信息里检查是否设置了正确的手机号码。</font>");}   
}
else if(saveKJYY!=null&& content!=null && !content.equals("")){
	try{
		sql="insert into smsshortcut values(\'\',\'"+domainId+"\',\'\',\'"+content+"\')";
		db.setSqlQuery(sql);
		db.executeUpdate();	
	}catch(Exception e){out.println(e.getMessage());}
}
else if(removeKJYY!=null){
	try{
		String id=request.getParameter("id");
		sql="delete from smsshortcut where id=\""+id+"\"";
		db.setSqlQuery(sql);
		db.executeUpdate();	
	}catch(Exception e){}
}
try{
	sql="select id,content from smsshortcut where domainId=\'"+domainId+"\' order by id DESC";
	db.setSqlQuery(sql);
	rs=db.getResult();	
	sql="select id,content from commsmsshortcut order by id DESC";
	db.setSqlQuery(sql);
	rs1=db.getResult();	
}catch(Exception e){}
%>
<body>
<form id="form1" name="form1" method="post" action="sendSms.jsp?vid=<%=vid%>&sid=<%=sid%>">
<table width="844" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="840" bgcolor="#E4F2FF">手机短信：短信群发</td>
  </tr>
</table>
<br />
<table width="842" border="1" cellpadding="0" cellspacing="0" class="content9" bordercolor="#A5AdC4">
  <tr  >
    
    <td width="465" height="25">输入手机号码和短信内容，点击确定即可发送短信。 回复的短信将显示在监控对话窗口</td>
    <td width="371">快捷用语：</td>
  </tr>
  <tr>
     
    <td height="412" valign="top">
      <table width="465" border="0" cellpadding="0" cellspacing="1" >
        <tr >
          <td height="25" colspan="2" bgcolor="#E4F2FF">&nbsp; 短信资费：0.1元/条 注：发送短信需要先设置客服的手机号码，否则无法发送</td>
          </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td height="25" align="center" valign="middle">&nbsp;</td>
          <td height="25">输入手机号码：每行一个手机号或用逗号,隔开（暂不支持小灵通）</td>
        </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="8" height="25" align="center" valign="middle">&nbsp;</td>
          <td width="454" height="25"><textarea name="mobiles" cols="60" rows="10"><%=(mobiles!=null)?mobiles:""%></textarea></td>
        </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td height="25" align="center" valign="middle"></td>
          <td height="25" width='400'><table><tr><td>输入短信内容：字符数&lt;=66个 已有字符数：</td><td><div id='zifushu' style="width:200">0</div></td></tr></table></td>
        </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="8" height="25" align="center" valign="middle">&nbsp;</td>
          <td width="454" height="25"><textarea id='content' name="content" cols="60" rows="5"  onkeyup="showZifushu()"/><%=(content!=null&&!content.equals(""))?content:""%></textarea></td>
        </tr>
        <tr bgcolor="#FFFFFF">
          <td height="25"    >&nbsp;</td>
          <td height="25"><label>
            <input type="submit" name="submit" value="点击发送短信" />
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" name="saveKJYY" value="保存为快捷用语" />
          </label></td>
        </tr>
      </table>
      <br />
      <br />
      <br />
      注：本功能仅用于商业办公或朋友祝福交流，严禁发送黄色或其它垃圾短信，否则，后果自负。<br /> </td>
    <td valign="top"><div style="OVERFLOW:auto;LEFT:0px;WIDTH:100%;HEIGHT:420px;padding-top:3px;padding-left:3px;background-color:#FFFFFF;">
	<SCRIPT LANGUAGE="JavaScript">
		function changeContent(id){
			document.getElementById("content").value=document.getElementById(id).innerText;	
			showZifushu();	
		}
		function changeBGColor(id){
			document.getElementById(id).style.background='#6699FF';
		}
		function changeBGColor1(id){
			document.getElementById(id).style.background='#FFFFFF';
		}
		function showZifushu(){
			var l=(document.getElementById("content").value).length;
			if(l>66)
				document.getElementById("zifushu").innerText=l+" 超字符数，请减少到66。";
			else
				document.getElementById("zifushu").innerText=l;		
		}
	</SCRIPT>
	
	<table width="94%" border="0">
 	  <%
	  	int counter=0;
		out.println("<tr><td width=\'8\'></td><td bgcolor=\"#E4F2FF\">自定义短信用语</td></td><td width=\'8\'></td></tr>");
		while(rs!=null && rs.next()){
			counter++;
			out.println("<tr><td width=\'8\'>"+counter+"</td>");
			out.println("<td width=\'90%\' id=\'"+rs.getString("id")+
				"\' style=\"cursor:hand\" onmouseout=\"changeBGColor1("+
				rs.getString("id")+")\" onmousemove=\"changeBGColor("+
				rs.getString("id")+")\" onclick=\'changeContent("+
				rs.getString("id")+")\'>"+rs.getString("content")+
				"</td><td width=\'8\'><a href=\'sendSms.jsp?removeKJYY=true&id="+rs.getString("id")+
				"\'><img border=0 width=20 height=20 src=\'pic/block.gif\' alt=\'真的需要删除吗？\'></a></td></tr>");
		}
		if(counter==0)
			out.println("<tr><td width=\'8\'></td><td>你还没有自定义短信用语，赶紧添加吧。</td></td><td width=\'8\'></td></tr>");
		counter=0;
		out.println("<tr><td width=\'8\'></td><td bgcolor=\"#E4F2FF\">推荐短信用语</td></td><td width=\'8\'></td></tr>");
		while(rs1!=null && rs1.next()){
			counter++;
			out.println("<tr><td width=\'8\'>"+counter+"</td>");
			out.println("<td width=\'90%\' id=\'"+rs1.getString("id")+
				"\' style=\"cursor:hand\" onmouseout=\"changeBGColor1("+
				rs1.getString("id")+")\" onmousemove=\"changeBGColor("+
				rs1.getString("id")+")\" onclick=\'changeContent("+
				rs1.getString("id")+")\'>"+rs1.getString("content")+
				"</td><td width=\'8\'></td></tr>");
		}
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();	
	%>
    </table>
    </div></td>
  </tr>
</table>
</form> 
</body>
</html>
