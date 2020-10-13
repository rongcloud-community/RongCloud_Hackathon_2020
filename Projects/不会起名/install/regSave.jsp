<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,mail.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<head>
<link href="css.css" rel="stylesheet" type="text/css">
 
<title>注册页面——淘客</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
.contentC {
	font-family: "宋体";
	font-size: 10pt;
	font-weight: normal;
	font-variant: normal;
	color: #999999;
	text-decoration: none;
}
-->
</style>
<link href="http://www.100im.cn/css/style_index.css" rel="stylesheet" type="text/css" />
<script language='javascript'>
		function copyToClipBoard(){
			var clipBoardContent=''; 
			clipBoardContent+=document.getElementById('code').innerText;
			//clipBoardContent+='\r\n'+document.URL;
			window.clipboardData.setData("Text",clipBoardContent);
 		}
	</script>
</head>
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
String agentId=null;

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
	companyName = new String( (request.getParameter("companyName")).getBytes("iso-8859-1"),"UTF-8" );
	contactName = new String( (request.getParameter("contactName")).getBytes("iso-8859-1"),"UTF-8" );
	contactTel = request.getParameter("contactTel");
	contactEmail = request.getParameter("contactEmail");	
	agentId = request.getParameter("agentId");	
	
	//获取user表值
	password = request.getParameter("password");
	type = new String( (request.getParameter("type")).getBytes("iso-8859-1"),"UTF-8" );
	sex = new String( (request.getParameter("sex")).getBytes("iso-8859-1"),"UTF-8" );
//out.println(companyName+" "+contactTel);
	if(domain==null || domain.equals("") || password==null|| password.equals("") ||
	   companyName==null || companyName.equals("") || contactTel==null|| contactTel.equals("") ||
	   contactEmail==null|| contactEmail.equals("")){
		out.print("<script language=javascript>alert('注册失败，请检查您输入的内容是否符合要求！');history.go(-1);</script>");
		return;
	}
	/**
	if( !domain.startsWith("www") ){
		out.print("<script language=javascript>alert('这里只能注册带www的顶级域名，其它域名请在登陆后添加！');history.go(-1);</script>");
		return;
	}
	**/
	if( contactEmail==null || contactEmail.equals("") ){
		out.print("<script language=javascript>alert('系统需要邮件地址用来接收和找回登陆信息！');history.go(-1);</script>");
		return;
	}
	StringTokenizer st1=new StringTokenizer(domain," ><?=\\/");
	if(st1.countTokens()>1){
		out.print("<script language=javascript>alert('请检查您输入的域名是否正确，或可能含有禁用的符号如=?/');history.go(-1);</script>");
		return;
	}
	StringTokenizer st2=new StringTokenizer(companyName," <>?=\\/");
	if(st2.countTokens()>1){
		out.print("<script language=javascript>alert('请检查您输入的公司名称是否正确，或可能含有禁用的符号如=?/');history.go(-1);</script>");
		return;
	}
	StringTokenizer st3=new StringTokenizer(contactName," <>?=\\/");
	if(st3.countTokens()>1){
		out.print("<script language=javascript>alert('请检查您输入联系人是否正确，或可能含有禁用的符号如=?/');history.go(-1);</script>");
		return;
	}
	StringTokenizer st4=new StringTokenizer(contactTel," <>?=\\/");
	if(st4.countTokens()>1){
		out.print("<script language=javascript>alert('请检查您输入的联系电话是否正确，或可能含有禁用的符号如=?/');history.go(-1);</script>");
		return;
	}
	StringTokenizer st5=new StringTokenizer(contactEmail," <>?=\\/");
	if(st5.countTokens()>1){
		out.print("<script language=javascript>alert('请检查您输入的邮件地址是否正确，或可能含有禁用的符号如=?/');history.go(-1);</script>");
		return;
	}
}catch(Exception ee){
	out.print("<script language=javascript>alert('注册失败，请检查您输入的内容是否符合要求！');history.go(-1);</script>");
	return;
}


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
	 
		site.setUrl(domain);
		site.setName(companyName);//公司名称
		site.setContactName(contactName);
		site.seTel(contactTel);
		site.setEmail(contactEmail);		
		site.setStart(a);
		site.setEnd(b);		
		
		//下面向site表写入数据，当返回真值时，就是库内没有相同域名时，site表添加成功，此时才向user表内添加数据
		//添加新站点时已经自动添加100个短信息信用点
		if( siteManager.addSite(site)==true )
		{
			//=============================================
			//向user表写入用户信息
			//=============================================
			UserManager userManager = new UserManager();
			//User user = new User();
			//以注册的第一个域名[去除www.]+admin为超级管理员登录名
			domains = domain.split(",");
			//如果前四位是www.则替换
			/**
			if(domains[0]!=null && !domains[0].equals("") && domains[0].startsWith("www."))
			{				
				adminUser = "admin@";
				StringTokenizer st = new StringTokenizer(domains[0].substring(4),".");	
				while(st.hasMoreTokens())
					adminUser += st.nextToken()+"_"; 
				if(adminUser.endsWith("_"))
					adminUser=adminUser.substring(0,adminUser.length()-1);
 			} 
			**/
			adminUser="admin@127_com";
			try{
  				userManager.addNewUser(adminUser,password,type,contactName,"",sex,"","",contactEmail,
									"","","",domains[0],"","","OFFLINE");
			}catch(Exception addUserEx){}
			//如果没有添加成功，再添加一次
			if( !userManager.hasSameId(adminUser) )
				userManager.addNewUser(adminUser,password,type,contactName,"",sex,"","",contactEmail,
									"","","",domains[0],"","","OFFLINE");
			domainId=userManager.getDomainIdByDomain(domain);
			userManager.addSmsCredit(domainId,20);//添加20个手机短信信用点
 			userManager.addDefaultAnswers(domainId);//添加默认快捷回复
			if(agentId!=null && !agentId.equals(""))
				userManager.addSiteToAgent(agentId,domainId);//
 			//out.print("<script language=javascript>alert('注册成功！');window.location='reg.htm';</script>");
			//发送注册成功登陆信息邮件
			if(contactEmail!=null){
				try{
					String toAddr=contactEmail;
					String fromAddr="service@100im.cn";
					String subject="您的淘客管理员登陆信息";
					String body="";		
					if(sex.equals("男"))		 
						body ="尊敬的"+contactName+"先生:<br><br>";
					else
						body ="尊敬的"+contactName+"女士:<br><br>";
				 	body +="感谢您对淘客的关心和支持！希望我们的产品---淘客，在线营销和互动客服的首选，<br>"+
						   "对您的网络宣传、营销和客服有所帮助，同时希望给您带来最佳体验，在使用之前或遇到任何问题<br>"+
						   "请查阅淘客用户使用手册，或直接咨询北京互联时空网络技术有限公司淘客客服。<br><br>";
					body +="您的淘客管理员帐户登陆信息如下:<br>";
					body +="用户名: "+adminUser+"<br>";
					body +="密  码: "+password+"<br>";
					body +="域  名: "+domain+"<br>";
					body +="公  司: "+companyName+"<br><br>";
				
					body +="淘客登陆地址： http://www.100im.cn <a href=\"http://client.100im.cn/loginValidation.jsp?"+
							"username="+adminUser+"&password="+password+"&loginType=0"+
							"\">您也可以点击此处直接登陆</a><br><br>";
					
					body +="公司地址： 北京上地信息产业基地上地佳园4-2-901<br>";
					body +="联系电话： 86-10-51668337-淘客业务部/淘客客服<br>";
					body +="公司网址： http://www.dns118.com<br>";
					//mail.Mail.sendMail(toAddr,fromAddr,subject,body,"mail.3yan.com","qdk@3yan.com","123456");	 		 
				}catch(Exception sendMailEx){
					out.print("<script language=javascript>alert('系统尝试向您的邮箱发送登陆信息失败，请保存好您的登陆信息，或登陆后修改为其他邮件地址。');</script>");
				}			
			}
		}else 
		{
	
			out.print("<script language=javascript>alert('注册失败，已经有相同的域名记录！');history.go(-1);</script>");
		}
		
	}
}catch(Exception ee){


}
%>
<body>
<br class="titlebottom" />
</p>
<table width="700" height="358" border="0" align="center" cellpadding="0" cellspacing="0" class="content">
  <tr>
    <td width="6" height="6"><img src="images/zc0_3.gif" width="6" height="6" /></td>
    <td width="587" background="images/zc0_4.gif"></td>
    <td width="6" height="6"><img src="images/zc0_6.gif" width="6" height="6" /></td>
  </tr>
  <tr>
    <td height="346" background="images/zc0_8.gif"></td>
    <td width="688" height="346"><table width="683" height="303" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td height="25"><span class="content1">注册成功！</span></td>
      </tr>
      <tr>
        <td height="101" class="contentC">1、复制下面的代码，将代码加入到你要监控的页面的最后，这样不会对你的网页速度产生任何影响。<br />
          2、如果你要监控多个页面，必须在每个页面都要添加。<br />
          3、即使你以后选择不同的浮动肤色，以下代码不用任何改变，一次嵌入，肤色万变。<br />
          4、代码通用，不同的网站，使用相同的代码，系统会智能判断来访站点。<br />
          <br />
          你的管理员登陆帐号为：<font color=red><%=adminUser %></font> 密码为：<font color=red><%=password %></font><br />
          登录地址：<a href="http://<%=Global.getParameter("cdomain")%>" target="_blank">http://<%=Global.getParameter("cdomain")%></a></td>
      </tr>
      <tr>
        <td height="66" width="683" valign="middle" bgcolor="#F5F5F5"><div id='code' align="left" style="vertical-align:middle;white-space:nowrap;width:680;height:100%;overflow:hidden;">
          <div id='div' align="left">&lt;div id='webimFloat' style='cursor:hand;'&gt;&lt;/div&gt;<br>
            &lt;script&gt; function g(p){var r;d=document.cookie;s=d.indexOf(p+&quot;=&quot;);if(s&gt;=0){e=d.indexOf(&quot;;&quot;, s+p.length+1);if(e&lt;0)e=d.length;r=d.substring(s+p.length+5,e-1)}; return r;} document.write(&quot;&lt;scrip&quot;+&quot;t src=\&quot;http://<%=Global.getParameter("vdomain")%>/webTalk.jsp?a=-1&amp;frmurl=&quot;+escape(top.document.referrer)+&quot;&amp;curURL=&quot;+escape(top.document.URL)+&quot;&amp;p=&quot;+screen.width+&quot;*&quot;+screen.height+&quot;&amp;vid=&quot;+g(&quot;vMAC&quot;)+&quot;&amp;rt=&quot;+g(&quot;rt&quot;)+&quot;&amp;lvp=&quot;+g(&quot;lvp&quot;)+&quot;&amp;ck=&quot;+navigator.cookieEnabled+&quot;\&quot;&gt;&lt;/scrip&quot;+&quot;t&gt;&quot;); &lt;/script&gt;</div>
        </div></td>
      </tr>
      <tr>
        <td height="40" align="center"><input name="button" type=button  style=" width:600px;height:50px;" title='点击复制标题和地址到剪贴版,然后在你的文件编辑器中直接粘贴即可.' onclick='copyToClipBoard()' value='点击拷贝上面代码,然后可以直接粘贴到你的页面 或登陆后从后台拷贝代码 且勿用手工复制' /></td>
      </tr>
      <tr>
        <td height="50" class="contentC">1、如果您要选择在您的网页上嵌入静止图标或文字而不是浮动图标，请将上面第一行放到您要显示的table的td内或div内。<br />
          <br />
          2、其他定制请联系北京互联时空网络技术有限公司   电话：010-51668337－808或882</td>
      </tr>
    </table>
    <br>
    <table width="528" border="0" align="center">
      <tr>
        <td align="center"><input name="Submit2" type="button" onClick="location='ok.html'" class="inputstyle"  value=" 下一步  "></td>
      </tr>
    </table></td>
    <td background="images/zc0_10.gif"></td>
  </tr>
  <tr>
    <td width="6" height="6"><img src="images/zc0leftx.gif" width="6" height="6" /></td>
    <td background="images/zc0_4middlex.gif"></td>
    <td width="6" height="6"><img src="images/zc0_6righrX.gif" width="6" height="6" /></td>
  </tr>
</table>
</body>
</html>
