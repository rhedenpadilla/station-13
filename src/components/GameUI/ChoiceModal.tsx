import { useGameState } from '../../game/state/useGameState';
import { Radio, Power, Flame, Zap, CheckCircle2 } from 'lucide-react';

export function ChoiceModal() {
  const choiceModalOpen = useGameState((state) => state.choiceModalOpen);
  const triggerEnding = useGameState((state) => state.triggerEnding);
  const closeChoiceModal = useGameState((state) => state.closeChoiceModal);
  const isBeaconCalibrated = useGameState((state) => state.isBeaconCalibrated);
  const openBeaconCalibration = useGameState((state) => state.openBeaconCalibration);

  if (!choiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border-4 border-[#39D9E6]/60 rounded-2xl shadow-2xl overflow-hidden p-7 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#334155] pb-4">
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

        {/* Narrative Context */}
        <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] text-sm text-slate-200 leading-relaxed">
          <p className="mb-2 text-[#F5B960] font-bold">
            &gt; "Station 13... The perimeter is collapsing. Choose what you broadcast to the dark."
          </p>
          <p className="text-xs text-slate-400">
            Emergency power is now feeding into the high-voltage transmitter array. You have uncovered the truth of the 1986 Black Tide Incident. You must make your final operational choice.
          </p>

          {isBeaconCalibrated && (
            <div className="mt-2.5 p-2 bg-[#0B132B] rounded-lg border border-[#1E3A8A] text-xs text-[#63D471] flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>BEACON OPTICAL RELAY CALIBRATED (240° AZIMUTH / 85% GAIN)</span>
            </div>
          )}
        </div>

        {/* The Two Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A: Activate Emergency Beacon */}
          <button
            onClick={() => triggerEnding('BEACON')}
            className="group flex flex-col text-left p-5 bg-[#102A43]/70 hover:bg-[#102A43] border-2 border-[#39D9E6]/40 hover:border-[#39D9E6] rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(57,217,230,0.3)] hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-lg bg-[#07111F] text-[#39D9E6] group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </span>
              <span className="text-[10px] bg-[#39D9E6]/20 text-[#39D9E6] px-2 py-0.5 rounded font-bold">
                OPTION A
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-[#39D9E6] transition-colors">
              ENGAGE BEACON
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-normal">
              Transmit maximum-power optical coordinates into the gale. Illuminate the Black Tide Shoals and complete the timeline.
            </p>
          </button>

          {/* Option B: Shut Down Radio Frequency */}
          <button
            onClick={() => triggerEnding('SILENT_FREQUENCY')}
            className="group flex flex-col text-left p-5 bg-[#1E293B]/70 hover:bg-[#1E293B] border-2 border-[#D94141]/40 hover:border-[#D94141] rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(217,65,65,0.3)] hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-lg bg-[#07111F] text-[#D94141] group-hover:scale-110 transition-transform">
                <Power className="w-6 h-6" />
              </span>
              <span className="text-[10px] bg-[#D94141]/20 text-[#D94141] px-2 py-0.5 rounded font-bold">
                OPTION B
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-[#D94141] transition-colors">
              SEVER FREQUENCY
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-normal">
              Cut the 13.13 MHz broadcast carrier. Disconnect the receiver array and plunge Station 13 into total silence.
            </p>
          </button>
        </div>

        {/* Back / Re-calibrate */}
        <div className="flex justify-between items-center pt-2 border-t border-[#334155] text-xs">
          <button
            onClick={() => {
              closeChoiceModal();
              openBeaconCalibration();
            }}
            className="text-[#39D9E6] hover:underline flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Re-open Beacon Calibration Console</span>
          </button>

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
