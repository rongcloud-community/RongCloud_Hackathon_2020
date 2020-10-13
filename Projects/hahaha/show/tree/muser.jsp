<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<!-- saved from url=(0092)http://m3.mail.qq.com/cgi-bin/addressbook/addr_listall?sid=0&level=1&tmp=0.09305931865357847 -->
<HTML><HEAD><TITLE>用户授权 - 银河IT教育</TITLE>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<SCRIPT language=javascript src="../../../js/ping.js"></SCRIPT>

<SCRIPT language=JavaScript src="../../../js/all.js"></SCRIPT>

<SCRIPT language=JavaScript type=text/javascript>
	function ConfirmMulSel()
	{
		 return (CBCount("AddrID") < 2) || confirm("您确定要删除这些联系人？");
	}
</SCRIPT>
<LINK href="comm.css" type=text/css rel=stylesheet><LINK 
href="skin.css" type=text/css rel=stylesheet>
<STYLE type=text/css>
.txt_title_tab {
	WIDTH: 120px
}
.S1 {
	WIDTH: 300px
}
.T_level {
	DISPLAY: block; FLOAT: right; MARGIN: 5px 9px 0px; WIDTH: 50px
}
.txt_title_tab {
	WIDTH: 84px; TEXT-ALIGN: center
}




</STYLE>

<META content="MSHTML 6.00.2800.1106" name=GENERATOR></HEAD>
<BODY class=tbody id=list>
<DIV style="CLEAR: both; HEIGHT: 20px">
<SCRIPT>var g_idx=0</SCRIPT>

<DIV class=txt_title_tab>用户授权</DIV>
<FORM name=searchfrm action=/cgi-bin/addressbook/addr_listall?sid=0 
method=get>
  <DIV style="MARGIN-TOP: -1px; FLOAT: right">
  <INPUT class=txt style="WIDTH: 200px" name=FilterStr>&nbsp;
  <INPUT class=button onClick="if (Trim(FilterStr.value)=='') fMessageBox(msgAddrSearchErr);else searchfrm.submit()" type=button value=搜索用户> 
</DIV></FORM></DIV>
<FORM name=frm action="/yinheMail/accredituser.do?method=accredituser" method=post target=_self>
  <table class=toolbg cellspacing=0 cellpadding=2 width="100%" border=0>
    <tbody>
      <tr>
        <td class="barspace toolbgline" nowrap align=left width="80%">&nbsp;&nbsp;</td>
      </tr>
    </tbody>
  </table>
  <DIV class=M>
  <table width="806" align="left">
    <tr align="center" class="table_title">
      
      <td colspan="3">&nbsp;</td>
      </tr>
    <tr align="center">
     
      <td width="192"><label>
        <input type="text" class=txt name="username" value="<%=request.getParameter("username") %>">
      </label></td>
      <td width="109"><label>
        <select name="purview">
          <option>normal</option>
          <option>vip</option>
        </select>
        </label></td>
      <td width="489" align="left" bordercolor="#CCCCCC"><label>
        <input type="submit" name="Submit" class=button value="确 定">
      </label></td>
    </tr>
	<tr align="center" class="table_title">
      
      <td colspan="3">&nbsp;</td>
      </tr>
  </table>
</DIV>

<TABLE class=list_btline cellSpacing=0 cellPadding=2 width="100%">
  <TBODY>
  
  <TR class=toolbg>
    <TD class=toolbgline noWrap align=right width="98%">&nbsp;</TD>
    </TR></TBODY></TABLE>
</FORM>
<SCRIPT language=JavaScript>
SwitchFolder('folder_contact');
PGV();
</SCRIPT>

<SCRIPT>
	InitCheckBox("AddrID");
	function IncludeQQ()
	{
		
		try
		{
			var s=document.getElementsByTagName("INPUT");
			var selcnt=0,selqqcnt=0;
			for(var i=0,len=s.length;i<len;i++)
			{
				if(s[i].type=="checkbox" && s[i].name=="AddrID" &&s[i].checked)
				{ 
					++selcnt;
					 if(s[i].getAttribute("q")==1) ++selqqcnt;
				}
			}
			if(selcnt != 0 && selcnt == selqqcnt) return true;
		}catch(e){}
		return false;
	}
	function fCheckMaxOK() {
		var sum = 0;
		var d = SN("AddrID");
		for (var i = d.length - 1; i >= 0; i--) {
			if (d[i].checked) {
				sum++;
			}
		}
		if (sum > 20) {
			return false;
		}
		return true;
	}
</SCRIPT>
</BODY></HTML>

