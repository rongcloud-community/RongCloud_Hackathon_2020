<%
	/**
	 *本文件被admin调用来保存对某个网站的客服人员的修改
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 26,2007
	 *@last modified:  Apil 26,2007
	*/
%>
<%@page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<head> 
<title>无标题文档</title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
</head>
<%
/////////////////////session检测////////////////////////////////////////////////
String vid="admin";
String sid=request.getParameter("sid");
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		return;	
}
///////////////////////////////////////////////////////////////////////////////		
%>
<%
//***********************************
//变量初始化
//***********************************
String domain = null;
String companyName = null;
String contactName = null;
String contactTel = null;
String contactEmail = null;
String password = null;
String type = null;
String sex = null;

String sql = "";
ResultSet rs = null;
String[] domains = null;
String adminUser = "";
String domainId = "";//最大domainId值
Calendar start=null;	  
Calendar end= null; 
//***********************************
//获取变量值
//***********************************
try
{
	//获取site站点值
	domain = request.getParameter("domain");
	companyName = new String( (request.getParameter("companyName")).getBytes("iso-8859-1"),"gb2312" );
	contactName = new String( (request.getParameter("contactName")).getBytes("iso-8859-1"),"gb2312" );
	contactTel = request.getParameter("contactTel");
	contactEmail = request.getParameter("contactEmail");	
	
	//获取user表值
	password = request.getParameter("password");
	type = new String( (request.getParameter("type")).getBytes("iso-8859-1"),"gb2312" );
	sex = new String( (request.getParameter("sex")).getBytes("iso-8859-1"),"gb2312" );
//out.println(companyName+" "+contactTel);
}catch(Exception ee){}

//***********************************
//添加进数据库
//***********************************
try
{
	if(domain!=null && !domain.equals("") && companyName!=null && !companyName.equals("") && contactName!=null && !contactName.equals(""))
	{
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
		
		//计算当前最大domainId值
		db.setConnection();
		sql = "select max(domainId) as domainId from site";
		db.setSqlQuery(sql);
		rs = db.getResult();
		if(rs!=null && rs.next())
			try{domainId = String.valueOf(rs.getInt("domainId")+1);}catch(Exception e){}
		
		site.setDomainId(domainId);
		site.setUrl(domain);
		site.setName(companyName);//公司名称
		site.setContactName(contactName);
		site.seTel(contactTel);
		site.setEmail(contactEmail);		
		site.setStart(a);
		site.setEnd(b);		
		boolean siteAdded=siteManager.addSite(site);
		//下面向site表写入数据，当返回真值时，就是库内没有相同域名时，site表添加成功，此时才向user表内添加数据
		if( siteAdded==true )
		{
			//=============================================
			//向user表写入用户信息
			//=============================================
			UserManager userManager = new UserManager();
			//User user = new User();
			//以注册的第一个域名[去除www.]+admin为超级管理员登录名
			domains = domain.split(",");
			//如果前四位是www.则替换
			if(domains[0]!=null && !domains[0].equals("") && domains[0].startsWith("www."))
			{				
				adminUser = "admin@";
				StringTokenizer st = new StringTokenizer(domains[0].substring(4),".");	
				while(st.hasMoreTokens())
					adminUser += st.nextToken()+"_"; 
				if(adminUser.endsWith("_"))
					adminUser=adminUser.substring(0,adminUser.length()-1);
				 
			} 	
			userManager.addNewUser1(adminUser,password,type,contactName,null,sex,null,null,contactEmail,null,null,null,domains[0],null,null,"OFFLINE");			
		}else
		{
			out.print("<script language=javascript>alert('可能已经有相同的域名记录！');history.go(-1);</script>");
		}
		
	}
}catch(Exception ee){}
%>
<body>
<table width="800" border="0" cellpadding="0" cellspacing="1" bgcolor="#95B8FF" class="content9">
  <tr class="content10White">
    <td height="25">&nbsp;完成注册，复制下面的代码，将这行代码加入到你要监控的页面的最后一个body前面。<br>
					如果你要监控多个页面，必须在每个页面都要添加。<br />
					你的管理员登陆帐号为：<%=adminUser %> 密码为：123456</td>
  </tr>
  <tr>
    <td height="50" align="center" valign="middle" bgcolor="#FFFFFF">&lt;script&gt;
document.write(&quot;&lt;scrip&quot;+&quot;t src=\&quot;http://webim.uniscom.cn/webim.jsp\&quot;&gt;&lt;/scrip&quot;+&quot;t&gt;&quot;);
&lt;/script&gt;</td>
  </tr>
</table>
</body>
</html>