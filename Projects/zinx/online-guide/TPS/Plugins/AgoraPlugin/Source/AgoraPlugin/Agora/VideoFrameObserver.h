// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"

#include "AgoraMediaEngine.h"
/**
 * 
 */
class AGORAPLUGIN_API VideoFrameObserver : public agora::media::IVideoFrameObserver
{
public:
	VideoFrameObserver();
	~VideoFrameObserver();
	bool onCaptureVideoFrame(VideoFrame& videoFrame) override;


	bool onRenderVideoFrame(unsigned int uid, VideoFrame& videoFrame) override;


	void setOnCaptureVideoFrameCallback(
		std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> callback);


	void setOnRenderVideoFrameCallback(
		std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> callback);


	virtual VIDEO_FRAME_TYPE getVideoFormatPreference() override { return FRAME_TYPE_RGBA; }

private:
	std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnCaptureVideoFrame;
	std::function<void(std::uint8_t*, std::uint32_t, std::uint32_t, std::uint32_t)> OnRenderVideoFrame;

};
