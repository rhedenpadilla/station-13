import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';

export function SleepingQuarters() {
  const hasFoundArchiveKey = useGameState((state) => state.hasFoundArchiveKey);
  const photoChanged = useGameState((state) => state.photoChanged);
  const sleepingQuartersClockGlitched = useGameState((state) => state.sleepingQuartersClockGlitched);

  const deskLampRef = useRef<THREE.PointLight>(null);
  const clockJitterRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Subtle warm desk lamp pulse
    if (deskLampRef.current) {
      deskLampRef.current.intensity = 1.6 + Math.sin(t * 2) * 0.1;
    }

    // Jittering clock second hand stuck at 01:13
    if (clockJitterRef.current) {
      clockJitterRef.current.rotation.z = Math.PI * 0.4 + Math.sin(t * 9) * 0.06;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* --- SLEEPING QUARTERS GEOMETRY (X: -7.2 to -1.2, Z: 8.8 to 13.8, Height: 3.5m) --- */}
      {/* Center is at X = -4.2, Z = 11.3 */}

      {/* Floor */}
      <mesh position={[-4.2, 0, 11.3]} receiveShadow>
        <boxGeometry args={[6.0, 0.2, 5.0]} />
        <meshStandardMaterial color="#0F172A" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[-4.2, 3.5, 11.3]}>
        <boxGeometry args={[6.0, 0.2, 5.0]} />
        <meshStandardMaterial color="#07111F" roughness={0.9} />
      </mesh>

      {/* West Outer Wall with Window (X = -7.2) */}
      <group position={[-7.2, 1.75, 11.3]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.2, 3.5, 5.0]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* Rain Window overlooking storm */}
        <mesh position={[0.11, 0.2, 0]}>
          <planeGeometry args={[1.8, 1.4]} />
          <meshPhysicalMaterial
            color="#07111F"
            roughness={0.1}
            transmission={0.8}
            thickness={0.4}
            transparent
            opacity={0.75}
          />
        </mesh>
      </group>

      {/* North Wall (Separating from Archive Room, Z = 8.8) */}
      <mesh position={[-4.2, 1.75, 8.8]} receiveShadow>
        <boxGeometry args={[6.0, 3.5, 0.2]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* South Wall (Z = 13.8) */}
      <mesh position={[-4.2, 1.75, 13.8]} receiveShadow>
        <boxGeometry args={[6.0, 3.5, 0.2]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* East Wall with doorway to Hallway at Z = 10.5 */}
      <group position={[-1.2, 1.75, 11.3]}>
        {/* North segment (Z: 8.8 to 9.5) */}
        <mesh position={[0, 0, -1.75]} receiveShadow>
          <boxGeometry args={[0.2, 3.5, 1.5]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* South segment (Z: 11.5 to 13.8) */}
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

      {/* --- BUNK BED (North Wall, X = -5.6, Z = 9.4) --- */}
      <group position={[-5.6, 0, 9.4]}>
        {/* Bed Metal Frame */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 2.0, 2.4]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} wireframe />
        </mesh>

        {/* Lower Mattress */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.3, 2.2]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
        {/* Blanket */}
        <mesh position={[0, 0.55, 0.3]}>
          <boxGeometry args={[1.22, 0.22, 1.4]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.8} />
        </mesh>
        {/* Pillow */}
        <mesh position={[0, 0.7, -0.8]}>
          <boxGeometry args={[0.8, 0.15, 0.4]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
        </mesh>

        {/* Upper Mattress */}
        <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.3, 2.2]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
      </group>

      {/* --- STEEL CREW LOCKER WITH KEY PUZZLE (North Wall, X = -3.2, Z = 9.1) --- */}
      <group position={[-3.2, 1.2, 9.1]}>
        {/* Locker Unit */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 2.2, 0.5]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.4} />
        </mesh>
        <Text position={[0, 0.9, 0.26]} fontSize={0.055} color="#F5B960">
          SECTOR SQ-04 LOCKERS
        </Text>

        {/* Hidden Key Compartment behind Photo */}
        <group position={[0, 0.2, 0.26]}>
          {/* Framed Photograph */}
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.5, 0.03]} />
            <meshStandardMaterial color="#0F172A" metalness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.34, 0.44]} />
            <meshStandardMaterial color={photoChanged ? '#0F172A' : '#64748B'} />
          </mesh>
          <Text position={[0, 0.05, 0.025]} fontSize={0.03} color={photoChanged ? '#D94141' : '#F8FAFC'}>
            {photoChanged ? 'ELI NAVARRO (1986)' : 'STATION CREW (1986)'}
          </Text>
          <Text position={[0, -0.1, 0.025]} fontSize={0.018} color="#94A3B8">
            [ Behind Frame: ARCH-02 Key ]
          </Text>

          {/* Key Item if not collected */}
          {!hasFoundArchiveKey && (
            <group position={[0, -0.32, 0.04]}>
              <mesh rotation={[0, 0, Math.PI / 4]}>
                <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
                <meshStandardMaterial color="#F5B960" metalness={0.9} roughness={0.2} />
              </mesh>
              <pointLight position={[0, 0, 0.08]} color="#F5B960" intensity={0.6} distance={1.2} />
            </group>
          )}
        </group>
      </group>

      {/* --- STUDY DESK & PERSONAL JOURNAL (South Wall, X = -4.2, Z = 13.0) --- */}
      <group position={[-4.2, 0, 13.0]}>
        {/* Desk Surface */}
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.08, 1.0]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.3} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.85, 0.42, -0.35]}>
          <boxGeometry args={[0.08, 0.84, 0.08]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        <mesh position={[0.85, 0.42, -0.35]}>
          <boxGeometry args={[0.08, 0.84, 0.08]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        <mesh position={[-0.85, 0.42, 0.35]}>
          <boxGeometry args={[0.08, 0.84, 0.08]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        <mesh position={[0.85, 0.42, 0.35]}>
          <boxGeometry args={[0.08, 0.84, 0.08]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>

        {/* --- DESK LAMP --- */}
        <group position={[-0.7, 0.9, 0.2]}>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.04, 16]} />
            <meshStandardMaterial color="#0F172A" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
            <meshStandardMaterial color="#52616B" />
          </mesh>
          <mesh position={[0.05, 0.55, 0]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.14, 0.2, 16, 1, true]} />
            <meshStandardMaterial color="#1E3A8A" side={THREE.DoubleSide} />
          </mesh>
          <pointLight
            ref={deskLampRef}
            position={[0.05, 0.48, 0]}
            color="#F5B960"
            intensity={1.8}
            distance={5.0}
            castShadow
          />
        </group>

        {/* --- ELI NAVARRO'S PERSONAL DIARY (Left on Desk) --- */}
        <group position={[-0.1, 0.9, 0.1]} rotation={[-Math.PI / 2, 0, 0.05]}>
          <mesh>
            <boxGeometry args={[0.26, 0.36, 0.03]} />
            <meshStandardMaterial color="#78350F" roughness={0.8} />
          </mesh>
          <Text position={[0, 0.06, 0.02]} fontSize={0.024} color="#FEF3C7">
            OPERATOR'S DIARY
          </Text>
          <Text position={[0, -0.04, 0.02]} fontSize={0.015} color="#FEF3C7" maxWidth={0.22}>
            Eli Navarro - Station 13 Night Shift
          </Text>
        </group>

        {/* --- CASSETTE TAPE #2: DISTRESS RELAY (Right on Desk) --- */}
        <group position={[0.5, 0.9, -0.1]} rotation={[-Math.PI / 2, 0, -0.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.12, 0.02]} />
            <meshStandardMaterial color="#0F172A" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.16, 0.07]} />
            <meshStandardMaterial color="#2563EB" />
          </mesh>
          <Text position={[0, 0, 0.015]} fontSize={0.018} color="#FFFFFF">
            TAPE #2: RELAY
          </Text>
        </group>
      </group>

      {/* --- BROKEN WALL CLOCK AT 01:13 AM (South Wall, X = -2.2, Z = 13.68) --- */}
      <group position={[-2.2, 2.4, 13.68]} rotation={[0, Math.PI, 0]}>
        {/* Frame */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
          <meshStandardMaterial color="#0F172A" metalness={0.7} />
        </mesh>
        {/* Face */}
        <mesh position={[0, 0, 0.03]}>
          <circleGeometry args={[0.28, 32]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.9} />
        </mesh>
        <Text position={[0, 0.18, 0.035]} fontSize={0.05} color="#0F172A">
          12
        </Text>
        <Text position={[0.18, 0, 0.035]} fontSize={0.05} color="#0F172A">
          3
        </Text>
        <Text position={[0, -0.18, 0.035]} fontSize={0.05} color="#0F172A">
          6
        </Text>
        <Text position={[-0.18, 0, 0.035]} fontSize={0.05} color="#0F172A">
          9
        </Text>

        {/* Hour Hand pointing at 1 */}
        <mesh position={[0.03, 0.06, 0.038]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.018, 0.12, 0.005]} />
          <meshBasicMaterial color="#0F172A" />
        </mesh>
        {/* Minute Hand pointing at 13 min */}
        <mesh position={[0.06, 0.04, 0.04]} rotation={[0, 0, -Math.PI * 0.43]}>
          <boxGeometry args={[0.012, 0.18, 0.005]} />
          <meshBasicMaterial color="#0F172A" />
        </mesh>
        {/* Second Hand jittering */}
        <group ref={clockJitterRef} position={[0, 0, 0.042]}>
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.006, 0.18, 0.005]} />
            <meshBasicMaterial color="#D94141" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
