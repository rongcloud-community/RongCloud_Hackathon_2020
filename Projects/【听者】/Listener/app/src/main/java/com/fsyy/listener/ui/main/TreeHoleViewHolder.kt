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

package com.fsyy.listener.ui.main

import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.fsyy.listener.R

sealed class TreeHoleViewHolder(itemView:View):RecyclerView.ViewHolder(itemView)
class PostViewHolder(itemView: View): TreeHoleViewHolder(itemView){
    val photo:ImageView=itemView.findViewById(R.id.post_photo)
    val userName:TextView=itemView.findViewById(R.id.post_userName)
    val content:TextView=itemView.findViewById(R.id.post_content)
    val tag:TextView=itemView.findViewById(R.id.post_tag)
    val date:TextView=itemView.findViewById(R.id.post_date)
    val likeImg:ImageView=itemView.findViewById(R.id.post_like_img)
    val likeCount:TextView=itemView.findViewById(R.id.post_like_count)
    val commentCount:TextView=itemView.findViewById(R.id.post_comment_count)
}
class CommentViewHolder(itemView: View):TreeHoleViewHolder(itemView){
    val photo:ImageView=itemView.findViewById(R.id.comment_user_photo)
    val userName:TextView=itemView.findViewById(R.id.comment_user_name)
    val likeImg:ImageView=itemView.findViewById(R.id.comment_like_img)
    val likeCount:TextView=itemView.findViewById(R.id.comment_like_count)
    val content:TextView=itemView.findViewById(R.id.comment_content)
    val date:TextView=itemView.findViewById(R.id.comment_date)
    val innerLayout:LinearLayout=itemView.findViewById(R.id.comment_inner_layout)
    val innerText:TextView=itemView.findViewById(R.id.comment_inner_content)
}
class HeaderViewHolder(itemView: View):TreeHoleViewHolder(itemView){
    val headerText:TextView=itemView.findViewById(R.id.home_header_text)
    val headerNum:TextView=itemView.findViewById(R.id.home_header_num)
}