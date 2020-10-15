package cn.rongcloud.werewolf.ui.room;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.databinding.DataBindingUtil;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import cn.rongcloud.werewolf.R;
import cn.rongcloud.werewolf.common.Event;
import cn.rongcloud.werewolf.common.adapter.TextWatcherAdapter;
import cn.rongcloud.werewolf.common.factory.CommonViewModelFactory;
import cn.rongcloud.werewolf.common.lifecycle.MainObserver;
import cn.rongcloud.werewolf.databinding.FragmentCreateRoomBinding;
import cn.rongcloud.werewolf.manager.CacheManager;
import cn.rongcloud.werewolf.manager.GlideManager;
import cn.rongcloud.werewolf.manager.NavOptionsRouterManager;
import cn.rongcloud.werewolf.ui.login.LoginViewModel;
import cn.rongcloud.werewolf.ui.widget.CustomTitleBar;
import cn.rongcloud.werewolf.util.KeyBoardUtil;
import cn.rongcloud.werewolf.util.RandomUtil;
import cn.rongcloud.werewolf.util.ToastUtil;
import cn.rongcloud.werewolf.util.log.SLog;

/**
 * 开启新房间
 */
public class CreateRoomFragment extends Fragment {

    private FragmentCreateRoomBinding fragmentCreateRoomBinding;
    private CreateRoomViewModel createRoomViewModel;
    private LoginViewModel loginViewModel;

    public CreateRoomFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getLifecycle().addObserver(new MainObserver(CreateRoomFragment.class.getSimpleName()));
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        createRoomViewModel = new ViewModelProvider(this,
                new CommonViewModelFactory()).get(CreateRoomViewModel.class);
        loginViewModel = new ViewModelProvider(this,
                new CommonViewModelFactory()).get(LoginViewModel.class);
        fragmentCreateRoomBinding =
                DataBindingUtil.inflate(inflater, R.layout.fragment_create_room, container, false);
        fragmentCreateRoomBinding.setCreateRoom(createRoomViewModel);
        fragmentCreateRoomBinding.setLifecycleOwner(this);
        EventBus.getDefault().register(this);
        return fragmentCreateRoomBinding.getRoot();
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        EventBus.getDefault().unregister(this);
        KeyBoardUtil.closeKeyBoard(requireActivity(), getView());
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEventUserGoOutBean(Event.UserGoOutBean userGoOutBean) {
        ToastUtil.showToast("当前账号在其他端登录");
        SLog.e(SLog.TAG_SEAL_MIC, "在创建房间页面被踢");
        loginViewModel.visitorLogin();
        NavOptionsRouterManager.getInstance().gotoLoginFragmentFromCreateRoom(getView());
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        String roomName = fragmentCreateRoomBinding.roomNameEdit.getText().toString();
        showButton(roomName);
        fragmentCreateRoomBinding.roomNameEdit.addTextChangedListener(new TextWatcherAdapter() {
            @Override
            public void afterTextChanged(Editable editable) {
                super.afterTextChanged(editable);
                String roomName = fragmentCreateRoomBinding.roomNameEdit.getText().toString();
                createRoomViewModel.getRoomName().postValue(roomName);
                showButton(roomName);
            }
        });
        GlideManager.getInstance().setRadiusImage(
                fragmentCreateRoomBinding.getRoot(),
                28,
                RandomUtil.getRoomThemeImage(),
                fragmentCreateRoomBinding.createRoomTheme);
        fragmentCreateRoomBinding.createRoomTitle.setTitleClickListener(new CustomTitleBar.TitleClickListener() {

            @Override
            public void onLeftClick() {
                NavOptionsRouterManager.getInstance().backUp(getView());
            }

            @Override
            public void onRightClick() {

            }
        });
        fragmentCreateRoomBinding.createRoomTitle.setLeftImage(R.mipmap.ic_back_black);
        fragmentCreateRoomBinding.createRoomTitle.setLeftTitle(getString(R.string.open_new_room_null));
        fragmentCreateRoomBinding.createRoomTitle.setRightUrl(CacheManager.getInstance().getUserPortrait());
        fragmentCreateRoomBinding.createRoomTitle.hideRightText();

    }

    private void showButton(String roomName) {
        if (TextUtils.isEmpty(roomName)) {
            fragmentCreateRoomBinding.createRoomButton.setAlpha(0.5f);
            fragmentCreateRoomBinding.createRoomButton.setClickable(false);
        } else {
            fragmentCreateRoomBinding.createRoomButton.setAlpha(1);
            fragmentCreateRoomBinding.createRoomButton.setClickable(true);
        }
    }
}
