// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"


#include "AgoraVideoActor.generated.h"

UCLASS()
class AGORAPLUGIN_API AAgoraVideoActor : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AAgoraVideoActor();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

public:
	UFUNCTION(BlueprintImplementableEvent, Category = "Agora")
		void BPJoinChannel (const FString& channel);
	UFUNCTION(BlueprintImplementableEvent, Category = "Agora")
		void BPLeaveChannel();
	virtual void JoinChannel(FString& channel) { BPJoinChannel(channel); };
	virtual void LeaveChannel() { BPLeaveChannel(); };
};
