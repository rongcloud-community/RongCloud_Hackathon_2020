<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage="" %>
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<%
int counter=0;
String companyName="";
String domain="";
String start="";
int maxId=0;
 
String maxDomainId=request.getParameter("maxDomainId");
String sql = "";
ResultSet rs = null;
sql = "select domainId,domain,companyName,start from site order by start DESC limit 0,20";
if(maxDomainId!=null)
	sql = "select domainId,domain,companyName,start from site where domainId>"+maxDomainId+" order by start DESC limit 0,20";
db.setSqlQuery(sql);
if(db.getConnection()==null || db.isClosed())			 
	 db.setConnection(); 
rs=db.getResult();

if(maxDomainId!=null){
	String result="";
	while(rs!=null && rs.next()){
		if(rs.getInt("domainId")>maxId)
				maxId=rs.getInt("domainId");
			companyName=rs.getString("companyName");	
			domain=rs.getString("domain");
			if(companyName==null || companyName.equals(""))
				companyName=domain;
			if(companyName!=null && companyName.length()>15)
				companyName=companyName.substring(0,15)+"...";	
			start=rs.getString("start");
			if(start!=null && start.length()>6)	
				start=start.substring(6,start.indexOf(" "));
	%><a href="http://<%=domain%>" target="_blank"  title="<%=domain%>"><%=companyName%></a>[<%=start%>]<br>
	<%}%>maxId=<%=String.valueOf(maxId)%><% 
	if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
	return;	
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML><HEAD>
<title></title>  
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<!--<meta http-equiv=refresh content="120"> -->
<META content="MSHTML 6.00.2900.3020" name=GENERATOR>
<style type="text/css">
<!--
.STYLE2 {color: #FFFFFF}
.STYLE3 {color: #FF9900}
.STYLE4 {color: #000000}
body,td,th {
	font-family: 宋体;
	font-size: 12px;
	color: #000000;
}
a:link {
	text-decoration: none;
	color: #000099;
}
a:visited {
	text-decoration: none;
	color: #000099;
}
a:hover {
	text-decoration: none;
	color: #FF6600;
}
a:active {
	text-decoration: none;
}
body {
	background-repeat: no-repeat;
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-color: #CEEBFE;
}
.STYLE9 {color: #666666}
.STYLE12 {color: #66ABEA}
-->
</style>
 

</HEAD>
<BODY>
<TABLE width="180" border=0 align="left" cellPadding=0  cellspacing="0" bgcolor="#CEEBFA"  >
  <TBODY>
  <TR>
    <TD width="180" 
      bgcolor="#E7F3FF" align="center">最新注册的网站</TD>
  </TR>
  <TR>
    <TD height='10' 
      vAlign=top ></TD>
  </TR>

  
  <TR>
    <TD id='content' width="180" height='10' > 
	<marquee width="210" id='mid' height="95" direction="up" onMouseOver="mid.stop()" onMouseOut="mid.start()" scrollamount="1" scrolldelay="0" style="background-color:transparent;font-size:10pt;color:green;">
	<%
		while( rs!=null && rs.next()){
			counter++;
			if(rs.getInt("domainId")>maxId)
				maxId=rs.getInt("domainId");
			companyName=rs.getString("companyName");	
			domain=rs.getString("domain");
			if(companyName==null || companyName.equals(""))
				companyName=domain;
			if(companyName!=null && companyName.length()>15)
				companyName=companyName.substring(0,15)+"...";	
			start=rs.getString("start");
			if(start!=null && start.length()>6)	
				start=start.substring(6,start.indexOf(" "));
	%>
			<a href="http://<%=domain%>" target="_blank"  title="<%=domain%>"><%=companyName%></a>[<%=start%>]<br>
	<%}%>
	</marquee>
	</TD>
  </TR>
 
<TR>
    <TD height='10' ></TD>
  </TR>
 
<%
if(db.getConnection()!=null && !db.isClosed())
		db.closeConnection();
%>	
<TR>
    <TD width="180" align="right" 
      vAlign=top   style="cursor:hand" onClick="window.open('clientManage.jsp?action=group','ydmanage')">&nbsp;  </TD>
  </TR>
</TBODY></TABLE>
<script type="text/javascript">
function refresh()
{
	var obj=null;
	var maxId="<%=String.valueOf(maxId)%>";
	var url="latestSites.jsp?maxDomainId="+maxId;
	//alert(url);
	try{obj = new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){ obj = new XMLHttpRequest();}
	if(obj){
		obj.onreadystatechange=function()
		{ 
			if(obj.readyState==4)
			{
				if (obj.status==200)
				{
					var sResult=obj.responseText;	
					try{						
						if(document.getElementById("mid")) {
							var index=sResult.indexOf("maxId=");
							maxId=sResult.substring(index+6);
							var cont=sResult.substring(0,index);
							document.getElementById("mid").innerHTML=cont+document.getElementById("mid").innerHTML;
						}
					}catch(e){}
					//alert(sResult);
					obj=null;		 
				}
			}
		}	 
		obj.open("GET",url,false);
		obj.send();
	}
	window.setTimeout('refresh()',120000);
}
window.setTimeout('refresh()',120000);
</script>
</BODY></HTML>