import { useEffect, useState, useRef } from 'react';
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
  Camera,
  Compass,
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
  const openSnapshotJournal = useGameState((state) => state.openSnapshotJournal);
  const openObjectiveHistory = useGameState((state) => state.openObjectiveHistory);
  const inventory = useGameState((state) => state.inventory);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 1
  const isHoldingInteract = useRef(false);
  const holdStartTime = useRef(0);
  const holdAnimationFrame = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  // Cancel hold interact if prompt disappears or pause occurs
  useEffect(() => {
    if (!interactionPrompt) {
      cancelHold();
    }
  }, [interactionPrompt]);

  const shouldShow =
    settings.virtualControlsMode === 'ALWAYS_ON' ||
    (settings.virtualControlsMode === 'AUTO' && (isTouchDevice || window.innerWidth < 1024));

  if (!shouldShow) return null;

  // Helper for press-and-hold movement button events
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

  // Hold to interact logic
  const startHoldInteract = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (settings.interactMode === 'PRESS') {
      triggerVirtualInteract();
      return;
    }

    isHoldingInteract.current = true;
    holdStartTime.current = performance.now();

    const checkHold = () => {
      if (!isHoldingInteract.current) return;
      const elapsed = (performance.now() - holdStartTime.current) / 1000;
      const targetDuration = Math.max(0.2, settings.interactHoldDuration || 0.6);
      const prog = Math.min(1, elapsed / targetDuration);
      setHoldProgress(prog);

      if (prog >= 1) {
        isHoldingInteract.current = false;
        setHoldProgress(0);
        triggerVirtualInteract();
      } else {
        holdAnimationFrame.current = requestAnimationFrame(checkHold);
      }
    };

    holdAnimationFrame.current = requestAnimationFrame(checkHold);
  };

  const cancelHold = () => {
    isHoldingInteract.current = false;
    if (holdAnimationFrame.current) {
      cancelAnimationFrame(holdAnimationFrame.current);
      holdAnimationFrame.current = null;
    }
    setHoldProgress(0);
  };

  // Opacity and Size classes
  const opacityClass =
    settings.virtualControlOpacity === 'LOW'
      ? 'opacity-40 hover:opacity-75'
      : settings.virtualControlOpacity === 'HIGH'
      ? 'opacity-100'
      : 'opacity-80 hover:opacity-100';

  const scaleClass =
    settings.virtualControlSize === 'SMALL'
      ? 'scale-90 origin-bottom'
      : settings.virtualControlSize === 'LARGE'
      ? 'scale-110 origin-bottom'
      : 'scale-100';

  const isMirrored = settings.virtualControlHanded === 'MIRRORED';

  // D-Pad Content
  const dpadContent = (
    <div className={`pointer-events-auto transition-all ${opacityClass} ${scaleClass}`}>
      <div className="relative bg-[#07111F]/85 backdrop-blur-lg border border-[#39D9E6]/30 p-2 sm:p-2.5 rounded-2xl shadow-[0_0_20px_rgba(7,17,31,0.9)] flex flex-col items-center gap-1.5">
        <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-[#39D9E6]/80 uppercase">
          NAVIGATE
        </span>

        {/* Up Button */}
        <button
          {...makeMoveHandlers('forward')}
          className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center border font-bold transition-all active:scale-95 ${
            virtualMove.forward
              ? 'bg-[#39D9E6] text-[#07111F] border-[#39D9E6] shadow-[0_0_15px_#39D9E6]'
              : 'bg-[#102A43]/90 hover:bg-[#1E3A8A] text-slate-100 border-[#39D9E6]/40'
          }`}
          title="Move Forward [W / Up]"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Left - Sprint - Right Row */}
        <div className="flex gap-1.5 items-center">
          {/* Left Button */}
          <button
            {...makeMoveHandlers('left')}
            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center border font-bold transition-all active:scale-95 ${
              virtualMove.left
                ? 'bg-[#39D9E6] text-[#07111F] border-[#39D9E6] shadow-[0_0_15px_#39D9E6]'
                : 'bg-[#102A43]/90 hover:bg-[#1E3A8A] text-slate-100 border-[#39D9E6]/40'
            }`}
            title="Strafe Left [A / Left]"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Sprint Toggle Center */}
          <button
            onClick={() => setVirtualMove('sprint', !virtualMove.sprint)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center border font-bold transition-all active:scale-95 ${
              virtualMove.sprint
                ? 'bg-[#F5B960] text-black border-[#F5B960] shadow-[0_0_12px_#F5B960]'
                : 'bg-[#0F172A] text-slate-400 border-[#334155]'
            }`}
            title="Toggle Sprint [Shift]"
          >
            <Zap className="w-4 h-4" />
          </button>

          {/* Right Button */}
          <button
            {...makeMoveHandlers('right')}
            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center border font-bold transition-all active:scale-95 ${
              virtualMove.right
                ? 'bg-[#39D9E6] text-[#07111F] border-[#39D9E6] shadow-[0_0_15px_#39D9E6]'
                : 'bg-[#102A43]/90 hover:bg-[#1E3A8A] text-slate-100 border-[#39D9E6]/40'
            }`}
            title="Strafe Right [D / Right]"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Down Button */}
        <button
          {...makeMoveHandlers('backward')}
          className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center border font-bold transition-all active:scale-95 ${
            virtualMove.backward
              ? 'bg-[#39D9E6] text-[#07111F] border-[#39D9E6] shadow-[0_0_15px_#39D9E6]'
              : 'bg-[#102A43]/90 hover:bg-[#1E3A8A] text-slate-100 border-[#39D9E6]/40'
          }`}
          title="Move Backward [S / Down]"
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );

  // Actions Panel Content
  const actionsContent = (
    <div className={`pointer-events-auto flex flex-col items-end gap-2 transition-all ${opacityClass} ${scaleClass}`}>
      {/* Quick Utility Row */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={openInvestigationBoard}
          className="p-2 sm:p-2.5 rounded-xl bg-[#07111F]/85 border border-[#39D9E6]/40 text-[#39D9E6] hover:bg-[#102A43] transition-all shadow active:scale-95 flex items-center gap-1 text-xs font-mono font-bold"
          title="Investigation Board [TAB / B]"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">BOARD</span>
        </button>

        <button
          onClick={openInventory}
          className="relative p-2 sm:p-2.5 rounded-xl bg-[#07111F]/85 border border-[#F5B960]/40 text-[#F5B960] hover:bg-[#1E293B] transition-all shadow active:scale-95 flex items-center gap-1 text-xs font-mono font-bold"
          title="Inventory Items [I]"
        >
          <Backpack className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ITEMS</span>
          {inventory.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#F5B960] text-black text-[8px] font-black flex items-center justify-center">
              {inventory.length}
            </span>
          )}
        </button>

        <button
          onClick={openSnapshotJournal}
          className="p-2 sm:p-2.5 rounded-xl bg-[#07111F]/85 border border-[#38BDF8]/40 text-[#38BDF8] hover:bg-[#102A43] transition-all shadow active:scale-95"
          title="Snapshot Journal"
        >
          <Camera className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={pauseGame}
          className="p-2 sm:p-2.5 rounded-xl bg-[#07111F]/85 border border-[#334155] text-slate-300 hover:text-white hover:bg-[#1E293B] transition-all shadow active:scale-95"
          title="Pause Shift [ESC]"
        >
          <Pause className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Primary Action Buttons: Flashlight & Interact (with Hold Support) */}
      <div className="flex items-center gap-2 bg-[#07111F]/85 backdrop-blur-lg border border-[#39D9E6]/30 p-2 rounded-2xl shadow-2xl">
        <button
          onClick={toggleFlashlight}
          className={`p-3 sm:p-3.5 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all border active:scale-95 ${
            flashlightOn
              ? 'bg-[#F5B960] text-black border-[#F5B960] shadow-[0_0_12px_#F5B960]'
              : 'bg-[#102A43] text-slate-400 border-[#334155]'
          }`}
          title="Toggle Flashlight [F]"
        >
          <Flashlight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Interact Button with Live Circular/Linear Hold Indicator */}
        <button
          onMouseDown={startHoldInteract}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
          onTouchStart={startHoldInteract}
          onTouchEnd={cancelHold}
          onTouchCancel={cancelHold}
          className={`relative overflow-hidden px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl flex items-center gap-2 font-mono text-xs sm:text-sm font-black transition-all border select-none active:scale-95 ${
            interactionPrompt
              ? 'bg-[#39D9E6] text-[#07111F] border-[#39D9E6] shadow-[0_0_15px_#39D9E6]'
              : 'bg-[#102A43]/90 text-slate-300 border-[#39D9E6]/30'
          }`}
          title="Interact with object [E / Touch]"
        >
          {/* Hold Progress Fill Overlay */}
          {holdProgress > 0 && (
            <div
              className="absolute inset-0 bg-[#F5B960]/60 pointer-events-none transition-all"
              style={{ width: `${Math.round(holdProgress * 100)}%` }}
            />
          )}

          <Hand className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
          <span className="relative z-10">
            {settings.interactMode === 'HOLD' && holdProgress > 0
              ? `HOLDING (${Math.round(holdProgress * 100)}%)`
              : 'INTERACT [E]'}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-20 select-none overflow-hidden font-mono">
      {/* Touch Screen Camera Look Zone (Opposite to D-Pad) */}
      <LookDragZone
        className={`absolute top-16 bottom-28 w-1/2 pointer-events-auto opacity-0 ${
          isMirrored ? 'left-0' : 'right-0'
        }`}
      />

      {/* Position Left Side Component */}
      <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6">
        {isMirrored ? actionsContent : dpadContent}
      </div>

      {/* Position Right Side Component */}
      <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6">
        {isMirrored ? dpadContent : actionsContent}
      </div>
    </div>
  );
}
