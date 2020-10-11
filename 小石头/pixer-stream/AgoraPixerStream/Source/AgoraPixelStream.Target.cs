

using UnrealBuildTool;
using System.Collections.Generic;

public class AgoraPixelStreamTarget : TargetRules
{
	public AgoraPixelStreamTarget(TargetInfo Target) : base(Target)
	{
		Type = TargetType.Game;
		DefaultBuildSettings = BuildSettingsVersion.V2;

		ExtraModuleNames.AddRange( new string[] { "AgoraPixelStream" } );
	}
}
