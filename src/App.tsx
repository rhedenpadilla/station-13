import { useGameState } from './game/state/useGameState';
import { TitleScreen } from './components/Menus/TitleScreen';
import { StationScene } from './game/scenes/StationScene';
import { HUD } from './components/GameUI/HUD';
import { VirtualControlOverlay } from './components/VirtualControls/VirtualControlOverlay';
import { RadioTunerUI } from './components/GameUI/RadioTunerUI';
import { NoteViewerUI } from './components/GameUI/NoteViewerUI';
import { InventoryUI } from './components/GameUI/InventoryUI';
import { InvestigationBoardUI } from './components/GameUI/InvestigationBoardUI';
import { CassettePlayerUI } from './components/GameUI/CassettePlayerUI';
import { BeaconCalibrationUI } from './components/GameUI/BeaconCalibrationUI';
import { ChoiceModal } from './components/GameUI/ChoiceModal';
import { EndingScreen } from './components/GameUI/EndingScreen';
import { GameOverScreen } from './components/GameUI/GameOverScreen';
import { PauseMenu } from './components/Menus/PauseMenu';

export function App() {
  const gameStarted = useGameState((state) => state.gameStarted);
  const radioTunerOpen = useGameState((state) => state.radioTunerOpen);
  const noteViewerOpen = useGameState((state) => state.noteViewerOpen);
  const inventoryOpen = useGameState((state) => state.inventoryOpen);
  const investigationBoardOpen = useGameState((state) => state.investigationBoardOpen);
  const cassettePlayerOpen = useGameState((state) => state.cassettePlayerOpen);
  const beaconCalibrationOpen = useGameState((state) => state.beaconCalibrationOpen);
  const choiceModalOpen = useGameState((state) => state.choiceModalOpen);
  const activeEnding = useGameState((state) => state.activeEnding);
  const isGameOver = useGameState((state) => state.isGameOver);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#07111F]">
      {!gameStarted ? (
        <TitleScreen />
      ) : (
        <div className="relative w-full h-full">
          {/* 3D R3F Game Canvas (6 Stations, Weather, Player) */}
          <StationScene />

          {/* In-Game HUD: Objectives, Sub-Goals, Telemetry, Crosshair */}
          <HUD />

          {/* On-Screen Virtual Controls (D-Pad, Look Zone & Action Buttons) */}
          <VirtualControlOverlay />

          {/* Interactive Modals & Puzzles */}
          {radioTunerOpen && <RadioTunerUI />}
          {noteViewerOpen && <NoteViewerUI />}
          {inventoryOpen && <InventoryUI />}
          {investigationBoardOpen && <InvestigationBoardUI />}
          {cassettePlayerOpen && <CassettePlayerUI />}
          {beaconCalibrationOpen && <BeaconCalibrationUI />}
          {choiceModalOpen && <ChoiceModal />}
          {activeEnding && <EndingScreen />}
          {isGameOver && <GameOverScreen />}
          <PauseMenu />

          {/* CRT Scanline & Atmospheric Vignette Overlays */}
          <div className="absolute inset-0 crt-overlay pointer-events-none z-20" />
          <div className="absolute inset-0 vignette-overlay pointer-events-none z-20" />
        </div>
      )}
    </div>
  );
}

export default App;
