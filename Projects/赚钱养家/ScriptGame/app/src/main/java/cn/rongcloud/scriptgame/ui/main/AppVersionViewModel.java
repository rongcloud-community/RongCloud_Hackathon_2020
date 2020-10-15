package cn.rongcloud.scriptgame.ui.main;

import androidx.lifecycle.ViewModel;

import cn.rongcloud.scriptgame.bean.repo.VersionCheckRepo;
import cn.rongcloud.scriptgame.common.NetStateLiveData;
import cn.rongcloud.scriptgame.model.AppModel;
import cn.rongcloud.scriptgame.util.DeviceUtil;

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
