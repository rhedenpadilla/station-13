# Dead Air: Signal 13 — Release Edition (Phases 1–5)

> *"Station 13... Restore the beacon circuit... Do not let the light go out."*

**Dead Air: Signal 13** is a browser-based, client-side, first-person 3D psychological mystery-horror game built with React, Vite, TypeScript, Three.js, React Three Fiber, Web Audio API, and Tailwind CSS.

---

## 1. Core Premise & Atmospheric Mystery

You play as **Eli Navarro**, the night radio operator at **Weather Station 13**, an isolated meteorological outpost perched atop a jagged coastal cliff during a severe gale-force squall.

At precisely **01:13 AM**, an impossible broadcast cuts through the static. As you investigate the facility's darkened corridors, generators, archives, and signal tower, you uncover evidence of the **1986 Black Tide Incident**—a cargo vessel lost in the shoals decades ago when the former operator dismissed emergency radio calls. The mysterious Signal 13 is a temporal relay spanning across moments in time, seeking to prevent history from repeating itself or permanently fusing the timeline.

---

## 2. Complete Phase 1–5 Feature Overview

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                   DEAD AIR: SIGNAL 13 - COMPLETE ARCHITECTURE               │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│    CORE EXPERIENCE   │  REPLAY & DISCOVERY  │    PERFORMANCE & RELEASE      │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ • 7 Station Sectors  │ • New Game+ Mode     │ • Low/Med/High GFX Presets    │
│ • HF Transceiver     │ • 5 Chapter Selects  │ • Fail-Safe Error Boundary    │
│ • Beacon Calibration │ • Snapshot Journal   │ • Rollup Vendor Chunking      │
│ • Cassette Recorder  │ • Timeline Clues     │ • Vercel & Netlify Configs    │
│ • 3 Authored Endings │ • Lore Variations    │ • Pure Procedural Web Audio   │
│ • Dual Control Modes │ • Profile Migration  │ • 100% Client-Side Storage    │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

### Milestone Summary
1. **Phase 1: Prototype Foundation & Core Mechanics**: First-person movement, pointer lock, procedural storm audio, and 13.13 MHz HF radio tuning.
2. **Phase 2: Station Expansion & Puzzles**: Observation Deck fuse hunt, Aux Generator diesel breaker, Archive Room locked Cabinet ARCH-02, cassette audio decoder, and 3-parameter Beacon Optical Relay alignment.
3. **Phase 3: Multiple Endings & Climax**: Upper Signal Tower, 1986 Dossier, and 3 branching narrative climaxes (*The Beacon*, *Silent Frequency*, *Unknown Signal*).
4. **Phase 4: Replayability & Accessibility**: New Game+, 5-chapter timeline select, 9-entry Snapshot Journal, Investigation Board with chronology & clues, customizable virtual touch controls, high contrast, typography, and subtitle sizing.
5. **Phase 5: Optimization & Release Readiness**: Real-time Graphics Presets (Low, Medium Balanced, High), `GameErrorBoundary` fail-safe recovery, optimized Zustand frame updates, static hosting configuration (Vercel/Netlify), and full test suites.

---

## 3. Technology Stack

- **Framework & Bundler**: React 18, Vite 5, TypeScript 5
- **3D Graphics & Rendering**: Three.js, React Three Fiber (R3F), Drei
- **Styling & UI**: Tailwind CSS, Lucide React Icons
- **State Management**: Zustand (with strict equality checks and localStorage persistence)
- **Audio Engine**: Zero-dependency Procedural Web Audio API (Synthesized rain, ocean roar, generator hum, electrical static, tone pulses, and binaural heartbeat)
- **Deployment**: Static web host ready (Vercel, Netlify, GitHub Pages)

---

## 4. Installation, Running & Testing

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Execute Phase 5 automated verification suite
npx tsx test_phase5.ts

# 4. Build optimized production bundle
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 5. Controls Guide

### Keyboard & Mouse
| Input | Action |
| :--- | :--- |
| **W, A, S, D** | Move Forward / Left / Backward / Right |
| **Shift + Movement** | Sprint |
| **Mouse Look** | Look / Aim (Click screen to lock cursor) |
| **E** | Interact (Inspect object, pick up items, toggle consoles) |
| **F** | Toggle Emergency Flashlight |
| **I** | Open Inventory & Inspection View |
| **Tab / B** | Open Investigation Board & Timeline |
| **Esc** | Pause Game / Release Pointer Lock |

### Virtual On-Screen Controls (Touch / Mobile)
| Control | Description |
| :--- | :--- |
| **Virtual D-Pad** | 4-way movement pad (Supports Small, Medium, Large sizing and Low, Medium, High opacity) |
| **Look Drag Zone** | Drag on the right screen half to rotate camera yaw & pitch smoothly |
| **Action Buttons** | On-screen buttons for Interact `[E]`, Flashlight `[F]`, Inventory `[INV]`, and Board `[LOG]` |
| **Handedness** | Choose between Default (Left D-Pad) or Mirrored (Right D-Pad) in Settings |
| **Interact Mode** | Choose between instant Press or Hold-to-Interact (0.3s–1.5s configurable) |

---

## 6. Graphics Quality Presets & Accessibility

### Graphics Presets (Configured in Settings > Graphics)
| Preset | Shadows | Rain Particles | Display DPR | Antialiasing | Flashlight Shadows |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Low** | Off | 800 | 1.0x native | Off | Off |
| **Medium** *(Default)* | Balanced | 2,500 | Up to 1.5x | Off | Off |
| **High** | High Quality | 5,000 | Up to 2.0x | MSAA | Enabled |

*Settings take effect immediately in real-time without reloading the page.*

### Accessibility Options (Configured in Settings > Accessibility)
- **High-Contrast UI**: High-visibility cyan borders and darkened background cards for easier reading.
- **Subtitle Font Sizing**: Small, Medium, Large typography.
- **Clean Typography**: Toggle between atmospheric Monospace font and clean Sans-Serif font.
- **Reduced Motion**: Disables camera headbob and sway for motion-sensitive players.
- **Reduced Fog**: Softens exterior mist density for greater visibility on the Observation Deck.
- **Photosensitive & Flashing Options**: Calibrates lightning flash intensity.

---

## 7. Storage, Migration & Reset Options

**Dead Air: Signal 13** runs **100% in the player's browser** and does not use any database, user accounts, or external telemetry.

- **Storage Key**: `DEAD_AIR_SIGNAL_13_SAVE_V4` (in browser `localStorage`).
- **Backward-Compatible Migration**: Older Phase 1–3 saves are automatically upgraded to V4 without erasing unlocked endings or discovered lore.
- **Reset Options**:
  - **Reset Main Progress**: Clears only the active shift checkpoint back to 01:13 AM while preserving your Endings Gallery, Snapshot Journal, and settings.
  - **Reset Everything**: Displays an explicit confirmation dialog detailing all data before completely wiping local storage.

---

## 8. Project Structure

```text
station-13/
├── docs/
│   └── RELEASE_CHECKLIST.md       # Quality and test verification checklist
├── public/
│   └── favicon.svg                # Station 13 vector icon
├── src/
│   ├── components/
│   │   ├── GameErrorBoundary.tsx  # In-universe diagnostic error recovery
│   │   ├── GameUI/                # HUD, Inventory, Board, Radios, Endings
│   │   ├── Menus/                 # Title, Loading, Settings, Pause, Chapters
│   │   └── VirtualControls/       # On-screen D-Pad and Touch Look Zone
│   ├── game/
│   │   ├── audio/                 # Zero-dependency Web Audio SoundEngine
│   │   ├── constants/             # Chapters, Snapshots, Lore, Item DBs
│   │   ├── objects/               # 7 Station 3D Rooms & Weather Systems
│   │   ├── scenes/                # Canvas StationScene setup
│   │   ├── state/                 # Zustand useGameState, saveManager, variations
│   │   └── systems/               # PlayerController physics & interaction
│   ├── App.tsx                    # Root application component
│   ├── index.css                  # Custom styling, scanlines, vignettes
│   └── main.tsx                   # React root entry point
├── CHANGELOG.md                   # Full version history
├── RELEASE_NOTES.md               # Release highlights & privacy note
├── test_phase5.ts                 # Automated release verification suite
├── netlify.toml                   # Netlify static deployment config
├── vercel.json                    # Vercel static deployment config
└── vite.config.ts                 # Rollup chunking & build configuration
```

---

## 9. Known Limitations & Asset Disclosures

1. **Stylized Procedural 3D Geometry**: All rooms, consoles, furniture, and dials are authored Three.js procedural meshes to keep loading instantaneous and avoid multi-megabyte GLB assets.
2. **Web Audio User Gesture**: Browsers require a mouse click or touch interaction before playing synthesized audio.
3. **Browser Storage Lifetime**: Clearing browser cache/cookies will delete local game saves.

---

## 10. Attributions & Licensing

- **Codebase & Architecture**: Built with React Three Fiber, Three.js, Lucide Icons, and Tailwind CSS under the MIT License.
- **Audio Soundscape**: 100% procedural Web Audio API synthesis authored natively for *Dead Air: Signal 13*.
- **Fonts**: *Inter*, *Share Tech Mono*, and *Special Elite* served via Google Fonts under the SIL Open Font License (OFL).

---

## 11. Deployment Guide

### Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel` (or connect your Git repository in the Vercel dashboard).
2. Run `vercel` in the project root.
3. The included `vercel.json` automatically configures the build output directory (`dist`), SPA rewrites, and security headers.

### Deploying to Netlify
1. Connect your repository to Netlify (or drag the `dist` folder into the Netlify drop zone).
2. Build command: `npm run build`, Publish directory: `dist`.
3. The included `netlify.toml` automatically handles SPA redirects and caching headers.
