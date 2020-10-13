<%
	/**
	 *本文件被客户端管理员调用用做管理所有客服人员
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<title></title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
<!--让页面顶到最左最上-->
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
}
.STYLE1 {color: #FF0000}
.data{
text-align:left;
font-size:12px;
background-color:#fff;
border-collapse:collapse;
empty-cells: show; 
margin:0px;
padding:0px;

}
.STYLE2 {color: #66CC00}
.STYLE4 {color: #FF0000; font-size: 24pt; }
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
//***********************************
//变量初始化
//***********************************
String sql = "";
ResultSet rs = null;
String id = "";
String domainId = "";
//***********************************
//获取变量值
//***********************************
id = vid; //取出登录用户的用户名，也就是 

String pageUrl=""; // 
String name=""; // 
String pageUrlAdd = request.getParameter("pageUrlAdd"); 
String pageUrlDel = request.getParameter("pageUrlDel"); 
//out.println(pageUrl);
try
{ 
	
	//if(pageUrlDel!=null && pageUrlDel.indexOf("%")>=0)
	//	pageUrlDel=Escape.unescape(pageUrlDel);
//out.println(pageUrlDel);
	if(pageUrlAdd!=null )
		pageUrlAdd =  new String( (pageUrlAdd).getBytes("iso-8859-1"),"utf-8" ); 
	if(pageUrlDel!=null )
		pageUrlDel =  new String( (pageUrlDel).getBytes("iso-8859-1"),"utf-8" ); 
	 
	name =  new String( (request.getParameter("name")).getBytes("iso-8859-1"),"utf-8" ); 
}catch(Exception ee){}
domainId=request.getParameter("domainId"); 
if(domainId==null){
	if(request.getParameter("selectDomain")!=null)
		domainId=userManager.getDomainIdByDomain(request.getParameter("domain"));
	else{	
		domainId=userManager.getUserDomainId(id);
		if(domainId.indexOf(",")>0)
			domainId=domainId.substring(0,domainId.indexOf(","));
	}
}
String delete=request.getParameter("delete"); // 
String submit =request.getParameter("submit");
 
if(submit!=null){
	try{
		sql="insert into  `pageName` ( `domainId` , `pageUrl` , `name` ) values(\'"+domainId+"\',\'"+pageUrlAdd+"\',\'"+name+"\')";
//out.print(sql);		 
		db.setSqlQuery(sql);		
		if(db.getConnection()==null || db.isClosed())			 
	  		db.setConnection();
		db.executeUpdate();
		
	}catch(Exception e){out.println(e.getMessage());}
}
else if(delete!=null){
	try{
		sql="delete from `pageName` where `domainId`=\'"+domainId+"\' and `pageUrl`=\'"+pageUrlDel+"\'";
		//out.print(sql);
		db.setSqlQuery(sql);		
		if(db.getConnection()==null || db.isClosed())			 
	  		db.setConnection();
		db.executeUpdate();
	}catch(Exception e){}
}
%>
<body>
<br />
<table width="790" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="790" bgcolor="#E4F2FF">页面友好名称定义（监控时访问轨迹显示名称而非页面URL）</td>
  </tr>
</table>
<table width="791" border="1" bordercolor="#A5AdC4" cellpadding="0" cellspacing="0">
  <tr>
    <td width="787"><table width="787" border="0" cellpadding="0" cellspacing="1" >
      <form id="form_select" name="form_select" method="post" action="?vid=<%=vid%>&sid=<%=sid%>">
	  <input name="selectDomain" type="hidden" id="email" size="30" value="selectDomain" />
        <tr >
          <td width="785" height="25">请选择域名：
            <label>                
			<select name="domain"  onchange="this.form.submit()">
                      <%
			//UserManager userManager=new UserManager(); 
			String domain=userManager.getDomainByDomainId(domainId);
			StringTokenizer st = new StringTokenizer(userManager.getUserDomain(id),",");	
			int counter=0;
			String t="";
			while(st.hasMoreTokens()){
 				t=st.nextToken();%>
                      <option value="<%=t%>" <%=(domain.equals(t))?"selected":""%>><%=t%></option>
                      <%}%>
                    </select>		
                </label>
          </td>
        </tr>
      
        
        
      </form>
    </table></td>
  </tr>
</table>
<br />
<table width="790" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td><table width="787" border="0" cellpadding="0" cellspacing="0" class="data">
      <tr style="">
        <td width="69" height="20" align="center" valign="middle" bgcolor="#E4F2FF"  >序号</td>
        <td width="451" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >页面</td>
        <td width="267" height="20" align="center" valign="middle" bgcolor="#E4F2FF" >名称</td>
        </tr>
      <%
	  sql = "select pageUrl,name from pageName,site where pageName.domainId=site.domainId and site.domain=\""+domain+"\"";
	  //out.println(sql);
	  db.setSqlQuery(sql);
	  if(db.getConnection()==null || db.isClosed())			 
	  	db.setConnection(); 
	  rs=db.getResult();
	  int i = 1;
	  String pageUrl1="";
	  while(rs!=null && rs.next())
	  {
		pageUrl1=rs.getString("pageUrl");
		//if(pageUrl1.indexOf("%")>=0)
			pageUrl1=Escape.escape(pageUrl1);
	  %>
      
        <tr>
          <td height="20" align="center" valign="middle" style="border-left: 1px solid #CCCCCC;border-bottom: 1px solid #CCCCCC"><a  href="pageName.jsp?delete=delete&domainId=<%=domainId%>&domain=<%=domain%>&pageUrlDel=<%=pageUrl1%>&vid=<%=vid%>&sid=<%=sid%>">删除</a></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("pageUrl")%></td>
          <td height="20" align="left" valign="middle" style="border-bottom: 1px solid #CCCCCC"><%=rs.getString("name")%></td>
          </tr>
      
      <%
	   i = i+1;
	   }
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
	  %>
    </table></td>
  </tr>
</table>
<br />
<table width="790" height="" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  

  <tr>
    
    <td width="788" height="78" style="border-bottom: 1px solid #CCCCCC"><table width="788" border="0" bordercolor="#A5AdC4">
      <tr>
        <td width="782"><table width="782" border="0" cellpadding="0" cellspacing="0" class="content9">
            
            <!--注意这里如果要上传图像就要 enctype="multipart/form-data"，但method="get"-->
<script language="javascript">	
	function getUrlValue(){
		var pageUrl=document.getElementById("pageUrl");
		var pageUrl1=document.getElementById("pageUrl1");
		if(pageUrl!=null && pageUrl1!=null)
			pageUrl.value=pageUrl1.value;
		//alert(pageUrl.value);
	}
</script>			
            <form action="" method="post" name="UserForm2" id="UserForm2">
              <tr>
                <td width="783" height="19" align="left" valign="middle" >页面URL：
                  <input name="pageUrlAdd" type="text" id="pageUrlAdd" size="90" />
				   </td>
                </tr>
              
              <tr>
                <td height="21" align="left" valign="middle" >名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input name="name" type="text" id="email" size="30" />
				  <input name="domainId" type="hidden" id="email" size="30" value="<%=domainId%>" /></td>
                </tr>
              <tr>
                <td height="30" align="center" valign="middle" ><input type="submit" name="submit" value="添加"  />                </td>
                </tr>
            </form>
        </table></td>
      </tr>
    </table></td></tr>
</table>
</body>
</html>
