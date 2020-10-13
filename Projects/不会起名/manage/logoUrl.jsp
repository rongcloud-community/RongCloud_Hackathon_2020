<%
	/**
	 *本文件被客户端管理员调用来设置广告
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
	String theFirstDomainId=userManager.getUserDomainId(vid);
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	if(payLevel<=0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用本功能，如果需要，请申请增强版以上版本。</font>");
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
String domain=request.getParameter("domain");
String floatLogo=request.getParameter("floatLogo"); // 
String floatFoot=request.getParameter("floatFoot"); // 
String voipLogo=request.getParameter("voipLogo"); // 
String guokeLogo=request.getParameter("guokeLogo"); // 
String talkLogo=request.getParameter("talkLogo"); //
String clntLogo=request.getParameter("clntLogo"); //
String clntLogo1 =request.getParameter("clntLogo1"); 	//  
String floatLink =request.getParameter("floatLink");
String floatLink1 =request.getParameter("floatLink1");
String clntWaterImg =request.getParameter("clntWaterImg");
String talkBbsTxt =null;
try{talkBbsTxt = new String( (request.getParameter("talkBbsTxt")).getBytes("iso-8859-1"),"utf-8" );}catch(Exception e){}
String talkBbsLink =request.getParameter("talkBbsLink");
String domainId=null;
String submit =request.getParameter("submit");
if(domain==null || domain.equals("")){
	StringTokenizer st = new StringTokenizer(userManager.getUserDomain(scomClient),",");	
	if(st.hasMoreTokens())
		domain=st.nextToken();
}

try{
	sql="select logourl.domainId as domainId from site,logourl where site.domainId=logourl.domainId and domain=\""+domain+"\"";
	//out.println(sql);
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	db.setSqlQuery(sql);
	rs=db.getResult();
	if(rs!=null && rs.next())
		domainId=rs.getString("domainId"); 	
	if(domainId!=null){
		if(submit!=null){
				if(floatLogo==null) floatLogo="";
				if(floatFoot==null) floatFoot="";
				if(voipLogo==null) voipLogo="";
				if(guokeLogo==null) guokeLogo="";
				if(talkLogo==null) talkLogo="";
				if(clntLogo==null) clntLogo="";
				if(clntLogo1==null) clntLogo1="";
				if(floatLink==null) floatLink="";
				if(floatLink1==null) floatLink1="";
				if(clntWaterImg==null) clntWaterImg="";
				if(talkBbsTxt==null) talkBbsTxt="";
				if(talkBbsLink==null) talkBbsLink="";
				sql="update logourl set floatLogo=\'"+floatLogo+"\',floatFoot=\'"+floatFoot+
					"\',guokeLogo=\'"+guokeLogo+"\',talkLogo=\'"+talkLogo+
					"\',clntLogo=\'"+clntLogo+"\',clntLogo1=\'"+clntLogo1+
					"\',floatLink=\'"+floatLink+"\',floatLink1=\'"+floatLink1+
					"\',talkBbsTxt=\'"+talkBbsTxt+"\',talkBbsLink=\'"+talkBbsLink+
					"\',clntWaterImg=\'"+clntWaterImg+
					"\',voipLogo=\'"+voipLogo+"\' where domainId=\""+domainId+"\""; 
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection(); 	
				db.setSqlQuery(sql);
				if( db.executeUpdate()==1)
					out.println("你的设置已经生效。");
		}
	}
	else
		out.print("域名"+domain+"没有申请定制服务");
}catch(Exception ee){
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
}	
 		

try{
	sql="select * from logourl where domainId=\""+domainId+"\""; 
	if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 	
	db.setSqlQuery(sql);
	rs=db.getResult();
	if(rs!=null && rs.next()){
		floatLogo=rs.getString("floatLogo");	
		floatFoot=rs.getString("floatFoot");	
		guokeLogo=rs.getString("guokeLogo");	
		talkLogo=rs.getString("talkLogo");	
		clntLogo=rs.getString("clntLogo");	
		clntLogo1=rs.getString("clntLogo1");	
		floatLink=rs.getString("floatLink");	
		floatLink1=rs.getString("floatLink1");	
		clntWaterImg=rs.getString("clntWaterImg");	
		talkBbsTxt=rs.getString("talkBbsTxt");	
		
		talkBbsLink=rs.getString("talkBbsLink");	
		 
	}
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();	
}catch(Exception ee){
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
}

 %>
<body>
<table width="805" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="805" bgcolor="#E4F2FF">LOGO标志定制：</td>
  </tr>
</table>
<br />
<table width="801" border="0" cellpadding="0" cellspacing="0" class="content9">
  
  <tr>    
    <td width="801" height="25"><table width="804" border="1" bordercolor="#A5AdC4" cellpadding="0" cellspacing="0">
      <tr>
        <td width="800"><table width="799" border="0" cellpadding="0" cellspacing="1" >
            <form id="form1" name="form1" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
              <tr >
                <td width="797" height="25">请选择域名：
                  <label>
                    <select name="domain"  onchange="this.form.submit()">
                      <%
			//UserManager userManager=new UserManager(); 
			StringTokenizer st = new StringTokenizer(userManager.getUserDomain(scomClient),",");	
			int counter=0;
			String t="";
			while(st.hasMoreTokens()){
 				t=st.nextToken();%>
                      <option value="<%=t%>" <%=(domain.equals(t))?"selected":""%>><%=t%></option>
                      <%}%>
                    </select>
                    </label>                </td>
              </tr>
            </form>
          <form id="form2" name="form2" method="post" action="">
              <tr >
                <td >原图（透明无边框）：<img src="../img/float/blue/images7/move.gif" width="76" height="13" border="1" /> </td>
              </tr>
              <tr >
                <td >浮动框上端logo：http://
                  <label>
                    <input type="text" name="floatLogo" value='<%=(floatLogo!=null)?floatLogo:""%>' size='80'/>
                  size: 73X16</label></td>
              </tr>
              <tr>
                <td>原图（透明无边框）：<img src="../img/float/blue/images7/slt.gif" width="103" height="13" border="1" /></td>
              </tr>
              <tr>
                <td>浮动框下端脚注：http://
                  <label>
                    <input type="text" name="floatFoot" value='<%=(floatFoot!=null)?floatFoot:""%>' size='80'/>
                  size: 103X13 </label></td>
              </tr>
			  
			  <tr>
                <td>浮动框logo链接：http://
                  <label>
                    <input type="text" name="floatLink" value='<%=(floatLink!=null)?floatLink:""%>' size='80'/> 
                     </label></td>
              </tr>
			  
			  <tr>
                <td>浮动框脚注链接：http://
                  <label>
                    <input type="text" name="floatLink1" value='<%=(floatLink1!=null)?floatLink1:""%>' size='80'/>
                  </label></td>
              </tr>
			  <tr>
			    <td>原图：<img src="../call_files/call_15.jpg" width="75" height="31" /></td>
			    </tr>
			  <tr>
                <td>voip窗右下logo：http://
                  <label>
                    <input type="text" name="voipLogo" value='<%=(voipLogo!=null)?voipLogo:""%>' size='80'/>
                    </label>
                  size: 75X31 </td>
              </tr>
			  <tr>
			    <td>原图：<img src="../img/manage/gktop.gif" width="334" height="24" /></td>
			    </tr>
			  <tr>
                <td>过客窗左上logo：http:// 
                  <label>
                    <input type="text" name="guokeLogo" value='<%=(guokeLogo!=null)?guokeLogo:""%>' size='80'/>
                  size: 234X24 </label></td>
              </tr>
	 		  
              <tr>
                <td>原图：<img src="../img/talk/logo.gif" width="80" height="30" /></td>
              </tr>
              <tr>
                <td>对话窗左上logo：http://
                  <label>
                    <input type="text" name="talkLogo" value='<%=(talkLogo!=null)?talkLogo:""%>' size='80'/>
                    </label>
                    size: 80X30 </td>
              </tr>
			  <tr>
                <td>对话窗右上BBS链接文字(原文字：进入论坛)：
                  <label>
                    <input type="text" name="talkBbsTxt" value='<%=(talkBbsTxt!=null)?talkBbsTxt:""%>' size='59'/>
                  </label></td>
              </tr>	 
			 <tr>
                <td>对话窗右上BBS链接：http://
                  <label>
                    <input type="text" name="talkBbsLink" value='<%=(talkBbsLink!=null)?talkBbsLink:""%>' size='76'/>
                  </label></td>
              </tr>	 
              <tr>
                <td>原图：<img src="../img/manage/t_2.gif" width="141" height="78" /></td>
              </tr>
              <tr>
                <td>监控窗左上logo：http://
                  <label>
                    <input type="text" name="clntLogo" value='<%=(clntLogo!=null)?clntLogo:""%>' size='80'/>
                    </label>
                    size: 141X78 </td>
              </tr>
			  <tr>
			    <td>原图：<img src="../img/manage/blogo.gif" width="162" height="60" /></td>
			    </tr>
			  <tr>
                <td>监控窗水印图像：http://
                  <label>
                    <input type="text" name="clntWaterImg" value='<%=(clntWaterImg!=null)?clntWaterImg:""%>' size='80'/>
                    </label>
                    size: 162X60 </td>
              </tr>
			  <tr>
			    <td>原图：<img src="../images/logo2.gif" width="152" height="70" /></td>
			    </tr>
			  <tr>
                <td>后台窗左上logo：http://
                  <label>
                    <input type="text" name="clntLogo1" value='<%=(clntLogo1!=null)?clntLogo1:""%>' size='80'/>
                    </label>
                    size: 141X78 </td>
              </tr>	 			
			 <tr>
			   <td align="middle">&nbsp;</td>
			   </tr>
			 <tr>
                <td align="middle">修改前 请先确认是否已申请该项服务</td>
              </tr>
			  <tr  height="5">
                <td></td>
              </tr>
 
              <tr >
                <td height="25" ><label>
					<input type="hidden" name="domain" value='<%=(domain!=null)?domain:""%>'/>
                  <input type="submit" name="submit" value="提交修改" />
                </label></td>
              </tr>
            </form>
        </table></td>
      </tr>
    </table></td></tr></table>
<br>
<br>
</body>
</html>
