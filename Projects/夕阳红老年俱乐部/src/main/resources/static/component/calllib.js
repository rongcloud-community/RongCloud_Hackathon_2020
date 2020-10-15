var config = {
    timeout: 20000,
    RongIMLib: RongIMLib,
    RongRTC: RongRTC
};
rongCallLib = RongCallLib.init(config);
var messageList = {};

videoWatcher = function (result) {
    var type = result.type;
    var boxEl = document.getElementById('box');
    if (type === 'added') {
        // 添加音视频节点
        var video = result.data;
        boxEl.appendChild(video);
    } else if (type === 'removed') {
        // 删除对应音视频节点
        var video = result.data;
        document.getElementById(video).remove();
    } else if (type == 'leave') {
        // 音视频结束, 清空所有音视频 UI
    }
};
rongCallLib.videoWatch(videoWatcher);

commandWatcher = function (message) {
    // 根据消息类型做对应处理
    var messageType = message.messageType;
    var presence = messageCtrol[messageType];
    presence ? presence(message) : messageCtrol['otherMessage']();
};
rongCallLib.commandWatch(commandWatcher);

var messageCtrol = {
    InviteMessage:function(message){
        messageList[message.messageUId] = message;
        document.getElementById("RringDiv").uid = message.messageUId;
        document.getElementById("RringDiv").style.display = 'block';
    },
    otherMessage:function () {}
}

function call() {
    var CallType = RongIMLib.VoIPMediaType;
    var targetId = '2';
    var params = {
        conversationType: RongIMLib.ConversationType.PRIVATE,
        targetId: targetId,
        inviteUserIds:[targetId],
        mediaType: CallType.MEDIA_VEDIO
    };
    rongCallLib.call(params, function (error) {
        if (error) {
            console.error('发起通话失败', error);
        }
    });
}

function accept() {
    var messageUid =  document.getElementById("RringDiv").uid;
    var message = messageList[messageUid];
    if(!message){
        console.info("message 为空！")
        return;
    }
    var CallType = RongIMLib.VoIPMediaType;
    var targetId = message.targetId;
    var params = {
        conversationType: message.conversationType,
        targetId: targetId,
        mediaType: CallType.MEDIA_VEDIO
    };
    rongCallLib.accept(params, function (error) {
        if (error) {
            console.error('接听通话失败', error);
        }
        document.getElementById("RringDiv").style.display = 'none';
    });
}