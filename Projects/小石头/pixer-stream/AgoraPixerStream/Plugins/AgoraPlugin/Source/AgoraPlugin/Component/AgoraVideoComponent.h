// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"

#include "../Public/AgoraRtcEngine.h"
#include "../Public/AgoraMediaEngine.h"


#include "AgoraVideoComponent.generated.h"

class FSTAudioCapture;
UCLASS( ClassGroup=(Custom), meta=(BlueprintSpawnableComponent) )
class AGORAPLUGIN_API UAgoraVideoComponent : public UActorComponent
{
	GENERATED_BODY()

public:	
	// Sets default values for this component's properties
	UAgoraVideoComponent();

protected:
	// Called when the game starts
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;

private:
	FSTAudioCapture* audio;
	int Width = 640;
	int Height = 480;
	int timestamp = 0;
	agora::rtc::FRAME_RATE FrameRate = agora::rtc::FRAME_RATE::FRAME_RATE_FPS_30;

private:
	void InitAgora();

public:
	TSharedPtr<agora::rtc::ue4::AgoraRtcEngine> RtcEnginePtr;
	TSharedPtr<agora::media::ue4::AgoraMediaEngine> MediaEnginePtr;
	void OnBackBufferReady_RenderThread(SWindow& window, const FTexture2DRHIRef& BackBuffer);
};
