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

import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Gravity
import android.view.MenuItem
import android.view.View
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.observe
import androidx.recyclerview.widget.LinearLayoutManager
import cn.leancloud.AVObject
import cn.leancloud.AVUser
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.CircleCrop
import com.bumptech.glide.request.RequestOptions
import com.fsyy.listener.R
import com.fsyy.listener.logic.model.*
import com.fsyy.listener.utils.LogUtils
import com.fsyy.listener.utils.extension.toComment
import com.fsyy.listener.utils.extension.toPost
import com.google.android.material.appbar.AppBarLayout
import io.rong.imkit.RongIM
import io.rong.imlib.model.Conversation
import kotlinx.android.synthetic.main.activity_home_page.*
import kotlinx.android.synthetic.main.home_header_data.*

class HomePageActivity : AppCompatActivity() {
    private lateinit var adapter: HomeAdapter
    private lateinit var viewModel: HomePageViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_page)
        initParams()
        setAdapter()
        initGetData()
        initListener()
    }
    private fun initParams(){
        LogUtils.e("collapsingToolbarLayout的高度是${home_collapsing_layout.height},toolbar的高度是${home_toolbar.height}")
        setSupportActionBar(home_toolbar)
        supportActionBar?.let {
            it.setDisplayHomeAsUpEnabled(true)
            it.setDisplayShowTitleEnabled(false)
        }
        viewModel=ViewModelProvider(this).get(HomePageViewModel::class.java)
    }
    private fun initGetData(){
        //todo 显示进度条
        viewModel.userId=intent.getStringExtra("userId")!!
        viewModel.isCurrentUser = viewModel.userId==AVUser.currentUser().objectId
        viewModel.getData(viewModel.userId)
    }
    private fun initPrivateMsgListener(){
        if(viewModel.isCurrentUser){
            home_private_msg.visibility=View.GONE
        }else{
            home_private_msg.visibility=View.VISIBLE
            home_private_msg.setOnClickListener {
                //todo 跳转到私信界面
                RongIM.getInstance().startConversation(this,Conversation.ConversationType.PRIVATE,viewModel.userId,viewModel.userName)
            }
        }
    }
    private fun initAppBarListener(){
        home_appbar_layout.addOnOffsetChangedListener(object : AppBarStateChangeListener() {
            override fun onStateChanged(appBarLayout: AppBarLayout, state: Int) {
                when(state){
                    STATE_EXPANDED->{
                        home_data_layout.visibility=View.VISIBLE
                        home_collapsing_layout.isTitleEnabled=false
                    }
                    STATE_INTERMEDIATE-> {
                        home_data_layout.visibility=View.VISIBLE
                        home_collapsing_layout.isTitleEnabled = false
                    }
                    STATE_COLLAPSED->{
                        home_data_layout.visibility=View.INVISIBLE
                        home_collapsing_layout.isTitleEnabled=true
                    }
                }
            }
            override fun onPercentChanged(percent: Float) {
                LogUtils.e("透明度是alpha=${1-percent}")
                home_data_layout.alpha=(1-percent)*0.9f
            }
        })
    }
    private fun initObserver(){
        viewModel.allDataLiveData.observe(this){
            val result=it.getOrNull()
            if(result!=null){
                //todo 更新头部数据，更新recyclerview数据
                setHeaderData(result)
                assembleDataList(result)
            }
        }
        viewModel.likesLiveData.observe(this){
            val result=it.getOrNull()
            if(result!=null){
                for(like in result){
                    val postObjectId=like.getAVObject<AVObject>("post").objectId
                    for(data in viewModel.dataList){
                        if(data is Post &&postObjectId==data.objectId){
                            data.isLike=true
                            data.likeObjectId=like.objectId
                        }else if(data is Comment && postObjectId==data.post?.objectId){
                            data.post?.isLike=true
                            data.post?.likeObjectId=like.objectId
                        }
                    }
                }
                adapter.notifyDataSetChanged()
                home_progressbar.visibility=View.GONE
            }
        }
        viewModel.commentContentsLiveData.observe(this){
            val result=it.getOrNull()
            if(result!=null){
                for(comment in result){
                    val postObjectId=comment.getAVObject<AVObject>("post").objectId
                    for(data in viewModel.dataList){
                        if(data is Comment && data.isInner && data.post?.objectId==postObjectId){
                            data.innerText=comment.getString("content")
                        }
                    }
                }
                adapter.notifyDataSetChanged()
            }
        }
    }
    private fun initListener() {
        initPrivateMsgListener()
        initAppBarListener()
        initObserver()
    }
    private fun setHeaderData(result:AllHomeData){
        val user=result.user
        Glide.with(this).load(user.getString("photoUrl"))
            .apply(RequestOptions.bitmapTransform(CircleCrop()))
            .into(home_user_photo)
        home_user_name.text=user.username
        viewModel.userName=user.username
        home_send_energy_text.text=user.getInt("sendEnergy").toString()
        home_get_energy_text.text=user.getInt("receiveEnergy").toString()
        home_get_like_text.text=user.getInt("receiveLikes").toString()
        home_collapsing_layout.title=user.username
    }
    private fun assembleDataList(result:AllHomeData){
        val postCount=result.postCount
        val commentCount=result.commentCount
        val postAVList=result.postList
        val commentAVList=result.commentList
        if(postCount==0&&commentCount==0){
            if(viewModel.isCurrentUser){
                home_no_data_text.text=getString(R.string.private_no_data)
            }
            home_no_data_text.visibility=View.VISIBLE
            home_progressbar.visibility=View.GONE
            return
        }
        if(postCount!=0){
            viewModel.postList.addAll(postAVList)
            val postHeader=if(viewModel.isCurrentUser)
                Header(getString(R.string.home_post_header_my),postCount)
            else
                Header(getString(R.string.home_post_header_his),postCount)
            viewModel.dataList.add(postHeader)
            for(postAVObject in postAVList){
                viewModel.dataList.add(postAVObject.toPost())
            }
            //todo 继续根据数据查询当前用户是否赞过
        }
        if(commentCount!=0){
            val commentHeader=if(viewModel.isCurrentUser)
                Header(getString(R.string.home_comment_header_my),commentCount)
            else
                Header(getString(R.string.home_comment_header_his),commentCount)
            viewModel.dataList.add(commentHeader)
            for(commentAVObject in commentAVList){
                val postAVObject=commentAVObject.getAVObject<AVObject>("post")
                viewModel.postList.add(postAVObject)
                val comment=commentAVObject.toComment()
                comment.post=postAVObject.toPost()
                if(!comment.isInner){
                    comment.innerText= comment.post!!.content
                }else{
                    //todo 根据floor查询Comment表，获取comment
                    viewModel.innerParams.add(InnerCommentParams(comment.post!!.objectId,comment.floor))
                }
                viewModel.dataList.add(comment)
            }
        }
        viewModel.getPostLikes(viewModel.postList)
        if(viewModel.innerParams.size!=0)
            viewModel.getCommentContents(viewModel.innerParams)
    }
    private fun setAdapter(){
        adapter= HomeAdapter(viewModel.dataList,this)
        home_recyclerview.layoutManager=LinearLayoutManager(this)
        home_recyclerview.adapter=adapter
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when(item.itemId){
            android.R.id.home->{
                finish()
                return true
            }
        }
        return super.onOptionsItemSelected(item)
    }
}