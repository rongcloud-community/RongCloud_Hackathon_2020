// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"

#include "Components/Image.h"

#include "VideoViewWidget.generated.h"

/**
 * 
 */
UCLASS()
class AGORAPLUGIN_API UVideoViewWidget : public UUserWidget
{
	GENERATED_BODY()
	
public:
	UPROPERTY(BlueprintReadOnly, meta = (BindWidget))
		UImage* RenderTargetImage = nullptr;


	UPROPERTY(EditDefaultsOnly)
		UTexture2D* RenderTargetTexture = nullptr;


	UTexture2D* CameraoffTexture = nullptr;


	uint8* Buffer = nullptr;
	uint32_t Width = 0;
	uint32_t Height = 0;
	uint32 BufferSize = 0;
	FUpdateTextureRegion2D* UpdateTextureRegion = nullptr;


	FSlateBrush Brush;


	FCriticalSection Mutex;
	void NativeConstruct() override;
	void NativeDestruct() override;
	void NativeTick(const FGeometry& MyGeometry, float DeltaTime) override;

public:
	void UpdateBuffer(uint8* RGBBuffer, uint32_t Width, uint32_t Height, uint32_t Size);
	void ResetBuffer();
};
