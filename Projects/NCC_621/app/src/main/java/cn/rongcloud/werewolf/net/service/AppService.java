package cn.rongcloud.werewolf.net.service;

import cn.rongcloud.werewolf.bean.repo.VersionCheckRepo;
import cn.rongcloud.werewolf.common.NetStateLiveData;
import cn.rongcloud.werewolf.net.SealMicUrl;
import retrofit2.http.GET;
import retrofit2.http.Query;

/**
 * APP版本管理模块接口封装
 */
public interface AppService {

    @GET(SealMicUrl.APP_VERSION_LATEST)
    NetStateLiveData<VersionCheckRepo> versionCheck(@Query("platform") String platform, @Query("versionCode") Long versionCode);

}
