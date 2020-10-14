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

import android.database.Cursor
import android.net.Uri
import android.provider.MediaStore
import com.fsyy.listener.ui.MyApplication


object Uri2PathUtil {
    fun getImageRealPathFromContentUri(uri: Uri):String?{
        val column=MediaStore.MediaColumns.DATA
        val projection= arrayOf(column)
        var cursor:Cursor?=null
        try{
            cursor=MyApplication.context.contentResolver.query(uri, projection,
                null, null, null)
            if(cursor!=null&&cursor.moveToFirst()){
                val columnIndex=cursor.getColumnIndexOrThrow(column)
                return cursor.getString(columnIndex)
            }
        }catch (e: Exception){
            e.printStackTrace()
        }finally {
            cursor?.close()
        }
        return null
    }
}