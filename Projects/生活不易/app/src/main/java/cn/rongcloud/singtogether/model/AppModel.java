package cn.rongcloud.singtogether.model;

import cn.rongcloud.singtogether.bean.repo.VersionCheckRepo;
import cn.rongcloud.singtogether.common.NetStateLiveData;
import cn.rongcloud.singtogether.net.client.RetrofitClient;
import cn.rongcloud.singtogether.net.service.AppService;

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
