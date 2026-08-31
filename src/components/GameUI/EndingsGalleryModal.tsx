import { useGameState } from '../../game/state/useGameState';
import { X, Award, Flame, Power, Sparkles, CheckCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function EndingsGalleryModal({ onClose }: Props) {
  const endingsUnlocked = useGameState((state) => state.endingsUnlocked);

  const unlockedCount =
    (endingsUnlocked.beacon ? 1 : 0) +
    (endingsUnlocked.silentFrequency ? 1 : 0) +
    (endingsUnlocked.unknownSignal ? 1 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-4xl bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#102A43] text-[#F5B960]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
                TIMELINE ARCHIVES & ENDINGS GALLERY
              </h2>
              <p className="text-xs text-slate-400">
                Endings Discovered: {unlockedCount} / 3 ({Math.round((unlockedCount / 3) * 100)}% Complete)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Ending Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ending A: The Beacon */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
              endingsUnlocked.beacon
                ? 'bg-[#0B132B] border-[#39D9E6]/60 shadow-[0_0_15px_rgba(57,217,230,0.2)]'
                : 'bg-[#07111F]/50 border-[#1E293B] opacity-60'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="p-2 rounded-lg bg-[#07111F] text-[#39D9E6]">
                <Flame className="w-6 h-6" />
              </div>
              {endingsUnlocked.beacon ? (
                <span className="text-[10px] text-[#63D471] bg-[#102A43] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> UNLOCKED
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 bg-[#1E293B] px-2 py-0.5 rounded">
                  LOCKED
                </span>
              )}
            </div>

            <div>
              <span className="text-[10px] text-[#39D9E6] font-bold block mb-0.5">ENDING 1</span>
              <h3 className="text-sm font-bold text-slate-100">THE BEACON</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {endingsUnlocked.beacon
                  ? "You calibrated the optical relay to 240° and engaged the high-voltage beacon. The light broke the storm and reached the stranded vessel."
                  : "Calibrate the optical beacon array and transmit emergency coordinates through the gale to illuminate the coastal waters."}
              </p>
            </div>
          </div>

          {/* Ending B: Silent Frequency */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
              endingsUnlocked.silentFrequency
                ? 'bg-[#1E1E2E] border-[#D94141]/60 shadow-[0_0_15px_rgba(217,65,65,0.2)]'
                : 'bg-[#07111F]/50 border-[#1E293B] opacity-60'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="p-2 rounded-lg bg-[#07111F] text-[#D94141]">
                <Power className="w-6 h-6" />
              </div>
              {endingsUnlocked.silentFrequency ? (
                <span className="text-[10px] text-[#63D471] bg-[#1E293B] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> UNLOCKED
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 bg-[#1E293B] px-2 py-0.5 rounded">
                  LOCKED
                </span>
              )}
            </div>

            <div>
              <span className="text-[10px] text-[#D94141] font-bold block mb-0.5">ENDING 2</span>
              <h3 className="text-sm font-bold text-slate-100">SILENT FREQUENCY</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {endingsUnlocked.silentFrequency
                  ? "You severed the 13.13 MHz carrier wave. Silence enveloped the outpost, leaving the clock frozen at 01:13 AM."
                  : "Deactivate the transceiver carrier and shut down Signal 13 to plunge the outpost into absolute silence."}
              </p>
            </div>
          </div>

          {/* Ending C: Unknown Signal */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
              endingsUnlocked.unknownSignal
                ? 'bg-[#2E1065]/60 border-[#A855F7]/70 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                : 'bg-[#07111F]/50 border-[#1E293B] opacity-60'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="p-2 rounded-lg bg-[#07111F] text-[#C084FC]">
                <Sparkles className="w-6 h-6" />
              </div>
              {endingsUnlocked.unknownSignal ? (
                <span className="text-[10px] text-[#63D471] bg-[#1E293B] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> UNLOCKED
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 bg-[#1E293B] px-2 py-0.5 rounded">
                  LOCKED
                </span>
              )}
            </div>

            <div>
              <span className="text-[10px] text-[#C084FC] font-bold block mb-0.5">ENDING 3</span>
              <h3 className="text-sm font-bold text-slate-100">UNKNOWN SIGNAL</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {endingsUnlocked.unknownSignal
                  ? "You locked the 13.13 MHz carrier across all bands, synchronizing past and present into a timeless anomaly."
                  : "Uncover optional evidence across Station 13 and resonate the carrier wave at the Upper Signal Tower to discover the true nature of the loop."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#334155] pt-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#334155] hover:bg-[#475569] text-white rounded-lg font-bold text-xs transition-colors"
          >
            Close Gallery
          </button>
        </div>
      </div>
    </div>
  );
}
