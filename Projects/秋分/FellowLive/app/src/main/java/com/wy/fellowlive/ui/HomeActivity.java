package com.wy.fellowlive.ui;

import android.Manifest;
import android.app.Activity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.blankj.utilcode.constant.PermissionConstants;
import com.blankj.utilcode.util.PermissionUtils;
import com.wy.fellowlive.FellowApplication;
import com.wy.fellowlive.R;
import com.wy.fellowlive.bean.UserToken;
import com.wy.fellowlive.net.GetTokenApi;
import com.wy.fellowlive.utils.Constant;
import com.wy.fellowlive.utils.StringUtils;
import com.wy.fellowlive.utils.ToastUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import cn.rongcloud.rtc.api.RCRTCConfig;
import cn.rongcloud.rtc.api.RCRTCEngine;
import cn.rongcloud.rtc.api.RCRTCLocalUser;
import cn.rongcloud.rtc.api.RCRTCRemoteUser;
import cn.rongcloud.rtc.api.RCRTCRoom;
import cn.rongcloud.rtc.api.callback.IRCRTCResultDataCallback;
import cn.rongcloud.rtc.api.callback.IRCRTCRoomEventsListener;
import cn.rongcloud.rtc.api.stream.RCRTCInputStream;
import cn.rongcloud.rtc.api.stream.RCRTCLiveInfo;
import cn.rongcloud.rtc.api.stream.RCRTCVideoStreamConfig;
import cn.rongcloud.rtc.api.stream.RCRTCVideoView;
import cn.rongcloud.rtc.base.RCRTCParamsType;
import cn.rongcloud.rtc.base.RCRTCRoomType;
import cn.rongcloud.rtc.base.RTCErrorCode;
import io.rong.imlib.RongIMClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class HomeActivity extends Activity {

    public String TAG = "HomeActivity";

    private Retrofit mRetrofit;
    private FrameLayout mFrameLayoutLive;
    private TextView mTxtLiveUrl;
    private Button mBtnStart;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        mFrameLayoutLive = findViewById(R.id.layout_live);
        mTxtLiveUrl = findViewById(R.id.txt_live_url);
        mBtnStart = findViewById(R.id.btn_start);


        String token = FellowApplication.instance.getToken();
        if(TextUtils.isEmpty(token)){
            getToken();
        }else{
            Log.d(TAG,"token = "+token);
            requesPermissionAndConnet(token);
        }
    }


    private void requesPermissionAndConnet(String token){
        if(PermissionUtils.isGranted(Manifest.permission.CAMERA,Manifest.permission.RECORD_AUDIO,Manifest.permission.MODIFY_AUDIO_SETTINGS)){
            connet(token);
        }else{
            PermissionUtils.permission(PermissionConstants.CAMERA,PermissionConstants.MICROPHONE).callback(new PermissionUtils.SimpleCallback() {
                @Override
                public void onGranted() {
                    connet(token);
                }

                @Override
                public void onDenied() {

                }
            }).request();
        }
    }

    private void connet(String token){
        RongIMClient.connect(token, new RongIMClient.ConnectCallback() {
            @Override
            public void onDatabaseOpened(RongIMClient.DatabaseOpenStatus code) {

            }

            @Override
            public void onSuccess(String s) {
                //TODO 服务连接成功后，可以进行音视频加入房间操作 RCRTCEngine.getInstance().joinRoom(...)
                joinRoom();
            }

            @Override
            public void onError(RongIMClient.ConnectionErrorCode errorCode) {

            }
        });
    }

    private void joinRoom(){
        RCRTCConfig config = RCRTCConfig.Builder.create()
                //是否硬解码
                .enableHardwareDecoder(true)
                //是否硬编码
                .enableHardwareEncoder(true)
                .build();
        RCRTCEngine.getInstance().init(getApplicationContext(), config);
        RCRTCVideoStreamConfig videoConfigBuilder = RCRTCVideoStreamConfig.Builder.create()
                //设置分辨率
                .setVideoResolution(RCRTCParamsType.RCRTCVideoResolution.RESOLUTION_480_640)
                //设置帧率
                .setVideoFps(RCRTCParamsType.RCRTCVideoFps.Fps_15)
                //设置最小码率，480P下推荐200
                .setMinRate(200)
                //设置最大码率，480P下推荐900
                .setMaxRate(900)
                .build();
        RCRTCEngine.getInstance().getDefaultVideoStream().setVideoConfig(videoConfigBuilder);

// 创建本地视频显示视图
        RCRTCVideoView rongRTCVideoView = new RCRTCVideoView(getApplicationContext());
        RCRTCEngine.getInstance().getDefaultVideoStream().setVideoView(rongRTCVideoView);

//TODO 将本地视图添加至FrameLayout布局，需要开发者自行创建布局
        mFrameLayoutLive.addView(rongRTCVideoView);
//开启摄像头采集视频数据
        RCRTCEngine.getInstance().getDefaultVideoStream().startCamera(null);

//根据实际场景，选择音视频直播：LIVE_AUDIO_VIDEO 或音频直播：LIVE_AUDIO
        RCRTCRoomType rtcRoomType = RCRTCRoomType.LIVE_AUDIO_VIDEO;
//mRoomId：最大长度 64 个字符，可包含：`A-Z`、`a-z`、`0-9`、`+`、`=`、`-`、`_`
        String roomId = FellowApplication.instance.getUserID()+ "-"+StringUtils.getRandomString(8);
        Log.d(TAG,"roomId = "+roomId);
        RCRTCEngine.getInstance().joinRoom(roomId, rtcRoomType, new IRCRTCResultDataCallback<RCRTCRoom>() {
            @Override
            public void onSuccess(RCRTCRoom rcrtcRoom) {
                //注册房间事件回调
                rcrtcRoom.registerRoomListener(new RoomEventsListener());
                //加入房间成功后，发布默认音视频流
                publishDefaultAVStream(rcrtcRoom.getLocalUser());
                //加入房间成功后，如果房间中已存在用户且发布了音、视频流，就订阅远端用户发布的音视频流.
//                subscribeAVStream(rcrtcRoom);
            }

            @Override
            public void onFailed(RTCErrorCode errorCode) {
                Log.d(TAG,"joinRoom errorCode = "+errorCode.getReason());
            }
        });
    }

    private void publishDefaultAVStream(RCRTCLocalUser localUser) {
        localUser.publishDefaultLiveStreams(new IRCRTCResultDataCallback<RCRTCLiveInfo>() {
            @Override
            public void onSuccess(RCRTCLiveInfo liveInfo) {
                String liveUrl = liveInfo.getLiveUrl();
                //TODO 上传liveUrl到客户自己的APP server，提供给观众端用来订阅
                Log.d(TAG,"liveUrl = "+liveUrl);
            }

            @Override
            public void onFailed(final RTCErrorCode errorCode) {
                Log.d(TAG,"publishDefaultAVStream errorCode = "+errorCode.getReason());
            }
        });
    }



    private void getToken(){
        mRetrofit = new Retrofit
                .Builder()
                .baseUrl("https://api-cn.ronghub.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        GetTokenApi getTokenApi =  mRetrofit.create(GetTokenApi.class);
        Map<String,String> headers = new HashMap<>();

        long timestamp = System.currentTimeMillis();
        int nonce = getRandomInt();
        String signContent = Constant.APP_SECRET+nonce+""+timestamp;
        headers.put("App-Key", Constant.APP_KEY);
        headers.put("Nonce", nonce+"");
        headers.put("Timestamp", timestamp+"");
        headers.put("Signature", EncryptionUtils.getSha1(signContent));
        Map<String,String> params = new HashMap<>();
        params.put("userId",FellowApplication.instance.getUserID());
        Log.d(TAG,"userId = "+params.get("userId"));
        getTokenApi.getUserToken(params,headers).enqueue(new Callback<UserToken>() {
            @Override
            public void onResponse(Call<UserToken> call, Response<UserToken> response) {
                requesPermissionAndConnet(response.body().token);
                FellowApplication.instance.setToken(response.body().token);
            }

            @Override
            public void onFailure(Call<UserToken> call, Throwable t) {
                t.printStackTrace();
            }
        });

    }

    class RoomEventsListener extends IRCRTCRoomEventsListener{

        @Override
        public void onRemoteUserPublishResource(RCRTCRemoteUser rcrtcRemoteUser, List<RCRTCInputStream> list) {

        }

        @Override
        public void onRemoteUserMuteAudio(RCRTCRemoteUser rcrtcRemoteUser, RCRTCInputStream rcrtcInputStream, boolean b) {

        }

        @Override
        public void onRemoteUserMuteVideo(RCRTCRemoteUser rcrtcRemoteUser, RCRTCInputStream rcrtcInputStream, boolean b) {

        }

        @Override
        public void onRemoteUserUnpublishResource(RCRTCRemoteUser rcrtcRemoteUser, List<RCRTCInputStream> list) {

        }

        @Override
        public void onUserJoined(RCRTCRemoteUser rcrtcRemoteUser) {

        }

        @Override
        public void onUserLeft(RCRTCRemoteUser rcrtcRemoteUser) {

        }

        @Override
        public void onUserOffline(RCRTCRemoteUser rcrtcRemoteUser) {

        }

        @Override
        public void onLeaveRoom(int i) {

        }
    }

    private int getRandomInt(){
        Random random = new Random();
        return random.nextInt(Integer.MAX_VALUE);
    }

}
