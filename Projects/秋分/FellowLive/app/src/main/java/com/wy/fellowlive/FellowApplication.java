package com.wy.fellowlive;

import android.app.Application;
import android.text.TextUtils;

import com.wy.fellowlive.utils.Constant;
import com.wy.fellowlive.utils.SharedPreferencesUtils;

import java.util.UUID;

import io.rong.imlib.RongIMClient;

public class FellowApplication extends Application {

    public static FellowApplication instance;

    private String mUserID;
    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        RongIMClient.init(this, Constant.APP_KEY, false);
        initUserID();
    }


    private void initUserID(){
        mUserID = (String) SharedPreferencesUtils.getData(this,Constant.SHAREDPREF_KEY_USERID,"");

        if(TextUtils.isEmpty(mUserID)){
            mUserID = UUID.randomUUID().toString();
            SharedPreferencesUtils.setData(this,Constant.SHAREDPREF_KEY_USERID, mUserID);
        }
    }

    public String getUserID(){
        return mUserID;
    }

    public String getToken(){
        String token = (String) SharedPreferencesUtils.getData(this,Constant.SHAREDPREF_KEY_USERTOKEN,"");
        return token;
    }

    public void setToken(String token){
        SharedPreferencesUtils.setData(this,Constant.SHAREDPREF_KEY_USERTOKEN,token);
    }

}
