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

import android.app.Activity
import android.content.Intent

inline fun <reified T> Activity.startActivity(){
    val intent=Intent(this,T::class.java)
    startActivity(intent)
}
inline fun <reified T> Activity.startActivity(block:Intent.()->Unit){
    val intent=Intent(this,T::class.java)
    intent.block()
    startActivity(intent)
}
inline fun <reified T> Activity.startActivityForResult(requestCode:Int,noinline block: (Intent.() -> Unit)?=null){
    val intent=Intent(this,T::class.java)
    block?.let { intent.it() }
    startActivityForResult(intent,requestCode)
}