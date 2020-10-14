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

package com.fsyy.listener.ui.settings

import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.widget.Button
import android.widget.PopupWindow
import androidx.lifecycle.ViewModel
import cn.leancloud.AVFile
import cn.leancloud.AVObject
import com.fsyy.listener.R
import com.fsyy.listener.logic.network.Network
import com.fsyy.listener.ui.MyApplication
import java.io.File

class ProfileViewModel:ViewModel() {
    val popupView: View by lazy { LayoutInflater.from(MyApplication.context).inflate(R.layout.popup_photo_item,null)}
    val takePhoto: Button by lazy {  popupView.findViewById(R.id.profile_takePhoto)}
    val albums: Button by lazy {  popupView.findViewById(R.id.profile_albums) }
    val cancel: Button by lazy {  popupView.findViewById(R.id.profile_cancel)}
    var isModified=false
    lateinit var popupWindow:PopupWindow
    lateinit var outputImage:File
    lateinit var imageUri:Uri
    val popupView2: View by lazy { LayoutInflater.from(MyApplication.context).inflate(R.layout.popup_submit,null) }
    lateinit var popupWindow2:PopupWindow
    fun uploadPhoto(path:String,success:(avObject:AVObject)->Unit)=Network.uploadPhoto(path,success)
}