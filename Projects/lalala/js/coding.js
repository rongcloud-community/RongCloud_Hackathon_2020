defaultflashwidth=410;
defaultflashheight=280;
quoteback="#F3F6FA";
paraspace=130;
wordspace=0;
imagesurl="file://E:/mblog";


function getHTMLStrings(textdiv)
{
	var text = textdiv.innerHTML;
	if(text!=null && text.length > 0)
	{
		textdiv.innerHTML = decode2HTML(text);
	}
	if(textdiv.style && textdiv.style.visibility)
	{
		textdiv.style.visibility = "visible";
	}
}


function decode2HTML(text)
{
	//text = text.replace(/\</ig,"&lt;");
	text = text.replace(/(\[SHADOW=)(\S+?)(\,)(.+?)(\,)(.+?)(\])(.+?)(\[\/SHADOW\])/ig,'<table width=$2 style="filter:shadow\(color=$4\, direction=$6)"><tr><td>$8<\/td><\/tr><\/table>');
	//eDonkey|Emule 连接
	text = text.replace(/(^|\s|\>|\\|\;)(ed2k:\/\/\|file\|)(\S+?)\|(\S+?)(\s|$|\<)/ig,"$1 eDonkey|eMule 下载： <a href=$2$3\|$4 target=_blank>$3<\/a><BR>$5");

	//eXeem 连接
	text = text.replace(/(^|\s|\>|\\|\;)(exeem:\/\/)(\S+?)\/(\S+?)\/(\S+?)(\s|$|\<)/ig,"$1 eXeem 下载： <a href=$2$3\/$4\/$5$6 target=_blank>$5<\/a><BR>$6");

	//url自动识别
	text = text.replace(/(^|\s|\>|\\|\;)(http|https|ftp|ed2k|exeem):\/\/(\S+?)(\s|$|\<|\[)/ig,"$1<a href=$2:\/\/$3\ target=_blank>$2\:\/\/$3<\/a>$4");

	//图片处理
	text = text.replace(/\[url.+?\[img\]\s*(http|https|ftp):\/\/(\S+?)\s*\[\/img\]\[\/url\]/ig,'<a href=$1:\/\/$2 target=_blank title=开新窗口浏览><img src=$1:\/\/$2 border=0 onload=\"javascript:if(this.width>document.body.clientWidth-333)this.width=document.body.clientWidth-333\"><\/a>');
	text = text.replace(/\[img\]\s*(http|https|ftp):\/\/(\S+?)\s*\[\/img\]/ig,'<a href=$1:\/\/$2 target=_blank title=开新窗口浏览><img src=$1:\/\/$2 border=0 onload=\"javascript:if(this.width>document.body.clientWidth-333)this.width=document.body.clientWidth-333\"><\/a>');
	text = text.replace(/(^|\s|\>|\\|\;)(http|https|ftp):\/\/(\S+?\.)(png|bmp|gif|jpg|jpeg)(\s|$|\<|\[)/ig,'$1<a href=$2:\/\/$3$4 target=_blank title=开新窗口浏览><img src=$2:\/\/$3$4 border=0 onload=\"javascript:if(this.width>document.body.clientWidth-333)this.width=document.body.clientWidth-333\"><\/a>$5');

	//flash处理
	text = text.replace(/(\[swf\])\s*(http|https|ftp):\/\/(\S+?\.swf)\s*(\[\/swf\])/ig,'<PARAM NAME=PLAY VALUE=TRUE><PARAM NAME=LOOP VALUE=TRUE><PARAM NAME=QUALITY VALUE=HIGH><embed src=$2:\/\/$3 quality=high pluginspage="http:\/\/www.macromedia.com\/shockwave\/download\/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application\/x-shockwave-flash" WIDTH='+defaultflashwidth+' height='+defaultflashheight+'><\/embed>');
	text = text.replace(/(\[FLASH=)(\S+?)(\,)(\S+?)(\])\s*(http|https|ftp):\/\/(\S+?\.swf)\s*(\[\/FLASH\])/ig,'<OBJECT CLASSID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" WIDTH=$2 HEIGHT=$4><PARAM NAME=MOVIE VALUE=$6:\/\/$7><PARAM NAME=PLAY VALUE=TRUE><PARAM NAME=LOOP VALUE=TRUE><PARAM NAME=QUALITY VALUE=HIGH><EMBED SRC=$6:\/\/$7 WIDTH=$2 HEIGHT=$4 PLAY=TRUE LOOP=TRUE QUALITY=HIGH><\/EMBED><\/OBJECT>');
	text = text.replace(/(^|\s|\>)(http|https|ftp):\/\/(\S+?\.swf)(\s|$|\<)/ig,'$1<PARAM NAME=PLAY VALUE=TRUE><PARAM NAME=LOOP VALUE=TRUE><PARAM NAME=QUALITY VALUE=HIGH><embed src=$2:\/\/$3 quality=high pluginspage="http:\/\/www.macromedia.com\/shockwave\/download\/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application\/x-shockwave-flash" WIDTH='+defaultflashwidth+' height='+defaultflashheight+'><\/embed>$4');

	//url自动识别补充
	text = text.replace(/(^|\s|\>|\\|\;)www\.(\S+?)(\s|$|\<|\[)/ig,"$1<a href=http:\/\/www.$2 target=_blank>www.$2<\/a>$3");

	//email自动识别
	text = text.replace(/(^|\s|\>|\\|\;)(\w+\@\w+\.\w+)(\s|$|\<|\[)/ig,"$1<A HREF=mailto:$2>$2<\/A>$3");

	//换行标签
	text = text.replace(/\[br\]/ig,"<br>");

	//不要用太多换行啦～
	text = text.replace(/(<br>){10,}/ig,"<br><br><br>");
	//url标签
	text = text.replace(/\[url\](\[\S+\])(\S+?)(\[\S+\])\[\/url\]/ig,"<a href=$2 target=_blank>$1$2$3<\/a>");
	text = text.replace(/\[url=\s*(.*?)\s*\]\s*(.*?)\s*\[\/url\]/ig,"<a href=$1 target=_blank>$2<\/a>");
	text = text.replace(/\[url\]\s*(.*?)\s*\[\/url\]/ig,"<a href=$1 target=_blank>$1<\/a>");

	//email标签
	text = text.replace(/(\[email\])(\S+?\@\S+?)(\[\/email\])/ig,"<A HREF=mailto:$2>$2<\/A>");
	text = text.replace(/\[email=(\S+?\@\S+?)\]\s*(.*?)\s*\[\/email\]/ig,"<a href=mailto:$1>$2<\/a>");

	//iframe标签
	text = text.replace(/(\[iframe\])(.+?)(\[\/iframe\])/ig,'<IFRAME SRC=$2 FRAMEBORDER=0 ALLOWTRANSPARENCY="true" SCROLLING="YES" WIDTH="100%" HEIGHT=340><\/IFRAME><br><br><a href=$2 target="_blank">Netscape 用户点这儿查看<\/a><BR>');

	//引用标签，quoteback－底色
	text = text.replace(/\[quote\]\s*(.*?)\s*\[\/quote\]/ig,'<BR><table cellpadding=0 cellspacing=0 WIDTH=94\% bgcolor=#000000 align=center style=\"TABLE-LAYOUT: fixed\"><tr><td><table width=100% cellpadding=5 cellspacing=1 style=\"TABLE-LAYOUT: fixed\"><TR><TD BGCOLOR="'+quoteback+'" style=\"LEFT: 0px; WIDTH: 100%; WORD-WRAP: break-word;">$1<\/td><\/tr><\/table><\/td><\/tr><\/table><BR>');

	//文字大小
	text = text.replace(/\[size=\s*([1-6])\s*\]\s*(.*?)\s*\[\/size\]/ig,"<font size=$1>$2<\/font>");

	//音乐背景(wav/mid)
	text = text.replace(/(\[sound\])\s*(http|https|ftp):\/\/(\S+?\.wav)\s*(\[\/sound\])/ig,"<bgsound src=$2:\/\/$3 border=0><img src="+imagesurl+"\/images\/wave.gif width=16 height=16 alt=WAVE音乐>");
	text = text.replace(/(\[sound\])\s*(http|https|ftp):\/\/(\S+?\.)(mid|midi)\s*(\[\/sound\])/ig,"<bgsound src=$2:\/\/$3$4 border=0><img src="+imagesurl+"\/images\/mid.gif width=16 height=16 alt=MIDI音乐>");

	//RealPlayer支持格式，自动播放，还是不要开吧。。。
	//text = text.replace(/(\[ra\])(\S+?\.)(ram|rmm|mp3|mp2|mpa|ra|mpga)(\[\/ra\])/ig,'<b>这个是 RealPlayer 音乐：<\/b><br><object classid="clsid:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA" id="RAOCX" width="480" height="70"><param name="_ExtentX" value="6694"><param name="_ExtentY" value="1588"><param name="AUTOSTART" value=1><param name="SHUFFLE" value="0"><param name="PREFETCH" value="0"><param name="NOLABELS" value="0"><param name="SRC" value="$2$3"><param name="CONTROLS" value="StatusBar,ControlPanel"><param name="LOOP" value="0"><param name="NUMLOOP" value="0"><param name="CENTER" value="0"><param name="MAINTAINASPECT" value="0"><param name="BACKGROUNDCOLOR" value="#000000"><embed src="$2$3" width="320" autostart=1 height="70"><\/object><BR>');
	text = text.replace(/(\[rm\])(\S+?\.)(ram|rmm|rm|rmvb|mpg|mpv|mpeg|dat|avi|mpga)(\[\/rm\])/ig,'<br><object classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA" HEIGHT=300 ID=Player WIDTH=480 VIEWASTEXT><param NAME="_ExtentX" VALUE="12726"><param NAME="_ExtentY" VALUE="8520"><param NAME="AUTOSTART" VALUE=1><param NAME="SHUFFLE" VALUE="0"><param NAME="PREFETCH" VALUE="0"><param NAME="NOLABELS" VALUE="0"><param NAME="CONTROLS" VALUE="ImageWindow"><param NAME="CONSOLE" VALUE="_master"><param NAME="LOOP" VALUE="0"><param NAME="NUMLOOP" VALUE="0"><param NAME="CENTER" VALUE="0"><param NAME="MAINTAINASPECT" VALUE="$2$3"><param NAME="BACKGROUNDCOLOR" VALUE="#000000"><\/object><br><object CLASSID=clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA HEIGHT=32 ID=Player WIDTH=480 VIEWASTEXT><param NAME="_ExtentX" VALUE="18256"><param NAME="_ExtentY" VALUE="794"><param NAME="AUTOSTART" VALUE=1><param NAME="SHUFFLE" VALUE="0"><param NAME="PREFETCH" VALUE="0"><param NAME="NOLABELS" VALUE="0"><param NAME="CONTROLS" VALUE="controlpanel"><param NAME="CONSOLE" VALUE="_master"><param NAME="LOOP" VALUE="0"><param NAME="NUMLOOP" VALUE="0"><param NAME="CENTER" VALUE="0"><param NAME="MAINTAINASPECT" VALUE="0"><param NAME="BACKGROUNDCOLOR" VALUE="#000000"><param NAME="SRC" VALUE="$2$3"><\/object><BR>');

	text = text.replace(/(\[mp\])(\S+?\.)(ram|asf|asx|avi|wmv|mpg|mpv|mpeg|dat)(\[\/mp\])/ig,'<br><object id="videowindow1" width="480" height="330" classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95"><param NAME="Filename" value="$2$3"><param name="AUTOSTART" value=1><\/object><BR>');

	//text = text.replace(/(\[real=)(\S+?)(\,)(\S+?)(\])(\S+?\.)(ram|rmm|rm|rmvb|mpg|mpv|mpeg|dat|avi|mpga)(\[\/real\])/ig,'<b>这个是 RealPlayer 影片：<\/b><br><object classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA" HEIGHT=$4 ID=Player WIDTH=$2 VIEWASTEXT><param NAME="_ExtentX" VALUE="12726"><param NAME="_ExtentY" VALUE="8520"><param NAME="AUTOSTART" VALUE=1><param NAME="SHUFFLE" VALUE="0"><param NAME="PREFETCH" VALUE="0"><param NAME="NOLABELS" VALUE="0"><param NAME="CONTROLS" VALUE="ImageWindow"><param NAME="CONSOLE" VALUE="_master"><param NAME="LOOP" VALUE="0"><param NAME="NUMLOOP" VALUE="0"><param NAME="CENTER" VALUE="0"><param NAME="MAINTAINASPECT" VALUE="$6"><param NAME="BACKGROUNDCOLOR" VALUE="#000000"><\/object><br><object CLASSID=clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA HEIGHT=32 ID=Player WIDTH=$2 VIEWASTEXT><param NAME="_ExtentX" VALUE="18256"><param NAME="_ExtentY" VALUE="794"><param NAME="AUTOSTART" VALUE=1><param NAME="SHUFFLE" VALUE="0"><param NAME="PREFETCH" VALUE="0"><param NAME="NOLABELS" VALUE="0"><param NAME="CONTROLS" VALUE="controlpanel"><param NAME="CONSOLE" VALUE="_master"><param NAME="LOOP" VALUE="0"><param NAME="NUMLOOP" VALUE="0"><param NAME="CENTER" VALUE="0"><param NAME="MAINTAINASPECT" VALUE="0"><param NAME="BACKGROUNDCOLOR" VALUE="#000000"><param NAME="SRC" VALUE="$6$7"><\/object><BR>');

	//RealPlayer支持格式，点击播放
	//text = text.replace(/(\[ra\])(\S+?\.)(ram|rmm|mp3|mp2|mpa|ra|mpga)(\[\/ra\])/ig,"<b>这个是 RealPlayer 音乐，点击播放<\/b><BR><a href=$2$3>$2$3<\/a>");
	//text = text.replace(/(\[rm\])(\S+?\.)(ram|rmm|rm|rmvb|mpg|mpv|mpeg|dat|avi|mpga)(\[\/rm\])/ig,"<b>这个是 RealPlayer 影片，点击播放<\/b><BR><a href=$2$3>$2$3<\/a>");
	//text = //text.replace(/(\[real=)(\S+?)(\,)(\S+?)(\])(\S+?\.)(ram|rmm|rm|rmvb|mpg|mpv|mpeg|dat|avi|mpga)(\[\/real\])/ig,"<b>这个是 RealPlayer 影片，点击播放<\/b><BR><a href=$6$7>$6$7<\/a>");

	//WMP支持格式，自动播放嘛。。。
	//text = text.replace(/(\[wma\])(\S+?\.)(ram|wma|wm|mp3|mp2|ra|mpa|mpga)(\[\/wma\])/ig,'<b>这个是 Windows Media Player 音乐：<\/b><br><embed type="application\/x-mplayer2" pluginspage="http:\/\/www.microsoft.com\/Windows\/Downloads\/Contents\/Products\/MediaPlayer\/" src="$2$3" name="realradio" showcontrols=1 ShowDisplay=0 ShowStatusBar=1 width=480 height=70 autostart=1><\/embed><BR>');
	//text = text.replace(/(\[wmv\])(\S+?\.)(ram|asf|asx|avi|wmv|mpg|mpv|mpeg|dat)(\[\/wmv\])/ig,'<b>这个是 Windows Media Player 影片：<\/b><br><object id="videowindow1" width="480" height="330" classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95"><param NAME="Filename" value="$2$3"><param name="AUTOSTART" value=1><\/object><BR>');
	//text = text.replace(/(\[wm=)(\S+?)(\,)(\S+?)(\])(\S+?\.)(ram|asf|asx|avi|wmv|mpg|mpeg|dat)(\[\/wm\])/ig,'<b>这个是 Windows Media Player 影片：<\/b><br><object id="videowindow1" width=$2 height=$4 classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95"><param NAME="Filename" value="$6$7"><param name="AUTOSTART" value=1><\/object><BR>');

	//WMP支持格式，麻烦点击啦～
	text = text.replace(/(\[wma\])(\S+?\.)(ram|wma|wm|mp3|mp2|ra|mpa|mpga)(\[\/wma\])/ig,"<b>这个是 Windows Media Player 音乐，点击播放<\/b><BR><a href=$2$3>$2$3<\/a>");
	text = text.replace(/(\[wmv\])(\S+?\.)(ram|asf|asx|avi|wmv|mpg|mpv|mpeg|dat)(\[\/wmv\])/ig,"<b>这个是 Windows Media Player 影片，点击播放<\/b><BR><a href=$2$3>$2$3<\/a>");
	text = text.replace(/(\[wm=)(\S+?)(\,)(\S+?)(\])(\S+?\.)(ram|asf|asx|avi|wmv|mpg|mpeg|dat)(\[\/wm\])/ig,"<b>这个是 Windows Media Player 影片，点击播放<\/b><BR><a href=$6$7>$6$7<\/a>");

	//流媒体类点击播放，处理漏网之鱼的
	text = text.replace(/\[mms\]\s*mms:\/\/(.*?)\s*\[\/mms\]/ig,'<img src='+imagesurl+'\/images\/music.gif width=16 height=16 alt="WM 类数据流音乐" align=absmiddle> <a href="mms:\/\/$1">mms:\/\/$1<\/a>');
	text = text.replace(/\[mms=\s*mms:\/\/(.*?)\s*\](.*?)\[\/mms\]/ig,'<img src='+imagesurl+'\/images\/music.gif width=16 height=16 alt="WM 类数据流音乐" align=absmiddle> <a href="mms:\/\/$1">$2<\/a>');
	text = text.replace(/\[rtsp\]\s*(rtsp|pnm):\/\/(.*?)\s*\[\/rtsp\]/ig,'<img src='+imagesurl+'\/images\/ra.gif width=16 height=16 alt="Real 类数据流" align=absmiddle> <a href="$1:\/\/$2">$1:\/\/$2<\/a>');
	text = text.replace(/\[rtsp=\s*(rtsp|pnm):\/\/(.*?)\s*\](.*?)\[\/rtsp\]/ig,'<img src='+imagesurl+'\/images\/ra.gif width=16 height=16 alt="Real 类数据流" align=absmiddle> <a href="$1:\/\/$2">$3<\/a>');

	//特殊引用1
	text = text.replace(/\[equote\]\s*(.*?)\s*\[\/equote\]/ig,'<BR><TABLE cellSpacing=0 cellPadding=0><TR><TD><IMG src='+imagesurl+'\/images\/top_l.gif><\/TD><TD background='+imagesurl+'\/images\/top_c.gif><\/TD><TD><IMG src='+imagesurl+'\/images\/top_r.gif><\/TD><\/TR><TR><TD vAlign=top background='+imagesurl+'\/images\/center_l.gif><\/TD><TD bgcolor=#fffff1 style=WORD-WRAP:break-word;>$1<TD vAlign=top background='+imagesurl+'\/images\/center_r.gif><\/TD><\/TR><TR><TD vAlign=top><IMG src='+imagesurl+'\/images\/foot_l1.gif ><\/TD><TD background='+imagesurl+'\/images\/foot_c.gif><IMG src='+imagesurl+'\/images\/foot_l3.gif><\/TD><TD align=right><IMG src='+imagesurl+'\/images\/foot_r.gif><\/TD><\/TR><\/TABLE><BR>');

	//特殊引用2
	text = text.replace(/\[fquote\]\s*(.*?)\s*\[\/fquote\]/ig,'<BR><table cellSpacing=0 cellPadding=0><tr><td><table cellSpacing=0 cellPadding=0><tr><td><img src='+imagesurl+'\/images\/top1_l.gif width=83 height=39><\/td><td width=100% background='+imagesurl+'\/images\/top1_c.gif>　<\/td><td><img src='+imagesurl+'\/images\/top1_r.gif width=7 height=39><\/td><\/tr><tr><td colSpan=3><table cellSpacing=0 cellPadding=0 width=100%><tr><td vAlign=top background='+imagesurl+'\/images\/center1_l.gif><img src='+imagesurl+'\/images\/top1_l2.gif width=11 height=1><\/td><td vAlign=center width=100% bgColor=#fffff1 style=WORD-WRAP:break-word;>$1<\/td><td vAlign=top background='+imagesurl+'\/images\/center1_r.gif><img src='+imagesurl+'\/images\/top1_r2.gif width=7 height=2><\/td><\/tr><\/table><\/td><\/tr><tr><td colSpan=3><table cellSpacing=0 cellPadding=0 width=100%><tr><td vAlign=top><img src='+imagesurl+'\/images\/foot1_l1.gif width=12 height=18><\/td><td width=100% background='+imagesurl+'\/images\/foot1_c.gif><img src='+imagesurl+'\/images\/foot1_l3.gif width=1 height=18><\/td><td align=right><img src='+imagesurl+'\/images\/foot1_r.gif width=8 height=18><\/td><\/tr><\/table><\/td><\/tr><\/table><\/td><\/tr><\/table><BR>');
	//类HTML标签
	text = text.replace(/\[hr\]/ig,"<hr width=40% align=left>");
	text = text.replace(/\[b\](.+?)\[\/b\]/ig,"<b>$1<\/b>");
	text = text.replace(/\[i\](.+?)\[\/i\]/ig,"<i>$1<\/i>");
	text = text.replace(/\[u\](.+?)\[\/u\]/ig,"<u>$1<\/u>");
	text = text.replace(/\[font=\s*(.*?)\s*\]\s*(.*?)\s*\[\/font\]/ig,"<font face=$1>$2<\/font>");
	text = text.replace(/\[color=(\S+?)\]\s*(.*?)\s*\[\/color\]/ig,"<font color=$1>$2<\/font>");
	text = text.replace(/(\[list\])(.+?)(\[\/list\])/ig,"<ul>$2<\/ul>");
	text = text.replace(/(\[list=s\])(.+?)(\[\/list\])/ig,'<ol type="square">$2<\/ol>');
	text = text.replace(/(\[list=)(A|1|I)(\])(.+?)(\[\/list\])/ig,"<OL TYPE=$2>$4<\/OL>");
	text = text.replace(/(\[list=)(\S+?)(])(.+?)(\[\/list\])/ig,'<ol start="$2">$4<\/ol>');
	text = text.replace(/\[\*\]/ig,"<li>");
	text = text.replace(/(\[fly\])(.+?)(\[\/fly\])/ig,"<marquee width=90% behavior=alternate scrollamount=3>$2<\/marquee>");
	text = text.replace(/(\[move\])(.+?)(\[\/move\])/ig,"<MARQUEE scrollamount=3>$2<\/MARQUEE>");
	text = text.replace(/(\[s\])(.+?)(\[\/s\])/ig,"<s>$2<\/s>");
	text = text.replace(/(\[sup\])(.+?)(\[\/sup\])/ig,"<sup>$2<\/sup>");
	text = text.replace(/(\[sub\])(.+?)(\[\/sub\])/ig,"<sub>$2<\/sub>");
	text = text.replace(/(\[align=)(left|center|right)(\])(.+?)(\[\/align\])/ig,"<DIV Align=$2>$4<\/DIV>");
	//css效果
	text = text.replace(/(\[SHADOW=)(\S+?)(\,)(.+?)(\,)(.+?)(\])(.+?)(\[\/SHADOW\])/ig,'<table width=$2 style="filter:shadow\(color=$4\, direction=$6)"><tr><td>$8<\/td><\/tr><\/table>');
	text = text.replace(/(\[GLOW=)(\S+?)(\,)(.+?)(\,)(.+?)(\])(.+?)(\[\/GLOW\])/ig,'<table width=$2 style="filter:glow\(color=$4\, strength=$6)"><tr><td>$8<\/td><\/tr><\/table>');
	text = text.replace(/(\[BLUR=)(\S+?)(\,)(.+?)(\,)(.+?)(\])(.+?)(\[\/BLUR\])/ig,'<table width=$2 style="filter:blur\(Add=0, direction=$4\, strength=$6)"><tr><td>$8<\/td><\/tr><\/table>');
	text = text.replace(/(\[FLIPH\])(.+?)(\[\/FLIPH\])/ig,'<table style="filter:flipH"><tr><td>$2<\/td><\/tr><\/table>');
	text = text.replace(/(\[FLIPV\])(.+?)(\[\/FLIPV\])/ig,'<table style="filter:flipV"><tr><td>$2<\/td><\/tr><\/table>');
	text = text.replace(/(\[INVERT\])(.+?)(\[\/INVERT\])/ig,'<table style="filter:invert"><tr><td>$2<\/td><\/tr><\/table>');
	text = text.replace(/(\[xray\])(.+?)(\[\/xray\])/ig,'<table style="filter:xray"><tr><td>$2<\/td><\/tr><\/table>');

	//代码标签
	//text = text.replace(/\[code(=.*?)?\](.+?)\[\/code\]/ig,'<br><table cellpadding=0 cellspacing=0 width=94% bgcolor=#000000 align=center style=table-layout:fixed><tr><td><table width=100% cellpadding=5 cellspacing=1 style=table-layout:fixed><tr><td bgColor='+quoteback+' style=\"left: 0px; width: 100%; word-wrap: break-word\">代码：<hr size=1><code>$2<\/code><\/td><\/tr><\/table><\/td><\/tr><\/table><br>');

	//表情处理
	//text = text.replace(/\[em\](\d{1,2})\[\/em\]/ig,'<img src="http://smsimg.163.com/mblog/v1/emo/$1.gif" border=0 />');
	text = text.replace(/\[em(\d+?)\]/ig,'<img src="/bbs/images/em$1.gif" border=0 />');
	return text;
}
