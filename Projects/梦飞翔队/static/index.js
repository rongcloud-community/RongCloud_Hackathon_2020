$.get('/getappkey', function (appkey) {
    if (!appkey) {
        console.log("获取appkey失败");
    }
    console.log('获得key', appkey);

    var im = RongIMLib.init({ appkey: appkey });
    $.get('/gettoken', function(token){
        im.connect({
            token: token
        }).then(function (user) {
            console.log('链接成功, 链接用户 id 为: ', user.id);
            var chatRoom = im.ChatRoom.get({
                id: 'danmaku'
            });
            chatRoom.join({
                count: 20 // 进入后, 自动拉取 20 条聊天室最新消息
            }).then(function () {
                console.log('加入聊天室成功');
                chatRoom.send({
                    messageType: 'RC:TxtMsg',
                    content: {
                        content: 'Hello RongCloud' // 文本内容
                    }
                }).then(function (message) {
                    console.log('发送文字消息成功', message);
                });
            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (error) {
            console.log('链接失败: ', error.code, error.msg);
        });
    });
});
