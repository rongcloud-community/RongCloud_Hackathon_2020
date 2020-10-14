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

import cn.leancloud.AVObject
import cn.leancloud.AVQuery
import cn.leancloud.AVUser
import com.fsyy.listener.utils.LogUtils

object LikeService {
    fun genPostLikeQuery(posts:List<AVObject>)=AVQuery<AVObject>("Like").apply {
        LogUtils.e("执行like的查询")
        whereContainedIn("post",posts)
        whereEqualTo("user",AVUser.currentUser())
    }
    fun genCommentLikeQuery(comments:List<AVObject>)=AVQuery<AVObject>("Like").apply {
        LogUtils.e("获取评论Like的Query")
        whereContainedIn("comment",comments)
        whereEqualTo("user",AVUser.currentUser())
    }
    fun genLike(map:Map<String,Any?>)=AVObject("Like").apply {
        for((key,value) in map){
            put(key,value)
        }
    }
}