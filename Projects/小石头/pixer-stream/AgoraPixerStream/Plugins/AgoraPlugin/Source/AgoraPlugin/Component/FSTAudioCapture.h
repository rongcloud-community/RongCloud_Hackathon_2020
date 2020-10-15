// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include <Runtime\Engine\Public\AudioDevice.h>

/**
 * 
 */
class UAgoraVideoComponent;
class AGORAPLUGIN_API FSTAudioCapture : public ISubmixBufferListener
{
public:
	FSTAudioCapture();
	~FSTAudioCapture();
public:
	int Init();
	virtual void OnNewSubmixBuffer(const USoundSubmix* OwningSubmix, float* AudioData, int32 NumSamples, int32 NumChannels, const int32 SampleRate, double AudioClock);
	

private:
	bool bInitialized = false;
	bool bRecordingInitialized = false;
	bool bFormatChecked = false;

	int InNumChannels = 1;
	TArray<int16> PCM16;
	TArray<uint8> RecordingBuffer;

public:
	UAgoraVideoComponent* AgoraComp = nullptr;
};
