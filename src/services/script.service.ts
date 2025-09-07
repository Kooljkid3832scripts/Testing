import { Injectable, signal, WritableSignal } from '@angular/core';
import { Script } from '../models/script.model';

@Injectable({ providedIn: 'root' })
export class ScriptService {
  private scripts: WritableSignal<Script[]>;

  private readonly scriptsData: Omit<Script, 'id' | 'sourceUrl'>[] = [
    {
      title: 'Personal Scripthub',
      description: 'Your personal, unchangeable script hub. Load all your favorite scripts from one place.',
      code: `loadstring(game:HttpGet("https://pastefy.app/HcAxlRBg/raw",true))()`,
    },
    {
      title: 'Suction Trials Teleport',
      description: 'Instantly teleport directly to the Suction Trials, skipping the lobby and any obstacles.',
      code: `loadstring(game:HttpGet("https://pastefy.app/K3vHBn5F/raw",true))()`,
    },
    {
      title: 'F.L.O.W.E.R. (Patched)',
      description: 'Requires at least 15 slaps. Note: This script is currently patched.',
      code: `loadstring(game:HttpGet('https://raw.githubusercontent.com/Umbrella-Scripter/Slap-Battles/refs/heads/main/F.L.O.W.E.R.lua'))()`,
    },
    {
      title: 'Slap Battles Anti-Void',
      description: 'Prevents you from falling into the void in Slap Battles, saving you from elimination.',
      code: `loadstring(game:HttpGet("https://pastefy.app/grmz5kC7/raw",true))()`,
    },
    {
      title: 'Leaked Slap Aura',
      description: 'A leaked script that provides a slap aura, automatically slapping nearby players.',
      code: `loadstring(game:HttpGet("https://pastefy.app/I4OKwcZW/raw",true))()`,
    },
    {
      title: 'New Script Hub',
      description: 'A new, comprehensive script hub. Key required: ROBLOX-EXPLOIT',
      code: `loadstring(game:HttpGet("https://pastefy.app/AyZfqhsP/raw",true))()`,
    },
    {
      title: 'Working Sprint System',
      description: 'Adds a functional sprint system to games that lack one, increasing your movement speed.',
      code: `loadstring(game:HttpGet("https://pastefy.app/qkznUxh9/raw",true))()`,
    },
    {
      title: 'Slap Battles Killerfish Script',
      description: 'A script for the Killerfish glove, designed for use in the lobby only.',
      code: `loadstring(game:HttpGet("https://pastefy.app/Oov5Q0zI/raw",true))()`,
    },
    {
      title: 'Slap Battles Safespot',
      description: 'Find and teleport to safe spots in Slap Battles, protecting you from other players.',
      code: `loadstring(game:HttpGet("https://pastefy.app/BJ094Bja/raw",true))()`,
    },
    {
      title: 'Fake Slap Giver',
      description: 'A fake slap Giver.',
      code: `while true do
    local slaps = game.Players.LocalPlayer.leaderstats.Slaps
    slaps.Value = slaps.Value + 3
    task.wait(0.01)
end`,
    },
  ];

  constructor() {
    const processedScripts = this.scriptsData.map((script, index) => {
      const newScript: Script = {
        ...script,
        id: index + 1,
      };

      const urlRegex = /game:HttpGet\s*\(\s*["'](https?:\/\/[^"']+)["']/;
      const match = newScript.code.match(urlRegex);
      if (match && match[1]) {
        newScript.sourceUrl = match[1];
      }
      return newScript;
    });
    this.scripts = signal(processedScripts);
  }

  getScripts() {
    return this.scripts.asReadonly();
  }
}
