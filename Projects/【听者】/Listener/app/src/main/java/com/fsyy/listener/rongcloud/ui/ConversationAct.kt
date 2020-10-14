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

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.fsyy.listener.R
import io.rong.imkit.fragment.ConversationFragment
import kotlinx.android.synthetic.main.activity_conversation.*

class ConversationAct : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_conversation)

        val uri=intent.data
        val path=uri?.pathSegments?.get(0)
        val title=uri?.getQueryParameter("title").toString()
        conversation_header.setTitle(title)

        val conversationFragment=ConversationFragment()
        val manager=supportFragmentManager
        val transaction=manager.beginTransaction()
        transaction.replace(R.id.conversation_container,conversationFragment)
        transaction.commit()
    }
}