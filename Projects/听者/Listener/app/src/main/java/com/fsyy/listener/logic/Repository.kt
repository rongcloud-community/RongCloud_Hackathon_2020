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

package com.fsyy.listener.logic

import androidx.lifecycle.liveData
import cn.leancloud.AVObject
import com.fsyy.listener.R
import com.fsyy.listener.logic.model.AllComments
import com.fsyy.listener.logic.model.AllHomeData
import com.fsyy.listener.logic.model.InnerCommentParams
import com.fsyy.listener.logic.network.Network
import com.fsyy.listener.ui.MyApplication
import com.fsyy.listener.utils.LogUtils
import com.fsyy.listener.utils.ToastUtil
import com.fsyy.listener.utils.extension.showToast
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import java.lang.Exception
import kotlin.coroutines.CoroutineContext

object Repository {
    fun publishPost(map:Map<String,Any?>,success:(avObject:AVObject)->Unit,failure:(e:Throwable)->Unit)=Network.publishPost(map,success,failure)

    fun loadPosts(limit: Int)= query(Dispatchers.Main){
        val response=Network.loadPosts(limit)
        Result.success(response)
    }
    fun loadMorePosts(limit: Int,loadCount:Int)= query(Dispatchers.Main){
        val response=Network.loadMorePosts(limit,loadCount)
        Result.success(response)
    }
    fun loadPostLikes(post:List<AVObject>)= query(Dispatchers.Main){
        val response=Network.loadPostLikes(post)
        Result.success(response)
    }


    fun loadCommentLikes(comments:List<AVObject>)= query(Dispatchers.Main){
        LogUtils.e("加载评论的点赞情况")
        val response=Network.loadCommentLikes(comments)
        Result.success(response)
    }
    fun loadAllComments(limit: Int,loadCount: Int,objectId: String)= query(Dispatchers.Main){
        coroutineScope {
            LogUtils.e("加载所有的评论")
            val deferredComments=async { Network.loadComment(limit,loadCount,objectId) }
            val deferredInnerComments=async { Network.loadInnerComment(limit,loadCount, objectId) }
            val commentList=deferredComments.await()
            val innerCommentList=deferredInnerComments.await()
            val allComments=AllComments(commentList,innerCommentList)
            Result.success(allComments)
        }
    }
    fun loadAllInnerComments(objectId: String,floor:Int)= query(Dispatchers.Main){
        val response=Network.loadAllInnerComments(objectId,floor)
        Result.success(response)
    }
    fun fetchNewPost(postId:String)= query(Dispatchers.Main){
        val response=Network.fetchNewPost(postId)
        Result.success(response)
    }
    fun fetchNewComment(commentId:String)= query(Dispatchers.Main){
        val response=Network.fetchNewComment(commentId)
        Result.success(response)
    }

    fun fetchCurrentUser()= query(Dispatchers.Main){
        val response=Network.fetchCurrentUser()
        Result.success(response)
    }

    fun uploadImages(pathList: ArrayList<String>)= query(Dispatchers.Main){
        val imgUrls=ArrayList<String>()
        val start=System.currentTimeMillis()
        coroutineScope {
            for(path in pathList){
                launch {
                    val avFile= path.let { async { Network.uploadImage(it) }.await() }
                    val imgUrl=avFile.url
                    imgUrls.add(imgUrl)
                }
            }
        }
        val end=System.currentTimeMillis()
        LogUtils.e("imgUrls的大小是${imgUrls.size},耗时${end-start}毫秒")
        Result.success(imgUrls)
    }
    fun loadAllHomeData(objectId: String)= query(Dispatchers.Main){
        coroutineScope {
            val deferredUserData=async { Network.getUserData(objectId) }
            val deferredComCount=async { Network.getCommentCount(objectId) }
            val deferredRecentComments=async { Network.loadRecentComments(objectId) }
            val deferredPostCount=async { Network.getPostCount(objectId) }
            val deferredRecentPosts=async { Network.loadRecentPosts(objectId) }
            Result.success(AllHomeData(deferredUserData.await()[0],deferredComCount.await(),deferredRecentComments.await(),
                deferredPostCount.await(),deferredRecentPosts.await()))
        }
    }
    fun getCommentContents(params:List<InnerCommentParams>)= query(Dispatchers.Main){
        val comments=ArrayList<AVObject>()
        coroutineScope {
            for(param in params){
                launch {
                    val comment=async { Network.getCommentContent(param.floor,param.objectId) }.await()[0]
                    comments.add(comment)
                }
            }
        }
        Result.success(comments)
    }

    fun getPrivatePosts(objectId: String)= query(Dispatchers.Main){
        val response=Network.getPrivatePosts(objectId)
        Result.success(response)
    }

    /**
     * 这里只是简化了方法，并且对查询结果进行了LiveData的包装
     */
    private fun <T> query(coroutineContext: CoroutineContext,block:suspend ()->Result<T>)= liveData<Result<T>>(coroutineContext) {
        LogUtils.e("执行Repository")
        val result=try{
            block()
        }catch (e:Exception){
//            MyApplication.context.getString(R.string.failure_text).showToast()
            ToastUtil.showCenterToast(R.drawable.warn,MyApplication.context.getString(R.string.toast_network_exception))

            LogUtils.e("Repository: ${e.printStackTrace()}")
            Result.failure<T>(e)
        }
        emit(result)
    }
}