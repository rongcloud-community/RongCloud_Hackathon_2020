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

import android.app.Activity
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CircleCrop
import com.bumptech.glide.request.RequestOptions
import com.fsyy.listener.R
import com.fsyy.listener.logic.model.Comment
import com.fsyy.listener.logic.model.Header
import com.fsyy.listener.logic.model.Post
import com.fsyy.listener.logic.model.TreeHole
import com.fsyy.listener.ui.detail.DetailActivity
import com.fsyy.listener.ui.main.CommentViewHolder
import com.fsyy.listener.ui.main.HeaderViewHolder
import com.fsyy.listener.ui.main.PostViewHolder
import com.fsyy.listener.ui.main.TreeHoleViewHolder
import com.fsyy.listener.utils.extension.displayDate
import com.fsyy.listener.utils.extension.startActivity
import java.lang.IllegalArgumentException

class HomeAdapter(private val dataList:List<Any>, val context:Context):RecyclerView.Adapter<TreeHoleViewHolder>() {
    companion object{
        const val HEADER=1004
    }
    override fun getItemViewType(position: Int): Int=when(val data=dataList[position]){
        is Header-> HEADER
        is TreeHole -> data.type
        else-> -1
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TreeHoleViewHolder=when(viewType){
        HEADER->{
            val view=LayoutInflater.from(context).inflate(R.layout.home_prefix_layout,parent,false)
            HeaderViewHolder(view)
        }
        TreeHole.POST->{
            val view=LayoutInflater.from(context).inflate(R.layout.post_item,parent,false)
            PostViewHolder(view).apply {
                itemView.setOnClickListener{
                    (context as Activity).startActivity<DetailActivity> {
                        putExtra("post",dataList[adapterPosition] as Post) }
                }
            }
        }
        TreeHole.COMMENT->{
            val view=LayoutInflater.from(context).inflate(R.layout.comment_item,parent,false)
            CommentViewHolder(view).apply {
                itemView.setOnClickListener{
                    (context as Activity).startActivity<DetailActivity> {
                        putExtra("post",(dataList[adapterPosition] as Comment).post)}
                }
            }
        }
        else-> throw IllegalArgumentException("不是我要的数据")
    }

    override fun onBindViewHolder(holder: TreeHoleViewHolder, position: Int) {
        val data=dataList[position]
        when(holder){
            is HeaderViewHolder->{
                val header=data as Header
                holder.headerText.text=header.headerText
                holder.headerNum.text=String.format(context.getString(R.string.home_header_num),header.count)
            }
            is PostViewHolder->{
                val post=data as Post
                Glide.with(context).load(post.photoUrl)
                    .apply(RequestOptions.bitmapTransform(CircleCrop()))
                    .into(holder.photo)
                holder.userName.text=post.userName
                holder.content.text=post.content
                holder.tag.text=post.tag
                holder.date.text=post.date.displayDate()
                if(post.isLike)
                    holder.likeImg.setImageResource(R.drawable.energy_selected)
                else
                    holder.likeImg.setImageResource(R.drawable.energy)
                holder.likeCount.text=post.likeCount.toString()
                holder.commentCount.text=post.commentCount.toString()
            }
            is CommentViewHolder->{
                val comment=data as Comment
                Glide.with(context).load(comment.photoUrl)
                    .apply(RequestOptions.bitmapTransform(CircleCrop()))
                    .into(holder.photo)
                holder.userName.text=comment.userName
                holder.date.text=comment.date.displayDate()
                holder.likeImg.visibility=View.INVISIBLE
                holder.likeCount.visibility=View.INVISIBLE
                holder.content.text=comment.content
                holder.innerText.visibility=View.VISIBLE
                if(!data.isInner)
                    holder.innerText.text=String.format(context.getString(R.string.home_comment_inner_text1,data.innerText))
                else
                    holder.innerText.text=String.format(context.getString(R.string.home_comment_inner_text2,data.innerText))
            }
        }
    }

    override fun getItemCount()=dataList.size
}