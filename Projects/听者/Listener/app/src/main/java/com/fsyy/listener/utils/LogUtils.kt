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

package com.fsyy.listener.utils

import android.util.Log

object LogUtils {
    val tag="我自己打印的Log"
    const val isDebug=false
    fun e(msg:String){
        if(isDebug)
            Log.e(tag,msg)
    }
    fun e(tag:String,msg: String){
        if(isDebug)
            Log.e(tag,msg)
    }
}