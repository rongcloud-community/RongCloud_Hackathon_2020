<%
	/**
	 *本文件被客户端调用用来查询网站访问统计信息
	 *
	 *@author: 秦大坤 北京互联时空网络技术有限公司
	 *@time: Apil 22,2007
	 *@last modified:  Apil 22,2007
	*/
%>
<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*,java.util.*,msg.*;" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="webStat" scope="page"  class="msg.WebStat" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
}
-->
</style></head> 
<%
/////////////////////session检测////////////////////////////////////////////////
String vid=request.getParameter("vid");
String sid=request.getParameter("sid");
/**
msg.MySession mySession=new msg.MySession(vid);
String sessionId=mySession.getMySession().getSessionId();
if(sessionId==null || vid==null || !sessionId.equals(sid)){
	out.println("<script language=jscript>alert('你没有登陆或会话已经过期，请重新登陆。');location.assign('index.htm');</script>");			
		return;	
}
**/
///////////////////////////////////////////////////////////////////////////////		
%>

<%
	String theFirstDomainId=userManager.getUserDomainId(vid);
	if(theFirstDomainId.indexOf(",")>0)
		theFirstDomainId=theFirstDomainId.substring(0,theFirstDomainId.indexOf(","));
	int payLevel = userManager.getSitePayLevel(theFirstDomainId); //是否为免费客户
	if(payLevel<=0) 
		out.print("<font color=\'red\'>您使用的是标准版，不能使用本功能，如果需要，请申请专业版以上版本。</font>");
%> 
<%	 
	String scomClient = vid;		

	String period=request.getParameter("period");
	String condition=request.getParameter("condition");
	String submit=request.getParameter("submit");
	String url=request.getParameter("url");
	String action=request.getParameter("action");
	//url="www.3yan.com";
	String sql="";	
	ResultSet rs=null;
	String title="";
if(payLevel>=1){
	if(submit!=null){
		String start=null,end=null;		 
		if(period.equals("today")){
			 start=webStat.getTimeString("startOfToday");
			 end=webStat.getTimeString("endOfToday");		
		}	
		else if(period.equals("yesterday")){
			 start=webStat.getTimeString("startOfYesterday");
			 end=webStat.getTimeString("endOfYesterday");		
		}	
		else if(period.equals("month")){
			 start=webStat.getTimeString("startOfThisMonth");
			 end=webStat.getTimeString("endOfThisMonth");		
		}		
		if(condition.equals("area")){
			sql="SELECT count(area) AS total,area FROM pageview WHERE ";
			title="来访地区统计报告";	
		}
		else if(condition.equals("province")){
			sql="SELECT count(province) AS total,province FROM pageview WHERE ";
			title="来访地区(省市)统计报告";	
		}
		else if(condition.equals("engine")){
			sql="SELECT count(engine) AS total,engine FROM pageview WHERE engine<>\"\" and ";
			title="来自搜索引擎统计报告";	
		}
		else if(condition.equals("keyword")){
			sql="SELECT count(keyword) AS total,keyword FROM pageview WHERE keyword<>\"\" and ";
			title="来自搜索引擎关键字统计报告";	
		}
		else if(condition.equals("linkUrl")){
			sql="SELECT count(linkUrl) AS total,linkUrl FROM pageview WHERE linkUrl<>\"\" and ";
			title="来自广告链接统计报告";	
		}
		else if(condition.equals("mailUrl")){
			sql="SELECT count(mailUrl) AS total,mailUrl FROM pageview WHERE mailUrl<>\"\" and ";
			title="来访群发邮件链接统计报告";	
		}
		else if(condition.equals("page")){
			sql="SELECT count(page) AS total,page FROM pageview WHERE ";
			title="页面访问频率统计报告";	
		}
		else if(condition.equals("ip")){
			sql="SELECT count(ip) AS total,ip FROM pageview WHERE ";
			title="页面访问频率统计报告";	
		}
		else if(condition.equals("id")){
			sql="SELECT count(id) AS total,id FROM pageview WHERE ";
			title="访问者访问频率统计报告";	
		}
		else if(condition.equals("new")){
			sql="SELECT count(id) AS total,area FROM pageview WHERE ";
			title="新来访者统计报告";	
		}
		if(period.equals("today")){
			 title +=" 时段：今天";
		}	
		else if(period.equals("yesterday")){
			 title +=" 时段：昨天";
		}	
		else if(period.equals("month")){
			 title +=" 时段：本月";
		}	
		if(start!=null && end!=null && !condition.equals("new"))
			sql +=" url = \""+url+"\" and time>=\""+start+"\" and time<=\""+end+
				  "\" GROUP BY "+condition+" ORDER BY total DESC";
		else if(condition.equals("new")){
			if(period.equals("periodAll"))
				sql +=" url = \""+url+"\" GROUP BY id ORDER BY id DESC";	
			else{
				String s="";
				if(period.equals("today")) 
			  		sql +=" url = \""+url+"\" and id>=\""+String.valueOf(webStat.getTimeInMillis("startOfToday"))+"\" and id<=\""+
					  String.valueOf(webStat.getTimeInMillis("endOfToday"))+"\" GROUP BY id ORDER BY id DESC";				 
				else if(period.equals("yesterday")) 
			  		sql +=" url = \""+url+"\" and id>=\""+String.valueOf(webStat.getTimeInMillis("startOfYesterday"))+
					"\" and id<=\""+String.valueOf(webStat.getTimeInMillis("startOfYesterday"))+"\" GROUP BY id ORDER BY id DESC"; 
				else if(period.equals("month"))				 	
					sql +=" url = \""+url+"\" and id>=\""+String.valueOf(webStat.getTimeInMillis("startOfThisMonth"))+
					"\" and id<=\""+String.valueOf(webStat.getTimeInMillis("endOfThisMonth"))+"\" GROUP BY id ORDER BY id DESC";				
			}			   
		}
		else			
			sql +=" url = \""+url+"\" GROUP BY "+condition+" ORDER BY total DESC";			 
	}	 
	if(submit==null && action!=null && action.equals("allRecords")){
		url=request.getParameter("url0");
		sql="select fromUrl,area,ip,engine,keyword,page,time from pageview WHERE url = \""+url+"\" ORDER BY time DESC";	
	}
	try{
		if(db.getConnection()==null || db.isClosed())			 
				db.setConnection(); 
		db.setSqlQuery(sql);	
		rs=db.getResult();				
	}catch(Exception e){}
}	
	String domains=userManager.getUserDomain(scomClient); 
 	if(url==null){		 
		url=domains;		 
		int index=url.indexOf(",");
		if(index>0)
			url=url.substring(0,index);		
	}
%>
<body>
<table width="793" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
  <tr>
    <td width="787" bgcolor="#E4F2FF">网站统计报告： <a href="webStat_CCMEDIA.jsp">进入精准通统计页面</a></td>
  </tr>
</table>
<br />
<table width="793" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4" class="content9">
<form id="form1" name="form1" method="post" action="">
  <tr>
    <td width="192" ><a  href="?url0=<%=(url!=null)?url:""%>&action=allRecords&vid=<%=vid%>&sid=<%=sid%>">全部记录</a> 
	<a href="webStatForExcel.jsp?submit=<%=(submit!=null)?submit:""%>&period=<%=(period!=null)?period:""%>
	&condition=<%=(condition!=null)?condition:""%>&url=<%=(url!=null)?url:""%>&action=<%=(action!=null)?action:""%>">导出报告(XLS)</a></td>    
    <td width="186"><label>
      <select name="condition">
        <option value="area" <%=(condition!=null && condition.equals("area"))?"selected":""%>>来访地区统计报告</option>
		<option value="province" <%=(condition!=null && condition.equals("province"))?"selected":""%>>来访地区(省市)统计报告</option>
        <option value="engine" <%=(condition!=null && condition.equals("engine"))?"selected":""%>>来访搜索引擎统计报告</option>
        <option value="keyword" <%=(condition!=null && condition.equals("keyword"))?"selected":""%>>来访关键字统计报告</option>
        <option value="linkUrl" <%=(condition!=null && condition.equals("linkUrl"))?"selected":""%>>来访链接统计报告</option>
        <option value="mailUrl" <%=(condition!=null && condition.equals("mailUrl"))?"selected":""%>>来访群发邮件统计报告</option>
        <option value="page" <%=(condition!=null && condition.equals("page"))?"selected":""%>>页面访问频率统计报告</option>
        <option value="ip" <%=(condition!=null && condition.equals("ip"))?"selected":""%>>来访IP次数统计报告</option>
        <option value="id" <%=(condition!=null && condition.equals("id"))?"selected":""%>>访问者次数统计报告</option>
        <option value="new" <%=(condition!=null && condition.equals("new"))?"selected":""%>>新来访者统计报告</option>
      </select>
    </label></td>
    <td width="105">
      <label>
        <select name="period" >
          <option value="periodAll" <%=(period!=null && period.equals("periodAll"))?"selected":""%>>全部数据</option>
          <option value="today" <%=(period!=null && period.equals("today"))?"selected":""%>>今天</option>
          <option value="yesterday" <%=(period!=null && period.equals("yesterday"))?"selected":""%>>昨天</option>
          <option value="month" <%=(period!=null && period.equals("month"))?"selected":""%>>本月</option>
        </select>
      </label>    </td>
    <td width="152" >
	<select  name="url" >
<%			 
			StringTokenizer st = new StringTokenizer(domains,",");			 
			String t="";
			while(st.hasMoreTokens()){			
				t=st.nextToken();
%>            	
				<option value="<%=t%>" <%=(url!=null && url.equals(t))?"selected":""%>><%=t%></option> 
			<%}%>
	    </select>	
	</td>
    <td width="148" ><label>
      <input type="submit" name="submit" value="提交" />
    </label></td>    
  </tr>
  </form>
</table>
<%
/**
if(action!=null && action.equals("allRecords")){
out.println("sql:"+sql);
out.println(submit+" "+condition+" "+action+" "+period);
return;
}
**/
%>
<!---start 地区、关键字、搜索引擎、链接和邮件群发统计报告--->
<%	if(submit!=null && rs!=null){
		int totalOfVisitor=0;
		int totalOfArea=0;
		while(rs.next()){
			totalOfArea++;
			totalOfVisitor +=rs.getInt("total");
		}
		rs.beforeFirst();		
%>
<table width="793" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="content9">
  <tr>
    <td height="25" colspan="5" bgcolor="#E7F3FF" ><%=title%></td>
  </tr>
  <tr>
    <td height="25" colspan="5" bgcolor="#FFFFFF">页面点击数量(PV)：<%=String.valueOf(totalOfVisitor)%></td>
  </tr>
  <tr>
    <td height="25" colspan="5" bgcolor="#FFFFFF">统计对象组数量：
	<%=String.valueOf(totalOfArea)%><%=(condition.equals("new"))?"(统计时段内新来访人数)":""%></td>
  </tr>
  <tr>
    <td width="103" height="25" align="center" valign="middle" bgcolor="#FFFFFF">次序</td>
    <td width="246" align="center" valign="middle" bgcolor="#FFFFFF">来自</td>
    <td width="85" align="center" valign="middle" bgcolor="#FFFFFF">点击数量</td>	
	<td width="158" align="center" valign="middle" bgcolor="#FFFFFF">比例</td>
	<td width="195" align="center" valign="middle" bgcolor="#FFFFFF">图示</td>
  </tr>
  <%
int intPageSize = 20;//设置一页显示的记录数//设置最好是7的倍数，下面显示数据每行7个。
int intRowCount = 0;//记录总数
int intPageCount = 0;//总页数
int intPage = 0;	 //待显示页码
String strPage = request.getParameter("page");//取得显示的记录数;
if(rs !=null){
			if(strPage==null || strPage.equals("")){
				intPage = 1;//当前页为空时，默认为第1页
			}else{
				intPage = Integer.parseInt(strPage);
				if(intPage<1)
				{
					intPage=1;//当前页小于1时，默认为第1页
				}
			}
			rs.last();		//移到最后
			intRowCount = rs.getRow();//得到记录总数
			intPageCount = (intRowCount+ intPageSize-1)/intPageSize;//记录总页数
			rs.beforeFirst();
			if(intPage>intPageCount)
				intPage = intPageCount;//调整待显示的页面
			
			if(intPageCount>0)
			{
				int counter=0;
				double percent=0.0d;
				String percentStr="";
				int index=0;
				rs.absolute((intPage-1)*intPageSize+1);			
				String condition1="";		 
				for(int i = 0;i<intPageSize && !rs.isAfterLast();i++)
				{	
					 counter++;
					 percent=rs.getDouble("total") / (double)totalOfVisitor * 100.0d;
					 percentStr=String.valueOf(percent);
					 if(percentStr.length()-(index=percentStr.indexOf(".")) > 3)
					 	percentStr=percentStr.substring(0,index+3);
					condition1=rs.getString((condition.equals("new"))?"area":condition);
					if(condition1.indexOf("%")>=0)
						condition1=Escape.unescape(condition1);
%>
  <tr>
    <td height="20" align="left" valign="middle" bgcolor="#FFFFFF"><%=counter%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=condition1%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("total")%></td>    
    <td align="right" valign="middle" bgcolor="#FFFFFF"><%=percentStr%>%</td>    
	<td align="left" valign="middle" bgcolor="#FFFFFF"><img height="10" src="../img/zhu.gif" width="<%=percentStr%>" /></td>
  </tr>
  <%			rs.next();
				}
			}
	}
 
%>
  <tr>
    <td height="25" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
    <td align="center" colspan="4" valign="middle" bgcolor="#FFFFFF"> 第<%=intPage%>页/共<%=intPageCount%>页&nbsp;&nbsp;
	<a href="?page=<%=1%>&submit=<%=submit%>&period=<%=period%>&condition=<%=condition%>&url=<%=url%>&vid=<%=vid%>&sid=<%=sid%>">第一页</a>
<%
  if(intPage>1)
  {
  %>
        <a href="?page=<%=intPage-1%>&submit=<%=submit%>&period=<%=period%>&condition=<%=condition%>&url=<%=url%>&vid=<%=vid%>&sid=<%=sid%>">上一页</a>
        <%
  }
  %>
      &nbsp;&nbsp;
      <%
  if(intPage<intPageCount)
  {
  %>
        <a href="?page=<%=intPage+1%>&submit=<%=submit%>&period=<%=period%>&condition=<%=condition%>&url=<%=url%>&vid=<%=vid%>&sid=<%=sid%>">下一页</a>
      <%
  }
  
  %>
  <a href="?page=<%=intPageCount%>&submit=<%=submit%>&period=<%=period%>&condition=<%=condition%>&url=<%=url%>&vid=<%=vid%>&sid=<%=sid%>">最后一页</a>  </td>
  </tr>
  <tr>
    <td height="25" colspan="5" bgcolor="#FFFFFF">注：统计数据源于系统接受到一个成功的页面点击，同页同日刷新记录一次。<br /> 
    客户端没有设置启用JAVASCRIPT和COOKIE的点击不在本统计中，本统计仅供参考。</td>
  </tr>
</table>
<%}
if(submit!=null && (rs==null || (rs.last() && rs.getRow()<=0)) )
	out.println("目前没有统计数据，请稍后再试。");
%>
<!---end 地区、关键字、搜索引擎、链接和邮件群发统计报告--->		
<!---start 全部访问记录--->
<%	if(submit==null && action!=null && action.equals("allRecords") && rs!=null){				 
		rs.last();
		int totalOfVisitor=rs.getRow();			 
		rs.beforeFirst();		
%>
<table width="793" border="0" cellpadding="0" cellspacing="1" bgcolor="#B5CDFF" class="content9">
  <tr>
    <td height="25" colspan="8" bgcolor="#E7F3FF">所有访问记录－－－页面点击数量(PV)：<%=String.valueOf(totalOfVisitor)%> 排序：按访问时间倒序</td>
  </tr>  
  <tr>
    <td width="34" height="25" align="center" valign="middle" bgcolor="#FFFFFF">次序</td>
    <td width="180" align="center" valign="middle" bgcolor="#FFFFFF">地区</td>
    <td width="94" align="center" valign="middle" bgcolor="#FFFFFF">IP</td>
    <td width="130" align="center" valign="middle" bgcolor="#FFFFFF">来自</td>
    <td width="50" align="center" valign="middle" bgcolor="#FFFFFF">搜索</td>
    <td width="48" align="center" valign="middle" bgcolor="#FFFFFF">关键字</td>
    <td width="105" align="center" valign="middle" bgcolor="#FFFFFF">访问页面</td>
	<td width="130" align="center" valign="middle" bgcolor="#FFFFFF">时间</td>
  </tr>
  <%
int intPageSize = 20;//设置一页显示的记录数//设置最好是7的倍数，下面显示数据每行7个。
int intRowCount = 0;//记录总数
int intPageCount = 0;//总页数
int intPage = 0;	 //待显示页码
String strPage = request.getParameter("page");//取得显示的记录数;
if(rs !=null){
			if(strPage==null || strPage.equals("")){
				intPage = 1;//当前页为空时，默认为第1页
			}else{
				intPage = Integer.parseInt(strPage);
				if(intPage<1)
				{
					intPage=1;//当前页小于1时，默认为第1页
				}
			}
			rs.last();		//移到最后
			intRowCount = rs.getRow();//得到记录总数
			intPageCount = (intRowCount+ intPageSize-1)/intPageSize;//记录总页数
			rs.beforeFirst();
			if(intPage>intPageCount)
				intPage = intPageCount;//调整待显示的页面
			
			if(intPageCount>0)
			{
				int counter=0;				 
				String from="";
				rs.absolute((intPage-1)*intPageSize+1);	
				String keyword1="";				 
				for(int i = 0;i<intPageSize && !rs.isAfterLast();i++)
				{	
					 counter++;	
	try{					 	
					 from=	rs.getString("fromUrl");	
					 if(from!=null && from.indexOf("%")>=0)	
					 	from=	msg.Escape.unescape(from);	
					keyword1=rs.getString("keyword");
					if(keyword1.indexOf("%")>=0)
						keyword1=	msg.Escape.unescape(keyword1);			   
%>
  <tr>
    <td height="20" align="left" valign="middle" bgcolor="#FFFFFF"><%=counter%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("area")%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("ip")%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><a href='<%=from%>' target="_blank"><%=(from.length()>22)?from.substring(0,21)+"...":from%></a><%=(from==null || from.length()==0)?"输入或收藏夹":""%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("engine")%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=keyword1%></td>
    <td align="left" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("page")%></td>
    <td align="right" valign="middle" bgcolor="#FFFFFF"><%=rs.getString("time")%></td>    
  </tr>
  <%			rs.next();
  	}catch(Exception ee){}
				}
			}
	}
 
%>
  <tr>
    <td height="25" align="right" valign="middle" bgcolor="#FFFFFF">&nbsp;</td>
    <td align="center" colspan="7" valign="middle" bgcolor="#FFFFFF"> 第<%=intPage%>页/共<%=intPageCount%>页&nbsp;&nbsp;
	<a href="?page=1&action=allRecords&url0=<%=url%>&vid=<%=vid%>&sid=<%=sid%>">第一页</a>
<%
  if(intPage>1)
  {
  %>  		
        <a href="?page=<%=intPage-1%>&action=allRecords&url0=<%=url%>&vid=<%=vid%>&sid=<%=sid%>">上一页</a>		
        <%
  }
  %>
      &nbsp;&nbsp;
      <%
  if(intPage<intPageCount)
  {
  %>
        <a href="?page=<%=intPage+1%>&action=allRecords&url0=<%=url%>&vid=<%=vid%>&sid=<%=sid%>">下一页</a>
      <%
  }
  
  %>  
  <a href="?page=<%=intPageCount%>&action=allRecords&url0=<%=url%>&vid=<%=vid%>&sid=<%=sid%>">最后一页</a>
  </td>
  </tr>
</table>
<%}
if(action!=null && action.equals("allRecords") && (rs==null || (rs.last() && rs.getRow()<=0)) )
	out.println("目前没有统计数据，请稍后再试。");
%>
<!---end 全部访问记录--->	
<p>&nbsp; </p>

</body>

<%if(db.getConnection()!=null && !db.isClosed())
				db.closeConnection();	%>
</html>
