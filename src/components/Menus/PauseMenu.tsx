import { useState } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { SettingsModal } from './SettingsModal';
import { Play, Settings, RotateCcw, HelpCircle, LogOut } from 'lucide-react';

export function PauseMenu() {
  const isPaused = useGameState((state) => state.isPaused);
  const resumeGame = useGameState((state) => state.resumeGame);
  const resetGame = useGameState((state) => state.resetGame);

  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  if (!isPaused) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono">
      <div className="relative w-full max-w-md bg-[#0F172A] border-4 border-[#334155] rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col gap-5 text-center">
        {/* Title */}
        <div className="border-b border-[#334155] pb-3">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
            Weather Station 13 - Shift In Progress
          </span>
          <h2 className="text-2xl font-black text-[#39D9E6] uppercase tracking-wider subtle-glow">
            STATION PAUSED
          </h2>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={resumeGame}
            className="flex items-center justify-center gap-2.5 py-3 bg-[#102A43] hover:bg-[#1E3A8A] border-2 border-[#39D9E6]/60 rounded-lg font-bold text-sm text-slate-100 transition-all shadow-md hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 text-[#39D9E6]" />
            Resume Shift
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center gap-2.5 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-lg text-xs font-bold text-slate-200 transition-colors"
          >
            <Settings className="w-4 h-4 text-[#F5B960]" />
            Settings & Audio
          </button>

          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center justify-center gap-2.5 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-lg text-xs font-bold text-slate-200 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#39D9E6]" />
            Station Protocols & Controls
          </button>

          <button
            onClick={resetGame}
            className="flex items-center justify-center gap-2.5 py-2.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-lg text-xs font-bold text-[#F5B960] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Shift
          </button>

          <button
            onClick={useGameState.getState().exitToTitle}
            className="flex items-center justify-center gap-2.5 py-2.5 bg-[#1E293B] hover:bg-[#D94141] border border-[#334155] rounded-lg text-xs font-bold text-slate-200 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Abandon Shift & Exit to Title
          </button>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-400 border-t border-[#334155] pt-3">
          Press [ESC] in-game at any time to pause
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="w-full max-w-lg bg-[#0F172A] border-4 border-[#334155] p-6 rounded-xl text-left space-y-4">
            <h3 className="text-base font-bold text-[#39D9E6] border-b border-[#334155] pb-2">
              STATION OPERATOR CONTROLS
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p><strong className="text-white">WASD / Arrow Keys:</strong> Move Eli Navarro</p>
              <p><strong className="text-white">Mouse:</strong> Look around (Click game canvas to lock pointer)</p>
              <p><strong className="text-white">Left Shift:</strong> Walk faster / sprint</p>
              <p><strong className="text-white">E / Left Click:</strong> Interact with radio, notes, cabinets, and fuse panels</p>
              <p><strong className="text-white">F:</strong> Toggle Flashlight</p>
              <p><strong className="text-white">ESC:</strong> Pause / Close active inspection window</p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-2 bg-[#334155] hover:bg-[#475569] text-white text-xs font-bold rounded"
            >
              Back to Pause Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
