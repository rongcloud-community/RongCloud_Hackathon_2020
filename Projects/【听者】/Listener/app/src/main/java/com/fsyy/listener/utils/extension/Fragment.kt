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

import android.content.Intent
import androidx.fragment.app.Fragment

inline fun <reified T> Fragment.startActivityForResult(requestCode:Int,noinline block: (Intent.() -> Unit)?=null){
    val intent= Intent(activity,T::class.java)
    block?.let { intent.it() }
    startActivityForResult(intent,requestCode)
}