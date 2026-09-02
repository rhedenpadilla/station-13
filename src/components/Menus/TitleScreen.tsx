import { useState } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { SettingsModal } from './SettingsModal';
import { HowToPlayModal } from './HowToPlayModal';
import { EndingsGalleryModal } from '../GameUI/EndingsGalleryModal';
import { ChapterSelectModal } from './ChapterSelectModal';
import { SnapshotJournalModal } from '../GameUI/SnapshotJournalModal';
import { LoadingScreen } from './LoadingScreen';
import {
  Radio,
  Play,
  Settings,
  HelpCircle,
  Award,
  Compass,
  CloudRain,
  ShieldCheck,
  Sparkles,
  Camera,
  Layers,
  Lock,
} from 'lucide-react';

export function TitleScreen() {
  const startGame = useGameState((state) => state.startGame);
  const startNewGamePlus = useGameState((state) => state.startNewGamePlus);
  const endingsUnlocked = useGameState((state) => state.endingsUnlocked);
  const hasCompletedBefore = useGameState((state) => state.hasCompletedBefore);
  const snapshots = useGameState((state) => state.snapshots);

  const [showSettings, setShowSettings] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showEndings, setShowEndings] = useState(false);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [showSnapshotJournal, setShowSnapshotJournal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingStartMode, setPendingStartMode] = useState<'STANDARD' | 'NG_PLUS'>('STANDARD');

  const hasAnyEnding =
    hasCompletedBefore ||
    endingsUnlocked.beacon ||
    endingsUnlocked.silentFrequency ||
    endingsUnlocked.unknownSignal;

  const unlockedCount =
    (endingsUnlocked.beacon ? 1 : 0) +
    (endingsUnlocked.silentFrequency ? 1 : 0) +
    (endingsUnlocked.unknownSignal ? 1 : 0);

  const handleStartStandard = () => {
    setPendingStartMode('STANDARD');
    setIsLoading(true);
  };

  const handleStartNGPlus = () => {
    if (!hasAnyEnding) return;
    setPendingStartMode('NG_PLUS');
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (pendingStartMode === 'NG_PLUS') {
      startNewGamePlus();
    } else {
      startGame();
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-10 bg-[#07111F] text-slate-100 font-mono overflow-hidden select-none">
      {/* Radial Gradient Background & Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#102A43] via-[#07111F] to-black opacity-90 pointer-events-none" />
      <div className="absolute inset-0 crt-overlay pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />

      {/* Top Bar Header */}
      <div className="relative z-10 flex flex-wrap justify-between items-center border-b border-[#102A43] pb-4 gap-2">
        <div className="flex items-center gap-2.5 text-xs text-[#39D9E6]">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>COASTAL METEOROLOGICAL STATION 13 • TRANSMISSION ARCHIVE (RELEASE EDITION)</span>
        </div>

        {/* Top Badges: Endings & Snapshots */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSnapshotJournal(true)}
            className="flex items-center gap-2 bg-[#0F172A]/90 hover:bg-[#102A43] border border-[#1E293B] hover:border-[#38BDF8]/50 px-3 py-1.5 rounded-xl text-xs transition-all shadow-md"
          >
            <Camera className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-slate-300">
              Snapshots: <strong className="text-[#38BDF8]">{snapshots.length} / 9</strong>
            </span>
          </button>

          <button
            onClick={() => setShowEndings(true)}
            className="flex items-center gap-2 bg-[#0F172A]/90 hover:bg-[#102A43] border border-[#1E293B] hover:border-[#F5B960]/50 px-3 py-1.5 rounded-xl text-xs transition-all shadow-md"
          >
            <Award className="w-4 h-4 text-[#F5B960]" />
            <span className="text-slate-300">
              Endings: <strong className="text-[#F5B960]">{unlockedCount} / 3</strong>
            </span>
          </button>
        </div>
      </div>

      {/* Center Main Title Content */}
      <div className="relative z-10 max-w-2xl my-auto py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A43]/80 border border-[#39D9E6]/30 text-[#39D9E6] text-xs font-bold mb-3 animate-pulse">
          <CloudRain className="w-3.5 h-3.5" />
          <span>SEVERE GALE-FORCE ADVISORY IN EFFECT</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-100 mb-2 uppercase">
          DEAD AIR: <br />
          <span className="text-[#39D9E6] subtle-glow">SIGNAL 13</span>
        </h1>

        <p className="text-xs md:text-sm text-slate-300 mb-5 leading-relaxed">
          You are <strong className="text-white font-bold">Eli Navarro</strong>, night radio operator at an isolated coastal weather outpost. At precisely <span className="text-[#D94141] font-bold">01:13 AM</span>, an unidentified broadcast cuts through the static. Uncover the 1986 Black Tide disaster, calibrate the optical beacon array, and break the timeline.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 items-stretch sm:items-center">
          {/* Start Shift */}
          <button
            onClick={handleStartStandard}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#39D9E6] hover:bg-[#22d3ee] text-[#07111F] rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(57,217,230,0.4)] hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            Start Shift
          </button>

          {/* New Game+ */}
          <button
            onClick={handleStartNGPlus}
            disabled={!hasAnyEnding}
            className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              hasAnyEnding
                ? 'bg-[#102A43] hover:bg-[#1E3A8A] border-[#F5B960]/60 text-[#F5B960] shadow-[0_0_15px_rgba(245,185,96,0.3)] hover:scale-105 cursor-pointer'
                : 'bg-[#0F172A]/50 border-[#1E293B] text-slate-500 opacity-60 cursor-not-allowed'
            }`}
            title={
              hasAnyEnding
                ? 'Restart story with persistent discoveries & deterministic replay variations'
                : 'Complete at least one ending to unlock New Game+'
            }
          >
            {hasAnyEnding ? <Sparkles className="w-4 h-4 text-[#F5B960]" /> : <Lock className="w-4 h-4" />}
            New Game+
          </button>

          {/* Chapter Select */}
          <button
            onClick={() => setShowChapterSelect(true)}
            disabled={!hasAnyEnding}
            className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              hasAnyEnding
                ? 'bg-[#1E293B] hover:bg-[#334155] border-[#39D9E6]/40 text-[#39D9E6] cursor-pointer'
                : 'bg-[#0F172A]/50 border-[#1E293B] text-slate-500 opacity-60 cursor-not-allowed'
            }`}
            title={
              hasAnyEnding
                ? 'Replay specific timeline chapters safely'
                : 'Complete at least one ending to unlock Chapter Select'
            }
          >
            <Layers className="w-4 h-4" />
            Chapter Select
          </button>

          {/* Snapshot Journal */}
          <button
            onClick={() => setShowSnapshotJournal(true)}
            className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#334155] text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Camera className="w-4 h-4 text-[#38BDF8]" />
            Snapshots
          </button>

          {/* How to Play */}
          <button
            onClick={() => setShowHowToPlay(true)}
            className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#334155] text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <HelpCircle className="w-4 h-4 text-[#39D9E6]" />
            Protocols
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#334155] text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Settings className="w-4 h-4 text-[#39D9E6]" />
            Settings
          </button>
        </div>

        {/* Short NG+ Explanatory Note */}
        {hasAnyEnding && (
          <p className="text-[11px] text-[#F5B960] mt-3 bg-[#102A43]/50 border border-[#F5B960]/20 px-3 py-1.5 rounded-lg inline-block">
            ✦ <strong>New Game+ Ready:</strong> Restarts the story while preserving unlocked endings, evidence archive, and snapshot journal entries with authored variations.
          </p>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 border-t border-[#102A43] pt-4 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#39D9E6]" />
          <span>Full 3D Mystery-Horror • Replay & Chapter Select Enabled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#63D471]" />
          <span>Autosave & Save Migration V4 Active</span>
        </div>
      </div>

      {/* Modals */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      {showEndings && <EndingsGalleryModal onClose={() => setShowEndings(false)} />}
      {showChapterSelect && <ChapterSelectModal onClose={() => setShowChapterSelect(false)} />}
      {showSnapshotJournal && <SnapshotJournalModal onClose={() => setShowSnapshotJournal(false)} />}
    </div>
  );
}
