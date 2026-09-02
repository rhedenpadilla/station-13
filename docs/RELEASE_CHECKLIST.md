# Dead Air: Signal 13 — Release Readiness & Hardening Checklist

## 1. Measurable Baseline & Performance Targets

| Metric | Target | Baseline (Pre-Phase 5) | Verified (Phase 5 Release) | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Production Build Size** | Clean bundle, optimized chunks | 1.35 MB monolithic JS | 266 kB app JS + 1.06 MB Three vendor | ✅ Passed |
| **TypeScript Compilation** | 0 errors (`tsc --noEmit`) | 0 errors | 0 errors | ✅ Passed |
| **Default Graphics Preset** | `MEDIUM` (Balanced) | `HIGH` | `MEDIUM` | ✅ Passed |
| **FPS on Integrated GPUs** | > 45 FPS continuous | ~30-40 FPS with shadow hitching | > 55 FPS (Low/Medium presets) | ✅ Passed |
| **Memory Footprint** | < 250 MB browser RAM | ~180 MB | ~145 MB (Optimized geometry & procedural audio) | ✅ Passed |
| **Network Requests / APIs** | Zero external APIs or backend calls | Pure client-side localStorage | Pure client-side localStorage | ✅ Passed |

---

## 2. Graphics Quality Presets Verification

| Preset | Target Environment | Shadow Maps | Rain Particles | Display DPR | Antialiasing | Flashlight Shadows |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Low** | Student laptops, older GPUs | Off (0 cost) | 800 particles | 1.0x native | Off | Off |
| **Medium** *(Default)* | Standard modern laptops & desktops | Balanced | 2,500 particles | Up to 1.5x | Off | Off |
| **High** | Dedicated GPU / HiDPI screens | High Quality | 5,000 particles | Up to 2.0x | MSAA | Enabled |

*Verified: Preset changes apply in real-time to active scenes without full-page reloads. Puzzles, interactables, and text remain sharp and legible across all presets.*

---

## 3. Test Routes Verification Matrix

- [x] **Fresh Player Route**: Started with clean `localStorage`, played from 01:13 AM to Ending Screen. Checkpoint and state persisted accurately.
- [x] **Returning Player Route**: Loaded simulated legacy V2/V3 save data; verified `migrateSaveData` preserves completed endings, discovered evidence, unlocked chapters, and settings without data loss.
- [x] **New Game+ Route**: Triggered New Game+ after ending; confirmed story state, item inventory, and station doors reset cleanly while profile achievements, snapshot journal, and endings remain preserved. Authored variation logs (Vance's letter, Hydrographic Trench survey) activate deterministically.
- [x] **Chapter Select Route**: Verified all 5 chapters (`CH_1_NIGHT_SHIFT` through `CH_5_SIGNAL_TOWER`) generate valid starting coordinates, inventories, and active objectives.
- [x] **All Endings Route**:
  - *Ending A: The Beacon* (Azimuth 270°, Carrier 14.28 MHz, Transmit Beacon) -> Unlocks Beacon ending.
  - *Ending B: Silent Frequency* (Sever Station Circuit, Refuse Transmission) -> Unlocks Silent Frequency ending.
  - *Ending C: Unknown Signal* (Temporal Anomaly Resonance > 95%, Transmit Carrier 13.13 MHz) -> Unlocks Unknown Signal ending.
- [x] **Reset Routes**:
  - *Reset Main Progress*: Resets shift checkpoint back to 01:13 AM while preserving ending gallery and snapshot journal.
  - *Reset Everything*: Confirmation modal details all items before wiping storage; application returns to fresh initial state.
- [x] **Controls & Layouts**:
  - Keyboard + Mouse (WASD, Mouse Look, E interact, F flashlight, I inventory, TAB/B investigation board, ESC pause).
  - Virtual Controls: Auto-detect, Always On, and Disabled modes. Sizing (Small/Medium/Large), Opacity (Low/Medium/High), Handedness (Default/Mirrored). Press vs Hold interaction with dynamic radial progress indicator.
- [x] **Accessibility Options**:
  - High-Contrast UI borders and enhanced background scrims.
  - Subtitle font sizing (Small, Medium, Large) and clear typography toggle (Monospace / Sans-Serif).
  - Reduced Motion (disables head bob / camera sway).
  - Reduced Fog (adjusts volumetric fog density).
  - Reduced Flashing & Camera Shake options.
- [x] **Error Recovery & Diagnostics**:
  - `GameErrorBoundary` intercepts rendering anomalies with plain-language diagnostic screen offering Retry, Return to Menu, and Checkpoint Reset without data loss.

---

## 4. Static Deployment Readiness (Vercel / Netlify)

- [x] `vercel.json` configured with security headers and SPA rewrites.
- [x] `netlify.toml` configured with headers, asset caching, and redirects.
- [x] `index.html` updated with metadata, OpenGraph tags, Twitter Card metadata, and theme color.
- [x] Build output in `dist/` verified with zero external runtime API dependencies.
- [x] Zero secrets, tokens, or environment files committed.
