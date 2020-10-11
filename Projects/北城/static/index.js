console.log = function () { };
var conversation;
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
            if (message.senderUserId == "info") {
                var oppo = message.content.content.match(/oppo:(.+)/);
                if (oppo) {
                    console.log("对方", oppo[1]);
                    app.status = "匹配成功，现在可以开始聊天了！";
                    conversation = im.Conversation.get({
                        targetId: oppo[1],
                        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
                    });
                } else {
                    if (message.content.content == "end") {
                        app.status = "对方已退出，刷新页面可以重新匹配";
                        alert(app.status);
                    }
                }
            } else {
                appendMessage(message.content.content, false);
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
        console.log(token.token);

        window.onbeforeunload = function () {
            $.get("/exit?token=" + encodeURIComponent(token.token));
            return "确认退出";
        }

        $("#send").click(function () {
            if (conversation) {
                var text = $("#inputmessage").val();
                if (text) {
                    appendMessage(text, true);
                    conversation.send({
                        messageType: RongIMLib.MESSAGE_TYPE.TEXT,
                        content: {
                            content: text
                        }
                    }).then(function (message) {
                        console.log("发送文字消息成功", message);
                        $("#inputmessage").val("");
                    });
                }
            } else {
                alert("连接成功才能发消息哦");
            }
        });

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

var app = new Vue({
    el: '#app',
    data: {
        status: "等待其他用户加入...",
        message: [],
    }
});

function appendMessage(text, self) {
    app.message.push({
        text: text,
        class: self ? "arrow right" : "arrow"
    });
    autoScroll();
}

function autoScroll() {
    var e = $(".message:last")[0];
    if (e) {
        e.scrollIntoViewIfNeeded();
    }
}
