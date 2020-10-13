// Fill out your copyright notice in the Description page of Project Settings.

//VideoCall.cpp

#include "VideoCall.h"
#include "AgoraVideoDeviceManager.h"
#include "AgoraAudioDeviceManager.h"
#include "MediaShaders.h"
#include "VideoFrameObserver.h"

VideoCall::VideoCall()
{
    InitAgora();
}


VideoCall::~VideoCall()
{
    StopCall();
}

void VideoCall::InitAgora()
{
    RtcEnginePtr = TSharedPtr<agora::rtc::ue4::AgoraRtcEngine>(agora::rtc::ue4::AgoraRtcEngine::createAgoraRtcEngine());


    static agora::rtc::RtcEngineContext ctx;
    ctx.appId = "aab8b8f5a8cd4469a63042fcfafe7063";
    ctx.eventHandler = new agora::rtc::IRtcEngineEventHandler();


    int ret = RtcEnginePtr->initialize(ctx);
    if (ret < 0)
    {
        UE_LOG(LogTemp, Warning, TEXT("RtcEngine initialize ret: %d"), ret);
    }
    MediaEnginePtr = TSharedPtr<agora::media::ue4::AgoraMediaEngine>(agora::media::ue4::AgoraMediaEngine::Create(RtcEnginePtr.Get()));
}


FString VideoCall::GetVersion() const
{
    if (!RtcEnginePtr)
    {
        return "";
    }
    int build = 0;
    const char* version = RtcEnginePtr->getVersion(&build);
    return FString(ANSI_TO_TCHAR(version));
}


void VideoCall::RegisterOnLocalFrameCallback(
    std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnFrameCallback)
{
    OnLocalFrameCallback = std::move(OnFrameCallback);
}


void VideoCall::RegisterOnRemoteFrameCallback(
    std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnFrameCallback)
{
    OnRemoteFrameCallback = std::move(OnFrameCallback);
}

void VideoCall::StartCall(
    const FString& ChannelName)
{
    if (!RtcEnginePtr)
    {
        return;
    }
    if (MediaEnginePtr)
    {
        if (!VideoFrameObserverPtr)
        {
            VideoFrameObserverPtr = MakeUnique<VideoFrameObserver>();


            std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnCaptureVideoFrameCallback
                = [this](std::uint8_t* buffer, std::uint32_t width, std::uint32_t height, std::uint32_t size)
            {
                if (OnLocalFrameCallback)
                {
                    OnLocalFrameCallback(buffer, width, height, size);
                }
                else { UE_LOG(LogTemp, Warning, TEXT("VideoCall OnLocalFrameCallback isn't set")); }
            };
            VideoFrameObserverPtr->setOnCaptureVideoFrameCallback(std::move(OnCaptureVideoFrameCallback));


            std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnRenderVideoFrameCallback
                = [this](std::uint8_t* buffer, std::uint32_t width, std::uint32_t height, std::uint32_t size)
            {
                if (OnRemoteFrameCallback)
                {
                    OnRemoteFrameCallback(buffer, width, height, size);
                }
                else { UE_LOG(LogTemp, Warning, TEXT("VideoCall OnRemoteFrameCallback isn't set")); }
            };
            VideoFrameObserverPtr->setOnRenderVideoFrameCallback(std::move(OnRenderVideoFrameCallback));
        }


        MediaEnginePtr->registerVideoFrameObserver(VideoFrameObserverPtr.Get());
    }


    int nRet = RtcEnginePtr->enableVideo();
    if (nRet < 0)
    {
        UE_LOG(LogTemp, Warning, TEXT("enableVideo : %d"), nRet)
    }

    nRet = RtcEnginePtr->setChannelProfile(agora::rtc::CHANNEL_PROFILE_COMMUNICATION);
    if (nRet < 0)
    {
        UE_LOG(LogTemp, Warning, TEXT("setChannelProfile : %d"), nRet)
    }
    std::uint32_t nUID = 0;
    nRet = RtcEnginePtr->joinChannel(NULL, TCHAR_TO_ANSI(*ChannelName), NULL, nUID);
    if (nRet < 0)
    {
        UE_LOG(LogTemp, Warning, TEXT("joinChannel ret: %d"), nRet);
    }
}

void VideoCall::StopCall()
{
    if (!RtcEnginePtr)
    {
        return;
    }
    auto ConnectionState = RtcEnginePtr->getConnectionState();
    if (agora::rtc::CONNECTION_STATE_DISCONNECTED != ConnectionState)
    {
        int nRet = RtcEnginePtr->leaveChannel();
        if (nRet < 0)
        {
            UE_LOG(LogTemp, Warning, TEXT("leaveChannel ret: %d"), nRet);
        }
        if (MediaEnginePtr)
        {
            MediaEnginePtr->registerVideoFrameObserver(nullptr);
        }
    }
}
bool VideoCall::EnableVideo(bool bEnable)
{
    if (!RtcEnginePtr)
    {
        return false;
    }
    int nRet = 0;
    if (bEnable)
        nRet = RtcEnginePtr->enableVideo();
    else
        nRet = RtcEnginePtr->disableVideo();
    return nRet == 0 ? true : false;
}

bool VideoCall::MuteLocalVideo(bool bMuted)
{
    if (!RtcEnginePtr)
    {
        return false;
    }
    int ret = RtcEnginePtr->muteLocalVideoStream(bMuted);
    if (ret == 0)
        bLocalVideoMuted = bMuted;


    return ret == 0 ? true : false;
}

bool VideoCall::IsLocalVideoMuted()
{
    return bLocalVideoMuted;
}

bool VideoCall::MuteLocalAudio(bool bMuted)
{
    if (!RtcEnginePtr)
    {
        return false;
    }
    int ret = RtcEnginePtr->muteLocalAudioStream(bMuted);
    if (ret == 0)
        bLocalAudioMuted = bMuted;


    return ret == 0 ? true : false;
}

bool VideoCall::IsLocalAudioMuted()
{
    return bLocalAudioMuted;
}