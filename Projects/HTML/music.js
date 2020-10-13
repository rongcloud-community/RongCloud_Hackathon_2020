var musicNode = document.getElementsByClassName('music')[0];
var     mlist = document.getElementsByClassName('mlist')[0];
var       lis = document.getElementsByTagName('li');
var       len = lis.length;
var  musicsrc =[ "https://webfs.yun.kugou.com/202010101304/00b205239d130f2d6100298bcad05bba/G053/M08/17/15/1YYBAFahAXKAFPI9AEVo7d5V5XY460.mp3","https://webfs.yun.kugou.com/202010101259/232c748b05d806abbf4186fd7b47c3c2/G134/M08/18/1D/ZpQEAFtNlKqAAewBAEQ1qkxpSa4074.mp3"];//这个数组用来放歌单的url。详情可以看我的网页demo
   musicNode.src = musicsrc[1];
 for (var i = 0; i < len; i++) {//单击改变playmusic
 	(function(i){
 		lis[i].onclick =function(){        
 		musicNode.src = musicsrc[i];
 		musicNode.load();
 		musicNode.play();
 		for (var j= 0; j < len; j++) {
 			lis[j].className = '';
 		}
 		this.className = 'play';
 	}})(i);
 }
 musicNode.onended =function(){//音乐播放完后自动下一曲
 	 var ended = getPlay();
     if (ended == len-1) {//若为最后一曲则放第一曲
      musicNode.src = musicsrc[0];
      lis[0].className = 'play'
       lis[ended].className = '';
      musicNode.load();
 	  musicNode.play(); 
     }else{ 
      musicNode.src = musicsrc[ended + 1];
      lis[ended + 1].className = 'play';
      lis[ended].className = '';
      musicNode.load();
 	  musicNode.play(); }
     
 }
function getPlay(){//获取正在播放music的li
     for (var i = 0; i < len; i++) {
     	if (lis[i].getAttribute('class') == 'play') {
     		return i
     	}
      }
}
