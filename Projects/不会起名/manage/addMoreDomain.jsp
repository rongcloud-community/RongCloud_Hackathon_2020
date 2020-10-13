<%
	/**
	 *本文件被客户端管理员调用用来添加更多域名
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<head> 
<title>无标题文档</title>
<link href="css/talk.css" rel="stylesheet" type="text/css" />
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
	String theFirstDomainId=userManager.getUserDomainId(vid);
	String domainIds=theFirstDomainId;
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	
%> 
 
<%
//***********************************
//变量初始化
//***********************************
String domain = null;
 
String domainId = "";//最大domainId值
Calendar start=null;	  
Calendar end= null; 
//***********************************
//获取变量值
//***********************************
 
domain = request.getParameter("newDomain");
String addNewDomain= request.getParameter("addNewDomain");
String modifyInfo= request.getParameter("modifyInfo");
String removeDomain= request.getParameter("removeDomain");
String companyName=null;
String contactName=null;
String contactTel=null;
String contactEmail=null;
String endTime=null;
String sql="";
ResultSet rs=null;
//***********************************
//添加进数据库
//***********************************
if(removeDomain!=null){
		try{			 
			String toRemoveDomain=request.getParameter("toRemoveDomain");
			String toRemoveDomainId=userManager.getDomainIdByDomain(toRemoveDomain);
			sql="delete from site where domain=\""+toRemoveDomain+"\" and domainId<>\""+theFirstDomainId+"\"";
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection();
			db.setSqlQuery(sql);
			if(db.executeUpdate()==1){
				Log.log("域名"+toRemoveDomain+"(id:"+toRemoveDomainId+")已经被用户"+vid+"(id)删除。");
				StringTokenizer st = new StringTokenizer(domainIds,",");
				String newDomainIds="";	
				String temp="";
				while(st.hasMoreTokens()){
					temp=st.nextToken();
					if( toRemoveDomainId.equals(temp) )
						continue;
					newDomainIds +=temp+",";				
				}
				newDomainIds=newDomainIds.substring(0,newDomainIds.length()-1);
				sql="update user set domainId=\""+newDomainIds+"\" where domainId=\""+domainIds+"\"";			 
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection();
				db.setSqlQuery(sql);
				db.executeUpdate();
				sql="update site set domainIds=\""+newDomainIds+"\" where domainIds=\""+domainIds+"\"";
				if(db.getConnection()==null || db.isClosed())			 
					db.setConnection();
				db.setSqlQuery(sql);
				db.executeUpdate();
				out.println("域名"+toRemoveDomain+"已经被删除。");				
			}	
			else
				out.println("首个域名"+toRemoveDomain+"不能被删除。");
			//关闭数据库
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();			
		}catch(Exception e){
			try{
				(db.getConnection()).rollback();
			}catch(Exception ee){}
			out.println("删除时发生错误，请和系统管理员联系。");
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();
			Log.log("Error:addMoreDomain.jsp removeDomain e:"+e.getMessage()+" sql: "+sql);
		}
	}
else if(modifyInfo!=null){
		try{
			companyName=new String( (request.getParameter("companyName")).getBytes("iso-8859-1"),"utf-8" );
			contactName=new String( (request.getParameter("contactName")).getBytes("iso-8859-1"),"utf-8" );
			
			contactTel=request.getParameter("contactTel");
			contactEmail=request.getParameter("contactEmail");
			sql="update site set companyName=\""+companyName+"\",contactName=\""+contactName+"\",contactTel=\""+
				contactTel+"\",contactEmail=\""+contactEmail+"\" where domainId="+theFirstDomainId;
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection();
			db.setSqlQuery(sql);
			db.executeUpdate();
			//关闭数据库
			if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();
			out.println("域名基本信息已经修改。");
		}catch(Exception e){}
}


	
if(addNewDomain!=null){
	if( payLevel>=2){
		try{
			if(domain!=null && !domain.equals("") )
			{
				StringTokenizer st=new StringTokenizer(domainIds," ,"); 	
				if(st.countTokens()>=4 && payLevel<=2){
					out.print("<script language=javascript>alert('您已经有至少4个域名在同一个帐户下，如果确实需要更多，请联系淘客业务:01051668337-业务！');history.go(-1);</script>");
					return;
				}
				//=============================================
				//向site表写入站点信息
				//=============================================
				SiteManager siteManager = new SiteManager();
				Site site = new Site();
				
				start = Calendar.getInstance();
				end = Calendar.getInstance();
				SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String a = formatter1.format(start.getTime());
		
				//结束时间加一年
				java.util.Date date1 = formatter1.parse(a);
				long Time=(date1.getTime()/1000)+60*60*24*365;
				date1.setTime(Time*1000);
				String b=formatter1.format(date1);
				
				
				//if(db.getConnection()==null || db.isClosed())			 
				//	db.setConnection();  
				//计算当前最大domainId值 
				//sql = "select max(domainId) as domainId from site";
				//db.setSqlQuery(sql);
				//rs = db.getResult();
				//if(rs!=null && rs.next())
				//	try{domainId = String.valueOf(rs.getInt("domainId")+1);}catch(Exception e){}
				
				//site.setDomainId(domainId);
				site.setUrl(domain);
				site.setName("");//公司名称
				site.setContactName("");
				site.seTel("");
				site.setEmail("");		
				site.setStart(a);
				site.setEnd(b);		
				if( siteManager.addSite(site,theFirstDomainId,"0")==false )
					out.print("<script language=javascript>alert('可能已经有相同的域名记录！');history.go(-1);</script>");
				else{
					String id= vid;
					//String domainIds=userManager.getDomainId(id);
					if(db.getConnection()==null || db.isClosed())			 
						db.setConnection();  
					sql="select domainId from site where domain=\""+domain+"\"";
		 
					db.setSqlQuery(sql);
					String newDomainIds="";
					 rs = db.getResult();
					if(rs!=null && rs.next())
						newDomainIds=domainIds+","+rs.getString("domainId");	
					if(db.getConnection()==null || db.isClosed())			 
						db.setConnection();  
					sql="update user set domainId=\""+newDomainIds+"\" where domainId=\""+domainIds+"\"";					
					db.setSqlQuery(sql);
					db.executeUpdate();
					if(db.getConnection()==null || db.isClosed())			 
						db.setConnection();  
					sql="update site set domainIds=\""+newDomainIds+"\" where parentId=\""+theFirstDomainId+
						"\" or domainId=\""+theFirstDomainId+"\"";				
					db.setSqlQuery(sql);
					db.executeUpdate();
					out.println("新的域名"+domain+"已经添加，您可以通过刷新调入。");
				}
				//关闭数据库
				if(db.getConnection()!=null && !db.isClosed())
					db.closeConnection();	   
			}
		}catch(Exception ee){
			try{
				(db.getConnection()).rollback();
				//关闭数据库
				if(db.getConnection()!=null && !db.isClosed())
					db.closeConnection();	
				out.println("您刚才添加域名失败，请和系统管理员联系。");
			}catch(Exception eee){}
			Log.log("Error:addMoreDomain.jsp addNewDomain e:"+ee.getMessage()+" sql: "+sql);
		}
 	}
	else if(payLevel==0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能添加多个域名，如果要申请多个域名，请申请商务版以上版本。</font>");
	else if(payLevel==1) 
		out.print("<font color=\'red\'>您使用的是增强版，不能添加多个域名，如果要申请多个域名，请申请商务版以上版本。</font>");
}	

if(companyName==null){
	try{
		companyName=request.getParameter("companyName");
		contactName=request.getParameter("contactName");
		contactTel=request.getParameter("contactTel");
		contactEmail=request.getParameter("contactEmail");
		sql="select * from site where domainId="+theFirstDomainId;
		if(db.getConnection()==null || db.isClosed())			 
			db.setConnection();
		db.setSqlQuery(sql);
		rs = db.getResult();
		if(rs!=null && rs.next()){
			companyName=rs.getString("companyName");
			contactName=rs.getString("contactName");
			contactTel=rs.getString("contactTel");
			contactEmail=rs.getString("contactEmail");
			endTime=rs.getString("end");
		}
		//关闭数据库
		if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
		//out.println("域名基本信息已经修改。");
	}catch(Exception e){}
}

%>
<body>
<table width="802" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="798" bgcolor="#E4F2FF">站点信息维护</td>
  </tr>
</table>
<br>
<table width="801" border="0" cellpadding="0" cellspacing="0" class="content9">
  
  <tr>
    <td width="10" height="25">&nbsp;</td>
    <td width="791" height="25"><form id="form1" name="form1" method="post" action="addMoreDomain.jsp?vid=<%=vid%>&sid=<%=sid%>">
<table width="793" border="0" cellpadding="0" cellspacing="1" bordercolor="#A5AdC4" bgcolor="#CCCCCC" style="font-size:12">
  <tr class="content10hui">
    <td height="25" colspan="2" bgcolor="#E7F3FF">修改站点基本信息：</td>
  </tr>
  <tr bgcolor="#FFFFFF" class="content9">
    <td height="25" align="right" valign="middle">公司名称：</td>
    <td height="25"><p>
      <input name="companyName" type="text" size="40" value='<%=companyName%>' />
      (显示在对话窗上的公司名称)</p>      </td>
  </tr>
  <tr bgcolor="#FFFFFF" class="content9">
    <td height="25" align="right" valign="middle">联系人：</td>
    <td height="25"><input name="contactName" type="text" size="40" value='<%=contactName%>' /></td>
  </tr>
  <tr bgcolor="#FFFFFF" class="content9">
    <td height="25" align="right" valign="middle">联系电话：</td>
    <td height="25"><input name="contactTel" type="text" size="40" value='<%=contactTel%>'/></td>
  </tr>
  <tr bgcolor="#FFFFFF" class="content9">
    <td width="115" height="25" align="right" valign="middle">邮件地址：</td>
    <td width="675" height="25"><input name="contactEmail" type="text" size="40" value='<%=contactEmail%>'/>    </td>
  </tr>
  <tr bgcolor="#FFFFFF">
    <td height="25" align="right">站点到期时间：</td>
    <td height="25"><%=endTime%></td>
  </tr>
  <tr bgcolor="#FFFFFF">
    <td height="25">&nbsp;</td>
    <td height="25"><label>
      <input type="submit" name="modifyInfo" value="提交修改站点基本信息" />
    </label></td>
  </tr>
</table>
<br>
<%
	//UserManager userManager=new UserManager(); 
	StringTokenizer st = new StringTokenizer(userManager.getUserDomain(vid),",");
	int tokens=st.countTokens();
	if(tokens>1){%>
<table width="793" border="0" cellpadding="0" cellspacing="1" bordercolor="#A5AdC4" bgcolor="#CCCCCC" style="font-size:12">
  <tr class="content10hui">
    <td height="25" colspan="2" bgcolor="#E7F3FF">删除域名：</td>
  </tr>
  <tr bgcolor="#FFFFFF" class="content9">
    <td width="115" height="25" align="center" valign="middle">选择域名：</td>
    <td width="673" height="25"><label>
			<select name="toRemoveDomain" >
			<%			
 			String t="";//跳过第一个域名 第一个域名不能被删除		
			String firstDomain=userManager.getDomainByDomainId(theFirstDomainId);
			while(st.hasMoreTokens()){					 
 				t=st.nextToken();
				if(t.equals(firstDomain))
					continue;
				%>            	
				<option value="<%=t%>" ><%=t%></option> 
			<%}%>
			 </select>
            </label>	<input type="submit" name="removeDomain" value="删除所选域名" /></td>
  </tr>
  <tr bgcolor="#FFFFFF">
    <td height="25">&nbsp;</td>
    <td height="25"><label></label></td>
  </tr>
</table>
<br>
<%}%>
<table width="791" border="0" cellpadding="0" cellspacing="1" bordercolor="#A5AdC4" bgcolor="#CCCCCC" style="font-size:12">
        <tr class="content10hui">
          <td height="25" colspan="2" bgcolor="#E7F3FF">添加新的站点，更多域名同时管理 (最多3个,如果需要更多，请联系客服) </td>
          </tr>
        <tr bgcolor="#FFFFFF" class="content9">
          <td width="115" height="25" align="center" valign="middle">输入新的域名：</td>
          <td width="673" height="25"><input name="newDomain" type="text" size="40" value="www." />           </td>
        </tr>
        
        <tr bgcolor="#FFFFFF">
          <td height="25">&nbsp;</td>
          <td height="25"><label>
            <input type="submit" name="addNewDomain" value="添加新域名" />
          </label></td>
        </tr>
      </table>
        <br>        
    </form>    </td>
  </tr>
</table>
</body>
</html>
