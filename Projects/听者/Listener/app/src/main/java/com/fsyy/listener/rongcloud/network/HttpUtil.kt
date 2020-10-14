/*
 * 项目名：Listener
 * 作者：@happy_fsyy
 * 联系我：https://github.com/happyfsyy
 * Copyright (c) 2020. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

package com.fsyy.listener.rongcloud.network

import okhttp3.FormBody
import okhttp3.OkHttpClient
import okhttp3.Request
import kotlin.random.Random

object HttpUtil {
    fun getUserToken(appKey:String,appSecret:String,params:Map<String,String>,callback:okhttp3.Callback){
        val path = "https://api.cn.ronghub.com/user/getToken.json";
        val nonce= (1..1000).random().toString()
        val timeStamp=System.currentTimeMillis().toString()
        val signature=SHA1Tool.SHA1(appSecret+nonce+timeStamp)
        val client=OkHttpClient()
        val requestBody=FormBody.Builder().run {
            for((key,value) in params){
                add(key,value)
            }
            build()
        }
        val request=Request.Builder().url(path)
            .addHeader("RC-App-Key",appKey)
            .addHeader("RC-Nonce",nonce)
            .addHeader("RC-Timestamp",timeStamp)
            .addHeader("RC-Signature",signature)
            .post(requestBody)
            .build()
        client.newCall(request).enqueue(callback)
    }
}