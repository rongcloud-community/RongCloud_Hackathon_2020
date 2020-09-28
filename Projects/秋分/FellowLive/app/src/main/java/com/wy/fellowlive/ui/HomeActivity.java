package com.wy.fellowlive.ui;

import android.app.Activity;
import android.os.Bundle;
import android.text.TextUtils;

import com.wy.fellowlive.FellowApplication;
import com.wy.fellowlive.bean.UserToken;
import com.wy.fellowlive.net.GetTokenApi;
import com.wy.fellowlive.utils.Constant;
import com.wy.fellowlive.utils.ToastUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class HomeActivity extends Activity {

    private Retrofit mRetrofit;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getToken();
    }

    private void getToken(){
        if(!TextUtils.isEmpty(FellowApplication.instance.getToken())){
            return;
        }
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
        getTokenApi.getUserToken(params,headers).enqueue(new Callback<UserToken>() {
            @Override
            public void onResponse(Call<UserToken> call, Response<UserToken> response) {
                FellowApplication.instance.setToken(response.body().token);
                ToastUtil.showLong(HomeActivity.this,response.body().token);
            }

            @Override
            public void onFailure(Call<UserToken> call, Throwable t) {
                t.printStackTrace();
            }
        });

    }

    private int getRandomInt(){
        Random random = new Random();
        return random.nextInt(Integer.MAX_VALUE);
    }

}
