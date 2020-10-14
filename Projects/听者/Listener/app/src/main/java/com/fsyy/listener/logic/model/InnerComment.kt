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

package com.fsyy.listener.logic.model

import java.util.*

/**
 * 评论中的评论，为DetailActivity设计
 * @param toUserName 被回复的用户的userName
 * @param floor 在Post中的floor，与对应的Comment的floor相同
 * @param innerFloor 在Comment中的floor，根据评论时间排序也可，这里的InnerFloor，只是为了查询的时候只查询2个
 */
class InnerComment(objectId:String,fromUserId:String,fromUserName:String,val toUserName:String,content:String,date:Date,
                   val floor:Int,val innerFloor:Int,
                   val isInner:Boolean=true,likeCount:Int=0,isLike:Boolean=false,likeObjectId:String="")
    :TreeHole(objectId ,fromUserId ,fromUserName,content,date, INNER_COMMENT,likeCount ,isLike ,likeObjectId)