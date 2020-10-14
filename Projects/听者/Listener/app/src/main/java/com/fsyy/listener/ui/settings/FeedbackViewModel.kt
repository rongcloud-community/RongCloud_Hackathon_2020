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
import android.widget.PopupWindow
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import com.fsyy.listener.R
import com.fsyy.listener.logic.Repository
import com.fsyy.listener.ui.MyApplication

class FeedbackViewModel :ViewModel(){
    companion object{
        const val IMG1=10
        const val IMG2=20
        const val IMG3=30
    }
    var clickedImgId= IMG1
    var imgUri1:Uri?=null
    var imgUri2:Uri?=null
    var imgUri3:Uri?=null
    val popupView: View by lazy { LayoutInflater.from(MyApplication.context).inflate(R.layout.popup_submit,null) }
    lateinit var popupWindow: PopupWindow

    private val pathsLiveData=MutableLiveData<ArrayList<String>>()
    val imgUrlLiveData=Transformations.switchMap(pathsLiveData){
        Repository.uploadImages(it)
    }
    fun uploadImages(path0:String?,path1:String?,path2:String?){
        val paths=ArrayList<String>()
        path0?.let { paths.add(path0) }
        path1?.let { paths.add(path1) }
        path2?.let { paths.add(path2) }
        pathsLiveData.value=paths
    }
}