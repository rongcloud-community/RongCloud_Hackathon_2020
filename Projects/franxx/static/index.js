var im;
var votedata;
var selfid;
var voteresult;
var voted = localStorage.getItem("voted");
if (voted) {
    voted = JSON.parse(voted);
} else {
    voted = [];
}
$("#result").hide();
$("#dovote").hide();
console.log = function () { };
$.get("/getappkey", function (appkey) {
    if (!appkey) {
        alert("获取appkey失败");
    }
    console.log(appkey);

    //融云实时消息SDK
    im = RongIMLib.init({ appkey: appkey });
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
            if (message.isOffLineMessage == false) {
                var select = Number(message.content.content);
                voteresult[select]++;
                $("#resultlist .num").each(function (i, e) {
                    $(e).text(String(voteresult[i]));
                });
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
        selfid = token.userId;
        console.log(token.token);

        window.onbeforeunload = function () {
            $.get("/exit?token=" + encodeURIComponent(token.token));
            return "确认退出";
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
function addoption() {
    var node = document.createElement("div");
    node.className = "option";
    node.innerHTML = '<input type="text"><input type="button" value="删除" onclick="this.parentElement.remove();">';
    document.querySelector("#optionlist").appendChild(node);
}
function submit() {
    var data = {
        host: selfid,
        voteid: randomID(),
        data: document.querySelector("#title").value,
        options: []
    };
    voteresult = [];
    var items = document.querySelectorAll(".option");
    var list = $("#resultlist");
    for (var i = 0; i < items.length; i++) {
        voteresult.push(0);
        data.options.push(items[i].firstElementChild.value);
        list.append('<div>' + data.options[i] + '......票数<span class="num">0</span></div>');
    }
    $("#tovote").hide();
    $("#create").hide();
    $("#result").show();
    console.log("提交");
    $.post("/newvote", data, function (error) {
        if (!error) {
            alert("投票创建成功，投票id为" + data.voteid);
        }
    });
}
function randomID() {
    return Math.random().toFixed(6).substr(2);
}
function getvote() {
    $.getJSON("/getvote?voteid=" + $("#voteinput").val(), function (result) {
        if (result.data) {
            $("#tovote").hide();
            $("#create").hide();
            $("#dovote").show();
            console.log(result);
            votedata = result;
            $("#votetitle").text(result.data);
            var votelist = $("#votelist");
            for (var i = 0; i < result.options.length; i++) {
                votelist.append('<div class="voteitem"><input type="button" value="√" onclick="send(' + i + ');"><span>' + result.options[i] + '</span></div>');
            }
        } else {
            alert("未找到投票");
        }
    });
}
function send(x) {
    im.Conversation.get({
        targetId: votedata.host,
        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
    }).send({
        messageType: RongIMLib.MESSAGE_TYPE.TEXT,
        content: {
            content: String(x)
        }
    }).then(function (message) {
        console.log('发送文字消息成功', message);
        $("#dovote").hide();
    });
}
