package cn.rongcloud.marriage.ui.main;

import androidx.lifecycle.ViewModel;

import cn.rongcloud.marriage.bean.repo.VersionCheckRepo;
import cn.rongcloud.marriage.common.NetStateLiveData;
import cn.rongcloud.marriage.model.AppModel;
import cn.rongcloud.marriage.util.DeviceUtil;

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
