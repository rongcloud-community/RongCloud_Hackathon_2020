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

package com.fsyy.listener.ui.detail

import android.view.LayoutInflater
import android.view.View
import android.widget.Button
import android.widget.PopupWindow
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import cn.leancloud.AVObject
import com.fsyy.listener.R
import com.fsyy.listener.logic.Repository
import com.fsyy.listener.logic.model.CommentLoadMoreParams
import com.fsyy.listener.logic.model.InnerCommentParams
import com.fsyy.listener.logic.model.Post
import com.fsyy.listener.logic.model.TreeHole
import com.fsyy.listener.logic.network.Network
import com.fsyy.listener.ui.MyApplication

class DetailViewModel:ViewModel() {
    val dataList=ArrayList<TreeHole>()
    lateinit var post: Post
    val popupView:View by lazy { LayoutInflater.from(MyApplication.context).inflate(R.layout.detail_popup,null) }
    val report:Button by lazy { popupView.findViewById(R.id.detail_report) }
    val share2WeChat:Button by lazy { popupView.findViewById(R.id.detail_share_wechat) }
    val cancel:Button by lazy { popupView.findViewById(R.id.detail_cancel) }
    lateinit var popupWindow: PopupWindow
    val popupView2: View by lazy { LayoutInflater.from(MyApplication.context).inflate(R.layout.popup_submit,null) }
    var popupWindow2:PopupWindow?=null

    /**
     * 记录上拉记载了多少次,从1开始计数
     */
    val loadCountLiveData: LiveData<Int>
        get()=_loadCountLiveData
    private val _loadCountLiveData=MutableLiveData<Int>().apply { value=0 }
    fun clearLoadCount(){
        _loadCountLiveData.value=0
    }
    fun plusLoadCount(){
        val loadCount=_loadCountLiveData.value?:0
        _loadCountLiveData.value=loadCount+1
    }

    /**
     * 根据帖子的objectId，和查询的数量，获取Comment，只需要管擦commentLiveData即可
     */
    private val loadLiveData=MutableLiveData<CommentLoadMoreParams>()
    fun loadComment(limit:Int,objectId:String,loadCount:Int){
        val params=CommentLoadMoreParams(objectId,limit,loadCount)
        loadLiveData.value=params
    }
    val allCommentsLiveData=Transformations.switchMap(loadLiveData){
        Repository.loadAllComments(it.limit,it.loadCount,it.objectId)
    }

    /**
     * 提交评论的时候，根据postId获取最新的Post的commentCount，这样才可以得到floor
     */
    private val postIdLiveData=MutableLiveData<String>()
    fun fetchNewPost(postId:String){
        postIdLiveData.value=postId
    }
    val newPostLiveData=Transformations.switchMap(postIdLiveData){
        Repository.fetchNewPost(it)
    }

    /**
     * 根据获得评论，去查询对应的like表
     */
    private val commentsLiveData=MutableLiveData<List<AVObject>>()
    fun loadLikes(comments:List<AVObject>){
        commentsLiveData.value=comments
    }
    val likesLiveData=Transformations.switchMap(commentsLiveData){
        Repository.loadCommentLikes(it)
    }

    fun publishComment(map:Map<String,Any?>,success: (avObject: AVObject) -> Unit)=Network.publishComment(map,success)

    val floorLiveData=MutableLiveData(0)
    val innerFloorLiveData=MutableLiveData(-1)
    val toUserNameLiveData=MutableLiveData("")

    /**
     * 刷新当前的comment，获取comment的floor
     */
    private val commentIdLiveData=MutableLiveData<String>()
    fun fetchNewComment(commentId:String){
        commentIdLiveData.value=commentId
    }
    val newCommentLiveData=Transformations.switchMap(commentIdLiveData){
        Repository.fetchNewComment(it)
    }

    /**
     * 是为了加载某一层Comment的所有InnerComment
     */
    private val innerCommentParamsLiveData=MutableLiveData<InnerCommentParams>()
    fun loadAllInnerComments(objectId:String,floor:Int){
        val params=InnerCommentParams(objectId,floor)
        innerCommentParamsLiveData.value=params
    }
    val allInnerComments=Transformations.switchMap(innerCommentParamsLiveData){
        Repository.loadAllInnerComments(it.objectId,it.floor)
    }

    fun saveLike(map:Map<String,Any?>,success: (avObject: AVObject) -> Unit)=Network.saveLike(map,success)
}