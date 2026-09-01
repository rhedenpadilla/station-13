import { useState } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { SettingsModal } from './SettingsModal';
import { HowToPlayModal } from './HowToPlayModal';
import { EndingsGalleryModal } from '../GameUI/EndingsGalleryModal';
import { ChapterSelectModal } from './ChapterSelectModal';
import { SnapshotJournalModal } from '../GameUI/SnapshotJournalModal';
import { ObjectiveHistoryModal } from '../GameUI/ObjectiveHistoryModal';
import { OBJECTIVES } from '../../game/constants/gameData';
import {
  Play,
  Settings,
  RotateCcw,
  HelpCircle,
  LogOut,
  Search,
  Backpack,
  Award,
  Compass,
  Camera,
  Layers,
  Sparkles,
} from 'lucide-react';

export function PauseMenu() {
  const isPaused = useGameState((state) => state.isPaused);
  const resumeGame = useGameState((state) => state.resumeGame);
  const resetMainProgression = useGameState((state) => state.resetMainProgression);
  const currentObjectiveIndex = useGameState((state) => state.currentObjectiveIndex);
  const openInvestigationBoard = useGameState((state) => state.openInvestigationBoard);
  const openInventory = useGameState((state) => state.openInventory);
  const isNewGamePlus = useGameState((state) => state.isNewGamePlus);
  const isChapterReplay = useGameState((state) => state.isChapterReplay);
  const replayChapterId = useGameState((state) => state.replayChapterId);

  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showEndings, setShowEndings] = useState(false);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [showSnapshotJournal, setShowSnapshotJournal] = useState(false);
  const [showObjectiveHistory, setShowObjectiveHistory] = useState(false);

  if (!isPaused) return null;

  const currentObjective = OBJECTIVES[currentObjectiveIndex] || OBJECTIVES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-lg max-h-[92vh] bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-y-auto p-6 flex flex-col gap-4 text-center">
        {/* Title & Replay Indicators */}
        <div className="border-b border-[#334155] pb-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
              Weather Station 13 - Shift In Progress
            </span>
            {isNewGamePlus && (
              <span className="px-2 py-0.5 rounded bg-[#F5B960]/20 border border-[#F5B960]/50 text-[#F5B960] text-[9px] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> NEW GAME+
              </span>
            )}
            {isChapterReplay && (
              <span className="px-2 py-0.5 rounded bg-[#39D9E6]/20 border border-[#39D9E6]/50 text-[#39D9E6] text-[9px] font-bold flex items-center gap-1">
                <Layers className="w-3 h-3" /> CHAPTER REPLAY
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black text-[#39D9E6] uppercase tracking-wider subtle-glow">
            STATION PAUSED
          </h2>
        </div>

        {/* Directive Reminder Card */}
        <div className="bg-[#07111F] p-3 rounded-xl border border-[#1E293B] text-left text-xs space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#39D9E6] font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>ACTIVE DIRECTIVE #{currentObjective.id + 1}</span>
            </div>
            <button
              onClick={() => setShowObjectiveHistory(true)}
              className="text-[10px] text-slate-400 hover:text-[#39D9E6] underline"
            >
              View Full History
            </button>
          </div>
          <p className="font-bold text-slate-200">{currentObjective.title}</p>
          <p className="text-[11px] text-slate-400">{currentObjective.description}</p>
        </div>

        {/* Menu Buttons Grid */}
        <div className="flex flex-col gap-2">
          {/* Resume */}
          <button
            onClick={resumeGame}
            className="flex items-center justify-center gap-2.5 py-3 bg-[#102A43] hover:bg-[#1E3A8A] border-2 border-[#39D9E6]/60 rounded-xl font-bold text-sm text-slate-100 transition-all shadow-md hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 text-[#39D9E6]" />
            Resume Shift
          </button>

          {/* Quick Hub Grid: Board, Inventory, Snapshots, Objectives */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                resumeGame();
                openInvestigationBoard();
              }}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#39D9E6]/40 rounded-xl text-xs font-bold text-[#39D9E6] transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              Evidence Board [TAB]
            </button>

            <button
              onClick={() => {
                resumeGame();
                openInventory();
              }}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#F5B960]/40 rounded-xl text-xs font-bold text-[#F5B960] transition-colors"
            >
              <Backpack className="w-3.5 h-3.5" />
              Items & Keys [I]
            </button>

            <button
              onClick={() => setShowSnapshotJournal(true)}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#38BDF8]/40 rounded-xl text-xs font-bold text-[#38BDF8] transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              Snapshot Journal
            </button>

            <button
              onClick={() => setShowObjectiveHistory(true)}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#93C5FD]/40 rounded-xl text-xs font-bold text-[#93C5FD] transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              Directive History
            </button>
          </div>

          {/* Chapter Select */}
          <button
            onClick={() => setShowChapterSelect(true)}
            className="flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-xl text-xs font-bold text-[#39D9E6] transition-colors"
          >
            <Layers className="w-4 h-4" />
            Timeline Chapter Select
          </button>

          {/* Endings Gallery */}
          <button
            onClick={() => setShowEndings(true)}
            className="flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-xl text-xs font-bold text-[#F5B960] transition-colors"
          >
            <Award className="w-4 h-4" />
            Timeline Archives & Endings (3)
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-xl text-xs font-bold text-slate-200 transition-colors"
          >
            <Settings className="w-4 h-4 text-[#39D9E6]" />
            Settings & Controls Layout
          </button>

          {/* Protocols / How to Play */}
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center justify-center gap-2 py-2 bg-[#1E293B]/80 hover:bg-[#334155] border border-[#334155] rounded-xl text-xs font-bold text-slate-300 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#38BDF8]" />
            Station Protocols & Guide
          </button>

          {/* Restart Shift */}
          <button
            onClick={() => {
              if (confirm("Restart shift from the beginning? Your unlocked endings and snapshots are safe.")) {
                resetMainProgression();
                useGameState.getState().startGame();
              }
            }}
            className="flex items-center justify-center gap-2 py-2 bg-[#1E293B]/70 hover:bg-[#334155] border border-[#334155] rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Shift (Preserve Profile)
          </button>

          {/* Exit */}
          <button
            onClick={useGameState.getState().exitToTitle}
            className="flex items-center justify-center gap-2 py-2 bg-[#1E293B]/70 hover:bg-[#D94141] border border-[#334155] rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Abandon Shift & Exit to Title
          </button>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-500 border-t border-[#334155] pt-2">
          Press [ESC] in-game at any time to resume
        </div>
      </div>

      {/* Modals */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showHelp && <HowToPlayModal onClose={() => setShowHelp(false)} />}
      {showEndings && <EndingsGalleryModal onClose={() => setShowEndings(false)} />}
      {showChapterSelect && <ChapterSelectModal onClose={() => setShowChapterSelect(false)} />}
      {showSnapshotJournal && <SnapshotJournalModal onClose={() => setShowSnapshotJournal(false)} />}
      {showObjectiveHistory && <ObjectiveHistoryModal onClose={() => setShowObjectiveHistory(false)} />}
    </div>
  );
}
