import { useState } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { SettingsModal } from './SettingsModal';
import { HowToPlayModal } from './HowToPlayModal';
import { EndingsGalleryModal } from '../GameUI/EndingsGalleryModal';
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
} from 'lucide-react';

export function PauseMenu() {
  const isPaused = useGameState((state) => state.isPaused);
  const resumeGame = useGameState((state) => state.resumeGame);
  const resetGame = useGameState((state) => state.resetGame);
  const currentObjectiveIndex = useGameState((state) => state.currentObjectiveIndex);
  const openInvestigationBoard = useGameState((state) => state.openInvestigationBoard);
  const openInventory = useGameState((state) => state.openInventory);

  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showEndings, setShowEndings] = useState(false);

  if (!isPaused) return null;

  const currentObjective = OBJECTIVES[currentObjectiveIndex] || OBJECTIVES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-md bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col gap-5 text-center">
        {/* Title */}
        <div className="border-b border-[#334155] pb-3">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
            Weather Station 13 - Shift In Progress
          </span>
          <h2 className="text-2xl font-black text-[#39D9E6] uppercase tracking-wider subtle-glow">
            STATION PAUSED
          </h2>
        </div>

        {/* Directive Reminder Card */}
        <div className="bg-[#07111F] p-3 rounded-xl border border-[#1E293B] text-left text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-[#39D9E6] font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>ACTIVE DIRECTIVE #{currentObjective.id + 1}</span>
          </div>
          <p className="font-bold text-slate-200">{currentObjective.title}</p>
          <p className="text-[11px] text-slate-400">{currentObjective.description}</p>
        </div>

        {/* Menu Buttons Grid */}
        <div className="flex flex-col gap-2.5">
          {/* Resume */}
          <button
            onClick={resumeGame}
            className="flex items-center justify-center gap-2.5 py-3 bg-[#102A43] hover:bg-[#1E3A8A] border-2 border-[#39D9E6]/60 rounded-xl font-bold text-sm text-slate-100 transition-all shadow-md hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 text-[#39D9E6]" />
            Resume Shift
          </button>

          {/* Quick Hub: Board & Inventory */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                resumeGame();
                openInvestigationBoard();
              }}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#39D9E6]/40 rounded-xl text-xs font-bold text-[#39D9E6] transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              Evidence Board
            </button>

            <button
              onClick={() => {
                resumeGame();
                openInventory();
              }}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#F5B960]/40 rounded-xl text-xs font-bold text-[#F5B960] transition-colors"
            >
              <Backpack className="w-3.5 h-3.5" />
              Items & Keys
            </button>
          </div>

          {/* Endings Gallery */}
          <button
            onClick={() => setShowEndings(true)}
            className="flex items-center justify-center gap-2.5 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-xl text-xs font-bold text-[#F5B960] transition-colors"
          >
            <Award className="w-4 h-4" />
            Timeline Archives & Endings
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center gap-2.5 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-xl text-xs font-bold text-slate-200 transition-colors"
          >
            <Settings className="w-4 h-4 text-[#39D9E6]" />
            Settings & Accessibility
          </button>

          {/* Protocols / How to Play */}
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center justify-center gap-2.5 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-xl text-xs font-bold text-slate-200 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
            Station Protocols & Controls
          </button>

          {/* Restart */}
          <button
            onClick={() => {
              if (confirm("Restart shift from the beginning?")) {
                resetGame();
              }
            }}
            className="flex items-center justify-center gap-2.5 py-2 bg-[#1E293B]/70 hover:bg-[#334155] border border-[#334155] rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Shift
          </button>

          {/* Exit */}
          <button
            onClick={useGameState.getState().exitToTitle}
            className="flex items-center justify-center gap-2.5 py-2 bg-[#1E293B]/70 hover:bg-[#D94141] border border-[#334155] rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Abandon Shift & Exit to Title
          </button>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-500 border-t border-[#334155] pt-3">
          Press [ESC] in-game at any time to resume
        </div>
      </div>

      {/* Modals */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showHelp && <HowToPlayModal onClose={() => setShowHelp(false)} />}
      {showEndings && <EndingsGalleryModal onClose={() => setShowEndings(false)} />}
    </div>
  );
}
