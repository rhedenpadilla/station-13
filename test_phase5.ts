import {
  migrateSaveData,
  DEFAULT_SAVE_V4,
  CURRENT_SAVE_VERSION,
  DEFAULT_SETTINGS,
} from './src/game/state/saveManager';
import { createChapterInitialState, CHAPTER_LIST } from './src/game/constants/chapterData';
import { SNAPSHOT_DATABASE } from './src/game/constants/snapshotData';
import { AUTHORED_VARIATIONS } from './src/game/state/variationManager';

let failed = 0;
function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    failed++;
  } else {
    console.log(`✓ PASSED: ${message}`);
  }
}

console.log('=====================================================');
console.log('DEAD AIR: SIGNAL 13 — PHASE 5 RELEASE VERIFICATION SUITE');
console.log('=====================================================\n');

// 1. Graphics Presets & Default Settings
console.log('--- 1. GRAPHICS QUALITY & DEFAULT BALANCED PRESET ---');
assert(DEFAULT_SETTINGS.graphicsQuality === 'MEDIUM', 'DEFAULT_SETTINGS graphicsQuality is MEDIUM (Balanced)');
const defaultSave = migrateSaveData(null);
assert(defaultSave.settings.graphicsQuality === 'MEDIUM', 'New player save initializes with MEDIUM preset');

const lowPresetSave = migrateSaveData({
  saveVersion: CURRENT_SAVE_VERSION,
  settings: { ...DEFAULT_SETTINGS, graphicsQuality: 'LOW' },
  progression: {},
  profile: {},
  replay: {},
});
assert(lowPresetSave.settings.graphicsQuality === 'LOW', 'Persists LOW graphics quality preset');

const highPresetSave = migrateSaveData({
  saveVersion: CURRENT_SAVE_VERSION,
  settings: { ...DEFAULT_SETTINGS, graphicsQuality: 'HIGH' },
  progression: {},
  profile: {},
  replay: {},
});
assert(highPresetSave.settings.graphicsQuality === 'HIGH', 'Persists HIGH graphics quality preset');

// 2. Legacy Migration & Backward Compatibility
console.log('\n--- 2. LEGACY SAVE MIGRATION (V2/V3 -> V4 RELEASE) ---');
const legacyV2Data = {
  hasCompletedBefore: true,
  endingsUnlocked: { beacon: true, silentFrequency: true, unknownSignal: true },
  evidenceUnlocked: ['signal_13_first', 'former_operator_log', 'black_tide_incident'],
};
const migratedV2 = migrateSaveData(legacyV2Data);
assert(migratedV2.saveVersion === CURRENT_SAVE_VERSION, 'Migrates legacy save to current V4 format');
assert(migratedV2.profile.endingsUnlocked.beacon && migratedV2.profile.endingsUnlocked.silentFrequency && migratedV2.profile.endingsUnlocked.unknownSignal, 'All 3 legacy endings preserved accurately');
assert(migratedV2.profile.allDiscoveredEvidence.includes('black_tide_incident'), 'Legacy evidence array maintained');
assert(migratedV2.profile.unlockedChapters.length === 5, 'All 5 chapters unlocked for completed player');
assert(migratedV2.settings.graphicsQuality === 'MEDIUM', 'Unspecified legacy settings default to MEDIUM');

// 3. New Game+ & Chapter Replay Isolation
console.log('\n--- 3. NEW GAME+ & CHAPTER SELECT STATE FACTORY ---');
for (const ch of CHAPTER_LIST) {
  const state = createChapterInitialState(ch.id);
  assert(state.currentObjectiveIndex >= 0, `Chapter ${ch.id} creates valid objective index (${state.currentObjectiveIndex})`);
  assert(!!state.currentSector, `Chapter ${ch.id} initializes starting sector (${state.currentSector})`);
  assert(Array.isArray(state.inventory), `Chapter ${ch.id} initializes valid inventory array`);
  assert(typeof state.playerPosition.x === 'number', `Chapter ${ch.id} supplies valid 3D coordinates`);
}

// 4. Snapshot Database Integrity
console.log('\n--- 4. SNAPSHOT DATABASE & CONTENT INTEGRITY ---');
const snapshotKeys = Object.keys(SNAPSHOT_DATABASE);
assert(snapshotKeys.length >= 8, `Snapshot database contains ${snapshotKeys.length} cataloged entries`);
for (const key of snapshotKeys) {
  const s = SNAPSHOT_DATABASE[key];
  assert(!!s.id && !!s.title && !!s.location && !!s.description, `Snapshot [${key}] metadata valid`);
}

// 5. Authored Replay Variations
console.log('\n--- 5. AUTHORED REPLAY VARIATIONS ---');
const variationKeys = Object.keys(AUTHORED_VARIATIONS);
assert(variationKeys.length >= 3, `Variation registry contains ${variationKeys.length} deterministic variations`);

console.log('\n=====================================================');
if (failed === 0) {
  console.log('🎉 ALL PHASE 5 VERIFICATION CHECKS PASSED (0 FAILURES)');
  console.log('=====================================================');
} else {
  console.error(`❌ ${failed} CHECKS FAILED.`);
  console.log('=====================================================');
  process.exit(1);
}
