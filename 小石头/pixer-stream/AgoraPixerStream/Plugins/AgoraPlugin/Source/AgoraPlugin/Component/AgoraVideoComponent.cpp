// Fill out your copyright notice in the Description page of Project Settings.


#include "AgoraVideoComponent.h"
#include <Framework\Application\SlateApplication.h>
#include <Runtime\RHI\Public\RHICommandList.h>
#include <Runtime\RHI\Public\RHI.h>
#include "AgoraEventHandler.h"
#include "FSTAudioCapture.h"
AgoraEventHandler mAgoraHandle;
// Sets default values for this component's properties
UAgoraVideoComponent::UAgoraVideoComponent()
{
	// Set this component to be initialized when the game starts, and to be ticked every frame.  You can turn these features
	// off to improve performance if you don't need them.
	PrimaryComponentTick.bCanEverTick = true;

	// ...
}


// Called when the game starts
void UAgoraVideoComponent::BeginPlay()
{
	Super::BeginPlay();

	// ...
	// subscribe to engine delegates here for init / framebuffer creation / whatever
	if (FSlateApplication::IsInitialized())
	{
		FSlateApplication::Get().GetRenderer()->OnBackBufferReadyToPresent().AddUObject(this, &UAgoraVideoComponent::OnBackBufferReady_RenderThread);
	}
	InitAgora();
	audio = new FSTAudioCapture();
	audio->Init();
	audio->AgoraComp = this;
}


// Called every frame
void UAgoraVideoComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	// ...
}

void UAgoraVideoComponent::InitAgora()
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
	int nRet = RtcEnginePtr->enableVideo();
	if (nRet < 0)
	{
		UE_LOG(LogTemp, Warning, TEXT("enableVideo : %d"), nRet)
	}
	nRet = RtcEnginePtr->enableAudio();
	if (nRet < 0)
	{
		UE_LOG(LogTemp, Warning, TEXT("enableAudio : %d"), nRet)
	}
	RtcEnginePtr->adjustRecordingSignalVolume(200);
	RtcEnginePtr->enableWebSdkInteroperability(true);
	//RtcEnginePtr->setExternalAudioSource(true, 48000, 2);
	agora::rtc::VideoEncoderConfiguration conf;
	conf.dimensions = agora::rtc::VideoDimensions(Width, Height);
	conf.frameRate = FrameRate;
	conf.degradationPreference = agora::rtc::MAINTAIN_FRAMERATE;
	conf.orientationMode = agora::rtc::ORIENTATION_MODE_FIXED_PORTRAIT;
	RtcEnginePtr->setVideoEncoderConfiguration(conf);

	//join channel
	MediaEnginePtr = TSharedPtr<agora::media::ue4::AgoraMediaEngine>(agora::media::ue4::AgoraMediaEngine::Create(RtcEnginePtr.Get()));
	MediaEnginePtr->setExternalVideoSource(true , false);
	nRet = RtcEnginePtr->joinChannel(NULL, "PixerStream", NULL, 0);
	if (nRet < 0)
	{
		UE_LOG(LogTemp, Warning, TEXT("joinChannel : %d"), nRet)
	}
}

void UAgoraVideoComponent::OnBackBufferReady_RenderThread(SWindow& window, const FTexture2DRHIRef& BackBuffer)
{
	check(IsInRenderingThread());
	FRHICommandListImmediate& RHICmdList = FRHICommandListExecutor::GetImmediateCommandList();
	auto width = BackBuffer->GetSizeX();
	auto height = BackBuffer->GetSizeY();
	FIntRect Rect(0, 0, BackBuffer->GetSizeX(), BackBuffer->GetSizeY());
	TArray<FColor> Data;

	RHICmdList.ReadSurfaceData(BackBuffer, Rect, Data, FReadSurfaceDataFlags());
	//SetResolution(width, height, agora::rtc::FRAME_RATE_FPS_30);

	agora::media::ExternalVideoFrame* frame = new agora::media::ExternalVideoFrame();
	frame->type = agora::media::ExternalVideoFrame::VIDEO_BUFFER_RAW_DATA;
	frame->format = agora::media::ExternalVideoFrame::VIDEO_PIXEL_BGRA;
	frame->buffer = Data.GetData();
	frame->stride = BackBuffer->GetSizeX();
	frame->height = BackBuffer->GetSizeY();
	frame->rotation = 0;
	frame->timestamp = timestamp++;
	MediaEnginePtr->pushVideoFrame(frame);
	delete frame;


	
}