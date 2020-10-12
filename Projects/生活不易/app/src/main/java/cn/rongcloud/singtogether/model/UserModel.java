package cn.rongcloud.singtogether.model;

import java.util.List;

import cn.rongcloud.singtogether.bean.repo.NetResult;
import cn.rongcloud.singtogether.bean.repo.RefreshTokenRepo;
import cn.rongcloud.singtogether.bean.repo.RoomMemberRepo;
import cn.rongcloud.singtogether.bean.repo.UserLoginRepo;
import cn.rongcloud.singtogether.bean.repo.VisitorLoginRepo;
import cn.rongcloud.singtogether.bean.req.SendCodeReq;
import cn.rongcloud.singtogether.bean.req.UserInfoReq;
import cn.rongcloud.singtogether.bean.req.UserLoginReq;
import cn.rongcloud.singtogether.bean.req.VisitorLoginReq;
import cn.rongcloud.singtogether.common.NetStateLiveData;
import cn.rongcloud.singtogether.manager.CacheManager;
import cn.rongcloud.singtogether.net.client.RetrofitClient;
import cn.rongcloud.singtogether.net.service.UserService;
import cn.rongcloud.singtogether.util.DeviceUtil;
import cn.rongcloud.singtogether.util.RandomUtil;

/**
 * 用户模块数据层(M层)
 */
public class UserModel {

    private UserService userService;

    public UserModel(RetrofitClient client) {
        userService = client.createService(UserService.class);
    }

    public NetStateLiveData<NetResult<Void>> sendCode(String mobile) {
        return userService.sendCode(new SendCodeReq(mobile));
    }

    public NetStateLiveData<RefreshTokenRepo> refreshToken() {
        return userService.refreshToken();
    }

    public NetStateLiveData<VisitorLoginRepo> visitorLogin() {
        String userName = RandomUtil.getUserName();
        String portrait = RandomUtil.getUserHeadImage();
        String deviceId = DeviceUtil.getUniqueDeviceId();
        CacheManager.getInstance().cacheDeviceId(deviceId);
        VisitorLoginReq visitorLoginReq = new VisitorLoginReq(userName, portrait, deviceId);
        return userService.visitorLogin(visitorLoginReq);
    }

    public NetStateLiveData<UserLoginRepo> login(String mobile, String authCode) {
        String userName = RandomUtil.getUserName();
        String portrait = RandomUtil.getUserHeadImage();
        String deviceId = CacheManager.getInstance().getDeviceId();
        return userService.userLogin(new UserLoginReq(mobile, authCode, userName, portrait, deviceId));
    }

    public NetStateLiveData<NetResult<List<RoomMemberRepo.MemberBean>>> userbatch(List<String> userIds) {
        return userService.userBatch(new UserInfoReq(userIds));
    }

}
