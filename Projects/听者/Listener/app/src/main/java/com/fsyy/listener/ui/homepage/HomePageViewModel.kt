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

package com.fsyy.listener.ui.homepage

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import cn.leancloud.AVObject
import cn.leancloud.AVUser
import com.fsyy.listener.logic.Repository
import com.fsyy.listener.logic.model.InnerCommentParams

class HomePageViewModel:ViewModel() {
    var dataList=ArrayList<Any>()
    var postList=ArrayList<AVObject>()
    var isCurrentUser=false
    val innerParams by lazy { ArrayList<InnerCommentParams>()}
    lateinit var userId:String
    lateinit var userName:String

    private val userIdLiveData=MutableLiveData<String>()
    fun getData(userId:String){
        userIdLiveData.value=userId
    }
    val allDataLiveData=Transformations.switchMap(userIdLiveData){
        Repository.loadAllHomeData(it)
    }

    private val postsLiveData=MutableLiveData<List<AVObject>>()
    fun getPostLikes(posts:List<AVObject>){
        postsLiveData.value=posts
    }
    val likesLiveData:LiveData<Result<List<AVObject>>> =Transformations.switchMap(postsLiveData){
        Repository.loadPostLikes(it)
    }

    private val innerParamsLiveData=MutableLiveData<List<InnerCommentParams>>()
    fun getCommentContents(params:List<InnerCommentParams>){
        innerParamsLiveData.value=params
    }
    val commentContentsLiveData:LiveData<Result<ArrayList<AVObject>>> =Transformations.switchMap(innerParamsLiveData){
        Repository.getCommentContents(it)
    }
}