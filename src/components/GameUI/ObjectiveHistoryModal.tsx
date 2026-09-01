import { useGameState } from '../../game/state/useGameState';
import { OBJECTIVES } from '../../game/constants/gameData';
import { X, CheckCircle2, Circle, Compass, ArrowRight } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function ObjectiveHistoryModal({ onClose }: Props) {
  const currentObjectiveIndex = useGameState((state) => state.currentObjectiveIndex);
  const objectiveHistory = useGameState((state) => state.objectiveHistory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-y-auto p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#102A43] text-[#39D9E6]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
                STATION DIRECTIVE LOG & OBJECTIVE HISTORY
              </h2>
              <p className="text-xs text-slate-400">
                Shift Progress: Directive #{currentObjectiveIndex + 1} of {OBJECTIVES.length} Active
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Objective Timeline List */}
        <div className="space-y-3.5 overflow-y-auto pr-1">
          {OBJECTIVES.map((obj, index) => {
            const isCompleted = index < currentObjectiveIndex;
            const isActive = index === currentObjectiveIndex;
            const isFuture = index > currentObjectiveIndex;

            return (
              <div
                key={obj.id}
                className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
                  isActive
                    ? 'bg-[#102A43] border-[#39D9E6] shadow-[0_0_15px_rgba(57,217,230,0.25)]'
                    : isCompleted
                    ? 'bg-[#07111F] border-[#1E293B] opacity-80'
                    : 'bg-[#07111F]/40 border-[#1E293B] opacity-40'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#63D471]" />
                    ) : isActive ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#39D9E6] flex items-center justify-center animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-[#39D9E6]" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600" />
                    )}

                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Directive #{obj.id + 1}: {obj.title}
                    </span>
                  </div>

                  {isCompleted ? (
                    <span className="text-[10px] font-bold text-[#63D471] bg-[#102A43] px-2 py-0.5 rounded">
                      COMPLETED
                    </span>
                  ) : isActive ? (
                    <span className="text-[10px] font-bold text-[#39D9E6] bg-[#07111F] px-2 py-0.5 rounded border border-[#39D9E6]/40 animate-pulse">
                      CURRENT OBJECTIVE
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 bg-[#1E293B] px-2 py-0.5 rounded">
                      PENDING
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 ml-7 leading-relaxed">{obj.description}</p>

                {isActive && (
                  <div className="ml-7 mt-1 text-xs text-[#F5B960] bg-[#07111F] p-2.5 rounded-lg border border-[#F5B960]/30 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-[#F5B960] flex-shrink-0" />
                    <span><strong>Current Directive Hint:</strong> {obj.hint}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#334155] pt-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#334155] hover:bg-[#475569] text-white rounded-lg font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
