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

package com.fsyy.listener.ui.viewgroup

import android.app.Activity
import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.widget.RelativeLayout
import com.fsyy.listener.R
import com.fsyy.listener.utils.LogUtils
import com.fsyy.listener.utils.listener.ToolBarClickListener
import kotlinx.android.synthetic.main.toolbar_layout.view.*

class TitleLayout @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : RelativeLayout(context, attrs, defStyleAttr) {
    private var showLeft=true
    private var showRight=false
    private var title=""
    private var letterSpacing=0f
    init {
        LayoutInflater.from(context).inflate(R.layout.toolbar_layout,this)
        //todo 可以在属性里加入右侧按钮的图片
        context.theme.obtainStyledAttributes(attrs,R.styleable.TitleLayout,defStyleAttr,0).apply {
            title=getString(R.styleable.TitleLayout_titleText).toString()
            showLeft=getBoolean(R.styleable.TitleLayout_showLeft,true)
            showRight=getBoolean(R.styleable.TitleLayout_showRight,false)
            letterSpacing=getFloat(R.styleable.TitleLayout_android_letterSpacing,0f)
            recycle()
        }
        toolbar_title.text=title
        toolbar_title.letterSpacing=letterSpacing

        if(showLeft){
            toolbar_left.visibility=View.VISIBLE
            toolbar_left.setOnClickListener {view->
                if(leftListener==null){
                    (context as Activity).finish()
                }else{
                    leftListener?.let { it(view) }
                }
            }
        }else{
            toolbar_left.visibility=View.GONE
        }
        if(showRight){
            toolbar_right.visibility=View.VISIBLE
            toolbar_right.setOnClickListener {
                if(!::rightListener.isInitialized){
                    LogUtils.e("没有初始化点击事件")
                }else{
                    rightListener(it)
                }
            }
        }else{
            toolbar_right.visibility=View.GONE
        }

    }
    private var leftListener: ToolBarClickListener?=null
    private lateinit var rightListener: ToolBarClickListener
    fun setLeftListener(listener: ToolBarClickListener){
        this.leftListener=listener
    }
    fun setRightListener(listener: ToolBarClickListener){
        this.rightListener=listener
    }
    fun setTitle(title:String){
        toolbar_title.text=title
    }
}