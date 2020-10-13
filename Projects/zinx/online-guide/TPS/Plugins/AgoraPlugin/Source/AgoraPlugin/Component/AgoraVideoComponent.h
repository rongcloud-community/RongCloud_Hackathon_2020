// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"

#include "../Agora/VideoCall.h"

#include "AgoraVideoComponent.generated.h"

class UVideoViewWidget;
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


public:
	TSharedPtr<VideoCall> VideoCallPtr;
	UVideoViewWidget * ViewWidgetPtr;
	UFUNCTION(BlueprintCallable, Category = "C++") 
	void JoinChannel(FString channel);
	UFUNCTION(BlueprintCallable, Category = "C++")
	void LeaveChannel();
	UFUNCTION(BlueprintCallable, Category = "C++")
	void AddVideoViewWidget(UVideoViewWidget*widget);
};
