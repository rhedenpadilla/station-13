import { useGameState, VirtualMove } from '../../game/state/useGameState';
import { OBJECTIVES } from '../../game/constants/gameData';
import {
  Radio,
  Flashlight,
  Clock,
  Compass,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Zap,
  Hand,
  LogOut,
  ShieldAlert,
  MapPin,
} from 'lucide-react';

export function HUD() {
  const currentObjectiveIndex = useGameState((state) => state.currentObjectiveIndex);
  const interactionPrompt = useGameState((state) => state.interactionPrompt);
  const subtitles = useGameState((state) => state.subtitles);
  const hasRestoredPower = useGameState((state) => state.hasRestoredPower);
  const currentFrequency = useGameState((state) => state.currentFrequency);
  const currentSector = useGameState((state) => state.currentSector);
  const sanity = useGameState((state) => state.sanity);
  const flashlightOn = useGameState((state) => state.flashlightOn);

  const setVirtualMove = useGameState((state) => state.setVirtualMove);
  const virtualMove = useGameState((state) => state.virtualMove);
  const triggerVirtualInteract = useGameState((state) => state.triggerVirtualInteract);
  const toggleFlashlight = useGameState((state) => state.toggleFlashlight);
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
        return 'AUXILIARY GENERATOR ROOM';
      default:
        return 'STATION 13';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 md:p-6">
      {/* --- TOP BAR: OBJECTIVES, SECTOR NAVIGATOR, TELEMETRY & EXIT BUTTON --- */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-3">
        {/* Current Objective Card */}
        <div className="bg-[#07111F]/90 border border-[#102A43] backdrop-blur-md px-4 py-3 rounded-lg max-w-md shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#39D9E6] animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest text-[#39D9E6] uppercase font-bold">
              Directive #{objective.id + 1}
            </span>
          </div>
          <h2 className="text-sm md:text-base font-bold text-slate-100 tracking-tight">
            {objective.title}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {objective.description}
          </p>
          <div className="mt-2 text-[11px] font-mono text-[#F5B960] bg-[#102A43]/60 px-2.5 py-1 rounded border border-[#F5B960]/20">
            HINT: {objective.hint}
          </div>
        </div>

        {/* Center Sector Navigator Compass Tape */}
        <div className="bg-[#07111F]/90 border border-[#39D9E6]/40 backdrop-blur-md px-4 py-2 rounded-lg font-mono text-xs shadow-2xl flex items-center gap-2.5 pointer-events-auto">
          <MapPin className="w-4 h-4 text-[#39D9E6] animate-pulse" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-400 uppercase tracking-widest">SECTOR NAVIGATOR</span>
            <span className="text-xs font-bold text-[#39D9E6] tracking-wider uppercase">
              {getSectorName()}
            </span>
          </div>
        </div>

        {/* Right Telemetry & Exit Game Button */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          {/* Station Status Card */}
          <div className="bg-[#07111F]/90 border border-[#102A43] backdrop-blur-md px-3.5 py-2.5 rounded-lg text-right font-mono text-xs shadow-2xl flex flex-col gap-1">
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

          {/* Exit Game Button (Redirects to Homepage) */}
          <button
            onClick={() => {
              if (confirm("Exit game and return to station home screen?")) {
                exitToTitle();
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#1E293B] hover:bg-[#D94141] text-slate-200 hover:text-white rounded-lg border border-[#334155] font-mono text-xs font-bold transition-all shadow-md hover:scale-105"
            title="Exit Game to Homepage"
          >
            <LogOut className="w-3.5 h-3.5 text-[#D94141] hover:text-white" />
            <span>EXIT GAME</span>
          </button>
        </div>
      </div>

      {/* --- CENTER: CROSSHAIR & DYNAMIC INTERACTION BANNER --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Subtle Crosshair Dot */}
        <div className="w-2 h-2 rounded-full bg-slate-300/80 border border-slate-900/50 shadow-sm" />

        {/* Dynamic Interaction Banner */}
        {interactionPrompt && (
          <div className="absolute top-[56%] bg-[#07111F]/95 border-2 border-[#39D9E6]/60 backdrop-blur-md px-5 py-2.5 rounded-lg shadow-2xl animate-fade-in pointer-events-auto">
            <p className="text-xs md:text-sm font-mono font-bold text-[#39D9E6] tracking-wide subtle-glow flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#F5B960] animate-spin" style={{ animationDuration: '6s' }} />
              {interactionPrompt}
            </p>
          </div>
        )}
      </div>

      {/* --- BOTTOM SECTION: ON-SCREEN CONTROLS, SUBTITLES & ACTION BUTTONS --- */}
      <div className="flex flex-col gap-3">
        {/* Subtitles Box */}
        {subtitles && (
          <div className="self-center bg-[#07111F]/95 border-2 border-[#39D9E6]/50 px-6 py-3 rounded-lg max-w-2xl text-center backdrop-blur-md shadow-2xl animate-fade-in pointer-events-auto">
            <span className="text-[10px] font-mono text-[#39D9E6] tracking-widest uppercase block mb-0.5">
              [ INCOMING TRANSMISSION ]
            </span>
            <p className="text-sm md:text-base font-mono text-slate-100 font-bold tracking-wide">
              {subtitles}
            </p>
          </div>
        )}

        {/* Bottom Control Bars: On-Screen Navigation & Actions */}
        <div className="flex justify-between items-end">
          {/* --- ON-SCREEN DIRECTIONAL NAVIGATION (D-PAD) --- */}
          <div className="bg-[#07111F]/85 border border-[#102A43] p-2.5 rounded-xl backdrop-blur-md shadow-2xl flex flex-col items-center gap-1.5 pointer-events-auto">
            <span className="text-[9px] font-mono text-slate-400 tracking-wider">NAVIGATE</span>

            {/* Up Button */}
            <button
              onMouseDown={() => setVirtualMove('forward', true)}
              onMouseUp={() => setVirtualMove('forward', false)}
              onTouchStart={() => setVirtualMove('forward', true)}
              onTouchEnd={() => setVirtualMove('forward', false)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center border font-bold transition-all ${
                virtualMove.forward
                  ? 'bg-[#39D9E6] text-black border-[#39D9E6]'
                  : 'bg-[#1E293B] hover:bg-[#334155] text-white border-[#334155]'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>

            {/* Left / Sprint / Right Row */}
            <div className="flex gap-1.5 items-center">
              {/* Left Button */}
              <button
                onMouseDown={() => setVirtualMove('left', true)}
                onMouseUp={() => setVirtualMove('left', false)}
                onTouchStart={() => setVirtualMove('left', true)}
                onTouchEnd={() => setVirtualMove('left', false)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center border font-bold transition-all ${
                  virtualMove.left
                    ? 'bg-[#39D9E6] text-black border-[#39D9E6]'
                    : 'bg-[#1E293B] hover:bg-[#334155] text-white border-[#334155]'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* Sprint Toggle */}
              <button
                onClick={() => setVirtualMove('sprint', !virtualMove.sprint)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center border font-bold transition-all ${
                  virtualMove.sprint
                    ? 'bg-[#F5B960] text-black border-[#F5B960]'
                    : 'bg-[#102A43] text-slate-300 border-[#334155]'
                }`}
                title="Sprint / Run"
              >
                <Zap className="w-4 h-4" />
              </button>

              {/* Right Button */}
              <button
                onMouseDown={() => setVirtualMove('right', true)}
                onMouseUp={() => setVirtualMove('right', false)}
                onTouchStart={() => setVirtualMove('right', true)}
                onTouchEnd={() => setVirtualMove('right', false)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center border font-bold transition-all ${
                  virtualMove.right
                    ? 'bg-[#39D9E6] text-black border-[#39D9E6]'
                    : 'bg-[#1E293B] hover:bg-[#334155] text-white border-[#334155]'
                }`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Down Button */}
            <button
              onMouseDown={() => setVirtualMove('backward', true)}
              onMouseUp={() => setVirtualMove('backward', false)}
              onTouchStart={() => setVirtualMove('backward', true)}
              onTouchEnd={() => setVirtualMove('backward', false)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center border font-bold transition-all ${
                virtualMove.backward
                  ? 'bg-[#39D9E6] text-black border-[#39D9E6]'
                  : 'bg-[#1E293B] hover:bg-[#334155] text-white border-[#334155]'
              }`}
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          {/* Center Info Keyboard Helpers */}
          <div className="hidden md:flex items-center gap-4 bg-[#07111F]/80 px-4 py-1.5 rounded-lg border border-[#102A43] text-xs font-mono text-slate-400">
            <span>[WASD] Move</span>
            <span>[E] Interact</span>
            <span>[F] Flashlight</span>
            <span>[ESC] Pause</span>
          </div>

          {/* --- ON-SCREEN ACTION BUTTONS (INTERACT & FLASHLIGHT) --- */}
          <div className="bg-[#07111F]/85 border border-[#102A43] p-2.5 rounded-xl backdrop-blur-md shadow-2xl flex flex-col gap-2 pointer-events-auto">
            <span className="text-[9px] font-mono text-slate-400 tracking-wider text-center">ACTIONS</span>

            <div className="flex gap-2">
              {/* Interact [E] Button */}
              <button
                onClick={triggerVirtualInteract}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 font-mono text-xs font-bold transition-all shadow-lg ${
                  interactionPrompt
                    ? 'bg-[#39D9E6] hover:bg-[#22d3ee] text-black shadow-[0_0_15px_#39D9E6] animate-pulse'
                    : 'bg-[#1E293B] hover:bg-[#334155] text-slate-200 border border-[#334155]'
                }`}
                title="Interact with nearby console or item"
              >
                <Hand className="w-4 h-4" />
                <span>INTERACT [E]</span>
              </button>

              {/* Flashlight [F] Button */}
              <button
                onClick={toggleFlashlight}
                className={`p-2.5 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all border ${
                  flashlightOn
                    ? 'bg-[#F5B960] text-black border-[#F5B960] shadow-[0_0_12px_#F5B960]'
                    : 'bg-[#1E293B] text-slate-400 border-[#334155]'
                }`}
                title="Toggle Flashlight"
              >
                <Flashlight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
