var msg = "ɽ���ڸߣ�����������ˮ������������顣˹��ª�ң�Ω���ܰ......" ;
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