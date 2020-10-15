

using UnrealBuildTool;
using System.Collections.Generic;

public class AgoraPixelStreamEditorTarget : TargetRules
{
	public AgoraPixelStreamEditorTarget(TargetInfo Target) : base(Target)
	{
		Type = TargetType.Editor;
		DefaultBuildSettings = BuildSettingsVersion.V2;

		ExtraModuleNames.AddRange( new string[] { "AgoraPixelStream" } );
	}
}
