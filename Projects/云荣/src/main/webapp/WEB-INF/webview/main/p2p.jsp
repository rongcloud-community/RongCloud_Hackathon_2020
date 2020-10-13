<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>聊天</title>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
      <%@ include file="../tags/taglib.jsp"%>
      <script src="http://cdn.ronghub.com/RongIMLib-3.0.5-dev.js"></script>

  </head>
  <style>

  </style>
  <body style="background-color: #F3F5F7;padding: 10px 10px 10px 10px">
  <div style="background-color: white;padding: 10px 10px 10px 10px">

      <div class="layui-card">
          <div class="layui-card-header">我的联系人</div>
          <div class="layui-card-body">
              <li class="layui-nav-item userlist" data-uid="scdscdscd" lay-unselect="" style="border-bottom: 1px solid #eeeeee;padding-bottom: 10px;cursor:pointer;">
                  <img src="//t.cn/RCzsdCq"  class="layui-nav-img">scd</a>
              </li>
              <li class="layui-nav-item userlist" data-uid="pwawa" lay-unselect="" style="margin-top: 10px;cursor:pointer;">
                  <img src="//t.cn/RCzsdCq" class="layui-nav-img">pwawa</a>
              </li>
          </div>
      </div>
  </div>
  </body>
<script>
    layui.use(['layer', 'form'], function(){
        var layer = layui.layer
            ,form = layui.form;

    });
    var im = RongIMLib.init({
        appkey: 'sfci50a7sx7ti'
    });

    $(".userlist").click(function () {
        location.href="${ctx}/adam/check?userId=${param.userId}&token=${param.token}&targetId="+$(this).data("uid")
    })


    $(".user").click(function () {
        var targetid = $(this).data('uid')
        var conversationList = []; // 当前已存在的会话列表
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
            }
        });

        /* 开发者后台获取或 Server API */
        var user = {
            token: '${param.token}'
        };
        im.connect(user).then(function(user) {
            console.log('链接成功, 链接用户 id 为: ', user.id);
            var conversation = im.Conversation.get({
                targetId: targetid,
                type: RongIMLib.CONVERSATION_TYPE.PRIVATE
            });
            conversation.send({
                messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
                content: {
                    content: 'Hello RongCloud' // 文本内容
                }
            }).then(function(message){
                console.log('发送文字消息成功', message);
            });
        }).catch(function(error) {
            console.log('链接失败: ', error.code, error.msg);
        });
    })
</script>
</html>
