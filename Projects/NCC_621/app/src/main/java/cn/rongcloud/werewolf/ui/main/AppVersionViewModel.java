package cn.rongcloud.werewolf.ui.main;

import androidx.lifecycle.ViewModel;

import cn.rongcloud.werewolf.bean.repo.VersionCheckRepo;
import cn.rongcloud.werewolf.common.NetStateLiveData;
import cn.rongcloud.werewolf.model.AppModel;
import cn.rongcloud.werewolf.util.DeviceUtil;

/**
 * 检查版本VM
 */
public class AppVersionViewModel extends ViewModel {

    private AppModel appModel;

    public AppVersionViewModel(AppModel appModel) {
        this.appModel = appModel;
    }

    public NetStateLiveData<VersionCheckRepo> checkVersion() {
        long versionCode = DeviceUtil.getAppVersionCode();
        return appModel.checkVersion("Android", versionCode);
    }

}
