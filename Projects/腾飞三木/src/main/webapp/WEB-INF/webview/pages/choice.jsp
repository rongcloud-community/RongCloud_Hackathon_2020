<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>登录</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <%@ include file="../tags/taglib.jsp"%>
      <script src="https://cdn.ronghub.com/RongIMLib-3.0.7.min.js"></script>
      <script src="https://cdn.ronghub.com/RongRTC-3.2.6.min.js"></script>

  </head>
  <style>
      .buttonfram{
          text-align: center;
          line-height: 40px;
          border-radius: 30px;
          width: 120px;
          background-color: #FDCC08;
          margin-top: 5px;
          margin-bottom: 15px;
      }
      .buttonfram:active{
          background-color: #fff9ec;
      }
      .row{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
  </style>
  <body>
  <div class="pages" >
      <div class="formfram" style="width: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div class="" style="margin-top: 45%;">
              <img src="${ctx}/studyRoom/images/icon_login.png" style="width: 120px;">
          </div>
          <div class="row" style="margin-top: 30px;width: 100%">
              <div class="buttonfram" id="doLive" style="height: 40px;">
                  <span style="font-size: 12px;">创建自习室<span class="iconfont iconxiayibu" style="font-size: 12px;margin-left: 12px;"></span></span>
              </div>
              <div class="buttonfram" id="doWatch" style="height: 40px;">
                  <span style="font-size: 12px;">加入自习室<span class="iconfont iconxiayibu" style="font-size: 12px;margin-left: 12px;"></span></span>
              </div>
          </div>
      </div>
  </div>
  </body>
<script>

    function doRoomId() {
        var code = "";
        for(var i=0;i<6;i++){
            var radom = Math.floor(Math.random()*10);
            code += radom;
        }
        return code;
    }

    var config = {
        appkey: 'sfci50a7sx7ti',
    };
    var im = RongIMLib.init(config);
    im.watch({
        conversation: function(event){
            var updatedConversationList = event.updatedConversationList; // 更新的会话列表
            console.log('更新会话汇总:', updatedConversationList);
            console.log('最新会话列表:', im.Conversation.merge({
                conversationList,
                updatedConversationList
            }));
        },
        message: function(event){
            var message = event.message;
            console.log('收到新消息:', message);
        },
        status: function(event){
            var status = event.status;
            console.log('连接状态码:', status);
        },
        expansion: function(event) {
            var updatedExpansion = event.updatedExpansion;
            var deletedExpansion = event.deletedExpansion;
            console.log('消息扩展已更新', updatedExpansion);
            console.log('消息扩展被删除', deletedExpansion);
        }
    });

    let rongRTC = new RongRTC({
        RongIMLib: RongIMLib,
        mode: RongRTC.Mode.LIVE,
        liveRole: RongRTC.ROLE.ANCHOR
    });
    let { Room, Stream, Message, Device, Storage, StreamType} = rongRTC;
    // 按需调用各模块实例 API

    //token 可从开发者后台获取 或 Server API
    var user = {
        token: '${param.token}'
    };
    // im 来自 RongIMLib.init 返回的实例，例如：var im = RongIMLib.init({ appkey: ' ' });
    im.connect(user).then(function(user) {
        console.log('链接成功, 链接用户 id 为: ', user.id);
    }).catch(function(error) {
        console.log('链接失败: ', error.code, error.msg);
    });

    var roomid = doRoomId()
    $("#doLive").click(function () {
        var room = new Room({
            id: roomid,
            joined: function(user){
                // user.id 加入房间
            },
            left: function(user){
                // user.id 离开房间
            }
        });

        room.join({id: '${param.userId}',}).then(() => {
            console.log('join successfully');
    }, error => {
            console.log(error);
        });

        let stream = new Stream({
            /* 成员已发布资源，此时可按需订阅 */
            published: function(user){
                stream.subscribe(user).then((user) => {
                    let {id, stream: {tag, mediaStream}} = user;
                let node = document.createElement('video');
                node.srcObject = mediaStream;
                // 将 node 添加至页面或指定容器
            });
            },
            /* 成员已取消发布资源，此时需关闭流 */
            unpublished: function(user){
                stream.unsubscribe(user);
            },
        });

        stream.get().then(function ({ mediaStream }) {
            let user = {
                id: '${param.userId}',
                stream: {
                    tag: 'RongCloudRTC',
                    type: StreamType.AUDIO_AND_VIDEO,
                    mediaStream: mediaStream
                }
            }
            stream.publish(user).then((result) => {
                //result 数据格式：{"configUrl":"XXX","liveUrl":"XXXX"} 此处可获得到 liveUrl
                alert("创建自习室成功")

            $("#doWatch").click(function () {
                var liveurl = String(result.liveUrl)
                var newlive = "";
                for(var c in liveurl){
                    if(liveurl[c] == "+"){
                        newlive += "%2B"
                    }else {
                        newlive += liveurl[c]
                    }
                }
                window.open("${ctx}/login/list?userId=${param.userId}&token=${param.token}&roomId="+roomid+"&liveUrl="+newlive)
            })

        }, error => {
                console.log(error);
            });
        }, error => {
            console.error(error);
    });

    })
</script>

</html>
