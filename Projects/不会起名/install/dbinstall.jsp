<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,java.io.*,java.net.*,msg.*"%>

<jsp:useBean id="db" scope="page"  class="msg.DbConn" /> 
<html>
<head>
<title>TaokeOCS v3.2安装</title>
<link href="css.css" rel="stylesheet" type="text/css">

</head>

<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">


<table width="100%" border="0" cellpadding="0" cellspacing="0" class="b-border">
  <tr> 
    <td bgcolor="FC9D39"><img src="images/spacer.gif" width="1" height="6"></td>
  </tr>
</table>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="220" valign="top" background="images/leftbg.gif"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#496B7A">
        <tr>
          <td height="201" align="center" bgcolor="#FFFFFF"><a href="http://www.shopex.cn" target="_blank"></a>
              
              <img src="../images/N27_3.jpg" width="136" height="71"></td>
        </tr>
      </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td><img src="images/leftmenutop.gif" width="226" height="6"></td>
          </tr>
          <tr>
            <td valign="top"><table width="213" border="0" cellpadding="0" cellspacing="0" class="p9white">
                <tr>
                  <td width="218" height="3" align="right"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td bgcolor="#52617B"><img src="images/spacer.gif" width="1" height="1"></td>
                      </tr>
                  </table></td>
                </tr>
              </table>
                <table width="213" border="0" cellpadding="2" cellspacing="2" class="p9white">
                  <tr>
                    <td width="218" align="right" class="p12white"><img src="images/items.gif" width="11" height="11"> 安装准备</td>
                  </tr>
                </table>
              <table width="213" border="0" cellpadding="0" cellspacing="0" class="p9white">
                  <tr>
                    <td width="218" height="3" align="right"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td bgcolor="#52617B"><img src="images/spacer.gif" width="1" height="1"></td>
                        </tr>
                    </table></td>
                  </tr>
                </table>
              <table width="213" border="0" cellpadding="2" cellspacing="2" class="p9white">
                  <tr>
                    <td width="218" align="right" ><a class="menu" href="home.htm"> 简介</a></td>
                  </tr>
                  <tr>
                    <td align="right" class="menu"><a class="menu" href="index.htm">-&gt;</a><a class="menu" href="require.htm"> 安装说明</a></td>
                  </tr>
                </table>
              <table width="213" border="0" cellpadding="2" cellspacing="2" class="p9white">
                  <tr>
                    <td width="94%" align="right"><a class="menu" href="request.html">系统检测</a></td>
                  </tr>
                </table>
              <table width="213" border="0" cellpadding="0" cellspacing="0" class="p9white">
                  <tr>
                    <td width="218" height="3" align="right"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td bgcolor="#52617B"><img src="images/spacer.gif" width="1" height="1"></td>
                        </tr>
                    </table></td>
                  </tr>
                </table>
              <table width="213" border="0" cellpadding="2" cellspacing="2" class="p9white">
                  <tr>
                    <td width="218" align="right" class="p12white"><img src="images/items.gif" width="11" height="11"> 开始安装</td>
                  </tr>
                </table>
              <table width="213" border="0" cellpadding="0" cellspacing="0" class="p9white">
                  <tr>
                    <td width="218" height="3" align="right"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td bgcolor="#52617B"><img src="images/spacer.gif" width="1" height="1"></td>
                        </tr>
                    </table></td>
                  </tr>
                </table>
              <table width="213" border="0" cellpadding="2" cellspacing="2" class="p9white">
                  <tr>
                    <td align="right"><a href="doinstall.html" class="menu">开始安装</a></td>
                  </tr>
                  <tr>
                    <td align="right"><a href="ini_setup.html" class="menu">客户信息设定及数据初始化</a></td>
                  </tr>
                  <tr>
                    <td align="right"><a href="ok.html" class="menu">完成</a></td>
                  </tr>
              </table></td>
          </tr>
          <tr>
            <td><img src="images/leftmenubottom.gif" width="226" height="6"></td>
          </tr>
        </table>
        <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#496B7A">
          <tr>
            <td height="201" align="center" bgcolor="#FFFFFF"><a href="http://www.shopex.cn" target="_blank"></a>
                 
          </tr>
      </table></td> 
    <td width="794" valign="top"> <table width="100%" border="0" cellpadding="0" cellspacing="0" background="images/topbg.gif" class="lrborder">
        <tr> 
          <td width="46%" height="55"><img src="images/toppic-1.gif" width="366" height="55"></td>
          <td width="54%" align="right"><img src="images/topinfo-5.gif" width="176" height="55"></td>
        </tr>
      </table>
      <table width="676" height="106" border="0" class="p9gray">
        <tr>
          <td height="68"><%
	
	ResultSet  rs=null;
	String sql="";
	String[] dropSQLs=new String[]{
		"drop table address",	
		"drop table admin",
		"drop table agent",
		"drop table agentbalance",
		"drop table agentdiscount",	
		"drop table agentsites",
		"drop table answermessage",
		"drop table block",
		"drop table commsmsshortcut",	
		"drop table contact",
		"drop table department",
		"drop table engine",
		"drop table friend",	
		"drop table groups",
		"drop table log",
		"drop table logourl",
		"drop table message",	
		"drop table msgstat",
		"drop table mygroup",
		"drop table mysession",
		"drop table operatelog",	
		"drop table orders",
		"drop table pageName",
		"drop table pageview",
		"drop table product",	
		"drop table shortcut",
		"drop table site",
		"drop table sitemonitor",
		"drop table sms",	
		"drop table smsshortcut",
		"drop table user",
		"drop table visitor",
	    "drop table voip" 
	};	
	String[] createSQLs=new String[]{              
		//表的结构 address
		"CREATE TABLE address (ip1 bigint(15) default NULL,ip2 bigint(15) default NULL,"+
  			" country varchar(50) default NULL,city varchar(50) default NULL,UNIQUE KEY ip1_2 (ip1),"+
			" KEY ip1 (ip1),KEY ip2 (ip2) ) TYPE=MyISAM",
		//表的结构 admin
		"CREATE TABLE admin (username varchar(12) NOT NULL default '', password varchar(12) NOT NULL default '',KEY username"+
			" (username)) TYPE=MyISAM",
		//表的结构 agent
		"CREATE TABLE agent (agentId varchar(40) NOT NULL default '',PRIMARY KEY  (agentId),KEY agentId (agentId)) TYPE=MyISAM",
		//表的结构 agentbalance
		"CREATE TABLE agentbalance (agentId varchar(100) NOT NULL default '',balance decimal(9,2) NOT NULL default '0.00',"+
  			"UNIQUE KEY agentId (agentId)) TYPE=MyISAM",
		//表的结构 agentdiscount
		"CREATE TABLE agentdiscount ( agentId varchar(100) NOT NULL default '', productId int(2) NOT NULL default '0',"+
			" discount decimal(9,2) NOT NULL default '0.00') TYPE=MyISAM",
		//表的结构 agentsites
		"CREATE TABLE agentsites ( agentId varchar(40) NOT NULL default '', domainId varchar(20) NOT NULL default '',"+
			" KEY agentId (agentId)) TYPE=MyISAM",
		//表的结构 answermessage
		"CREATE TABLE answermessage ( id varchar(20) NOT NULL default '', onlineMsg text NOT NULL, offlineMsg text NOT NULL,"+
			" leftMsg text NOT NULL, KEY id (id)) TYPE=MyISAM",
		//表的结构 block
		"CREATE TABLE block ( blockId varchar(20) NOT NULL default '', PRIMARY KEY  (blockId), KEY blockId (blockId))"+
			" TYPE=MyISAM",
		//表的结构 commsmsshortcut
		"CREATE TABLE commsmsshortcut ( id int(4) NOT NULL auto_increment, type varchar(10) NOT NULL default '', content "+
			" varchar(160) NOT NULL default '', PRIMARY KEY  (id), KEY id (id)) TYPE=MyISAM AUTO_INCREMENT=1",
		//表的结构 contact
		"CREATE TABLE contact ( id int(11) NOT NULL auto_increment, userId varchar(50) NOT NULL default '',"+
			" name varchar(100) NOT NULL default '', address varchar(200) NOT NULL default '',"+
			" postCode varchar(20) NOT NULL default '', telephone varchar(30) NOT NULL default '', "+
			" mobile varchar(30) NOT NULL default '', companyName varchar(100) NOT NULL default '',"+
			" qq varchar(20) NOT NULL default '', msn varchar(20) NOT NULL default '',  PRIMARY KEY  (id), KEY id (id)"+
			") TYPE=MyISAM AUTO_INCREMENT=1",
		//表的结构 department
		"CREATE TABLE department ( domainId bigint(10) NOT NULL default '0', type varchar(100) NOT NULL default '',"+
			" KEY domainId (domainId)) TYPE=MyISAM",
		//表的结构 engine
		"CREATE TABLE engine ( url varchar(40) NOT NULL default '', skey varchar(20) NOT NULL default '',"+
			" name varchar(40) NOT NULL default '', charset varchar(20) NOT NULL default '', KEY url (url),"+
			" KEY skey (skey)) TYPE=MyISAM",
		//表的结构 friend 
		"CREATE TABLE friend ( id1 varchar(40) NOT NULL default '', id2 varchar(40) NOT NULL default '',"+
			" KEY id1 (id1), KEY id2 (id2)) TYPE=MyISAM",
		//表的结构 groups
		"CREATE TABLE groups ( groupId int(6) NOT NULL auto_increment, groupName varchar(20) NOT NULL default '',"+
			" date date NOT NULL default '0000-00-00', UNIQUE KEY groupName (groupName), KEY groupId (groupId,groupName)"+
			") TYPE=MyISAM AUTO_INCREMENT=1",
		//表的结构 log
		"CREATE TABLE log ( date datetime NOT NULL default '0000-00-00 00:00:00', msg text NOT NULL) TYPE=MyISAM",
		//表的结构 logourl
		"CREATE TABLE logourl ( domainId bigint(10) NOT NULL default '0', floatLogo varchar(200) NOT NULL default '',"+
			" floatFoot varchar(200) NOT NULL default '', guokeLogo varchar(200) NOT NULL default '',"+
			" talkLogo varchar(200) NOT NULL default '', clntLogo varchar(200) NOT NULL default '',"+
			" clntLogo1 varchar(200) NOT NULL default '', voipLogo varchar(200) NOT NULL default '',"+
			" floatLink varchar(200) NOT NULL default '', floatLink1 varchar(200) NOT NULL default '',"+
			" clntWaterImg varchar(200) NOT NULL default '', talkBbsTxt varchar(12) NOT NULL default '',"+
			" talkBbsLink varchar(200) NOT NULL default '', end datetime NOT NULL default '0000-00-00 00:00:00',"+
			" PRIMARY KEY  (domainId), KEY domainId (domainId)) TYPE=MyISAM",
		//表的结构 message
		"CREATE TABLE message ( id bigint(20) NOT NULL auto_increment, type varchar(12) NOT NULL default '',"+
			" fromId varchar(100) NOT NULL default '', toId varchar(100) NOT NULL default '',"+
			" sendTime datetime NOT NULL default '0000-00-00 00:00:00', "+
			" readTime datetime NOT NULL default '0000-00-00 00:00:00', content text NOT NULL,"+
			" isRead char(2) NOT NULL default '0',  UNIQUE KEY id (id), KEY id_2 (id), KEY fromId (fromId),"+
			" KEY toId (toId), KEY isRead (isRead), KEY sendTime (sendTime)) TYPE=MyISAM AUTO_INCREMENT=1",
		//表的结构 msgstat
		"CREATE TABLE msgstat ( domainId varchar(15) NOT NULL default '', month varchar(10) NOT NULL default '',"+
			" creditSpent bigint(20) NOT NULL default '0', msgCount bigint(20) NOT NULL default '0',"+
			" KEY domainId (domainId)) TYPE=MyISAM",
		//表的结构 mygroup
		"CREATE TABLE mygroup ( userId varchar(50) NOT NULL default '', groupId int(6) NOT NULL default '0',"+
			" KEY userId (userId)) TYPE=MyISAM",
		//表的结构 mysession
		"CREATE TABLE mysession ( userId varchar(100) NOT NULL default '', sessionId varchar(80) NOT NULL default '',"+
			" userType varchar(20) NOT NULL default '', start datetime NOT NULL default '0000-00-00 00:00:00',"+
			" ip varchar(100) NOT NULL default '', UNIQUE KEY id (userId)) TYPE=MyISAM",
		//表的结构 operatelog
		"CREATE TABLE operatelog ( operator varchar(100) NOT NULL default '', sfrom varchar(200) NOT NULL default '',"+
			" msg varchar(255) NOT NULL default '', logTime datetime NOT NULL default '0000-00-00 00:00:00') TYPE=MyISAM",
		//表的结构 orders
		"CREATE TABLE orders ( orderId bigint(9) NOT NULL auto_increment, operator varchar(100) NOT NULL default '',"+
			" agentId varchar(100) NOT NULL default '', productId int(2) NOT NULL default '0',"+
			" cost decimal(9,2) NOT NULL default '0.00', info varchar(200) NOT NULL default '',"+
			" destUser varchar(100) NOT NULL default '', destSites varchar(200) NOT NULL default '',"+
			" orderTime datetime NOT NULL default '0000-00-00 00:00:00', tryDays int(2) NOT NULL default '0',"+
			" status char(1) NOT NULL default '1', PRIMARY KEY  (orderId)) TYPE=MyISAM AUTO_INCREMENT=1",
		//表的结构 pageName 
		"CREATE TABLE pageName ( domainId bigint(20) NOT NULL default '0', pageUrl varchar(200) NOT NULL default '',"+
			" name varchar(100) NOT NULL default '', KEY domainId (domainId), KEY pageUrl (pageUrl)) TYPE=MyISAM",
		//表的结构 pageview
		"CREATE TABLE pageview ( id varchar(13) NOT NULL default '', ip varchar(25) NOT NULL default '',"+
			" area varchar(80) NOT NULL default '', province varchar(50) NOT NULL default '',"+
			" fromUrl varchar(255) NOT NULL default '', linkUrl varchar(80) NOT NULL default '',"+
			" mailUrl varchar(80) NOT NULL default '', engine varchar(20) NOT NULL default '',"+
			" keyword varchar(40) NOT NULL default '', url varchar(80) NOT NULL default '',"+
			" page varchar(80) NOT NULL default '', time datetime default '0000-00-00 00:00:00',"+
			" KEY ip (ip), KEY area (area), KEY province (province), KEY fromUrl (fromUrl),"+
			" KEY url (url), KEY time (time), KEY keyword (keyword), KEY engine (engine), KEY mailUrl (mailUrl)) TYPE=MyISAM",
		//表的结构 product
		"CREATE TABLE product ( productId int(2) NOT NULL auto_increment, name varchar(100) NOT NULL default '',"+
			" info varchar(200) NOT NULL default '', price decimal(9,2) NOT NULL default '0.00',"+
			" minDiscount decimal(9,2) NOT NULL default '0.00', UNIQUE KEY productId (productId)) TYPE=MyISAM AUTO_INCREMENT=1",
		//表的结构 shortcut
		"CREATE TABLE shortcut ( Id int(8) NOT NULL auto_increment, domainId bigint(10) NOT NULL default '0',"+
			" catalog varchar(100) NOT NULL default '', content text NOT NULL, PRIMARY KEY  (Id),"+
			" KEY domainId (domainId)) TYPE=MyISAM AUTO_INCREMENT=1",
		//表的结构 site
		"CREATE TABLE site ( domainId bigint(10) NOT NULL auto_increment, domain varchar(200) NOT NULL default '',"+
			" companyName varchar(100) NOT NULL default '', contactName varchar(40) NOT NULL default '',"+
			" contactTel varchar(20) NOT NULL default '', contactEmail varchar(30) NOT NULL default '',"+
			" start datetime NOT NULL default '0000-00-00 00:00:00', end datetime NOT NULL default '0000-00-00 00:00:00',"+
			" credit bigint(20) NOT NULL default '100', floattype varchar(20) NOT NULL default 'blue',"+
			" payLevel varchar(8) NOT NULL default '1', encryption varchar(20) NOT NULL default 'false',"+
			" guoke char(1) NOT NULL default '1', adTalk varchar(255) NOT NULL default '',"+
			" adGuoke varchar(255) NOT NULL default '', adTalkBottom varchar(100) NOT NULL default '',"+
			" link varchar(255) NOT NULL default '', parentId int(10) NOT NULL default '0',"+
			" inviteTime int(3) NOT NULL default '30', domainIds varchar(200) NOT NULL default '',"+
			" adGuokeTop varchar(200) NOT NULL default '', inviteCont varchar(200) NOT NULL default '',"+
			" floatTopY int(3) NOT NULL default '50', UNIQUE KEY domainId (domainId),"+
			" UNIQUE KEY domain (domain), KEY parentId (parentId), KEY domainIds (domainIds), KEY domainId_2 (domainId),"+
			" KEY domain_2 (domain)) TYPE=MyISAM AUTO_INCREMENT=1",
		//表的结构 sitemonitor
		"CREATE TABLE sitemonitor ( siteId varchar(20) NOT NULL default '', domain varchar(80) NOT NULL default '',"+
			" port int(5) NOT NULL default '80', timeOut bigint(10) NOT NULL default '0',"+
			" notifyTimes int(1) NOT NULL default '0', maxNotifyTimes int(1) NOT NULL default '0',"+
			" state varchar(10) NOT NULL default '', adminId varchar(50) NOT NULL default '',"+
			" adminMobile varchar(20) NOT NULL default '', valid varchar(6) NOT NULL default '',"+
			" lastDeadTime datetime NOT NULL default '0000-00-00 00:00:00',"+
			" lastCheckTime datetime NOT NULL default '0000-00-00 00:00:00', UNIQUE KEY domain (domain),"+
			" KEY siteId (siteId)) TYPE=MyISAM",
		//表的结构 sms 
		"CREATE TABLE sms ( domainId varchar(20) NOT NULL default '', smsCredit varchar(20) NOT NULL default '',"+
			" KEY domainId (domainId)) TYPE=MyISAM",
		//表的结构 smsshortcut
		"CREATE TABLE smsshortcut ( id bigint(10) NOT NULL auto_increment, domainId varchar(10) NOT NULL default '',"+
			" type varchar(20) NOT NULL default '', content varchar(160) NOT NULL default '', PRIMARY KEY  (id),"+
			" KEY domainId (domainId)) TYPE=MyISAM AUTO_INCREMENT=1",
		//表的结构 user
		"CREATE TABLE user ( id varchar(40) NOT NULL default '0', password varchar(20) NOT NULL default '',"+
			" type varchar(20) NOT NULL default '', name varchar(20) NOT NULL default '',"+
			" tag varchar(200) NOT NULL default '', visit varchar(5) NOT NULL default '',"+
			" talker varchar(5) NOT NULL default '', domainId varchar(200) NOT NULL default '',"+
			" sex char(2) NOT NULL default '男', workphone varchar(16) NOT NULL default '',"+
			" mobilephone varchar(16) NOT NULL default '', sht varchar(15) NOT NULL default '',"+
			" email varchar(40) NOT NULL default '', qq varchar(12) NOT NULL default '',"+
			" msn varchar(40) NOT NULL default '', address varchar(50) NOT NULL default '',"+
			" lastIp varchar(25) NOT NULL default '', startTime datetime NOT NULL default '0000-00-00 00:00:00',"+
			" state varchar(20) NOT NULL default 'OFFLINE', fromUrl varchar(40) NOT NULL default '',"+
			" lastTime datetime NOT NULL default '0000-00-00 00:00:00', voiphide varchar(5) NOT NULL default 'false',"+
			" mbhide varchar(5) NOT NULL default 'false', voipenabled varchar(5) NOT NULL default 'false',"+
			" mbenabled varchar(5) NOT NULL default 'false', PRIMARY KEY  (id), KEY id (id), KEY domainId (domainId),"+
			" KEY type (type), KEY lastTime (lastTime), KEY workphone (workphone), KEY mobilephone (mobilephone),"+
			" KEY talker (talker)) TYPE=MyISAM",
		//表的结构 visitor
		"CREATE TABLE visitor ( id varchar(13) NOT NULL default '0', password varchar(6) NOT NULL default '',"+
			" type varchar(8) NOT NULL default '', name varchar(20) NOT NULL default '',"+
			" tag char(2) NOT NULL default '', visit char(2) NOT NULL default '',"+
			" talker varchar(20) NOT NULL default '', domainId varchar(8) NOT NULL default '',"+
			" sex char(2) NOT NULL default '', workphone varchar(15) NOT NULL default '',"+
			" mobilephone varchar(15) NOT NULL default '', sht varchar(15) NOT NULL default '',"+
			" email varchar(20) NOT NULL default '', qq varchar(11) NOT NULL default '',"+
			" msn varchar(20) NOT NULL default '', address varchar(30) NOT NULL default '',"+
			" lastIp varchar(25) NOT NULL default '', startTime datetime NOT NULL default '0000-00-00 00:00:00',"+
			" state varchar(10) NOT NULL default '', fromUrl varchar(40) NOT NULL default '',"+
			" lastTime datetime NOT NULL default '0000-00-00 00:00:00', voiphide varchar(5) NOT NULL default '',"+
			" mbhide varchar(5) NOT NULL default '', voipenabled varchar(5) NOT NULL default '',"+
			" mbenabled varchar(5) NOT NULL default '', PRIMARY KEY  (id), KEY id (id), KEY domainId (domainId),"+
			" KEY talker (talker), KEY lastTime (lastTime)) TYPE=MyISAM",
		//表的结构 voip
		"CREATE TABLE voip ( domainId varchar(20) NOT NULL default '', bindTel varchar(20) NOT NULL default '',"+
			" accountId bigint(15) NOT NULL auto_increment, accountPwd varchar(20) NOT NULL default '',"+
			" PRIMARY KEY  (accountId), UNIQUE KEY bindTel (bindTel), KEY domainId (domainId),"+
			" KEY accountId (accountId)) TYPE=MyISAM AUTO_INCREMENT=99900120"
	};
	//删除所有表开始/////////////////////////////////////////////////
	for(int i=0;i<dropSQLs.length;i++){
		//out.println(" "+String.valueOf(i+1)+" "+sqls[i]);
		try{
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 	
			sql=dropSQLs[i];
			db.setSqlQuery(sql);
			db.executeUpdate();
			//out.println("<font color='green'> successful</font><br>");
		}catch(Exception e1){
			//out.print("<font color='red'> failed</font><br>" +e1.getMessage()+"<br>");
		}
	}
	////////////////////////////////////////////////////////////////
	//////////创建所有表///////////////////////////////////////////
	boolean hasError=false;
 	for(int i=0;i<createSQLs.length;i++){		 
		try{
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 	
			sql=createSQLs[i];			
			db.setSqlQuery(sql);
			db.executeUpdate();
			sql=sql.substring(13);
			sql=sql.substring(0,sql.indexOf(" "));
			out.println(" 创建数据表 "+sql+"  成功<br>");
		}catch(Exception e1){	
			hasError=true;		 
			sql=sql.substring(13);
			sql=sql.substring(0,sql.indexOf(" "));
			out.println(" 创建数据表 "+sql+"  失败<br>");
		}
	}
	 
	////////////////////////////////////////////////////////////// 
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
%></td>
        </tr>
        <tr>
          <td height="15" align="center"><%=(hasError)?"数据表安装完成，但部分数据表安装失败，建议返回重新安装":"数据库表安装成功，请点击下一步继续"%></td>
        </tr>
        <tr>
          <td height="15" align="center"><input name="butto" type="button" onClick="window.location='dbinstall1.jsp';" class="inputstyle" value=" 下一步 "></td>
        </tr>
      </table>
    <br></td>
  </tr>
</table>
</body>
</html>