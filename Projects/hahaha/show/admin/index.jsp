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
    <a href="/shoppingcenter/goodManager.do?method=show&goodname=1&goodtype=1">�����̳�</a>
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
                // status ��ʶ��ǰ����״̬
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('���ӳɹ�');
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('��������');
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('�Ͽ�����');
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('�����豸��¼, ���˱���');
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('��������ȷ, ���������ߺ�̨�鿴��ȫ��������');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('���粻����, ��ʱ�ɵ��� reconnect ��������');
                        break;
                    default:
                        console.log('����״̬Ϊ', status);
                        break;
                }
            }
        }

        RongIMClient.setConnectionStatusListener(params);

        var params = {
            // ���յ�����Ϣ
            onReceived: function (message) {
                console.info(message);
            }
        }
        };
        RongIMClient.setOnReceiveMessageListener(params);

        var params = {
            //status ��ʶ��ǰ�������ĻỰ״̬
            onChanged: function(status) {
                console.log(status);
            }
        };
        RongIMClient.setConversationStatusListener(params);


    </script>
</html:html>
