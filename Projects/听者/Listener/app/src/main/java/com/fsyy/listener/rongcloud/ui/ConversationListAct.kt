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

package com.fsyy.listener.rongcloud.ui

import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import cn.leancloud.AVUser
import com.fsyy.listener.R
import io.reactivex.Observer
import io.reactivex.disposables.Disposable
import io.rong.imkit.RongIM
import io.rong.imkit.fragment.ConversationListFragment
import io.rong.imlib.model.Conversation
import io.rong.imlib.model.UserInfo

class ConversationListAct : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_conversation_list)
        initParams()
    }
    private fun initParams(){
        val uri=Uri.parse("rong://"+
            applicationInfo.packageName).buildUpon()
            .appendPath("conversationlist")
            .appendQueryParameter(Conversation.ConversationType.PRIVATE.getName(), "false") //设置私聊会话是否聚合显示
            .appendQueryParameter(Conversation.ConversationType.SYSTEM.getName(), "false")//系统
            .build()
        val conversationListFrag=ConversationListFragment()
        conversationListFrag.uri=uri
        val manager=supportFragmentManager
        val transaction=manager.beginTransaction()
        transaction.replace(R.id.conversation_list_container, conversationListFrag)
        transaction.commit()
    }
}