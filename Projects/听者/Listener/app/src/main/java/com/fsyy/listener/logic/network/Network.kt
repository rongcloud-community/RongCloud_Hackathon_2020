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

package com.fsyy.listener.logic.network

import cn.leancloud.AVFile
import cn.leancloud.AVObject
import cn.leancloud.AVQuery
import cn.leancloud.AVUser
import com.fsyy.listener.R
import com.fsyy.listener.ui.MyApplication
import com.fsyy.listener.utils.LogUtils
import com.fsyy.listener.utils.ToastUtil
import com.fsyy.listener.utils.extension.showToast
import io.reactivex.Observer
import io.reactivex.disposables.Disposable
import java.io.File
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

object Network {
    fun publishPost(map: Map<String,Any?>,success: (avObject: AVObject) -> Unit,failure:(e:Throwable)->Unit)=PostService.genPost(map).publishPostAV(success,failure)

    suspend fun loadPosts(limit:Int):List<AVObject> =PostService.genLoadQuery(limit).queryAV()
    suspend fun loadMorePosts(limit: Int,loadCount:Int):List<AVObject> =PostService.genLoadMoreQuery(limit,loadCount).queryAV()
    suspend fun loadPostLikes(posts:List<AVObject>)=LikeService.genPostLikeQuery(posts).queryAV()

    fun saveLike(map: Map<String, Any?>, success: (avObject: AVObject) -> Unit)=LikeService.genLike(map).saveAV(success)

    suspend fun loadComment(limit: Int,loadCount: Int,objectId:String)=CommentService.genLoadQuery(limit,loadCount,objectId).queryAV()
    suspend fun loadCommentLikes(comments:List<AVObject>)=LikeService.genCommentLikeQuery(comments).queryAV()
    suspend fun loadInnerComment(limit: Int,loadCount: Int,objectId: String)=CommentService.genLoadInnerQuery(limit,loadCount,objectId).queryAV()
    suspend fun loadAllInnerComments(objectId: String,floor:Int)=CommentService.genAllInnerComments(objectId,floor).queryAV()

    suspend fun fetchNewPost(postId:String)=AVObject.createWithoutData("Post",postId).fetchNew()
    suspend fun fetchNewComment(commentId:String)=AVObject.createWithoutData("Comment",commentId).fetchNew()
    fun publishComment(map: Map<String, Any?>, success: (avObject: AVObject) -> Unit)=CommentService.genComment(map).saveAV(success)
    suspend fun fetchCurrentUser()=AVUser.currentUser().fetchNew()

    fun uploadPhoto(path:String,success:(avObject:AVObject)->Unit)=AVFile.withAbsoluteLocalPath("image.jpg",path).saveAV(success)
    suspend fun uploadImage(path:String)= AVFile("image.jpg",File(path)).saveAVFile()

    suspend fun getUserData(objectId: String)=UserService.genUserQuery(objectId).queryUser()
    suspend fun getCommentCount(objectId: String)=CommentService.genAllCommentCountQuery(objectId).countQuery()
    suspend fun loadRecentComments(objectId: String)=CommentService.genRecentCommentQuery(objectId).queryAV()
    suspend fun getPostCount(objectId: String)=PostService.genAllPostCountQuery(objectId).countQuery()
    suspend fun loadRecentPosts(objectId: String)=PostService.genRecentPostQuery(objectId).queryAV()
    suspend fun getCommentContent(floor: Int,objectId: String)=CommentService.genCommentQuery(floor,objectId).queryAV()

    suspend fun getPrivatePosts(userId: String)=PostService.genAllPrivatePostQuery(userId).queryAV()

    private suspend fun AVQuery<AVUser>.queryUser():List<AVUser>{
        return suspendCoroutine {
            findInBackground().subscribe(object : Observer<List<AVUser>> {
                override fun onSubscribe(d: Disposable) {
                }
                override fun onNext(t: List<AVUser>) {
                    it.resume(t)
                }
                override fun onError(e: Throwable) {
                    //todo 显示toast，居中，图片
                    it.resumeWithException(e)
                }
                override fun onComplete() {
                }
            })
        }
    }
    private suspend fun AVQuery<AVObject>.countQuery():Int{
        LogUtils.e("执行数量查询")
        return suspendCoroutine {
            countInBackground().subscribe(object : Observer<Int> {
                override fun onSubscribe(d: Disposable) {
                }
                override fun onNext(t: Int) {
                    it.resume(t)
                }
                override fun onError(e: Throwable) {
                    it.resumeWithException(e)
                }
                override fun onComplete() {
                }
            })
        }
    }
    private suspend fun AVQuery<AVObject>.queryAV():List<AVObject>{
        LogUtils.e("执行Network的queryAV")
        return suspendCoroutine<List<AVObject>>{
            findInBackground().subscribe(object : Observer<List<AVObject>> {
                override fun onSubscribe(d: Disposable) {
                }
                override fun onNext(t: List<AVObject>) {
                    it.resume(t)
                }
                override fun onError(e: Throwable) {
                    //todo 当前网络状况不佳，异常也可以这里处理，但是就变成和回调一样了
                    it.resumeWithException(e)
                }
                override fun onComplete() {
                }
            })
        }
    }
    private suspend fun AVFile.saveAVFile():AVFile{
        return suspendCoroutine<AVFile>{
            saveInBackground().subscribe(object : Observer<AVFile> {
                override fun onSubscribe(d: Disposable) {
                }
                override fun onNext(t: AVFile) {
                    it.resume(t)
                }
                override fun onError(e: Throwable) {
                    it.resumeWithException(e)
                }
                override fun onComplete() {
                }
            })
        }
    }
    private fun AVObject.saveAV(success:(avObject:AVObject)->Unit)=saveInBackground().subscribe(object :Observer<AVObject>{
        override fun onSubscribe(d: Disposable) {
        }
        override fun onNext(t: AVObject) {
            success(t)
        }
        override fun onError(e: Throwable) {
            //todo 网络状况不佳，发布出现异常
//            MyApplication.context.resources.getString(R.string.failure_text).showToast()
            ToastUtil.showCenterToast(R.drawable.failure,MyApplication.context.getString(R.string.failure_text))
            LogUtils.e("Network: ${e.stackTraceToString()}")
        }
        override fun onComplete() {
        }
    })
    private fun AVObject.publishPostAV(success:(avObject:AVObject)->Unit,failure:(e:Throwable)->Unit)=saveInBackground().subscribe(object :Observer<AVObject>{
        override fun onSubscribe(d: Disposable) {
        }
        override fun onNext(t: AVObject) {
            success(t)
        }
        override fun onError(e: Throwable) {
            ToastUtil.showCenterToast(R.drawable.failure,MyApplication.context.getString(R.string.failure_text))
            LogUtils.e("Network: ${e.stackTraceToString()}")
            failure(e)
        }
        override fun onComplete() {
        }
    })
    private suspend fun AVObject.fetchNew(keys:String?=null):AVObject{
        return suspendCoroutine {
            fetchInBackground(keys).subscribe(object:Observer<AVObject>{
                override fun onSubscribe(d: Disposable) {
                }
                override fun onNext(t: AVObject) {
                    it.resume(t)
                }
                override fun onError(e: Throwable) {
                    it.resumeWithException(e)
                }
                override fun onComplete() {
                }
            })
        }
    }
}