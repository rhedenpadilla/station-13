import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';
import { soundEngine } from '../audio/SoundEngine';
import { MAINTENANCE_NOTE, WEATHER_LOG } from '../constants/gameData';

export function PlayerController() {
  const { camera, gl } = useThree();

  const isPaused = useGameState((state) => state.isPaused);
  const gameStarted = useGameState((state) => state.gameStarted);
  const isGameOver = useGameState((state) => state.isGameOver);
  const activeEnding = useGameState((state) => state.activeEnding);
  const radioTunerOpen = useGameState((state) => state.radioTunerOpen);
  const noteViewerOpen = useGameState((state) => state.noteViewerOpen);
  const choiceModalOpen = useGameState((state) => state.choiceModalOpen);

  const currentObjectiveIndex = useGameState((state) => state.currentObjectiveIndex);
  const hasCollectedFuse = useGameState((state) => state.hasCollectedFuse);
  const hasRestoredPower = useGameState((state) => state.hasRestoredPower);
  const generatorDoorUnlocked = useGameState((state) => state.generatorDoorUnlocked);
  const flashlightOn = useGameState((state) => state.flashlightOn);
  const toggleFlashlight = useGameState((state) => state.toggleFlashlight);

  const virtualMove = useGameState((state) => state.virtualMove);
  const virtualInteractCount = useGameState((state) => state.virtualInteractCount);
  const setSector = useGameState((state) => state.setSector);
  const adjustSanity = useGameState((state) => state.adjustSanity);

  const setInteractionPrompt = useGameState((state) => state.setInteractionPrompt);
  const openRadioTuner = useGameState((state) => state.openRadioTuner);
  const openNoteViewer = useGameState((state) => state.openNoteViewer);
  const collectFuse = useGameState((state) => state.collectFuse);
  const restorePower = useGameState((state) => state.restorePower);
  const openChoiceModal = useGameState((state) => state.openChoiceModal);
  const pauseGame = useGameState((state) => state.pauseGame);

  // Player state
  const pos = useRef(new THREE.Vector3(0, 1.65, 0));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const yaw = useRef(0);
  const pitch = useRef(0);
  const isLocked = useRef(false);
  const lastInteractCount = useRef(virtualInteractCount);

  // Key tracking
  const keys = useRef<{ [key: string]: boolean }>({});
  const lastStepTime = useRef(0);
  const headBobTimer = useRef(0);

  // Setup Pointer Lock & Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;

      if (e.code === 'KeyF') {
        toggleFlashlight();
      }

      if (e.code === 'Escape') {
        if (!radioTunerOpen && !noteViewerOpen && !choiceModalOpen && !activeEnding) {
          pauseGame();
        }
      }

      // Interaction trigger
      if (e.code === 'KeyE') {
        handleInteraction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isLocked.current || isPaused || radioTunerOpen || noteViewerOpen || choiceModalOpen || !!activeEnding) return;

      const sensitivity = 0.0022;
      yaw.current -= e.movementX * sensitivity;
      pitch.current -= e.movementY * sensitivity;
      pitch.current = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, pitch.current));
    };

    const handlePointerLockChange = () => {
      isLocked.current = document.pointerLockElement === gl.domElement;
    };

    const handleCanvasClick = () => {
      if (!isLocked.current && gameStarted && !isPaused && !radioTunerOpen && !noteViewerOpen && !choiceModalOpen && !activeEnding) {
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
  }, [gl, isPaused, gameStarted, radioTunerOpen, noteViewerOpen, choiceModalOpen, activeEnding]);

  // Handle active interaction
  const handleInteraction = () => {
    if (isPaused || radioTunerOpen || noteViewerOpen || choiceModalOpen || !!activeEnding) return;

    const p = pos.current;

    // 1. Radio Console Interaction (Center Back of Radio Room, ~ [0, 1.2, -2.2])
    const distToRadio = p.distanceTo(new THREE.Vector3(0, 1.6, -1.6));
    if (distToRadio < 1.7) {
      if (hasRestoredPower) {
        openChoiceModal();
      } else {
        openRadioTuner();
      }
      return;
    }

    // 2. Maintenance Note (Left desk, ~ [-0.5, 1.0, -1.9])
    const distToNote = p.distanceTo(new THREE.Vector3(-0.5, 1.6, -1.7));
    if (distToNote < 1.6) {
      openNoteViewer(MAINTENANCE_NOTE);
      return;
    }

    // 3. Weather Logbook (Right desk, ~ [0.5, 1.0, -1.9])
    const distToLog = p.distanceTo(new THREE.Vector3(0.5, 1.6, -1.7));
    if (distToLog < 1.6) {
      openNoteViewer(WEATHER_LOG);
      return;
    }

    // 4. Supply Cabinet (Observation deck, ~ [-3.6, 1.5, 12.8])
    const distToCabinet = p.distanceTo(new THREE.Vector3(-3.2, 1.6, 12.8));
    if (distToCabinet < 1.9) {
      if (!hasCollectedFuse) {
        collectFuse();
      }
      return;
    }

    // 5. Generator Fuse Panel (Generator room east wall, ~ [7.05, 1.6, 7.5])
    const distToGenerator = p.distanceTo(new THREE.Vector3(6.5, 1.6, 7.5));
    if (distToGenerator < 1.9) {
      if (hasCollectedFuse && !hasRestoredPower) {
        restorePower();
      }
      return;
    }
  };

  // Handle virtual interact trigger
  useEffect(() => {
    if (virtualInteractCount > lastInteractCount.current) {
      lastInteractCount.current = virtualInteractCount;
      handleInteraction();
    }
  }, [virtualInteractCount]);

  // Main game loop (Movement & Collisions)
  useFrame((_, delta) => {
    if (!gameStarted || isPaused || isGameOver || radioTunerOpen || noteViewerOpen || choiceModalOpen || !!activeEnding) {
      return;
    }

    const dt = Math.min(delta, 0.05);

    // Determine current sector from coordinates
    const p = pos.current;
    if (p.z <= 3.0) {
      setSector('RADIO_ROOM');
    } else if (p.z > 3.0 && p.z <= 12.0) {
      if (p.x > 1.2) {
        setSector('GENERATOR_ROOM');
      } else {
        setSector('HALLWAY');
      }
    } else {
      setSector('OBSERVATION_DECK');
      // Outside in heavy storm sanity drain if flashlight is off
      if (!flashlightOn) {
        adjustSanity(-12 * dt);
      } else {
        adjustSanity(2 * dt);
      }
    }

    // Movement direction
    const forward = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current));
    const right = new THREE.Vector3(Math.cos(yaw.current), 0, -Math.sin(yaw.current));

    const moveDir = new THREE.Vector3(0, 0, 0);
    // Combine physical keyboard & on-screen virtual directional buttons
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

      // Footstep sound & Head bob
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

    // New candidate position
    const nextX = pos.current.x + velocity.current.x * dt;
    const nextZ = pos.current.z + velocity.current.z * dt;

    // --- STATION COLLISION CONSTRAINTS ---
    // Radio Control Room: X in [-2.6, 2.6], Z in [-2.6, 3.0]
    // Desk obstacle: X in [-1.8, 1.8], Z < -1.4
    // Hallway: X in [-0.9, 0.9], Z in [3.0, 12.0]
    // Generator Room: X in [1.0, 6.8], Z in [4.8, 10.2] (accessible only if unlocked or Z between 6.5 & 8.5)
    // Observation Deck: X in [-3.6, 3.6], Z in [12.0, 19.4]

    let validX = true;
    let validZ = true;

    const checkBounds = (x: number, z: number) => {
      // 1. Radio Control Room
      if (z >= -2.6 && z <= 3.0) {
        if (x < -2.6 || x > 2.6) return false;
        // Desk collider
        if (x >= -1.8 && x <= 1.8 && z < -1.3) return false;
        return true;
      }

      // 2. Hallway
      if (z > 3.0 && z <= 12.0) {
        if (x >= -0.9 && x <= 0.9) return true;
        // Passage into Generator Room at Z in [6.5, 8.5]
        if (x > 0.9 && x <= 6.8 && z >= 4.8 && z <= 10.2) {
          if (!generatorDoorUnlocked && x > 1.1) return false; // Door locked
          return true;
        }
        return false;
      }

      // 3. Observation Deck
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

    // --- PROXIMITY INTERACTION DETECTION ---
    const currPos = pos.current;
    let prompt: string | null = null;

    const distToRadio = currPos.distanceTo(new THREE.Vector3(0, 1.6, -1.6));
    const distToNote = currPos.distanceTo(new THREE.Vector3(-0.5, 1.6, -1.7));
    const distToLog = currPos.distanceTo(new THREE.Vector3(0.5, 1.6, -1.7));
    const distToCabinet = currPos.distanceTo(new THREE.Vector3(-3.2, 1.6, 12.8));
    const distToGenerator = currPos.distanceTo(new THREE.Vector3(6.5, 1.6, 7.5));
    const distToDoor = currPos.distanceTo(new THREE.Vector3(1.1, 1.6, 7.5));

    if (distToRadio < 1.7) {
      if (hasRestoredPower) {
        prompt = "Press [E] to Make Decision on Signal 13";
      } else {
        prompt = currentObjectiveIndex === 0
          ? "Press [E] to Inspect Radio Console"
          : "Press [E] to Tune Radio Frequency";
      }
    } else if (distToNote < 1.6) {
      prompt = "Press [E] to Read Shift Handover Note";
    } else if (distToLog < 1.6) {
      prompt = "Press [E] to Read Station Weather Log";
    } else if (distToCabinet < 1.9) {
      prompt = hasCollectedFuse
        ? "Supply Cabinet (Empty)"
        : "Press [E] to Take 200A Emergency Fuse";
    } else if (distToGenerator < 1.9) {
      if (hasRestoredPower) {
        prompt = "Generator Circuit Active (Operational)";
      } else if (hasCollectedFuse) {
        prompt = "Press [E] to Insert Fuse & Restore Beacon Power";
      } else {
        prompt = "Generator Fuse Panel (Empty Socket - Requires 200A Ceramic Fuse)";
      }
    } else if (distToDoor < 1.6 && !generatorDoorUnlocked) {
      prompt = "Auxiliary Generator Door (Electronic Lock Engaged)";
    }

    setInteractionPrompt(prompt);
  });

  return (
    <group>
      {/* Player Flashlight attached to camera */}
      {flashlightOn && (
        <group position={[camera.position.x, camera.position.y, camera.position.z]}>
          <spotLight
            position={[0, 0, 0]}
            target={camera}
            color="#FFFBEB"
            intensity={1.6}
            angle={Math.PI / 4.5}
            penumbra={0.6}
            distance={14}
            castShadow
          />
        </group>
      )}
    </group>
  );
}
