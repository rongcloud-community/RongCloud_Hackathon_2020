<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*" errorPage="" %>
 
 

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
 
<title>无标题文档</title>
<style type="text/css">
<!--
.STYLE2 {color: #FF0000}
.STYLE5 {font-size: 14px}
.STYLE6 {color: #FFFFFF; font-size: 14px; }
a:link {
	color: #0000FF;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #0000FF;
}
a:hover {
	text-decoration: none;
	color:#ff0000;
}
a:active {
	text-decoration: none;
}
.STYLE9 {color: #D92FA6}
.STYLE10 {color: #B535AB}
-->
</style>
</head>

<body>
<TABLE width=800 border=0 align="center" cellPadding=0 cellSpacing=0>
  <TBODY>
    <TR>
      <TD vAlign=center align=middle width=203 rowSpan=2><SPAN 
            class=logo><img src="pic/logogif.gif" alt="1" width="285" height="48"></SPAN></TD>
      <TD vAlign=center align=left width=48 rowSpan=2>&nbsp;</TD>
      <TD class=content9 vAlign=bottom align=right width=549 height=40><span class="STYLE5"><A 
            href="index.htm">返回登录页面</A>&nbsp;</span>&nbsp;&nbsp;&nbsp;</TD>
    </TR>
    <TR>
      <TD vAlign=top align=left height=10><HR color=#b3d3ee noShade SIZE=1>
      </TD>
    </TR>
  </TBODY>
</TABLE>
<table width="800" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td width="90" valign="top" nowrap><div align="left" class="STYLE9"><span class="STYLE10">【</span><span class="STYLE5">温馨提示</span><span class="STYLE10">】</span></div></td>
    <td width="710"><span class="STYLE5">此处默认注册的是公司管理员帐号,一个公司只能有一个管理员,公司其他员工由此帐号登录进入Web管理，创建部门后添加 新成员即可! </span></td>
  </tr>
</table>
<FORM id=UserForm name=frm action=regSave.jsp method=post>
<table width="800" border="0" align="center" cellpadding="0" cellspacing="1" bgcolor="#0066FF">
  <tr>
    <td width="111" bgcolor="#0066FF"><div align="left"><span class="STYLE6">站点基本信息</span></div></td>
  </tr>
  <tr>
    <td bgcolor="#0000CC"><table width="800" border="0" cellspacing="0" cellpadding="0">
      <tr bgcolor="#0000CC" height="30">
        <td width="119" bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">公司主页：</span></div></td>
        <td width="258" bgcolor="#eeeeee"><INPUT id=domain size=30 
            value=www. name=domain>        </td>
        <td width="423" bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span><span class="STYLE5">&nbsp;请不要在此添加多个域名 </span></span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">公司名称：</span></div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <INPUT id=companyName size=30 
            name=companyName>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">* </span><span class="STYLE5">填写完整的公司注册信息</span></span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">联&nbsp;系&nbsp;人：</span></div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <INPUT id=contactName name=contactName>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span>&nbsp;</span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">联系电话：</span></div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <INPUT id=contactTel name=contactTel>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span>&nbsp;</span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">电子信箱：</span></div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <INPUT id=contactEmail 
            name=contactEmail>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span>&nbsp;</span></td>
      </tr>

    </table></td>
  </tr>
</table>
<table width="800" border="0" align="center" cellpadding="0" cellspacing="1" bgcolor="#0066FF">
  <tr>
    <td width="111" nowrap bgcolor="#0066FF"><span class="STYLE6">管理员基本信息</span></td>
  </tr>
  <tr>
    <td bgcolor="#0000CC"><table width="800" border="0" cellspacing="0" cellpadding="0">
      <tr bgcolor="#0000CC" height="30">
        <td width="119" bgcolor="#eeeeee"><div align="right" class="STYLE5">密&nbsp;&nbsp;&nbsp;&nbsp;码：</div></td>
        <td width="258" bgcolor="#eeeeee"><span class="content9">
          <INPUT id=password 
            type=password name=password>
        </span></td>
        <td width="423" bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span><span class="STYLE5">&nbsp;密码请使用英文字母及数字组合， 
            建议6-12位</span></span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right" class="STYLE5">确认密码：</div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <INPUT id=password2 type=password 
            name=password2>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">* </span><span class="STYLE5">确认两次输入的密码是否一致</span></span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right" class="STYLE5">所属部门：</div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <SELECT id=type name=type>
            <OPTION 
              value=0 selected>--请选择部门--</OPTION>
            <OPTION value=业务部>业务部</OPTION>
            <OPTION value=技术部>技术部</OPTION>
            <OPTION 
            value=客服部>客服部</OPTION>
          </SELECT>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span>&nbsp;部门在注册后可以修改也可以添加新的部门</span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right" class="STYLE5">性&nbsp;&nbsp;&nbsp;&nbsp;别：</div></td>
        <td bgcolor="#eeeeee"><LABEL>
          <INPUT type=radio value=男 name=sex>
          <span class="STYLE5"> 男</span></LABEL>
          <LABEL>
          <INPUT type=radio CHECKED value=女 name=sex>
          <span class="STYLE5">女</span></LABEL></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span>&nbsp;</span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td colspan="2" bgcolor="#eeeeee"><div align="center"><a href="reg.htm"></a><span style="PADDING-RIGHT: 10px">
          <INPUT type=image name=confirm src="pic/bzc.gif" onClick="document.frm.submit()">
        </span>&nbsp;<a href="javascript:document.frm.reset();"><img border=0 src="pic/bct.gif"></a></div></td>
        <td bgcolor="#eeeeee">&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table></FORM>
<p>&nbsp;</p>
<p align="center">&nbsp;</p>
<p align="center">&nbsp;</p>
<p align="center">&nbsp;</p>
</body>
</html>
