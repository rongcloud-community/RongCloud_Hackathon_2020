package com.wy.fellowlive.net;

import com.wy.fellowlive.bean.UserToken;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.FieldMap;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.HeaderMap;
import retrofit2.http.POST;

public interface GetTokenApi {

    @FormUrlEncoded
    @POST("user/getToken.json")
    Call<UserToken> getUserToken(@FieldMap Map<String,String> params,@HeaderMap Map<String,String> heads);
}
