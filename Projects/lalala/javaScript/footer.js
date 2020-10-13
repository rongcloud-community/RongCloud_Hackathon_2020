var msg = "山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨......" ;
var interval = 100
var spacelen = 120;
var space10=" ";
var seq=0;
function Scroll() {
len = msg.length;
window.status = msg.substring(0, seq+1);
seq++;
if ( seq >= len ) { 
seq = 0; 
window.status = '';
window.setTimeout("Scroll();", interval );
}
else
window.setTimeout("Scroll();", interval );
} 
Scroll();