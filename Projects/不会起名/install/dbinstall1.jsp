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
                    <td align="right"><a href="dbinstall.html" class="menu">开始安装</a></td>
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
          <td height="68">
 <p class="p9blue">初始化搜索引擎关键字定位数据</p>
 <%
ResultSet  rs=null;
String sql="";
try{
	sql="TRUNCATE TABLE engine ";
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection();  
	db.setSqlQuery(sql);	
	db.executeUpdate();		
}catch(Exception e1){
	//out.println(e1.getMessage());
}
try{	
	//读取数据文件
	String file=request.getSession().getServletContext().getRealPath(request.getRequestURI());
	//file值 ：D:\100imserver\Tomcat5.5\webapps\ROOT\install\dbinstall2.jsp  
	//out.println(file); 
	file=file.substring(0,file.lastIndexOf("install\\"))+"config\\engine.txt";	
	//out.println(file); 
	BufferedReader in= new BufferedReader(new FileReader(file)); 
	StringTokenizer st=null;   
	String name="";
	String url="";	 
    while(in.ready()) { 
		try{		
			if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 	
			sql=in.readLine(); 
			if(sql.startsWith("#"))
				continue;
			db.setSqlQuery(sql);
			db.executeUpdate();	
			sql=sql.substring(27);
			st=new StringTokenizer(sql," \';)"); 
			url=st.nextToken();
			name=st.nextToken();
			name=st.nextToken();
			name=st.nextToken();
			name=st.nextToken();
			out.println(name+" "+url+" ... 添加成功<br>"); 	
		}catch(Exception e1){
			sql=sql.substring(27);
			st=new StringTokenizer(sql," \',;)"); 
			url=st.nextToken();
			name=st.nextToken();
			name=st.nextToken();
			name=st.nextToken();
			name=st.nextToken();
			out.println(name+" "+url+" ... 添加失败<br>"); 	
		}
	}        
    in.close();	
}catch(Exception e){	
}	 
////////////////////////////////////////////////////////////// 
if(db.getConnection()!=null && !db.isClosed())
	db.closeConnection();
%>
</td>
        </tr>
        <tr>
          <td height="15" align="center"></td>
        </tr>
        <tr>
          <td height="15" align="center"><input name="butto" type="button" onClick="window.location='dbinstall2.html';" class="inputstyle" onClick="window.location='dbinstall2.jsp';" value=" 下一步 "></td>
        </tr>
      </table>
    <br></td>
  </tr>
</table>
</body>
</html>