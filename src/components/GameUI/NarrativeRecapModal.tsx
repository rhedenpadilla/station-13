import { useGameState } from '../../game/state/useGameState';
import { BookOpen, Radio, CheckCircle, Flame, Power, ShieldAlert, Sparkles, X } from 'lucide-react';
import { EVIDENCE_DATABASE } from '../../game/constants/evidenceData';

export function NarrativeRecapModal() {
  const narrativeRecapOpen = useGameState((state) => state.narrativeRecapOpen);
  const closeNarrativeRecap = useGameState((state) => state.closeNarrativeRecap);
  const openChoiceModal = useGameState((state) => state.openChoiceModal);
  const evidenceUnlocked = useGameState((state) => state.evidenceUnlocked);
  const canTriggerUnknownSignal = useGameState((state) => state.canTriggerUnknownSignal());
  const isBeaconCalibrated = useGameState((state) => state.isBeaconCalibrated);

  if (!narrativeRecapOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#07111F] border-4 border-[#39D9E6]/60 rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#1E293B] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#102A43] text-[#39D9E6]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
                NARRATIVE RECAP: THE SIGNAL 13 DOSSIER
              </h2>
              <p className="text-xs text-[#39D9E6]">
                Operational Review Prior to Final Array Transmission
              </p>
            </div>
          </div>
          <button
            onClick={closeNarrativeRecap}
            className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Narrative Content */}
        <div className="my-4 overflow-y-auto pr-2 space-y-4 text-xs leading-relaxed text-slate-200">
          {/* Chapter 1: The 1986 Tragedy */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-[#1E293B]">
            <h3 className="text-sm font-bold text-[#F5B960] mb-1.5 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#F5B960]/20 text-[#F5B960] text-[10px]">
                EVENT 1
              </span>
              THE 1986 BLACK TIDE DISASTER
            </h3>
            <p className="text-slate-300">
              Thirty years ago on October 13, the freighter <strong className="text-white">S.S. Calypso</strong> went missing off the rocky shoals of Station 13. Official maritime inquiries blamed operator error for ignoring distress frequencies on 14.28 MHz.
            </p>
          </div>

          {/* Chapter 2: The Impossible Broadcast */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-[#1E293B]">
            <h3 className="text-sm font-bold text-[#39D9E6] mb-1.5 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#39D9E6]/20 text-[#39D9E6] text-[10px]">
                EVENT 2
              </span>
              THE 13.13 MHz TEMPORAL CARRIER
            </h3>
            <p className="text-slate-300">
              At 01:13 AM, an unexplained carrier wave manifested across the storm. The station clocks stalled. By recovering the 200A ceramic fuse and tuning into lost recordings, you established that the high-voltage optical beacon bridges transmissions across time itself.
            </p>
          </div>

          {/* Chapter 3: Discovered Lore Status */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-[#1E293B]">
            <h3 className="text-sm font-bold text-[#93C5FD] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#39D9E6]" />
                DISCOVERED EVIDENCE STATUS
              </span>
              <span className="text-[10px] text-[#63D471]">
                {evidenceUnlocked.length} / {Object.keys(EVIDENCE_DATABASE).length} Files Unlocked
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#63D471]" />
                <span>Primary Broadcast: 13.13 MHz</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#63D471]" />
                <span>Secondary Channel: 14.28 MHz</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                {isBeaconCalibrated ? (
                  <CheckCircle className="w-3.5 h-3.5 text-[#63D471]" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5 text-[#F5B960]" />
                )}
                <span>Beacon Calibration: {isBeaconCalibrated ? 'Optimal (100%)' : 'Pending'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                {canTriggerUnknownSignal ? (
                  <CheckCircle className="w-3.5 h-3.5 text-[#A855F7]" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-600 inline-block" />
                )}
                <span className={canTriggerUnknownSignal ? 'text-[#A855F7] font-bold' : 'text-slate-500'}>
                  Optional Lore: Unknown Signal {canTriggerUnknownSignal ? 'Unlocked' : 'Incomplete'}
                </span>
              </div>
            </div>
          </div>

          {/* Decision Preview Guide */}
          <div className="p-3 bg-[#0B132B] rounded-xl border border-[#39D9E6]/30 text-xs">
            <span className="font-bold text-[#F5B960] block mb-1">AVAILABLE FINAL OUTCOMES:</span>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-[#39D9E6] shrink-0 mt-0.5" />
                <span><strong>The Beacon:</strong> Transmit 240° optical guidance to save the vessel and end the storm.</span>
              </li>
              <li className="flex items-start gap-2">
                <Power className="w-4 h-4 text-[#D94141] shrink-0 mt-0.5" />
                <span><strong>Silent Frequency:</strong> Sever the transmitter to quiet the broadcast, resetting the 01:13 loop.</span>
              </li>
              {canTriggerUnknownSignal && (
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                  <span className="text-[#E9D5FF]"><strong>Unknown Signal (Third Ending):</strong> Resonate the 13.13 MHz carrier across the timeline to achieve absolute synchronization.</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-3 border-t border-[#1E293B]">
          <button
            onClick={closeNarrativeRecap}
            className="px-4 py-2 bg-[#1E293B] hover:bg-[#334155] text-slate-300 rounded-lg font-bold text-xs transition-colors"
          >
            Step Back
          </button>

          <button
            onClick={() => {
              closeNarrativeRecap();
              openChoiceModal();
            }}
            className="px-6 py-2.5 bg-[#39D9E6] hover:bg-[#22c55e] text-[#07111F] rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
          >
            Proceed to Final Broadcast Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
