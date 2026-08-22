# Dead Air: Signal 13

> *"Station 13... Restore the beacon circuit... Do not let the light go out."*

**Dead Air: Signal 13** is a polished, web-based, first-person 3D psychological horror game prototype and compact vertical slice built with React, Three.js, React Three Fiber, and Web Audio API. 

The game delivers approximately 10–20 minutes of atmospheric exploration, analog radio frequency tuning, environmental puzzles, weather telemetry, and psychological tension without relying on cheap jumpscares or graphic gore.

---

## 1. Core Premise

You play as **Eli Navarro**, a newly assigned night radio operator at **Weather Station 13**, an isolated meteorological outpost perched on a jagged coastal cliff during a violent off-shore gale.

Your shift starts routine: monitor storm squalls, record barometric pressure drops, log transmissions, and ensure the station's electrical auxiliary systems stay operational.

At precisely **01:13 AM**, an unknown carrier signal spikes across the high-frequency band at **13.13 MHz**. The broadcast knows events before they occur—and issues an urgent warning: the station's emergency beacon must not fail.

---

## 2. Features Included in Version 1

- **First-Person Station Exploration**:
  - **Radio Control Room**: Analog HF transceiver console, CRT storm radar, stuck clock jittering at 01:13 AM, warm amber desk lamp, shift handover logs, and rain-streaked windows.
  - **Hallway**: Damp metallic corridors, electrical pipes, flickering overhead fluorescent lights, and electronic keypad doors.
  - **Observation Deck**: Stormy exterior platform overlooking raging ocean swells, heavy rain, dense sea fog, a weatherproof supply cabinet, and a mysterious light out at sea visible only during lightning strikes.
  - **Generator Room**: Industrial diesel generator machinery, electrical breaker conduits, and fuse socket with dynamic red/green status feedback.
- **Analog Radio-Tuning Puzzle**:
  - Full-featured AN/URC-113 transceiver modal with a live CRT oscilloscope, S-Meter signal strength gauge, manual frequency slider, precision step buttons, dynamic static noise modulation, and signal lock-on at 13.13 MHz.
- **Procedural Web Audio Horror Soundscape**:
  - Bandpass-filtered rain squall synthesizer.
  - Sub-bass ocean swell acoustics.
  - Rolling thunderclaps and lightning crackles.
  - Frequency-modulated pink noise radio static.
  - 60Hz mains transformer hum and fluorescent lamp buzzing.
  - Metallic and tile footstep acoustic impulse filters.
  - Spooling generator startup sequence.
  - Synthesized distorted radio broadcast speech.
- **Dual Branching Endings**:
  - **Ending A: The Beacon** — Transmit emergency coordinates through the storm, illuminate the coastal light, and watch the ocean calm.
  - **Ending B: Silent Frequency** — Sever the carrier frequency, plunge the station into silence, and watch the clock loop back to 01:13 AM.
- **On-Screen Navigation & Touch Controls**:
  - Virtual D-Pad (Up, Down, Left, Right) and Sprint (⚡) toggle for easy keyboard-less or touch navigation.
  - Interactive Action buttons for **Interact [E]** (with dynamic pulsing ring when in range) and **Flashlight [F]**.
  - On-screen **Sector Navigator** compass header tracking your real-time position (*Radio Control Room*, *Connecting Corridor*, *Auxiliary Generator Room*, *Observation Deck*).
  - On-screen **Exit Game** button in the HUD and Pause menu that stops audio and safely redirects to the Homepage.
- **Psychological Horror Twist & Game Over System**:
  - **Temporal & Sanity Hazards**: Standing outside in the heavy storm with your flashlight turned off rapidly destabilizes Eli's psychological sanity.
  - **Forbidden Carrier Anomaly (13.66 MHz)**: Tuning the radio into the anomalous forbidden frequency overloads the transceiver and triggers an entity breach.
  - **Game Over & Automatic Timeline Reset**: Screen shatters into blood-red glitch static, playing distorted audio, revealing the temporal loop twist, and automatically rebooting the timeline back to shift start.

---

## 3. Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Graphics & Rendering**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Audio Engine**: Native HTML5 Web Audio API procedural synthesis + SpeechSynthesis
- **Styling & HUD**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with `localStorage` persistence

---

## 4. Controls

| Key / Action | Function |
| :--- | :--- |
| **W, A, S, D** or **Arrow Keys** | Move Eli Navarro |
| **Mouse Look** | Rotate Camera (Click canvas to lock pointer) |
| **Left Shift** | Jog / Fast Walk |
| **E** or **Left Click** | Interact (Tune radio, read notes, collect/insert fuse) |
| **F** | Toggle Flashlight On/Off |
| **Escape** | Pause Menu / Exit Active Inspection Windows |

---

## 5. Getting Started & Local Installation

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation Steps

1. Clone or navigate to the project directory:
   ```bash
   cd c:\Projects\station-13
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 6. Project Structure

```text
station-13/
├── public/
│   ├── favicon.svg
├── src/
│   ├── components/
│   │   ├── GameUI/
│   │   │   ├── ChoiceModal.tsx       # Final radio decision modal
│   │   │   ├── EndingScreen.tsx      # Dual ending screens & replay CTA
│   │   │   ├── HUD.tsx               # Objectives, crosshair, subtitles, telemetry
│   │   │   ├── NoteViewerUI.tsx      # Handover memo & weather log reader
│   │   │   └── RadioTunerUI.tsx      # Analog radio transceiver & CRT oscilloscope
│   │   └── Menus/
│   │       ├── PauseMenu.tsx         # In-game pause & controls guide
│   │       ├── SettingsModal.tsx     # Audio sliders, graphics quality, data reset
│   │       └── TitleScreen.tsx       # Atmospheric main menu & endings tracker
│   ├── game/
│   │   ├── audio/
│   │   │   └── SoundEngine.ts        # Procedural Web Audio API soundscape
│   │   ├── constants/
│   │   │   └── gameData.ts           # Objectives, notes, and radio transcripts
│   │   ├── objects/
│   │   │   ├── GeneratorRoom.tsx     # Turbine engine, fuse panel, indicator lights
│   │   │   ├── Hallway.tsx           # Corridors, flickering tubes, signs, doors
│   │   │   ├── ObservationDeck.tsx   # Overlook platform, ocean, supply cabinet, mystery sea light
│   │   │   ├── RadioRoom.tsx         # Transceiver desk, CRT radar, stuck clock
│   │   │   └── WeatherEffects.tsx    # 3D rain particles, lightning, fog
│   │   ├── scenes/
│   │   │   └── StationScene.tsx      # Main 3D R3F Canvas assembly
│   │   ├── state/
│   │   │   └── useGameState.ts       # Zustand store with localStorage persistence
│   │   └── systems/
│   │       └── PlayerController.tsx  # First-person movement, headbob, collision, raycast
│   ├── App.tsx                       # Root application layout & state routing
│   ├── index.css                     # Tailwind directives, CRT scanlines & overlays
│   └── main.tsx                      # Vite React entrypoint
├── index.html                        # Meta tags, typography, viewport setup
├── package.json                      # Dependencies & scripts
├── tailwind.config.js                # Custom palette, animations, fonts
├── tsconfig.json                     # TypeScript compiler configuration
└── vite.config.ts                    # Vite build configuration
```

---

## 7. Save System & Local Storage

Game state and settings are saved to `localStorage` under the key `DEAD_AIR_SIGNAL_13_SAVE`.

The saved data contains:
- `endingsUnlocked`: Tracks whether *Ending A (The Beacon)* or *Ending B (Silent Frequency)* has been discovered.
- `hasCompletedBefore`: Indicates whether the player has completed at least one shift.
- `settings`: Master volume, SFX volume, Ambience volume, and Graphics Quality preset (`LOW`, `MEDIUM`, `HIGH`).

To clear all saved data, use the **"Reset Local Progress"** button inside the **Settings** menu.

---

## 8. Deployment Instructions

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root and accept default Vite build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Deploy to Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run `netlify deploy --prod`
3. Set Publish directory to `dist`.

---

## 9. Limitations & Planned Version 2 Ideas

### Current Limitations (Version 1)
- Focused as a single vertical slice (Weather Station 13 indoor/outdoor facility).
- Single-session puzzle flow without external save slots.

### Planned Version 2 Features
- **Expanded Facility**: Lighthouse spiral staircase, flooded lower basement pumproom, and radar dome roof access.
- **Physical Signal Decryption**: Morse code audio decoder mini-game and tape reel recorder playback.
- **Dynamic Entity Events**: Visual distortions, shadow silhouettes out on the rocks, and uncrewed lifeboats washing ashore.
- **Spatial 3D HRTF Positional Audio**: Full Web Audio PannerNodes attached to Three.js audio anchors.

---

## 10. Credits & License

- **Developer**: Built with Google Antigravity
- **Audio & Assets**: 100% procedurally synthesized via Three.js and Web Audio API.
- **License**: MIT License. Open for educational and exploratory horror game development.
