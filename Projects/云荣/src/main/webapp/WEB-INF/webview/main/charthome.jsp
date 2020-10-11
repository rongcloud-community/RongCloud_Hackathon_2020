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
      html{
          width: 100%;
          height: 100%;
          overflow-x:hidden;

      }
      .bottomfram{
          width: 100%;
          height: 45px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
      }

      button{
          border: 0;
          background-color: #3B78DD;
          font-size: 20px;
          color: white;
          font-family : 微软雅黑,宋体;
      }
      button:active{
          background-color: #eeeeee;
          color: #666666;
      }
      .systemcall{
          text-align: center;
          margin-top: 10px;
          font-size: 15px;
          color: #666666;
      }
      .msg{
          float: right;
          margin-left: 90%;
          color: #666666;
          font-size: 12px;
      }

  </style>
  <body style="background-color: #F3F5F7;">

    <div class="pages" style="width: 100%;height: 100%;text-align: center;display: flex;flex-direction: column;">
    </div>
    <div class="bottomfram" style="position: absolute;bottom: 0;">
        <div class="" style="width: 90%">
            <input style="width: 100%;height: 40px;border: 0;padding-left: 20px;"/>
        </div>
        <div class="" style="width: 10%;">
            <button style="height: 40px;width: 100%;">发  送</button>
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

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }



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
            var data1 = new Date().Format("yyyy-MM-dd HH:mm:ss");
            $(".pages").append('<span class="systemcall">'+data1+': 收到新消息 '+message+' </span>')
        },
        status: function(event){
            var status = event.status;
            var data1 = new Date().Format("yyyy-MM-dd HH:mm:ss");
            $(".pages").append('<span class="systemcall">'+data1+': 连接中...连接状态码 '+status+' </span>')
        }
    });

    /* 开发者后台获取或 Server API */
    var user = {
        token: '${param.token}',
    };
    im.connect(user).then(function(user) {
        var data1 = new Date().Format("yyyy-MM-dd HH:mm:ss");
        $(".pages").append('<span class="systemcall">'+data1+': 欢迎用户 '+user.id+' 登录</span>')
        $("button").click(function () {
            var conversation = im.Conversation.get({
                targetId: '${param.targetId}',
                type: RongIMLib.CONVERSATION_TYPE.PRIVATE
            });
            conversation.send({
                messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
                content: {
                    content: $("input").val() // 文本内容
                }
            }).then(function(message){
                var data1 = new Date().Format("yyyy-MM-dd HH:mm:ss");
                $(".pages").append('<span class="systemcall">'+data1+': 发送文字消息成功  </span>')
                $(".pages").append('<span class="msg">'+data1+'</span>')
                $(".pages").append('<span class="msg">'+message.content.content+'</span>')
                console.log(message)

            });
        })
    }).catch(function(error) {
        var data1 = new Date().Format("yyyy-MM-dd HH:mm:ss");
        $(".pages").append('<span class="systemcall">'+data1+': 连接中...连接失败 '+error.code+'，'+error.msg+' </span>')
    });
</script>
</html>
