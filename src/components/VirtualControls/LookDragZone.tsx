import { useRef, useEffect } from 'react';
import { useGameState } from '../../game/state/useGameState';

interface Props {
  className?: string;
}

export function LookDragZone({ className = '' }: Props) {
  const isPaused = useGameState((state) => state.isPaused);
  const gameStarted = useGameState((state) => state.gameStarted);
  const radioTunerOpen = useGameState((state) => state.radioTunerOpen);
  const noteViewerOpen = useGameState((state) => state.noteViewerOpen);
  const choiceModalOpen = useGameState((state) => state.choiceModalOpen);
  const inventoryOpen = useGameState((state) => state.inventoryOpen);
  const investigationBoardOpen = useGameState((state) => state.investigationBoardOpen);
  const cassettePlayerOpen = useGameState((state) => state.cassettePlayerOpen);
  const beaconCalibrationOpen = useGameState((state) => state.beaconCalibrationOpen);
  const activeEnding = useGameState((state) => state.activeEnding);
  const setLookDragDelta = useGameState((state) => state.setLookDragDelta);

  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  const isModalOpen =
    isPaused ||
    radioTunerOpen ||
    noteViewerOpen ||
    choiceModalOpen ||
    inventoryOpen ||
    investigationBoardOpen ||
    cassettePlayerOpen ||
    beaconCalibrationOpen ||
    !!activeEnding;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isModalOpen || !gameStarted) return;
    const touch = e.touches[0];
    if (touch) {
      isDragging.current = true;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !lastPos.current || isModalOpen) return;
    const touch = e.touches[0];
    if (touch) {
      const dx = touch.clientX - lastPos.current.x;
      const dy = touch.clientY - lastPos.current.y;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      setLookDragDelta(dx, dy);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    lastPos.current = null;
    setLookDragDelta(0, 0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`touch-none select-none ${className}`}
      style={{ WebkitUserSelect: 'none' }}
    />
  );
}
