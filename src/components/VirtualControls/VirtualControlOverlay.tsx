import { useEffect, useState } from 'react';
import { useGameState, VirtualMove } from '../../game/state/useGameState';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Zap,
  Hand,
  Flashlight,
  Pause,
  Backpack,
  Search,
} from 'lucide-react';
import { LookDragZone } from './LookDragZone';

export function VirtualControlOverlay() {
  const settings = useGameState((state) => state.settings);
  const virtualMove = useGameState((state) => state.virtualMove);
  const setVirtualMove = useGameState((state) => state.setVirtualMove);
  const triggerVirtualInteract = useGameState((state) => state.triggerVirtualInteract);
  const toggleFlashlight = useGameState((state) => state.toggleFlashlight);
  const flashlightOn = useGameState((state) => state.flashlightOn);
  const interactionPrompt = useGameState((state) => state.interactionPrompt);
  const pauseGame = useGameState((state) => state.pauseGame);
  const openInventory = useGameState((state) => state.openInventory);
  const openInvestigationBoard = useGameState((state) => state.openInvestigationBoard);
  const inventory = useGameState((state) => state.inventory);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  const shouldShow =
    settings.virtualControlsMode === 'ALWAYS_ON' ||
    (settings.virtualControlsMode === 'AUTO' && (isTouchDevice || window.innerWidth < 1024));

  if (!shouldShow) return null;

  // Helper for press-and-hold button events
  const makeMoveHandlers = (key: keyof VirtualMove) => ({
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      setVirtualMove(key, true);
    },
    onMouseUp: (e: React.MouseEvent) => {
      e.preventDefault();
      setVirtualMove(key, false);
    },
    onMouseLeave: () => setVirtualMove(key, false),
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      setVirtualMove(key, true);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      setVirtualMove(key, false);
    },
    onTouchCancel: () => setVirtualMove(key, false),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-20 select-none overflow-hidden">
      {/* Right Screen Drag Zone for Touch Camera Look */}
      <LookDragZone className="absolute right-0 top-16 bottom-28 w-1/2 pointer-events-auto opacity-0" />

      {/* --- LOWER LEFT: RESPONSIVE 4-WAY D-PAD --- */}
      <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 pointer-events-auto">
        <div className="relative bg-[#07111F]/80 backdrop-blur-lg border border-[#39D9E6]/30 p-2.5 sm:p-3 rounded-2xl shadow-[0_0_20px_rgba(7,17,31,0.9)] flex flex-col items-center gap-1.5 transition-all">
          <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-[#39D9E6]/80 uppercase">
            NAVIGATE
          </span>

          {/* Up Button */}
          <button
            {...makeMoveHandlers('forward')}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border font-bold transition-all active:scale-95 ${
              virtualMove.forward
                ? 'bg-[#39D9E6] text-[#07111F] border-[#39D9E6] shadow-[0_0_15px_#39D9E6]'
                : 'bg-[#102A43]/90 hover:bg-[#1E3A8A] text-slate-100 border-[#39D9E6]/40 hover:border-[#39D9E6] hover:shadow-[0_0_10px_rgba(57,217,230,0.3)]'
            }`}
            title="Move Forward [W / Up]"
          >
            <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Left - Sprint - Right Row */}
          <div className="flex gap-1.5 items-center">
            {/* Left Button */}
            <button
              {...makeMoveHandlers('left')}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border font-bold transition-all active:scale-95 ${
                virtualMove.left
                  ? 'bg-[#39D9E6] text-[#07111F] border-[#39D9E6] shadow-[0_0_15px_#39D9E6]'
                  : 'bg-[#102A43]/90 hover:bg-[#1E3A8A] text-slate-100 border-[#39D9E6]/40 hover:border-[#39D9E6] hover:shadow-[0_0_10px_rgba(57,217,230,0.3)]'
              }`}
              title="Strafe Left [A / Left]"
            >
              <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Sprint Toggle Center */}
            <button
              onClick={() => setVirtualMove('sprint', !virtualMove.sprint)}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center border font-bold transition-all active:scale-95 ${
                virtualMove.sprint
                  ? 'bg-[#F5B960] text-black border-[#F5B960] shadow-[0_0_12px_#F5B960]'
                  : 'bg-[#0F172A] text-slate-400 border-[#334155] hover:text-[#F5B960]'
              }`}
              title="Toggle Sprint / Fast Walk [Shift]"
            >
              <Zap className="w-5 h-5" />
            </button>

            {/* Right Button */}
            <button
              {...makeMoveHandlers('right')}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border font-bold transition-all active:scale-95 ${
                virtualMove.right
                  ? 'bg-[#39D9E6] text-[#07111F] border-[#39D9E6] shadow-[0_0_15px_#39D9E6]'
                  : 'bg-[#102A43]/90 hover:bg-[#1E3A8A] text-slate-100 border-[#39D9E6]/40 hover:border-[#39D9E6] hover:shadow-[0_0_10px_rgba(57,217,230,0.3)]'
              }`}
              title="Strafe Right [D / Right]"
            >
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Down Button */}
          <button
            {...makeMoveHandlers('backward')}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border font-bold transition-all active:scale-95 ${
              virtualMove.backward
                ? 'bg-[#39D9E6] text-[#07111F] border-[#39D9E6] shadow-[0_0_15px_#39D9E6]'
                : 'bg-[#102A43]/90 hover:bg-[#1E3A8A] text-slate-100 border-[#39D9E6]/40 hover:border-[#39D9E6] hover:shadow-[0_0_10px_rgba(57,217,230,0.3)]'
            }`}
            title="Move Backward [S / Down]"
          >
            <ArrowDown className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </div>

      {/* --- LOWER RIGHT: ACTION BUTTONS --- */}
      <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 pointer-events-auto flex flex-col items-end gap-2.5">
        {/* Quick Utility Row: Inventory, Evidence Board, Pause */}
        <div className="flex items-center gap-2">
          {/* Investigation Board Button */}
          <button
            onClick={openInvestigationBoard}
            className="p-2.5 sm:p-3 rounded-xl bg-[#07111F]/85 border border-[#39D9E6]/40 text-[#39D9E6] hover:bg-[#102A43] transition-all shadow-lg active:scale-95 flex items-center gap-1.5 text-xs font-mono font-bold"
            title="Open Investigation Board [TAB / B]"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">BOARD</span>
          </button>

          {/* Inventory Button */}
          <button
            onClick={openInventory}
            className="relative p-2.5 sm:p-3 rounded-xl bg-[#07111F]/85 border border-[#F5B960]/40 text-[#F5B960] hover:bg-[#1E293B] transition-all shadow-lg active:scale-95 flex items-center gap-1.5 text-xs font-mono font-bold"
            title="Open Inventory [I]"
          >
            <Backpack className="w-4 h-4" />
            <span className="hidden sm:inline">ITEMS</span>
            {inventory.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F5B960] text-black text-[9px] font-black flex items-center justify-center">
                {inventory.length}
              </span>
            )}
          </button>

          {/* Pause Button */}
          <button
            onClick={pauseGame}
            className="p-2.5 sm:p-3 rounded-xl bg-[#07111F]/85 border border-[#334155] text-slate-300 hover:text-white hover:bg-[#1E293B] transition-all shadow-lg active:scale-95"
            title="Pause Shift [ESC]"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Action Buttons: Interact & Flashlight */}
        <div className="flex items-center gap-2.5 bg-[#07111F]/85 backdrop-blur-lg border border-[#39D9E6]/30 p-2.5 rounded-2xl shadow-2xl">
          {/* Flashlight Button */}
          <button
            onClick={toggleFlashlight}
            className={`p-3.5 sm:p-4 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all border active:scale-95 ${
              flashlightOn
                ? 'bg-[#F5B960] text-black border-[#F5B960] shadow-[0_0_15px_#F5B960]'
                : 'bg-[#102A43] text-slate-400 border-[#334155]'
            }`}
            title="Toggle Flashlight [F]"
          >
            <Flashlight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Interact Button */}
          <button
            onClick={triggerVirtualInteract}
            className={`px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl flex items-center gap-2 font-mono text-xs sm:text-sm font-black transition-all shadow-lg active:scale-95 border ${
              interactionPrompt
                ? 'bg-[#39D9E6] hover:bg-[#22d3ee] text-[#07111F] border-[#39D9E6] shadow-[0_0_20px_#39D9E6] animate-pulse'
                : 'bg-[#102A43]/90 hover:bg-[#1E3A8A] text-slate-200 border-[#39D9E6]/30'
            }`}
            title="Interact with object [E / Click]"
          >
            <Hand className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>INTERACT [E]</span>
          </button>
        </div>
      </div>
    </div>
  );
}
