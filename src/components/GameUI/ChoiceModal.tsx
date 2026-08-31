import { useGameState } from '../../game/state/useGameState';
import { Radio, Power, Flame, Zap, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export function ChoiceModal() {
  const choiceModalOpen = useGameState((state) => state.choiceModalOpen);
  const triggerEnding = useGameState((state) => state.triggerEnding);
  const closeChoiceModal = useGameState((state) => state.closeChoiceModal);
  const isBeaconCalibrated = useGameState((state) => state.isBeaconCalibrated);
  const openBeaconCalibration = useGameState((state) => state.openBeaconCalibration);
  const openNarrativeRecap = useGameState((state) => state.openNarrativeRecap);
  const canTriggerUnknownSignal = useGameState((state) => state.canTriggerUnknownSignal());

  if (!choiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-3xl bg-[#0F172A] border-4 border-[#39D9E6]/60 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-7 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#334155] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#102A43] rounded-xl text-[#39D9E6]">
              <Radio className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wider uppercase flex items-center gap-2">
                SIGNAL 13 - FINAL TRANSMISSION
              </h2>
              <p className="text-xs text-[#39D9E6]">
                Auxiliary Generator Online • Beacon Array Optical Circuit Synchronized
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              closeChoiceModal();
              openNarrativeRecap();
            }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] text-[#93C5FD] border border-[#334155] rounded-lg text-xs transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#39D9E6]" />
            <span>Review Recap</span>
          </button>
        </div>

        {/* Narrative Context */}
        <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] text-xs md:text-sm text-slate-200 leading-relaxed">
          <p className="mb-1.5 text-[#F5B960] font-bold">
            &gt; "Station 13... The storm has peaked. Transmit your final directive to the dark."
          </p>
          <p className="text-xs text-slate-400">
            Emergency power feeds the upper optical array. You have pieced together the fragments of the 1986 incident and the 01:13 AM loop. Decide how Signal 13 concludes.
          </p>

          {isBeaconCalibrated && (
            <div className="mt-2 p-2 bg-[#0B132B] rounded-lg border border-[#1E3A8A] text-xs text-[#63D471] flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>BEACON OPTICAL RELAY CALIBRATED (240° AZIMUTH / 85% GAIN)</span>
            </div>
          )}
        </div>

        {/* The Choice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Option A: Activate Emergency Beacon */}
          <button
            onClick={() => triggerEnding('BEACON')}
            className="group flex flex-col text-left p-4 bg-[#102A43]/70 hover:bg-[#102A43] border-2 border-[#39D9E6]/40 hover:border-[#39D9E6] rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(57,217,230,0.3)] hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-[#07111F] text-[#39D9E6] group-hover:scale-110 transition-transform">
                <Flame className="w-5 h-5" />
              </span>
              <span className="text-[10px] bg-[#39D9E6]/20 text-[#39D9E6] px-2 py-0.5 rounded font-bold">
                OPTION A
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-[#39D9E6] transition-colors">
              ENGAGE BEACON
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-normal">
              Transmit optical coordinates at 240°. Illuminate the Black Tide Shoals and complete the timeline.
            </p>
          </button>

          {/* Option B: Shut Down Radio Frequency */}
          <button
            onClick={() => triggerEnding('SILENT_FREQUENCY')}
            className="group flex flex-col text-left p-4 bg-[#1E293B]/70 hover:bg-[#1E293B] border-2 border-[#D94141]/40 hover:border-[#D94141] rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(217,65,65,0.3)] hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-[#07111F] text-[#D94141] group-hover:scale-110 transition-transform">
                <Power className="w-5 h-5" />
              </span>
              <span className="text-[10px] bg-[#D94141]/20 text-[#D94141] px-2 py-0.5 rounded font-bold">
                OPTION B
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-[#D94141] transition-colors">
              SEVER FREQUENCY
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-normal">
              Cut the 13.13 MHz carrier. Disconnect the receiver array and plunge the station into total silence.
            </p>
          </button>

          {/* Option C: Resonate Unknown Signal (Unlocked if optional evidence collected) */}
          <button
            onClick={() => {
              if (canTriggerUnknownSignal) triggerEnding('UNKNOWN_SIGNAL');
            }}
            disabled={!canTriggerUnknownSignal}
            className={`group flex flex-col text-left p-4 rounded-xl transition-all shadow-lg ${
              canTriggerUnknownSignal
                ? 'bg-[#2E1065]/70 hover:bg-[#2E1065] border-2 border-[#A855F7]/50 hover:border-[#C084FC] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:scale-[1.02] cursor-pointer'
                : 'bg-[#1E293B]/40 border-2 border-[#334155] opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-[#07111F] text-[#C084FC] group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </span>
              <span className="text-[10px] bg-[#A855F7]/20 text-[#C084FC] px-2 py-0.5 rounded font-bold">
                OPTION C
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-[#C084FC] transition-colors">
              UNKNOWN SIGNAL
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-normal">
              {canTriggerUnknownSignal
                ? "Resonate 13.13 MHz across all bands. Permanently anchor the timeline paradox."
                : "Locked: Collect optional evidence (Cassette B / Dossier logs) to decipher the third frequency."}
            </p>
          </button>
        </div>

        {/* Back / Recap / Calibration link */}
        <div className="flex flex-wrap justify-between items-center pt-2 border-t border-[#334155] text-xs gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                closeChoiceModal();
                openBeaconCalibration();
              }}
              className="text-[#39D9E6] hover:underline flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Beacon Calibration Terminal</span>
            </button>

            <button
              onClick={() => {
                closeChoiceModal();
                openNarrativeRecap();
              }}
              className="text-[#F5B960] hover:underline flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Review Narrative Dossier</span>
            </button>
          </div>

          <button
            onClick={closeChoiceModal}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            Step Away [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
