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

package com.fsyy.listener.utils.extension

import com.fsyy.listener.R
import com.fsyy.listener.ui.MyApplication
import com.fsyy.listener.utils.LogUtils
import java.text.SimpleDateFormat
import java.util.*
const val ONE_MINUTE:Long=60
const val ONE_HOUR=60* ONE_MINUTE
const val ONE_DAY=24* ONE_HOUR
const val ONE_MONTH=30* ONE_DAY
const val ONE_YEAR=365* ONE_DAY
fun Date.displayDate():String{
    val now=Date()
    val interval=(now.time-time)/1000
    LogUtils.e("间隔是", interval.toString())
    var displayDate=""
    if(interval<=3* ONE_MINUTE){
        displayDate=MyApplication.context.resources.getString(R.string.date_just_now)
    }else if(interval<= ONE_HOUR){
        val number=interval/ ONE_MINUTE
        displayDate=String.format(MyApplication.context.resources.getString(R.string.date_minutes),number)
    }else if(interval<= ONE_DAY){
        val number=interval/ ONE_HOUR
        displayDate=String.format(MyApplication.context.resources.getString(R.string.date_hours),number)
    }else if(interval<= ONE_MONTH){
//        val number=interval/ ONE_DAY
//        displayDate=String.format(MyApplication.context.resources.getString(R.string.date_days),number)
        val simpleDateFormat=SimpleDateFormat("MM-dd",Locale.CHINA)
        displayDate=simpleDateFormat.format(this)
    }else if(interval<= ONE_YEAR){
        val simpleDateFormat=SimpleDateFormat("MM-dd",Locale.CHINA)
        displayDate=simpleDateFormat.format(this)
    }else{
        val simpleDateFormat=SimpleDateFormat("yyyy-MM", Locale.CHINA)
        displayDate=simpleDateFormat.format(this)
    }
    return displayDate
}
fun Date.displayYearMonthDate():String{
    val nowCal=Calendar.getInstance(Locale.CHINA)
    val nowYear=nowCal.get(Calendar.YEAR)
    LogUtils.e("当前年份是$nowYear")
    nowCal.time=this
    val thisYear=nowCal.get(Calendar.YEAR)
    return if(nowYear==thisYear){
        SimpleDateFormat("MM月dd日", Locale.CHINA).format(this)
    }else{
        SimpleDateFormat("yyyy年MM月dd日", Locale.CHINA).format(this)
    }
}