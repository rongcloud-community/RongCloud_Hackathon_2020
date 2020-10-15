<%@ page language="java" pageEncoding="gbk"%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html:html lang="true">
  <head>
    <html:base />
    
    <title>index.jsp</title>
      <script src="http://cdn.ronghub.com/RongIMLib-2.5.9.js"></script>
  </head>
  
  <body>
    <a href="/shoppingcenter/goodManager.do?method=show&goodname=1&goodtype=1">进入商城</a>
  	<jsp:include flush="true" page="/show/admin/left.jsp">
  		<jsp:param name="" value="" />
  		<jsp:param name="" value="" />
  	</jsp:include>
  </body>
    <script>
        var config = {
            appkey: 'cpj2xarlchjtn',
        };
        var im = RongIMLib.init(config);

        var params = {
            onChanged: function (status) {
                // status 标识当前连接状态
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
                        console.log('其他设备登录, 本端被踢');
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确, 请至开发者后台查看安全域名配置');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用, 此时可调用 reconnect 进行重连');
                        break;
                    default:
                        console.log('链接状态为', status);
                        break;
                }
            }
        }

        RongIMClient.setConnectionStatusListener(params);

        var params = {
            // 接收到的消息
            onReceived: function (message) {
                console.info(message);
            }
        }
        };
        RongIMClient.setOnReceiveMessageListener(params);

        var params = {
            //status 标识当前监听到的会话状态
            onChanged: function(status) {
                console.log(status);
            }
        };
        RongIMClient.setConversationStatusListener(params);


    </script>
</html:html>
