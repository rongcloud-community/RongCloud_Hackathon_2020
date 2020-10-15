<%@page contentType="text/html; charset=utf-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<title>无标题文档</title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.STYLE2 {color: #000000}
body {
	margin-left: 0px;
	margin-top: 0px;
}
.STYLE5 {font-size: 12px}
-->
</style>
<script language='javascript'>
		function copyToClipBoard(){
			var clipBoardContent=''; 
			clipBoardContent+=document.getElementById('code').innerText;
			//clipBoardContent+='\r\n'+document.URL;
			window.clipboardData.setData("Text",clipBoardContent);
 		}
		function copyToClipBoard1(){
			var clipBoardContent=''; 
			clipBoardContent+=document.getElementById('code1').innerText;
			//clipBoardContent+='\r\n'+document.URL;
			window.clipboardData.setData("Text",clipBoardContent);
 		}
	</script>
</head>
 
<body>
<table width="2350" border="0" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4"   >
  <tr >
    <td height="25"><table width="790" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
      <tr>
        <td width="790" bgcolor="#E4F2FF">监控代码</td>
      </tr>
    </table>
    <br /></td>
  </tr>
  
  <tr style=" font-size:12px;">
    <td height="30" align="center" valign="middle" bgcolor="#66CCCC"><div id='code' align="left"><span class="STYLE2">&lt;div id='webimFloat style='cursor:hand;'&gt;&lt;/div&gt;<br />
         &lt;script&gt;
      function g(p){var r;d=document.cookie;s=d.indexOf(p+&quot;=&quot;);if(s&gt;=0){e=d.indexOf(&quot;;&quot;, s+p.length+1);if(e&lt;0)e=d.length;r=d.substring(s+p.length+5,e-1)}; return r;}
      document.write(&quot;&lt;scrip&quot;+&quot;t src=\&quot;http://webim.100im.cn/webTalk.jsp?a=-1&amp;frmurl=&quot;+escape(top.document.referrer)+&quot;&amp;curURL=&quot;+escape(top.document.URL)+&quot;&amp;p=&quot;+screen.width+&quot;*&quot;+screen.height+&quot;&amp;vid=&quot;+g(&quot;vMAC&quot;)+&quot;&amp;rt=&quot;+g(&quot;rt&quot;)+&quot;&amp;lvp=&quot;+g(&quot;lvp&quot;)+&quot;&amp;ck=&quot;+navigator.cookieEnabled+&quot;\&quot;&gt;&lt;/scrip&quot;+&quot;t&gt;&quot;);
  &lt;/script&gt;</span></div></td>
  </tr>
  <tr>
    <td height="50" align="left" valign="middle" bgcolor="#FFFFFF"><br />
      <input name="button" type=button class='button' style="height:50px; width:394px" title='点击复制标题和地址到剪贴版,然后在你的文件编辑器中直接粘贴即可.' onclick='copyToClipBoard()' value='点击拷贝上面代码,然后可以直接粘贴到你的页面' />
      <input name="button2" type="button" class='button' style="height:50px;width:394px" title='点击这里可以直接给你的网页在线添加监控代码.' onclick="window.location.href='ftpClient.jsp'" value='点击这里可以直接给你的网页在线添加监控代码' />
      <br />
	  <br />
	  <table width="790" height="34" border="1" cellpadding="0" cellspacing="0" bordercolor="#A5AdC4">
        <tr>
          <td width="790" bgcolor="#E4F2FF"><span class="STYLE5"> 复制上面的代码，将代码加入到你要监控的页面的最后，这样不会对你的网页速度产生任何影响。<br />
如果你要监控多个页面，必须在每个页面都要添加。<br />
即使你以后选择不同的浮动肤色，代码不用任何改变，一次嵌入，肤色万变。<br />
并且不同网站，相同的代码，系统会智能判断来访站点。<br />
<br />
如果您要选择在您的网页上嵌入静止图标或文字而不是浮动图标，请将上面第一行放到您要显示的table的td内或div内。<br />
          </span></td>
        </tr>
      </table>
	  <br />
    <br /></td>
  </tr>
</table>
<br />
<br />
</body>
</html>