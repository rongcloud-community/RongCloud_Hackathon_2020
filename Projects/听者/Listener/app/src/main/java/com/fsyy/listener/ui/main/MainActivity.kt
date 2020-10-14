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

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.fragment.app.FragmentTransaction
import cn.leancloud.AVUser
import com.fsyy.listener.R
import com.fsyy.listener.rongcloud.network.HttpUtil
import com.fsyy.listener.rongcloud.network.Network
import com.fsyy.listener.rongcloud.network.TokenResponse
import com.fsyy.listener.ui.MyApplication
import com.fsyy.listener.utils.LogUtils
import com.google.gson.Gson
import com.google.gson.JsonObject
import io.rong.imkit.RongIM
import io.rong.imlib.model.Conversation
import kotlinx.android.synthetic.main.activity_main.*
import okhttp3.Call
import okhttp3.Callback
import okhttp3.OkHttp
import okhttp3.Response
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.HashMap

class MainActivity : AppCompatActivity(),View.OnClickListener{
    private var encounterFragment: EncounterFragment?=null
    private var lonelyFragment: LonelyFragment?=null
    private var personalFragment: PersonalFragment?=null
    private val manager=supportFragmentManager
    var token:String?=null
    companion object{
        const val WOOD=0
        const val LEAF=1
        const val TREE=2
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        getToken()
        initListener()
        setTab(LEAF)
        test()
    }

    /**
     * 这里是测试一些基本属性
     */
    private fun test(){
        val resourceId=resources.getIdentifier("status_bar_height","dimen","android")
        LogUtils.e("density: ${resources.displayMetrics.density}")
        LogUtils.e("status高度: ${resources.getDimensionPixelSize(resourceId)}")

        val date=Date()
        val simpleDate=SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.CHINA)
        LogUtils.e("日期:",simpleDate.format(date))
    }
    private fun initListener(){
        wood.setOnClickListener(this)
        leaf.setOnClickListener(this)
        tree.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when(v?.id){
            wood.id->setTab(WOOD)
            leaf.id->setTab(LEAF)
            tree.id->setTab(TREE)
        }
    }
    private fun clearSelection(){
        wood.setImageResource(R.drawable.wood)
        leaf.setImageResource(R.drawable.leaf)
        tree.setImageResource(R.drawable.tree)
    }
    private fun hideFragments(transaction:FragmentTransaction){
        encounterFragment?.let { transaction.hide(it) }
        lonelyFragment?.let { transaction.hide(it) }
        personalFragment?.let { transaction.hide(it) }
    }
    private fun setTab(index:Int){
        val transaction=manager.beginTransaction()
        clearSelection()
        hideFragments(transaction)
        when(index){
            WOOD->{
                wood.setImageResource(R.drawable.wood_selected)
                if(encounterFragment==null){
                    encounterFragment= EncounterFragment()
                    transaction.add(R.id.contentLayout,encounterFragment!!)
                }else{
                    transaction.show(encounterFragment!!)
                }
            }
            LEAF->{
                leaf.setImageResource(R.drawable.leaf_selected)
                if(lonelyFragment==null){
                    lonelyFragment= LonelyFragment()
                    transaction.add(R.id.contentLayout,lonelyFragment!!)
                }else{
                    transaction.show(lonelyFragment!!)
                }
            }
            TREE->{
                tree.setImageResource(R.drawable.tree_selected)
                if(personalFragment==null){
                    personalFragment= PersonalFragment()
                    transaction.add(R.id.contentLayout,personalFragment!!)
                }else{
                    transaction.show(personalFragment!!)
                }
            }
        }
        transaction.commit()
    }
    private fun getToken(){
        val prefs=getSharedPreferences("token",Context.MODE_PRIVATE)
        token= prefs.getString("token",null)
        LogUtils.e("用户的token是$token")
        if(token!=null){
            Network.connectIM(token!!)
            return
        }
        Network.getToken()


    }
}