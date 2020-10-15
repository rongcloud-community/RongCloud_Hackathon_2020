package com.example.kosakai.happygoat;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.HashMap;
import java.util.Map;

import io.rong.imkit.RongIM;
import io.rong.imlib.RongIMClient;
import io.rong.imlib.model.Conversation;
import io.rong.imlib.model.Message;
import io.rong.imlib.model.MessageContent;
import io.rong.imlib.model.UserInfo;
import io.rong.message.TextMessage;

public class HotelActivity extends AppCompatActivity {
    private ImageView hotel_img;
    private ImageView hotel_back;
    private TextView hotel_name;
    private TextView hotel_price;
    private LinearLayout hotel_order;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.hotel_layout);
        Intent intent =getIntent();
        hotel_img = (ImageView)findViewById(R.id.hotel_img);
        hotel_name = (TextView)findViewById(R.id.hotel_name);
        hotel_price = (TextView)findViewById(R.id.hotel_price);
        hotel_back = (ImageView)findViewById(R.id.hotel_back);
        hotel_order = (LinearLayout)findViewById(R.id.hotel_order);
        hotel_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        hotel_img.setImageResource(Integer.parseInt(intent.getStringExtra("hotel_img")));
        hotel_name.setText(intent.getStringExtra("hotel_name"));
        hotel_price.setText(intent.getStringExtra("hotel_price"));
        hotel_order.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HotelActivity.this,HotelOrderActivity.class);
                startActivity(intent);
            }
        });

        String token = "fP7YQpARQKtzGszVQr1P/f0AtZnHKaft@ama0.cn.rongnav.com;ama0.cn.rongcfg.com";
        RongIM.connect(token, new RongIMClient.ConnectCallback() {
            @Override
            public void onDatabaseOpened(RongIMClient.DatabaseOpenStatus code) {
                //消息数据库打开，可以进入到主页面
            }

            @Override
            public void onSuccess(String s) {
                //连接成功
            }

            @Override
            public void onError(RongIMClient.ConnectionErrorCode errorCode) {
                if(errorCode.equals(RongIMClient.ConnectionErrorCode.RC_CONN_TOKEN_INCORRECT)) {
                    //从 APP 服务获取新 token，并重连
                } else {
                    //无法连接 IM 服务器，请根据相应的错误码作出对应处理
                }
            }
        });
        RongIM.setUserInfoProvider(new RongIM.UserInfoProvider() {

            /**
             * 获取设置用户信息. 通过返回的 userId 来封装生产用户信息.
             * @param userId 用户 ID
             */
            @Override
            public UserInfo getUserInfo(String userId) {
                if ("2".equals(userId)) {
                    UserInfo userInfo = new UserInfo(userId, "客服", Uri.parse("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3112630461,185620365&fm=26&gp=0.jpg"));
                    return userInfo;
                }
                UserInfo userInfo = new UserInfo(userId, "客人", Uri.parse("https://developer.rongcloud.cn/static/img/yunyinguser.jpg"));
                return userInfo;
            }

        }, false);

    }

    public void onClick(View v) {
        Conversation.ConversationType conversationType  = Conversation.ConversationType.PRIVATE;
        String targetId = "2";
        String title = "客服";

        String resId = "2";
        String senderUserId = "2";
        Message.ReceivedStatus receivedStatus = new Message.ReceivedStatus(0x1);
        String content = "您好，请问要咨询什么内容？";
        long sentTime = System.currentTimeMillis();

        RongIM.getInstance().insertIncomingMessage(conversationType, resId, senderUserId, receivedStatus, TextMessage.obtain(content), sentTime, new RongIMClient.ResultCallback<Message>() {
            /**
             * 成功回调
             * @param message 插入的消息
             */
            @Override
            public void onSuccess(Message message) {

            }

            /**
             * 失败回调
             * @param errorCode 错误码
             */
            @Override
            public void onError(RongIMClient.ErrorCode errorCode) {

            }
        });

        RongIM.getInstance().startConversation(HotelActivity.this , conversationType, targetId, title, null);
    }

}
