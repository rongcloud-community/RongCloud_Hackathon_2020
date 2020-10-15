package com.gfd.eshop.feature;


import android.app.Application;
import android.content.Context;

import androidx.preference.PreferenceManager;
import io.rong.imlib.RongIMClient;

import com.gfd.eshop.R;
import com.gfd.eshop.base.wrapper.ToastWrapper;
import com.squareup.leakcanary.LeakCanary;

/**
 * App-Application
 */
public class EShopApplication extends Application {

    private Context context = null;

    @Override public void onCreate() {
        super.onCreate();
        if (LeakCanary.isInAnalyzerProcess(this)) {
            // 此进程是LeakCanary用于内存堆分析的.
            // 不应该在此进程中做任何app初始化工作.
            return;
        }
        //初始化LeakCanary
        LeakCanary.install(this);
        //初始化Toast工具类
        ToastWrapper.init(this);
        //设置偏好设置
        PreferenceManager.setDefaultValues(this, R.xml.preferences, false);

        context = getApplicationContext();
        String appKey = "x18ywvqfx5fcc";
        RongIMClient.init(context, appKey);
    }

}
