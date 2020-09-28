package com.wy.fellowlive;

import android.app.Application;
import android.text.TextUtils;

import com.wy.fellowlive.utils.Constant;
import com.wy.fellowlive.utils.SharedPreferencesUtils;

import java.util.UUID;

import io.rong.imlib.RongIMClient;

public class FellowApplication extends Application {

    public static FellowApplication instance;
    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        RongIMClient.init(this, Constant.APP_KEY, false);
        initUserID();
    }


    private void initUserID(){
        String userID = (String) SharedPreferencesUtils.getData(this,Constant.SHAREDPREF_KEY_USERID,"");

        if(TextUtils.isEmpty(userID)){
            SharedPreferencesUtils.setData(this,Constant.SHAREDPREF_KEY_USERID, UUID.randomUUID().toString());
        }
    }

    public String getUserID(){
        String userID = (String) SharedPreferencesUtils.getData(this,Constant.SHAREDPREF_KEY_USERID,"");
        return userID;
    }

    public String getToken(){
        String token = (String) SharedPreferencesUtils.getData(this,Constant.SHAREDPREF_KEY_USERTOKEN,"");
        return token;
    }

    public void setToken(String token){
        SharedPreferencesUtils.setData(this,Constant.SHAREDPREF_KEY_USERTOKEN,token);
    }

}
