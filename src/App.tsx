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
import { NarrativeRecapModal } from './components/GameUI/NarrativeRecapModal';
import { ChoiceModal } from './components/GameUI/ChoiceModal';
import { EndingScreen } from './components/GameUI/EndingScreen';
import { GameOverScreen } from './components/GameUI/GameOverScreen';
import { PauseMenu } from './components/Menus/PauseMenu';
import { SnapshotJournalModal } from './components/GameUI/SnapshotJournalModal';
import { ChapterSelectModal } from './components/Menus/ChapterSelectModal';
import { ObjectiveHistoryModal } from './components/GameUI/ObjectiveHistoryModal';

export function App() {
  const gameStarted = useGameState((state) => state.gameStarted);
  const radioTunerOpen = useGameState((state) => state.radioTunerOpen);
  const noteViewerOpen = useGameState((state) => state.noteViewerOpen);
  const inventoryOpen = useGameState((state) => state.inventoryOpen);
  const investigationBoardOpen = useGameState((state) => state.investigationBoardOpen);
  const cassettePlayerOpen = useGameState((state) => state.cassettePlayerOpen);
  const beaconCalibrationOpen = useGameState((state) => state.beaconCalibrationOpen);
  const narrativeRecapOpen = useGameState((state) => state.narrativeRecapOpen);
  const choiceModalOpen = useGameState((state) => state.choiceModalOpen);
  const snapshotJournalOpen = useGameState((state) => state.snapshotJournalOpen);
  const chapterSelectOpen = useGameState((state) => state.chapterSelectOpen);
  const objectiveHistoryOpen = useGameState((state) => state.objectiveHistoryOpen);
  const activeEnding = useGameState((state) => state.activeEnding);
  const isGameOver = useGameState((state) => state.isGameOver);

  const closeSnapshotJournal = useGameState((state) => state.closeSnapshotJournal);
  const closeChapterSelect = useGameState((state) => state.closeChapterSelect);
  const closeObjectiveHistory = useGameState((state) => state.closeObjectiveHistory);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#07111F]">
      {!gameStarted ? (
        <TitleScreen />
      ) : (
        <div className="relative w-full h-full">
          {/* 3D R3F Game Canvas (7 Stations including Signal Tower, Weather, Player) */}
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
          {narrativeRecapOpen && <NarrativeRecapModal />}
          {choiceModalOpen && <ChoiceModal />}
          {snapshotJournalOpen && <SnapshotJournalModal onClose={closeSnapshotJournal} />}
          {chapterSelectOpen && <ChapterSelectModal onClose={closeChapterSelect} />}
          {objectiveHistoryOpen && <ObjectiveHistoryModal onClose={closeObjectiveHistory} />}
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
