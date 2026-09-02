# Changelog — Dead Air: Signal 13

All notable changes to **Dead Air: Signal 13** are documented in this file.

---

## [1.0.0] - Phase 5: Optimization, Hardening & Release Preparation

### Added
- **Graphics Quality Presets**: Introduced Low, Medium (Default Balanced), and High rendering presets in the Settings menu with real-time application and live performance breakdowns.
- **Fail-Safe Game Error Boundary**: Added `GameErrorBoundary` with atmospheric in-universe diagnostic interface providing Retry Scene, Return to Title Menu, and Safe Checkpoint Reset recovery options.
- **Rollup Vendor Chunk Optimization**: Configured manual chunking in `vite.config.ts` to separate Three.js/R3F vendor libraries from application game logic.
- **Static Host Deployment Configurations**: Added production `vercel.json` and `netlify.toml` with strict security headers, long-term asset caching, and client-side rewrites.
- **SEO & Social Graph Metadata**: Enhanced `index.html` with Open Graph tags, Twitter cards, theme-color metadata, and mobile Web App directives.
- **Automated Verification Suite**: Added `test_phase5.ts` validating graphics presets, backward-compatible save migration, chapter initialization, and snapshot data integrity.

### Changed
- **Default Preset**: Changed default graphics preset to **Medium (Balanced)** to ensure 60fps performance across broad laptop and desktop hardware.
- **Volumetric Weather Fog**: Made fog and rain particle counts (800 / 2,500 / 5,000) react dynamically to both graphics presets and accessibility reduced-fog toggles.
- **Flashlight Shadow Maps**: Dynamically bound spotlight shadow casting to High preset, eliminating GPU thermal overhead on integrated graphics.
- **State Update Invariants**: Optimized `setInteractionPrompt` in Zustand game state to eliminate redundant React re-renders during high-frequency frame loops.

---

## [0.4.0] - Phase 4: Replayability, Investigation & Accessibility

### Added
- **New Game+ Mode**: Replay campaign with preserved profile achievements, ending gallery, and snapshot discoveries.
- **Timeline Chapter Select**: 5 chapter cards with dedicated initial-state factories for safe, unblocked replay.
- **Investigation Board Timeline & Unresolved Clues**: Chronological event ordering and subtle directional guidance.
- **Snapshot Journal**: 9 profile-level anomaly logs across 5 thematic categories.
- **Virtual Control Customization**: Sizing, opacity, mirrored handedness, and press vs hold interaction options.
- **Accessibility Suite**: High-contrast UI, subtitle font sizing, clean sans-serif typography, reduced motion, and reduced fog.
- **Save Migration V4 & Dual Reset**: Safe backward compatibility with Reset Main Progress and Reset Everything options.

---

## [0.3.0] - Phase 3: Multiple Endings & Climax

### Added
- **Signal Tower Sector**: Upper catwalk, 1986 Operator Dossier, and optical relay terminal.
- **Three Authored Endings**: *The Beacon*, *Silent Frequency*, and *Unknown Signal*.
- **Endings Gallery**: Modal interface displaying ending summaries, requirements, and discovery badges.

---

## [0.2.0] - Phase 2: Station Expansion & Puzzles

### Added
- **Observation Deck & Aux Generator Room**: 200A Ceramic Fuse puzzle and diesel generator restoration.
- **Archive Room & Sleeping Quarters**: Locked Cabinet ARCH-02, cassette tape deck, hidden key photo frame, and operator diary.
- **Beacon Calibration Console**: 3-parameter resonance alignment puzzle (Frequency, Power, Azimuth).

---

## [0.1.0] - Phase 1: Prototype & Core Mechanics

### Added
- **Radio Room & Hallway**: First-person movement, pointer lock, HF Transceiver frequency tuner, maintenance notes, and procedural Web Audio soundscape.
