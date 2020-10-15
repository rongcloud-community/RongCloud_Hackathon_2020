package cn.rongcloud.werewolf.model;

import cn.rongcloud.werewolf.bean.repo.VersionCheckRepo;
import cn.rongcloud.werewolf.common.NetStateLiveData;
import cn.rongcloud.werewolf.net.client.RetrofitClient;
import cn.rongcloud.werewolf.net.service.AppService;

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
