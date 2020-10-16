package cn.rongcloud.warmhart.model;

import cn.rongcloud.warmhart.bean.repo.VersionCheckRepo;
import cn.rongcloud.warmhart.common.NetStateLiveData;
import cn.rongcloud.warmhart.net.client.RetrofitClient;
import cn.rongcloud.warmhart.net.service.AppService;

/**
 * APP版本管理模块数据层(M层)
 */
public class AppModel {

    private AppService appService;

    public AppModel(RetrofitClient client) {
        appService = client.createService(AppService.class);
    }

    public NetStateLiveData<VersionCheckRepo> checkVersion(String platform, Long versionCode) {
        return appService.versionCheck(platform, versionCode);
    }
}
