<%@page contentType="text/html; charset=utf-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<title>无标题文档</title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.STYLE1 {color: #999999}
.STYLE2 {color: #000000}
body {
	margin-left: 0px;
	margin-top: 0px;
}
-->
</style>
<script language='javascript'>
		function copyToClipBoard(){
			var clipBoardContent=''; 
			clipBoardContent+=document.getElementById('code').innerText;
			//clipBoardContent+='\r\n'+document.URL;
			window.clipboardData.setData("Text",clipBoardContent);
 		}
	</script>
</head>
 
<body>
<table width="2600" border="0" cellpadding="0" cellspacing="1" bgcolor="#95B8FF" class="content9">
  <tr class="content10White">
    <td height="25">&nbsp;复制下面的代码，将这行代码加入到你要监控的页面的最后一个body前面。<br>
					如果你要监控多个页面，必须在每个页面都要添加。</td>
  </tr>
  <tr>
    <td height="50" align="center" valign="middle" bgcolor="#FFFFFF"><div id='code' align="left"><span class="STYLE2">&lt;div id='webimFloat'&gt;&lt;/div&gt;
          <br />
        &lt;script&gt;
      function g(p){var r;d=document.cookie;s=d.indexOf(p+&quot;=&quot;);if(s&gt;=0){e=d.indexOf(&quot;;&quot;, s+p.length+1);r=d.substring(s+p.length+5,e-1)}; return r;}
      document.write(&quot;&lt;scrip&quot;+&quot;t src=\&quot;http://<%=msg.Global.getParameter("vdomain")%>/webTalk.jsp?a=-1&amp;frmurl=&quot;+escape(top.document.referrer)+&quot;&amp;curURL=&quot;+escape(top.document.URL)+&quot;&amp;p=&quot;+screen.width+&quot;*&quot;+screen.height+&quot;&amp;vid=&quot;+g(&quot;vMAC&quot;)+&quot;&amp;rt=&quot;+g(&quot;rt&quot;)+&quot;&amp;lvp=&quot;+g(&quot;lvp&quot;)+&quot;&amp;ck=&quot;+navigator.cookieEnabled+&quot;\&quot;&gt;&lt;/scrip&quot;+&quot;t&gt;&quot;);
  &lt;/script&gt;</span></div></td>
  </tr>
  <tr>
    <td height="50" align="left" valign="middle" bgcolor="#FFFFFF">
	  <INPUT title='点击复制标题和地址到剪贴版,直接在QQ/Msn/Skype上粘贴即可.' class='button' type=button value='点击拷贝上面代码' onclick='copyToClipBoard()'>
	</td>
  </tr>
  <tr>
    <td height="50" align="center" valign="middle" bgcolor="#FFFFFF"><div align="left">
      <p class="STYLE1">请采用以上代码：<br />
        &lt;div id=&quot;webimFloat&quot;&gt;&lt;/div&gt;<br>
&lt;script&gt;
        document.write(&quot;&lt;scrip&quot;+&quot;t src=\&quot;http://webim.uniscom.cn/webim.jsp\&quot;&gt;&lt;/scrip&quot;+&quot;t&gt;&quot;);
        &lt;/script&gt;<br />
        <br />
        </p>
      </div></td>
  </tr>
</table>
</body>
</html>