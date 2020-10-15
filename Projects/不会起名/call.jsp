<%@page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*,msg.*"  %>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<jsp:useBean id="db" scope="page"  class="msg.DbConn" />
<HTML xmlns="http://www.w3.org/1999/xhtml"><HEAD><TITLE>无标题文档</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<STYLE type=text/css>BODY {
	MARGIN: 0px
}
</STYLE>
<LINK href="call_files/style_index.css" type=text/css rel=stylesheet>
<META content="MSHTML 6.00.3790.1830" name=GENERATOR>
<%
	String sql = "";
	ResultSet rs = null;
	String vid=request.getParameter("vid");
	String toid=request.getParameter("toid");
	String frmurl=request.getParameter("frmurl"); 	
	String realFrmurl=request.getHeader("Referer");
	//out.println(realFrmurl);
	if(realFrmurl==null){
		out.println("wrong Referer..."+frmurl);
		return;
	}
	realFrmurl=Keyword.getCleanURL( realFrmurl );
	if(toid.indexOf("admin@100im_cn")>=0){ //转为后台测试用
		frmurl="www.100im.cn";
		realFrmurl="www.100im.cn";
	}	 
	//判断传过来的url和地址栏的url是否为同一个网站
	if(frmurl==null || realFrmurl==null || !frmurl.equals(realFrmurl)){
		//out.println("wrong url....");
		//return;
	}
	//判断数据库中是否有该网站
	sql="select domainId from site where domain=\""+frmurl+"\"";
	 
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	db.setSqlQuery(sql);
	rs=db.getResult();
	if(rs!=null && rs.next()){		
	}
	else{
		if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
		out.println("wrong url......");
		return;
	
	}
//out.println(frmurl+" "+realFrmurl);	
	if(toid!=null && toid.equals("999"))
		toid=userManager.getFreeKefuId(frmurl);
	msg.User user=new msg.User(toid);
	String companyName=user.getCompanyName();
	String username=user.getName();
	String workphone=user.getWorkphone();
%> 
<script id="down" src=""></script>
<script language="javascript">

var vid="<%=vid%>";
var toid="<%=toid%>";
function sendvoip()
	{   
		var phoneNum=document.getElementById("phoneNum");
		if(phoneNum.value=="")
		{
			alert("必须输入有效电话号码");
			return;
		}
		//areacode.value="";phone.value="";ext.value="";
		//document.getElementById("voipform1").style.display="none";
		var url="http://webim.100im.cn/msgManager.jsp?a=200&vid="+vid+"&toid="+toid+"&phone="+escape(phoneNum.value);
		//alert(url); 
		//document.getElementById("voipstatus").innerHTML='电话请求已发送,请等待...';
		document.getElementById("down").src=url;
		//insertMsg("",2,formatdate(),"电话请求已发送,请等待...");
	}
	 
</script>	
</HEAD>
<%

String voipLogo=null;
try{
 
	sql="select voipLogo from logourl,site where site.domainId=logourl.domainId and domain=\""+frmurl+"\"";
	if(db.getConnection()==null || db.isClosed())			 
		db.setConnection(); 
	db.setSqlQuery(sql);
	rs=db.getResult();
	if(rs!=null && rs.next())
		voipLogo=rs.getString("voipLogo");		 
	if(db.getConnection()!=null && !db.isClosed())
			db.closeConnection();
}catch(Exception e){
	 	
}
%>
<BODY >
<TABLE class=xiao height=396 cellSpacing=0 cellPadding=0 width=564 
      border=0>
  <TBODY>
    <TR>
      <TD class=xiao vAlign=top align=right colSpan=2 height=225><IMG 
            height=225 src="call_files/call_7.jpg" width=181></TD>
      <TD class=conn9 vAlign=top align=left width=192 
          background=call_files/call_8.jpg height=225><FORM id=form1 name=form1 action="" method=post>
        <TABLE class=conn9 height=119 cellSpacing=0 cellPadding=0 width=190 
            border=0>
          <TBODY>
            <TR>
              <TD height=30>&nbsp;</TD>
              <TD>&nbsp;</TD>
            </TR>
            <TR>
              <TD  height=42 colspan=2><%=(companyName==null || companyName.equals(""))?frmurl:companyName%><br>
			  <%=(username==null)?"":username%>:<%=(workphone==null||workphone.equals(""))?"对方未设置电话":workphone%></TD>
            </TR>
            
            <TR>
              <TD height=45><INPUT style="BACKGROUND-COLOR: #ffff99" size=15 name="phoneNum" id="phoneNum" ></TD>
				  <TD vAlign=bottom align=middle rowSpan=2><IMG height=39 
                  src="call_files/call2_12.jpg" width=40 onClick="sendvoip();"></TD>
            </TR>
          </TBODY>
        </TABLE>
      </FORM></TD>
      <TD colSpan=2 align=right vAlign=top background="call_files/call_9.jpg" ><TABLE cellSpacing=0 cellPadding=0 width=119 align=center 
              border=0>
        <TBODY>
          <TR>
            <TD class=conn10 vAlign=center align=left height=35><IMG 
                  height=18 src="call_files/call_12.jpg" width=101></TD>
          </TR>
          <TR>
            <TD vAlign=center align=left height=30  class=conn9>1、输入自己的号码</TD>
          </TR>
          <TR>
            <TD class=titlebottom vAlign=center align=left 
                  height=65>手机前请加拔“0”，如 0135 8885 8523<BR>
              座机前请加拔区号，如 010 
              51668337</TD>
          </TR>
          <TR>
            <TD height=30 align=left vAlign=center class="conn9">2、点击绿色电话图标</TD>
          </TR>
          <TR>
            <TD class=titlebottom vAlign=center align=left 
                  height=60>您拔打出的电话可能有短暂延时，会在一分钟内接通，请稍等</TD>
          </TR>
        </TBODY>
      </TABLE></TD>
    </TR>
    <TR>
      <TD vAlign=top align=middle background=call_files/call_11.jpg 
          height=157></TD>
      <TD class=conn9 vAlign=bottom align=right colSpan=3 height=157><TABLE height=150 cellSpacing=0 cellPadding=0 width=545 border=0>
        <TBODY>
          <TR>
            <TD colSpan=2 height=110>&nbsp;</TD>
          </TR>
          <TR>
            <TD vAlign=bottom align=middle width=445 height=40><SPAN 
                  class=titlebottom>Copyright&copy;2006-2007 100im.cn. All Rights 
              Reserved 　京ICP备040834号</SPAN></TD>
            <TD vAlign=bottom align=right width=100><IMG height=31 
                  src="<%=(voipLogo!=null && !voipLogo.equals(""))?"http://"+voipLogo:"call_files/call_15.jpg"%>" 
                width=75>&nbsp;&nbsp;&nbsp;&nbsp;</TD>
          </TR>
        </TBODY>
      </TABLE></TD>
      <TD background=call_files/call_19.jpg height=157></TD>
    </TR>
    <TR>
      <TD class=xiao vAlign=top align=middle width=10 
          background=call_files/call_11.jpg height=1></TD>
      <TD class=xiao width=171 height=1></TD>
      <TD class=xiao height=1></TD>
      <TD class=xiao vAlign=bottom align=right width=184 height=1></TD>
      <TD class=xiao width=7 background=call_files/call_19.jpg 
        height=1></TD>
    </TR>
    <TR>
      <TD vAlign=top align=left height=14><IMG height=14 
            src="call_files/call_20.jpg" width=10></TD>
      <TD vAlign=top align=left background=call_files/call_21.jpg 
          colSpan=3></TD>
      <TD vAlign=top align=right width=7><IMG height=14 
            src="call_files/call_23.jpg" 
  width=7></TD>
    </TR>
  </TBODY>
</TABLE>
</BODY></HTML>
