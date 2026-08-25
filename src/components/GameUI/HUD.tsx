import { useGameState } from '../../game/state/useGameState';
import { OBJECTIVES } from '../../game/constants/gameData';
import {
  Radio,
  Clock,
  Compass,
  Zap,
  LogOut,
  ShieldAlert,
  MapPin,
  Backpack,
  Search,
  CheckCircle2,
} from 'lucide-react';

export function HUD() {
  const currentObjectiveIndex = useGameState((state) => state.currentObjectiveIndex);
  const interactionPrompt = useGameState((state) => state.interactionPrompt);
  const subtitles = useGameState((state) => state.subtitles);
  const currentFrequency = useGameState((state) => state.currentFrequency);
  const currentSector = useGameState((state) => state.currentSector);
  const sanity = useGameState((state) => state.sanity);
  const inventory = useGameState((state) => state.inventory);

  const openInventory = useGameState((state) => state.openInventory);
  const openInvestigationBoard = useGameState((state) => state.openInvestigationBoard);
  const exitToTitle = useGameState((state) => state.exitToTitle);

  const objective = OBJECTIVES[currentObjectiveIndex] || OBJECTIVES[0];

  const getSectorName = () => {
    switch (currentSector) {
      case 'RADIO_ROOM':
        return 'RADIO CONTROL ROOM';
      case 'HALLWAY':
        return 'CONNECTING CORRIDOR';
      case 'OBSERVATION_DECK':
        return 'OBSERVATION DECK (OUTSIDE)';
      case 'GENERATOR_ROOM':
        return 'AUX GENERATOR ROOM';
      case 'ARCHIVE_ROOM':
        return 'ARCHIVE & EVIDENCE ROOM';
      case 'SLEEPING_QUARTERS':
        return 'SLEEPING QUARTERS';
      default:
        return 'WEATHER STATION 13';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 md:p-6 select-none font-mono">
      {/* --- TOP BAR: DIRECTIVES, SECTOR NAVIGATOR, TELEMETRY & FAST ACCESS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-3">
        {/* Current Objective Card */}
        <div className="bg-[#07111F]/90 border border-[#102A43] backdrop-blur-md px-4 py-3 rounded-xl max-w-md shadow-2xl pointer-events-auto">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#39D9E6] animate-pulse" />
              <span className="text-xs tracking-widest text-[#39D9E6] uppercase font-bold">
                Directive #{objective.id + 1} of {OBJECTIVES.length}
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              {currentObjectiveIndex > 0 && <CheckCircle2 className="w-3.5 h-3.5 inline text-[#63D471] mr-1" />}
              {Math.round(((currentObjectiveIndex) / (OBJECTIVES.length - 1)) * 100)}% Complete
            </span>
          </div>

          <h2 className="text-sm md:text-base font-bold text-slate-100 tracking-tight">
            {objective.title}
          </h2>

          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {objective.description}
          </p>

          {objective.subObjective && (
            <div className="mt-1.5 text-[11px] text-[#38BDF8] bg-[#0B132B]/80 px-2.5 py-1 rounded border border-[#1E3A8A]/40 flex items-center gap-1.5">
              <span className="text-slate-400">SUB-GOAL:</span>
              <span>{objective.subObjective}</span>
            </div>
          )}

          <div className="mt-1.5 text-[11px] text-[#F5B960] bg-[#102A43]/60 px-2.5 py-1 rounded border border-[#F5B960]/20">
            HINT: {objective.hint}
          </div>
        </div>

        {/* Center Sector Navigator */}
        <div className="bg-[#07111F]/90 border border-[#39D9E6]/40 backdrop-blur-md px-4 py-2 rounded-xl text-xs shadow-2xl flex items-center gap-2.5 pointer-events-auto">
          <MapPin className="w-4 h-4 text-[#39D9E6] animate-pulse" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-400 uppercase tracking-widest">CURRENT LOCATION</span>
            <span className="text-xs font-bold text-[#39D9E6] tracking-wider uppercase">
              {getSectorName()}
            </span>
          </div>
        </div>

        {/* Right Telemetry & Quick Action Icons */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          {/* Station Status Card */}
          <div className="bg-[#07111F]/90 border border-[#102A43] backdrop-blur-md px-3.5 py-2.5 rounded-xl text-right text-xs shadow-2xl flex flex-col gap-1">
            <div className="flex items-center justify-end gap-2 text-[#D94141] font-bold">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-xs md:text-sm">01:13 AM (STATION TIME)</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-slate-300 text-[11px]">
              <Radio className="w-3 h-3 text-[#39D9E6]" />
              <span>FREQ: {currentFrequency.toFixed(2)} MHz</span>
            </div>
            {/* Sanity / Temporal Stability Meter */}
            <div className="flex items-center justify-end gap-1.5 text-[10px]">
              <ShieldAlert className={`w-3 h-3 ${sanity < 40 ? 'text-[#D94141] animate-bounce' : 'text-[#63D471]'}`} />
              <span className="text-slate-400">STABILITY:</span>
              <span className={sanity > 60 ? 'text-[#63D471]' : sanity > 30 ? 'text-[#F5B960]' : 'text-[#D94141]'}>
                {Math.round(sanity)}%
              </span>
            </div>
          </div>

          {/* Quick HUD Triggers: Evidence Board, Inventory & Exit */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={openInvestigationBoard}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F172A] hover:bg-[#102A43] text-[#39D9E6] rounded-lg border border-[#39D9E6]/30 text-xs font-bold transition-all shadow hover:scale-105"
              title="Investigation Evidence Board [TAB / B]"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">BOARD [TAB]</span>
            </button>

            <button
              onClick={openInventory}
              className="relative flex items-center gap-1.5 px-3 py-1.5 bg-[#0F172A] hover:bg-[#1E293B] text-[#F5B960] rounded-lg border border-[#F5B960]/30 text-xs font-bold transition-all shadow hover:scale-105"
              title="Inspect Inventory [I]"
            >
              <Backpack className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ITEMS [I]</span>
              {inventory.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#F5B960] text-black text-[9px] font-black flex items-center justify-center">
                  {inventory.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                if (confirm("Exit game and return to station home screen?")) {
                  exitToTitle();
                }
              }}
              className="p-1.5 bg-[#1E293B] hover:bg-[#D94141] text-slate-200 hover:text-white rounded-lg border border-[#334155] transition-all shadow hover:scale-105"
              title="Exit Game to Main Title"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* --- CENTER: RETICLE CROSSHAIR & PROXIMITY INTERACTION BANNER --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-slate-300/80 border border-slate-900/50 shadow-sm" />

        {interactionPrompt && (
          <div className="absolute top-[56%] bg-[#07111F]/95 border-2 border-[#39D9E6]/60 backdrop-blur-md px-5 py-2.5 rounded-xl shadow-2xl animate-fade-in pointer-events-auto">
            <p className="text-xs md:text-sm font-bold text-[#39D9E6] tracking-wide subtle-glow flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#F5B960] animate-spin" style={{ animationDuration: '6s' }} />
              {interactionPrompt}
            </p>
          </div>
        )}
      </div>

      {/* --- SUBTITLES DISPLAY (ABOVE VIRTUAL CONTROLS) --- */}
      {subtitles && (
        <div className="self-center mb-24 max-w-2xl bg-[#07111F]/95 border-2 border-[#39D9E6]/50 px-6 py-3 rounded-xl text-center backdrop-blur-md shadow-2xl animate-fade-in pointer-events-auto">
          <span className="text-[10px] text-[#39D9E6] tracking-widest uppercase block mb-0.5 font-bold">
            [ INCOMING TRANSMISSION / AUDIO LOG ]
          </span>
          <p className="text-sm md:text-base text-slate-100 font-bold tracking-wide">
            {subtitles}
          </p>
        </div>
      )}
    </div>
  );
}
