import { useGameState } from '../../game/state/useGameState';
import { Flame, Power, Sparkles, RotateCcw, Award, CheckCircle } from 'lucide-react';

export function EndingScreen() {
  const activeEnding = useGameState((state) => state.activeEnding);
  const endingsUnlocked = useGameState((state) => state.endingsUnlocked);
  const resetGame = useGameState((state) => state.resetGame);

  if (!activeEnding) return null;

  const isBeacon = activeEnding === 'BEACON';
  const isSilent = activeEnding === 'SILENT_FREQUENCY';
  const isUnknown = activeEnding === 'UNKNOWN_SIGNAL';

  const getEndingBadge = () => {
    if (isBeacon) {
      return (
        <div className="p-4 rounded-2xl bg-[#102A43] text-[#39D9E6] shadow-[0_0_30px_rgba(57,217,230,0.4)]">
          <Flame className="w-12 h-12" />
        </div>
      );
    }
    if (isSilent) {
      return (
        <div className="p-4 rounded-2xl bg-[#1E293B] text-[#D94141] shadow-[0_0_30px_rgba(217,65,65,0.4)]">
          <Power className="w-12 h-12" />
        </div>
      );
    }
    return (
      <div className="p-4 rounded-2xl bg-[#2E1065] text-[#C084FC] shadow-[0_0_30px_rgba(192,132,252,0.4)] animate-pulse">
        <Sparkles className="w-12 h-12" />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6 animate-fade-in text-slate-100 select-none font-mono">
      <div className="relative w-full max-w-2xl bg-[#07111F] border-4 border-[#102A43] rounded-2xl shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center gap-6">
        {/* Glow Header Badge */}
        {getEndingBadge()}

        {/* Ending Titles */}
        <div>
          <span className="text-xs tracking-widest text-slate-400 uppercase block mb-1">
            Weather Station 13 - Shift Concluded
          </span>
          <h1
            className={`text-2xl md:text-3xl font-black tracking-wider uppercase ${
              isBeacon
                ? 'text-[#39D9E6] subtle-glow'
                : isSilent
                ? 'text-[#D94141] red-glow'
                : 'text-[#C084FC] text-glow'
            }`}
          >
            {isBeacon && 'ENDING A: THE BEACON'}
            {isSilent && 'ENDING B: SILENT FREQUENCY'}
            {isUnknown && 'ENDING C: UNKNOWN SIGNAL'}
          </h1>
          <p className="text-sm text-[#F5B960] mt-1">
            {isBeacon && 'The Beacon Circuit Calibrated & Restored'}
            {isSilent && 'The Carrier Wave Terminated Into Silence'}
            {isUnknown && 'The 13.13 MHz Temporal Loop Synchronized'}
          </p>
        </div>

        {/* Narrative Wrap-up */}
        <div className="bg-[#0F172A] border border-[#1E293B] p-5 rounded-xl text-left text-sm text-slate-300 leading-relaxed">
          {isBeacon && (
            <p>
              You engaged the optical beacon array at precisely 240° Azimuth. The blinding high-voltage beam cut through the gale-force squalls, piercing the darkness over the Black Tide Trench. Across the raging waves, the stranded 1986 vessel acknowledged the signal before slipping safely past the shoals. Outside, the rain softens, the distant sea light vanishes, and the mechanical station clock clicks forward past <strong className="text-white">01:13 AM</strong> for the first time.
            </p>
          )}
          {isSilent && (
            <p>
              You cut the transmitter breaker. The 13.13 MHz broadcast collapsed into icy static. Outside, the eerie light far out at sea vanished instantly. The entire outpost plunged into total silence, save for the rain drumming on the metal roof. On the wall behind you, the mechanical clock clicks back to <span className="text-[#D94141] font-bold">01:13 AM</span>... and begins its restless loop anew.
            </p>
          )}
          {isUnknown && (
            <p>
              You pushed the transceiver directly into the impossible 13.13 MHz carrier wave. The high-altitude quartz oscillator hummed with violet resonance. Outside, the frozen squalls hung suspended in mid-air above the Black Tide Shoals. In the distance, the lights of Station 13 in 1986 and tonight fused into a singular glowing beacon. The transmission did not end—it became timeless.
            </p>
          )}
        </div>

        {/* Endings Collected Tracker */}
        <div className="w-full bg-[#0F172A] border border-[#1E293B] p-4 rounded-xl flex flex-wrap items-center justify-around text-xs gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#F5B960]" />
            <span className="text-slate-400">DISCOVERED ENDINGS:</span>
          </div>

          <div className="flex items-center gap-2">
            {endingsUnlocked.beacon ? (
              <CheckCircle className="w-4 h-4 text-[#39D9E6]" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-full border border-slate-600" />
            )}
            <span className={endingsUnlocked.beacon ? 'text-[#39D9E6] font-bold' : 'text-slate-500'}>
              [Ending A: The Beacon]
            </span>
          </div>

          <div className="flex items-center gap-2">
            {endingsUnlocked.silentFrequency ? (
              <CheckCircle className="w-4 h-4 text-[#D94141]" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-full border border-slate-600" />
            )}
            <span className={endingsUnlocked.silentFrequency ? 'text-[#D94141] font-bold' : 'text-slate-500'}>
              [Ending B: Silent Frequency]
            </span>
          </div>

          <div className="flex items-center gap-2">
            {endingsUnlocked.unknownSignal ? (
              <CheckCircle className="w-4 h-4 text-[#C084FC]" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-full border border-slate-600" />
            )}
            <span className={endingsUnlocked.unknownSignal ? 'text-[#C084FC] font-bold' : 'text-slate-500'}>
              [Ending C: Unknown Signal]
            </span>
          </div>
        </div>

        {/* Play Again Button */}
        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-8 py-3.5 bg-[#39D9E6] hover:bg-[#22c55e] text-[#07111F] rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Play Shift Again
          </button>
        </div>
      </div>
    </div>
  );
}
