package cn.rongcloud.scriptgame.model;

import cn.rongcloud.scriptgame.bean.repo.VersionCheckRepo;
import cn.rongcloud.scriptgame.common.NetStateLiveData;
import cn.rongcloud.scriptgame.net.client.RetrofitClient;
import cn.rongcloud.scriptgame.net.service.AppService;

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
