// Fill out your copyright notice in the Description page of Project Settings.


#include "FSTAudioCapture.h"
#include "AgoraVideoComponent.h"
FSTAudioCapture::FSTAudioCapture()
{
}

FSTAudioCapture::~FSTAudioCapture()
{
}

int FSTAudioCapture::Init()
{
	if (bInitialized)
		return 0;
	// subscribe to audio data
	if (!GEngine)
	{
		return -1;
	}
	auto AudioDevice = GEngine->GetMainAudioDevice();
	if (!AudioDevice)
	{
		return -1;
	}
	bInitialized = true;
	AudioDevice->RegisterSubmixBufferListener(this);
	bRecordingInitialized = true;
	UE_LOG(LogTemp, Log, TEXT("[audio capture] Init"));
	return 0;
}

void FSTAudioCapture::OnNewSubmixBuffer(const USoundSubmix* OwningSubmix, float* AudioData, int32 NumSamples, int32 NumChannels, const int32 SampleRate, double AudioClock)
{
	if (!(bInitialized && bRecordingInitialized))
	{
		return;
	}
	// Only 48000hz supported for now
	if (48000 != SampleRate)
	{
		// Only report the problem once
		if (!bFormatChecked)
		{
			bFormatChecked = true;
			UE_LOG(LogTemp, Error, TEXT("Audio samplerate needs to be 48000hz"));
		}
		return;
	}
	if (48000 == SampleRate)return;
	Audio::TSampleBuffer<float> Buffer(AudioData, NumSamples, InNumChannels, SampleRate);
	// Mix to stereo if required, since PixelStreaming only accepts stereo at the moment
	if (Buffer.GetNumChannels() != NumChannels)
	{
		Buffer.MixBufferToChannels(NumChannels);
	}
	// Convert to signed PCM 16-bits
	PCM16.Reset(Buffer.GetNumSamples());
	PCM16.AddZeroed(Buffer.GetNumSamples());
	const float* Ptr = reinterpret_cast<const float*>(Buffer.GetData());
	for (int16& S : PCM16)
	{
		int32 N = *Ptr >= 0 ? *Ptr * int32(MAX_int16) : *Ptr * (int32(MAX_int16) + 1);
		S = static_cast<int16>(FMath::Clamp(N, int32(MIN_int16), int32(MAX_int16)));
		Ptr++;
	}

	RecordingBuffer.Append(reinterpret_cast<const uint8*>(PCM16.GetData()), PCM16.Num() * sizeof(PCM16[0]));
	int BytesPer10Ms = (SampleRate * NumChannels * static_cast<int>(sizeof(uint16))) / 100;
	// Feed in 10ms chunks
	while (RecordingBuffer.Num() >= BytesPer10Ms)
	{
		{
			//FScopeLock Lock(&DeviceBufferCS);
			auto RTCEngine = AgoraComp->RtcEnginePtr;
			if (RTCEngine.Get())
			{
				agora::media::IAudioFrameObserver::AudioFrame externalAudioFrame;
				externalAudioFrame.type = agora::media::IAudioFrameObserver::FRAME_TYPE_PCM16;
				externalAudioFrame.samples = BytesPer10Ms / (sizeof(uint16) * NumChannels);
				externalAudioFrame.bytesPerSample = 2;
				externalAudioFrame.channels = NumChannels;
				externalAudioFrame.samplesPerSec = SampleRate;
				externalAudioFrame.buffer = RecordingBuffer.GetData();
				externalAudioFrame.renderTimeMs = 10;
				AgoraComp->MediaEnginePtr->pushAudioFrame(&externalAudioFrame);
			}
		}
		RecordingBuffer.RemoveAt(0, BytesPer10Ms, false);
	}
}
