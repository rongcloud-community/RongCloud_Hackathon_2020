package cn.rongcloud.warmhart.ui.splash;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.databinding.DataBindingUtil;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.Timer;
import java.util.TimerTask;

import cn.rongcloud.warmhart.BuildConfig;
import cn.rongcloud.warmhart.R;
import cn.rongcloud.warmhart.common.Event;
import cn.rongcloud.warmhart.common.factory.CommonViewModelFactory;
import cn.rongcloud.warmhart.databinding.FragmentSplashBinding;
import cn.rongcloud.warmhart.ui.login.LoginViewModel;
import cn.rongcloud.warmhart.util.log.SLog;

/**
 * 开屏页
 */
public class SplashFragment extends Fragment {

    private FragmentSplashBinding fragmentSplashBinding;
    private LoginViewModel loginViewModel;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        fragmentSplashBinding =
                DataBindingUtil.inflate(inflater, R.layout.fragment_splash, container, false);
        fragmentSplashBinding.setLifecycleOwner(this);
        loginViewModel = new ViewModelProvider(this, new CommonViewModelFactory()).get(LoginViewModel.class);
        EventBus.getDefault().register(this);
        return fragmentSplashBinding.getRoot();
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        loginViewModel.visitorLogin();
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                Navigation.findNavController(fragmentSplashBinding.getRoot()).navigate(R.id.action_splashFragment_to_mainFragment);
            }
        }, 2000);
        fragmentSplashBinding.tvVersionName.setText(BuildConfig.VERSION_NAME);
        SLog.e(SLog.TAG_SEAL_MIC, "当前时间戳: " + System.currentTimeMillis());
    }

    /**
     * 接收token失效的通知
     */
    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEventTokenLose(Event.UserTokenLose userTokenLose) {
        //刷新Token
        loginViewModel.refreshToken();
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        EventBus.getDefault().unregister(this);
    }
}