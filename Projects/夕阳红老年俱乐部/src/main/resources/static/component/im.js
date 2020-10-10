var appkey = 'k51hidwqkv1cb';
var users = {
    5: {
        token: 'wYVWrXd5ZXwuWG5yeTzYd1LVETMBTiiS@o9z5.cn.rongnav.com;o9z5.cn.rongcfg.com'
    },
    2: {
        token: 'uqhwnOlG9QEuWG5yeTzYd4I0tBy+Cc+y@o9z5.cn.rongnav.com;o9z5.cn.rongcfg.com'
    }
}
// 通过 url 选取用户
var queryString = location.search;
var userId = queryString.split('=');
var token = users[userId[1]].token;
// 初始化
RongIMLib.RongIMClient.init(appkey);
// 连接状态监听器
RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
        switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
                console.log('链接成功');
                break;
            case RongIMLib.ConnectionStatus.CONNECTING:
                console.log('正在链接');
                break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
                console.log('断开连接');
                break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                console.log('其他设备登录');
                break;
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                console.log('域名不正确');
                break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                console.log('网络不可用');
                break;
        }
    }
});
// 消息监听器
RongIMClient.setOnReceiveMessageListener({
    onReceived: function (message) {
        console.log(message);
    }
});
// 开发者后台获取或 Server API
RongIMClient.connect(token, {
    onSuccess: function(userId) {
        console.log('Connect successfully. ' + userId);
    },
    onTokenIncorrect: function() {
        console.log('token 无效');
    },
    onError: function(errorCode){
        var info = '';
        switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时';
                break;
            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                info = '不可接受的协议版本';
                break;
            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                info = 'appkey不正确';
                break;
            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                info = '服务器不可用';
                break;
        }
        console.log(info);
    }
});