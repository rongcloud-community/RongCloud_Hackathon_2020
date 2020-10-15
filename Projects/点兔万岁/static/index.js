console.log = function () { };
function Game() {
    this.board = [];
    this.color = 0;
    this.ctx = document.querySelector("#board").getContext("2d");
    this.conversation = null;
    this.start = false;
    this.turn = 0;
}
Game.prototype.Init = function (conversation, color) {
    this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
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
Game.prototype.Draw = function () {
    var context = this.ctx;
    context.beginPath();
    for (var i = 0; i < 4; i++) {
        context.moveTo(20 + i * 120, 20);
        context.lineTo(20 + i * 120, 380);
        context.moveTo(20, 20 + i * 120);
        context.lineTo(380, 20 + i * 120);
    }
    context.stroke();
}
Game.prototype.Place = function (color, i, j) {
    console.log(i, j);
    if (this.board[i][j] == 0) {
        var context = this.ctx;
        this.board[i][j] = color;
        if (color == 1) {
            context.beginPath();
            context.moveTo(20 + 60 - 40 + j * 120, 20 + 60 - 40 + i * 120);
            context.lineTo(20 + 60 + 40 + j * 120, 20 + 60 + 40 + i * 120);
            context.moveTo(20 + 60 - 40 + j * 120, 20 + 60 + 40 + i * 120);
            context.lineTo(20 + 60 + 40 + j * 120, 20 + 60 - 40 + i * 120);
            context.stroke();
        } else if (color == 2) {
            context.beginPath();
            context.arc(20 + 60 + j * 120, 20 + 60 + i * 120, 40, 0, 2 * Math.PI);
            context.stroke();
        }
        this.turn = 3 - this.turn;
    }
}
Game.prototype.myTurn = function () {
    return game.start && game.turn == game.color;
}
Game.prototype.check = function () {
    var b = this.board;
    var x = 3 - this.color;
    var y = this.color;
    if (b[0][0] == x && b[0][1] == x && b[0][2] == x ||
        b[1][0] == x && b[1][1] == x && b[1][2] == x ||
        b[2][0] == x && b[2][1] == x && b[2][2] == x ||
        b[0][0] == x && b[1][0] == x && b[2][0] == x ||
        b[0][1] == x && b[1][1] == x && b[2][1] == x ||
        b[0][2] == x && b[1][2] == x && b[2][2] == x ||
        b[0][0] == x && b[1][1] == x && b[2][2] == x ||
        b[0][2] == x && b[1][1] == x && b[2][0] == x) {
        this.start = false;
        setTimeout(function () {
            alert("你赢了");
        }, 200);
    } else if (
        b[0][0] == y && b[0][1] == y && b[0][2] == y ||
        b[1][0] == y && b[1][1] == y && b[1][2] == y ||
        b[2][0] == y && b[2][1] == y && b[2][2] == y ||
        b[0][0] == y && b[1][0] == y && b[2][0] == y ||
        b[0][1] == y && b[1][1] == y && b[2][1] == y ||
        b[0][2] == y && b[1][2] == y && b[2][2] == y ||
        b[0][0] == y && b[1][1] == y && b[2][2] == y ||
        b[0][2] == y && b[1][1] == y && b[2][0] == y) {
        this.start = false;
        setTimeout(function () {
            alert("你输了");
        }, 200);
    }
}
var game = new Game();
game.Draw();
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
                var pos = message.content.content.match(/play:(\d)(\d)/);
                if (pos) {
                    console.log(pos);
                    game.Place(game.color, Number(pos[1]), Number(pos[2]));
                    game.check();
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
                var i = Math.floor((e.offsetY - 20) / 120);
                var j = Math.floor((e.offsetX - 20) / 120);
                game.Place(3 - game.color, i, j);
                game.Send("play:" + i + j);
                game.check();
                $("#status").text("对方的回合");
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
