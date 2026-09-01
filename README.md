# Dead Air: Signal 13 (Phases 1, 2, 3, & 4)

> *"Station 13... Restore the beacon circuit... Do not let the light go out."*

**Dead Air: Signal 13** is an atmospheric, browser-based, first-person 3D psychological mystery-horror game built with React, Vite, TypeScript, Three.js, React Three Fiber, Rapier, Web Audio API, and Tailwind CSS.

**Phase 4: Replayability and Player-Experience Improvements** introduces **New Game+**, safe **Timeline Chapter Select**, an expanded **Investigation Timeline**, spoiler-light **Unresolved Clues Guidance**, a persistent profile-level **Snapshot Journal**, deep **Virtual Controls Customization**, extensive **Accessibility Settings** (High-Contrast UI, Subtitle Sizing, Clean Typography, Reduced Motion, Reduced Fog), and **Save Migration V4**.

---

## 1. Core Premise & Black Tide Mystery

You play as **Eli Navarro**, night radio operator stationed at **Weather Station 13**, an isolated meteorological outpost perched atop a jagged coastal cliff during a severe gale-force storm.

At precisely **01:13 AM**, an unidentified broadcast cuts through the static. As you investigate the station facilities, you uncover evidence of the **1986 Black Tide Incident**—a cargo vessel lost in the shoals decades ago when the former operator dismissed emergency radio calls. The mysterious Signal 13 is a temporal relay spanning across moments in time, seeking to prevent history from repeating itself or permanently fusing the timeline.

---

## 2. Phase 4 Implemented Features Overview

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DEAD AIR: SIGNAL 13 - PHASE 4 ARCHITECTURE                │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│    REPLAYABILITY     │  INVESTIGATION & LORE│     CONTROLS & ACCESSIBILITY  │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ • New Game+ Mode     │ • Timeline View      │ • D-Pad Sizing & Opacity      │
│ • 5 Chapter Selects  │ • Unresolved Clues   │ • Default vs Mirrored Layout  │
│ • Deterministic Vars │ • Snapshot Journal   │ • Press vs Hold to Interact   │
│ • Safe Replay State  │ • Vance Unsent Note  │ • High-Contrast Mode          │
│ • V4 Save Migration  │ • Hydrographic File  │ • Subtitle Sizes & Sans Font  │
│ • Dual Reset Options │ • Replay Transcripts │ • Reduced Motion & Fog        │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

### Milestone D — Phase 4: Replayability & Player Experience
1. **New Game+ Mode**:
   - Unlocked automatically upon completing any of the three endings.
   - Restarts story progression, essential items, doors, and objectives to fresh starting states while **preserving unlocked endings, evidence history, snapshot journal discoveries, and settings**.
   - Features deterministic replay-aware variations without random RNG or puzzle disruptions.
2. **Timeline Chapter Select (Safe Replay Mode)**:
   - Dedicated chapter cards representing the actual story boundaries:
     - **Chapter 1: The Night Shift** (01:13 AM Shift Start, Gale Advisory)
     - **Chapter 2: Frequency 13.13** (Signal Intercept, Observation Deck Fuse Hunt, Generator)
     - **Chapter 3: Black Tide Records** (Archive Investigation, Crew Photo, ARCH-02 Key, Tape #1)
     - **Chapter 4: Beacon Calibration** (14.28 MHz Tuning, Optical Relay Resonance)
     - **Chapter 5: Signal Tower** (Upper Catwalk, 1986 Operator Dossier, Final Decision)
   - Powered by a typed initial-state factory that provides correct baseline items, objectives, and world configuration without corrupting advanced campaign progress.
3. **Investigation Board Enhancements**:
   - **Timeline Tab**: Chronological ordering of 1986 Incident -> Handover Log -> 01:13 AM Broadcast -> Beacon System -> Temporal Convergence.
   - **Unresolved Clues & Guidance**: Spoiler-light directional hints for remaining station lore and puzzles.
   - **Subtle NEW Indicators**: Visual badges on newly acquired evidence cards.
4. **Persistent Snapshot Journal**:
   - Profile-level journal tracking 9 predefined anomalies across 5 categories: *Altered Objects*, *Radio Anomalies*, *Ocean Sightings*, *Station Records*, and *Signal Tower Events*.
   - Persists across normal runs, Chapter Replays, and New Game+.
5. **Virtual Controls & Interaction Customization**:
   - **Size Preset**: Small (90%), Medium (100%), Large (110%).
   - **Opacity Preset**: Low (40%), Medium (80%), High (100%).
   - **Handed Layout**: Default (Left D-Pad / Right Actions) vs Mirrored (Right D-Pad / Left Actions).
   - **Interaction Mode**: Press to Interact vs Hold to Interact (with configurable 0.3s–1.5s duration and dynamic progress indicator).
   - **Live Layout Preview** in Settings.
6. **Accessibility & Quality of Life**:
   - **High-Contrast UI**: High-visibility cyan borders and enhanced dark backdrop cards.
   - **Subtitle Font Sizing**: Small, Medium, Large.
   - **Clean Typography**: Toggle between Atmospheric Monospace and Clean Sans-Serif.
   - **Reduced Motion**: Disables camera headbob and sway for motion-sensitive players.
   - **Reduced Fog**: Softens exterior mist density for greater exterior visibility.
   - **Photosensitive & Camera Shake Options**: Preserved from earlier phases.
   - **Objective History Log**: Accessible from HUD and Pause Menu.
7. **Robust Save Migration V4 & Dual Reset Options**:
   - Backward-compatible migration from V2/V3 saves to V4 without discarding user achievements.
   - **Reset Main Progress**: Clears current campaign progress and checkpoint back to game start while preserving profile discoveries, endings, and settings.
   - **Reset Everything**: Explicit confirmation modal that details every item before permanently wiping storage.

---

## 3. Station Map & Playable Sectors

```text
                  [ UPPER SIGNAL TOWER ] (Beacon Lens / 1986 Dossier / Final Decision)
                               ▲
                        (Catwalk Ladder)
                               │
                [ OBSERVATION DECK ] (Exterior Platform / Beacon Array / Supply Cabinet)
                               │
                               ▼
   ┌───────────────────[ CONNECTING CORRIDOR ]───────────────────┐
   │                                                             │
   ├── [ ARCHIVE ROOM ] (West 1)      ├── [ AUX GENERATOR ROOM ] │
   │   • Locked Cabinet ARCH-02       │   • Industrial Diesel    │
   │   • Reel Tape Deck               │   • 200A Fuse Socket     │
   │   • Black Tide Inquiry Log       │                          │
   │   • Vance's Unsent Letter (NG+)  │                          │
   │                                  │                          │
   ├── [ SLEEPING QUARTERS ] (West 2) │                          │
   │   • Bunk Beds & Lockers          │                          │
   │   • Hidden Key Photo Frame       │                          │
   │   • Eli's Personal Diary         │                          │
   │   • Hydrographic Chart (NG+)     │                          │
   │                                  │                          │
   └───────────────────────────┬─────────────────────────────────┘
                               │
                               ▼
                   [ RADIO CONTROL ROOM ]
                   • HF Transceiver Console
                   • CRT Storm Radar
                   • Wall Clock (01:13 AM)
                   • Shift Handover Log
```

---

## 4. Endings Summary & Unlock Conditions

| Ending | Title | Requirement / Condition |
| :--- | :--- | :--- |
| **Ending A** | **The Beacon** | Complete Beacon Calibration (13.13 MHz / 85% / 240°) and engage the optical relay to illuminate the 1986 vessel through the storm. |
| **Ending B** | **Silent Frequency** | Sever the transmitter breaker to disconnect the 13.13 MHz carrier wave, plunging Station 13 into silence and resetting the 01:13 AM loop. |
| **Ending C** | **Unknown Signal** | Collect optional lore (Cassette Tape #2, 1986 Operator Dossier, Paradox notes) and resonate the 13.13 MHz carrier wave at the Upper Tower Array. |

---

## 5. Controls Reference

| Action | Desktop Keyboard & Mouse | On-Screen Touch / Virtual Controls |
| :--- | :--- | :--- |
| **Move Forward** | `W` or `Up Arrow` | `▲` Up D-Pad Button (Press & Hold) |
| **Move Backward** | `S` or `Down Arrow` | `▼` Down D-Pad Button (Press & Hold) |
| **Strafe Left** | `A` or `Left Arrow` | `◀` Left D-Pad Button (Press & Hold) |
| **Strafe Right** | `D` or `Right Arrow` | `▶` Right D-Pad Button (Press & Hold) |
| **Sprint / Fast Walk** | `Left Shift` | `⚡` Sprint Toggle Button |
| **Aim / Look Camera** | Mouse Move (Click canvas to lock) | Drag / Swipe on Opposite Screen Half |
| **Interact / Inspect** | `E` (Press or Hold) or Left Click | `🖐️ INTERACT [E]` (Press or Hold Ring) |
| **Toggle Flashlight** | `F` | `🔦` Flashlight Action Button |
| **Inventory Drawer** | `I` | `🎒 ITEMS` Action Button |
| **Investigation Board**| `TAB` or `B` | `🔍 BOARD` Action Button |
| **Snapshot Journal** | Top Right HUD / Pause | `📷 SNAPSHOTS` Action Button |
| **Directive History** | Click Directive Card on HUD | `🧭 DIRECTIVE HISTORY` Action Button |
| **Pause Shift** | `ESC` | `⏸️` Pause Action Button |

---

## 6. Save-Data Architecture (Save Migration V4)

Game progression, profile discoveries, and accessibility settings are managed through three separate data groups under:
```text
DEAD_AIR_SIGNAL_13_SAVE_V4
```
*(Automatic backward-compatible fallback supports previous `V3` and `V2` saves without data loss.)*

### Data Groups Breakdown
- **Main Progression**: `currentCheckpointChapterId`, `currentObjectiveIndex`, `objectiveHistory`, `inventory`, `evidenceUnlocked`, `currentSector`, `currentFrequency`, `targetFrequency`, `signalLocked`, `beaconSettings`, `generatorDoorUnlocked`, `archiveDoorUnlocked`, `archiveCabinetUnlocked`, `sleepingQuartersUnlocked`, `signalTowerUnlocked`, puzzle flags, and environmental tension.
- **Persistent Profile**: `hasCompletedBefore`, `totalPlaythroughs`, `endingsUnlocked` (`beacon`, `silentFrequency`, `unknownSignal`), `allDiscoveredEvidence`, `snapshots` (9 entries), `unlockedChapters` (5 chapters), `witnessedEndings`, and `ngPlusVariationsEncountered`.
- **Settings**: Audio soundscape volumes (Master, SFX, Ambience, Music/Radio), `graphicsQuality`, `virtualControlsMode`, `virtualControlSize`, `virtualControlOpacity`, `virtualControlHanded`, `interactMode`, `interactHoldDuration`, `mouseSensitivity`, `cameraShake`, `reducedFlashing`, `reducedMotion`, `reducedFog`, `highContrastUI`, `subtitlesEnabled`, `subtitleSize`, and `fontFamily`.
- **Replay State**: `isNewGamePlus`, `isChapterReplay`, `replayChapterId`, and `activeVariations`.

---

## 7. Screenshot Placeholders (Feature Gallery)

*Placeholder slots for UI documentation and visual previews:*

```text
[ SCREENSHOT PLACEHOLDER: TITLE SCREEN & NEW GAME+ READY BADGE ]
[ SCREENSHOT PLACEHOLDER: TIMELINE CHAPTER SELECT MODAL (5 CHAPTERS) ]
[ SCREENSHOT PLACEHOLDER: INVESTIGATION BOARD (TIMELINE CHRONOLOGY TAB) ]
[ SCREENSHOT PLACEHOLDER: PERSISTENT SNAPSHOT JOURNAL (9 ANOMALY ENTRIES) ]
[ SCREENSHOT PLACEHOLDER: CONTROLS & ACCESSIBILITY CUSTOMIZATION MODAL ]
```

---

## 8. Technology Stack

- **Frontend & Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Engine & WebGL**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Physics & Collision Bounds**: Segmented bounding boxes for 7 interconnected station zones.
- **Audio Engine**: Procedural Web Audio API sound generators (rain, ocean swells, 60Hz hum, static, SFX) + SpeechSynthesis with automatic fallbacks.
- **User Interface & Design System**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with auto-saving `localStorage` persistence and typed V4 schema migration.

---

## 9. Local Setup & Verification

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Commands
1. Navigate to the project directory:
   ```bash
   cd c:\Projects\station-13
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Run automated Phase 4 unit tests:
   ```bash
   npx tsx test_phase4.ts
   ```

---

## 10. Known Limitations & Phase 5 Roadmap

- **Known Limitations**:
  - SpeechSynthesis voice characteristics depend on the user's host OS and browser synthesizer engine.
  - Rapier physics relies on client hardware acceleration; integrated low-end graphics devices can enable `Reduced Motion` and `Low Graphics Quality` in Settings for high framerates.
- **Phase 5 Roadmap (Final Packaging & Deployment)**:
  - Additional low-end GPU shader optimization passes and texture compression profiles.
  - Final cloud distribution packaging and CDN deployment (Vercel / Netlify).

---

## 11. License

Built with Google Antigravity. Open for educational and exploratory horror game development under the MIT License.
