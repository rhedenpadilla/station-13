import { SectorType } from '../state/useGameState';

export interface ChapterInfo {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  startingSector: SectorType;
  startingObjectiveIndex: number;
  unlockedByDefault: boolean;
  thumbnailHint: string;
}

export const CHAPTER_LIST: ChapterInfo[] = [
  {
    id: 'CH_1_NIGHT_SHIFT',
    order: 1,
    title: 'Chapter 1: The Night Shift',
    subtitle: '01:13 AM Gale Advisory',
    description: 'Begin the night shift as Eli Navarro in the Radio Control Room. Check telemetry and listen for anomalous broadcasts cutting through the storm static.',
    startingSector: 'RADIO_ROOM',
    startingObjectiveIndex: 0,
    unlockedByDefault: true,
    thumbnailHint: 'Radio Room Console & Barometer',
  },
  {
    id: 'CH_2_FREQUENCY_1313',
    order: 2,
    title: 'Chapter 2: Frequency 13.13',
    subtitle: 'Auxiliary Circuit & Fuse Recovery',
    description: 'First transmission received at 13.13 MHz. Search the exterior Observation Deck supply locker for the 200A ceramic fuse and restore the Auxiliary Generator.',
    startingSector: 'OBSERVATION_DECK',
    startingObjectiveIndex: 2,
    unlockedByDefault: false,
    thumbnailHint: 'Observation Deck & Generator Breaker',
  },
  {
    id: 'CH_3_BLACK_TIDE_RECORDS',
    order: 3,
    title: 'Chapter 3: Black Tide Records',
    subtitle: 'Archive Dossier & Audio Reel',
    description: 'Powered corridor gates are open. Explore the Archive Room, recover the ARCH-02 key from behind the Sleeping Quarters crew photograph, and play Cassette Tape #1.',
    startingSector: 'ARCHIVE_ROOM',
    startingObjectiveIndex: 3,
    unlockedByDefault: false,
    thumbnailHint: 'Archive Desk & Crew Photograph',
  },
  {
    id: 'CH_4_BEACON_CALIBRATION',
    order: 4,
    title: 'Chapter 4: Beacon Calibration',
    subtitle: '14.28 MHz & Optical Alignment',
    description: 'Decode the stranded ship frequency (14.28 MHz), then calibrate the high-voltage optical beacon console to 13.13 MHz, 85% Power, and 240° Azimuth.',
    startingSector: 'RADIO_ROOM',
    startingObjectiveIndex: 6,
    unlockedByDefault: false,
    thumbnailHint: 'Beacon Calibration Terminal',
  },
  {
    id: 'CH_5_SIGNAL_TOWER',
    order: 5,
    title: 'Chapter 5: Signal Tower',
    subtitle: 'Upper Array & The Final Choice',
    description: 'Ascend the ladder hatch to the high-elevation Signal Tower. Inspect the 1986 operator dossier and choose the fate of Signal 13.',
    startingSector: 'SIGNAL_TOWER',
    startingObjectiveIndex: 8,
    unlockedByDefault: false,
    thumbnailHint: 'Upper Signal Tower Array',
  },
];

export interface ChapterInitialState {
  currentSector: SectorType;
  currentObjectiveIndex: number;
  currentFrequency: number;
  targetFrequency: number;
  signalLocked: boolean;
  inventory: string[];
  evidenceUnlocked: string[];
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
  wetFootprintsVisible: boolean;
  photoChanged: boolean;
  beaconSettings: {
    frequency: number;
    power: number;
    azimuth: number;
  };
  playerPosition: {
    x: number;
    y: number;
    z: number;
  };
}

export function createChapterInitialState(chapterId: string): ChapterInitialState {
  switch (chapterId) {
    case 'CH_2_FREQUENCY_1313':
      return {
        currentSector: 'OBSERVATION_DECK',
        currentObjectiveIndex: 2,
        currentFrequency: 13.13,
        targetFrequency: 13.13,
        signalLocked: true,
        inventory: [],
        evidenceUnlocked: ['signal_13_first', 'former_operator_log'],
        generatorDoorUnlocked: true,
        archiveDoorUnlocked: false,
        archiveCabinetUnlocked: false,
        sleepingQuartersUnlocked: false,
        signalTowerUnlocked: false,
        hasHeardFirstSignal: true,
        hasReadMaintenanceNote: true,
        hasCollectedFuse: false,
        hasRestoredPower: false,
        hasCollectedMapPiece: false,
        hasFoundArchiveKey: false,
        hasPlayedTapeA: false,
        hasTunedSecondFrequency: false,
        isBeaconCalibrated: false,
        tensionLevel: 0,
        wetFootprintsVisible: false,
        photoChanged: false,
        beaconSettings: { frequency: 12.5, power: 30, azimuth: 120 },
        playerPosition: { x: 0, y: 1.65, z: 13.5 },
      };

    case 'CH_3_BLACK_TIDE_RECORDS':
      return {
        currentSector: 'ARCHIVE_ROOM',
        currentObjectiveIndex: 3,
        currentFrequency: 13.13,
        targetFrequency: 13.13,
        signalLocked: true,
        inventory: ['emergency_fuse'],
        evidenceUnlocked: ['signal_13_first', 'former_operator_log', 'black_tide_incident'],
        generatorDoorUnlocked: true,
        archiveDoorUnlocked: true,
        archiveCabinetUnlocked: false,
        sleepingQuartersUnlocked: true,
        signalTowerUnlocked: false,
        hasHeardFirstSignal: true,
        hasReadMaintenanceNote: true,
        hasCollectedFuse: true,
        hasRestoredPower: true,
        hasCollectedMapPiece: false,
        hasFoundArchiveKey: false,
        hasPlayedTapeA: false,
        hasTunedSecondFrequency: false,
        isBeaconCalibrated: false,
        tensionLevel: 1,
        wetFootprintsVisible: true,
        photoChanged: false,
        beaconSettings: { frequency: 12.5, power: 30, azimuth: 120 },
        playerPosition: { x: -3.0, y: 1.65, z: 6.0 },
      };

    case 'CH_4_BEACON_CALIBRATION':
      return {
        currentSector: 'RADIO_ROOM',
        currentObjectiveIndex: 6,
        currentFrequency: 14.28,
        targetFrequency: 14.28,
        signalLocked: false,
        inventory: ['emergency_fuse', 'torn_station_map', 'archive_key', 'cassette_tape_a', 'cassette_tape_b'],
        evidenceUnlocked: [
          'signal_13_first',
          'former_operator_log',
          'black_tide_incident',
          'station_blueprint_grid',
          'sleeping_quarters_photo',
          'tape_a_recording',
          'time_loop_evidence',
        ],
        generatorDoorUnlocked: true,
        archiveDoorUnlocked: true,
        archiveCabinetUnlocked: true,
        sleepingQuartersUnlocked: true,
        signalTowerUnlocked: false,
        hasHeardFirstSignal: true,
        hasReadMaintenanceNote: true,
        hasCollectedFuse: true,
        hasRestoredPower: true,
        hasCollectedMapPiece: true,
        hasFoundArchiveKey: true,
        hasPlayedTapeA: true,
        hasTunedSecondFrequency: false,
        isBeaconCalibrated: false,
        tensionLevel: 2,
        wetFootprintsVisible: true,
        photoChanged: true,
        beaconSettings: { frequency: 12.5, power: 30, azimuth: 120 },
        playerPosition: { x: 0, y: 1.65, z: 0 },
      };

    case 'CH_5_SIGNAL_TOWER':
      return {
        currentSector: 'SIGNAL_TOWER',
        currentObjectiveIndex: 8,
        currentFrequency: 14.28,
        targetFrequency: 14.28,
        signalLocked: true,
        inventory: ['emergency_fuse', 'torn_station_map', 'archive_key', 'cassette_tape_a', 'cassette_tape_b', 'beacon_calibration_note'],
        evidenceUnlocked: [
          'signal_13_first',
          'former_operator_log',
          'black_tide_incident',
          'station_blueprint_grid',
          'sleeping_quarters_photo',
          'tape_a_recording',
          'second_radio_frequency',
          'beacon_calibration_data',
          'beacon_system',
          'time_loop_evidence',
          'signal_tower_array',
        ],
        generatorDoorUnlocked: true,
        archiveDoorUnlocked: true,
        archiveCabinetUnlocked: true,
        sleepingQuartersUnlocked: true,
        signalTowerUnlocked: true,
        hasHeardFirstSignal: true,
        hasReadMaintenanceNote: true,
        hasCollectedFuse: true,
        hasRestoredPower: true,
        hasCollectedMapPiece: true,
        hasFoundArchiveKey: true,
        hasPlayedTapeA: true,
        hasTunedSecondFrequency: true,
        isBeaconCalibrated: true,
        tensionLevel: 3,
        wetFootprintsVisible: true,
        photoChanged: true,
        beaconSettings: { frequency: 13.13, power: 85, azimuth: 240 },
        playerPosition: { x: 1.0, y: 5.65, z: 15.0 },
      };

    case 'CH_1_NIGHT_SHIFT':
    default:
      return {
        currentSector: 'RADIO_ROOM',
        currentObjectiveIndex: 0,
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
        wetFootprintsVisible: false,
        photoChanged: false,
        beaconSettings: { frequency: 12.5, power: 30, azimuth: 120 },
        playerPosition: { x: 0, y: 1.65, z: 0 },
      };
  }
}
