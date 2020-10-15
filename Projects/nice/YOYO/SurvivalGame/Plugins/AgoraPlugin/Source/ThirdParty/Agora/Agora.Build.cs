//  Copyright (c) 2019 Agora.io. All rights reserved.

using System.IO;
using UnrealBuildTool;

public class Agora : ModuleRules
{
	public Agora(ReadOnlyTargetRules Target) : base(Target)
	{
		Type = ModuleType.External;

		if (Target.Platform == UnrealTargetPlatform.Win64)
		{
			// Add the import library
			PublicSystemLibraryPaths.Add(Path.Combine(ModuleDirectory, "x64", "Release"));
			PublicAdditionalLibraries.Add(Path.Combine(ModuleDirectory, "x64", "Release","agora_rtc_sdk.lib"));

			// Delay-load the DLL, so we can load it from the right place first
			PublicDelayLoadDLLs.Add("agora_rtc_sdk.dll");
		}
        else if (Target.Platform == UnrealTargetPlatform.Mac)
        {
            PublicFrameworks.Add(Path.Combine(ModuleDirectory, "Mac", "Release", "AgoraRtcKit.framework"));
            AdditionalPropertiesForReceipt.Add(new ReceiptProperty("AgoraPlugin", Path.Combine(ModuleDirectory, "copy.xml")));
        }
        else if (Target.Platform == UnrealTargetPlatform.IOS)
        {
            PublicAdditionalLibraries.Add(Path.Combine(ModuleDirectory, "iOS", "libcrypto.a"));
 
            PublicAdditionalFrameworks.Add( new Framework( "AgoraRtcKit", Path.Combine(ModuleDirectory, "iOS", "AgoraRtcKit.framework.zip"), "" ) );

	    PublicAdditionalFrameworks.Add( new Framework( "AgoraRtcCryptoLoader", Path.Combine(ModuleDirectory, "iOS", "AgoraRtcCryptoLoader.framework.zip"), "" ) );

	    PublicAdditionalLibraries.Add ("resolv");

			PublicFrameworks.AddRange(
                		new string[] {
				"CoreML",
				"VideoToolbox",
				"Accelerate",
				"CFNetwork",
				"OpenGLES",
                		"CoreTelephony"
				}
			);
        }
    }
}
