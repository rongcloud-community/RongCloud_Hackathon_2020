<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>书城</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <%@ include file="../tags/taglib.jsp"%>
      <script src="http://cdn.ronghub.com/RongIMLib-3.0.7-dev.js"></script>
  </head>
  <style>
      .m-publicebox{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
      .m-extrudearound{
          width: 100%;
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
      .extrudearoundlist{
          width: 70%;
          height: 160px;
          background-color: white;
          box-shadow: 0 2px 15px 0 rgba(0,0,0,0.06);
          border-radius: 5px;
      }
      .godetail{
          display: flex;
          flex-direction: row;
          height: 160px;
          width: 100%;
      }
      .coverwra{
          width: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
      .coverwra img{
          width: 110px;
          border-radius: 5px;
      }
      .deswra{
          padding: 10px 10px 10px 10px;
          flex: 1;
      }
      .deswra .title{
          font-size: 20px;
          line-height: 23px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #333;
      }
      .deswra .author{
          padding: 10px 0 10px 0;
          font-size:14px;
          color: #999;
          line-height: 23px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }

      .m-extrudearound .extrudearoundlist li .godetail .gofree {
          display: inline-block;
          margin-top: 35px;
          text-align: center;
          float: right;
          background-image: -webkit-linear-gradient(left, #4ce199 0, #00d28d 100%);
          background-image: -o-linear-gradient(left, #4ce199 0, #00d28d 100%);
          background-image: linear-gradient(to right, #4ce199 0, #00d28d 100%);
          background-repeat: repeat-x;
          font-size: 14px;
          color: #fff;
          line-height: 23px;
          height: 35px;
          width: 120px;
          border-radius: 30px;
          padding: 5px 2px 0 0 ;
      }

      .m-readertext{
          padding: 10px 10px 10px 10px;
      }
      .m-readertext .title {
          font-size: 21px;
          color: #2a2b2a;
          line-height: 32px;
          padding-bottom: 13px;
          text-align: center;
      }

      .m-readertext .readerp {
          font-size: 16px;
          color: #353533;
          text-align: justify;
          line-height: 32px;
          text-indent:2em;
      }

      .m-bookscut{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
      }

      .m-bookscut {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
      }
      .m-bookscut span {
          width: 100px;
          height: 40px;
          display: block;
          background: #f5e5cf;
          border-radius: 5px;
          line-height: 40px;
          font-size: 16px;
          color: grey;
          text-align: center;
          font-weight: bold;
          -moz-box-flex: 1;
          -webkit-box-flex: 1;
          box-flex: 1;
      }
      .shang{
          margin-right: 20px;
      }

      .xia{
          margin-left: 20px;
      }

       #goreg {   width: 70px;
                 position: fixed;
                 bottom: 20px;
                 right: 25px;
                z-index: 100;
                 opacity:0.8;
                 text-align: center;
             }
       #goreg span {
                  text-decoration:none;
                  width: 55px;
                  height: 55px;
                  display: inline-block;
                  background-color: #00d28d;
                  padding-top: 20px;
                  color: whitesmoke;
                  overflow: hidden;
           box-shadow: 0 2px 15px 0 rgba(0,0,0,0.06);
           border-radius: 65px;
              }
       #goreg span:hover {
                  background-color: #ccc;
              }

  </style>
  <body style="background-color: #f6efe6">
  <div id="goreg"><span>Room</span></div>
  < <main class="m-publicebox">
      <section class="m-extrudearound">
          <ul class="extrudearoundlist" >
              <li>
                  <a href="javascript:;" class="godetail" data-show-pingback-id="72091785590955" data-pingback-id="57673428472764">
                      <div class="coverwra">
                          <img src="//pic5.iqiyipic.com/image/20190807/80/61/bk_100246216_r_601_m2.jpg" alt="" class="bookcover">
                      </div>
                      <div class="deswra">
                          <h3 class="title">
                              <p>免费下载此书，离线随时看</p>
                          </h3>
                          <h4 class="author">
                              <strong style="    color: #2a2a2a;">18546</strong>人已下载
                          </h4>
                          <div class="gofree">
                              <div class="maxtext">免费读全文</div>
                          </div>
                      </div>
                  </a>
              </li>
          </ul>
      </section>
      <section class="m-readertext" isshow="true"><h1 class="title"><strong>序</strong></h1> <div class="readerpwra"><p class="readerp">

      <!----></p><p class="readerp">
      献给周一夜间小组

      <!----></p><p class="readerp">
      ——戴夫、约翰、皮特、菲尔与特蕾西——

      <!----></p><p class="readerp">
      感谢那些奇思妙想……

      <!----></p><p class="readerp">
      它又来了，她能听到自己床脚的动静。

      <!----></p><p class="readerp">
      她试着做个听话的乖孩子不去搭理它，闭紧双眼咬紧牙关，把注意力集中在自己的低哼，以及高楼下方远远传来的晚间车辆通行的嗡嗡声上，不去想房间里拖拽的脚步和爪子抓挠的声响。

      <a href="javascript:;" class="m-moreusers" data-show-pingback-id="3204079359608" data-pingback-id="44857111034512"><img src="//m.iqiyipic.com/common/lego/20201002/ac0449e338af49ab81ca581c33c5f2ba.png" alt=""></a></p><p class="readerp">
      这些努力起了点作用，但时间不长。那些声响带来的安慰给了她些许勇气——直到她用尽肺里的空气，不得不停下哼哼。

      <!----></p><p class="readerp">
      于是，她只能躺在黑暗中瑟瑟发抖，身体火烫内心冰凉，把脸死死埋进枕头，又用被单把自己紧紧裹住，好像这样就能把自己藏起来。

      <!----></p><p class="readerp">
      好像这样它就会走开。

      <!----></p><p class="readerp">
      姬米不想做坏孩子，可怪物确实是真的。它真的在那里，就是不愿意放过她。

      <!----></p><p class="readerp">
      “这孩子的想象力过于丰富了。”大白屋里的医生这么说过。

      <!----></p><p class="readerp">
      “你已经十五岁了，姬米。”她母亲曾一边抽泣，一边撕.扯着自己蓬乱的头发说，“你不能继续沉迷在这个……这个幻想的世界里。这是很危险的，你难道不知道吗？你必须长大了，你为什么就不能……就不能跟其他孩子一样呢？你为什么就不能做个正常孩子呢？”

      <!----></p><p class="readerp">
      姬米讨厌看到母亲那样，所以长久以来，她从没告诉过母亲怪物的事情。

      <!----></p><p class="readerp">
      也从没告诉过她，两年前发生在学校的那场意外。那是姬米上学第一个星期里的事。老师从她桌上抓走了平板，看到打开的文档后吓得倒抽了一口气。姬米此前从未多想过，她不过是在神游天外的时候，随手涂鸦了几笔。

      <!----></p><p class="readerp">
      上初中的时候，从没有人关注过她的涂鸦，她不明白为什么，那些图画竟会突然之间让他们如此大惊小怪。全班同学的目光都烙印在她身上，有人震惊，有人讥诮，还有人仿佛对她的不知所措感同身受。

      <!----></p><p class="readerp">
      “也许你可以向我解释一下，”她的老师不无轻蔑地说道，“这张画跟早期太空先驱的维生需求有任何关系吗？或者说，它跟任何真实存在的事情有哪怕一星半点的关系吗？我可从来没在现实生活里见过如此奇形怪状的生物，你见过吗？在座的同学们有见过的吗？”

      <!----></p><p class="readerp">
      “病态思想的产物。”学校发给家人的邮件中这样写道。

      <!----></p><p class="readerp">
      大白屋里的人用电脑给姬米播放了各种不同的形状，问她那些都是什么，又全盘否定了她的回答。

      <!----></p><p class="readerp">
      最开始的时候她还力图反驳，也试着告诉他们怪物的事情。但她不喜欢他们给的药片的味道，于是后来她便学会了顺从他们的心意。她学会了说电脑里的形状就只是形状而已，怪物都不是真的。

      <!----></p><p class="readerp">
      在那之后怪物就成了她的秘密，直到今天。今天下午，突然提早回家的妈妈吓坏了她。

      <!----></p><p class="readerp">
      就跟当年的那个老师一样，妈妈抢走了她的平板，随后狠狠地砸到了地上。她哭个不停，抓着姬米来回晃动，差点把她的骨头摇散了。

      <!----></p><p class="readerp">
      姬米也哭个不停，没吃晚饭就被赶上了床，歇斯底里的威胁在她耳朵里回响——“你是不是还想回那个地方？是不是？！”

      <!----></p><p class="readerp">
      她迷迷糊糊睡着了一小会儿，又在黑暗中醒了过来——有个怪物在她的房间里。

      <!----></p><p class="readerp">
      哪怕并不愿意，高度紧张的神经也使她不由自主地竖起耳朵，搜寻怪物的动静。

      <!----></p><p class="readerp">
      什么声音都没有。这份沉寂本该令她如释重负，但如果怪物只是在假装呢？就跟她自己一样，一动不动，一语不发，好骗过对方。

      <!----></p><p class="readerp">
      她别无选择了，她必须去看看。迟疑着抬起头，她近乎无声地祈祷了一会儿，直到她想起医生们对于祈祷的看法。

      <!----></p><p class="readerp">
      她目不转睛地盯着房间里的阴影看了好一会儿，想努力看出些所以然来。它们在移动，在变换形状，但那只是街对面建筑物上信息屏的光影在变化，并从窗帘的空隙投射进来了，对吧？

      <!----></p><p class="readerp">
      然而，转瞬的亮光让她看见了它。怪物那肌肉虬结的暗色身体，正弓着背蹲伏在地上，一条干瘪的胳膊，软软地搭在她的椅子上。

      <!----></p><p class="readerp">
      还是说，那只是她在愤懑不平时，扔到一旁的衣服？

      <!----></p><p class="readerp">
      她瘫在床.上动弹不得，嗓子发干，忍不住想大喊。但她知道一旦自己叫出声，妈妈就会进来打开灯，怪物就会消失不见，而妈妈会再一次对自己失望至极。

      <!----></p><p class="readerp">
      那如果她自己去开灯呢？如果她能逼自己踩过巨大的地毯，去触摸传感开关呢？

      <!----></p><p class="readerp">
      可万一她中途就被怪物从背后扑倒了呢？

      <!----></p><p class="readerp">
      那样的话，他们就会知道她一直以来都没有说谎了，可惜那时已经太迟了。

      <!----></p><p class="readerp">
      她现在是个大姑娘了，妈妈是这么说的。她已经成熟到可以用逻辑来处理这些事情了。如果怪物是真的，那它为什么没有一早就杀了自己呢？

      <!----></p><p class="readerp">
      医生们也问过她这个问题。她当时回答说，也许是因为每次面对怪物时，自己都竭尽所能地一动不动。医生们闻言面面相觑，纷纷摇头。

      <!----></p><p class="readerp">
      “我们只是在试着帮助你。你难道想这辈子都担惊受怕吗？”医生们问她。

      <!----></p><p class="readerp">
      此时此刻，躺在黑暗中、被怪物吓得动弹不得的姬米，终于做出了决定，她一点都不想再继续害怕了。她会设法鼓起勇气的，她会站起来走到传感开关边上。她会打开灯并且转身看，看自己的床脚，是不是真的有个怪物。

      <!----></p><p class="readerp">
      然后她就会知道真相了，就会知道怪物到底是不是真的。

      <!----></p><p class="readerp">
      第一只脚刚踏上地板，她就仿佛听到了警告的嘶声。那怪物好像随着她的动作紧绷了起来，做好了随时扑上来的准备。于是，还没能迈出第二只脚时，她便又一次吓得全身僵硬.了。

      <!----></p><p class="readerp">
      她听到了怪物的呼吸声，但那也可能只是她自己粗重的喘息在耳旁回响。她瞥见怪物的目光闪动，但那仍可能只是窗外信息屏的内容，在房间里那块屏幕上反了光。

      <!----></p><p class="readerp">
      随后她听到了一声咆哮。这一次，她忽然惊恐万状地确信，房间里真的有只怪物了。

      <!----></p><p class="readerp">
      姬米从床.上一跃而起，堪堪躲过了扑上来的怪物。她能感觉到怪物擦过了她后背的睡裙，以及它猛地撞进床垫造成的冲击。它在她身后咆哮了起来，而她也尖叫着冲向开关，绝望地祈祷自己能及时开灯，祈祷着灯光能让怪物消失。

      <!----></p><p class="readerp">
      然而怪物还是扑了过来。它热烘烘的呼吸夹杂着唾沫，喷洒在她的脖子上。它的爪子陷进了她的肩膀和肋骨，粗壮的尾巴缠上她的双腿，绊住了她。姬米摔倒了，接着被怪物沉重的躯体压.在.身.下，她哭嚎着踢蹬着，双手捏成拳头，无能为力地捶打着地毯。

      <!----></p><p class="readerp">
      她不知怎的挣脱了压.在身上的怪物，设法翻过身来。有那么欢欣鼓舞的一瞬间，她以为自己可以逃出生天。

      <!----></p><p class="readerp">
      然而下一秒，怪物巨大的黑色身影又压了上来，爪子刺穿了她的肩膀。被钉到地板上的姬米，只能看到怪物黑洞洞的大嘴和里面的三排利齿。

      <!----></p><p class="readerp">
      还有它下唇上那一小撮蓝色的毛发。

      <!----></p><p class="readerp">
      就跟她的涂鸦如出一辙。
      <!----></p></div></section> <!---->

      <div class="m-bookscut">
          <span class="shang">
            上一章
          </span>
          <span class="xia">
            下一章
          </span>
      </div>
  </main>
  </body>
  <script type="text/javascript">
      $("#goreg span").animate({"width":"75","height":"55"},100);
      $("#goreg span").animate({"width":"65","height":"55"},100);
      $("#goreg span").animate({"width":"55","height":"55"},100);
      $("#goreg span").animate({"width":"60","height":"55"},100);
      $("#goreg span").animate({"width":"58","height":"55"},100);
      $("#goreg span").animate({"width":"55","height":"55"},100);
      $("#goreg").click(function () {
          location.href="${ctx}/chat/chatroom?userId=${param.userId}&token=${param.token}&userName=${param.userName}"
      })
  </script>

</html>
