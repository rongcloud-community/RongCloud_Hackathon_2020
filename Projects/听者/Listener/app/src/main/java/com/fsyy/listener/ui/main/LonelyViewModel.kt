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

package com.fsyy.listener.ui.main

import android.view.LayoutInflater
import android.view.View
import android.widget.PopupWindow
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import cn.leancloud.AVObject
import com.fsyy.listener.R
import com.fsyy.listener.logic.Repository
import com.fsyy.listener.ui.MyApplication

class LonelyViewModel :ViewModel(){
    companion object{
        const val OPEN=0
        const val PRIVATE=1
        const val BURIED=2
    }
    val popupView: View by lazy { LayoutInflater.from(MyApplication.context).inflate(R.layout.popup_submit,null) }
    lateinit var popupWindow:PopupWindow
    val type:LiveData<Int>
        get() = _type
    private val _type=MutableLiveData<Int>()
    init {
        _type.value= OPEN
    }
    fun open(){
        _type.value= OPEN
    }
    fun private(){
        _type.value= PRIVATE
    }
    fun buried(){
        _type.value= BURIED
    }
    fun publishPost(map:Map<String,Any?>,success:(avObject: AVObject)->Unit,failure:(e:Throwable)->Unit)=Repository.publishPost(map,success,failure)

}