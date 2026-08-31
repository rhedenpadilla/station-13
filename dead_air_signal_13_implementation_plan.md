# Dead Air: Signal 13
## Web-Based 3D Psychological Horror Game — Implementation Plan

**Project type:** Single-player browser game  
**Target platform:** Desktop and touch-capable web browsers  
**Core delivery approach:** Build in small, tested vertical slices; preserve working features before expanding scope.  
**Persistence:** Browser `localStorage` only for the initial releases. No database, accounts, backend, multiplayer, or external API are required.

---

## 1. Project Vision

*Dead Air: Signal 13* is a first-person 3D psychological horror and mystery game set in an isolated coastal weather station during a violent storm. The player, radio operator Eli Navarro, receives broadcasts from an impossible frequency: **13.13 MHz**. These transmissions appear to anticipate events, guide the player through station failures, and uncover the legacy of the Black Tide Incident.

The experience should create tension through sound, lighting, weather, environmental changes, investigation, and fair puzzles—not graphic content, combat, or constant jumpscares.

### Version goals

| Release | Primary goal | Expected playtime |
| --- | --- | --- |
| Phase 0 | Technical proof of concept | 3–5 minutes |
| Phase 1 | Finished first playable vertical slice | 10–20 minutes |
| Phase 2 | Expanded mystery, investigation, and replayability | 25–40 minutes |
| Phase 3 | Signal-tower chapter and third narrative branch | 40–50 minutes |
| Phase 4 | Replayability, narrative depth, and player-experience improvements | 45–60 minutes |
| Phase 5 | Optimization, release preparation, and post-launch foundation | 45–60 minutes |

---

## 2. Technical Architecture

| Layer | Technology | Responsibility |
| --- | --- | --- |
| App foundation | React, Vite, TypeScript | Application structure, UI, build tooling |
| 3D rendering | Three.js, React Three Fiber | Environment, objects, camera, lighting, effects |
| 3D utilities | `@react-three/drei` | Asset loading, helpers, environment utilities |
| Movement and collisions | `@react-three/rapier` | Player collision, floors, doors, interactable physical objects |
| Audio | Howler.js or current compatible audio layer | Ambient loops, radio recordings, effects, volume groups |
| UI styling | Tailwind CSS | Menus, HUD, virtual controls, accessibility panels |
| State | Central TypeScript game-state store/context | Objectives, inventory, evidence, endings, settings |
| Local saves | `localStorage` | Checkpoints, choices, collected items, settings, unlocked endings |
| Asset formats | `.glb`, compressed images, `.ogg`/`.mp3` | Browser-efficient models, textures, and audio |

### Proposed project structure

```text
signal-13/
├── public/assets/
│   ├── audio/             # ambience, radio, tapes, effects
│   ├── models/            # optimized .glb environment and props
│   ├── textures/
│   └── icons/
├── src/
│   ├── components/
│   │   ├── GameUI/
│   │   ├── Menus/
│   │   ├── VirtualControls/
│   │   ├── Inventory/
│   │   └── InvestigationBoard/
│   ├── game/
│   │   ├── scenes/
│   │   ├── objects/
│   │   ├── puzzles/
│   │   ├── systems/
│   │   ├── audio/
│   │   ├── state/
│   │   ├── story/
│   │   └── constants/
│   ├── hooks/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── README.md
└── package.json
```

---

## 3. Design Standards

### Visual identity

| Purpose | Color |
| --- | --- |
| Deep navy background | `#07111F` |
| Storm blue | `#102A43` |
| Cold slate | `#243B53` |
| Fog gray | `#9FB3C8` |
| Radio/display cyan | `#39D9E6` |
| Emergency red | `#D94141` |
| Interior amber | `#F5B960` |
| Generator green | `#63D471` |

Use stylized-realistic, low-poly-to-mid-poly assets. The exterior uses cold blue fog and rain; interiors contrast it with amber desk lighting, cyan screens, and red emergency lights.

### Core experience rules

- Every required action must work with keyboard/mouse and virtual on-screen controls.
- Puzzles must have discoverable clues in the environment, notes, recordings, or UI.
- Story information must be subtitled and reviewable in the investigation board.
- Horror events are scripted from player progress, not overwhelming random events.
- Optimize assets and effects before adding more locations or visual complexity.

---

## 4. Phase 0 — Technical Foundation and Proof of Concept

**Objective:** Confirm that the browser, 3D stack, controls, audio, and save approach work reliably before building story content.

### Features

1. Initialize React, Vite, TypeScript, React Three Fiber, Drei, Rapier, Tailwind CSS, and the selected audio library.
2. Create a small gray-box radio-control-room test scene with walls, floor, desk, door, and collision meshes.
3. Implement first-person camera, pointer lock, WASD movement, mouse look, running, and pause behavior.
4. Implement interaction raycasting/proximity detection with one test object and an `E` interaction prompt.
5. Add a basic audio test: rain loop, radio static, and independent master/effects volume values.
6. Add a basic `localStorage` test for one setting and one checkpoint value.
7. Establish central state types for progress, settings, inventory, evidence, and ending status.

### Acceptance criteria

- Player cannot pass through room walls or fall through the floor.
- Player can pause and resume without pointer-lock errors.
- A test interaction works consistently at close range.
- Reloading the page restores the saved test setting.
- No TypeScript, browser console, or build errors remain.

---

## 5. Phase 1 — First Playable Vertical Slice

**Objective:** Deliver a complete short game loop from the first broadcast through one of two endings.

### 5.1 Environment implementation

Build these connected areas:

- **Radio Control Room:** main hub with radio console, weather screen, logbook, wall clock, desk lamp, flashlight, maps, and rain-covered windows.
- **Hallway:** compact metal corridor with directional signs, flickering lights, cables, and ambient machinery.
- **Observation Deck:** covered outdoor deck with rain, fog, railings, supply cabinet, and lightning-revealed ocean light.
- **Generator Room:** generator, empty fuse socket, red emergency lights, and a status change to green after restoration.

### 5.2 Story and objective flow

1. Start in the control room during a normal storm shift.
2. Teach movement, looking, and interaction.
3. Direct the player to inspect the radio.
4. Trigger flickering lights and unexplained static.
5. Present **13.13 MHz** as the target frequency.
6. Player tunes the radio and receives the warning to restore the beacon circuit.
7. Player reads the maintenance note and finds the fuse in the observation-deck cabinet.
8. Player returns to the generator room and inserts the fuse.
9. Power restoration unlocks the final radio event.
10. Player chooses to activate the emergency beacon or shut down the frequency.
11. Show ending card, save the unlocked ending, and offer Play Again.

### 5.3 Gameplay systems

- Radio tuning interface with visible frequency readout, near-signal static feedback, and lock-on at 13.13 MHz.
- Item pickup for the emergency fuse.
- Fuse-panel interaction with before/after visual and audio feedback.
- Objective HUD with current task and update sound.
- Subtitle display for radio dialogue.
- Flashlight toggle.
- Two ending sequences: **The Beacon** and **Silent Frequency**.
- Local save data for objective, fuse status, power status, settings, and endings.

### 5.4 User interface and controls

- Title menu: Start Shift, Settings, How to Play.
- HUD: interaction prompt, objective panel, subtitles, and radio frequency display when needed.
- Pause menu with resume, settings, objective reminder, and reset-progress confirmation.
- Keyboard/mouse: WASD, mouse look, Shift, E or click interaction, Escape pause.
- Virtual controls: press-and-hold directional arrows in the lower left; Interact, Flashlight, and Pause buttons on the right.

### Phase 1 acceptance criteria

- The full 10–20 minute flow is completable from a fresh save.
- Both endings can be reached and remain unlocked after reload.
- Keyboard/mouse and virtual controls complete the same required interactions.
- The player cannot get locked out of the fuse or generator objectives.
- README documents setup, controls, save data, and placeholder assets.

---

## 6. Phase 2 — Investigation, Expanded Spaces, and Replayability

**Objective:** Grow the vertical slice into a fuller mystery while keeping it browser-efficient and focused.

### 6.1 Preserve and improve controls

The existing virtual controls are mandatory and must not be removed.

- Keep four large semi-transparent directional buttons in the lower left.
- Support press-and-hold movement, touch input, and desktop pointer input.
- Add cyan hover/pressed feedback with accessible contrast.
- Keep Interact, Flashlight, and Pause buttons on the right.
- Add a virtual-control toggle; automatically enable on touch-capable devices.
- Ensure buttons never cover subtitles, objectives, or puzzle controls.
- Optionally implement a right-side look-drag zone where it does not conflict with UI.

### 6.2 New locations

- **Archive Room:** filing cabinets, tape recorder, station map, reports, shelves, wet footprints after a story trigger, fluorescent/red lighting, and a locked cabinet.
- **Sleeping Quarters:** bunk, locker, desk, journal, photographs, broken clock, and subtle room changes after key broadcasts.

### 6.3 Narrative content

Reveal the Black Tide Incident gradually through:

- At least three readable reports or clippings.
- Two playable cassette recordings.
- Two new radio broadcasts, all subtitled.
- One environmental anomaly tied to progress.
- One final discovery explaining that the beacon may bridge transmissions across different moments in time.

### 6.4 Investigation board and inventory

- Add an investigation board through the control-room computer and pause menu.
- Group evidence under Radio Signals, Black Tide Incident, Station Personnel, Emergency Beacon, and Unexplained Events.
- Include reviewed radio lines, documents, tapes, key clues, current objective, and a simple clue-connection map.
- Add a small item inventory with descriptions: archive key, cassette tapes, map piece, and beacon calibration note.

### 6.5 Puzzle chain

1. **Archive key puzzle:** use a radio clue and partial map to find a hidden sleeping-quarters compartment.
2. **Cassette/frequency puzzle:** retrieve and play a cassette; decode its tone or number pattern into a new radio frequency.
3. **Beacon calibration puzzle:** use the calibration note to adjust frequency, power, and direction using clear visual feedback.

### 6.6 Environmental tension events

Trigger specific events after major progress: light failures, altered photographs, a door left open, radio static from another room, changed clock time, or a distant sound. Keep these restrained, non-graphic, and avoid forced loud jumpscares.

### 6.7 Accessibility and quality of life

- Subtitle toggle and readable subtitle background.
- Master, music, ambience, and effects volume sliders.
- Mouse sensitivity control.
- Reduced flashing-light option.
- Camera-shake toggle, off by default.
- Reset-save confirmation.
- How to Play screen for both control methods.
- Loading screen with gameplay tips.
- Ending gallery with two unlocked endings plus a third locked “Unknown Signal” placeholder.

### Phase 2 acceptance criteria

- All new puzzles have a logical clue path and save correctly.
- Investigation evidence remains available after reload.
- The expanded 25–40 minute flow has no inaccessible rooms or unrecoverable puzzle states.
- Virtual controls work on touch simulations and do not obstruct gameplay UI.
- Both Phase 1 endings are preserved but enriched by calibration progress.

---

## 7. Phase 3 — Signal Tower and Final Narrative Branch

**Objective:** Conclude the core Black Tide mystery with a final playable location and a meaningful third ending.

### Planned features

1. Add a compact **Signal Tower** or upper beacon-control area, unlocked only after the Phase 2 calibration puzzle.
2. Implement the third ending, **Unknown Signal**, based on evidence completion and the player’s final signal decision.
3. Add optional evidence collectibles that explain the former operator’s choices and unlock the most complete interpretation of the Black Tide Incident.
4. Create a final signal sequence that reuses the radio tuning, evidence, and beacon systems instead of adding a separate large mechanic.
5. Improve the ending gallery with short, spoiler-safe unlocked descriptions and completion percentages.
6. Add a narrative recap panel before the final decision so players can review critical clues without needing outside guidance.

### Phase 3 acceptance criteria

- A new player can reach the Signal Tower and complete at least one of the three endings without outside instructions.
- The Unknown Signal route is clearly gated by discoverable optional evidence rather than hidden arbitrary conditions.
- All three endings save and display accurately in the ending gallery.

---

## 8. Phase 4 — Replayability and Player-Experience Improvements

**Objective:** Make repeat playthroughs more rewarding while improving pacing, accessibility, and immersion.

### Planned features

1. Add a **New Game+ / replay mode** that retains unlocked endings and evidence history while resetting story progress.
2. Add optional contextual radio transmissions and environmental variations that change based on previous ending choices.
3. Add a non-intrusive **chapter select** after an ending is completed, allowing players to revisit major chapters without deleting their full save.
4. Expand the investigation board with a timeline view and a “missing evidence” hint that remains spoiler-light.
5. Add an optional photo/snapshot journal for documented anomalies, with captured discoveries visible in the pause menu.
6. Refine virtual controls with configurable size, opacity, left/right handed layout, and a button-layout preview in Settings.
7. Add accessibility improvements: high-contrast UI option, dyslexia-friendly text option if the chosen font supports it, hold-to-interact alternative, and fuller keyboard remapping where practical.
8. Add more quality-of-life features: objective history, collectible tracker, subtitle size, and an option to reduce motion/fog intensity.
9. Add carefully limited ambient variations—different storm intensity, alternate distant lights, or changed radio noise—to strengthen replay value without affecting puzzle fairness.

### Phase 4 acceptance criteria

- Replay and chapter select cannot corrupt the main progression save.
- Every control customization remains usable after reload.
- Optional content gives additional story context but never prevents players from completing a normal ending.
- Accessibility options visibly affect the intended UI or gameplay behavior and are testable.

---

## 9. Phase 5 — Optimization, Release Preparation, and Post-Launch Foundation

**Objective:** Make the game stable, performant, documented, and ready for browser deployment and future updates.

### Planned features

1. Add graphics presets: Low, Medium, and High, covering fog, rain particles, shadow quality, texture quality, and post-processing.
2. Optimize model count, texture sizes, draw calls, lighting, audio loading, and particle effects; use loading/lazy-loading where useful.
3. Add robust loading, asset-failure, and unsupported-browser screens with a clear option to return to the title menu.
4. Perform structured playtesting for first-time players, virtual-control users, puzzle clarity, audio balance, and ending flow.
5. Fix high-priority issues discovered in playtesting and conduct full regression tests across all six phases.
6. Complete credits, licenses/attributions, privacy note for local-only saves, and final accessibility documentation.
7. Prepare a release checklist, production build, deployment configuration for Vercel or Netlify, and a simple release-notes template.
8. Add an optional, privacy-respecting feedback-link placeholder; do not add analytics or a backend unless explicitly needed in a later version.

### Phase 5 acceptance criteria

- The production build completes without errors and runs on the intended browser targets.
- Low quality remains playable on a typical student laptop; Medium is the default balanced preset.
- Fresh saves, returning saves, reset progress, all endings, menus, virtual controls, and accessibility options pass regression testing.
- README and release notes match the shipped feature set and known limitations.

---

## 10. Testing and Quality Assurance

Test at the end of every phase and before merging major changes.

| Test area | Required checks |
| --- | --- |
| Build quality | TypeScript check, production build, no console errors |
| Movement | Keyboard/mouse, touch buttons, collision, pause/resume, no stuck camera |
| Interaction | Prompts, proximity/raycast range, pickups, doors, puzzle buttons |
| Story flow | Objective order, subtitles, recordings, endings, replay/reset flow |
| Saves | Fresh game, reload during each milestone, reset progress, settings persistence |
| Performance | Initial load, room transitions, rain/fog, low-quality preset |
| Accessibility | Subtitle legibility, reduced flashing, virtual controls, volume controls |

Maintain a simple test checklist in the repository so each completed feature can be verified before the next phase begins.

---

## 11. Asset and Performance Plan

- Prefer optimized low-poly or stylized `.glb` models.
- Use simple collision meshes instead of detailed model collisions.
- Compress textures and avoid unnecessary 4K assets.
- Use looping compressed audio and lazy-load nonessential recordings where practical.
- Limit dynamic lights and shadows; use emissive materials and scripted lighting changes when possible.
- Keep fog, rain particles, and post-processing adjustable by graphics quality.
- Use original or properly licensed placeholder assets only; track credits for replacement assets.

---

## 12. Deployment and Documentation

### Deployment target

Deploy the client-side build to Vercel or Netlify after Phase 3 validation. A database is not needed because save data stays in the player’s browser.

### README requirements

Keep `README.md` updated after each phase with:

- Project overview and premise.
- Feature list by phase.
- Technology stack.
- Local installation and run commands.
- Controls table for keyboard/mouse and virtual buttons.
- Local save-data behavior and reset instructions.
- Folder structure summary.
- Current limitations, known placeholders, and asset credits.
- Screenshot placeholders.
- Phase 3–5 roadmap until completion.

---

## 13. Recommended Development Order

1. Complete Phase 0 technical proof of concept.
2. Build and verify Phase 1 as a fully playable, small game.
3. Freeze Phase 1 core systems once stable; branch or back up before Phase 2 expansion.
4. Implement Phase 2 in this order: virtual-control improvements, rooms, evidence/inventory, puzzles, story events, endings, accessibility, documentation.
5. Perform full regression testing of Phase 1 and Phase 2 features.
6. Implement Phase 3 only after all Phase 2 acceptance criteria pass.
7. Build Phase 4 only after the three core endings work and saves remain stable.
8. Use Phase 5 for hardening, testing, documentation, and deployment—not for unplanned core features.

This sequence prioritizes a working game at every milestone and prevents visual expansion from outpacing usable interaction and story flow.
