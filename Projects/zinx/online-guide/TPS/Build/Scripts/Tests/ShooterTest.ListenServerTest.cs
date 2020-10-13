// Copyright Epic Games, Inc.All Rights Reserved.
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EpicGame;
using Gauntlet;

namespace ShooterTest
{
	/// <summary>
	/// This tests a listen server and a client that opens a client that searches the server and enters.
	/// </summary>
	public class ListenServerTest : UnrealTestNode<ShooterTestConfig>
	{
		public ListenServerTest(UnrealTestContext InContext) : base(InContext)
		{
		}

		public override ShooterTestConfig GetConfiguration()
		{
			ShooterTestConfig Config = base.GetConfiguration();
			Config.PreAssignAccount = false;
			Config.NoMCP = true;

			IEnumerable<UnrealTestRole> Clients = Config.RequireRoles(UnrealTargetRole.Client, 2);
			Clients.ElementAt(0).Controllers.Add("ListenServerHost");
			Clients.ElementAt(0).CommandLine += " -log";
			Clients.ElementAt(1).Controllers.Add("ListenServerClient");
			Clients.ElementAt(1).CommandLine += " -log";

			return Config;
		}
	}
}
