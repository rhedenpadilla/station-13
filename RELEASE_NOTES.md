# Dead Air: Signal 13 — Release Notes (v1.0.0)

> *"Station 13... Restore the beacon circuit... Do not let the light go out."*

**Dead Air: Signal 13** is an atmospheric, browser-based, first-person 3D psychological mystery-horror game. You play as **Eli Navarro**, night radio operator at Coastal Weather Station 13 during a storm when an impossible broadcast cuts through at 01:13 AM.

---

## 🌟 What's New in Version 1.0.0 (Phase 5 Release)

### 1. Dynamic Graphics Quality Presets
- **Three Presets Available**:
  - **Low**: Maximum framerate on older laptops and integrated GPUs. Soft ambient light boost, 800 rain particles, simplified shadows, native 1.0x display resolution.
  - **Medium (Default Balanced)**: Recommended experience for modern web browsers. 2,500 rain particles, balanced shadow rendering, adaptive 1.5x resolution scaling.
  - **High**: Maximum visual fidelity. 5,000 rain streaks, MSAA antialiasing, dynamic flashlight shadow maps, and rich exterior fog.
- **Zero-Reload Switching**: Presets take effect immediately within the active scene without reloading the page.

### 2. Runtime Protection & Error Recovery
- **Atmospheric Error Boundary**: Intercepts rare WebGL context losses or runtime anomalies with clear in-universe diagnostic options:
  - *Retry Scene*: Re-mounts the 3D canvas immediately.
  - *Return to Title Menu*: Returns to the main menu without losing campaign progress.
  - *Reset Shift Checkpoint*: Restores shift start while preserving profile discoveries, endings, and snapshot journals.

### 3. Engine & Rendering Optimizations
- **Frame-Rate Stability**: Optimized per-frame Zustand state dispatches to eliminate unnecessary React re-renders.
- **Vendor Chunk Splitting**: Reduced main app bundle to 266 kB with dedicated cacheable Three.js/R3F vendor chunks.
- **Pure Procedural Audio**: Zero external audio downloads needed—100% synthesized through Web Audio API for zero latency and offline reliability.

### 4. Production Static Hosting Readiness
- **Vercel & Netlify Configurations**: Pre-configured security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`), immutable asset caching, and clean client-side routing.
- **Enhanced OpenGraph & Social Metadata**: Rich sharing previews and mobile Web App directives.

---

## 🔒 Privacy & Local Storage Note

**Dead Air: Signal 13** is a 100% client-side game. 
- All game saves, profile unlocks, endings, and custom settings are stored **exclusively in your browser's local storage (`localStorage`)**.
- The game does not require user accounts, does not collect analytics or telemetry, and does not communicate with any external servers or APIs.

---

## 📋 Known Limitations & Notes

- **Browser Audio Gestures**: Modern browsers require an initial click or touch gesture before Web Audio API sound playback can begin. The game automatically prompts or activates audio on your first interaction.
- **Pointer Lock**: Desktop browsers require clicking inside the game window to lock the mouse cursor for first-person looking. Press `ESC` at any time to pause and unlock the cursor.
- **Stylized Procedural 3D Models**: In accordance with the game's atmospheric aesthetic, all station rooms, consoles, and props are procedural Three.js geometric constructs rather than bloated photogrammetry assets.

---

## 💬 Community & Feedback Placeholder

Have feedback or encountered an issue during your shift at Station 13?
- Documentation / Repository: [Project Repository Placeholder](https://github.com/placeholder/dead-air-signal-13)
- Issue Tracker: [GitHub Issues Placeholder](https://github.com/placeholder/dead-air-signal-13/issues)
