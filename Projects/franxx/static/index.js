var conversation;
var myVote = localStorage.getItem("vote");
if (myVote) {
    myVote = JSON.parse(myVote);
} else {
    myVote = [];
}
var voted = localStorage.getItem("voted");
if (voted) {
    voted = JSON.parse(voted);
} else {
    voted = [];
}
for (var i = 0; i < myVote.length; i++) {
    console.log(myVote.length);
}
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
        data: document.querySelector("#title").value,
        option: []
    };
    var items = document.querySelectorAll(".option");
    for (var i = 0; i < items.length; i++) {
        data.option.push(items[i].firstElementChild.value);
    }
    console.log("提交");
    $.post("/newvote", data);
}
