# Dead Air: Signal 13 (Phases 1, 2, & 3)

> *"Station 13... Restore the beacon circuit... Do not let the light go out."*

**Dead Air: Signal 13** is an atmospheric, web-based, first-person 3D psychological mystery-horror game built with React, Three.js, React Three Fiber, Web Audio API, and Tailwind CSS.

**Phases 1, 2, and 3** provide a complete **40–50 minute psychological horror experience** featuring deep environmental storytelling, historical investigation, audio tape decryption, multi-parameter optical beacon calibration, the high-elevation Signal Tower chapter, an in-game Narrative Recap dossier, three distinct endings, and a responsive on-screen touch/virtual navigation system.

---

## 1. Core Premise & Black Tide Lore

You play as **Eli Navarro**, a newly assigned night radio operator stationed at **Weather Station 13**, an isolated meteorological outpost perched atop a jagged coastal cliff during a violent gale-force storm.

At precisely **01:13 AM**, an unidentified broadcast cuts through the static. As you investigate the station facilities, you uncover evidence of the **1986 Black Tide Incident**—a cargo vessel lost in the shoals decades ago when the former operator dismissed emergency radio calls. The mysterious Signal 13 is a temporal relay spanning across moments in time, seeking to prevent history from repeating itself or permanently fusing the timeline.

---

## 2. Features Overview by Milestone

### Milestone A — Phase 1: Playable Vertical Slice
- **First-Person Station Exploration**: Radio Control Room, Connecting Corridor, Auxiliary Generator Room, and Observation Deck.
- **AN/URC-113 Radio Frequency Tuner**: Analog tuning dial, live CRT oscilloscope, and S-Meter signal strength gauge.
- **Fuse & Power Puzzle**: Recovering the 200A Ceramic Fuse and restoring the main auxiliary generator breaker circuit.
- **Procedural Soundscape**: Synthetic rain squalls, ocean swell filters, 60Hz transformer hum, thunderclaps, and distorted synthesized radio transmissions.
- **Branching Endings**: Dual narrative resolutions persisted via browser `localStorage`.

### Milestone B — Phase 2: Investigation and Expanded Mystery
- **New Playable Location: Archive Room**:
  - Cold blue-gray lighting and metal filing cabinets.
  - Locked steel security cabinet (`ARCH-02`) holding magnetic cassette recordings.
  - Vintage reel-to-reel tape deck desk.
  - Official 1986 Black Tide Inquiry documents and newspaper prints.
  - Wall-mounted Station Blueprint Grid Map (`Grid SQ-04`).
  - Temporary wet footprints appearing after key story events.
- **New Playable Location: Sleeping Quarters**:
  - Crew bunk beds, locker units with hidden compartments.
  - Study desk with warm desk lamp, Eli Navarro's personal diary, and Cassette Tape #2.
  - Shifting crew photographs that alter as the mystery deepens.
  - Rain-streaked storm window and mechanical wall clock locked at `01:13 AM`.
- **Investigation Board & Clue Network**:
  - Interactive evidence board accessible via HUD `[TAB / B]` or Pause Menu.
  - 5 Categorized sections: *Radio Signals*, *Black Tide Incident*, *Station Personnel*, *Emergency Beacon*, and *01:13 Anomalies*.
  - Visual dossier cards connected by red yarn links.
- **Inspectable Inventory Drawer**:
  - 6-slot inventory system tracking key items: *200A Ceramic Fuse*, *Archive Cabinet Key*, *Cassette Tape #1*, *Cassette Tape #2*, *Torn Station Blueprint*, and *Beacon Calibration Note*.
  - Detailed inspection descriptions and lore hints.
- **3 Connected Mystery Puzzles**:
  - **Puzzle A: Archive Cabinet Key** — Decode the Station Blueprint grid to locate the hidden compartment behind the Sleeping Quarters photograph frame.
  - **Puzzle B: Cassette Decoding & Frequency Shift** — Unlock Cabinet `ARCH-02`, play Cassette Tape #1 on the Archive tape recorder, extract the hidden `14.28 MHz` frequency, and tune the radio to receive the lost operator distress call.
  - **Puzzle C: Optical Beacon Calibration** — Adjust Frequency (`13.13 MHz`), Output Power Gain (`85%`), and Azimuth Direction (`240° SW`) until 100% optical resonance is achieved.
- **Modernized Virtual & Touch Controls**:
  - Responsive 4-way D-Pad (Up, Down, Left, Right, Sprint) with cyan press-and-hold glow effects.
  - Context-sensitive **Interact [E]** button with animated pulse rings.
  - Look-Drag Zone for smooth swipe camera panning on mobile/touch screens.
  - Quick action buttons for Flashlight, Inventory, Investigation Board, and Pause.
  - Mode selector in Settings: *Auto-Detect*, *Always On*, or *Disabled*.
- **Accessibility & Quality of Life**:
  - Individual sliders for Master, SFX, Ambience, and Radio/Voice volume.
  - Photosensitive Mode (reduces harsh screen flashing during lightning and game over).
  - Mouse & look sensitivity slider (`0.4x` to `2.5x`).
  - Subtitle toggles for all spoken radio and tape dialogue.

### Milestone C — Phase 3: Signal Tower and Third Ending
- **New Playable Area: Upper Signal Tower & Beacon Deck**:
  - High-elevation glass observation dome and industrial steel catwalks perched above the storm.
  - Master optical Fresnel lens with sweeping xenon core and rotating radar dish.
  - Upper Beacon Array terminal for final broadcast execution.
  - Classified 1986 Signal Tower Transmission Log dossier.
  - Ladder ascent and ceiling hatch transition from the Observation Deck.
- **Narrative Recap Panel**:
  - In-game dossier modal summarizing the 1986 disaster, the 13.13 MHz anomaly, discovered evidence ratio, and decision outcome previews before making the final broadcast.
- **Third Ending: "Unknown Signal"**:
  - Secret third resolution unlocked when collecting optional lore (Cassette Tape #2, 1986 Operator Dossier, Time Paradox notes).
  - Resonates the 13.13 MHz carrier wave across all frequencies, freezing the storm in place and synchronizing the timeline permanently.
- **Expanded Endings Gallery**:
  - Complete 3-card ending gallery with real-time unlock tracking (`X / 3` discovered, completion percentage, and spoiler-safe summaries).

---

## 3. Station Map & Playable Locations

```text
                  [ UPPER SIGNAL TOWER ] (Beacon Lens / Classified 1986 Log / Final Array)
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
  │                                  │                          │
  ├── [ SLEEPING QUARTERS ] (West 2) │                          │
  │   • Bunk Beds & Lockers          │                          │
  │   • Hidden Key Photo Frame       │                          │
  │   • Eli's Personal Diary         │                          │
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
| **Ending A** | **The Beacon** | Complete Beacon Calibration (13.13 MHz / 85% / 240°) and select Option A: Engage Beacon to transmit emergency coordinates to the stranded 1986 vessel. |
| **Ending B** | **Silent Frequency** | Select Option B: Sever Frequency to disconnect the transceiver array, plunging Station 13 into silence and resetting the 01:13 AM loop. |
| **Ending C** | **Unknown Signal** | Collect optional lore evidence (Cassette Tape #2 in bunk room and 1986 Tower Dossier) and select Option C: Resonate Unknown Signal at the Upper Tower Array. |

---

## 5. Controls Reference

| Action | Desktop Keyboard & Mouse | On-Screen Touch / Virtual Controls |
| :--- | :--- | :--- |
| **Move Forward** | `W` or `Up Arrow` | `▲` Up D-Pad Button (Press & Hold) |
| **Move Backward** | `S` or `Down Arrow` | `▼` Down D-Pad Button (Press & Hold) |
| **Strafe Left** | `A` or `Left Arrow` | `◀` Left D-Pad Button (Press & Hold) |
| **Strafe Right** | `D` or `Right Arrow` | `▶` Right D-Pad Button (Press & Hold) |
| **Sprint / Fast Walk** | `Left Shift` | `⚡` Sprint Toggle Button |
| **Aim / Look Camera** | Mouse Move (Click canvas to lock pointer) | Drag / Swipe on Right Screen Half |
| **Interact / Inspect** | `E` or Left Click | `🖐️ INTERACT [E]` Action Button |
| **Toggle Flashlight** | `F` | `🔦` Flashlight Action Button |
| **Inventory Drawer** | `I` | `🎒 ITEMS` Action Button |
| **Investigation Board**| `TAB` or `B` | `🔍 BOARD` Action Button |
| **Pause / Exit Modal** | `ESC` | `⏸️` Pause Action Button |

---

## 6. Technology Stack

- **Frontend & Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Engine & WebGL**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Physics & Collision Bounds**: Segmented bounding boxes for 7 interconnected station zones.
- **Audio Architecture**: Procedural Web Audio API sound generators (rain, ocean, hum, static, SFX) + SpeechSynthesis with automatic fallbacks.
- **User Interface & Design System**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with auto-saving `localStorage` persistence and automatic schema migrations.

---

## 7. Local Setup & Installation

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Steps
1. Navigate to the project root:
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
4. Open your browser at:
   ```
   http://localhost:5173/
   ```
5. Build for production:
   ```bash
   npm run build
   ```
6. Preview production build:
   ```bash
   npm run preview
   ```

---

## 8. Save System & Data Management

Game settings, unlocked evidence, and endings are saved automatically in the browser's `localStorage` under the key:
```text
DEAD_AIR_SIGNAL_13_SAVE_V3
```
Automatic backward-compatible migration is included for previous `DEAD_AIR_SIGNAL_13_SAVE_V2` saves.

### Stored Data Schema
- `endingsUnlocked`: Records discovery of **Ending A: The Beacon**, **Ending B: Silent Frequency**, and **Ending C: Unknown Signal**.
- `hasCompletedBefore`: Indicates whether the player has completed at least one shift.
- `settings`: Master volume, SFX volume, Ambience volume, Music/Radio volume, Graphics Quality (`LOW`/`MEDIUM`/`HIGH`), Virtual Controls mode (`AUTO`/`ALWAYS_ON`/`DISABLED`), Mouse sensitivity, Camera shake, Photosensitive mode, and Subtitle toggles.

To clear saved progress, navigate to **Settings** and select **"Reset Local Progress"**.

---

## 9. Placeholder Assets & Zero-Block Audio Fallback

- **Audio**: All audio (rain, storm wind, ocean swells, electrical hum, cassette tape hum, Morse code, footsteps, thunder, switches, and voice transmissions) is procedurally generated using the browser's native **Web Audio API** and **SpeechSynthesis**. No external MP3/OGG downloads are required to play.
- **3D Meshes**: All 7 station sectors, consoles, props, and lighting are procedural Three.js parametric geometries optimized for fast 60fps rendering in modern web browsers without heavy binary downloads.

---

## 10. Future Roadmap (Phases 4 & 5)

- **Phase 4**:
  - Replay Mode / Chapter Select allowing players to revisit key moments without deleting full evidence history.
  - Dyslexia-friendly font options and expanded colorblind presets.
  - Advanced virtual controls customization (custom opacity, button repositioning, left/right-handed presets).
- **Phase 5**:
  - Additional low-end GPU optimization passes, texture compression profiles, and final packaging for hosting on platforms like Vercel / Netlify.

---

## 11. License

Built with Google Antigravity. Open for educational and exploratory horror game development under the MIT License.

