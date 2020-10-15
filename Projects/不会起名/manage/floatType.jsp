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

String scomClient = "";
 
//***********************************
//获取变量值
//***********************************
//取出登录用户的用户名
scomClient = vid;
String floatType=request.getParameter("floatType");
String domain =request.getParameter("domain");
String guoke =request.getParameter("guoke");
String floatTopY=request.getParameter("floatTopY");
String submit =request.getParameter("submit");
try{if( Integer.parseInt(floatTopY)<5 || Integer.parseInt(floatTopY)>800 ) floatTopY="50";}catch(Exception e){floatTopY="50";}
 
String linkTextContent =null;
try{linkTextContent=new String( (request.getParameter("linkTextContent")).getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
 
String temp="";
String temp1="";
for(int i=0;linkTextContent!=null && i<linkTextContent.length();i++){	
	temp1=linkTextContent.substring(i,i+1);
	if(temp1.equals("'") || temp1.equals("\"")) 
		temp +="\\\\'";		 
	else
		temp +=temp1;
}	 
String linkImgUrl=request.getParameter("linkImgUrl");
if(temp!=null && temp.length()>0)
	linkTextContent=temp;
if(floatType!=null && floatType.equals("linkText") && guoke!=null)
	sql="update site set floattype=\""+floatType+"\",link=\""+linkTextContent+"\",guoke=\""+
		guoke+"\",floatTopY=\""+floatTopY+"\" where domain=\""+domain+"\""; 
else if(floatType!=null && floatType.equals("linkText") && guoke==null)
	sql="update site set floattype=\""+floatType+"\",link=\""+linkTextContent+"\",floatTopY=\""+floatTopY+
		"\" where domain=\""+domain+"\""; 
else if(floatType!=null && floatType.equals("linkImg") && guoke!=null)
	sql="update site set floattype=\""+floatType+"\",link=\""+linkImgUrl+"\",guoke=\""+guoke+"\",floatTopY=\""+floatTopY+
		"\" where domain=\""+domain+"\""; 
else if(floatType!=null && floatType.equals("linkImg") && guoke==null)
	sql="update site set floattype=\""+floatType+"\",link=\""+linkImgUrl+"\",floatTopY=\""+floatTopY+
		"\" where domain=\""+domain+"\""; 
else if(floatType!=null && guoke!=null)
	sql="update site set floattype=\""+floatType+"\",guoke=\""+guoke+"\",floatTopY=\""+floatTopY+
		"\" where domain=\""+domain+"\""; 
else if(floatType!=null)
	sql="update site set floattype=\'"+floatType+"\',floatTopY=\'"+floatTopY+"\' where domain=\""+domain+"\""; 
else if(guoke!=null)
	sql="update site set guoke=\'"+guoke+"\',floatTopY=\'"+floatTopY+"\' where domain=\""+domain+"\""; 
else if(floatTopY!=null)
	sql="update site set floatTopY=\'"+floatTopY+"\' where domain=\""+domain+"\""; 
if(submit!=null){
  try
  {
	if(sql!=null && sql.length()>0){
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection(); 	
		db.setSqlQuery(sql);
		db.executeUpdate();
		if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
		try
		{
			cache.Sites.removeSite(domain);//如果有多个tomcat服务器，都要把缓存清除
		 //HttpURLConnection hc=(HttpURLConnection)(new URL(url)).openConnection(); 
		 // int re=hc.getResponseCode(); 
		 //hc.disconnect(); //release the http connection			 
		}
    catch(Exception e){}     
		out.println("浮动窗肤色已经改变，您可以打开网页查看结果。");
	}
	 //out.println(sql);
   }catch(Exception ee){
 	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
 	out.println(ee.getMessage());
  }
   
	
}	
%>
<body>
<table width="834" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="830" bgcolor="#E4F2FF">浮动窗肤色选择</td>
  </tr>
</table>
<br />
<form id="form1" name="form1" method="post" action="floatType.jsp?vid=<%=vid%>&sid=<%=sid%>">	
<table width="835" height="10" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr style="font-size:12px; ">
    <td width="831" bgcolor="#E4F2FF">请选择域名：
      <label>
      <select name="domain" >
        <%
			//UserManager userManager=new UserManager(); 
			StringTokenizer st = new StringTokenizer(userManager.getUserDomain(scomClient),",");	
			int counter=0;
			String t="";
			while(st.hasMoreTokens()){
				counter++;
				t=st.nextToken();%>
        <option value="<%=t%>" <%=(counter==1)?"selected":""%>><%=t%></option>
        <%}%>
      </select> 
      浮动图离浏览器顶部高度：
      <input type="text" name="floatTopY" size=4  value="120"/>      
      </label></td>
  </tr>
</table>
<table width="836" height="243" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="832" height="241"><table width="832" class='data'>
      <tr>
        <td width="135" height="25"><img src="../img/float/sample_blue.gif" width="121" height="205" /></td>
        <td width="136"><img src="../img/float/sample_green.gif" width="122" height="204" /></td>
        <td width="137"><img src="../img/float/sample_red.gif" width="123" height="205" /></td>
        <td width="136" height="25"><img src="../img/float/sample_silver.gif" width="122" height="205" /></td>
        <td width="139"><img src="../img/float/floatAdminLeft/online.gif" width="100" height="114" /></td>
        <td width="121" height="25"><img src="../img/float/floatAdminLeft/online.gif" width="100" height="114" /></td>
      </tr>
      <tr style="font-size:12px; ">
			<td height="15"><label>
			<input type="radio" name="floatType" value="blue" />
          浮动左<input type="radio" name="floatType" value="blueRight" />
          浮动右</label></td>
        <td height="15"><label>
          <input type="radio" name="floatType" value="green" />
          浮动左<input type="radio" name="floatType" value="greenRight" />
          浮动右</label></td>
        <td height="15"><label>
          <input type="radio" name="floatType" value="red" />
          浮动左<input type="radio" name="floatType" value="redRight" />
          浮动右</label>        </td>
        <td height="15"><label>
          <input type="radio" name="floatType" value="silver" />
          浮动左<input type="radio" name="floatType" value="silverRight" />
          浮动右</label>        </td>
        <td><input type="radio" name="floatType" value="floatAdminLeft"   style=" border:none"/>
		  浮动左<input type="radio" name="floatType" value="floatAdminRight" />
          浮动右 
          </td>
        <td height="15"><label>
          <input type="radio" name="floatType" value="floatAdminLtUp" />
		  左上
		  <input type="radio" name="floatType" value="floatAdminRtUp" />
          右上</label></td>
      </tr>
    </table></td>
  </tr>
</table>
<br />
<table width="830" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="830"><table class='data'>
      <tr >
        <td width="188" height="25"><img src="../img/float/qianru/onlinekf.jpg" width="150" height="80" /></td>
        <td width="181" height="25"><img src="../img/float/qianruTalk/onlineTalk.jpg" width="150" height="73" /></td>
        <td width="165" align="right"><img src="../img/float/qianruMT/onlinekf1.jpg" width="69" height="79" /><img src="../img/float/qianruMT/onlinetk1.jpg" width="86" height="79" /></td>
        <td width="270" align="left"><img src="../img/float/floatTalk/online.gif" width="107" height="188" /></td>
        </tr>
      <tr style="font-size:12px; " >
        <td height="15"><label>
          <input type="radio" name="floatType" value="qianru" />
          嵌入(聊天模式)</label>        </td>
        <td height="15"><label>
          <input type="radio" name="floatType" value="qianruTalk" />
          嵌入(电话模式)</label></td>
        <td height="15" ><label>
          <input type="radio" name="floatType" value="qianruMT" />
          聊天电话模式</label></td>
        <td height="15"><label><input type="radio" name="floatType" value="floatTalkLeft"   style=" border:none"/>
		  浮动左<input type="radio" name="floatType" value="floatTalkRight" />
          浮动右 
          </label></td>
        </tr>
    </table>
    </td>
  </tr>
</table>
<br />
<table width="833" height="10" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="826" height="30"><table width="802" border="0">
      <tr style="font-size:12px; " >
        <td width="131" height="24"><input type="radio" name="floatType" value="linkText" />
          链接模式(文字) </td>
        <td width="436"><label> 内容:
          <input name="linkTextContent" type="text"  onkeyup="showLinkText()" value="在线咨询" size='30'/>
          (可嵌html &lt;255字节)</label></td>
        <td width="74">显示结果:</td>
        <td width="107"><div id='linkTextShow'></div></td>
      </tr>
    </table>
      <table width="766" border="0">
      <tr style="font-size:12px; ">
        <td width="131"><input type="radio" name="floatType" value="linkImg" />
          链接模式(图片) </td>
        <td width="400">URL：
          <label>
            <input name="linkImgUrl" type="text" value="http://" size='40'/>
          </label></td>
        <td width="221">&nbsp;</td>
      </tr>
    </table></td>
	<script language='javascript'>	
	document.getElementById("linkTextShow").innerHTML=document.getElementById("linkTextContent").value;		 
	function showLinkText(){
		document.getElementById("linkTextShow").innerHTML=document.getElementById("linkTextContent").value;					 
	}	
	
</script>	
  </tr>
</table>
<br />
<table width="802" height="10" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="802" height="30"><table width="829" border="0">
      <tr bordercolor="#A5AdC4">
        <td width="823" bgcolor="#E4F2FF" > 过客窗设定： </td>
      </tr>
      <tr bordercolor="#A5AdC4" style="font-size:12px; ">
        <td><input type="radio" name="guoke" value="1" />
          不显示过客窗
          <input type="radio" name="guoke" value="2" />
          直接显示过客窗
          <input type="radio" name="guoke" value="3" />
          隐藏显示过客窗 </td>
      </tr>
      
    </table></td>
  </tr>
</table>
<br />
<table width="833" height="10" border="0" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="833" height="30"><input type="submit" name="submit" value="提交上面选择" /></td>
  </tr>
</table>
<br />
</form>

<br>
<br>
</body>
</html>
