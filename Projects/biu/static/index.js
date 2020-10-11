console.log = function () { };
function Game() {
    this.board = [];
    this.color = 0;
    this.ctx = document.querySelector("#board").getContext("2d");
    this.conversation = null;
    this.start = false;
    this.turn = 0;
}
Game.prototype.DrawBoard = function () {
    var context = this.ctx;
    context.beginPath();
    for (var i = 0; i < 15; i++) {
        context.moveTo(20 + i * 24, 20);
        context.lineTo(20 + i * 24, 356);
        context.moveTo(20, 20 + i * 24);
        context.lineTo(356, 20 + i * 24);
    }
    context.stroke();
}
Game.prototype.Init = function (conversation, color) {
    this.board = [];
    for (var i = 0; i < 15; i++) {
        this.board[i] = [];
        for (var j = 0; j < 15; j++) {
            this.board[i][j] = 0;
        }
    }
    this.color = color;
    this.start = true;
    this.turn = 1;
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
Game.prototype.Place = function (color, i, j) {
    console.log(i, j);
    if (this.board[i][j] == 0) {
        var context = this.ctx;
        this.board[i][j] = color;
        if (color == 1) {
            context.fillStyle = "black";
        } else if (color == 2) {
            context.fillStyle = "white";
        }
        context.beginPath();
        context.arc(20 + j * 24, 20 + i * 24, 10, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
        this.turn = 3 - this.turn;
        return true;
    }
    return false;
}
Game.prototype.myTurn = function () {
    return game.start && game.turn == game.color;
}
var game = new Game();
game.DrawBoard();
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
                var oppo = message.content.content.match(/oppo:(.):(.+)/);
                if (oppo) {
                    console.log("颜色", oppo[1]);
                    console.log("开始游戏", oppo[2]);
                    game.Init(im.Conversation.get({
                        targetId: oppo[2],
                        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
                    }), Number(oppo[1]));
                    game.Send("你好");
                    $("#status").text("游戏开始");
                } else if (message.content.content == "exit") {
                    $("#status").text("刷新页面重新匹配");
                    alert("对方已退出");
                }
            } else if (message.isOffLineMessage == false) {
                var pos = message.content.content.match(/play:(\d+),(\d+)/);
                if (pos) {
                    console.log(pos);
                    game.Place(3 - game.color, Number(pos[1]), Number(pos[2]));
                    $("#status").text("你的回合");
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
        console.log(token.token);

        window.onbeforeunload = function () {
            $.get("/exit?token=" + encodeURIComponent(token.token));
            return "确认退出";
        }

        document.querySelector("#board").onclick = function (e) {
            if (game.myTurn()) {
                var i = Math.floor((e.offsetY - 20 + 12) / 24);
                var j = Math.floor((e.offsetX - 20 + 12) / 24);
                if (i >= 0 && i < 15 && j >= 0 && j < 15) {
                    if (game.Place(game.color, i, j)) {
                        game.Send("play:" + i + "," + j);
                        $("#status").text("对方的回合");
                    }
                }
            }
        }

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
