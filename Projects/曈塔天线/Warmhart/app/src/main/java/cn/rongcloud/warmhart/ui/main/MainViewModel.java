package cn.rongcloud.warmhart.ui.main;

import android.view.View;

import androidx.lifecycle.ViewModel;

import cn.rongcloud.warmhart.manager.NavOptionsRouterManager;

/**
 * 主界面VM
 */
public class MainViewModel extends ViewModel {

    public MainViewModel() {
    }

    public void gotoLoginFragment(View view) {
        NavOptionsRouterManager.getInstance().gotoLoginFragmentFromMain(view);
    }

}
