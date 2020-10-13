<!--
var splitchar = "$";
var default_floor = "";
var default_wall = "";
var default_swall = "";
var default_img_path = "http://tj.163.com/house_img/";
var default_img_type = ".gif";
var my_index = my_items.split(",").length;
var current_items = "";
var player = "tjplayer";
var player_feel = "";
var player_hair = "";
var player_body = "";
var player_up_dress = "";
var player_down_dress = "";
var event_id = "none";
var menuover_bgcolor = "#666666";
var menuover_fgcolor = "#ffffff";
var default_menuover_bgcolor = "#ffffff";
var default_menuover_fgcolor = "#000000";
var ox = p_x - 155;
var oy = p_y - 210;
var main_ypos_min = p_y ;
var main_xpos_min = p_x ;
var main_ypos_max = p_y + 225;
var main_xpos_max = p_x + 450;
var select_item = "";
var item_list = new Array();
var item_out = "";
var item_lock = "";
var item_maxcnt = 10;
var item_incnt = 0;
var item_buycnt = 0;
var item_wall = "";
var item_floor = "";
var item_swall = "";
var item_wall_buy = "";
var item_floor_buy = "";
var item_swall_buy = "";
var tdCss1 = "class=\"tdCap\" style=\"cursor:hand;\" onMouseOver=\"this.style.backgroundColor = '#FFF4CC'\" onMouseOut=\"this.style.backgroundColor = ''\"";
var tdCss2 = "";
var spanCss1 = "style=\"cursor:hand;\" onMouseOver=\"this.style.color = '#FF9900'\" onMouseOut=\"this.style.color = ''\"";

function test(){
 document.selection.createRange().pasteHTML("<div id='" + item_id + "' style='position:absolute;top:" + main_ypos_min + ";left:" + main_xpos_min + ";pixelwidth:" + w + ";pixelheight:" + h + ";cursor:move;visibility:visible;z-index:" + eval(item_incnt + 1) + "' onmouseover=\"this.style.border='1 groove black';this.style.pixelTop=this.style.pixelTop-1;this.style.pixelLeft=this.style.pixelLeft-1;\" onmouseout=\"this.style.border='0';this.style.pixelTop=this.style.pixelTop+1;this.style.pixelLeft=this.style.pixelLeft+1;\"><img src='/images/addtofriendicon.gif' border='0'></div>")
}


function beginDrag() {
dragThis = event.srcElement;
dragThis = dragThis.parentElement;
if (dragThis.id.indexOf("tjp_") != -1) dragThis = document.all["tjplayer"];
if (dragThis.id == "floor" || dragThis.id == "wall" ) return;
if (item_lock.indexOf(dragThis.id + ",")!=-1) return false;
oldX = (event.clientX + document.body.scrollLeft);
oldY = (event.clientY + document.body.scrollTop);
}


function dragIt() {
if (dragThis == null) return ;
if (dragThis.id == "floor" || dragThis.id == "wall") return;
if (item_lock.indexOf(dragThis.id + ",")!=-1) return false;
newX = (event.clientX + document.body.scrollLeft);
newY = (event.clientY + document.body.scrollTop);
var distanceX = (newX - oldX);
var distanceY = (newY - oldY);
oldX = newX;
oldY = newY;
if (dragThis.style.pixelLeft >= main_xpos_min && dragThis.style.pixelLeft <= main_xpos_max - dragThis.style.pixelwidth)
dragThis.style.pixelLeft += distanceX;
else{
if (dragThis.style.pixelLeft < main_xpos_min )
dragThis.style.pixelLeft = main_xpos_min;
else if (dragThis.style.pixelLeft > main_xpos_max - dragThis.style.pixelwidth)
dragThis.style.pixelLeft = main_xpos_max - dragThis.style.pixelwidth - 1;
}
if (dragThis.style.pixelTop >= main_ypos_min && dragThis.style.pixelTop <= main_ypos_max - dragThis.style.pixelheight)
dragThis.style.pixelTop += distanceY;
else
{
if (dragThis.style.pixelTop < main_ypos_min )
dragThis.style.pixelTop = main_ypos_min;
else if (dragThis.style.pixelTop > main_ypos_max - dragThis.style.pixelheight)
dragThis.style.pixelTop = main_ypos_max - dragThis.style.pixelheight - 1;
}
event.returnValue = false;
}


function endDrag() {
if (dragThis!=null){
if (dragThis.style.pixelLeft < main_xpos_min )
dragThis.style.pixelLeft = main_xpos_min + 1;
else if (dragThis.style.pixelLeft > main_xpos_max - dragThis.style.pixelwidth)
dragThis.style.pixelLeft = main_xpos_max - dragThis.style.pixelwidth - 1;
if (dragThis.style.pixelTop < main_ypos_min )
dragThis.style.pixelTop = main_ypos_min + 1;
else if (dragThis.style.pixelTop > main_ypos_max - dragThis.style.pixelheight)
dragThis.style.pixelTop = main_ypos_max - dragThis.style.pixelheight - 1;
}
dragThis = null;
}

function menuOut(obj)
{
obj.style.color = default_menuover_fgcolor
obj.style.backgroundColor = default_menuover_bgcolor
}

function menuOver(obj,obj_child)
{
obj.style.color = menuover_fgcolor
obj.style.backgroundColor = menuover_bgcolor
hideChild(obj_child)
viewSubMenu(event, obj, obj_child)
}

function menuOver_child(obj)
{
obj.style.color = menuover_fgcolor
obj.style.backgroundColor = menuover_bgcolor
}

function viewSubMenu(e, ar_obj, ar_id) {
if (ar_id == "none") return;
event_id = ar_id
item_child1.style.pixelLeft = 70;
item_child1.style.pixelTop = 30;
eval(ar_id + ".style.display = \"\"");
}

function hideChild(ar_id) {
if (event_id == "none") return;
item_child1.style.display = "none";
}

function showmenu()
{
selecteditem = event.srcElement;
selecteditem = selecteditem.parentElement;
if (selecteditem.id.indexOf("tjp_") != -1) {
selecteditem = document.all["tjplayer"]
}
select_item = selecteditem

if (selecteditem.id == ""){
return false;
}

if (selecteditem.id == "floor" || selecteditem.id == "wall" || selecteditem.id == "DIVitem" || selecteditem.id == "menubar" || selecteditem.id == "itemlist" || selecteditem.id == "swall") return false;


for (i=0;i<item_incnt;i++){

if (item_list[i] != selecteditem.id)
eval(item_list[i] + ".style.border = \"0\"");
}

endDrag()

var rightedge = document.body.clientWidth-event.clientX;
var bottomedge = document.body.clientHeight-event.clientY;
if (rightedge < item_menu.offsetWidth)
item_menu.style.left = document.body.scrollLeft + event.clientX - item_menu.offsetWidth;
else
item_menu.style.left = document.body.scrollLeft + event.clientX;
if (bottomedge < item_menu.offsetHeight)
item_menu.style.top = document.body.scrollTop + event.clientY - item_menu.offsetHeight;
else
item_menu.style.top = document.body.scrollTop + event.clientY;
item_menu.style.visibility   = "visible";
return false;
}

function hidemenu()
{
if (select_item != "") select_item.style.border="0";
item_menu.style.visibility = "hidden";
}

function exec_menuitem(ch){
var ch_zindex = 0;
switch(ch){

case "direction" :
if (select_item.id == "tjplayer"){
break;
}
var hideidx = 0;
for (i=0;i<item_incnt;i++){
if (item_list[i] == select_item.id){
hideidx = i;
break;
}
}
direction_change(select_item);
break;

case "hide" :
if (select_item.id == "tjplayer"){
alert("人物不能消除!");
break;
}
if (my_items.indexOf(select_item.id) != -1)
{
alert("要保管你的物件,请放到杂物房!");
break;
}
item_out = item_out + select_item.id + ","
var hideidx = 0;
for (i=0;i<item_incnt;i++){
if (item_list[i] == select_item.id){
hideidx = i;
break;
}
}
item_incnt--;
item_buycnt--;
for (i = hideidx;i<item_incnt;i++){
item_list[i] = item_list[i + 1]
}
select_item.outerHTML = "";
break;

case "lock" :
/* 人物也可以锁定
if (select_item.id == "tjplayer"){
break;
}
*/
var hideidx = 0;
for (i=0;i<item_incnt;i++){
if (item_list[i] == select_item.id){
hideidx = i
break;
}
}
lock_item(select_item)
break;

case "deposit" :
if (select_item.id == "tjplayer"){
break;
}
var hideidx = 0;
for (i=0;i<item_incnt;i++){
if (item_list[i] == select_item.id){
hideidx = i;
break;
}
}
item_incnt--;
for (i = hideidx;i<item_incnt;i++){
item_list[i] = item_list[i + 1]
}
var j = select_item.id.indexOf("s");
var temp = select_item.id.substring(1,j);
deposit_items = deposit_items + temp + ",";
select_item.outerHTML = "";
break;

case "up" :
for (i=0;i<item_incnt;i++){
eval(item_list[i] + ".style.zIndex = " + item_list[i] + ".style.zIndex - 1");
if (eval(item_list[i] + ".style.zIndex") < 1) eval(item_list[i] + ".style.zIndex = 1")
}
select_item.style.zIndex = item_incnt;
break;

case "down" :
for (i=0;i<item_incnt;i++){
eval(item_list[i] + ".style.zIndex = " + item_list[i] + ".style.zIndex + 1");
if (eval(item_list[i] + ".style.zIndex") <= 1) eval(item_list[i] + ".style.zIndex = 2")
}
select_item.style.zIndex = 1;
break;

case "stepup" :
ch_zindex = select_item.style.zIndex;
if (select_item.style.zIndex == item_incnt)
return;
ch_zindex = select_item.style.zIndex + 1;
for (i=0;i<item_incnt;i++){
if (eval(item_list[i] + ".style.zIndex") == ch_zindex)
eval(item_list[i] + ".style.zIndex = " + item_list[i] + ".style.zIndex - 1")
if (eval(item_list[i] + ".style.zIndex") < 1)
eval(item_list[i] + ".style.zIndex = 1")
}
if (select_item.style.zIndex < item_incnt)
select_item.style.zIndex = select_item.style.zIndex + 1;
break;

case "stepdown" :
ch_zindex = select_item.style.zIndex;
if (select_item.style.zIndex <= 1) return;
ch_zindex = select_item.style.zIndex - 1;
for (i=0;i<item_incnt;i++){
if (eval(item_list[i] + ".style.zIndex") == ch_zindex)
eval(item_list[i] + ".style.zIndex = " + item_list[i] + ".style.zIndex + 1")
if (eval(item_list[i] + ".style.zIndex") <= 1) eval(item_list[i] + ".style.zIndex = 2")
}
if (select_item.style.zIndex > 1)
select_item.style.zIndex = select_item.style.zIndex - 1;
break;

default : break;
}

return;
}

function setinit() {
document.oncontextmenu = showmenu;
document.onmousemove = dragIt;
document.onmousedown = beginDrag; //IE扩展当用户在对象点击右键.
document.onmouseup = endDrag;
document.body.onclick = hidemenu;
oldX=oldY=newX=newY=0,dragThis=null;
}

function getImgSrc(id)
{
	return default_img_path + id.substring(0,2) + "/" + id + default_img_type;
}


function setItem(id,size){
var src = getImgSrc(id);
if(id.substring(0,4)=="0101") {
	src=src.replace(".gif","W.gif");
    item_swall = "";
	swall.innerHTML = "";
	wall.innerHTML = "<img src=" + src + ">";
	item_wall = "W"+id;
}
else if (id.substring(0,4)=="0102") {
	src=src.replace(".gif","F.gif");
	item_swall = "";
	swall.innerHTML = "";
	floor.innerHTML = "<img src=" + src + ">";
	item_floor = "F"+id;
}
else if (id.substring(0,4)=="0107") {
	src=src.replace(".gif","K.gif");
	wall.innerHTML = "";
	item_wall = "";
	floor.innerHTML = "";
	item_floor = "";
	swall.innerHTML = "<img src=" + src + ">";
	item_swall = "K"+id;
}
else
{
	var item_id = "P" + id + "s" + item_incnt;
	item_list[item_incnt] = item_id;
	src=src.replace(".gif","P.gif");
	var w = size.substring(0,3);
	var h = size.substring(3);
	document.selection.createRange().pasteHTML("<div id='" + item_id + "' style='position:absolute;top:" + main_ypos_min + ";left:" + main_xpos_min + ";pixelwidth:" + w + ";pixelheight:" + h + ";cursor:move;visibility:visible;z-index:" + eval(item_incnt + 1) + "' onmouseover=\"this.style.border='1 groove black';this.style.pixelTop=this.style.pixelTop-1;this.style.pixelLeft=this.style.pixelLeft-1;\" onmouseout=\"this.style.border='0';this.style.pixelTop=this.style.pixelTop+1;this.style.pixelLeft=this.style.pixelLeft+1;\"><img src='"+ src +"' border='0'></div>")
	item_incnt++;
	item_buycnt++;
}

}



function setmyitem(url,item_id,top,left,index,direction,width,height){
var len = url.length;
var id  = url.substring(len-11,len-4);
if (id.substring(0,4)=="0101") {
url=url.replace(".gif","W.gif");
wall.innerHTML = "<img src=" + url + ">"
item_wall = item_id;
}
else if (id.substring(0,4)=="0102") {
url=url.replace(".gif","F.gif");
floor.innerHTML = "<img src=" + url + ">"
item_floor = item_id;
}
else if (id.substring(0,4)=="0107") {
url=url.replace(".gif","K.gif");
swall.innerHTML = "<img src=" + url + ">"
item_swall = item_id;
}
else
{
	var append = "";
	if (direction == "R")
		append = "filter:FlipH;";
	item_list[item_incnt] = item_id;
	url=url.replace(".gif","P.gif");
	document.selection.createRange().pasteHTML("<div id='" + item_id + "' style='position:absolute;top:" + top + ";left:" + left + ";pixelwidth:" + width + ";pixelheight:" + height + ";" + append + "cursor:move;visibility:visible;z-index:" + index + "' onmouseover=\"this.style.border='1 groove black';this.style.pixelTop=this.style.pixelTop-1;this.style.pixelLeft=this.style.pixelLeft-1;\" onmouseout=\"this.style.border='0';this.style.pixelTop=this.style.pixelTop+1;this.style.pixelLeft=this.style.pixelLeft+1;\"><img src='"+ url +"' id='img" + item_id + "' border='0'></div>");
	item_incnt++;
}
}

function setDItems(id){
	var src = getImgSrc(id);
	if(id.substring(0,4)=="0101")
	{
		src = src.replace(".gif","W.gif");
		wall.innerHTML = "<img src=" + src + ">";
		item_wall = "W"+id;
	}
	else if (id.substring(0,4)=="0102")
	{
		src = src.replace(".gif","F.gif");
		floor.innerHTML = "<img src=" + src + ">";
		item_floor = "F"+id;
	}
	else
	{
		var item_id =  "P" + id + "s" + item_incnt;
		item_list[item_incnt] = item_id;
		var tempimg = new Image();
		src = src.replace(".gif","P.gif");
		tempimg.src = src;
		document.selection.createRange().pasteHTML("<div id='" + item_id + "' style='position:absolute;top:" + main_ypos_min + ";left:" + main_xpos_min + ";pixelwidth:" + tempimg.width + ";pixelheight:" + tempimg.height + ";cursor:move;visibility:visible;z-index:" + eval(item_incnt + 1) + "' onmouseover=\"this.style.border='1 groove black';this.style.pixelTop=this.style.pixelTop-1;this.style.pixelLeft=this.style.pixelLeft-1;\" onmouseout=\"this.style.border='0';this.style.pixelTop=this.style.pixelTop+1;this.style.pixelLeft=this.style.pixelLeft+1;\"><img src='"+ src +"' border='0'></div>")
		item_incnt++;
		my_index++;
		var j = deposit_items.indexOf(id);
		var str1,str2;
		if (j!=-1)
		{
			var k = j + id.length;
			str1 = deposit_items.substring(0,j);
			str2 = deposit_items.substring(k+1);
			deposit_items = str1 + str2;
		}
	}
}

function allreset(){
for (i=0;i<item_incnt;i++){
if (item_list[i].indexOf("tjplayer") == -1)
	eval(item_list[i] + ".outerHTML = ''");
}

if (item_swall_buy!=""){
swall.innerHTML = "";
item_swall_buy = "";
}
item_buycnt = 0;
item_incnt = 0;
item_lock = "";
item_list = new Array();
set_avatar(80,200,'1');
init_my_items();
}

function itemAllOut(){
if (item_incnt < 2) {
	//alert("目前没有道具!");
	return;}
for (i=0;i<item_incnt;i++){
if (item_list[i].indexOf("tjplayer") == -1)
eval(item_list[i] + ".outerHTML = ''");
}
wall.innerHTML = "<img src=\"http://smsimg.163.com/tj/pic/house_wall.gif\">";
floor.innerHTML = "<img src=\"http://smsimg.163.com/tj/pic/house_floor.gif\">";
swall.innerHTML = default_swall;
item_buycnt = 0;
item_incnt = 0;
item_list = new Array();
item_list[item_incnt] = "tjplayer" ;
item_incnt = item_incnt + 1;
item_floor_buy = "";
item_wall_buy = "";
item_swall_buy = "";
}

function lock_item(obj){
if (item_lock.indexOf(obj.id + ",") != -1)
item_lock = item_lock.replace(obj.id + ",","");
else
item_lock = item_lock + obj.id + ",";
}

function direction_change(obj){
if (obj.style.filter=="")
obj.style.filter="FlipH";
else
obj.style.filter="";
}

function buy_all(){

var itemdir = "";
var itemdircd = "";
var itemlist_buy = "";
if (item_buycnt < 1) {
alert("没有东西需要购买!");
return;
}

for (var i = my_index;i<item_incnt;i++){

itemdir = eval(item_list[i] + ".style.filter");

if (itemdir != "")
itemdircd = "R";
else
itemdircd = "L";

itemlist_buy = itemlist_buy + item_list[i] + splitchar + eval(item_list[i] + ".style.pixelTop") + splitchar + eval(item_list[i] + ".style.pixelLeft") + splitchar + eval(item_list[i] + ".style.zIndex") + splitchar + itemdircd + ",";

}

if (item_floor_buy != "") itemlist_buy = itemlist_buy + item_floor_buy;
if (item_wall_buy != "") itemlist_buy = itemlist_buy + item_wall_buy;
if (item_swall_buy != "") itemlist_buy = itemlist_buy + item_swall_buy;
alert(itemlist_buy);

}


function set_avatar(top,left,index)
{
	item_list[item_incnt] = "tjplayer";
	item_incnt = item_incnt + 1;
	tjplayer.style.pixelTop = top + 30;
	tjplayer.style.pixelLeft = left;
	tjplayer.style.zindex = index;
}

function save_items()
{
	var itemdir = "";
	var itemdircd = "";
	var current_items = "";
	for (var i = 1;i<item_incnt;i++)
	{
		itemdir = eval(item_list[i] + ".style.filter");
		if (itemdir != "")
		itemdircd = "R";
		else
		itemdircd = "L";
		current_items = current_items + item_list[i] + splitchar + (eval(item_list[i] + ".style.pixelTop")-oy) + splitchar + (eval(item_list[i] + ".style.pixelLeft")-ox) + splitchar + eval(item_list[i] + ".style.zIndex") + splitchar + itemdircd  + splitchar +  eval(item_list[i] + ".style.pixelwidth") + splitchar + eval(item_list[i] + ".style.pixelheight") + ",";
	}
	if (item_floor != "") current_items = current_items + item_floor +",";
	if (item_wall != "") current_items = current_items + item_wall + ",";
	if (item_swall != "") current_items = current_items + item_swall + ",";
	document.form1.pmy_items.value=current_items;
	document.form1.pdeposit_items.value=deposit_items;
	document.form1.action.value="save";
	document.form1.submit();
}


function init_my_items()
{
	var my_items_arr = my_items.split(",");
	var my_item_info ;
	var img_name,img_url,j;
	var img_width,img_height;
	for (var i = 0; i < my_items_arr.length; i++)
	{
		if(my_items_arr[i] == "")
			continue;
		my_item_info=my_items_arr[i].split(splitchar);
		if (my_item_info[0].charAt(0)=='P')
		{
			j = my_item_info[0].indexOf("s");
			img_name = my_item_info[0].substring(1,j);
			img_url = getImgSrc(img_name);
			img_top = parseInt(my_item_info[1]) + oy; //增加位移差
		    img_left = parseInt(my_item_info[2]) + ox; //增加位移差
			img_width = my_item_info[5] - 0;
			img_height = my_item_info[6] - 0;
			if(img_width==0 || img_height==0 )
			{
				continue;}
			setmyitem(img_url,my_item_info[0],img_top,img_left,my_item_info[3],my_item_info[4],my_item_info[5],my_item_info[6]);
		}
		else if(my_item_info[0].charAt(0)=='W')
		{
			img_name = my_item_info[0].substring(1);
			img_url = getImgSrc(img_name);
			setmyitem(img_url,my_item_info[0]);
		}
		else if(my_item_info[0].charAt(0)=='F')
		{
			img_name = my_item_info[0].substring(1);
			img_url = getImgSrc(img_name);
			setmyitem(img_url,my_item_info[0]);
		}
		else if(my_item_info[0].charAt(0)=='K')
		{
			img_name = my_item_info[0].substring(1);
			img_url = getImgSrc(img_name);
			setmyitem(img_url,my_item_info[0]);
		}
	}
}

//var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//xmlhttp.open("POST", "http://tj.163.com/servlet/ItemXML", false);
//xmlhttp.send();
//alert(xmlhttp.responseXML.xml);
var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
//var xmlDoc=new ActiveXObject("Msxml2.DOMDocument");
xmlDoc.async="false";
//xmlDoc.setProperty("SelectionLanguage", "XPath");
xmlDoc.load("http://tj.163.com/xml/itemlist_new.xml");
var root = xmlDoc.documentElement;
var browser = navigator.appVersion;
var other = "";
//var other = "<td  align=\"center\"><span onMouseOver=\"this.style.color = '#FF3300'\"  onMouseOut=\"this.style.color = ''\" onClick=searchBar(); style=cursor:hand; ><b>┊搜索┊</b></span></td>";
//chcekBrowser(browser);

function chcekBrowser(browser)
{
	if (browser.indexOf("MSIE 5.0")==-1)
		xmlDoc.setProperty("SelectionLanguage", "XPath");
	else
		other = "";
}

function initCat()
{
var temp = "";
var html = "<table width=\"450\" background=\"http://smsimg.163.com/tj/pic/lcaidanbg2.gif\"   height=\"30\"><tr>";
for (var i=0;i<root.childNodes.length;i++)
{
temp = root.childNodes(i).getAttribute("name");
html += "<td align=\"center\"><span onMouseOver=\"this.style.color = '#FF3300'\"  onMouseOut=\"this.style.color = ''\" onClick=initSubCat('"+ temp +"');showAll('"+temp+"'); style=cursor:hand; ><b>┊"+ temp +"┊</b></span></td>";
}
html += other;
html += "</tr></table>";
document.all["cat"].innerHTML = html;
}

function initSubCat(name)
{
var temp = "";
var subcat = xmlDoc.selectNodes("/itemlist/categeory[@name='"+ name +"']/subcategeory");
var html = "<table align=\"center\" width=\"450\"><tr><td onClick=\"showAll('"+ name +"');\" "+tdCss1+">全部</td>";
for(var i=0;i<subcat.length;i++)
{
temp = subcat.item(i).getAttribute("name");
html += "<td onClick=initItems('"+ temp +"'); "+tdCss1+">"+ temp +"</td>";
}
html += "</tr><table>";
document.all["items"].innerHTML = "";
document.all["subcat"].innerHTML = html;
}

function initItems(subCatName)
{
var xpath = "/itemlist/*/subcategeory[@name='"+ subCatName +"']/item";
itemTemplate(xpath,1);
}

function showAll(catName)
{
var xpath = "//categeory[@name='"+ catName +"']/*/item";
itemTemplate(xpath,1);
}

function searchEngine(name)
{
var xpath = "//item/name[contains(.,'"+ name +"')]/..";
itemTemplate(xpath,1);
}

function newArrival()
{
//var xpath = "//item/time[contains(.,'"+ name +"')]/..";
//itemTemplate(xpath);
}

function despositAllItems()
{
	for (var i = 1;i<item_incnt;i++)
		deposit_items += item_list[i].substring(1,8) + ",";
	itemAllOut();
	my_items = "";
}

function myDesposit(page)
{
	var itemArr = deposit_items.split(",");
	var html = "<table width=\"450\" border=\"0\" cellpadding=\"0\" cellspacing=\"9\" bgcolor=\"#CCCCCC\"><tr>";
	var k = 0;
	var allnum = itemArr.length-1;
	var totpage = 1;
	var p = 1;
	var ppre = 1;
	var pnext = 1;
	var recPerPage = 8;
	if(allnum!=0)
	{
		totpage = Math.floor(allnum/recPerPage);
		if(allnum%recPerPage!=0) totpage++;
		p = page;
		if(p<=1) {p = 1;ppre = p;}else{ppre = p - 1;}
		if(p>=totpage) {p = totpage;pnext = p;}else{pnext = p - 0 + 1;}
	}
	var loopend = p*recPerPage;
	if(loopend > allnum) loopend = allnum;
	for(var i=(p-1)*recPerPage;i<loopend;i++)
	{
		if(itemArr[i]=="")
			continue;
		imgsrc = getImgSrc(itemArr[i]);
		html += "<td width=\"25%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#FFFFFF\"><tr><td height=\"100\" width=\"100\" align=\"center\"><span onClick=setDItems(\""+itemArr[i]+"\"); style=\"cursor:hand;\"><img src='"+ imgsrc +"' border=\"0\"  align=\"absbottom\"></span></td></td></tr></table></td>";
		k = (i+1)%4;
		if ((i+1)!=loopend && k==0)
			html += "</tr><tr>";
		else if ((i+1)==loopend && k!=0)
		{
			for (var j=0;j<(4-k);j++)
				html += "<td width=25% ></td>";
		}
	}
	var index = "<tr><td colspan=\"2\">";
	index += "第<b>" + p + "</b>页,共<b>"+ totpage + "</b>页,<b>"+ allnum +"</b>件物件";
	index += "</td><td colspan=\"2\" align=\"right\">";
	if(p>1)
		index += "<span onClick=myDesposit("+ppre+"); "+spanCss1+"> <b>上一页</b></span>";
	else
		index += " 上一页";
	if(p>= totpage)
		index += " 下一页";
	else
		index += "<span onClick=myDesposit("+pnext+"); "+spanCss1+"> <b>下一页</b></span>";
	index += " 转到第<select name=\"select\" onChange=myDesposit(this.options[this.selectedIndex].value);>";
	for(var i=1;i<=totpage;i++)
	{
	  if(i==p)
		index += "<option value="+i+" selected>"+i+"</option>";
	  else
		index += "<option value="+i+">"+i+"</option>";
	}
	index += "</select>页</td></tr>";
	html += "</tr>"+ index +"<table>";
	document.all["subcat"].innerHTML = "<table width=\"450\" border=\"0\" align=\"center\"  ><tr><td onClick=\"despositAllItems();\" "+ tdCss1 +">存放目前所有物品</td><td onClick=\"myDesposit(1);\" " + tdCss1 + ">刷新</td><td onClick=\"deposit_items='';myDesposit(1);\" "+ tdCss1 +">清空</td></tr></table>";
	document.all["items"].innerHTML = html;
}

function itemTemplate(xpath,page)
{
	var k = 0;
	var itemNodeList = xmlDoc.selectNodes(xpath);
	var html = "<table width=\"450\" border=\"0\" cellpadding=\"0\" cellspacing=\"9\" bgcolor=\"#CCCCCC\"><tr>";
	var allnum = itemNodeList.length;
	var totpage = 1;
	var p = 1;
	var ppre = 1;
	var pnext = 1;
	var recPerPage = 8;
	if(allnum!=0)
	{
		totpage = Math.floor(allnum/recPerPage);
		if(allnum%recPerPage!=0) totpage++;
		p = page;
		if(p<=1) {p = 1;ppre = p;}else{ppre = p - 1;}
		if(p>=totpage) {p = totpage;pnext = p;}else{pnext = p - 0 + 1;}
	}
	var loopend = p*recPerPage;
	if(loopend > allnum) loopend = allnum;
	for(var i=(p-1)*recPerPage;i<loopend;i++)
	{
		node =  itemNodeList.item(allnum-i-1);
		id = node.childNodes(0).text;
		name = node.childNodes(1).text;
		price = node.childNodes(2).text;
		size = node.childNodes(3).text;
		series = node.childNodes(4).text;
		time = node.childNodes(5).text;
		imgsrc = getImgSrc(id);
		html += "<td width=\"25%\" valign=\"top\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#FFFFFF\"><tr><td height=\"100\" width=\"100\" align=\"center\"><span onClick=setItem(\""+id+"\",\""+size+"\"); style=\"cursor:hand;\"><img src='"+ imgsrc +"' border=\"0\"  align=\"absbottom\"></span></td></td></tr><tr><td bgcolor=\"#B7B7B7\" align=\"center\"><font color=\"#FFFFFF\">" + name + "</font></td></tr></table></td>";
		k = (i+1)%4;
		if ((i+1)!=loopend && k==0)
			html += "</tr><tr>";
		else if ((i+1)==loopend && k!=0)
		{
			for (var j=0;j<(4-k);j++)
				html += "<td width=25% ></td>";
		}
	}
	var index = "<tr><td colspan=\"2\">";
	index += "第<b>" + p + "</b>页,共<b>"+ totpage + "</b>页,<b>"+ allnum +"</b>件物件";
	index += "</td><td colspan=\"2\" align=\"right\">";
	if(p>1)
		index += "<span onClick=itemTemplate(\""+xpath+"\","+ppre+"); "+spanCss1+"> <b>上一页</b></span>";
	else
		index += " 上一页";
	if(p>= totpage)
		index += " 下一页";
	else
		index += "<span onClick=itemTemplate(\""+xpath+"\","+pnext+"); "+spanCss1+"> <b>下一页</b></span>";
	index += " 转到第<select name=\"select\" onChange=itemTemplate(\""+xpath+"\",this.options[this.selectedIndex].value);>";
	for(var i=1;i<=totpage;i++)
	{
	  if(i==p)
		index += "<option value="+i+" selected>"+i+"</option>";
	  else
		index += "<option value="+i+">"+i+"</option>";
	}
	index += "</select>页</td></tr>";
	html += "</tr>"+ index +"<table>";
	document.all["items"].innerHTML = html;
}

function selectModule(module)
{
	var ok = window.confirm('如果你使用了小屋模板,当前小屋摆设会被覆盖,确定吗?\n(ps:你可以先保存当前小屋后再使用模板)');
	if(ok){
		my_items = module;
		clearHouse();
		init_my_items();
	}
}

function clearHouse()
{
	deposit_items = "";
	item_floor ="";
	item_wall ="";
	item_swall ="";
	itemAllOut();
}

function searchBar()
{
document.all["subcat"].innerHTML = "<table><tr><td>名称:<input type=\"text\" name=\"key\" maxlength=\"10\" size=\"10\"> <span  onClick=searchEngine(checkKey(key.value));  style=\"cursor:hand;\">搜!</span></td></tr></table>";
}

function checkKey(str)
{
var notValid=/(^\s)|(\s$)/;
while(notValid.test(str))
 str=str.replace(notValid,"");
str = str.replace("<","&lt");
str = str.replace(">","&gt");
return str;
}
//-->
