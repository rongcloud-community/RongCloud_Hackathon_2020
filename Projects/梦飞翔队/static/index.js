var chatRoom;
$.get('/getappkey', function (appkey) {
    if (!appkey) {
        console.log("获取appkey失败");
    }
    console.log('获得key', appkey);

    var im = RongIMLib.init({ appkey: appkey });
    var conversationList = []; // 当前已存在的会话列表
    im.watch({
        conversation: function (event) {
            var updatedConversationList = event.updatedConversationList; // 更新的会话列表
            console.log('更新会话汇总:', updatedConversationList);
            console.log('最新会话列表:', im.Conversation.merge({
                conversationList,
                updatedConversationList
            }));
        },
        message: function (event) {
            var message = event.message;
            console.log('收到新消息:', message);
        },
        status: function (event) {
            var status = event.status;
            console.log('连接状态码:', status);
        }
    });
    $.get('/gettoken', function (token) {
        im.connect({
            token: token
        }).then(function (user) {
            console.log('链接成功, 链接用户 id 为: ', user.id);
            //通知服务端离开
            window.onbeforeunload = function () {
                $.get("/exit?token=" + token);
            }
            //加入聊天室
            chatRoom = im.ChatRoom.get({
                id: 'danmaku'
            });
            chatRoom.join({
                count: 10 // 进入后, 自动拉取 10 条聊天室最新消息
            }).then(function () {
                console.log('加入聊天室成功');
            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (error) {
            console.log('链接失败: ', error.code, error.msg);
        });
    });
});

$("#send").click(function () {
    chatRoom.send({
        messageType: 'RC:TxtMsg',
        content: {
            content: $("#text").val()
        }
    }).then(function (message) {
        console.log('发送文字消息成功', message);
    });
});
//api测试
$("#test").click(function () {
    $.get("/test");
});
