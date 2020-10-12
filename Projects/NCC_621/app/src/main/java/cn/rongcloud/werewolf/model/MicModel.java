package cn.rongcloud.werewolf.model;

import cn.rongcloud.werewolf.bean.repo.NetResult;
import cn.rongcloud.werewolf.bean.req.MicAcceptReq;
import cn.rongcloud.werewolf.bean.req.MicApplyReq;
import cn.rongcloud.werewolf.bean.req.MicQuitReq;
import cn.rongcloud.werewolf.bean.req.MicStateReq;
import cn.rongcloud.werewolf.bean.req.MicTransferHostReq;
import cn.rongcloud.werewolf.bean.req.MicTransferHostResultReq;
import cn.rongcloud.werewolf.common.NetStateLiveData;
import cn.rongcloud.werewolf.net.client.RetrofitClient;
import cn.rongcloud.werewolf.net.service.MicService;

/**
 * 麦位模块数据层(M层)
 */
public class MicModel {

    private MicService micService;

    public MicModel(RetrofitClient client) {
        micService = client.createService(MicService.class);
    }

    public NetStateLiveData<NetResult<Void>> micAccept(String roomId, String userId) {
        MicAcceptReq micAcceptReq = new MicAcceptReq(roomId, userId);
        return micService.micAccept(micAcceptReq);
    }

    public NetStateLiveData<NetResult<Void>> micReject(String roomId, String userId) {
        MicAcceptReq micAcceptReq = new MicAcceptReq(roomId, userId);
        return micService.micReject(micAcceptReq);
    }

    public NetStateLiveData<NetResult<Void>> micInvite(String roomId, String userId) {
        MicAcceptReq micAcceptReq = new MicAcceptReq(roomId, userId);
        return micService.micInvite(micAcceptReq);
    }

    public NetStateLiveData<NetResult<Void>> micApply(String roomId) {
        MicApplyReq micApplyReq = new MicApplyReq(roomId);
        return micService.micApply(micApplyReq);
    }

    public NetStateLiveData<NetResult<Void>> micState(String roomId, int state, int position) {
        MicStateReq micStateReq = new MicStateReq(roomId, state, position);
        return micService.micState(micStateReq);
    }

    public NetStateLiveData<NetResult<Void>> micKick(String roomId, String userId) {
        MicAcceptReq micAcceptReq = new MicAcceptReq(roomId, userId);
        return micService.micKick(micAcceptReq);
    }

    public NetStateLiveData<NetResult<Void>> micTransferHost(String roomId, String userId) {
        MicTransferHostReq micTransferHostAgreeReq = new MicTransferHostReq(roomId, userId);
        return micService.micTransferHost(micTransferHostAgreeReq);
    }

    public NetStateLiveData<NetResult<Void>> micTransferHostAccept(String roomId) {
        MicTransferHostResultReq micTransferHostResultReq = new MicTransferHostResultReq(roomId);
        return micService.micTransferHostAccept(micTransferHostResultReq);
    }

    public NetStateLiveData<NetResult<Void>> micTransferHostReject(String roomId) {
        MicTransferHostResultReq micTransferHostResultReq = new MicTransferHostResultReq(roomId);
        return micService.micTransferHostReject(micTransferHostResultReq);
    }

    public NetStateLiveData<NetResult<Void>> micQuit(String roomId) {
        MicQuitReq micQuitReq = new MicQuitReq(roomId);
        return micService.micQuit(micQuitReq);
    }

    public NetStateLiveData<NetResult<Void>> micTakeOverHost(String roomId) {
        MicTransferHostResultReq micTransferHostResultReq = new MicTransferHostResultReq(roomId);
        return micService.micTakeOverHost(micTransferHostResultReq);
    }

    public NetStateLiveData<NetResult<Void>> micTakeOverHostReject(String roomId, String userId) {
        MicAcceptReq micAcceptReq = new MicAcceptReq(roomId, userId);
        return micService.micTakeOverHostReject(micAcceptReq);
    }

    public NetStateLiveData<NetResult<Void>> micTakeOverHostAccept(String roomId, String userId) {
        MicAcceptReq micAcceptReq = new MicAcceptReq(roomId, userId);
        return micService.micTakeOverHostAccept(micAcceptReq);
    }

}
