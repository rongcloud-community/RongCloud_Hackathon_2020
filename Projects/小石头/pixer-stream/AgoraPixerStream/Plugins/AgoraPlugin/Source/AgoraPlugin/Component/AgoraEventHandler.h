// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "../Public/AgoraRtcEngine.h"
/**
 * 
 */
using namespace agora::rtc;
class AGORAPLUGIN_API AgoraEventHandler : public IRtcEngineEventHandler
{
public:
	AgoraEventHandler();
	~AgoraEventHandler();

    // 注册 onJoinChannelSuccess 回调
    // 本地用户成功加入频道时，会触发该回调;
    virtual void onJoinChannelSuccess(const char* channel, uid_t uid, int elapsed);

    // 注册 onLeaveChannel 回调。
    // 本地用户成功离开频道时，会触发该回调。
    virtual void onLeaveChannel(const RtcStats& stat);

    // 注册 onFirstRemoteVideoDecoded 回调。
    // SDK 接收到第一帧远端视频并成功解码时，会触发该回调。
    // 可以在该回调中调用 setupRemoteVideo 方法设置远端视图。
    virtual void onFirstRemoteVideoDecoded(uid_t uid, int width, int height, int elapsed);

    // 注册 onUserOffline 回调。
    // 远端用户离开频道或掉线时，会触发该回调。
    virtual void onUserOffline(uid_t uid, USER_OFFLINE_REASON_TYPE reason);
};
