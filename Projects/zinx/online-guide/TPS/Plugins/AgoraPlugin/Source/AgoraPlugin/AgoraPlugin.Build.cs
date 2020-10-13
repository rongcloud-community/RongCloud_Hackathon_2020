// Copyright 1998-2019 Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;

using System.IO;

public class AgoraPlugin : ModuleRules
{
	public AgoraPlugin(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = ModuleRules.PCHUsageMode.UseExplicitOrSharedPCHs;
		if (Target.Platform == UnrealTargetPlatform.Win64)
		{
			string lib = Path.Combine(ThirdPartyPath, "Agora/x64/Release/agora_rtc_sdk.lib");
			string dll = Path.Combine(ThirdPartyPath, "Agora/x64/Release/agora_rtc_sdk.dll");
			string include = ThirdPartyPath;
			PublicAdditionalLibraries.Add(lib);
			PublicDelayLoadDLLs.Add(dll);
			RuntimeDependencies.Add(new RuntimeDependency(dll));
			PublicIncludePaths.Add(include);
		};
		PublicIncludePaths.AddRange(
			new string[] {
				// ... add public include paths required here ...
            }
			);
			
		
		PublicDependencyModuleNames.AddRange(
			new string[]
			{
				"Core",
				"Agora",
                "Projects"
				// ... add other public dependencies that you statically link with here ...
				, "CoreUObject"
				, "Engine"
				, "Slate"
				,"RHI"
				,"UMG"
				,"Slate"
				,"SlateCore"
			}
			);
			
		
		PrivateDependencyModuleNames.AddRange(
			new string[]
			{
				// ... add private dependencies that you statically link with here ...	
			}
			);
		
		
		DynamicallyLoadedModuleNames.AddRange(
			new string[]
			{
				// ... add any modules that your module loads dynamically here ...
            }
			);

        if(Target.Platform == UnrealTargetPlatform.Mac)
        {
           // PublicAdditionalLibraries.Add ("resolv");

            PublicFrameworks.AddRange(
                new string[] {
                    "AppKit",
                    "IOKit",
                    "CoreVideo",
                    "CFNetwork",
                    "OpenGl",
                    "CoreGraphics",
                  //  "Accelerate",
                    "CoreFoundation",
                  //  "SystemConfiguration",
                    "AudioToolbox",
                  //  "VideoToolbox",
                    "CoreTelephony",
                   // "CoreWLAN",
                    "AVFoundation",
                    "CoreMedia",
                    "CoreAudio"
                });
        }
	}
	private string ThirdPartyPath
    {
        get
        {
			return Path.Combine(ModuleDirectory, "../ThirdParty");

		}
    }
}
