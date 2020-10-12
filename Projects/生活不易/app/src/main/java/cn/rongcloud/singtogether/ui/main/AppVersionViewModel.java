package cn.rongcloud.singtogether.ui.main;

import androidx.lifecycle.ViewModel;

import cn.rongcloud.singtogether.bean.repo.VersionCheckRepo;
import cn.rongcloud.singtogether.common.NetStateLiveData;
import cn.rongcloud.singtogether.model.AppModel;
import cn.rongcloud.singtogether.util.DeviceUtil;

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
