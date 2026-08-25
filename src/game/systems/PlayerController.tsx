import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';
import { soundEngine } from '../audio/SoundEngine';
import {
  MAINTENANCE_NOTE,
  WEATHER_LOG,
  BLACK_TIDE_REPORT,
  NEWSPAPER_CLIPPING,
  ELI_DIARY_NOTE,
  BEACON_CALIBRATION_DOC,
} from '../constants/gameData';

export function PlayerController() {
  const { camera, gl } = useThree();

  const isPaused = useGameState((state) => state.isPaused);
  const gameStarted = useGameState((state) => state.gameStarted);
  const isGameOver = useGameState((state) => state.isGameOver);
  const activeEnding = useGameState((state) => state.activeEnding);

  // Modal states
  const radioTunerOpen = useGameState((state) => state.radioTunerOpen);
  const noteViewerOpen = useGameState((state) => state.noteViewerOpen);
  const choiceModalOpen = useGameState((state) => state.choiceModalOpen);
  const inventoryOpen = useGameState((state) => state.inventoryOpen);
  const investigationBoardOpen = useGameState((state) => state.investigationBoardOpen);
  const cassettePlayerOpen = useGameState((state) => state.cassettePlayerOpen);
  const beaconCalibrationOpen = useGameState((state) => state.beaconCalibrationOpen);

  // Progression Flags
  const currentObjectiveIndex = useGameState((state) => state.currentObjectiveIndex);
  const hasCollectedFuse = useGameState((state) => state.hasCollectedFuse);
  const hasRestoredPower = useGameState((state) => state.hasRestoredPower);
  const generatorDoorUnlocked = useGameState((state) => state.generatorDoorUnlocked);
  const archiveDoorUnlocked = useGameState((state) => state.archiveDoorUnlocked);
  const archiveCabinetUnlocked = useGameState((state) => state.archiveCabinetUnlocked);
  const sleepingQuartersUnlocked = useGameState((state) => state.sleepingQuartersUnlocked);
  const hasFoundArchiveKey = useGameState((state) => state.hasFoundArchiveKey);
  const hasCollectedMapPiece = useGameState((state) => state.hasCollectedMapPiece);
  const hasPlayedTapeA = useGameState((state) => state.hasPlayedTapeA);
  const hasTunedSecondFrequency = useGameState((state) => state.hasTunedSecondFrequency);
  const isBeaconCalibrated = useGameState((state) => state.isBeaconCalibrated);

  // Controls & Settings
  const flashlightOn = useGameState((state) => state.flashlightOn);
  const toggleFlashlight = useGameState((state) => state.toggleFlashlight);
  const virtualMove = useGameState((state) => state.virtualMove);
  const virtualInteractCount = useGameState((state) => state.virtualInteractCount);
  const lookDragDelta = useGameState((state) => state.lookDragDelta);
  const setSector = useGameState((state) => state.setSector);
  const adjustSanity = useGameState((state) => state.adjustSanity);
  const setInteractionPrompt = useGameState((state) => state.setInteractionPrompt);
  const settings = useGameState((state) => state.settings);

  // Actions
  const openRadioTuner = useGameState((state) => state.openRadioTuner);
  const openNoteViewer = useGameState((state) => state.openNoteViewer);
  const collectFuse = useGameState((state) => state.collectFuse);
  const restorePower = useGameState((state) => state.restorePower);
  const unlockArchiveCabinet = useGameState((state) => state.unlockArchiveCabinet);
  const openChoiceModal = useGameState((state) => state.openChoiceModal);
  const openCassettePlayer = useGameState((state) => state.openCassettePlayer);
  const openBeaconCalibration = useGameState((state) => state.openBeaconCalibration);
  const openInventory = useGameState((state) => state.openInventory);
  const openInvestigationBoard = useGameState((state) => state.openInvestigationBoard);
  const collectItem = useGameState((state) => state.collectItem);
  const unlockEvidence = useGameState((state) => state.unlockEvidence);
  const pauseGame = useGameState((state) => state.pauseGame);

  // Player physics state
  const pos = useRef(new THREE.Vector3(0, 1.65, 0));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const yaw = useRef(0);
  const pitch = useRef(0);
  const isLocked = useRef(false);
  const lastInteractCount = useRef(virtualInteractCount);

  // Keys & Audio Timers
  const keys = useRef<{ [key: string]: boolean }>({});
  const lastStepTime = useRef(0);
  const headBobTimer = useRef(0);

  const isModalActive =
    radioTunerOpen ||
    noteViewerOpen ||
    choiceModalOpen ||
    inventoryOpen ||
    investigationBoardOpen ||
    cassettePlayerOpen ||
    beaconCalibrationOpen ||
    !!activeEnding;

  // Keyboard, Pointer Lock & Look
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;

      if (e.code === 'KeyF') {
        toggleFlashlight();
      }

      if (e.code === 'KeyI') {
        if (!isModalActive) openInventory();
      }

      if (e.code === 'KeyB' || e.code === 'Tab') {
        if (e.code === 'Tab') e.preventDefault();
        if (!isModalActive) openInvestigationBoard();
      }

      if (e.code === 'Escape') {
        if (!isModalActive) {
          pauseGame();
        }
      }

      if (e.code === 'KeyE') {
        handleInteraction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isLocked.current || isPaused || isModalActive) return;

      const sens = 0.0022 * settings.mouseSensitivity;
      yaw.current -= e.movementX * sens;
      pitch.current -= e.movementY * sens;
      pitch.current = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, pitch.current));
    };

    const handlePointerLockChange = () => {
      isLocked.current = document.pointerLockElement === gl.domElement;
    };

    const handleCanvasClick = () => {
      if (!isLocked.current && gameStarted && !isPaused && !isModalActive) {
        gl.domElement.requestPointerLock();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    gl.domElement.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      gl.domElement.removeEventListener('click', handleCanvasClick);
    };
  }, [gl, isPaused, gameStarted, isModalActive, settings.mouseSensitivity]);

  // Touch look-drag processing
  useEffect(() => {
    if (lookDragDelta.x !== 0 || lookDragDelta.y !== 0) {
      if (isPaused || isModalActive) return;
      const sens = 0.004 * settings.mouseSensitivity;
      yaw.current -= lookDragDelta.x * sens;
      pitch.current -= lookDragDelta.y * sens;
      pitch.current = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, pitch.current));
    }
  }, [lookDragDelta, isPaused, isModalActive, settings.mouseSensitivity]);

  // Virtual interact trigger
  useEffect(() => {
    if (virtualInteractCount > lastInteractCount.current) {
      lastInteractCount.current = virtualInteractCount;
      handleInteraction();
    }
  }, [virtualInteractCount]);

  // Main interaction handler
  const handleInteraction = () => {
    if (isPaused || isModalActive) return;

    const p = pos.current;

    // 1. Radio Control Console (~ [0, 1.6, -1.6])
    const distToRadio = p.distanceTo(new THREE.Vector3(0, 1.6, -1.6));
    if (distToRadio < 1.8) {
      if (isBeaconCalibrated) {
        openChoiceModal();
      } else if (hasTunedSecondFrequency) {
        openBeaconCalibration();
      } else {
        openRadioTuner();
      }
      return;
    }

    // 2. Maintenance Shift Handover Note (~ [-0.5, 1.6, -1.7])
    const distToMaint = p.distanceTo(new THREE.Vector3(-0.5, 1.6, -1.7));
    if (distToMaint < 1.6) {
      openNoteViewer(MAINTENANCE_NOTE);
      return;
    }

    // 3. Weather Logbook (~ [0.5, 1.6, -1.7])
    const distToLog = p.distanceTo(new THREE.Vector3(0.5, 1.6, -1.7));
    if (distToLog < 1.6) {
      openNoteViewer(WEATHER_LOG);
      return;
    }

    // 4. Observation Deck Supply Cabinet (~ [-3.2, 1.6, 12.8])
    const distToCabinet = p.distanceTo(new THREE.Vector3(-3.2, 1.6, 12.8));
    if (distToCabinet < 1.9) {
      if (!hasCollectedFuse) {
        collectFuse();
      }
      return;
    }

    // 5. Observation Deck Beacon Calibration Console (~ [0, 1.6, 17.5])
    const distToBeaconConsole = p.distanceTo(new THREE.Vector3(0, 1.6, 17.5));
    if (distToBeaconConsole < 2.2) {
      openBeaconCalibration();
      return;
    }

    // 6. Generator Fuse Panel (~ [6.5, 1.6, 7.5])
    const distToGen = p.distanceTo(new THREE.Vector3(6.5, 1.6, 7.5));
    if (distToGen < 1.9) {
      if (hasCollectedFuse && !hasRestoredPower) {
        restorePower();
      }
      return;
    }

    // 7. Archive Room - Central Table Documents (~ [-4.2, 1.6, 5.8])
    const distToArchiveDesk = p.distanceTo(new THREE.Vector3(-4.2, 1.6, 5.8));
    if (distToArchiveDesk < 1.8) {
      if (p.x < -4.4) {
        openNoteViewer(BLACK_TIDE_REPORT);
      } else if (p.x > -4.0) {
        if (!hasCollectedMapPiece) {
          collectItem('torn_station_map');
          unlockEvidence('station_blueprint_grid');
          useGameState.setState({ hasCollectedMapPiece: true });
          useGameState.getState().setObjective(4);
        }
        openNoteViewer(BEACON_CALIBRATION_DOC);
      } else {
        openNoteViewer(NEWSPAPER_CLIPPING);
      }
      return;
    }

    // 8. Archive Room - Reel Tape Recorder (~ [-4.2, 1.6, 5.4])
    const distToTapeRecorder = p.distanceTo(new THREE.Vector3(-4.2, 1.6, 5.4));
    if (distToTapeRecorder < 1.7) {
      if (useGameState.getState().hasItem('cassette_tape_a')) {
        openCassettePlayer('cassette_tape_a');
      } else if (useGameState.getState().hasItem('cassette_tape_b')) {
        openCassettePlayer('cassette_tape_b');
      } else {
        useGameState.getState().showSubtitles("Tape Recorder: Empty. Insert Cassette Tape #1 or #2 to play.", 4000);
      }
      return;
    }

    // 9. Archive Room - Locked Security Cabinet ARCH-02 (~ [-6.7, 1.6, 6.0])
    const distToArchCabinet = p.distanceTo(new THREE.Vector3(-6.7, 1.6, 6.0));
    if (distToArchCabinet < 1.9) {
      if (archiveCabinetUnlocked) {
        if (!useGameState.getState().hasItem('cassette_tape_a')) {
          collectItem('cassette_tape_a');
          useGameState.getState().setObjective(5);
        }
      } else if (useGameState.getState().hasItem('archive_key')) {
        unlockArchiveCabinet();
      } else {
        useGameState.getState().showSubtitles("Cabinet ARCH-02 is locked. Find the key in Sleeping Quarters (Sector SQ-04).", 4500);
      }
      return;
    }

    // 10. Sleeping Quarters - Crew Locker & Photo (~ [-3.2, 1.6, 9.4])
    const distToLockerPhoto = p.distanceTo(new THREE.Vector3(-3.2, 1.6, 9.4));
    if (distToLockerPhoto < 1.8) {
      if (!hasFoundArchiveKey) {
        collectItem('archive_key');
        unlockEvidence('sleeping_quarters_photo');
        useGameState.setState({ hasFoundArchiveKey: true, photoChanged: true });
        useGameState.getState().showSubtitles("Behind the frame: Found Archive Cabinet Key (ARCH-02)!", 5000);
      } else {
        useGameState.getState().showSubtitles("Photo: The faces in the 1986 crew frame seem to shift under the light.", 4000);
      }
      return;
    }

    // 11. Sleeping Quarters - Operator's Desk & Diary (~ [-4.2, 1.6, 13.0])
    const distToDiaryDesk = p.distanceTo(new THREE.Vector3(-4.2, 1.6, 13.0));
    if (distToDiaryDesk < 1.8) {
      if (p.x > -3.9 && !useGameState.getState().hasItem('cassette_tape_b')) {
        collectItem('cassette_tape_b');
      } else {
        openNoteViewer(ELI_DIARY_NOTE);
      }
      return;
    }
  };

  // Main game loop (Movement & Collisions)
  useFrame((_, delta) => {
    if (!gameStarted || isPaused || isGameOver || isModalActive) return;

    const dt = Math.min(delta, 0.05);
    const p = pos.current;

    // --- SECTOR DETERMINATION ---
    if (p.x < -0.9) {
      if (p.z <= 8.5) {
        setSector('ARCHIVE_ROOM');
      } else {
        setSector('SLEEPING_QUARTERS');
      }
    } else if (p.x > 0.9 && p.z > 3.0 && p.z <= 12.0) {
      setSector('GENERATOR_ROOM');
    } else if (p.z <= 3.0) {
      setSector('RADIO_ROOM');
    } else if (p.z > 12.0) {
      setSector('OBSERVATION_DECK');
      if (!flashlightOn) {
        adjustSanity(-12 * dt);
      } else {
        adjustSanity(2 * dt);
      }
    } else {
      setSector('HALLWAY');
    }

    // Movement Vectors
    const forward = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current));
    const right = new THREE.Vector3(Math.cos(yaw.current), 0, -Math.sin(yaw.current));

    const moveDir = new THREE.Vector3(0, 0, 0);
    if (keys.current['KeyW'] || keys.current['ArrowUp'] || virtualMove.forward) moveDir.add(forward);
    if (keys.current['KeyS'] || keys.current['ArrowDown'] || virtualMove.backward) moveDir.sub(forward);
    if (keys.current['KeyD'] || keys.current['ArrowRight'] || virtualMove.right) moveDir.add(right);
    if (keys.current['KeyA'] || keys.current['ArrowLeft'] || virtualMove.left) moveDir.sub(right);

    const isMoving = moveDir.lengthSq() > 0.01;
    const isSprinting = keys.current['ShiftLeft'] || keys.current['ShiftRight'] || virtualMove.sprint;
    const speed = isSprinting ? 4.2 : 2.6;

    if (isMoving) {
      moveDir.normalize();
      velocity.current.copy(moveDir.multiplyScalar(speed));

      headBobTimer.current += dt * (isSprinting ? 14 : 9);
      const isOutside = pos.current.z > 12;

      const now = performance.now();
      const stepInterval = isSprinting ? 320 : 500;
      if (now - lastStepTime.current > stepInterval) {
        soundEngine.playFootstep(isOutside);
        lastStepTime.current = now;
      }
    } else {
      velocity.current.set(0, 0, 0);
    }

    const nextX = pos.current.x + velocity.current.x * dt;
    const nextZ = pos.current.z + velocity.current.z * dt;

    // --- EXPANDED 6-ROOM COLLISION CONSTRAINTS ---
    const checkBounds = (x: number, z: number) => {
      // 1. Radio Control Room (X: [-2.6, 2.6], Z: [-2.6, 3.0])
      if (z >= -2.6 && z <= 3.0) {
        if (x < -2.6 || x > 2.6) return false;
        if (x >= -1.8 && x <= 1.8 && z < -1.3) return false; // Desk collider
        return true;
      }

      // 2. Main Connecting Hallway (X: [-0.9, 0.9], Z: [3.0, 12.0])
      if (x >= -0.9 && x <= 0.9 && z > 3.0 && z <= 12.0) {
        return true;
      }

      // 3. Auxiliary Generator Room (X: [0.9, 6.8], Z: [4.8, 10.2])
      if (x > 0.9 && x <= 6.8 && z >= 4.8 && z <= 10.2) {
        if (!generatorDoorUnlocked && x > 1.1) return false;
        // Engine block obstacle
        if (x >= 3.4 && x <= 5.6 && z >= 6.4 && z <= 8.6) return false;
        return true;
      }

      // 4. Archive Room (X: [-6.8, -0.9], Z: [3.8, 8.2])
      if (x >= -6.8 && x < -0.9 && z >= 3.8 && z <= 8.2) {
        if (!archiveDoorUnlocked && x < -1.1) return false;
        // Central investigation table
        if (x >= -5.2 && x <= -3.2 && z >= 5.0 && z <= 6.6) return false;
        return true;
      }

      // 5. Sleeping Quarters (X: [-6.8, -0.9], Z: [9.0, 13.5])
      if (x >= -6.8 && x < -0.9 && z >= 9.0 && z <= 13.5) {
        if (!sleepingQuartersUnlocked && x < -1.1) return false;
        // Bunk bed obstacle
        if (x <= -4.8 && z <= 10.8) return false;
        // Desk obstacle
        if (x >= -5.2 && x <= -3.2 && z >= 12.4) return false;
        return true;
      }

      // 6. Observation Deck (X: [-3.6, 3.6], Z: [12.0, 19.4])
      if (z > 12.0 && z <= 19.4) {
        if (x < -3.6 || x > 3.6) return false;
        return true;
      }

      return false;
    };

    if (checkBounds(nextX, pos.current.z)) {
      pos.current.x = nextX;
    }
    if (checkBounds(pos.current.x, nextZ)) {
      pos.current.z = nextZ;
    }

    // Camera Head Bob
    const bobOffset = isMoving ? Math.sin(headBobTimer.current) * 0.04 : 0;
    camera.position.set(pos.current.x, pos.current.y + bobOffset, pos.current.z);

    // Apply Camera Rotation
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.x = pitch.current;
    euler.y = yaw.current;
    camera.quaternion.setFromEuler(euler);

    // --- PROXIMITY INTERACTION DETECTION & DYNAMIC PROMPTS ---
    const currPos = pos.current;
    let prompt: string | null = null;

    const distToRadio = currPos.distanceTo(new THREE.Vector3(0, 1.6, -1.6));
    const distToMaint = currPos.distanceTo(new THREE.Vector3(-0.5, 1.6, -1.7));
    const distToLog = currPos.distanceTo(new THREE.Vector3(0.5, 1.6, -1.7));
    const distToCabinet = currPos.distanceTo(new THREE.Vector3(-3.2, 1.6, 12.8));
    const distToBeaconConsole = currPos.distanceTo(new THREE.Vector3(0, 1.6, 17.5));
    const distToGen = currPos.distanceTo(new THREE.Vector3(6.5, 1.6, 7.5));
    const distToArchiveDesk = currPos.distanceTo(new THREE.Vector3(-4.2, 1.6, 5.8));
    const distToTapeRecorder = currPos.distanceTo(new THREE.Vector3(-4.2, 1.6, 5.4));
    const distToArchCabinet = currPos.distanceTo(new THREE.Vector3(-6.7, 1.6, 6.0));
    const distToLockerPhoto = currPos.distanceTo(new THREE.Vector3(-3.2, 1.6, 9.4));
    const distToDiaryDesk = currPos.distanceTo(new THREE.Vector3(-4.2, 1.6, 13.0));

    if (distToRadio < 1.8) {
      if (isBeaconCalibrated) {
        prompt = "Press [E] to Make Decision on Signal 13";
      } else if (hasTunedSecondFrequency) {
        prompt = "Press [E] to Calibrate Emergency Beacon";
      } else {
        prompt = currentObjectiveIndex === 0
          ? "Press [E] to Inspect Radio Console"
          : "Press [E] to Tune HF Transceiver";
      }
    } else if (distToMaint < 1.6) {
      prompt = "Press [E] to Read Shift Handover Note";
    } else if (distToLog < 1.6) {
      prompt = "Press [E] to Read Station Weather Log";
    } else if (distToCabinet < 1.9) {
      prompt = hasCollectedFuse
        ? "Supply Locker (Empty)"
        : "Press [E] to Take 200A Ceramic Emergency Fuse";
    } else if (distToGen < 1.9) {
      if (hasRestoredPower) {
        prompt = "Auxiliary Generator Online (Operational)";
      } else if (hasCollectedFuse) {
        prompt = "Press [E] to Insert Fuse & Restore Auxiliary Power";
      } else {
        prompt = "Generator Breaker (Requires 200A Ceramic Fuse)";
      }
    } else if (distToBeaconConsole < 2.2) {
      prompt = isBeaconCalibrated
        ? "Beacon Calibrated (Resonance 100%)"
        : "Press [E] to Calibrate Beacon Optical Relay";
    } else if (distToTapeRecorder < 1.7) {
      prompt = "Press [E] to Use Archive Tape Deck";
    } else if (distToArchiveDesk < 1.8) {
      prompt = !hasCollectedMapPiece
        ? "Press [E] to Inspect Blueprint & Incident Records"
        : "Press [E] to Read Black Tide Incident File";
    } else if (distToArchCabinet < 1.9) {
      if (archiveCabinetUnlocked) {
        prompt = useGameState.getState().hasItem('cassette_tape_a')
          ? "Cabinet ARCH-02 (Empty)"
          : "Press [E] to Take Cassette Tape #1";
      } else {
        prompt = useGameState.getState().hasItem('archive_key')
          ? "Press [E] to Unlock Cabinet ARCH-02 with Key"
          : "Cabinet ARCH-02 (Locked - Key in Sector SQ-04)";
      }
    } else if (distToLockerPhoto < 1.8) {
      prompt = !hasFoundArchiveKey
        ? "Press [E] to Inspect Crew Photograph (Retrieve Key)"
        : "Crew Photograph (Eli Navarro 1986)";
    } else if (distToDiaryDesk < 1.8) {
      prompt = !useGameState.getState().hasItem('cassette_tape_b')
        ? "Press [E] to Take Cassette #2 & Read Operator's Diary"
        : "Press [E] to Read Operator's Diary";
    }

    setInteractionPrompt(prompt);
  });

  return (
    <group>
      {/* Player Flashlight with Realistic Spot Cone */}
      {flashlightOn && (
        <group position={[camera.position.x, camera.position.y, camera.position.z]}>
          <spotLight
            position={[0, 0, 0]}
            target={camera}
            color="#FFFBEB"
            intensity={1.6}
            angle={Math.PI / 4.5}
            penumbra={0.6}
            distance={15}
            castShadow
          />
        </group>
      )}
    </group>
  );
}
