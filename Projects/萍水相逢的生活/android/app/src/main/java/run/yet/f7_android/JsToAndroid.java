package run.yet.f7_android;

import android.app.Notification;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.alibaba.fastjson.JSON;

import java.util.HashMap;
import java.util.Map;

import io.rong.imlib.RongIMClient;
import io.rong.imlib.model.Message;
import io.rong.message.ImageMessage;
import io.rong.message.TextMessage;

public class JsToAndroid {
    private static final String TAG = "JsToAndroid";
    private final WebViewActivity activity;

    public JsToAndroid(WebViewActivity activity) {
        this.activity = activity;
    }

    @JavascriptInterface
    public void connectToRongCloud (String imToken) {
        RongCloudUtils.connectToRongCloud(imToken);

        RongIMClient.setOnReceiveMessageListener(new RongIMClient.OnReceiveMessageWrapperListener() {
            /**
             * 接收实时或者离线消息。
             * 注意:
             * 1. 针对接收离线消息时，服务端会将 200 条消息打成一个包发到客户端，客户端对这包数据进行解析。
             * 2. hasPackage 标识是否还有剩余的消息包，left 标识这包消息解析完逐条抛送给 App 层后，剩余多少条。
             * 如何判断离线消息收完：
             * 1. hasPackage 和 left 都为 0；
             * 2. hasPackage 为 0 标识当前正在接收最后一包（200条）消息，left 为 0 标识最后一包的最后一条消息也已接收完毕。
             *
             * @param message    接收到的消息对象
             * @param left       每个数据包数据逐条上抛后，还剩余的条数
             * @param hasPackage 是否在服务端还存在未下发的消息包
             * @param offline    消息是否离线消息
             * @return 是否处理消息。 如果 App 处理了此消息，返回 true; 否则返回 false 由 SDK 处理。
             */
            @Override
            public boolean onReceived(final Message message, final int left, boolean hasPackage, boolean offline) {
                Log.d(TAG, "收到融云发来的消息：" + message.toString());
                sendNotification();

                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        String messageJSON = getMessageJSON(message);
                        String code = "javascript:receiveMessageFromRongCloud(" + messageJSON + ")";

                        Log.d(TAG, "执行 JS 代码：" + code);

                        activity.webView.evaluateJavascript(code, null);
                    }
                });

                return true;
            }

            private String getMessageJSON (Message message) {
                Map<String, Object> map = new HashMap<>();

                Map<String, Object> contentMap = new HashMap<>();
                if (message.getContent() instanceof TextMessage) {
                    map.put("messageType", "TextMessage");

                    TextMessage textContent = (TextMessage) message.getContent();
                    contentMap.put("content", textContent.getContent());
                    contentMap.put("extra", textContent.getExtra());
                } else if (message.getContent() instanceof ImageMessage) {
                    map.put("messageType", "ImageMessage");

                    ImageMessage imageContent = (ImageMessage) message.getContent();
                    contentMap.put("imageUri", imageContent.getRemoteUri().toString());
                    contentMap.put("extra", imageContent.getExtra());
                }
                map.put("content", contentMap);

                map.put("receivedTime", message.getReceivedTime());

                return JSON.toJSONString(map);
            }
        });
    }

    @JavascriptInterface
    public void disconnectToRongCloud() {
        Log.d(TAG, "断开连接");
        RongIMClient.getInstance().disconnect();
    }

    @JavascriptInterface
    public void sendMessageToRongCloud(String userId, String messageJSON) {
        RongCloudUtils.sendMessage(userId, messageJSON);
    }

    @JavascriptInterface
    public void call(String targetUserId, String type) {
        RongCloudUtils.call(this.activity, targetUserId, type);
    }

    private void sendNotification () {
        int notificationId = 889;
        int priority = 0;

        NotificationManagerCompat mNotificationManagerCompat = NotificationManagerCompat.from(activity.getApplicationContext());

        NotificationCompat.Builder notificationCompatBuilder =
                new NotificationCompat.Builder(
                        activity.getApplicationContext(), App.NOTIFICATION_CHANNEL_ID);

        Notification notification = notificationCompatBuilder
                .setContentTitle("收到新消息了")
                .setContentText("收到新消息了，真的！")
                .setSmallIcon(R.drawable.ic_launcher)
                .setPriority(priority)
                .build();

        mNotificationManagerCompat.notify(notificationId, notification);
    }
}
