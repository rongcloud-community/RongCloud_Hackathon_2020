<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*" errorPage="" %>
 
 

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
 
<title>�ޱ����ĵ�</title>
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
            href="index.htm">���ص�¼ҳ��</A>&nbsp;</span>&nbsp;&nbsp;&nbsp;</TD>
    </TR>
    <TR>
      <TD vAlign=top align=left height=10><HR color=#b3d3ee noShade SIZE=1>
      </TD>
    </TR>
  </TBODY>
</TABLE>
<table width="800" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td width="90" valign="top" nowrap><div align="left" class="STYLE9"><span class="STYLE10">��</span><span class="STYLE5">��ܰ��ʾ</span><span class="STYLE10">��</span></div></td>
    <td width="710"><span class="STYLE5">�˴�Ĭ��ע����ǹ�˾����Ա�ʺ�,һ����˾ֻ����һ������Ա,��˾����Ա���ɴ��ʺŵ�¼����Web�����������ź���� �³�Ա����! </span></td>
  </tr>
</table>
<FORM id=UserForm name=frm action=regSave.jsp method=post>
<table width="800" border="0" align="center" cellpadding="0" cellspacing="1" bgcolor="#0066FF">
  <tr>
    <td width="111" bgcolor="#0066FF"><div align="left"><span class="STYLE6">վ�������Ϣ</span></div></td>
  </tr>
  <tr>
    <td bgcolor="#0000CC"><table width="800" border="0" cellspacing="0" cellpadding="0">
      <tr bgcolor="#0000CC" height="30">
        <td width="119" bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">��˾��ҳ��</span></div></td>
        <td width="258" bgcolor="#eeeeee"><INPUT id=domain size=30 
            value=www. name=domain>        </td>
        <td width="423" bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span><span class="STYLE5">&nbsp;�벻Ҫ�ڴ���Ӷ������ </span></span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">��˾���ƣ�</span></div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <INPUT id=companyName size=30 
            name=companyName>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">* </span><span class="STYLE5">��д�����Ĺ�˾ע����Ϣ</span></span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">��&nbsp;ϵ&nbsp;�ˣ�</span></div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <INPUT id=contactName name=contactName>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span>&nbsp;</span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">��ϵ�绰��</span></div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <INPUT id=contactTel name=contactTel>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span>&nbsp;</span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right"><span class="content9 STYLE5">�������䣺</span></div></td>
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
    <td width="111" nowrap bgcolor="#0066FF"><span class="STYLE6">����Ա������Ϣ</span></td>
  </tr>
  <tr>
    <td bgcolor="#0000CC"><table width="800" border="0" cellspacing="0" cellpadding="0">
      <tr bgcolor="#0000CC" height="30">
        <td width="119" bgcolor="#eeeeee"><div align="right" class="STYLE5">��&nbsp;&nbsp;&nbsp;&nbsp;�룺</div></td>
        <td width="258" bgcolor="#eeeeee"><span class="content9">
          <INPUT id=password 
            type=password name=password>
        </span></td>
        <td width="423" bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span><span class="STYLE5">&nbsp;������ʹ��Ӣ����ĸ��������ϣ� 
            ����6-12λ</span></span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right" class="STYLE5">ȷ�����룺</div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <INPUT id=password2 type=password 
            name=password2>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">* </span><span class="STYLE5">ȷ����������������Ƿ�һ��</span></span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right" class="STYLE5">�������ţ�</div></td>
        <td bgcolor="#eeeeee"><span class="content9">
          <SELECT id=type name=type>
            <OPTION 
              value=0 selected>--��ѡ����--</OPTION>
            <OPTION value=ҵ��>ҵ��</OPTION>
            <OPTION value=������>������</OPTION>
            <OPTION 
            value=�ͷ���>�ͷ���</OPTION>
          </SELECT>
        </span></td>
        <td bgcolor="#eeeeee"><span class="content9"><span class="STYLE2">*</span>&nbsp;������ע�������޸�Ҳ��������µĲ���</span></td>
      </tr>
      <tr bgcolor="#0000CC" height="30">
        <td bgcolor="#eeeeee"><div align="right" class="STYLE5">��&nbsp;&nbsp;&nbsp;&nbsp;��</div></td>
        <td bgcolor="#eeeeee"><LABEL>
          <INPUT type=radio value=�� name=sex>
          <span class="STYLE5"> ��</span></LABEL>
          <LABEL>
          <INPUT type=radio CHECKED value=Ů name=sex>
          <span class="STYLE5">Ů</span></LABEL></td>
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
