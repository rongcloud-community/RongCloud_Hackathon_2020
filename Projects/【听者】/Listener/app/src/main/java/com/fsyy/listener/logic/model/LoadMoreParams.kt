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

/**
 * 专为上拉加载设置的类
 * @param limit 加载的帖子数量，这里与预加载的数量保持一致。例如最开始加载10条，之后每次上拉也是10条
 * @param loadCount 第几次加载，1开始计数
 */
data class PostLoadMoreParams(val limit: Int,val loadCount:Int)

/**
 * @param objectId post的objectId
 */
data class CommentLoadMoreParams(val objectId:String,val limit: Int,val loadCount: Int)

/**
 * 为了DetailActivity界面设计的,为了加载某一层Comment的所有InnerComment
 * @param objectId 帖子的objectId
 * @param floor 评论所在的楼层
 */
data class InnerCommentParams(val objectId: String,val floor:Int)