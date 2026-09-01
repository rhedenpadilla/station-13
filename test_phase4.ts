import { migrateSaveData, DEFAULT_SAVE_V4, CURRENT_SAVE_VERSION } from './src/game/state/saveManager';
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

console.log('--- TESTING SAVE MIGRATION (Phase 1-3 -> Phase 4) ---');

// 1. Test Null / Undefined input
const defaultMigrated = migrateSaveData(null);
assert(defaultMigrated.saveVersion === CURRENT_SAVE_VERSION, 'Null save returns V4 save');
assert(defaultMigrated.settings.masterVolume === 0.8, 'Default settings populated on null');
assert(defaultMigrated.profile.unlockedChapters.includes('CH_1_NIGHT_SHIFT'), 'Default unlocked chapters initialized');

// 2. Test Legacy V2/V3 save data
const legacyV3 = {
  hasCompletedBefore: true,
  endingsUnlocked: { beacon: true, silentFrequency: false, unknownSignal: false },
  settings: { masterVolume: 0.5, cameraShake: true },
  evidenceUnlocked: ['signal_13_first', 'black_tide_incident'],
};
const migratedV3 = migrateSaveData(legacyV3);
assert(migratedV3.profile.hasCompletedBefore === true, 'Legacy completed status preserved');
assert(migratedV3.profile.endingsUnlocked.beacon === true, 'Legacy beacon ending preserved');
assert(migratedV3.profile.allDiscoveredEvidence.includes('black_tide_incident'), 'Legacy evidence preserved');
assert(migratedV3.settings.masterVolume === 0.5, 'Legacy settings volume preserved');
assert(migratedV3.profile.unlockedChapters.length === 5, 'All chapters unlocked for completed save');

// 3. Test Chapter Initial State Factory for all 5 chapters
console.log('\n--- TESTING CHAPTER SELECT INITIAL STATES ---');
for (const ch of CHAPTER_LIST) {
  const state = createChapterInitialState(ch.id);
  assert(state !== null && typeof state === 'object', `Chapter ${ch.title} state created`);
  assert(state.currentObjectiveIndex >= 0, `Chapter ${ch.title} has valid objective index`);
  assert(state.playerPosition && typeof state.playerPosition.x === 'number', `Chapter ${ch.title} has valid player position`);
}

// 4. Test Snapshot Database
console.log('\n--- TESTING SNAPSHOT DATABASE ---');
const snapshotKeys = Object.keys(SNAPSHOT_DATABASE);
assert(snapshotKeys.length >= 8, `Snapshot database has ${snapshotKeys.length} predefined entries`);
for (const key of snapshotKeys) {
  const item = SNAPSHOT_DATABASE[key];
  assert(!!item.title && !!item.category && !!item.description, `Snapshot entry ${key} is fully specified`);
}

// 5. Test Authored Variations
console.log('\n--- TESTING AUTHORED VARIATIONS ---');
const varKeys = Object.keys(AUTHORED_VARIATIONS);
assert(varKeys.length >= 3, `Variation manager has ${varKeys.length} authored deterministic variations`);

if (failed === 0) {
  console.log('\n🎉 ALL AUTOMATED PHASE 4 UNIT TESTS PASSED SUCCESSFULLY!');
} else {
  console.error(`\n❌ ${failed} TESTS FAILED.`);
  process.exit(1);
}
