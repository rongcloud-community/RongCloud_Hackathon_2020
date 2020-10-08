function Game() {
    this.board = [];
    this.oppo = "";
    this.result = "";
    this.conversation = null;
}
Game.prototype.Init = function (oppo, conversation) {
    this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    this.oppo = oppo;
    this.result = ""
    this.conversation = conversation;
}
Game.prototype.Send = function (text) {
    this.conversation.send({
        messageType: RongIMLib.MESSAGE_TYPE.TEXT,
        content: {
            content: text
        }
    }).then(function (message) {
        console.log('发送文字消息成功', message);
    });
}
var game = new Game();
$.get("/getappkey", function (appkey) {
    if (!appkey) {
        alert("获取appkey失败");
    }
    console.log(appkey);

    //融云实时消息SDK
    var im = RongIMLib.init({ appkey: appkey });
    var conversationList = [];
    im.watch({
        conversation: function (event) {
            //更新会话列表
            var updatedConversationList = event.updatedConversationList;
            console.log("更新会话汇总:", updatedConversationList);
            console.log("最新会话列表:", im.Conversation.merge({
                conversationList,
                updatedConversationList
            }));
        },
        message: function (event) {
            //收到新消息
            var message = event.message;
            console.log("收到新消息:", message);
            if (message.senderUserId == "game") {
                var oppo = message.content.content.match(/oppo:(.+)/);
                if (oppo) {
                    console.log("开始游戏" + oppo);
                    game.Init(oppo[1], im.Conversation.get({
                        targetId: oppo[1],
                        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
                    }));
                    game.Send("你好");
                }
            }
        },
        status: function (event) {
            //状态改变
            var status = event.status;
            console.log("连接状态码:", status);
        }
    });

    $.getJSON("/gettoken", function (token) {
        if (token.token == "") {
            alert("获取token失败！");
            return;
        }
        console.log(token);

        //连接实时消息
        im.connect({
            token: token.token
        }).then(function (user) {
            console.log("链接成功, 链接用户 id 为: ", user.id);
        }).catch(function (error) {
            alert("链接失败: " + error.code + error.msg);
        });
    });
});
