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

package com.fsyy.listener.ui.login

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.PopupWindow
import android.widget.TextView
import cn.leancloud.AVUser
import cn.leancloud.sms.AVSMS
import cn.leancloud.sms.AVSMSOption
import cn.leancloud.types.AVNull
import com.fsyy.listener.R
import com.fsyy.listener.ui.main.MainActivity
import com.fsyy.listener.utils.LogUtils
import com.fsyy.listener.utils.PopupUtil
import com.fsyy.listener.utils.SoftKeyboardUtils
import com.fsyy.listener.utils.ToastUtil
import com.fsyy.listener.utils.extension.startActivity
import io.reactivex.Observer
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.activity_login.*

class LoginActivity : AppCompatActivity(),View.OnClickListener{
    private lateinit var number:String
    private lateinit var code:String
    private lateinit var popupWindow: PopupWindow
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        initParams()
    }
    private fun initParams(){
        login_getCode.setOnClickListener(this)
        btn_login.setOnClickListener(this)
    }

    override fun onClick(v: View?) {
        when(v?.id){
            login_getCode.id->{
                number=login_number.text.trim().toString()
                if(number==""){
                    ToastUtil.showCenterToast(R.drawable.info,getString(R.string.phone_number_empty))
                }else{
                    val isPhoneNumber=isPhoneNumber(number)
                    if(!isPhoneNumber){
                        ToastUtil.showCenterToast(R.drawable.info,getString(R.string.phone_number_error))
                    }else{
                        sendVerifiedCode()
                    }
                }
            }
            btn_login.id->{
                login()
            }
        }
    }
    private fun isPhoneNumber(str:String):Boolean{
        val regex="[1][34578]\\d{9}"
        return str.matches(Regex(regex))
    }
    private fun sendVerifiedCode(){
        SoftKeyboardUtils.hideKeyboard(this)
        showPopupWindow(getString(R.string.sending))
        val option=AVSMSOption()
        option.setSignatureName(getString(R.string.app_name))
        AVSMS.requestSMSCodeInBackground("+86$number",option).subscribe(object : Observer<AVNull>{
            override fun onSubscribe(d: Disposable) {
            }
            override fun onNext(t: AVNull) {
                LogUtils.e("验证码发送成功")
                popupWindow.dismiss()
                ToastUtil.showCenterToast(R.drawable.info,getString(R.string.login_verified_sent))
                login_getCode.text=getString(R.string.login_verified_sent)
            }
            override fun onError(e: Throwable) {
                LogUtils.e("验证码发送失败 ${e.message}")
                e.printStackTrace()
                popupWindow.dismiss()
                ToastUtil.showCenterToast(R.drawable.warn,getString(R.string.login_verified_error))
                login_getCode.text=getString(R.string.login_verified_resend)
            }
            override fun onComplete() {
            }
        })
    }
    private fun showPopupWindow(str:String){
        val popupView=LayoutInflater.from(this).inflate(R.layout.popup_submit,null)
        val submitText=popupView.findViewById<TextView>(R.id.submit_text)
        submitText.text=str
        popupWindow=PopupUtil.showPopupWindow(popupView,window.decorView)
    }

    private fun login(){
        number=login_number.text.trim().toString()
        code=login_code.text.trim().toString()
        if(TextUtils.isEmpty(number)||TextUtils.isEmpty(code)){
            ToastUtil.showCenterToast(R.drawable.info,getString(R.string.edit_content_toast))
        }else{
            SoftKeyboardUtils.hideKeyboard(this)
            showPopupWindow(getString(R.string.logging))
            AVUser.signUpOrLoginByMobilePhoneInBackground("+86$number",code).subscribe(object :
                Observer<AVUser> {
                override fun onSubscribe(d: Disposable) {
                }
                override fun onNext(t: AVUser) {
                    LogUtils.e("用户注册或者登录成功")
                    popupWindow.dismiss()
                    startActivity<MainActivity>()
                    finish()
                }
                override fun onError(e: Throwable) {
                    LogUtils.e("登录失败 ${e.message}")
                    e.printStackTrace()
                    popupWindow.dismiss()
                    ToastUtil.showCenterToast(R.drawable.warn,getString(R.string.login_failure))
                }
                override fun onComplete() {
                }
            })
        }
    }
}