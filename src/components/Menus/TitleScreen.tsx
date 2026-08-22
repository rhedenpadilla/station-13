import { useState } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { SettingsModal } from './SettingsModal';
import { Radio, Play, Settings, HelpCircle, Award, Compass, CloudRain } from 'lucide-react';

export function TitleScreen() {
  const startGame = useGameState((state) => state.startGame);
  const endingsUnlocked = useGameState((state) => state.endingsUnlocked);
  const hasCompletedBefore = useGameState((state) => state.hasCompletedBefore);

  const [showSettings, setShowSettings] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 bg-[#07111F] text-slate-100 font-mono overflow-hidden select-none">
      {/* Background Ambience styling & Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#102A43] via-[#07111F] to-black opacity-90" />
      <div className="absolute inset-0 crt-overlay pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />

      {/* Top Bar Header */}
      <div className="relative z-10 flex justify-between items-center border-b border-[#102A43] pb-4">
        <div className="flex items-center gap-2.5 text-xs text-[#39D9E6]">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>COASTAL METEOROLOGICAL STATION 13 - SECTOR D</span>
        </div>

        {/* Ending completion status badge */}
        {hasCompletedBefore && (
          <div className="flex items-center gap-3 bg-[#0F172A]/80 border border-[#1E293B] px-3.5 py-1.5 rounded-lg text-xs">
            <Award className="w-4 h-4 text-[#F5B960]" />
            <span className="text-slate-300">
              Endings Discovered: {(endingsUnlocked.beacon ? 1 : 0) + (endingsUnlocked.silentFrequency ? 1 : 0)} / 2
            </span>
          </div>
        )}
      </div>

      {/* Center Main Title Content */}
      <div className="relative z-10 max-w-2xl my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A43]/80 border border-[#39D9E6]/30 text-[#39D9E6] text-xs font-bold mb-4 animate-pulse">
          <CloudRain className="w-3.5 h-3.5" />
          <span>SEVERE STORM ADVISORY IN EFFECT</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-100 mb-2 uppercase">
          DEAD AIR: <br />
          <span className="text-[#39D9E6] subtle-glow">SIGNAL 13</span>
        </h1>

        <p className="text-sm md:text-base text-slate-300 mb-6 leading-relaxed">
          You are <strong className="text-white font-bold">Eli Navarro</strong>, night radio operator at an isolated coastal weather outpost. At precisely <span className="text-[#D94141] font-bold">01:13 AM</span>, an unidentified broadcast cuts through the static. It knows what will happen before it occurs.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <button
            onClick={startGame}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-[#39D9E6] hover:bg-[#22d3ee] text-[#07111F] rounded-xl font-bold font-mono text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(57,217,230,0.4)] hover:scale-105"
          >
            <Play className="w-5 h-5 fill-current" />
            Start Shift
          </button>

          <button
            onClick={() => setShowHowToPlay(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#102A43]/80 hover:bg-[#102A43] border border-[#39D9E6]/40 text-slate-200 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <HelpCircle className="w-4 h-4 text-[#39D9E6]" />
            How to Play
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#334155] text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Settings className="w-4 h-4 text-[#F5B960]" />
            Settings
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 border-t border-[#102A43] pt-4 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#39D9E6]" />
          <span>Atmospheric 3D Psychological Horror Slice (10–20 min)</span>
        </div>
        <div>
          <span>Headphones strongly recommended for 3D procedural audio</span>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="w-full max-w-lg bg-[#0F172A] border-4 border-[#334155] p-6 rounded-xl text-left space-y-4">
            <h3 className="text-lg font-bold text-[#39D9E6] border-b border-[#334155] pb-2">
              OPERATIONAL PROTOCOLS & CONTROLS
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <p><strong className="text-white">Movement:</strong> Use <span className="text-[#39D9E6]">[WASD]</span> or Arrow Keys to navigate the weather station.</p>
              <p><strong className="text-white">Camera:</strong> Move the mouse to look. Click the 3D screen to capture pointer lock.</p>
              <p><strong className="text-white">Interaction:</strong> Press <span className="text-[#39D9E6]">[E]</span> or left click when near interactive objects (Radio console, Logbooks, Supply cabinets, Fuse panel).</p>
              <p><strong className="text-white">Radio Tuning:</strong> Use the tuner dial to match the mysterious carrier signal at <strong className="text-[#F5B960]">13.13 MHz</strong>.</p>
              <p><strong className="text-white">Flashlight:</strong> Press <span className="text-[#39D9E6]">[F]</span> to toggle your flashlight.</p>
            </div>
            <button
              onClick={() => setShowHowToPlay(false)}
              className="w-full py-3 bg-[#39D9E6] hover:bg-[#22d3ee] text-[#07111F] text-xs font-bold rounded-lg uppercase tracking-wider"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
