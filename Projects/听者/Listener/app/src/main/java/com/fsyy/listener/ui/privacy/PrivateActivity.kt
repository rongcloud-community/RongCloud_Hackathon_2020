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

package com.fsyy.listener.ui.privacy

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.core.view.get
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.MarginPageTransformer
import androidx.viewpager2.widget.ViewPager2
import cn.leancloud.AVUser
import com.fsyy.listener.R
import com.fsyy.listener.utils.LogUtils
import com.fsyy.listener.utils.extension.toPrivatePost
import kotlinx.android.synthetic.main.activity_private.*

class PrivateActivity : AppCompatActivity() {
    companion object{
        const val POST="post"
    }
    private lateinit var viewModel: PrivateViewModel
    private lateinit var viewPager2: ViewPager2
    private lateinit var adapter: PrivateAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_private)
        viewModel=ViewModelProvider(this).get(PrivateViewModel::class.java)
        viewModel.getPrivatePosts(AVUser.currentUser().objectId)
        initParams()
        initObserver()
    }
    private fun initParams(){
        adapter=PrivateAdapter(this,viewModel.postList)
        viewPager2=findViewById(R.id.private_viewpager2)
        viewPager2.setPageTransformer(MarginPageTransformer(60))
        with(viewPager2[0] as RecyclerView){
            setPadding(60,0,60,0)
            clipToPadding=false
        }
        viewPager2.adapter=adapter
    }
    private fun initObserver(){
        viewModel.postsLiveData.observe(this){
            val posts=it.getOrNull()
            if(posts!=null){
                LogUtils.e("所有帖子的数量是${posts.size}")
                for(post in posts){
                    viewModel.postList.add(post.toPrivatePost())
                }
                adapter.notifyDataSetChanged()
                viewPager2.visibility=View.VISIBLE
                private_progressbar.visibility=View.GONE
                if(viewModel.postList.size==0){
                    private_no_data_text.visibility=View.VISIBLE
                }
            }
        }
    }
}