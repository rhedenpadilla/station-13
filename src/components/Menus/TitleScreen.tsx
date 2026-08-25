import { useState } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { SettingsModal } from './SettingsModal';
import { HowToPlayModal } from './HowToPlayModal';
import { EndingsGalleryModal } from '../GameUI/EndingsGalleryModal';
import { LoadingScreen } from './LoadingScreen';
import { Radio, Play, Settings, HelpCircle, Award, Compass, CloudRain, ShieldCheck } from 'lucide-react';

export function TitleScreen() {
  const startGame = useGameState((state) => state.startGame);
  const endingsUnlocked = useGameState((state) => state.endingsUnlocked);
  const hasCompletedBefore = useGameState((state) => state.hasCompletedBefore);

  const [showSettings, setShowSettings] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showEndings, setShowEndings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    startGame();
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  const unlockedCount = (endingsUnlocked.beacon ? 1 : 0) + (endingsUnlocked.silentFrequency ? 1 : 0);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-10 bg-[#07111F] text-slate-100 font-mono overflow-hidden select-none">
      {/* Radial Gradient Background & Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#102A43] via-[#07111F] to-black opacity-90 pointer-events-none" />
      <div className="absolute inset-0 crt-overlay pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />

      {/* Top Bar Header */}
      <div className="relative z-10 flex justify-between items-center border-b border-[#102A43] pb-4">
        <div className="flex items-center gap-2.5 text-xs text-[#39D9E6]">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>COASTAL METEOROLOGICAL STATION 13 • PHASE 2 EDITION</span>
        </div>

        {/* Endings Badge */}
        <button
          onClick={() => setShowEndings(true)}
          className="flex items-center gap-2.5 bg-[#0F172A]/90 hover:bg-[#102A43] border border-[#1E293B] hover:border-[#F5B960]/50 px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-md"
        >
          <Award className="w-4 h-4 text-[#F5B960]" />
          <span className="text-slate-300">
            Endings Discovered: <strong className="text-[#F5B960]">{unlockedCount} / 2</strong>
          </span>
        </button>
      </div>

      {/* Center Main Title Content */}
      <div className="relative z-10 max-w-2xl my-auto py-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A43]/80 border border-[#39D9E6]/30 text-[#39D9E6] text-xs font-bold mb-4 animate-pulse">
          <CloudRain className="w-3.5 h-3.5" />
          <span>SEVERE GALE-FORCE ADVISORY IN EFFECT</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-100 mb-2 uppercase">
          DEAD AIR: <br />
          <span className="text-[#39D9E6] subtle-glow">SIGNAL 13</span>
        </h1>

        <p className="text-sm md:text-base text-slate-300 mb-6 leading-relaxed">
          You are <strong className="text-white font-bold">Eli Navarro</strong>, night radio operator at an isolated coastal weather outpost. At precisely <span className="text-[#D94141] font-bold">01:13 AM</span>, an unidentified broadcast cuts through the static. Uncover the 1986 Black Tide disaster, calibrate the optical beacon array, and break the timeline.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 items-stretch sm:items-center">
          <button
            onClick={handleStart}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-[#39D9E6] hover:bg-[#22d3ee] text-[#07111F] rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(57,217,230,0.4)] hover:scale-105"
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
            onClick={() => setShowEndings(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#334155] text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Award className="w-4 h-4 text-[#F5B960]" />
            Endings Gallery
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#334155] text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Settings className="w-4 h-4 text-[#39D9E6]" />
            Settings
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 border-t border-[#102A43] pt-4 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#39D9E6]" />
          <span>Full 3D Mystery-Horror Experience • Keyboard, Mouse & Touch Supported</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#63D471]" />
          <span>Autosave Enabled (Local Storage)</span>
        </div>
      </div>

      {/* Modals */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      {showEndings && <EndingsGalleryModal onClose={() => setShowEndings(false)} />}
    </div>
  );
}
