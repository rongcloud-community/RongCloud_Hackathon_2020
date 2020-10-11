// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "AgoraRtcEngine.h"
#include "AgoraMediaEngine.h"
#include "VideoFrameObserver.h"
/**
 * 
 */
class AGORAPLUGIN_API VideoCall
{
public:
	VideoCall();
	~VideoCall();
    FString GetVersion() const;


    void RegisterOnLocalFrameCallback(
        std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnLocalFrameCallback);
    void RegisterOnRemoteFrameCallback(
        std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnRemoteFrameCallback);


    void StartCall(
        const FString& ChannelName);


    void StopCall();


    bool MuteLocalAudio(bool bMuted = true);
    bool IsLocalAudioMuted();


    bool MuteLocalVideo(bool bMuted = true);
    bool IsLocalVideoMuted();


    bool EnableVideo(bool bEnable = true);

private:
    void InitAgora();


private:
    TSharedPtr<agora::rtc::ue4::AgoraRtcEngine> RtcEnginePtr;
    TSharedPtr<agora::media::ue4::AgoraMediaEngine> MediaEnginePtr;


    TUniquePtr<VideoFrameObserver> VideoFrameObserverPtr;


    //callback
    //data, w, h, size
    std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnLocalFrameCallback;
    std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnRemoteFrameCallback;


    bool bLocalAudioMuted = false;
    bool bLocalVideoMuted = false;
};
