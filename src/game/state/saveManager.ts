import { GraphicsQuality, VirtualControlsMode, SectorType, BeaconSettings } from './useGameState';

export const CURRENT_SAVE_VERSION = 4;
export const STORAGE_KEY_V4 = 'DEAD_AIR_SIGNAL_13_SAVE_V4';
export const STORAGE_KEY_V3 = 'DEAD_AIR_SIGNAL_13_SAVE_V3';
export const STORAGE_KEY_V2 = 'DEAD_AIR_SIGNAL_13_SAVE_V2';

export interface GameSettingsV4 {
  masterVolume: number;
  sfxVolume: number;
  ambienceVolume: number;
  musicVolume: number;
  graphicsQuality: GraphicsQuality;
  virtualControlsMode: VirtualControlsMode;
  virtualControlSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  virtualControlOpacity: 'LOW' | 'MEDIUM' | 'HIGH';
  virtualControlHanded: 'DEFAULT' | 'MIRRORED';
  interactMode: 'PRESS' | 'HOLD';
  interactHoldDuration: number; // 0.3s to 1.5s
  mouseSensitivity: number;
  cameraShake: boolean;
  reducedFlashing: boolean;
  reducedMotion: boolean;
  reducedFog: boolean;
  highContrastUI: boolean;
  subtitlesEnabled: boolean;
  subtitleSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  fontFamily: 'MONO' | 'SANS';
}

export interface ProgressionData {
  currentCheckpointChapterId: string;
  currentObjectiveIndex: number;
  objectiveHistory: number[];
  inventory: string[];
  evidenceUnlocked: string[];
  currentSector: SectorType;
  currentFrequency: number;
  targetFrequency: number;
  signalLocked: boolean;
  beaconSettings: BeaconSettings;
  generatorDoorUnlocked: boolean;
  archiveDoorUnlocked: boolean;
  archiveCabinetUnlocked: boolean;
  sleepingQuartersUnlocked: boolean;
  signalTowerUnlocked: boolean;
  hasHeardFirstSignal: boolean;
  hasReadMaintenanceNote: boolean;
  hasCollectedFuse: boolean;
  hasRestoredPower: boolean;
  hasCollectedMapPiece: boolean;
  hasFoundArchiveKey: boolean;
  hasPlayedTapeA: boolean;
  hasTunedSecondFrequency: boolean;
  isBeaconCalibrated: boolean;
  tensionLevel: number;
  sanity: number;
  photoChanged: boolean;
  wetFootprintsVisible: boolean;
  playerPosition?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface ProfileData {
  hasCompletedBefore: boolean;
  totalPlaythroughs: number;
  endingsUnlocked: {
    beacon: boolean;
    silentFrequency: boolean;
    unknownSignal: boolean;
  };
  allDiscoveredEvidence: string[];
  snapshots: string[];
  unlockedChapters: string[];
  witnessedEndings: string[];
  ngPlusVariationsEncountered: string[];
}

export interface ReplayData {
  isNewGamePlus: boolean;
  isChapterReplay: boolean;
  replayChapterId: string | null;
  activeVariations: string[];
}

export interface SaveDataV4 {
  saveVersion: number;
  progression: ProgressionData;
  profile: ProfileData;
  settings: GameSettingsV4;
  replay: ReplayData;
}

export const DEFAULT_SETTINGS: GameSettingsV4 = {
  masterVolume: 0.8,
  sfxVolume: 0.9,
  ambienceVolume: 0.7,
  musicVolume: 0.75,
  graphicsQuality: 'HIGH',
  virtualControlsMode: 'AUTO',
  virtualControlSize: 'MEDIUM',
  virtualControlOpacity: 'MEDIUM',
  virtualControlHanded: 'DEFAULT',
  interactMode: 'PRESS',
  interactHoldDuration: 0.6,
  mouseSensitivity: 1.0,
  cameraShake: false,
  reducedFlashing: false,
  reducedMotion: false,
  reducedFog: false,
  highContrastUI: false,
  subtitlesEnabled: true,
  subtitleSize: 'MEDIUM',
  fontFamily: 'MONO',
};

export const DEFAULT_PROGRESSION: ProgressionData = {
  currentCheckpointChapterId: 'CH_1_NIGHT_SHIFT',
  currentObjectiveIndex: 0,
  objectiveHistory: [0],
  inventory: [],
  evidenceUnlocked: ['signal_13_first', 'former_operator_log'],
  currentSector: 'RADIO_ROOM',
  currentFrequency: 12.82,
  targetFrequency: 13.13,
  signalLocked: false,
  beaconSettings: { frequency: 12.5, power: 30, azimuth: 120 },
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
  playerPosition: { x: 0, y: 1.65, z: 0 },
};

export const DEFAULT_PROFILE: ProfileData = {
  hasCompletedBefore: false,
  totalPlaythroughs: 0,
  endingsUnlocked: {
    beacon: false,
    silentFrequency: false,
    unknownSignal: false,
  },
  allDiscoveredEvidence: ['signal_13_first', 'former_operator_log'],
  snapshots: [],
  unlockedChapters: ['CH_1_NIGHT_SHIFT'],
  witnessedEndings: [],
  ngPlusVariationsEncountered: [],
};

export const DEFAULT_REPLAY: ReplayData = {
  isNewGamePlus: false,
  isChapterReplay: false,
  replayChapterId: null,
  activeVariations: [],
};

export const DEFAULT_SAVE_V4: SaveDataV4 = {
  saveVersion: CURRENT_SAVE_VERSION,
  progression: DEFAULT_PROGRESSION,
  profile: DEFAULT_PROFILE,
  settings: DEFAULT_SETTINGS,
  replay: DEFAULT_REPLAY,
};

/**
 * Robust, backward-compatible migration utility.
 * Safely parses any legacy or malformed save and upgrades it to SaveDataV4 without discarding user achievements.
 */
export function migrateSaveData(rawData: unknown): SaveDataV4 {
  if (!rawData || typeof rawData !== 'object') {
    return { ...DEFAULT_SAVE_V4 };
  }

  const raw = rawData as Record<string, any>;

  // Check if it's already a V4 structure
  if (raw.saveVersion === CURRENT_SAVE_VERSION && raw.progression && raw.profile && raw.settings) {
    return {
      saveVersion: CURRENT_SAVE_VERSION,
      progression: {
        ...DEFAULT_PROGRESSION,
        ...raw.progression,
        beaconSettings: { ...DEFAULT_PROGRESSION.beaconSettings, ...(raw.progression.beaconSettings || {}) },
        inventory: Array.isArray(raw.progression.inventory) ? raw.progression.inventory : [],
        evidenceUnlocked: Array.isArray(raw.progression.evidenceUnlocked) ? raw.progression.evidenceUnlocked : DEFAULT_PROGRESSION.evidenceUnlocked,
        objectiveHistory: Array.isArray(raw.progression.objectiveHistory) ? raw.progression.objectiveHistory : [0],
      },
      profile: {
        ...DEFAULT_PROFILE,
        ...raw.profile,
        endingsUnlocked: {
          beacon: !!raw.profile?.endingsUnlocked?.beacon,
          silentFrequency: !!raw.profile?.endingsUnlocked?.silentFrequency,
          unknownSignal: !!raw.profile?.endingsUnlocked?.unknownSignal,
        },
        allDiscoveredEvidence: Array.isArray(raw.profile.allDiscoveredEvidence) ? raw.profile.allDiscoveredEvidence : DEFAULT_PROFILE.allDiscoveredEvidence,
        snapshots: Array.isArray(raw.profile.snapshots) ? raw.profile.snapshots : [],
        unlockedChapters: Array.isArray(raw.profile.unlockedChapters) ? raw.profile.unlockedChapters : ['CH_1_NIGHT_SHIFT'],
        witnessedEndings: Array.isArray(raw.profile.witnessedEndings) ? raw.profile.witnessedEndings : [],
        ngPlusVariationsEncountered: Array.isArray(raw.profile.ngPlusVariationsEncountered) ? raw.profile.ngPlusVariationsEncountered : [],
      },
      settings: {
        ...DEFAULT_SETTINGS,
        ...raw.settings,
      },
      replay: {
        ...DEFAULT_REPLAY,
        ...(raw.replay || {}),
      },
    };
  }

  // Legacy Migration from V2 or V3 format
  const hasCompleted = !!raw.hasCompletedBefore || !!raw.endingsUnlocked?.beacon || !!raw.endingsUnlocked?.silentFrequency || !!raw.endingsUnlocked?.unknownSignal;
  const legacyEndings = {
    beacon: !!raw.endingsUnlocked?.beacon,
    silentFrequency: !!raw.endingsUnlocked?.silentFrequency,
    unknownSignal: !!raw.endingsUnlocked?.unknownSignal,
  };

  const unlockedChapters = ['CH_1_NIGHT_SHIFT'];
  if (hasCompleted || legacyEndings.beacon || legacyEndings.silentFrequency || legacyEndings.unknownSignal) {
    unlockedChapters.push('CH_2_FREQUENCY_1313', 'CH_3_BLACK_TIDE_RECORDS', 'CH_4_BEACON_CALIBRATION', 'CH_5_SIGNAL_TOWER');
  }

  const legacyEvidence = Array.isArray(raw.evidenceUnlocked) ? raw.evidenceUnlocked : ['signal_13_first', 'former_operator_log'];

  const migrated: SaveDataV4 = {
    saveVersion: CURRENT_SAVE_VERSION,
    progression: {
      ...DEFAULT_PROGRESSION,
      currentObjectiveIndex: typeof raw.currentObjectiveIndex === 'number' ? raw.currentObjectiveIndex : 0,
      inventory: Array.isArray(raw.inventory) ? raw.inventory : [],
      evidenceUnlocked: legacyEvidence,
      currentSector: raw.currentSector || 'RADIO_ROOM',
      currentFrequency: typeof raw.currentFrequency === 'number' ? raw.currentFrequency : 12.82,
      targetFrequency: typeof raw.targetFrequency === 'number' ? raw.targetFrequency : 13.13,
      signalLocked: !!raw.signalLocked,
      beaconSettings: {
        frequency: raw.beaconSettings?.frequency ?? 12.5,
        power: raw.beaconSettings?.power ?? 30,
        azimuth: raw.beaconSettings?.azimuth ?? 120,
      },
      generatorDoorUnlocked: !!raw.generatorDoorUnlocked,
      archiveDoorUnlocked: !!raw.archiveDoorUnlocked,
      archiveCabinetUnlocked: !!raw.archiveCabinetUnlocked,
      sleepingQuartersUnlocked: !!raw.sleepingQuartersUnlocked,
      signalTowerUnlocked: !!raw.signalTowerUnlocked,
      hasHeardFirstSignal: !!raw.hasHeardFirstSignal,
      hasReadMaintenanceNote: !!raw.hasReadMaintenanceNote,
      hasCollectedFuse: !!raw.hasCollectedFuse,
      hasRestoredPower: !!raw.hasRestoredPower,
      hasCollectedMapPiece: !!raw.hasCollectedMapPiece,
      hasFoundArchiveKey: !!raw.hasFoundArchiveKey,
      hasPlayedTapeA: !!raw.hasPlayedTapeA,
      hasTunedSecondFrequency: !!raw.hasTunedSecondFrequency,
      isBeaconCalibrated: !!raw.isBeaconCalibrated,
      tensionLevel: typeof raw.tensionLevel === 'number' ? raw.tensionLevel : 0,
      sanity: typeof raw.sanity === 'number' ? raw.sanity : 100,
      photoChanged: !!raw.photoChanged,
      wetFootprintsVisible: !!raw.wetFootprintsVisible,
    },
    profile: {
      hasCompletedBefore: hasCompleted,
      totalPlaythroughs: hasCompleted ? 1 : 0,
      endingsUnlocked: legacyEndings,
      allDiscoveredEvidence: Array.from(new Set(['signal_13_first', 'former_operator_log', ...legacyEvidence])),
      snapshots: [],
      unlockedChapters: unlockedChapters,
      witnessedEndings: Object.entries(legacyEndings).filter(([_, v]) => v).map(([k]) => k.toUpperCase()),
      ngPlusVariationsEncountered: [],
    },
    settings: {
      ...DEFAULT_SETTINGS,
      ...(raw.settings || {}),
    },
    replay: {
      isNewGamePlus: false,
      isChapterReplay: false,
      replayChapterId: null,
      activeVariations: [],
    },
  };

  return migrated;
}

export function loadSaveFromLocalStorage(): SaveDataV4 {
  try {
    const rawV4 = localStorage.getItem(STORAGE_KEY_V4);
    if (rawV4) {
      const parsed = JSON.parse(rawV4);
      return migrateSaveData(parsed);
    }

    const rawV3 = localStorage.getItem(STORAGE_KEY_V3);
    if (rawV3) {
      const parsed = JSON.parse(rawV3);
      const migrated = migrateSaveData(parsed);
      saveToLocalStorage(migrated);
      return migrated;
    }

    const rawV2 = localStorage.getItem(STORAGE_KEY_V2);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      const migrated = migrateSaveData(parsed);
      saveToLocalStorage(migrated);
      return migrated;
    }
  } catch (err) {
    console.warn('Failed to load save from localStorage:', err);
  }

  return { ...DEFAULT_SAVE_V4 };
}

export function saveToLocalStorage(data: SaveDataV4): void {
  try {
    localStorage.setItem(STORAGE_KEY_V4, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to persist save to localStorage:', err);
  }
}

export function clearAllGameStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_V4);
    localStorage.removeItem(STORAGE_KEY_V3);
    localStorage.removeItem(STORAGE_KEY_V2);
  } catch (err) {
    console.warn('Failed to clear localStorage:', err);
  }
}
