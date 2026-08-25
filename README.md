# Dead Air: Signal 13 (Phase 2)

> *"Station 13... Restore the beacon circuit... Do not let the light go out."*

**Dead Air: Signal 13** is an atmospheric, web-based, first-person 3D psychological mystery-horror game built with React, Three.js, React Three Fiber, and Web Audio API.

**Phase 2** expands the original vertical slice into a **25–40 minute psychological mystery experience** featuring deep environmental storytelling, historical investigation, audio tape decryption, multi-parameter optical beacon calibration, and a responsive on-screen touch/virtual navigation system.

---

## 1. Core Premise & Black Tide Lore

You play as **Eli Navarro**, a newly assigned night radio operator stationed at **Weather Station 13**, an isolated meteorological outpost perched atop a jagged coastal cliff during a violent gale-force storm.

At precisely **01:13 AM**, an unidentified broadcast cuts through the static. As you investigate the station facilities, you uncover evidence of the **1986 Black Tide Incident**—a cargo vessel lost in the shoals decades ago when the former operator dismissed emergency radio calls. The mysterious Signal 13 is a temporal relay spanning across moments in time, seeking to prevent history from repeating itself.

---

## 2. Features Overview

### Phase 1 Core Systems (Preserved & Enhanced)
- **First-Person Station Exploration**: Radio Control Room, Connecting Corridor, Auxiliary Generator Room, and Observation Deck.
- **AN/URC-113 Radio Frequency Tuner**: Analog tuning dial, live CRT oscilloscope, and S-Meter signal strength gauge.
- **Fuse & Power Puzzle**: Recovering the 200A Ceramic Fuse and restoring the main auxiliary generator breaker circuit.
- **Procedural Soundscape**: Synthetic rain squalls, ocean swell filters, 60Hz transformer hum, thunderclaps, and distorted synthesized radio transmissions.
- **Branching Endings**: Dual narrative resolutions persisted via browser `localStorage`.

### Phase 2 Expansions (New Systems)
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
  - Full Endings Gallery with Phase 2 badges and Phase 3 silhouette preview.
  - Dedicated "How to Play" manual modal.

---

## 3. Station Map & Playable Locations

```text
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

## 4. Controls Reference

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

## 5. Technology Stack

- **Frontend & Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Engine & WebGL**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Audio Architecture**: Procedural Web Audio API sound generators + SpeechSynthesis
- **User Interface & Design System**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with auto-saving `localStorage` persistence

---

## 6. Local Setup & Installation

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

---

## 7. Save System & Data Management

Game settings, unlocked evidence, and endings are saved automatically in the browser's `localStorage` under the key:
```text
DEAD_AIR_SIGNAL_13_SAVE_V2
```

### Stored Data Schema
- `endingsUnlocked`: Records discovery of **Ending A: The Beacon** and **Ending B: Silent Frequency**.
- `hasCompletedBefore`: Indicates whether the player has completed at least one shift.
- `settings`: Master volume, SFX volume, Ambience volume, Radio/Voice volume, Graphics Quality (`LOW`/`MEDIUM`/`HIGH`), Virtual Controls mode (`AUTO`/`ALWAYS_ON`/`DISABLED`), Mouse sensitivity, Photosensitive mode, and Subtitle toggles.

To clear saved progress, navigate to **Settings** and select **"Reset Local Progress"**.

---

## 8. Screenshot Placeholders

### Radio Control Room Console
```text
+-------------------------------------------------------------+
|  [ AN/URC-113 TRANSCEIVER ]       [ CRT RADAR SECTOR 13 ]   |
|  FREQ: 13.13 MHz [LOCKED]          /\ Rotating Sweep        |
|  [=== Oscilloscope Waveform ===]   Desk Lamp (Amber 2200K)  |
+-------------------------------------------------------------+
```

### Archive Room & Tape Deck
```text
+-------------------------------------------------------------+
|  [ ARCHIVE ROOM ]                 [ REEL TAPE DECK 86 ]     |
|  Filing Cabinets ARCH-02          ( o ) ===== ( o )         |
|  Black Tide Incident Inquiry      Spoken Clue: 14.28 MHz    |
+-------------------------------------------------------------+
```

### Investigation Board
```text
+-------------------------------------------------------------+
|  [ EVIDENCE NETWORK ]             [ FILE DOSSIER ]          |
|  [Radio Signals] ---🧵--- [1986 Black Tide] ---🧵--- [Beacon] |
|  Clues: 10/10 Discovered          Summary & Connected Links |
+-------------------------------------------------------------+
```

### Virtual Controls & HUD
```text
+-------------------------------------------------------------+
|  Directive #4: Locate Key          01:13 AM | Stability: 95%|
|                                                             |
|  [▲]                                     [Board] [Items]    |
| [◀][⚡][▶]                                [🔦] [🖐️ INTERACT] |
|  [▼]                                                        |
+-------------------------------------------------------------+
```

### Beacon Calibration Interface
```text
+-------------------------------------------------------------+
|  [ RESONANCE GAUGE: 100% SYNC ]   [ CALIBRATION CONTROLS ]  |
|  ==============================   1. Frequency: 13.13 MHz   |
|  [ STATUS: OPTIMAL & PRIMED ]     2. Power Gain: 85%        |
|                                   3. Azimuth: 240° SW       |
+-------------------------------------------------------------+
```

---

## 9. Current Limitations & Phase 3 Roadmap

### Current Limitations (Phase 2)
- Focuses entirely on single-player narrative exploration within the 6 primary station zones.
- Procedural speech synthesis is tuned for modern browser audio engines.

### Phase 3 Planned Roadmap
- **Flooded Sub-Level**: Access the lower water pump room beneath the generator facility.
- **Lighthouse Lantern Room**: Ascend the spiral staircase to the top optical fresnel dome.
- **Ending 3: "Unknown Signal"**: A third secret ending deciphered by triangulating anomalous transmissions off the reef.
- **Positional 3D Web Audio HRTF**: True spatial audio panning for localized entity whispers and machinery.

---

## 10. License

Built with Google Antigravity. Open for educational and exploratory horror game development under the MIT License.
