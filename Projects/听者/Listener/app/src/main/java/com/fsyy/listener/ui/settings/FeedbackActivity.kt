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

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.core.app.ActivityCompat
import androidx.lifecycle.ViewModelProvider
import cn.leancloud.AVObject
import cn.leancloud.AVUser
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CircleCrop
import com.bumptech.glide.request.RequestOptions
import com.fsyy.listener.R
import com.fsyy.listener.utils.LogUtils
import com.fsyy.listener.utils.PopupUtil
import com.fsyy.listener.utils.ToastUtil
import com.fsyy.listener.utils.Uri2PathUtil
import com.fsyy.listener.utils.extension.showToast
import kotlinx.android.synthetic.main.activity_feedback.*

class FeedbackActivity : AppCompatActivity(),View.OnClickListener{
    companion object{
        const val FROM_ALBUM=1
    }
    private lateinit var viewModel:FeedbackViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_feedback)
        viewModel=ViewModelProvider(this).get(FeedbackViewModel::class.java)
        initViews()
        initObserver()
    }
    private fun initViews(){
        //todo 获得屏幕的宽度，得到图片的宽度，改变图片的高度
        feedback_img1.setOnClickListener(this)
        feedback_img2.setOnClickListener(this)
        feedback_img3.setOnClickListener(this)
        feedback_submit.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when(v?.id){
            feedback_img1.id->{
                viewModel.clickedImgId=FeedbackViewModel.IMG1
                requestPermission()
            }
            feedback_img2.id->{
                viewModel.clickedImgId=FeedbackViewModel.IMG2
                requestPermission()
            }
            feedback_img3.id->{
                viewModel.clickedImgId=FeedbackViewModel.IMG3
                requestPermission()
            }
            feedback_submit.id->submit()
        }
    }
    private fun initObserver(){
        viewModel.imgUrlLiveData.observe(this){
            val imgUrls=it.getOrNull()
            if(imgUrls!=null){
                for(url in imgUrls)
                    LogUtils.e(url)
                //todo 将图片写入feedback表
                AVObject("Advise").apply {
                    put("user",AVUser.currentUser())
                    put("content",feedback_edit.text.toString().trim())
                    put("imgUrls",imgUrls)
                    saveEventually()
                }
                clearUI()
                viewModel.popupWindow.dismiss()
                ToastUtil.showCenterToast(R.drawable.success,getString(R.string.toast_comment_success))
            }else{
                viewModel.popupWindow.dismiss()
            }
        }
    }
    private fun clearUI(){
        feedback_edit.setText("")
        //todo 将图片设置为+图片
        feedback_img1.setImageResource(R.drawable.add)
        feedback_img2.visibility=View.INVISIBLE
        feedback_img3.visibility=View.INVISIBLE
    }
    private fun requestPermission(){
        if(ActivityCompat.checkSelfPermission(this,Manifest.permission.READ_EXTERNAL_STORAGE)
            !=PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), FROM_ALBUM)
        }else{
            fromAlbum()
        }
    }
    private fun fromAlbum(){
        val intent=Intent(Intent.ACTION_PICK)
        intent.type = "image/*"
        startActivityForResult(intent, FROM_ALBUM)
    }
    private fun submit(){
        val content=feedback_edit.text.toString().trim()
        if(content.isEmpty()) {
            ToastUtil.showCenterToast(R.drawable.info,getString(R.string.edit_content_toast))
        }else{
            viewModel.popupWindow=PopupUtil.showPopupWindow(viewModel.popupView,window.decorView,false)
            //todo 上传三张图片
            val path0=viewModel.imgUri1?.let { Uri2PathUtil.getImageRealPathFromContentUri(it) }
            val path1=viewModel.imgUri2?.let { Uri2PathUtil.getImageRealPathFromContentUri(it) }
            val path2=viewModel.imgUri3?.let { Uri2PathUtil.getImageRealPathFromContentUri(it) }
            viewModel.uploadImages(path0,path1,path2)
        }

    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if(requestCode== FROM_ALBUM){
            if(grantResults.isNotEmpty()&&grantResults[0]==PackageManager.PERMISSION_GRANTED){
                fromAlbum()
            }else{
                ToastUtil.showCenterToast(R.drawable.warn,getString(R.string.write_external_denied))
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        when(requestCode){
            FROM_ALBUM->{
                if(resultCode== RESULT_OK&&data!=null){
                    data.data?.let {
                        loadImage(it)
                    }
                }
            }
        }
    }
    private fun loadImage(uri:Uri) {
        when (viewModel.clickedImgId) {
            FeedbackViewModel.IMG1 -> {
                viewModel.imgUri1=uri
                feedback_img2.visibility=View.VISIBLE
                Glide.with(this).load(uri)
                    .into(feedback_img1)
            }
            FeedbackViewModel.IMG2 -> {
                viewModel.imgUri2=uri
                feedback_img3.visibility=View.VISIBLE
                Glide.with(this).load(uri)
                    .into(feedback_img2)
            }
            FeedbackViewModel.IMG3 -> {
                viewModel.imgUri3=uri
                Glide.with(this).load(uri)
                    .into(feedback_img3)
            }
        }
    }
}