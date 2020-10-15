package com.example.jialichun.client.activities;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;
import com.example.jialichun.client.R;

import java.util.HashMap;
import java.util.Map;

import io.rong.imkit.RongIM;
import io.rong.imlib.RongIMClient;
import io.rong.imlib.model.Conversation;
import io.rong.imlib.model.UserInfo;


public class MainActivity extends AppCompatActivity {

    Toast tst;
    Intent intent;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        if(!MyApp.getState()){
//            intent=new Intent(MainActivity.this,LoginActivity.class);
//            startActivity(intent);
//        }
        MyApplication application = (MyApplication)this.getApplicationContext();
                if(!application.getState()){
            intent=new Intent(MainActivity.this,LoginActivity.class);
            startActivity(intent);
        }
        setContentView(R.layout.activity_main);

    }
    public void onClick(View v) {
        // TODO Auto-generated method stub
        switch (v.getId()) {
            case R.id.main_door:
                intent=new Intent(MainActivity.this,MapActivity.class);
                startActivity(intent);
                System.out.println("1");
                break;
            case R.id.main_setting:
                intent=new Intent(MainActivity.this,SettingActivity.class);
                startActivity(intent);
                System.out.println("2");
                break;
            case R.id.main_users:
                intent=new Intent(MainActivity.this,UsersActivity.class);
                startActivity(intent);
                System.out.println("3");
                break;
            case R.id.main_note:
                intent=new Intent(MainActivity.this,NoteActivity.class);
                startActivity(intent);
                System.out.println("4");
                break;
            case R.id.main_pass:
                 intent=new Intent(MainActivity.this,PassportActivity.class);
                startActivity(intent);
                System.out.println("6");
                break;
            case R.id.main_touxiang:
                intent=new Intent(MainActivity.this,SettingActivity.class);
                startActivity(intent);
                System.out.println("2");
                break;
            case R.id.main_news:
                intent=new Intent(MainActivity.this,NoteActivity.class);
                startActivity(intent);
                System.out.println("2");
                break;
            case R.id.main_camer:

                intent=new Intent(MainActivity.this,CamActivity.class);
                startActivity(intent);
                System.out.println("2");
//                Intent i = new Intent();
//                i.setAction(MediaStore.ACTION_IMAGE_CAPTURE);
//                startActivity(intent);
                break;
            default:
                String s = v.toString();
                tst = Toast.makeText(this,""+v.getId() , Toast.LENGTH_SHORT);
                tst.show();
                System.out.println(""+v.getId());
                break;
        }
    }
    public void onClickMessage(View v){
        String token = "SYvuElLX9lO830pFhxzIN7vSHLNe/o3E@rgr9.cn.rongnav.com;rgr9.cn.rongcfg.com";
        RongIM.connect(token, new RongIMClient.ConnectCallback() {
            @Override
            public void onDatabaseOpened(RongIMClient.DatabaseOpenStatus code) {

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
                UserInfo userInfo = new UserInfo(userId, "跑王", Uri.parse("https://developer.rongcloud.cn/static/img/yunyinguser.jpg"));
                return userInfo;
            }

        }, false);

        intent = new Intent(this,MessageActivity.class);
        startActivity(intent);
    }

}
