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

package com.fsyy.listener.utils.extension

import cn.leancloud.AVObject
import cn.leancloud.AVUser
import com.fsyy.listener.logic.model.Comment
import com.fsyy.listener.logic.model.InnerComment
import com.fsyy.listener.logic.model.Post
import com.fsyy.listener.logic.model.PrivatePost


fun AVObject.toPost():Post{
    val objectId=objectId
    val author=getAVObject("author") as AVUser
    val userId=author.objectId
    val photoUrl=author.getString("photoUrl")
    val userName=author.getString("username")
    val content=getString("content")
    val tag=getString("tag")
    val date=createdAt
    val likeCount=getInt("likeCount")
    val commentCount=getInt("commentCount")
    return Post(objectId,userId,photoUrl,userName,content,date,likeCount,commentCount,tag)
}
fun AVObject.toComment():Comment {
    val objectId=objectId
    val author=getAVObject("fromAuthor") as AVUser
    val userId=author.objectId
    val photoUrl=author.getString("photoUrl")
    val userName=author.username
    val likeCount=getInt("likeCount")
    val content=getString("content")
    val date=createdAt
    val commentCount=getInt("commentCount")
    val floor=getInt("floor")
    val isInner=getBoolean("isInner")
    return Comment(objectId,userId,photoUrl,userName,likeCount,content,date,commentCount,floor,isInner)
}
fun AVObject.toInnerComment():InnerComment{
    val objectId=objectId
    val fromUser=getAVObject<AVObject>("fromAuthor") as AVUser
    val fromUserId=fromUser.objectId
    val fromUserName=fromUser.username
    val toUser=getAVObject<AVObject>("toAuthor") as AVUser
    val toUserName=toUser.username
    val content=getString("content")
    val date=createdAt
    val floor=getInt("floor")
    val innerFloor=getInt("innerFloor")
    return InnerComment(objectId,fromUserId,fromUserName,toUserName,content,date,floor,innerFloor)
}
fun valuesOfAVObject(className: String,map:Map<String,Any?>)=AVObject(className).apply {
    for((key,value) in map){
        put(key,value)
    }
}
fun AVObject.toPrivatePost():PrivatePost{
    val date=createdAt.displayYearMonthDate()
    val content=getString("content")
    return PrivatePost(date,content)
}

