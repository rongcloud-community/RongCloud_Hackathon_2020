package cn.rongcloud.warmhart.ui.room;

import android.view.View;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModel;

import cn.rongcloud.warmhart.R;
import cn.rongcloud.warmhart.SealMicApp;
import cn.rongcloud.warmhart.bean.repo.CreateRoomRepo;
import cn.rongcloud.warmhart.common.NetStateLiveData;
import cn.rongcloud.warmhart.common.constant.UserRoleType;
import cn.rongcloud.warmhart.manager.CacheManager;
import cn.rongcloud.warmhart.manager.NavOptionsRouterManager;
import cn.rongcloud.warmhart.model.RoomModel;
import cn.rongcloud.warmhart.util.PatternUtil;
import cn.rongcloud.warmhart.util.RandomUtil;
import cn.rongcloud.warmhart.util.ToastUtil;

/**
 * 开启新房间VM
 */
public class CreateRoomViewModel extends ViewModel {

    private MutableLiveData<String> roomName;
    private RoomModel roomModel;
    private NetStateLiveData<CreateRoomRepo> createRoomRepoLiveData;
    private Observer<CreateRoomRepo> createRoomRepoObserver;

    public CreateRoomViewModel(RoomModel roomModel) {
        roomName = new MutableLiveData<>();
        this.roomModel = roomModel;
    }

    public MutableLiveData<String> getRoomName() {
        if (roomName == null) {
            roomName = new MutableLiveData<>();
        }
        return roomName;
    }

    public void createRoom(final View view, String roomName) {

        //校验
        if (!PatternUtil.filterRoomName(roomName)) {
            //校验未通过
            ToastUtil.showToast(SealMicApp.getApplication().getResources().getString(R.string.create_room_error));
            return;
        }

        String roomThemeUrl = RandomUtil.getRoomThemeImage();
        createRoomRepoLiveData = roomModel.createRoom(roomName, roomThemeUrl);
        createRoomRepoObserver = new Observer<CreateRoomRepo>() {
            @Override
            public void onChanged(CreateRoomRepo createRoomRepo) {
                if (createRoomRepo != null) {
                    String roomId = createRoomRepo.getRoomId();
                    String roomName = createRoomRepo.getRoomName();
                    String roomTheme = createRoomRepo.getThemePictureUrl();
                    //缓存房间ID
                    CacheManager.getInstance().cacheRoomId(roomId);
                    //创建完房间之后进入房间，此时人物的角色一定为主持人
                    NavOptionsRouterManager.getInstance()
                            .gotoChatRoomFragmentAndBackStack(view,
                                    roomId,
                                    roomName,
                                    roomTheme,
                                    UserRoleType.HOST);
                }
            }
        };
        createRoomRepoLiveData.observeForever(createRoomRepoObserver);
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        if (createRoomRepoLiveData != null && createRoomRepoObserver != null) {
            createRoomRepoLiveData.removeObserver(createRoomRepoObserver);
            createRoomRepoObserver = null;
        }
    }
}