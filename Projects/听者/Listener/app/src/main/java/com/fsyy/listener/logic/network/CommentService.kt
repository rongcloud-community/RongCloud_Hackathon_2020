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
import com.fsyy.listener.utils.extension.valuesOfAVObject

object CommentService {
    /**
     * @param objectId 帖子的ObjectId
     */
    fun genLoadQuery(limitNum:Int,loadCount:Int,objectId:String)=AVQuery<AVObject>("Comment").apply {
        LogUtils.e("执行CommentService的loadQuery")
        limit=limitNum
        whereEqualTo("post",AVObject.createWithoutData("Post",objectId))
        whereEqualTo("isInner",false)
        LogUtils.e("genLoadQuery()中的loadCount是$loadCount,跳过${limitNum*loadCount}条数据")
        skip(limitNum*loadCount)
        include("fromAuthor")
        orderByAscending("floor")
    }

    fun genComment(map:Map<String,Any?>)= valuesOfAVObject("Comment",map)

    /**
     * 查询Post的所有innerComment，只查询前两个，也就是innerFloor是1和2的
     */
    fun genLoadInnerQuery(limitNum: Int,loadCount: Int,objectId: String)=AVQuery<AVObject>("Comment").apply {
        LogUtils.e("执行CommentService的loadInnerQuery")
        whereEqualTo("post",AVObject.createWithoutData("Post",objectId))
        whereEqualTo("isInner",true)
        whereGreaterThan("floor",limitNum*loadCount)
        whereLessThanOrEqualTo("floor",limitNum*(loadCount+1))
        whereContainedIn("innerFloor", listOf(1,2))
        include("fromAuthor")
        include("toAuthor")
        orderByAscending("floor")
        orderByAscending("innerFloor")
    }

    /**
     * 查询Post下的某个Comment的所有InnerComment
     */
    fun genAllInnerComments(objectId:String,floor:Int)=AVQuery<AVObject>("Comment").apply {
        whereEqualTo("post",AVObject.createWithoutData("Post",objectId))
        whereEqualTo("floor",floor)
        whereEqualTo("isInner",true)
        include("fromAuthor")
        include("toAuthor")
        orderByAscending("innerFloor")
    }

    /**
     * 查询评论数量
     */
    fun genAllCommentCountQuery(userId: String)=AVQuery<AVObject>("Comment").apply {
        whereEqualTo("fromAuthor",AVObject.createWithoutData("_User",userId))
    }
    /**
     * @param userId 目标用户的userId，不是当前用户的userId
     * 查询userId的用户最近的三条评论
     */
    fun genRecentCommentQuery(userId:String)=AVQuery<AVObject>("Comment").apply {
        whereEqualTo("fromAuthor",AVObject.createWithoutData("_User",userId))
        include("fromAuthor")
        include("post")
        include("post.author")
        limit=3
        orderByDescending("createdAt")
    }
    /**
     * 根据InnerComment的floor查询对应的Comment，获得comment的内容
     */
    fun genCommentQuery(floor:Int,postObjectId:String)=AVQuery<AVObject>("Comment").apply {
        whereEqualTo("floor",floor)
        whereEqualTo("post",AVObject.createWithoutData("Post",postObjectId))
        whereEqualTo("isInner",false)
    }
}