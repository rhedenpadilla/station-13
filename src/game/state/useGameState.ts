import { create } from 'zustand';
import { NoteData, OBJECTIVES, RADIO_TRANSCRIPTS } from '../constants/gameData';
import { INVENTORY_ITEMS, InventoryItem } from '../constants/inventoryData';
import { EVIDENCE_DATABASE, EvidenceItem } from '../constants/evidenceData';
import { soundEngine } from '../audio/SoundEngine';

export type EndingType = 'BEACON' | 'SILENT_FREQUENCY' | null;
export type GraphicsQuality = 'LOW' | 'MEDIUM' | 'HIGH';
export type VirtualControlsMode = 'AUTO' | 'ALWAYS_ON' | 'DISABLED';
export type SectorType = 'RADIO_ROOM' | 'HALLWAY' | 'OBSERVATION_DECK' | 'GENERATOR_ROOM' | 'ARCHIVE_ROOM' | 'SLEEPING_QUARTERS';

export interface GameSettings {
  masterVolume: number;
  sfxVolume: number;
  ambienceVolume: number;
  musicVolume: number;
  graphicsQuality: GraphicsQuality;
  virtualControlsMode: VirtualControlsMode;
  mouseSensitivity: number;
  cameraShake: boolean;
  reducedFlashing: boolean;
  subtitlesEnabled: boolean;
}

export interface VirtualMove {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
}

export interface BeaconSettings {
  frequency: number;
  power: number;
  azimuth: number;
}

export interface GameState {
  // Navigation & Screens
  gameStarted: boolean;
  isPaused: boolean;
  activeEnding: EndingType;
  hasCompletedBefore: boolean;
  endingsUnlocked: {
    beacon: boolean;
    silentFrequency: boolean;
  };

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
  interactionPrompt: string | null;
  subtitles: string | null;
  subtitleTimer: ReturnType<typeof setTimeout> | null;

  // Inventory & Evidence Systems
  inventory: string[]; // List of item IDs
  evidenceUnlocked: string[]; // List of evidence IDs
  inspectedItemId: string | null;

  // Station & Room Unlock States
  generatorDoorUnlocked: boolean;
  archiveDoorUnlocked: boolean;
  archiveCabinetUnlocked: boolean;
  sleepingQuartersUnlocked: boolean;

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
  tensionLevel: number; // 0 to 4
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

  // Settings
  settings: GameSettings;

  // Actions
  startGame: () => void;
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

  // Evidence Actions
  unlockEvidence: (evidenceId: string) => void;
  openInvestigationBoard: () => void;
  closeInvestigationBoard: () => void;

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
  triggerEnding: (ending: 'BEACON' | 'SILENT_FREQUENCY') => void;
  resetGame: () => void;
  resetAllProgress: () => void;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  triggerLightning: () => void;
}

const STORAGE_KEY = 'DEAD_AIR_SIGNAL_13_SAVE_V2';

const loadSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to load local storage save", e);
  }
  return null;
};

const defaultSettings: GameSettings = {
  masterVolume: 0.8,
  sfxVolume: 0.9,
  ambienceVolume: 0.7,
  musicVolume: 0.75,
  graphicsQuality: 'HIGH',
  virtualControlsMode: 'AUTO',
  mouseSensitivity: 1.0,
  cameraShake: false,
  reducedFlashing: false,
  subtitlesEnabled: true,
};

const saved = loadSavedData();

export const useGameState = create<GameState>((set, get) => ({
  gameStarted: false,
  isPaused: false,
  activeEnding: null,
  hasCompletedBefore: saved?.hasCompletedBefore || false,
  endingsUnlocked: saved?.endingsUnlocked || { beacon: false, silentFrequency: false },

  // Game Over & Sanity
  isGameOver: false,
  gameOverReason: null,
  gameOverCountdown: 4,
  sanity: 100,
  currentSector: 'RADIO_ROOM',

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

  // Objectives & Guidance
  currentObjectiveIndex: 0,
  interactionPrompt: null,
  subtitles: null,
  subtitleTimer: null,

  // Inventory & Evidence
  inventory: [],
  evidenceUnlocked: ['signal_13_first', 'former_operator_log'],
  inspectedItemId: null,

  // Station Doors & Locks
  generatorDoorUnlocked: false,
  archiveDoorUnlocked: false,
  archiveCabinetUnlocked: false,
  sleepingQuartersUnlocked: false,

  // Puzzle Flags
  hasHeardFirstSignal: false,
  hasReadMaintenanceNote: false,
  hasCollectedFuse: false,
  hasRestoredPower: false,
  hasCollectedMapPiece: false,
  hasFoundArchiveKey: false,
  hasPlayedTapeA: false,
  hasTunedSecondFrequency: false,
  isBeaconCalibrated: false,

  // Beacon Settings (Defaults)
  beaconSettings: {
    frequency: 12.5,
    power: 30,
    azimuth: 120,
  },

  // Environmental Tension
  tensionLevel: 0,
  wetFootprintsVisible: false,
  photoChanged: false,
  sleepingQuartersClockGlitched: true,
  isLightningActive: false,
  seaLightVisible: false,

  // Modals
  radioTunerOpen: false,
  currentFrequency: 12.82,
  targetFrequency: 13.13,
  signalLocked: false,

  noteViewerOpen: false,
  activeNote: null,

  inventoryOpen: false,
  investigationBoardOpen: false,
  cassettePlayerOpen: false,
  activeCassetteId: null,
  beaconCalibrationOpen: false,
  choiceModalOpen: false,

  settings: saved?.settings ? { ...defaultSettings, ...saved.settings } : defaultSettings,

  startGame: () => {
    soundEngine.init();
    const settings = get().settings;
    soundEngine.setVolumes(settings.masterVolume, settings.sfxVolume, settings.ambienceVolume, settings.musicVolume);

    set({
      gameStarted: true,
      isPaused: false,
      isGameOver: false,
      gameOverReason: null,
      gameOverCountdown: 4,
      sanity: 100,
      currentSector: 'RADIO_ROOM',
      activeEnding: null,
      currentObjectiveIndex: 0,
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
      radioTunerOpen: false,
      noteViewerOpen: false,
      choiceModalOpen: false,
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

    get().showSubtitles("Gale-force storm escalating. Check the main radio console to monitor weather broadcasts.", 6000);
  },

  pauseGame: () => {
    set({ isPaused: true });
  },

  resumeGame: () => {
    set({ isPaused: false });
  },

  exitToTitle: () => {
    soundEngine.stopAllAudio();
    set({
      gameStarted: false,
      isPaused: false,
      isGameOver: false,
      radioTunerOpen: false,
      noteViewerOpen: false,
      choiceModalOpen: false,
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
      set({ currentObjectiveIndex: clamped });
      soundEngine.playObjectiveUpdate();
    }
  },

  setInteractionPrompt: (prompt: string | null) => {
    set({ interactionPrompt: prompt });
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

  // --- EVIDENCE & INVESTIGATION BOARD ---
  unlockEvidence: (evidenceId: string) => {
    if (!get().evidenceUnlocked.includes(evidenceId)) {
      set((state) => ({
        evidenceUnlocked: [...state.evidenceUnlocked, evidenceId],
      }));
      const ev = EVIDENCE_DATABASE[evidenceId];
      if (ev) {
        get().showSubtitles(`Investigation Clue Added: ${ev.title}`, 4500);
      }
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

    // Check target locks
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

      setTimeout(() => {
        soundEngine.speakRadioTransmission(RADIO_TRANSCRIPTS.FIRST_SIGNAL, () => {
          get().showSubtitles(`RADIO: "${RADIO_TRANSCRIPTS.FIRST_SIGNAL}"`, 7000);
          get().setObjective(2); // Find fuse & restore generator
        });
      }, 600);
    } else if (Math.abs(target - 14.28) < 0.05 && !get().hasTunedSecondFrequency) {
      set({ hasTunedSecondFrequency: true });
      get().unlockEvidence('second_radio_frequency');
      get().collectItem('beacon_calibration_note');
      get().unlockEvidence('beacon_calibration_data');

      setTimeout(() => {
        soundEngine.speakRadioTransmission(RADIO_TRANSCRIPTS.SECOND_SIGNAL_1428, () => {
          get().showSubtitles(`RADIO: "${RADIO_TRANSCRIPTS.SECOND_SIGNAL_1428}"`, 8000);
          get().setObjective(7); // Calibrate beacon
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
    } else if (note.id === 'black_tide_report_86') {
      get().unlockEvidence('black_tide_incident');
    } else if (note.id === 'eli_diary_note_01') {
      get().unlockEvidence('time_loop_evidence');
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
    get().setObjective(6); // Tune to 14.28 MHz
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
        set({ isBeaconCalibrated: true });
        soundEngine.playCalibrationComplete();
        get().showSubtitles("BEACON CALIBRATION OPTIMAL: Resonance 100%. Auxiliary optical beam primed.", 6000);
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

    get().showSubtitles("Generator online. Auxiliary power active. Archive Room and Sleeping Quarters unlocked.", 6000);
    get().setObjective(3); // Search archive room
  },

  unlockArchiveCabinet: () => {
    soundEngine.playKeyUnlock();
    set({
      archiveCabinetUnlocked: true,
      tensionLevel: 2,
    });
    get().collectItem('cassette_tape_a');
    get().showSubtitles("Archive Security Cabinet Unlocked! Retrieved Cassette Tape #1.", 5000);
    get().setObjective(5); // Play cassette
  },

  openChoiceModal: () => {
    soundEngine.playUIClick();
    set({ choiceModalOpen: true });
  },

  closeChoiceModal: () => {
    soundEngine.playUIClick();
    set({ choiceModalOpen: false });
  },

  triggerEnding: (ending: 'BEACON' | 'SILENT_FREQUENCY') => {
    set({ choiceModalOpen: false, activeEnding: ending, hasCompletedBefore: true });

    const unlocked = { ...get().endingsUnlocked };
    if (ending === 'BEACON') {
      unlocked.beacon = true;
      soundEngine.playBeaconSound();
      soundEngine.speakRadioTransmission(RADIO_TRANSCRIPTS.BEACON_ENDING, () => {
        get().showSubtitles(`RADIO: "${RADIO_TRANSCRIPTS.BEACON_ENDING}"`, 8000);
      });
    } else {
      unlocked.silentFrequency = true;
      soundEngine.playLightFlicker();
      get().showSubtitles(`RADIO: "${RADIO_TRANSCRIPTS.SILENT_ENDING}"`, 8000);
    }

    set({ endingsUnlocked: unlocked });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        hasCompletedBefore: true,
        endingsUnlocked: unlocked,
        settings: get().settings,
      }));
    } catch (e) {
      console.warn("Failed to persist save", e);
    }
  },

  resetGame: () => {
    get().startGame();
  },

  resetAllProgress: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear local storage", e);
    }
    set({
      hasCompletedBefore: false,
      endingsUnlocked: { beacon: false, silentFrequency: false },
      gameStarted: false,
    });
  },

  updateSettings: (newSettings: Partial<GameSettings>) => {
    const updated = { ...get().settings, ...newSettings };
    set({ settings: updated });
    soundEngine.setVolumes(updated.masterVolume, updated.sfxVolume, updated.ambienceVolume, updated.musicVolume);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        hasCompletedBefore: get().hasCompletedBefore,
        endingsUnlocked: get().endingsUnlocked,
        settings: updated,
      }));
    } catch (e) {
      console.warn("Failed to persist settings", e);
    }
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
}));
