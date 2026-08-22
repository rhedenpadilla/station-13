import { useGameState } from '../../game/state/useGameState';
import { Skull, AlertTriangle, RotateCcw } from 'lucide-react';

export function GameOverScreen() {
  const isGameOver = useGameState((state) => state.isGameOver);
  const gameOverReason = useGameState((state) => state.gameOverReason);
  const gameOverCountdown = useGameState((state) => state.gameOverCountdown);
  const resetGame = useGameState((state) => state.resetGame);

  if (!isGameOver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6 text-slate-100 font-mono animate-pulse">
      {/* Glitch CRT Overlay */}
      <div className="absolute inset-0 bg-red-950/30 mix-blend-overlay pointer-events-none animate-flicker" />
      <div className="absolute inset-0 crt-overlay pointer-events-none" />

      <div className="relative w-full max-w-xl bg-[#0F172A] border-4 border-[#D94141] rounded-2xl shadow-[0_0_50px_rgba(217,65,65,0.6)] overflow-hidden p-8 flex flex-col items-center text-center gap-5 z-10">
        {/* Pulsing Skull Icon */}
        <div className="p-4 rounded-full bg-red-950/80 text-[#D94141] border-2 border-[#D94141] shadow-[0_0_20px_#D94141]">
          <Skull className="w-12 h-12 animate-bounce" />
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#D94141] uppercase tracking-widest mb-1">
            <AlertTriangle className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>CRITICAL STATION PARADOX / REALITY FAILURE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider red-glow">
            GAME OVER
          </h1>
          <p className="text-xs text-[#F5B960] mt-1">
            STATION 13 TEMPORAL COLLAPSE - 01:13 AM
          </p>
        </div>

        {/* Horror Lore / Cause */}
        <div className="bg-[#07111F] border border-red-900/60 p-4 rounded-xl text-xs text-slate-300 leading-relaxed text-left w-full">
          <p className="text-[#D94141] font-bold mb-1">
            [TRANSMISSION INTERRUPTED]:
          </p>
          <p className="italic">
            "{gameOverReason || "The anomalous frequency tore through the station's electrical shielding. The cycle failed to hold."}"
          </p>
          <p className="mt-2 text-[11px] text-slate-400">
            Eli Navarro's consciousness collapses back to the beginning of the storm shift...
          </p>
        </div>

        {/* Auto-Reset Countdown */}
        <div className="w-full bg-red-950/40 border border-red-800/50 py-3 px-4 rounded-lg flex items-center justify-between text-xs">
          <span className="text-slate-300">AUTOMATIC TIMELINE REBOOT:</span>
          <span className="text-lg font-black text-[#D94141] animate-ping">
            {gameOverCountdown}s
          </span>
        </div>

        {/* Manual Reset Button */}
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-3 bg-[#D94141] hover:bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
        >
          <RotateCcw className="w-4 h-4" />
          Reboot Shift Now
        </button>
      </div>
    </div>
  );
}
