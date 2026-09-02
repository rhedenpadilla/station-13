import { create } from 'zustand';
import { NoteData, OBJECTIVES, RADIO_TRANSCRIPTS } from '../constants/gameData';
import { INVENTORY_ITEMS } from '../constants/inventoryData';
import { EVIDENCE_DATABASE } from '../constants/evidenceData';
import { SNAPSHOT_DATABASE } from '../constants/snapshotData';
import { CHAPTER_LIST, createChapterInitialState } from '../constants/chapterData';
import {
  AUTHORED_VARIATIONS,
  VANCE_UNSENT_LETTER,
  HYDROGRAPHIC_SURVEY_NOTE,
} from './variationManager';
import { soundEngine } from '../audio/SoundEngine';
import {
  SaveDataV4,
  GameSettingsV4,
  loadSaveFromLocalStorage,
  saveToLocalStorage,
  clearAllGameStorage,
  DEFAULT_PROGRESSION,
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_REPLAY,
  CURRENT_SAVE_VERSION,
} from './saveManager';

export type EndingType = 'BEACON' | 'SILENT_FREQUENCY' | 'UNKNOWN_SIGNAL' | null;
export type GraphicsQuality = 'LOW' | 'MEDIUM' | 'HIGH';
export type VirtualControlsMode = 'AUTO' | 'ALWAYS_ON' | 'DISABLED';
export type SectorType =
  | 'RADIO_ROOM'
  | 'HALLWAY'
  | 'OBSERVATION_DECK'
  | 'GENERATOR_ROOM'
  | 'ARCHIVE_ROOM'
  | 'SLEEPING_QUARTERS'
  | 'SIGNAL_TOWER';

export interface BeaconSettings {
  frequency: number;
  power: number;
  azimuth: number;
}

export interface VirtualMove {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
}

export interface GameState {
  // Navigation & Screens
  gameStarted: boolean;
  isPaused: boolean;
  activeEnding: EndingType;
  hasCompletedBefore: boolean;
  totalPlaythroughs: number;
  endingsUnlocked: {
    beacon: boolean;
    silentFrequency: boolean;
    unknownSignal: boolean;
  };
  witnessedEndings: string[];
  unlockedChapters: string[];

  // Replay & New Game+
  isNewGamePlus: boolean;
  isChapterReplay: boolean;
  replayChapterId: string | null;
  activeVariations: string[];
  ngPlusVariationsEncountered: string[];

  // Game Over & Sanity
  isGameOver: boolean;
  gameOverReason: string | null;
  gameOverCountdown: number;
  sanity: number;
  currentSector: SectorType;

  // On-Screen Virtual Controls & Touch Look
  virtualMove: VirtualMove;
  virtualInteractCount: number;
  flashlightOn: boolean;
  lookDragDelta: { x: number; y: number };

  // Story & Objectives
  currentObjectiveIndex: number;
  objectiveHistory: number[];
  interactionPrompt: string | null;
  subtitles: string | null;
  subtitleTimer: ReturnType<typeof setTimeout> | null;

  // Inventory, Evidence & Snapshot Systems
  inventory: string[];
  evidenceUnlocked: string[];
  allDiscoveredEvidence: string[];
  snapshots: string[];
  inspectedItemId: string | null;

  // Station & Room Unlock States
  generatorDoorUnlocked: boolean;
  archiveDoorUnlocked: boolean;
  archiveCabinetUnlocked: boolean;
  sleepingQuartersUnlocked: boolean;
  signalTowerUnlocked: boolean;

  // Puzzle Flags
  hasHeardFirstSignal: boolean;
  hasReadMaintenanceNote: boolean;
  hasCollectedFuse: boolean;
  hasRestoredPower: boolean;
  hasCollectedMapPiece: boolean;
  hasFoundArchiveKey: boolean;
  hasPlayedTapeA: boolean;
  hasTunedSecondFrequency: boolean;
  isBeaconCalibrated: boolean;

  // Beacon Calibration Puzzle
  beaconSettings: BeaconSettings;

  // Environmental Tension & Anomaly System
  tensionLevel: number;
  wetFootprintsVisible: boolean;
  photoChanged: boolean;
  sleepingQuartersClockGlitched: boolean;
  isLightningActive: boolean;
  seaLightVisible: boolean;

  // Modal Interfaces
  radioTunerOpen: boolean;
  currentFrequency: number;
  targetFrequency: number;
  signalLocked: boolean;

  noteViewerOpen: boolean;
  activeNote: NoteData | null;

  inventoryOpen: boolean;
  investigationBoardOpen: boolean;
  cassettePlayerOpen: boolean;
  activeCassetteId: 'cassette_tape_a' | 'cassette_tape_b' | null;
  beaconCalibrationOpen: boolean;
  choiceModalOpen: boolean;
  narrativeRecapOpen: boolean;
  snapshotJournalOpen: boolean;
  chapterSelectOpen: boolean;
  objectiveHistoryOpen: boolean;
  controlsLayoutOpen: boolean;

  // Settings
  settings: GameSettingsV4;

  // Actions
  startGame: () => void;
  startNewGamePlus: () => void;
  startChapterReplay: (chapterId: string) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  exitToTitle: () => void;
  triggerGameOver: (reason: string) => void;
  setSector: (sector: SectorType) => void;
  setVirtualMove: (key: keyof VirtualMove, active: boolean) => void;
  setLookDragDelta: (x: number, y: number) => void;
  triggerVirtualInteract: () => void;
  toggleFlashlight: () => void;
  adjustSanity: (delta: number) => void;
  setObjective: (index: number) => void;
  setInteractionPrompt: (prompt: string | null) => void;
  showSubtitles: (text: string, durationMs?: number) => void;

  // Inventory Actions
  collectItem: (itemId: string) => void;
  hasItem: (itemId: string) => boolean;
  openInventory: () => void;
  closeInventory: () => void;
  setInspectedItem: (itemId: string | null) => void;

  // Evidence & Snapshot Actions
  unlockEvidence: (evidenceId: string) => void;
  unlockSnapshot: (snapshotId: string) => void;
  openInvestigationBoard: () => void;
  closeInvestigationBoard: () => void;
  openSnapshotJournal: () => void;
  closeSnapshotJournal: () => void;
  openChapterSelect: () => void;
  closeChapterSelect: () => void;
  openObjectiveHistory: () => void;
  closeObjectiveHistory: () => void;
  openControlsLayout: () => void;
  closeControlsLayout: () => void;
  openNarrativeRecap: () => void;
  closeNarrativeRecap: () => void;
  canTriggerUnknownSignal: () => boolean;

  // Radio & Modal Actions
  openRadioTuner: () => void;
  closeRadioTuner: () => void;
  setFrequency: (freq: number) => void;
  lockSignal: () => void;

  openNoteViewer: (note: NoteData) => void;
  closeNoteViewer: () => void;

  openCassettePlayer: (tapeId: 'cassette_tape_a' | 'cassette_tape_b') => void;
  closeCassettePlayer: () => void;

  openBeaconCalibration: () => void;
  closeBeaconCalibration: () => void;
  updateBeaconSettings: (settings: Partial<BeaconSettings>) => void;
  checkBeaconCalibration: () => boolean;

  openChoiceModal: () => void;
  closeChoiceModal: () => void;

  // Puzzle Sequence Actions
  collectFuse: () => void;
  restorePower: () => void;
  unlockArchiveCabinet: () => void;
  completeTapeDecryption: () => void;
  triggerEnding: (ending: 'BEACON' | 'SILENT_FREQUENCY' | 'UNKNOWN_SIGNAL') => void;

  // Reset Actions
  resetGame: () => void;
  resetMainProgression: () => void;
  resetAllProgress: () => void;
  updateSettings: (newSettings: Partial<GameSettingsV4>) => void;
  triggerLightning: () => void;
  persistCurrentState: () => void;
}

const initialSaved = loadSaveFromLocalStorage();

export const useGameState = create<GameState>((set, get) => ({
  // Navigation & Screens
  gameStarted: false,
  isPaused: false,
  activeEnding: null,
  hasCompletedBefore: initialSaved.profile.hasCompletedBefore,
  totalPlaythroughs: initialSaved.profile.totalPlaythroughs,
  endingsUnlocked: initialSaved.profile.endingsUnlocked,
  witnessedEndings: initialSaved.profile.witnessedEndings,
  unlockedChapters: initialSaved.profile.unlockedChapters,

  // Replay State
  isNewGamePlus: false,
  isChapterReplay: false,
  replayChapterId: null,
  activeVariations: [],
  ngPlusVariationsEncountered: initialSaved.profile.ngPlusVariationsEncountered,

  // Game Over & Sanity
  isGameOver: false,
  gameOverReason: null,
  gameOverCountdown: 4,
  sanity: 100,
  currentSector: initialSaved.progression.currentSector || 'RADIO_ROOM',

  // Virtual Controls
  virtualMove: {
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  },
  virtualInteractCount: 0,
  flashlightOn: true,
  lookDragDelta: { x: 0, y: 0 },

  // Story & Objectives
  currentObjectiveIndex: initialSaved.progression.currentObjectiveIndex || 0,
  objectiveHistory: initialSaved.progression.objectiveHistory || [0],
  interactionPrompt: null,
  subtitles: null,
  subtitleTimer: null,

  // Inventory & Evidence
  inventory: initialSaved.progression.inventory || [],
  evidenceUnlocked: initialSaved.progression.evidenceUnlocked || ['signal_13_first', 'former_operator_log'],
  allDiscoveredEvidence: initialSaved.profile.allDiscoveredEvidence || ['signal_13_first', 'former_operator_log'],
  snapshots: initialSaved.profile.snapshots || [],
  inspectedItemId: null,

  // Station Doors & Locks
  generatorDoorUnlocked: initialSaved.progression.generatorDoorUnlocked || false,
  archiveDoorUnlocked: initialSaved.progression.archiveDoorUnlocked || false,
  archiveCabinetUnlocked: initialSaved.progression.archiveCabinetUnlocked || false,
  sleepingQuartersUnlocked: initialSaved.progression.sleepingQuartersUnlocked || false,
  signalTowerUnlocked: initialSaved.progression.signalTowerUnlocked || false,

  // Puzzle Flags
  hasHeardFirstSignal: initialSaved.progression.hasHeardFirstSignal || false,
  hasReadMaintenanceNote: initialSaved.progression.hasReadMaintenanceNote || false,
  hasCollectedFuse: initialSaved.progression.hasCollectedFuse || false,
  hasRestoredPower: initialSaved.progression.hasRestoredPower || false,
  hasCollectedMapPiece: initialSaved.progression.hasCollectedMapPiece || false,
  hasFoundArchiveKey: initialSaved.progression.hasFoundArchiveKey || false,
  hasPlayedTapeA: initialSaved.progression.hasPlayedTapeA || false,
  hasTunedSecondFrequency: initialSaved.progression.hasTunedSecondFrequency || false,
  isBeaconCalibrated: initialSaved.progression.isBeaconCalibrated || false,

  // Beacon Settings
  beaconSettings: initialSaved.progression.beaconSettings || {
    frequency: 12.5,
    power: 30,
    azimuth: 120,
  },

  // Environmental Tension
  tensionLevel: initialSaved.progression.tensionLevel || 0,
  wetFootprintsVisible: initialSaved.progression.wetFootprintsVisible || false,
  photoChanged: initialSaved.progression.photoChanged || false,
  sleepingQuartersClockGlitched: true,
  isLightningActive: false,
  seaLightVisible: false,

  // Modals
  radioTunerOpen: false,
  currentFrequency: initialSaved.progression.currentFrequency || 12.82,
  targetFrequency: initialSaved.progression.targetFrequency || 13.13,
  signalLocked: initialSaved.progression.signalLocked || false,

  noteViewerOpen: false,
  activeNote: null,

  inventoryOpen: false,
  investigationBoardOpen: false,
  cassettePlayerOpen: false,
  activeCassetteId: null,
  beaconCalibrationOpen: false,
  choiceModalOpen: false,
  narrativeRecapOpen: false,
  snapshotJournalOpen: false,
  chapterSelectOpen: false,
  objectiveHistoryOpen: false,
  controlsLayoutOpen: false,

  settings: initialSaved.settings || DEFAULT_SETTINGS,

  // Start fresh campaign standard shift
  startGame: () => {
    soundEngine.init();
    const settings = get().settings;
    soundEngine.setVolumes(settings.masterVolume, settings.sfxVolume, settings.ambienceVolume, settings.musicVolume);

    // Add first snapshots
    get().unlockSnapshot('snap_vance_letter');
    get().unlockSnapshot('snap_first_carrier');

    set({
      gameStarted: true,
      isPaused: false,
      isGameOver: false,
      gameOverReason: null,
      gameOverCountdown: 4,
      sanity: 100,
      currentSector: 'RADIO_ROOM',
      activeEnding: null,
      isNewGamePlus: false,
      isChapterReplay: false,
      replayChapterId: null,
      activeVariations: [],
      currentObjectiveIndex: 0,
      objectiveHistory: [0],
      currentFrequency: 12.82,
      targetFrequency: 13.13,
      signalLocked: false,
      hasHeardFirstSignal: false,
      hasReadMaintenanceNote: false,
      hasCollectedFuse: false,
      hasRestoredPower: false,
      hasCollectedMapPiece: false,
      hasFoundArchiveKey: false,
      hasPlayedTapeA: false,
      hasTunedSecondFrequency: false,
      isBeaconCalibrated: false,
      generatorDoorUnlocked: false,
      archiveDoorUnlocked: false,
      archiveCabinetUnlocked: false,
      sleepingQuartersUnlocked: false,
      signalTowerUnlocked: false,
      radioTunerOpen: false,
      noteViewerOpen: false,
      choiceModalOpen: false,
      narrativeRecapOpen: false,
      snapshotJournalOpen: false,
      chapterSelectOpen: false,
      objectiveHistoryOpen: false,
      controlsLayoutOpen: false,
      inventoryOpen: false,
      investigationBoardOpen: false,
      cassettePlayerOpen: false,
      beaconCalibrationOpen: false,
      flashlightOn: true,
      inventory: [],
      evidenceUnlocked: ['signal_13_first', 'former_operator_log'],
      tensionLevel: 0,
      wetFootprintsVisible: false,
      photoChanged: false,
      beaconSettings: { frequency: 12.5, power: 30, azimuth: 120 },
      virtualMove: { forward: false, backward: false, left: false, right: false, sprint: false },
    });

    get().persistCurrentState();
    get().showSubtitles("Gale-force storm escalating. Check the main radio console to monitor weather broadcasts.", 6000);
  },

  // Start New Game+ with preserved profile & deterministic story variations
  startNewGamePlus: () => {
    soundEngine.init();
    const settings = get().settings;
    soundEngine.setVolumes(settings.masterVolume, settings.sfxVolume, settings.ambienceVolume, settings.musicVolume);

    const activeVars: string[] = ['VAR_RADIO_ECHO_1313', 'VAR_ARCHIVE_VANCE_LETTER', 'VAR_GLITCHED_CHART_ANOMALY'];
    if (get().endingsUnlocked.silentFrequency || get().endingsUnlocked.unknownSignal) {
      activeVars.push('VAR_OCEAN_TIMELINE_FLASH');
    }

    set({
      gameStarted: true,
      isPaused: false,
      isGameOver: false,
      gameOverReason: null,
      gameOverCountdown: 4,
      sanity: 100,
      currentSector: 'RADIO_ROOM',
      activeEnding: null,
      isNewGamePlus: true,
      isChapterReplay: false,
      replayChapterId: null,
      activeVariations: activeVars,
      currentObjectiveIndex: 0,
      objectiveHistory: [0],
      currentFrequency: 12.82,
      targetFrequency: 13.13,
      signalLocked: false,
      hasHeardFirstSignal: false,
      hasReadMaintenanceNote: false,
      hasCollectedFuse: false,
      hasRestoredPower: false,
      hasCollectedMapPiece: false,
      hasFoundArchiveKey: false,
      hasPlayedTapeA: false,
      hasTunedSecondFrequency: false,
      isBeaconCalibrated: false,
      generatorDoorUnlocked: false,
      archiveDoorUnlocked: false,
      archiveCabinetUnlocked: false,
      sleepingQuartersUnlocked: false,
      signalTowerUnlocked: false,
      radioTunerOpen: false,
      noteViewerOpen: false,
      choiceModalOpen: false,
      narrativeRecapOpen: false,
      snapshotJournalOpen: false,
      chapterSelectOpen: false,
      objectiveHistoryOpen: false,
      controlsLayoutOpen: false,
      inventoryOpen: false,
      investigationBoardOpen: false,
      cassettePlayerOpen: false,
      beaconCalibrationOpen: false,
      flashlightOn: true,
      inventory: [],
      evidenceUnlocked: ['signal_13_first', 'former_operator_log'],
      tensionLevel: 0,
      wetFootprintsVisible: false,
      photoChanged: false,
      beaconSettings: { frequency: 12.5, power: 30, azimuth: 120 },
      virtualMove: { forward: false, backward: false, left: false, right: false, sprint: false },
    });

    get().unlockSnapshot('snap_vance_letter');
    get().unlockSnapshot('snap_first_carrier');
    get().persistCurrentState();
    get().showSubtitles("NEW GAME+ ACTIVE: Timeline memories persist. Anomalous carrier harmonics detected.", 7000);
  },

  // Start Chapter Replay safely without corrupting main campaign save
  startChapterReplay: (chapterId: string) => {
    soundEngine.init();
    const settings = get().settings;
    soundEngine.setVolumes(settings.masterVolume, settings.sfxVolume, settings.ambienceVolume, settings.musicVolume);

    const chapterState = createChapterInitialState(chapterId);

    set({
      gameStarted: true,
      isPaused: false,
      isGameOver: false,
      gameOverReason: null,
      gameOverCountdown: 4,
      sanity: 100,
      currentSector: chapterState.currentSector,
      activeEnding: null,
      isNewGamePlus: false,
      isChapterReplay: true,
      replayChapterId: chapterId,
      activeVariations: ['VAR_RADIO_ECHO_1313', 'VAR_ARCHIVE_VANCE_LETTER'],
      currentObjectiveIndex: chapterState.currentObjectiveIndex,
      objectiveHistory: [chapterState.currentObjectiveIndex],
      currentFrequency: chapterState.currentFrequency,
      targetFrequency: chapterState.targetFrequency,
      signalLocked: chapterState.signalLocked,
      hasHeardFirstSignal: chapterState.hasHeardFirstSignal,
      hasReadMaintenanceNote: chapterState.hasReadMaintenanceNote,
      hasCollectedFuse: chapterState.hasCollectedFuse,
      hasRestoredPower: chapterState.hasRestoredPower,
      hasCollectedMapPiece: chapterState.hasCollectedMapPiece,
      hasFoundArchiveKey: chapterState.hasFoundArchiveKey,
      hasPlayedTapeA: chapterState.hasPlayedTapeA,
      hasTunedSecondFrequency: chapterState.hasTunedSecondFrequency,
      isBeaconCalibrated: chapterState.isBeaconCalibrated,
      generatorDoorUnlocked: chapterState.generatorDoorUnlocked,
      archiveDoorUnlocked: chapterState.archiveDoorUnlocked,
      archiveCabinetUnlocked: chapterState.archiveCabinetUnlocked,
      sleepingQuartersUnlocked: chapterState.sleepingQuartersUnlocked,
      signalTowerUnlocked: chapterState.signalTowerUnlocked,
      radioTunerOpen: false,
      noteViewerOpen: false,
      choiceModalOpen: false,
      narrativeRecapOpen: false,
      snapshotJournalOpen: false,
      chapterSelectOpen: false,
      objectiveHistoryOpen: false,
      controlsLayoutOpen: false,
      inventoryOpen: false,
      investigationBoardOpen: false,
      cassettePlayerOpen: false,
      beaconCalibrationOpen: false,
      flashlightOn: true,
      inventory: chapterState.inventory,
      evidenceUnlocked: chapterState.evidenceUnlocked,
      tensionLevel: chapterState.tensionLevel,
      wetFootprintsVisible: chapterState.wetFootprintsVisible,
      photoChanged: chapterState.photoChanged,
      beaconSettings: chapterState.beaconSettings,
      virtualMove: { forward: false, backward: false, left: false, right: false, sprint: false },
    });

    const chapterInfo = CHAPTER_LIST.find((c) => c.id === chapterId);
    get().showSubtitles(`REPLAY SESSION: Loaded ${chapterInfo?.title || chapterId}. Main campaign progress preserved.`, 6500);
  },

  pauseGame: () => {
    set({ isPaused: true });
  },

  resumeGame: () => {
    set({ isPaused: false });
  },

  exitToTitle: () => {
    soundEngine.stopAllAudio();
    get().persistCurrentState();
    set({
      gameStarted: false,
      isPaused: false,
      isGameOver: false,
      radioTunerOpen: false,
      noteViewerOpen: false,
      choiceModalOpen: false,
      narrativeRecapOpen: false,
      snapshotJournalOpen: false,
      chapterSelectOpen: false,
      objectiveHistoryOpen: false,
      controlsLayoutOpen: false,
      inventoryOpen: false,
      investigationBoardOpen: false,
      cassettePlayerOpen: false,
      beaconCalibrationOpen: false,
      activeEnding: null,
    });
  },

  triggerGameOver: (reason: string) => {
    if (get().isGameOver) return;

    soundEngine.playGameOverGlitch();
    set({
      isGameOver: true,
      gameOverReason: reason,
      gameOverCountdown: 4,
      radioTunerOpen: false,
      noteViewerOpen: false,
      choiceModalOpen: false,
      narrativeRecapOpen: false,
      snapshotJournalOpen: false,
      chapterSelectOpen: false,
      objectiveHistoryOpen: false,
      controlsLayoutOpen: false,
      inventoryOpen: false,
      investigationBoardOpen: false,
      cassettePlayerOpen: false,
      beaconCalibrationOpen: false,
    });

    let count = 4;
    const interval = setInterval(() => {
      count -= 1;
      set({ gameOverCountdown: count });
      if (count <= 0) {
        clearInterval(interval);
        get().startGame();
      }
    }, 1000);
  },

  setSector: (sector: SectorType) => {
    if (get().currentSector !== sector) {
      set({ currentSector: sector });
    }
  },

  setVirtualMove: (key: keyof VirtualMove, active: boolean) => {
    set((state) => ({
      virtualMove: {
        ...state.virtualMove,
        [key]: active,
      },
    }));
  },

  setLookDragDelta: (x: number, y: number) => {
    set({ lookDragDelta: { x, y } });
  },

  triggerVirtualInteract: () => {
    set((state) => ({ virtualInteractCount: state.virtualInteractCount + 1 }));
  },

  toggleFlashlight: () => {
    soundEngine.playUIClick();
    set((state) => ({ flashlightOn: !state.flashlightOn }));
  },

  adjustSanity: (delta: number) => {
    const current = get().sanity;
    const next = Math.max(0, Math.min(100, current + delta));
    set({ sanity: next });

    if (next <= 0 && !get().isGameOver) {
      get().triggerGameOver("PSYCHOLOGICAL COLLAPSE: Reality has destabilized. The station never made it past 01:13 AM.");
    }
  },

  setObjective: (index: number) => {
    const clamped = Math.min(index, OBJECTIVES.length - 1);
    if (clamped !== get().currentObjectiveIndex) {
      const history = Array.from(new Set([...get().objectiveHistory, clamped]));
      set({ currentObjectiveIndex: clamped, objectiveHistory: history });
      soundEngine.playObjectiveUpdate();

      // Unlock corresponding chapter in chapter select
      let chapterToUnlock: string | null = null;
      if (clamped >= 2) chapterToUnlock = 'CH_2_FREQUENCY_1313';
      if (clamped >= 3) chapterToUnlock = 'CH_3_BLACK_TIDE_RECORDS';
      if (clamped >= 6) chapterToUnlock = 'CH_4_BEACON_CALIBRATION';
      if (clamped >= 8) chapterToUnlock = 'CH_5_SIGNAL_TOWER';

      if (chapterToUnlock && !get().unlockedChapters.includes(chapterToUnlock)) {
        set((state) => ({
          unlockedChapters: [...state.unlockedChapters, chapterToUnlock!],
        }));
      }

      if (!get().isChapterReplay) {
        get().persistCurrentState();
      }
    }
  },

  setInteractionPrompt: (prompt: string | null) => {
    if (get().interactionPrompt !== prompt) {
      set({ interactionPrompt: prompt });
    }
  },

  showSubtitles: (text: string, durationMs = 5000) => {
    if (!get().settings.subtitlesEnabled) return;

    const { subtitleTimer } = get();
    if (subtitleTimer) clearTimeout(subtitleTimer);

    const timer = setTimeout(() => {
      set({ subtitles: null, subtitleTimer: null });
    }, durationMs);

    set({ subtitles: text, subtitleTimer: timer });
  },

  // --- INVENTORY SYSTEM ---
  collectItem: (itemId: string) => {
    if (!get().inventory.includes(itemId)) {
      soundEngine.playUIClick();
      set((state) => ({
        inventory: [...state.inventory, itemId],
      }));
      const item = INVENTORY_ITEMS[itemId];
      if (item) {
        get().showSubtitles(`Collected: ${item.name}`, 4000);
      }
      if (!get().isChapterReplay) {
        get().persistCurrentState();
      }
    }
  },

  hasItem: (itemId: string) => {
    return get().inventory.includes(itemId);
  },

  openInventory: () => {
    soundEngine.playUIClick();
    set({ inventoryOpen: true, isPaused: false });
  },

  closeInventory: () => {
    soundEngine.playUIClick();
    set({ inventoryOpen: false, inspectedItemId: null });
  },

  setInspectedItem: (itemId: string | null) => {
    set({ inspectedItemId: itemId });
    if (itemId) soundEngine.playUIClick();
  },

  // --- EVIDENCE & SNAPSHOT ACTIONS ---
  unlockEvidence: (evidenceId: string) => {
    const currentList = get().evidenceUnlocked;
    const allList = get().allDiscoveredEvidence;

    const nextCurrent = currentList.includes(evidenceId) ? currentList : [...currentList, evidenceId];
    const nextAll = allList.includes(evidenceId) ? allList : [...allList, evidenceId];

    if (!currentList.includes(evidenceId) || !allList.includes(evidenceId)) {
      set({ evidenceUnlocked: nextCurrent, allDiscoveredEvidence: nextAll });
      const ev = EVIDENCE_DATABASE[evidenceId];
      if (ev) {
        get().showSubtitles(`Investigation Clue Added: ${ev.title}`, 4500);
      }
      get().persistCurrentState();
    }
  },

  unlockSnapshot: (snapshotId: string) => {
    if (!SNAPSHOT_DATABASE[snapshotId]) return;
    if (!get().snapshots.includes(snapshotId)) {
      const updated = [...get().snapshots, snapshotId];
      set({ snapshots: updated });
      const snap = SNAPSHOT_DATABASE[snapshotId];
      get().showSubtitles(`Snapshot Recorded: ${snap.title}`, 4500);
      get().persistCurrentState();
    }
  },

  openInvestigationBoard: () => {
    soundEngine.playUIClick();
    set({ investigationBoardOpen: true, isPaused: false });
  },

  closeInvestigationBoard: () => {
    soundEngine.playUIClick();
    set({ investigationBoardOpen: false });
  },

  openSnapshotJournal: () => {
    soundEngine.playUIClick();
    set({ snapshotJournalOpen: true, isPaused: false });
  },

  closeSnapshotJournal: () => {
    soundEngine.playUIClick();
    set({ snapshotJournalOpen: false });
  },

  openChapterSelect: () => {
    soundEngine.playUIClick();
    set({ chapterSelectOpen: true });
  },

  closeChapterSelect: () => {
    soundEngine.playUIClick();
    set({ chapterSelectOpen: false });
  },

  openObjectiveHistory: () => {
    soundEngine.playUIClick();
    set({ objectiveHistoryOpen: true, isPaused: false });
  },

  closeObjectiveHistory: () => {
    soundEngine.playUIClick();
    set({ objectiveHistoryOpen: false });
  },

  openControlsLayout: () => {
    soundEngine.playUIClick();
    set({ controlsLayoutOpen: true });
  },

  closeControlsLayout: () => {
    soundEngine.playUIClick();
    set({ controlsLayoutOpen: false });
  },

  openNarrativeRecap: () => {
    soundEngine.playUIClick();
    set({ narrativeRecapOpen: true, isPaused: false });
  },

  closeNarrativeRecap: () => {
    soundEngine.playUIClick();
    set({ narrativeRecapOpen: false });
  },

  canTriggerUnknownSignal: () => {
    const evidence = get().evidenceUnlocked;
    const inventory = get().inventory;
    const hasTapeB = inventory.includes('cassette_tape_b') || evidence.includes('tape_a_recording');
    const hasTimelineClue = evidence.includes('time_loop_evidence') || evidence.includes('sleeping_quarters_photo');
    const hasDossier = evidence.includes('operator_final_dossier') || evidence.includes('station_blueprint_grid');
    return hasTapeB && (hasTimelineClue || hasDossier);
  },

  // --- RADIO MODAL ---
  openRadioTuner: () => {
    soundEngine.playUIClick();
    set({ radioTunerOpen: true, isPaused: false });
    soundEngine.updateRadioStatic(get().currentFrequency, get().targetFrequency, true);
  },

  closeRadioTuner: () => {
    soundEngine.playUIClick();
    set({ radioTunerOpen: false });
    soundEngine.updateRadioStatic(get().currentFrequency, get().targetFrequency, false);
  },

  setFrequency: (freq: number) => {
    const rounded = Math.round(freq * 100) / 100;
    set({ currentFrequency: rounded });
    soundEngine.updateRadioStatic(rounded, get().targetFrequency, true);

    const target = get().targetFrequency;
    if (Math.abs(rounded - target) < 0.04 && !get().signalLocked) {
      get().lockSignal();
    }
  },

  lockSignal: () => {
    set({ signalLocked: true });
    soundEngine.playSignalLockTone();

    const target = get().targetFrequency;

    if (Math.abs(target - 13.13) < 0.05 && !get().hasHeardFirstSignal) {
      set({ hasHeardFirstSignal: true, generatorDoorUnlocked: true });
      get().unlockSnapshot('snap_first_carrier');

      const isNGP = get().isNewGamePlus;
      const transcript = isNGP
        ? `${RADIO_TRANSCRIPTS.FIRST_SIGNAL} [ECHO: "...The circuit remembers you..."]`
        : RADIO_TRANSCRIPTS.FIRST_SIGNAL;

      setTimeout(() => {
        soundEngine.speakRadioTransmission(transcript, () => {
          get().showSubtitles(`RADIO: "${transcript}"`, 7500);
          get().setObjective(2);
        });
      }, 600);
    } else if (Math.abs(target - 14.28) < 0.05 && !get().hasTunedSecondFrequency) {
      set({ hasTunedSecondFrequency: true });
      get().unlockEvidence('second_radio_frequency');
      get().collectItem('beacon_calibration_note');
      get().unlockEvidence('beacon_calibration_data');
      get().unlockSnapshot('snap_ghost_freq_1428');

      setTimeout(() => {
        soundEngine.speakRadioTransmission(RADIO_TRANSCRIPTS.SECOND_SIGNAL_1428, () => {
          get().showSubtitles(`RADIO: "${RADIO_TRANSCRIPTS.SECOND_SIGNAL_1428}"`, 8000);
          get().setObjective(7);
        });
      }, 600);
    }
  },

  // --- NOTE VIEWER ---
  openNoteViewer: (note: NoteData) => {
    soundEngine.playUIClick();
    if (note.id === 'maint_note_01') {
      set({ hasReadMaintenanceNote: true });
      get().unlockEvidence('former_operator_log');
      get().unlockSnapshot('snap_vance_letter');
    } else if (note.id === 'black_tide_report_86') {
      get().unlockEvidence('black_tide_incident');
      get().unlockSnapshot('snap_black_tide_file');
    } else if (note.id === 'eli_diary_note_01') {
      get().unlockEvidence('time_loop_evidence');
      get().unlockSnapshot('snap_glitched_clock');
    } else if (note.id === 'operator_final_log') {
      get().unlockEvidence('operator_final_dossier');
      get().unlockSnapshot('snap_tower_dossier');
    } else if (note.id === 'vance_unsent_letter') {
      get().unlockEvidence('former_operator_log');
      get().unlockSnapshot('snap_vance_letter');
    } else if (note.id === 'hydrographic_survey_note') {
      get().unlockEvidence('black_tide_incident');
      get().unlockSnapshot('snap_ocean_trench_light');
    }
    set({ noteViewerOpen: true, activeNote: note });
  },

  closeNoteViewer: () => {
    soundEngine.playUIClick();
    set({ noteViewerOpen: false, activeNote: null });
  },

  // --- CASSETTE PLAYER ---
  openCassettePlayer: (tapeId: 'cassette_tape_a' | 'cassette_tape_b') => {
    soundEngine.playTapeInsert();
    set({ cassettePlayerOpen: true, activeCassetteId: tapeId, isPaused: false });
  },

  closeCassettePlayer: () => {
    soundEngine.playUIClick();
    set({ cassettePlayerOpen: false, activeCassetteId: null });
  },

  completeTapeDecryption: () => {
    set({
      hasPlayedTapeA: true,
      targetFrequency: 14.28,
      signalLocked: false,
    });
    get().unlockEvidence('tape_a_recording');
    get().unlockSnapshot('snap_ghost_freq_1428');
    get().setObjective(6);
    get().showSubtitles("Tape Decoded: Spoken frequency intercepted -> 14.28 MHz. Return to Radio console.", 6000);
  },

  // --- BEACON CALIBRATION ---
  openBeaconCalibration: () => {
    soundEngine.playUIClick();
    set({ beaconCalibrationOpen: true, isPaused: false });
  },

  closeBeaconCalibration: () => {
    soundEngine.playUIClick();
    set({ beaconCalibrationOpen: false });
  },

  updateBeaconSettings: (newSettings: Partial<BeaconSettings>) => {
    const updated = { ...get().beaconSettings, ...newSettings };
    set({ beaconSettings: updated });
  },

  checkBeaconCalibration: () => {
    const { frequency, power, azimuth } = get().beaconSettings;
    const freqOk = Math.abs(frequency - 13.13) < 0.05;
    const powerOk = Math.abs(power - 85) <= 2;
    const azimuthOk = Math.abs(azimuth - 240) <= 5;

    if (freqOk && powerOk && azimuthOk) {
      if (!get().isBeaconCalibrated) {
        set({
          isBeaconCalibrated: true,
          signalTowerUnlocked: true,
          tensionLevel: 3,
        });
        soundEngine.playCalibrationComplete();
        get().unlockEvidence('signal_tower_array');
        get().unlockSnapshot('snap_beacon_optical_array');
        get().showSubtitles("BEACON CALIBRATION OPTIMAL: Resonance 100%. Signal Tower upper ladder hatch unlocked!", 6500);
        get().setObjective(8);
      }
      return true;
    }
    return false;
  },

  // --- PUZZLE SEQUENCE & PROGRESSION ---
  collectFuse: () => {
    soundEngine.playUIClick();
    set({ hasCollectedFuse: true });
    get().collectItem('emergency_fuse');
    get().showSubtitles("Collected: 200A Emergency Ceramic Fuse. Ready for auxiliary generator.", 4000);
  },

  restorePower: () => {
    soundEngine.playFuseInsert();
    set({
      hasRestoredPower: true,
      archiveDoorUnlocked: true,
      sleepingQuartersUnlocked: true,
      tensionLevel: 1,
      wetFootprintsVisible: true,
    });

    get().unlockSnapshot('snap_ocean_trench_light');
    get().showSubtitles("Generator online. Auxiliary power active. Archive Room and Sleeping Quarters unlocked.", 6000);
    get().setObjective(3);
  },

  unlockArchiveCabinet: () => {
    soundEngine.playKeyUnlock();
    set({
      archiveCabinetUnlocked: true,
      tensionLevel: 2,
    });
    get().collectItem('cassette_tape_a');
    get().unlockSnapshot('snap_black_tide_file');
    get().showSubtitles("Archive Security Cabinet Unlocked! Retrieved Cassette Tape #1.", 5000);
    get().setObjective(5);
  },

  openChoiceModal: () => {
    soundEngine.playUIClick();
    set({ choiceModalOpen: true });
  },

  closeChoiceModal: () => {
    soundEngine.playUIClick();
    set({ choiceModalOpen: false });
  },

  triggerEnding: (ending: 'BEACON' | 'SILENT_FREQUENCY' | 'UNKNOWN_SIGNAL') => {
    set({
      choiceModalOpen: false,
      narrativeRecapOpen: false,
      activeEnding: ending,
      hasCompletedBefore: true,
      totalPlaythroughs: get().totalPlaythroughs + 1,
    });

    const unlocked = { ...get().endingsUnlocked };
    const witnessed = Array.from(new Set([...get().witnessedEndings, ending]));

    // All chapters unlocked when completing any ending
    const allChapters = CHAPTER_LIST.map((c) => c.id);

    if (ending === 'BEACON') {
      unlocked.beacon = true;
      soundEngine.playBeaconSound();
      get().unlockSnapshot('snap_beacon_optical_array');
      soundEngine.speakRadioTransmission(RADIO_TRANSCRIPTS.BEACON_ENDING, () => {
        get().showSubtitles(`RADIO: "${RADIO_TRANSCRIPTS.BEACON_ENDING}"`, 8000);
      });
    } else if (ending === 'SILENT_FREQUENCY') {
      unlocked.silentFrequency = true;
      soundEngine.playLightFlicker();
      get().showSubtitles(`RADIO: "${RADIO_TRANSCRIPTS.SILENT_ENDING}"`, 8000);
    } else if (ending === 'UNKNOWN_SIGNAL') {
      unlocked.unknownSignal = true;
      soundEngine.playBeaconSound();
      get().unlockEvidence('operator_final_dossier');
      get().unlockEvidence('signal_tower_array');
      get().unlockSnapshot('snap_tower_dossier');
      soundEngine.speakRadioTransmission(RADIO_TRANSCRIPTS.UNKNOWN_SIGNAL_ENDING, () => {
        get().showSubtitles(`RADIO: "${RADIO_TRANSCRIPTS.UNKNOWN_SIGNAL_ENDING}"`, 9000);
      });
    }

    set({
      endingsUnlocked: unlocked,
      witnessedEndings: witnessed,
      unlockedChapters: allChapters,
    });

    get().persistCurrentState();
  },

  resetGame: () => {
    get().startGame();
  },

  // Resets only current campaign progression; preserves profile, endings, snapshots, and settings
  resetMainProgression: () => {
    set({
      gameStarted: false,
      isPaused: false,
      isGameOver: false,
      activeEnding: null,
      isNewGamePlus: false,
      isChapterReplay: false,
      replayChapterId: null,
      currentObjectiveIndex: 0,
      objectiveHistory: [0],
      currentSector: 'RADIO_ROOM',
      currentFrequency: 12.82,
      targetFrequency: 13.13,
      signalLocked: false,
      inventory: [],
      evidenceUnlocked: ['signal_13_first', 'former_operator_log'],
      generatorDoorUnlocked: false,
      archiveDoorUnlocked: false,
      archiveCabinetUnlocked: false,
      sleepingQuartersUnlocked: false,
      signalTowerUnlocked: false,
      hasHeardFirstSignal: false,
      hasReadMaintenanceNote: false,
      hasCollectedFuse: false,
      hasRestoredPower: false,
      hasCollectedMapPiece: false,
      hasFoundArchiveKey: false,
      hasPlayedTapeA: false,
      hasTunedSecondFrequency: false,
      isBeaconCalibrated: false,
      tensionLevel: 0,
      sanity: 100,
      photoChanged: false,
      wetFootprintsVisible: false,
      beaconSettings: { frequency: 12.5, power: 30, azimuth: 120 },
    });

    get().persistCurrentState();
  },

  // Wipes all data completely after explicit confirmation
  resetAllProgress: () => {
    clearAllGameStorage();
    set({
      gameStarted: false,
      isPaused: false,
      isGameOver: false,
      activeEnding: null,
      hasCompletedBefore: false,
      totalPlaythroughs: 0,
      endingsUnlocked: { beacon: false, silentFrequency: false, unknownSignal: false },
      witnessedEndings: [],
      unlockedChapters: ['CH_1_NIGHT_SHIFT'],
      allDiscoveredEvidence: ['signal_13_first', 'former_operator_log'],
      snapshots: [],
      ngPlusVariationsEncountered: [],
      isNewGamePlus: false,
      isChapterReplay: false,
      replayChapterId: null,
      activeVariations: [],
      currentObjectiveIndex: 0,
      objectiveHistory: [0],
      currentSector: 'RADIO_ROOM',
      currentFrequency: 12.82,
      targetFrequency: 13.13,
      signalLocked: false,
      inventory: [],
      evidenceUnlocked: ['signal_13_first', 'former_operator_log'],
      generatorDoorUnlocked: false,
      archiveDoorUnlocked: false,
      archiveCabinetUnlocked: false,
      sleepingQuartersUnlocked: false,
      signalTowerUnlocked: false,
      hasHeardFirstSignal: false,
      hasReadMaintenanceNote: false,
      hasCollectedFuse: false,
      hasRestoredPower: false,
      hasCollectedMapPiece: false,
      hasFoundArchiveKey: false,
      hasPlayedTapeA: false,
      hasTunedSecondFrequency: false,
      isBeaconCalibrated: false,
      tensionLevel: 0,
      sanity: 100,
      photoChanged: false,
      wetFootprintsVisible: false,
      beaconSettings: { frequency: 12.5, power: 30, azimuth: 120 },
      settings: DEFAULT_SETTINGS,
    });
  },

  updateSettings: (newSettings: Partial<GameSettingsV4>) => {
    const updated = { ...get().settings, ...newSettings };
    set({ settings: updated });
    soundEngine.setVolumes(updated.masterVolume, updated.sfxVolume, updated.ambienceVolume, updated.musicVolume);
    get().persistCurrentState();
  },

  triggerLightning: () => {
    set({ isLightningActive: true, seaLightVisible: true });
    soundEngine.playThunder();

    setTimeout(() => {
      set({ isLightningActive: false });
      setTimeout(() => {
        set({ seaLightVisible: false });
      }, 1200);
    }, 350);
  },

  persistCurrentState: () => {
    const state = get();
    // Do not overwrite main campaign progression if player is currently in a temporary Chapter Replay
    const currentStored = loadSaveFromLocalStorage();

    const saveObj: SaveDataV4 = {
      saveVersion: CURRENT_SAVE_VERSION,
      progression: state.isChapterReplay ? currentStored.progression : {
        currentCheckpointChapterId: state.currentObjectiveIndex >= 8 ? 'CH_5_SIGNAL_TOWER'
          : state.currentObjectiveIndex >= 6 ? 'CH_4_BEACON_CALIBRATION'
          : state.currentObjectiveIndex >= 3 ? 'CH_3_BLACK_TIDE_RECORDS'
          : state.currentObjectiveIndex >= 2 ? 'CH_2_FREQUENCY_1313'
          : 'CH_1_NIGHT_SHIFT',
        currentObjectiveIndex: state.currentObjectiveIndex,
        objectiveHistory: state.objectiveHistory,
        inventory: state.inventory,
        evidenceUnlocked: state.evidenceUnlocked,
        currentSector: state.currentSector,
        currentFrequency: state.currentFrequency,
        targetFrequency: state.targetFrequency,
        signalLocked: state.signalLocked,
        beaconSettings: state.beaconSettings,
        generatorDoorUnlocked: state.generatorDoorUnlocked,
        archiveDoorUnlocked: state.archiveDoorUnlocked,
        archiveCabinetUnlocked: state.archiveCabinetUnlocked,
        sleepingQuartersUnlocked: state.sleepingQuartersUnlocked,
        signalTowerUnlocked: state.signalTowerUnlocked,
        hasHeardFirstSignal: state.hasHeardFirstSignal,
        hasReadMaintenanceNote: state.hasReadMaintenanceNote,
        hasCollectedFuse: state.hasCollectedFuse,
        hasRestoredPower: state.hasRestoredPower,
        hasCollectedMapPiece: state.hasCollectedMapPiece,
        hasFoundArchiveKey: state.hasFoundArchiveKey,
        hasPlayedTapeA: state.hasPlayedTapeA,
        hasTunedSecondFrequency: state.hasTunedSecondFrequency,
        isBeaconCalibrated: state.isBeaconCalibrated,
        tensionLevel: state.tensionLevel,
        sanity: state.sanity,
        photoChanged: state.photoChanged,
        wetFootprintsVisible: state.wetFootprintsVisible,
      },
      profile: {
        hasCompletedBefore: state.hasCompletedBefore,
        totalPlaythroughs: state.totalPlaythroughs,
        endingsUnlocked: state.endingsUnlocked,
        allDiscoveredEvidence: state.allDiscoveredEvidence,
        snapshots: state.snapshots,
        unlockedChapters: state.unlockedChapters,
        witnessedEndings: state.witnessedEndings,
        ngPlusVariationsEncountered: state.ngPlusVariationsEncountered,
      },
      settings: state.settings,
      replay: {
        isNewGamePlus: state.isNewGamePlus,
        isChapterReplay: state.isChapterReplay,
        replayChapterId: state.replayChapterId,
        activeVariations: state.activeVariations,
      },
    };

    saveToLocalStorage(saveObj);
  },
}));
