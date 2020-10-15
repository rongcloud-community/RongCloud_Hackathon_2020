// Fill out your copyright notice in the Description page of Project Settings.


#include "AgoraEventHandler.h"

AgoraEventHandler::AgoraEventHandler()
{
}

AgoraEventHandler::~AgoraEventHandler()
{
}

void AgoraEventHandler::onJoinChannelSuccess(const char* channel, uid_t uid, int elapsed)
{

}

void AgoraEventHandler::onLeaveChannel(const RtcStats& stat)
{
}

void AgoraEventHandler::onFirstRemoteVideoDecoded(uid_t uid, int width, int height, int elapsed)
{
}

void AgoraEventHandler::onUserOffline(uid_t uid, USER_OFFLINE_REASON_TYPE reason)
{
}
