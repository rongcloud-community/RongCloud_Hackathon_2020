// Fill out your copyright notice in the Description page of Project Settings.


#include "AgoraVideoComponent.h"
#include "../Widget/VideoViewWidget.h"

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
	VideoCallPtr = TSharedPtr<VideoCall>(new VideoCall());
}


// Called every frame
void UAgoraVideoComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	// ...
}

void UAgoraVideoComponent::JoinChannel(FString channel)
{
	VideoCallPtr->StartCall(channel);
}

void UAgoraVideoComponent::LeaveChannel()
{
	VideoCallPtr->StopCall();
}

void UAgoraVideoComponent::AddVideoViewWidget(UVideoViewWidget* widget)
{
	if (!widget)return;
	ViewWidgetPtr = widget;
	auto OnRemoteFrameCallback = [this](
		std::uint8_t* Buffer,
		std::uint32_t Width,
		std::uint32_t Height,
		std::uint32_t Size)
	{
		ViewWidgetPtr->UpdateBuffer(Buffer, Width, Height, Size);
	};
	VideoCallPtr->RegisterOnRemoteFrameCallback(OnRemoteFrameCallback);
}
