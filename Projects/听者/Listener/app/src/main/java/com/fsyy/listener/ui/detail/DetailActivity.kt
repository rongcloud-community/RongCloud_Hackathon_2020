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

package com.fsyy.listener.ui.detail

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.view.ViewConfiguration
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import cn.leancloud.AVObject
import cn.leancloud.AVUser
import com.fsyy.listener.R
import com.fsyy.listener.logic.model.Comment
import com.fsyy.listener.logic.model.InnerComment
import com.fsyy.listener.logic.model.Post
import com.fsyy.listener.logic.model.TreeHole
import com.fsyy.listener.ui.MyApplication
import com.fsyy.listener.ui.homepage.HomePageActivity
import com.fsyy.listener.utils.LogUtils
import com.fsyy.listener.utils.PopupUtil
import com.fsyy.listener.utils.SoftKeyboardUtils
import com.fsyy.listener.utils.ToastUtil
import com.fsyy.listener.utils.extension.startActivity
import com.fsyy.listener.utils.extension.toComment
import com.fsyy.listener.utils.extension.toInnerComment
import kotlinx.android.synthetic.main.activity_detail.*
import kotlin.collections.ArrayList

class DetailActivity : AppCompatActivity(),View.OnClickListener {
    private lateinit var adapter: DetailAdapter
    private val viewModel by lazy { ViewModelProvider(this).get(DetailViewModel::class.java) }
    private val limit=10


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)
        LogUtils.e("Detail：intent.get()是${intent.getSerializableExtra("post") as Post}")
        viewModel.post=intent.getSerializableExtra("post") as Post
        viewModel.toUserNameLiveData.value="楼主"
        LogUtils.e(viewModel.post.toString())
        if (viewModel.post.commentCount>0){
            loadComment()
        }
        initToolbar()
        initObserver()
        initAdapter()
        initRecyclerView()
        initListener()
        refreshData()
    }
    private fun initToolbar(){
        detail_header.setRightListener {
            viewModel.popupWindow=PopupUtil.showPopupWindow(viewModel.popupView,window.decorView)
            viewModel.report.setOnClickListener(this)
            viewModel.share2WeChat.setOnClickListener(this)
            viewModel.cancel.setOnClickListener(this)
        }
    }

    override fun onClick(v: View?) {
        when(v?.id){
            viewModel.report.id-> {
                viewModel.popupWindow.dismiss()
                ToastUtil.showCenterToast(R.drawable.success,getString(R.string.toast_report_success))
                saveReport()
            }
            viewModel.share2WeChat.id-> {
                viewModel.popupWindow.dismiss()
                ToastUtil.showCenterToast(R.drawable.failure,getString(R.string.toast_share_wechat))
            }
            viewModel.cancel.id-> viewModel.popupWindow.dismiss()
        }
    }
    private fun saveReport(){
        val avObject=AVObject("Report")
        avObject.put("author",AVUser.currentUser())
        avObject.put("post",AVObject.createWithoutData("Post",viewModel.post.objectId))
        avObject.saveEventually()
    }

    private fun initObserver(){
        viewModel.allCommentsLiveData.observe(this){
            val allComments=it.getOrNull()
            if(allComments!=null){
                val commentAVList=allComments.commentList
                val innerCommentAVList=allComments.innerCommentList
                for(avObject in commentAVList){
                    AVUser.createWithoutData("_User","objectId")
                    viewModel.dataList.add(avObject.toComment())
                }
                LogUtils.e("执行loadLikes方法前，datalist.size是${viewModel.dataList.size}")
                viewModel.loadLikes(commentAVList)
                val innerCommentList=ArrayList<InnerComment>()
                for(avObject in innerCommentAVList){
                    innerCommentList.add(avObject.toInnerComment())
                }
                for(innerComment in innerCommentList){
                    val floor=innerComment.floor
                    val range=1 until viewModel.dataList.size
                    for(i in range){
                        val comment=viewModel.dataList[i] as Comment
                        if(comment.floor==floor){
                            comment.innerCommentList.add(innerComment)
                            break
                        }
                    }
                }

            }
        }
        viewModel.likesLiveData.observe(this){
            LogUtils.e("已经获得评论的点赞情况")
            val likes=it.getOrNull()
            if(likes!=null){
                //根据objectId，查询对应的comment，就将它的isLike设置为true

                val startPos=if(viewModel.loadCountLiveData.value==0){
                    0
                }else{
                    limit*viewModel.loadCountLiveData.value!!+1
                }
                val range= startPos until viewModel.dataList.size
                LogUtils.e("当前数据的大小是${viewModel.dataList.size}")
                LogUtils.e("startPos是$startPos,datalist.size-startPost是${viewModel.dataList.size-startPos}")
                for(like in likes){
                    val commentId=like.getAVObject<AVObject>("comment").objectId
                    for(i in range){
                        if(commentId==viewModel.dataList[i].objectId){
                            viewModel.dataList[i].isLike=true
                            viewModel.dataList[i].likeObjectId=like.objectId
                            break
                        }
                    }
                }
//                adapter.notifyItemRangeChanged(startPos,viewModel.dataList.size-startPos)
                adapter.notifyDataSetChanged()
            }
            detail_swipe_refresh.isRefreshing=false
        }

        viewModel.newPostLiveData.observe(this){ result ->
            val newPost=result.getOrNull()
            if(newPost!=null){
                val commentCount=newPost.getInt("commentCount")
                val floor=commentCount+1
               viewModel.publishComment(mapOf("fromAuthor" to AVUser.currentUser(),
                   "content" to detail_edit.text.toString(),"post" to AVObject.createWithoutData("Post",viewModel.post.objectId),
                   "floor" to floor)){comment->
                   //todo 测试如果不是空的AVObject，而是带有数据的AVObject，例如likeCount=0的，然后increment之后save，这期间被人点赞了，save之后，那么服务器的likeCount是多少
                   val emptyPost=AVObject.createWithoutData("Post",viewModel.post.objectId)
                   emptyPost.increment("commentCount")
                   emptyPost.saveEventually()
                   //todo 监测saveInBackground之后的数据包括author的username吗
                   LogUtils.e("我要将发布的评论转化为本地的Comment了，会不会出错，因为没include author")
                   viewModel.dataList.add(comment.toComment())
                   adapter.notifyDataSetChanged()
                   clearUI()
                   viewModel.popupWindow2?.dismiss()
                   ToastUtil.showCenterToast(R.drawable.success, getString(R.string.toast_comment_success))
               }
            }
        }

        viewModel.toUserNameLiveData.observe(this){
            LogUtils.e("Observe了，value是${viewModel.toUserNameLiveData.value}")
            detail_edit.hint=String.format(getString(R.string.detail_edit_hint),viewModel.toUserNameLiveData.value)
        }
        viewModel.newCommentLiveData.observe(this){ it ->
            val newComment=it.getOrNull()
            if(newComment!=null){
                val commentCount=newComment.getInt("commentCount")
                val requestedInnerFloor=commentCount+1
                val floor=viewModel.floorLiveData.value!!
                val innerFloor=viewModel.innerFloorLiveData.value!!
                LogUtils.e("我要测试！！！！！当前的innerFloor是$innerFloor")
                val comment=viewModel.dataList[floor] as Comment
                val toAuthor=if(innerFloor==-1){
                    AVObject.createWithoutData("_User",comment.userId)
                }else{
                    AVObject.createWithoutData("_User",comment.innerCommentList[innerFloor].userId)
                }
                val content=detail_edit.text.toString()
                viewModel.publishComment(mapOf("fromAuthor" to AVUser.currentUser(), "toAuthor" to toAuthor,
                "content" to content,"post" to AVObject.createWithoutData("Post",viewModel.post.objectId),
                "floor" to floor,"innerFloor" to requestedInnerFloor,"isInner" to true)){innerComment->
                    //todo
                    val commentAV=AVObject.createWithoutData("Comment",comment.objectId)
                    commentAV.increment("commentCount")
                    commentAV.saveEventually()
                    comment.commentCount++
                    //TODO 保存好之后，查询这个评论的所有innerComment，展示出来

                    viewModel.loadAllInnerComments(viewModel.post.objectId,floor)
                }
            }
        }
        viewModel.allInnerComments.observe(this){
            val innerComments=it.getOrNull()
            if(innerComments!=null){
                //todo list更新，对应floor的adapter更新
                val floor=viewModel.floorLiveData.value!!
                val comment:Comment=viewModel.dataList[floor] as Comment
                comment.innerCommentList.clear()
                for(innerCommentAV in innerComments){
                    comment.innerCommentList.add(innerCommentAV.toInnerComment())
                }
                clearUI()
                viewModel.popupWindow2?.dismiss()
                adapter.notifyItemChanged(floor)
            }
        }
    }
    private fun loadComment(){
        LogUtils.e("loadComment()中的loadCount是0")
        viewModel.loadComment(limit,viewModel.post.objectId,0)
    }
    private fun loadMoreComment(){
        LogUtils.e("加载更多评论")
        viewModel.plusLoadCount()
        viewModel.loadComment(limit,viewModel.post.objectId,viewModel.loadCountLiveData.value!!)
    }
    private fun initAdapter(){
        viewModel.dataList.add(viewModel.post)
        adapter= DetailAdapter(viewModel.dataList,this)
        adapter.setOnPostLikeClickListener { _, _ ->
            updateUI(0,TreeHole.POST)
        }
        adapter.setOnCommentLikeClickListener { _, pos ->
            updateUI(pos,TreeHole.COMMENT)
        }
        adapter.setOnItemClickListener { view, pos ->
            LogUtils.e("pos是$pos")
            if(pos==0){
                viewModel.toUserNameLiveData.value="楼主"
                viewModel.floorLiveData.value=0
                viewModel.innerFloorLiveData.value=-1
            }else{
                viewModel.floorLiveData.value=pos
                viewModel.innerFloorLiveData.value=-1
                val comment=viewModel.dataList[pos] as Comment
                viewModel.toUserNameLiveData.value=comment.userName
            }
        }
        adapter.setOnPhotoClickListener { _, pos ->
            val userId=viewModel.dataList[pos].userId
            startActivity<HomePageActivity> { putExtra("userId",userId) }
        }
        adapter.setOnInnerCommentClickListener { pos, index ->
            //todo 获取username，更改editText的hint，
            LogUtils.e("pos是$pos,index是$index")
            viewModel.floorLiveData.value=pos
            viewModel.innerFloorLiveData.value=index
            val comment=viewModel.dataList[pos] as Comment
            viewModel.toUserNameLiveData.value=comment.innerCommentList[index].userName
        }
        adapter.setOnInnerCommentLoadMoreListener {view,floor->
            //todo 获取这个floor的所有innerComment
            viewModel.floorLiveData.value=floor
            viewModel.loadAllInnerComments(viewModel.post.objectId,floor)

        }
    }
    private fun updateUI(pos:Int,type:Int){
        val isLike=viewModel.dataList[pos].isLike
        if(isLike){
            viewModel.dataList[pos].isLike=false
            viewModel.dataList[pos].likeCount--
            AVObject.createWithoutData("Like",viewModel.dataList[pos].likeObjectId).apply {
                deleteEventually()
            }
            val treeHoleAV:AVObject = if(type==TreeHole.POST)
                AVObject.createWithoutData("Post",viewModel.dataList[pos].objectId)
            else
                AVObject.createWithoutData("Comment",viewModel.dataList[pos].objectId)
            treeHoleAV.decrement("likeCount")
            treeHoleAV.saveEventually()
        }else{
            viewModel.dataList[pos].isLike=true
            viewModel.dataList[pos].likeCount++
            if(type==TreeHole.COMMENT){
                val comment=AVObject.createWithoutData("Comment",viewModel.dataList[pos].objectId)
                viewModel.saveLike(mapOf("user" to AVUser.currentUser(),"comment" to comment)){
                    viewModel.dataList[pos].likeObjectId=it.objectId
                    comment.increment("likeCount")
                    comment.saveEventually()
                }
            }else{
                val post=AVObject.createWithoutData("Post",viewModel.dataList[pos].objectId)
                viewModel.saveLike(mapOf("user" to AVUser.currentUser(),"post" to post)){
                    viewModel.dataList[pos].likeObjectId=it.objectId
                    post.increment("likeCount")
                    post.saveEventually()
                }
            }
        }
        adapter.notifyItemChanged(pos)
    }
    private fun initRecyclerView(){
        detail_recyclerview.addOnScrollListener(object :RecyclerView.OnScrollListener(){
            var lastVisiblePos=0
            override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                LogUtils.e("滑动状态更改,newState=$newState")
                if(newState==RecyclerView.SCROLL_STATE_IDLE&&lastVisiblePos+1==viewModel.dataList.size
                    &&viewModel.dataList.size==(viewModel.loadCountLiveData.value!!+1)*limit +1){
                    LogUtils.e("执行上拉加载更多")
                    loadMoreComment()
                }
            }

            override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
                LogUtils.e("dy=$dy,touchslop=${ViewConfiguration.get(this@DetailActivity).scaledTouchSlop}")
                val layoutManager=recyclerView.layoutManager as LinearLayoutManager
                lastVisiblePos=layoutManager.findLastVisibleItemPosition()
            }
        })
        detail_recyclerview.layoutManager=LinearLayoutManager(this)
        detail_recyclerview.adapter=adapter
    }
    private fun initListener(){
        detail_swipe_refresh.setOnRefreshListener {
            LogUtils.e("下拉刷新了")
            refreshData()
        }
        detail_submit.setOnClickListener {
            //todo 提交的时候，获取最新的comment
            val content=detail_edit.text.toString().trim()
            if(content!=""){
                //todo 显示进度条
                viewModel.popupWindow2=PopupUtil.showPopupWindow(viewModel.popupView2,window.decorView,false)
                if(viewModel.floorLiveData.value==0) {
                    viewModel.fetchNewPost(viewModel.post.objectId)
                }else {
                    val comment=viewModel.dataList[viewModel.floorLiveData.value!!]
                    viewModel.fetchNewComment(comment.objectId)
                }
            }else{
                ToastUtil.showCenterToast(R.drawable.info,getString(R.string.edit_content_toast))
            }
        }
    }
    private fun refreshData(){
        //todo 这里应该是刷新整个页面并且替换当前intent获得的AVObject

        viewModel.dataList.clear()
        viewModel.dataList.add(viewModel.post)
        viewModel.clearLoadCount()
        LogUtils.e("执行refreshData()")
        loadComment()
        detail_swipe_refresh.isRefreshing=true
    }
    private fun clearUI(){
        SoftKeyboardUtils.hideKeyboard2(this,detail_edit)
        detail_edit.setText("")
        detail_edit.clearFocus()
    }
}