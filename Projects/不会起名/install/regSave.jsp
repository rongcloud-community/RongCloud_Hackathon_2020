<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*,mail.*,java.text.SimpleDateFormat,java.util.Calendar,java.util.Date"%>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<head>
<link href="css.css" rel="stylesheet" type="text/css">
 
<title>ע��ҳ�桪���Կ�</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
.contentC {
	font-family: "����";
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
//������ʼ��
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
String domainId = "";//���domainIdֵ
Calendar start=null;	  
Calendar end= null; 
//***********************************
//��ȡ����ֵ
//***********************************
try
{
	//��ȡsiteվ��ֵ
	domain = request.getParameter("domain");
	companyName = new String( (request.getParameter("companyName")).getBytes("iso-8859-1"),"UTF-8" );
	contactName = new String( (request.getParameter("contactName")).getBytes("iso-8859-1"),"UTF-8" );
	contactTel = request.getParameter("contactTel");
	contactEmail = request.getParameter("contactEmail");	
	agentId = request.getParameter("agentId");	
	
	//��ȡuser��ֵ
	password = request.getParameter("password");
	type = new String( (request.getParameter("type")).getBytes("iso-8859-1"),"UTF-8" );
	sex = new String( (request.getParameter("sex")).getBytes("iso-8859-1"),"UTF-8" );
//out.println(companyName+" "+contactTel);
	if(domain==null || domain.equals("") || password==null|| password.equals("") ||
	   companyName==null || companyName.equals("") || contactTel==null|| contactTel.equals("") ||
	   contactEmail==null|| contactEmail.equals("")){
		out.print("<script language=javascript>alert('ע��ʧ�ܣ�����������������Ƿ����Ҫ��');history.go(-1);</script>");
		return;
	}
	/**
	if( !domain.startsWith("www") ){
		out.print("<script language=javascript>alert('����ֻ��ע���www�Ķ��������������������ڵ�½����ӣ�');history.go(-1);</script>");
		return;
	}
	**/
	if( contactEmail==null || contactEmail.equals("") ){
		out.print("<script language=javascript>alert('ϵͳ��Ҫ�ʼ���ַ�������պ��һص�½��Ϣ��');history.go(-1);</script>");
		return;
	}
	StringTokenizer st1=new StringTokenizer(domain," ><?=\\/");
	if(st1.countTokens()>1){
		out.print("<script language=javascript>alert('����������������Ƿ���ȷ������ܺ��н��õķ�����=?/');history.go(-1);</script>");
		return;
	}
	StringTokenizer st2=new StringTokenizer(companyName," <>?=\\/");
	if(st2.countTokens()>1){
		out.print("<script language=javascript>alert('����������Ĺ�˾�����Ƿ���ȷ������ܺ��н��õķ�����=?/');history.go(-1);</script>");
		return;
	}
	StringTokenizer st3=new StringTokenizer(contactName," <>?=\\/");
	if(st3.countTokens()>1){
		out.print("<script language=javascript>alert('������������ϵ���Ƿ���ȷ������ܺ��н��õķ�����=?/');history.go(-1);</script>");
		return;
	}
	StringTokenizer st4=new StringTokenizer(contactTel," <>?=\\/");
	if(st4.countTokens()>1){
		out.print("<script language=javascript>alert('�������������ϵ�绰�Ƿ���ȷ������ܺ��н��õķ�����=?/');history.go(-1);</script>");
		return;
	}
	StringTokenizer st5=new StringTokenizer(contactEmail," <>?=\\/");
	if(st5.countTokens()>1){
		out.print("<script language=javascript>alert('������������ʼ���ַ�Ƿ���ȷ������ܺ��н��õķ�����=?/');history.go(-1);</script>");
		return;
	}
}catch(Exception ee){
	out.print("<script language=javascript>alert('ע��ʧ�ܣ�����������������Ƿ����Ҫ��');history.go(-1);</script>");
	return;
}


//***********************************
//��ӽ����ݿ�
//***********************************
try
{
	if(domain!=null && !domain.equals("") && companyName!=null && !companyName.equals("") && contactName!=null && !contactName.equals(""))
	{
		//=============================================
		//��site��д��վ����Ϣ
		//=============================================
		SiteManager siteManager = new SiteManager();
		Site site = new Site();
		
		start = Calendar.getInstance();
		end = Calendar.getInstance();
		SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String a = formatter1.format(start.getTime());

	    //����ʱ���һ��
		java.util.Date date1 = formatter1.parse(a);
	    long Time=(date1.getTime()/1000)+60*60*24*365;
	    date1.setTime(Time*1000);
	    String b=formatter1.format(date1);
	 
		site.setUrl(domain);
		site.setName(companyName);//��˾����
		site.setContactName(contactName);
		site.seTel(contactTel);
		site.setEmail(contactEmail);		
		site.setStart(a);
		site.setEnd(b);		
		
		//������site��д�����ݣ���������ֵʱ�����ǿ���û����ͬ����ʱ��site����ӳɹ�����ʱ����user�����������
		//�����վ��ʱ�Ѿ��Զ����100������Ϣ���õ�
		if( siteManager.addSite(site)==true )
		{
			//=============================================
			//��user��д���û���Ϣ
			//=============================================
			UserManager userManager = new UserManager();
			//User user = new User();
			//��ע��ĵ�һ������[ȥ��www.]+adminΪ��������Ա��¼��
			domains = domain.split(",");
			//���ǰ��λ��www.���滻
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
			//���û����ӳɹ��������һ��
			if( !userManager.hasSameId(adminUser) )
				userManager.addNewUser(adminUser,password,type,contactName,"",sex,"","",contactEmail,
									"","","",domains[0],"","","OFFLINE");
			domainId=userManager.getDomainIdByDomain(domain);
			userManager.addSmsCredit(domainId,20);//���20���ֻ��������õ�
 			userManager.addDefaultAnswers(domainId);//���Ĭ�Ͽ�ݻظ�
			if(agentId!=null && !agentId.equals(""))
				userManager.addSiteToAgent(agentId,domainId);//
 			//out.print("<script language=javascript>alert('ע��ɹ���');window.location='reg.htm';</script>");
			//����ע��ɹ���½��Ϣ�ʼ�
			if(contactEmail!=null){
				try{
					String toAddr=contactEmail;
					String fromAddr="service@100im.cn";
					String subject="�����Կ͹���Ա��½��Ϣ";
					String body="";		
					if(sex.equals("��"))		 
						body ="�𾴵�"+contactName+"����:<br><br>";
					else
						body ="�𾴵�"+contactName+"Ůʿ:<br><br>";
				 	body +="��л�����Կ͵Ĺ��ĺ�֧�֣�ϣ�����ǵĲ�Ʒ---�Կͣ�����Ӫ���ͻ����ͷ�����ѡ��<br>"+
						   "����������������Ӫ���Ϳͷ�����������ͬʱϣ����������������飬��ʹ��֮ǰ�������κ�����<br>"+
						   "������Կ��û�ʹ���ֲᣬ��ֱ����ѯ��������ʱ�����缼�����޹�˾�ԿͿͷ���<br><br>";
					body +="�����Կ͹���Ա�ʻ���½��Ϣ����:<br>";
					body +="�û���: "+adminUser+"<br>";
					body +="��  ��: "+password+"<br>";
					body +="��  ��: "+domain+"<br>";
					body +="��  ˾: "+companyName+"<br><br>";
				
					body +="�Կ͵�½��ַ�� http://www.100im.cn <a href=\"http://client.100im.cn/loginValidation.jsp?"+
							"username="+adminUser+"&password="+password+"&loginType=0"+
							"\">��Ҳ���Ե���˴�ֱ�ӵ�½</a><br><br>";
					
					body +="��˾��ַ�� �����ϵ���Ϣ��ҵ�����ϵؼ�԰4-2-901<br>";
					body +="��ϵ�绰�� 86-10-51668337-�Կ�ҵ��/�ԿͿͷ�<br>";
					body +="��˾��ַ�� http://www.dns118.com<br>";
					//mail.Mail.sendMail(toAddr,fromAddr,subject,body,"mail.3yan.com","qdk@3yan.com","123456");	 		 
				}catch(Exception sendMailEx){
					out.print("<script language=javascript>alert('ϵͳ�������������䷢�͵�½��Ϣʧ�ܣ��뱣������ĵ�½��Ϣ�����½���޸�Ϊ�����ʼ���ַ��');</script>");
				}			
			}
		}else 
		{
	
			out.print("<script language=javascript>alert('ע��ʧ�ܣ��Ѿ�����ͬ��������¼��');history.go(-1);</script>");
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
        <td height="25"><span class="content1">ע��ɹ���</span></td>
      </tr>
      <tr>
        <td height="101" class="contentC">1����������Ĵ��룬��������뵽��Ҫ��ص�ҳ��������������������ҳ�ٶȲ����κ�Ӱ�졣<br />
          2�������Ҫ��ض��ҳ�棬������ÿ��ҳ�涼Ҫ��ӡ�<br />
          3����ʹ���Ժ�ѡ��ͬ�ĸ�����ɫ�����´��벻���κθı䣬һ��Ƕ�룬��ɫ��䡣<br />
          4������ͨ�ã���ͬ����վ��ʹ����ͬ�Ĵ��룬ϵͳ�������ж�����վ�㡣<br />
          <br />
          ��Ĺ���Ա��½�ʺ�Ϊ��<font color=red><%=adminUser %></font> ����Ϊ��<font color=red><%=password %></font><br />
          ��¼��ַ��<a href="http://<%=Global.getParameter("cdomain")%>" target="_blank">http://<%=Global.getParameter("cdomain")%></a></td>
      </tr>
      <tr>
        <td height="66" width="683" valign="middle" bgcolor="#F5F5F5"><div id='code' align="left" style="vertical-align:middle;white-space:nowrap;width:680;height:100%;overflow:hidden;">
          <div id='div' align="left">&lt;div id='webimFloat' style='cursor:hand;'&gt;&lt;/div&gt;<br>
            &lt;script&gt; function g(p){var r;d=document.cookie;s=d.indexOf(p+&quot;=&quot;);if(s&gt;=0){e=d.indexOf(&quot;;&quot;, s+p.length+1);if(e&lt;0)e=d.length;r=d.substring(s+p.length+5,e-1)}; return r;} document.write(&quot;&lt;scrip&quot;+&quot;t src=\&quot;http://<%=Global.getParameter("vdomain")%>/webTalk.jsp?a=-1&amp;frmurl=&quot;+escape(top.document.referrer)+&quot;&amp;curURL=&quot;+escape(top.document.URL)+&quot;&amp;p=&quot;+screen.width+&quot;*&quot;+screen.height+&quot;&amp;vid=&quot;+g(&quot;vMAC&quot;)+&quot;&amp;rt=&quot;+g(&quot;rt&quot;)+&quot;&amp;lvp=&quot;+g(&quot;lvp&quot;)+&quot;&amp;ck=&quot;+navigator.cookieEnabled+&quot;\&quot;&gt;&lt;/scrip&quot;+&quot;t&gt;&quot;); &lt;/script&gt;</div>
        </div></td>
      </tr>
      <tr>
        <td height="40" align="center"><input name="button" type=button  style=" width:600px;height:50px;" title='������Ʊ���͵�ַ��������,Ȼ��������ļ��༭����ֱ��ճ������.' onclick='copyToClipBoard()' value='��������������,Ȼ�����ֱ��ճ�������ҳ�� ���½��Ӻ�̨�������� �������ֹ�����' /></td>
      </tr>
      <tr>
        <td height="50" class="contentC">1�������Ҫѡ����������ҳ��Ƕ�뾲ֹͼ������ֶ����Ǹ���ͼ�꣬�뽫�����һ�зŵ���Ҫ��ʾ��table��td�ڻ�div�ڡ�<br />
          <br />
          2��������������ϵ��������ʱ�����缼�����޹�˾   �绰��010-51668337��808��882</td>
      </tr>
    </table>
    <br>
    <table width="528" border="0" align="center">
      <tr>
        <td align="center"><input name="Submit2" type="button" onClick="location='ok.html'" class="inputstyle"  value=" ��һ��  "></td>
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
