package cn.rongcloud.warmhart.ui.main;

import androidx.lifecycle.ViewModel;

import cn.rongcloud.warmhart.bean.repo.VersionCheckRepo;
import cn.rongcloud.warmhart.common.NetStateLiveData;
import cn.rongcloud.warmhart.model.AppModel;
import cn.rongcloud.warmhart.util.DeviceUtil;

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
