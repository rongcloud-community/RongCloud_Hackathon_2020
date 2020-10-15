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

package com.fsyy.listener.ui.privacy

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import com.fsyy.listener.logic.Repository
import com.fsyy.listener.logic.model.PrivatePost

class PrivateViewModel:ViewModel() {
    val postList=ArrayList<PrivatePost>()

    private val userIdLiVeData=MutableLiveData<String>()
    fun getPrivatePosts(userId:String){
        userIdLiVeData.value=userId
    }
    val postsLiveData=Transformations.switchMap(userIdLiVeData){
        Repository.getPrivatePosts(it)
    }
}