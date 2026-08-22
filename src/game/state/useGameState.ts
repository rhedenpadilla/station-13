import { create } from 'zustand';
import { NoteData, OBJECTIVES } from '../constants/gameData';
import { soundEngine } from '../audio/SoundEngine';

export type EndingType = 'BEACON' | 'SILENT_FREQUENCY' | null;
export type GraphicsQuality = 'LOW' | 'MEDIUM' | 'HIGH';

export interface GameSettings {
  masterVolume: number;
  sfxVolume: number;
  ambienceVolume: number;
  graphicsQuality: GraphicsQuality;
}

export interface VirtualMove {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
}

export type SectorType = 'RADIO_ROOM' | 'HALLWAY' | 'OBSERVATION_DECK' | 'GENERATOR_ROOM';

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

  // Game Over & Psychological Twist
  isGameOver: boolean;
  gameOverReason: string | null;
  gameOverCountdown: number;
  sanity: number; // 0 to 100
  currentSector: SectorType;

  // On-Screen Virtual Controls
  virtualMove: VirtualMove;
  virtualInteractCount: number;
  flashlightOn: boolean;

  // Story & Objectives
  currentObjectiveIndex: number;
  interactionPrompt: string | null;
  subtitles: string | null;
  subtitleTimer: ReturnType<typeof setTimeout> | null;

  // Station States
  radioTunerOpen: boolean;
  currentFrequency: number;
  targetFrequency: number;
  signalLocked: boolean;
  hasHeardFirstSignal: boolean;
  hasReadMaintenanceNote: boolean;
  hasCollectedFuse: boolean;
  hasRestoredPower: boolean;
  hasHeardSecondSignal: boolean;
  choiceModalOpen: boolean;
  generatorDoorUnlocked: boolean;

  // Note Viewer
  noteViewerOpen: boolean;
  activeNote: NoteData | null;

  // Visual effects state
  isLightningActive: boolean;
  seaLightVisible: boolean;

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
  triggerVirtualInteract: () => void;
  toggleFlashlight: () => void;
  adjustSanity: (delta: number) => void;
  setObjective: (index: number) => void;
  setInteractionPrompt: (prompt: string | null) => void;
  showSubtitles: (text: string, durationMs?: number) => void;
  openRadioTuner: () => void;
  closeRadioTuner: () => void;
  setFrequency: (freq: number) => void;
  lockSignal: () => void;
  openNoteViewer: (note: NoteData) => void;
  closeNoteViewer: () => void;
  collectFuse: () => void;
  restorePower: () => void;
  openChoiceModal: () => void;
  closeChoiceModal: () => void;
  triggerEnding: (ending: 'BEACON' | 'SILENT_FREQUENCY') => void;
  resetGame: () => void;
  resetAllProgress: () => void;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  triggerLightning: () => void;
}

const STORAGE_KEY = 'DEAD_AIR_SIGNAL_13_SAVE';

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
  graphicsQuality: 'HIGH',
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

  currentObjectiveIndex: 0,
  interactionPrompt: null,
  subtitles: null,
  subtitleTimer: null,

  radioTunerOpen: false,
  currentFrequency: 12.82,
  targetFrequency: 13.13,
  signalLocked: false,
  hasHeardFirstSignal: false,
  hasReadMaintenanceNote: false,
  hasCollectedFuse: false,
  hasRestoredPower: false,
  hasHeardSecondSignal: false,
  choiceModalOpen: false,
  generatorDoorUnlocked: false,

  noteViewerOpen: false,
  activeNote: null,

  isLightningActive: false,
  seaLightVisible: false,

  settings: saved?.settings || defaultSettings,

  startGame: () => {
    soundEngine.init();
    const settings = get().settings;
    soundEngine.setVolumes(settings.masterVolume, settings.sfxVolume, settings.ambienceVolume);

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
      signalLocked: false,
      hasHeardFirstSignal: false,
      hasReadMaintenanceNote: false,
      hasCollectedFuse: false,
      hasRestoredPower: false,
      hasHeardSecondSignal: false,
      generatorDoorUnlocked: false,
      radioTunerOpen: false,
      noteViewerOpen: false,
      choiceModalOpen: false,
      flashlightOn: true,
      virtualMove: { forward: false, backward: false, left: false, right: false, sprint: false },
    });

    get().showSubtitles("Storm escalating. Check the radio console to monitor weather broadcasts.", 6000);
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
    });

    // Auto-reset game countdown
    let count = 4;
    const interval = setInterval(() => {
      count -= 1;
      set({ gameOverCountdown: count });
      if (count <= 0) {
        clearInterval(interval);
        get().startGame(); // Auto reset the shift
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
    set({ currentObjectiveIndex: clamped });
    soundEngine.playUIClick();
  },

  setInteractionPrompt: (prompt: string | null) => {
    set({ interactionPrompt: prompt });
  },

  showSubtitles: (text: string, durationMs = 5000) => {
    const { subtitleTimer } = get();
    if (subtitleTimer) clearTimeout(subtitleTimer);

    const timer = setTimeout(() => {
      set({ subtitles: null, subtitleTimer: null });
    }, durationMs);

    set({ subtitles: text, subtitleTimer: timer });
  },

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

    // Check lock
    if (Math.abs(rounded - 13.13) < 0.04 && !get().signalLocked) {
      get().lockSignal();
    }
  },

  lockSignal: () => {
    set({ signalLocked: true });
    soundEngine.playSignalLockTone();

    if (!get().hasHeardFirstSignal) {
      set({ hasHeardFirstSignal: true, generatorDoorUnlocked: true });

      setTimeout(() => {
        soundEngine.speakRadioTransmission("Station 13. Restore the beacon circuit. Do not let the light go out.", () => {
          get().showSubtitles("RADIO: 'Station 13. Restore the beacon circuit. Do not let the light go out.'", 7000);
          get().setObjective(2); // Find fuse
        });
      }, 600);
    }
  },

  openNoteViewer: (note: NoteData) => {
    soundEngine.playUIClick();
    if (note.id === 'maint_note_01') {
      set({ hasReadMaintenanceNote: true });
    }
    set({ noteViewerOpen: true, activeNote: note });
  },

  closeNoteViewer: () => {
    soundEngine.playUIClick();
    set({ noteViewerOpen: false, activeNote: null });
  },

  collectFuse: () => {
    soundEngine.playUIClick();
    set({ hasCollectedFuse: true });
    get().showSubtitles("Collected: 200A Emergency Ceramic Fuse. Ready for generator panel.", 4000);
    get().setObjective(3);
  },

  restorePower: () => {
    soundEngine.playFuseInsert();
    set({
      hasRestoredPower: true,
      hasHeardSecondSignal: true,
    });

    get().showSubtitles("Generator online. Auxiliary power active. Station lights restored.", 5000);
    get().setObjective(4); // Return to radio room

    setTimeout(() => {
      soundEngine.speakRadioTransmission("The beacon circuit is primed. Final signal ready.", () => {
        get().showSubtitles("RADIO: 'The beacon circuit is primed. Final signal ready.'", 6000);
      });
    }, 3500);
  },

  openChoiceModal: () => {
    soundEngine.playUIClick();
    set({ choiceModalOpen: true });
    get().setObjective(5);
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
      soundEngine.speakRadioTransmission("Signal received. Beacon online.", () => {
        get().showSubtitles("RADIO: 'Signal received. Beacon online.'", 6000);
      });
    } else {
      unlocked.silentFrequency = true;
      soundEngine.playLightFlicker();
      get().showSubtitles("Radio carrier dropped. Total silence falls over Station 13.", 6000);
    }

    set({ endingsUnlocked: unlocked });

    // Save to localStorage
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
    soundEngine.setVolumes(updated.masterVolume, updated.sfxVolume, updated.ambienceVolume);

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
      // Sea light remains visible momentarily then fades
      setTimeout(() => {
        set({ seaLightVisible: false });
      }, 1200);
    }, 350);
  },
}));
