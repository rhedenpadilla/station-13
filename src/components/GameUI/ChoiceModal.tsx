import { useGameState } from '../../game/state/useGameState';
import { Radio, ShieldAlert, Power, Flame, Zap } from 'lucide-react';

export function ChoiceModal() {
  const choiceModalOpen = useGameState((state) => state.choiceModalOpen);
  const triggerEnding = useGameState((state) => state.triggerEnding);
  const closeChoiceModal = useGameState((state) => state.closeChoiceModal);

  if (!choiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border-4 border-[#39D9E6]/60 rounded-xl shadow-2xl overflow-hidden p-7 text-slate-100 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#334155] pb-4">
          <div className="p-3 bg-[#102A43] rounded-lg text-[#39D9E6]">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-slate-100 tracking-wider uppercase flex items-center gap-2">
              SIGNAL 13 - FINAL TRANSMISSION
            </h2>
            <p className="text-xs text-[#39D9E6] font-mono">
              Auxiliary Generator Online. Signal carrier frequency synchronized.
            </p>
          </div>
        </div>

        {/* Narrative Context */}
        <div className="bg-[#07111F] p-4 rounded-lg border border-[#334155] text-sm text-slate-200 leading-relaxed font-mono">
          <p className="mb-2 text-[#F5B960]">
            &gt; &quot;Station 13... The perimeter is collapsing. Choose what you broadcast to the dark.&quot;
          </p>
          <p className="text-xs text-slate-400">
            Emergency power is now feeding into the high-voltage transmitter array. You have two operational choices before the storm severs communications completely.
          </p>
        </div>

        {/* The Two Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A: Activate Emergency Beacon */}
          <button
            onClick={() => triggerEnding('BEACON')}
            className="group flex flex-col text-left p-5 bg-[#102A43]/70 hover:bg-[#102A43] border-2 border-[#39D9E6]/40 hover:border-[#39D9E6] rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(57,217,230,0.3)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-lg bg-[#07111F] text-[#39D9E6] group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-mono bg-[#39D9E6]/20 text-[#39D9E6] px-2 py-0.5 rounded font-bold">
                OPTION A
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 font-mono group-hover:text-[#39D9E6] transition-colors">
              ACTIVATE BEACON
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-normal">
              Transmit maximum-power marine coordinates into the storm. Illuminate the station light.
            </p>
          </button>

          {/* Option B: Shut Down Radio Frequency */}
          <button
            onClick={() => triggerEnding('SILENT_FREQUENCY')}
            className="group flex flex-col text-left p-5 bg-[#1E293B]/70 hover:bg-[#1E293B] border-2 border-[#D94141]/40 hover:border-[#D94141] rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(217,65,65,0.3)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-lg bg-[#07111F] text-[#D94141] group-hover:scale-110 transition-transform">
                <Power className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-mono bg-[#D94141]/20 text-[#D94141] px-2 py-0.5 rounded font-bold">
                OPTION B
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 font-mono group-hover:text-[#D94141] transition-colors">
              SHUT DOWN FREQUENCY
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-normal">
              Sever the 13.13 MHz broadcast. Disconnect the receiver array and plunge the station into silence.
            </p>
          </button>
        </div>

        {/* Back / Step Away */}
        <div className="flex justify-end pt-2 border-t border-[#334155]">
          <button
            onClick={closeChoiceModal}
            className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
          >
            Step Away from Console [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
