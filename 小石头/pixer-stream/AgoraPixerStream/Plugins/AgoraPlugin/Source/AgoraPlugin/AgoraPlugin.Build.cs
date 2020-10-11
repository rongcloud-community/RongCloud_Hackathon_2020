// Copyright 1998-2019 Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;

using System.IO;

public class AgoraPlugin : ModuleRules
{
	private string ThirdPartPath
    {
        get
        {
			return Path.GetFullPath(Path.Combine(ModuleDirectory, "../ThirdParty"));
        }
    }
	public AgoraPlugin(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = ModuleRules.PCHUsageMode.UseExplicitOrSharedPCHs;
		if (Target.Platform == UnrealTargetPlatform.Win64)
		{
			//���ӿ�Ŀ¼��������
			string dll = Path.Combine(ThirdPartPath, "Agora/x64/Release/agora_rtc_sdk.dll");
			string lib = Path.Combine(ThirdPartPath, "Agora/x64/Release/agora_rtc_sdk.lib");
			string include = Path.Combine(ThirdPartPath);
			PublicAdditionalLibraries.Add(lib);
			PrivateIncludePaths.Add(include);
			PublicDelayLoadDLLs.Add(dll);
			RuntimeDependencies.Add(new RuntimeDependency(dll));
		}
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
}
