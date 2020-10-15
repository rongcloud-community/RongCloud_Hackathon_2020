package run.yet.f7_android;

import android.app.Activity;
import android.net.Uri;
import android.util.Log;

import com.alibaba.fastjson.JSON;

import java.util.Map;

import io.rong.callkit.RongCallKit;
import io.rong.imkit.RongIM;
import io.rong.imlib.IRongCallback;
import io.rong.imlib.RongIMClient;
import io.rong.imlib.model.Conversation;
import io.rong.imlib.model.Message;
import io.rong.imlib.model.MessageContent;
import io.rong.message.ImageMessage;
import io.rong.message.TextMessage;

import static io.rong.callkit.RongCallKit.CallMediaType.CALL_MEDIA_TYPE_AUDIO;
import static io.rong.callkit.RongCallKit.CallMediaType.CALL_MEDIA_TYPE_VIDEO;

public class RongCloudUtils {
    private static final String TAG = "RongCloudUtils";

    public static void connectToRongCloud (String token) {
        RongIM.connect(token, new RongIMClient.ConnectCallback() {
            @Override
            public void onSuccess(String userId) {
                Log.d(TAG, "连接到融云 IM 成功，用户 id  为：" + userId);
            }

            @Override
            public void onError(RongIMClient.ConnectionErrorCode connectionErrorCode) {
                Log.d(TAG, "连接到融云 IM 错误：" + connectionErrorCode);
            }

            @Override
            public void onDatabaseOpened(RongIMClient.DatabaseOpenStatus databaseOpenStatus) {

            }
        });
    }

    public static void sendMessage(String userId, String messageJSON) {
        Log.d(TAG, "收到 WebView 发过来的消息：" + messageJSON);
        Map<String, Object> messageMap = (Map<String, Object>) JSON.parse(messageJSON);

        MessageContent messageContent = null;
        String extra = "id:" + messageMap.get("id") + ",conversation:" +  messageMap.get("conversationId");
        Map<String, Object> body = (Map<String, Object>) messageMap.get("body");
        String type = (String) messageMap.get("type");
        if ("text".equals(type)) {
            TextMessage textContent = TextMessage.obtain(JSON.toJSONString(body));
            textContent.setExtra(extra);
            messageContent = textContent;
        } else if ("image".equals(type)) {
            ImageMessage imageContent = ImageMessage.obtain();
            imageContent.setRemoteUri(Uri.parse(JSON.toJSONString(body)));
            imageContent.setExtra(extra);
            messageContent = imageContent;
        }

        Log.d(TAG, "构造消息内容：" + messageContent);
        Message message = Message.obtain(userId, Conversation.ConversationType.PRIVATE, messageContent);
        Log.d(TAG, "向融云发送消息：" + message);
        RongIMClient.getInstance().sendMessage(message, null, null, new IRongCallback.ISendMessageCallback() {
            @Override
            public void onAttached(Message message) {
                Log.d(TAG, "消息发送：" + message);
            }

            @Override
            public void onSuccess(Message message) {
                Log.d(TAG, "消息发送成功：" + message);
            }

            @Override
            public void onError(Message message, RongIMClient.ErrorCode errorCode) {
                Log.d(TAG, "消息[" + message.getMessageId() + "]发送失败：" + errorCode);
            }
        });
    }

    public static void call (Activity activity, String targetUserId, String type) {
        Log.d(TAG, "向融云用户 " + targetUserId + " 拨打电话");

        RongCallKit.CallMediaType mediaType = CALL_MEDIA_TYPE_VIDEO;
        if ("audio".equals(type)) {
            mediaType = CALL_MEDIA_TYPE_AUDIO;
        }

        RongCallKit.startSingleCall(activity, targetUserId, mediaType);
    }
}
