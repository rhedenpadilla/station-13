import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';

export function ArchiveRoom() {
  const archiveCabinetUnlocked = useGameState((state) => state.archiveCabinetUnlocked);
  const wetFootprintsVisible = useGameState((state) => state.wetFootprintsVisible);
  const hasRestoredPower = useGameState((state) => state.hasRestoredPower);
  const cassettePlayerOpen = useGameState((state) => state.cassettePlayerOpen);

  const fluoroLightRef = useRef<THREE.PointLight>(null);
  const emergencyLightRef = useRef<THREE.PointLight>(null);
  const tapeSpoolRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Overhead fluorescent flicker
    if (fluoroLightRef.current) {
      if (!hasRestoredPower) {
        fluoroLightRef.current.intensity = 0.2 + Math.sin(t * 12) * Math.cos(t * 17) * 0.2;
      } else {
        fluoroLightRef.current.intensity = 1.4 + Math.sin(t * 25) * 0.08;
      }
    }

    // Red emergency backup pulse
    if (emergencyLightRef.current) {
      emergencyLightRef.current.intensity = 0.6 + Math.sin(t * 3) * 0.3;
    }

    // Tape spool rotation if tape player is open
    if (tapeSpoolRef.current && cassettePlayerOpen) {
      tapeSpoolRef.current.rotation.y = t * 4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* --- ARCHIVE ROOM GEOMETRY (X: -7.2 to -1.2, Z: 3.5 to 8.5, Height: 3.5m) --- */}
      {/* Center is at X = -4.2, Z = 6.0 */}

      {/* Floor */}
      <mesh position={[-4.2, 0, 6.0]} receiveShadow>
        <boxGeometry args={[6.0, 0.2, 5.0]} />
        <meshStandardMaterial color="#0B132B" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[-4.2, 3.5, 6.0]}>
        <boxGeometry args={[6.0, 0.2, 5.0]} />
        <meshStandardMaterial color="#07111F" roughness={0.9} />
      </mesh>

      {/* West Outer Wall (X = -7.2) */}
      <mesh position={[-7.2, 1.75, 6.0]} receiveShadow>
        <boxGeometry args={[0.2, 3.5, 5.0]} />
        <meshStandardMaterial color="#1C2541" roughness={0.8} />
      </mesh>

      {/* North Wall (Z = 3.5) */}
      <mesh position={[-4.2, 1.75, 3.5]} receiveShadow>
        <boxGeometry args={[6.0, 3.5, 0.2]} />
        <meshStandardMaterial color="#1C2541" roughness={0.8} />
      </mesh>

      {/* South Wall (Z = 8.5) */}
      <mesh position={[-4.2, 1.75, 8.5]} receiveShadow>
        <boxGeometry args={[6.0, 3.5, 0.2]} />
        <meshStandardMaterial color="#1C2541" roughness={0.8} />
      </mesh>

      {/* East Wall with doorway to Hallway at Z = 6.0 */}
      <group position={[-1.2, 1.75, 6.0]}>
        {/* North segment (Z: 3.5 to 5.0) */}
        <mesh position={[0, 0, -1.75]} receiveShadow>
          <boxGeometry args={[0.2, 3.5, 1.5]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* South segment (Z: 7.0 to 8.5) */}
        <mesh position={[0, 0, 1.75]} receiveShadow>
          <boxGeometry args={[0.2, 3.5, 1.5]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* Door Header */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[0.2, 1.0, 2.0]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
      </group>

      {/* --- OVERHEAD LIGHT FIXTURES --- */}
      {/* Cold Blue-Gray Fluorescent Light */}
      <group position={[-4.2, 3.35, 6.0]}>
        <mesh>
          <boxGeometry args={[1.6, 0.08, 0.3]} />
          <meshStandardMaterial color="#334155" metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.4, 12]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        <pointLight
          ref={fluoroLightRef}
          position={[0, -0.2, 0]}
          color="#38BDF8"
          intensity={1.2}
          distance={7.0}
          castShadow
        />
      </group>

      {/* Emergency Red Backup Light (Corner) */}
      <group position={[-6.9, 3.0, 3.8]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#D94141" />
        </mesh>
        <pointLight
          ref={emergencyLightRef}
          position={[0, -0.1, 0]}
          color="#D94141"
          intensity={0.8}
          distance={4.0}
        />
      </group>

      {/* --- CENTRAL INVESTIGATION DESK (X = -4.2, Z = 5.8) --- */}
      <group position={[-4.2, 0, 5.8]}>
        {/* Table Top */}
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.08, 1.2]} />
          <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.4} />
        </mesh>
        {/* Desk Legs */}
        <mesh position={[-0.95, 0.42, -0.45]}>
          <boxGeometry args={[0.08, 0.84, 0.08]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        <mesh position={[0.95, 0.42, -0.45]}>
          <boxGeometry args={[0.08, 0.84, 0.08]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        <mesh position={[-0.95, 0.42, 0.45]}>
          <boxGeometry args={[0.08, 0.84, 0.08]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        <mesh position={[0.95, 0.42, 0.45]}>
          <boxGeometry args={[0.08, 0.84, 0.08]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>

        {/* --- DESK ITEMS --- */}
        {/* 1. Black Tide Official Incident Document (Left) */}
        <group position={[-0.6, 0.9, -0.1]} rotation={[-Math.PI / 2, 0, 0.1]}>
          <mesh>
            <planeGeometry args={[0.3, 0.4]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.8} />
          </mesh>
          <Text position={[0, 0.12, 0.005]} fontSize={0.024} color="#0F172A">
            BLACK TIDE INQUIRY
          </Text>
          <Text position={[0, -0.02, 0.005]} fontSize={0.016} color="#475569" maxWidth={0.26}>
            S.S. Calypso incident report 1986. Signal logs dismissed.
          </Text>
        </group>

        {/* 2. Newspaper Clipping (Center) */}
        <group position={[0.0, 0.9, 0.15]} rotation={[-Math.PI / 2, 0, -0.08]}>
          <mesh>
            <planeGeometry args={[0.35, 0.25]} />
            <meshStandardMaterial color="#F1F5F9" roughness={0.9} />
          </mesh>
          <Text position={[0, 0.06, 0.005]} fontSize={0.022} color="#0F172A">
            COASTAL HERALD '86
          </Text>
          <Text position={[0, -0.04, 0.005]} fontSize={0.015} color="#334155" maxWidth={0.3}>
            'Lost in Dead Sector: 400ft cargo carrier vanishes off Station 13'
          </Text>
        </group>

        {/* 3. Torn Blueprint Grid Note (Right) */}
        <group position={[0.6, 0.9, -0.1]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <mesh>
            <planeGeometry args={[0.26, 0.32]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
          </mesh>
          <Text position={[0, 0.08, 0.005]} fontSize={0.02} color="#1E3A8A">
            SECTOR SQ-04 MAP
          </Text>
          <Text position={[0, -0.02, 0.005]} fontSize={0.014} color="#0F172A" maxWidth={0.22}>
            Bunk Room photo holds spare cabinet key.
          </Text>
        </group>

        {/* --- VINTAGE REEL-TO-REEL TAPE RECORDER (Mounted on Desk Rear) --- */}
        <group position={[0, 1.02, -0.3]}>
          {/* Deck Chassis */}
          <mesh castShadow>
            <boxGeometry args={[0.7, 0.2, 0.4]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Deck Faceplate */}
          <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.66, 0.36]} />
            <meshStandardMaterial color="#0F172A" metalness={0.5} roughness={0.3} />
          </mesh>

          {/* Left Reel Spool */}
          <group ref={tapeSpoolRef} position={[-0.18, 0.13, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.02, 16]} />
              <meshStandardMaterial color="#94A3B8" metalness={0.9} />
            </mesh>
          </group>

          {/* Right Reel Spool */}
          <group position={[0.18, 0.13, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.02, 16]} />
              <meshStandardMaterial color="#94A3B8" metalness={0.9} />
            </mesh>
          </group>

          {/* Tape Deck Label */}
          <Text position={[0, 0.12, 0.12]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.03} color="#39D9E6">
            ARCHIVE REEL DECK - MODEL 86
          </Text>

          {/* Status Indicator LED */}
          <mesh position={[0.26, 0.12, 0.12]}>
            <circleGeometry args={[0.015, 16]} />
            <meshBasicMaterial color={cassettePlayerOpen ? '#63D471' : '#F5B960'} />
          </mesh>
        </group>
      </group>

      {/* --- LOCKED STEEL SECURITY CABINET ARCH-02 (Mounted on West Wall, X = -7.05, Z = 6.0) --- */}
      <group position={[-7.05, 1.4, 6.0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Cabinet Housing */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.0, 1.8, 0.4]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Cabinet Door */}
        <mesh
          position={[archiveCabinetUnlocked ? -0.45 : 0, 0, 0.21]}
          rotation={[0, archiveCabinetUnlocked ? -Math.PI / 1.6 : 0, 0]}
        >
          <boxGeometry args={[0.95, 1.75, 0.04]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* Lock Stencil & Plate */}
        <Text position={[0, 0.6, 0.24]} fontSize={0.06} color="#F5B960">
          CABINET ARCH-02
        </Text>
        <Text position={[0, 0.45, 0.24]} fontSize={0.035} color={archiveCabinetUnlocked ? '#63D471' : '#D94141'}>
          {archiveCabinetUnlocked ? '[ UNLOCKED ]' : '[ LOCKED - KEY REQUIRED ]'}
        </Text>

        {/* Inside Content: Cassette Tape #1 if unlocked */}
        {archiveCabinetUnlocked && (
          <group position={[0, 0.1, 0.05]}>
            {/* Cassette Tape Chassis */}
            <mesh castShadow>
              <boxGeometry args={[0.22, 0.14, 0.03]} />
              <meshStandardMaterial color="#0F172A" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.016]}>
              <planeGeometry args={[0.18, 0.08]} />
              <meshStandardMaterial color="#DC2626" />
            </mesh>
            <Text position={[0, 0, 0.02]} fontSize={0.02} color="#FFFFFF">
              TAPE #1: 1986 LOG
            </Text>
          </group>
        )}
      </group>

      {/* --- METAL FILING CABINETS (North Wall, Z = 3.8) --- */}
      <group position={[-5.8, 1.0, 3.8]}>
        {[0, 0.9, 1.8].map((xOffset, idx) => (
          <group key={idx} position={[xOffset, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.7, 1.4, 0.6]} />
              <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.5} />
            </mesh>
            {/* Drawers */}
            {[-0.4, 0, 0.4].map((yOffset, dIdx) => (
              <mesh key={dIdx} position={[0, yOffset, 0.31]}>
                <boxGeometry args={[0.6, 0.3, 0.02]} />
                <meshStandardMaterial color="#1E293B" metalness={0.8} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* --- WALL-MOUNTED STATION BLUEPRINT MAP (South Wall, Z = 8.38) --- */}
      <group position={[-4.2, 2.0, 8.38]} rotation={[0, Math.PI, 0]}>
        <mesh>
          <planeGeometry args={[2.2, 1.4]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.6} />
        </mesh>
        <Text position={[0, 0.5, 0.01]} fontSize={0.06} color="#38BDF8">
          STATION 13 ARCHITECTURAL BLUEPRINT
        </Text>
        <Text position={[0, 0.1, 0.01]} fontSize={0.035} color="#93C5FD" maxWidth={2.0}>
          Sector A: Radio Room | Sector B: Aux Generator | Sector C: Archive | Sector D: Bunk Quarters
        </Text>
        <Text position={[0, -0.3, 0.01]} fontSize={0.03} color="#F5B960">
          Grid SQ-04: Sleeping Quarters Emergency Locker
        </Text>
      </group>

      {/* --- WET MYSTERIOUS FOOTPRINTS ON FLOOR --- */}
      {wetFootprintsVisible && (
        <group position={[-3.0, 0.11, 6.0]}>
          {[-0.8, -0.4, 0.0, 0.4, 0.8].map((offset, i) => (
            <mesh
              key={i}
              position={[offset, 0, (i % 2 === 0 ? 0.15 : -0.15)]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            >
              <planeGeometry args={[0.12, 0.28]} />
              <meshStandardMaterial
                color="#050B14"
                roughness={0.1}
                metalness={0.8}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
