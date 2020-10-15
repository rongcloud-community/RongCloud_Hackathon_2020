<%@ page contentType="text/html; charset=gb2312" language="java" import="java.sql.*,java.util.*" errorPage=""%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<title>班级相册</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link rel="stylesheet" href="css/mm_health_nutr.css" type="text/css" />
<script language="JavaScript" type="text/javascript">

var d=new Date();
var monthname=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

var TODAY = monthname[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

</script>
<style type="text/css">
<!--
.STYLE1 {
	font-size: 16px;
	color: #0000FF;
}
-->
</style>
</head>
<body bgcolor="#F4FFE4">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr bgcolor="#D5EDB3">
    <td colspan="2" rowspan="2"><img src="image/mm_health_photo.jpg" alt="Header image" width="382" height="101" border="0" /></td>
    <td width="208" height="50" id="logo" valign="bottom" align="center" nowrap="nowrap">班级相册</td>
    <td width="58">&nbsp;</td>
  </tr>

  <tr bgcolor="#D5EDB3">
    <td height="51" id="tagline" valign="top" align="center"></td>
	<td width="58">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#5C743D"><img src="mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#99CC66" background="mm_dashed_line.gif"><img src="mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr bgcolor="#99CC66">
  <td>&nbsp;</td>
  	<td colspan="3" id="dateformat" height="20"><a href="index.jsp">主页</a>&nbsp;&nbsp;::&nbsp;&nbsp;今天的日期:<script language="JavaScript" type="text/javascript">
      document.write(TODAY);	</script>	</td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#99CC66" background="mm_dashed_line.gif"><img src="mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr>
    <td colspan="4" bgcolor="#5C743D"><img src="mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>
 <tr>
    <td width="40">&nbsp;</td>
    <td colspan="2" valign="top">&nbsp;<br />
    &nbsp;<br />
    <table border="0" cellspacing="0" cellpadding="2" width="610">
        <tr>
          <td colspan="7" class="pageName"><p>光棍节烧烤</p>
          <p>&nbsp;</p></td>
        </tr>
		<tr>
          <td width="22%" height="110"><a href="photos/3/1.jpg"><img src="photos/3/1.jpg" width="150" height="150" border="0" /></a></td>
		  <td>&nbsp;</td>
		  <td width="22%" height="110"><a href="photos/3/2.jpg"><img src="photos/3/2.jpg" width="150" height="150" border="0" /></a></td>
		  <td>&nbsp;</td>
		  <td width="22%" height="110"><a href="photos/3/3.jpg"><img src="photos/3/3.jpg" width="150" height="150" border="0" /></a></td>
		  <td>&nbsp;</td>
		  <td width="22%" height="110"><a href="photos/3/4.jpg"><img src="photos/3/4.jpg" width="150" height="150" border="0" /></a></td>
        </tr>
		<tr>
          <td class="detailText" valign="top" nowrap="nowrap">&nbsp;</td>
		  <td>&nbsp;</td>
	      <td class="detailText" valign="top" nowrap="nowrap">&nbsp;</td>
		 <td>&nbsp;</td>
	      <td class="detailText" valign="top" nowrap="nowrap">&nbsp;</td>
		 <td>&nbsp;</td>
	      <td class="detailText" valign="top" nowrap="nowrap">&nbsp;</td>
        </tr>
		<tr>
			<td colspan="7">&nbsp;</td>
		</tr>

		<tr>
          <td height="110"><a href="photos/3/5.jpg"><img src="photos/3/5.jpg" width="150" height="150" border="0" /></a></td>
		  <td>&nbsp;</td>
		  <td height="110"><a href="photos/3/6.jpg"><img src="photos/3/6.jpg" width="150" height="150" border="0" /></a></td>
		  <td>&nbsp;</td>
		  <td height="110"><a href="photos/3/7.jpg"><img src="photos/3/7.jpg" width="150" height="150" border="0" /></a></td>
		  <td>&nbsp;</td>
		  <td height="110"><a href="photos/3/8.jpg"><img src="photos/3/8.jpg" width="150" height="150" border="0" /></a></td>
        </tr>
		<tr>
          <td class="detailText" valign="top" nowrap="nowrap">&nbsp;</td>
		  <td>&nbsp;</td>
	      <td class="detailText" valign="top" nowrap="nowrap">&nbsp;</td>
		 <td>&nbsp;</td>
		   <td class="detailText" valign="top" nowrap="nowrap">&nbsp;</td>
		 <td>&nbsp;</td>
		   <td class="detailText" valign="top" nowrap="nowrap">&nbsp;</td>
        </tr>

		<tr>
			<td colspan="7">&nbsp;</td>
		</tr>
      </table>
	</td>
    <td width="58">&nbsp;</td>
  </tr>

 <tr>
    <td width="40">&nbsp;</td>
    <td width="465">&nbsp;</td>
    <td width="208"><span class="STYLE1"> <a href="ourphotos12.jsp"></a>    <a href="ourphotos.jsp">返回</a></span></td>
	<td width="58">&nbsp;</td>
  </tr>
</table>
<div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
</body>
</html>
