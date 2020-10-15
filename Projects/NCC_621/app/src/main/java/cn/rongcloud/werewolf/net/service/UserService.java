package cn.rongcloud.werewolf.net.service;

import java.util.List;

import cn.rongcloud.werewolf.bean.repo.NetResult;
import cn.rongcloud.werewolf.bean.repo.RefreshTokenRepo;
import cn.rongcloud.werewolf.bean.repo.RoomMemberRepo;
import cn.rongcloud.werewolf.bean.repo.UserLoginRepo;
import cn.rongcloud.werewolf.bean.repo.VisitorLoginRepo;
import cn.rongcloud.werewolf.bean.req.SendCodeReq;
import cn.rongcloud.werewolf.bean.req.UserInfoReq;
import cn.rongcloud.werewolf.bean.req.UserLoginReq;
import cn.rongcloud.werewolf.bean.req.VisitorLoginReq;
import cn.rongcloud.werewolf.common.NetStateLiveData;
import cn.rongcloud.werewolf.net.SealMicUrl;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * 用户模块请求封装
 */
public interface UserService {

    @POST(SealMicUrl.SEND_CODE)
    NetStateLiveData<NetResult<Void>> sendCode(@Body SendCodeReq sendCodeReq);

    @POST(SealMicUrl.VISITOR_LOGIN)
    NetStateLiveData<VisitorLoginRepo> visitorLogin(@Body VisitorLoginReq visitorLoginReq);

    @POST(SealMicUrl.REFRESH_TOKEN)
    NetStateLiveData<RefreshTokenRepo> refreshToken();

    @POST(SealMicUrl.USER_LOGIN)
    NetStateLiveData<UserLoginRepo> userLogin(@Body UserLoginReq userLoginReq);

    @POST(SealMicUrl.USER_BATCH)
    NetStateLiveData<NetResult<List<RoomMemberRepo.MemberBean>>> userBatch(@Body UserInfoReq userInfoReq);

}
