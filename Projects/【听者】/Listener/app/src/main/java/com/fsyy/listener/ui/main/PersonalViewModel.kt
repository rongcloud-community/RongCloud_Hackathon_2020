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

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import com.fsyy.listener.logic.Repository

class PersonalViewModel :ViewModel(){
    private val currentUserParamsLiveData=MutableLiveData<Any?>()
    val currentUserLiveData=Transformations.switchMap(currentUserParamsLiveData){
        Repository.fetchCurrentUser()
    }
    fun fetchCurrentUser(){
        currentUserParamsLiveData.value=currentUserParamsLiveData.value
    }
}