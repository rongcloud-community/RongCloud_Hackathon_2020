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

package com.fsyy.listener.utils

import android.view.Gravity
import android.widget.Toast
import com.fsyy.listener.ui.MyApplication
import com.fsyy.listener.ui.viewgroup.ToastLayout

object ToastUtil {
    fun showCenterToast(imgId:Int,content:String){
        val toast=Toast(MyApplication.context)
        val toastLayout=ToastLayout(MyApplication.context,imgId,content)
        toast.view=toastLayout
        toast.setGravity(Gravity.CENTER,0,0)
        toast.show()
    }
}