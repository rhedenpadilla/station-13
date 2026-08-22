import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';

export function RadioRoom() {
  const currentFrequency = useGameState((state) => state.currentFrequency);
  const signalLocked = useGameState((state) => state.signalLocked);
  const hasRestoredPower = useGameState((state) => state.hasRestoredPower);

  const radarRef = useRef<THREE.Mesh>(null);
  const clockSecondHandRef = useRef<THREE.Group>(null);
  const statusLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Radar scan rotation
    if (radarRef.current) {
      radarRef.current.rotation.z = -t * 1.5;
    }

    // Stuck clock second hand jittering nervously at 1:13
    if (clockSecondHandRef.current) {
      clockSecondHandRef.current.rotation.z = Math.PI * 0.4 + Math.sin(t * 8) * 0.05;
    }

    // Blinking status LED
    if (statusLightRef.current) {
      statusLightRef.current.intensity = Math.sin(t * 4) > 0 ? 0.8 : 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* --- ROOM STRUCTURE (6m x 6m x 3.5m) --- */}
      {/* Floor */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[6, 0.2, 6]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[6, 0.2, 6]} />
        <meshStandardMaterial color="#0F172A" roughness={0.9} />
      </mesh>

      {/* Back Wall (Z = -3) */}
      <mesh position={[0, 1.75, -3]} receiveShadow>
        <boxGeometry args={[6, 3.5, 0.2]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* Left Wall with Rain Window (X = -3) */}
      <group position={[-3, 1.75, 0]}>
        {/* Wall Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 3.5, 6]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* Window Pane overlooking storm */}
        <mesh position={[0.11, 0.3, 0]}>
          <planeGeometry args={[2.5, 1.8]} />
          <meshPhysicalMaterial
            color="#102A43"
            roughness={0.1}
            transmission={0.85}
            thickness={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Right Wall (X = 3) */}
      <mesh position={[3, 1.75, 0]}>
        <boxGeometry args={[0.2, 3.5, 6]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* Front Wall with doorway to Hallway (Z = 3) */}
      <group position={[0, 1.75, 3]}>
        {/* Left segment */}
        <mesh position={[-2, 0, 0]}>
          <boxGeometry args={[2, 3.5, 0.2]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* Right segment */}
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[2, 3.5, 0.2]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* Doorway Header */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[2, 1, 0.2]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
      </group>

      {/* --- RADIO CONSOLE DESK (Center Back, Z = -2.2) --- */}
      <group position={[0, 0, -2.2]}>
        {/* Table Top */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.1, 1.4]} />
          <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.3} />
        </mesh>
        {/* Desk Legs */}
        <mesh position={[-1.4, 0.45, -0.5]}>
          <boxGeometry args={[0.1, 0.9, 0.1]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        <mesh position={[1.4, 0.45, -0.5]}>
          <boxGeometry args={[0.1, 0.9, 0.1]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        <mesh position={[-1.4, 0.45, 0.5]}>
          <boxGeometry args={[0.1, 0.9, 0.1]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        <mesh position={[1.4, 0.45, 0.5]}>
          <boxGeometry args={[0.1, 0.9, 0.1]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>

        {/* --- MAIN ANALOG RADIO TRANSCEIVER CONSOLE --- */}
        <group position={[0, 1.35, -0.2]}>
          {/* Main Chassis */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.8, 0.6]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Front Faceplate */}
          <mesh position={[0, 0, 0.31]}>
            <planeGeometry args={[1.5, 0.7]} />
            <meshStandardMaterial color="#0F172A" roughness={0.4} />
          </mesh>

          {/* Glowing Digital / VFD Frequency Display */}
          <mesh position={[0, 0.15, 0.32]}>
            <planeGeometry args={[0.9, 0.22]} />
            <meshBasicMaterial color="#07111F" />
          </mesh>
          <Text
            position={[0, 0.15, 0.33]}
            fontSize={0.12}
            color={signalLocked ? '#63D471' : '#39D9E6'}
            anchorX="center"
            anchorY="middle"
          >
            {`${currentFrequency.toFixed(2)} MHz`}
          </Text>

          {/* Dial Knob Left */}
          <mesh position={[-0.45, -0.15, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
            <meshStandardMaterial color="#52616B" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Dial Knob Right (Tuner) */}
          <mesh position={[0.45, -0.15, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
            <meshStandardMaterial color="#F5B960" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Radio Console Glow */}
          <pointLight position={[0, 0.2, 0.4]} color="#39D9E6" intensity={0.6} distance={2.5} />
        </group>

        {/* --- CRT WEATHER MONITOR SCREEN (Left of Radio) --- */}
        <group position={[-1.0, 1.3, -0.1]} rotation={[0, 0.25, 0]}>
          {/* CRT Monitor Housing */}
          <mesh castShadow>
            <boxGeometry args={[0.7, 0.6, 0.5]} />
            <meshStandardMaterial color="#334155" roughness={0.5} />
          </mesh>
          {/* CRT Curved Screen */}
          <mesh position={[0, 0, 0.26]}>
            <planeGeometry args={[0.55, 0.45]} />
            <meshStandardMaterial
              color="#0A2F35"
              emissive="#004D40"
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
          {/* Rotating Radar Line */}
          <group position={[0, 0, 0.27]}>
            <mesh ref={radarRef}>
              <planeGeometry args={[0.45, 0.02]} />
              <meshBasicMaterial color="#39D9E6" transparent opacity={0.8} />
            </mesh>
          </group>
          <Text position={[0, -0.15, 0.28]} fontSize={0.04} color="#39D9E6">
            RADAR: SECTOR 13
          </Text>
          <pointLight position={[0, 0, 0.35]} color="#39D9E6" intensity={0.4} distance={2} />
        </group>

        {/* --- DESK LAMP (Right of Radio) --- */}
        <group position={[1.1, 0.95, -0.1]}>
          {/* Base */}
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.04, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
          {/* Arm */}
          <mesh position={[0, 0.35, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
            <meshStandardMaterial color="#52616B" metalness={0.9} />
          </mesh>
          {/* Shade */}
          <mesh position={[-0.1, 0.68, 0]} rotation={[0, 0, 0.6]}>
            <coneGeometry args={[0.16, 0.22, 16, 1, true]} />
            <meshStandardMaterial color="#475569" side={THREE.DoubleSide} />
          </mesh>
          {/* Warm Amber Bulb & Light */}
          <mesh position={[-0.12, 0.62, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#F5B960" />
          </mesh>
          <pointLight
            position={[-0.12, 0.55, 0]}
            color="#F5B960"
            intensity={hasRestoredPower ? 2.2 : 1.4}
            distance={4.5}
            castShadow
          />
        </group>

        {/* --- MAINTENANCE NOTE (Left desk surface) --- */}
        <group position={[-0.5, 0.96, 0.25]} rotation={[-Math.PI / 2, 0, 0.15]}>
          <mesh>
            <planeGeometry args={[0.25, 0.35]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
          </mesh>
          <Text position={[0, 0.08, 0.005]} fontSize={0.022} color="#0F172A" maxWidth={0.22}>
            SHIFT HANDOVER
          </Text>
          <Text position={[0, -0.02, 0.005]} fontSize={0.015} color="#334155" maxWidth={0.22}>
            Spare fuse in Observation Deck cabinet. Keep beacon online.
          </Text>
        </group>

        {/* --- WEATHER LOGBOOK (Right desk surface) --- */}
        <group position={[0.5, 0.96, 0.2]} rotation={[-Math.PI / 2, 0, -0.1]}>
          <mesh>
            <boxGeometry args={[0.3, 0.4, 0.03]} />
            <meshStandardMaterial color="#3B82F6" roughness={0.7} />
          </mesh>
          <Text position={[0, 0.05, 0.02]} fontSize={0.025} color="#F8FAFC">
            STATION LOG
          </Text>
        </group>
      </group>

      {/* --- WALL CLOCK STUCK AT 01:13 AM (Back wall) --- */}
      <group position={[0, 2.7, -2.88]}>
        {/* Frame */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.06, 32]} />
          <meshStandardMaterial color="#0F172A" metalness={0.7} />
        </mesh>
        {/* Face */}
        <mesh position={[0, 0, 0.035]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.32, 32]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.9} />
        </mesh>
        {/* Numerals indicator */}
        <Text position={[0, 0.22, 0.04]} fontSize={0.06} color="#0F172A">
          12
        </Text>
        <Text position={[0.22, 0, 0.04]} fontSize={0.06} color="#0F172A">
          3
        </Text>
        <Text position={[0, -0.22, 0.04]} fontSize={0.06} color="#0F172A">
          6
        </Text>
        <Text position={[-0.22, 0, 0.04]} fontSize={0.06} color="#0F172A">
          9
        </Text>

        {/* Hour Hand pointing at 1 */}
        <mesh position={[0.04, 0.08, 0.042]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.02, 0.16, 0.005]} />
          <meshBasicMaterial color="#0F172A" />
        </mesh>
        {/* Minute Hand pointing at 13 min */}
        <mesh position={[0.08, 0.06, 0.044]} rotation={[0, 0, -Math.PI * 0.43]}>
          <boxGeometry args={[0.015, 0.22, 0.005]} />
          <meshBasicMaterial color="#0F172A" />
        </mesh>
        {/* Jittering Second Hand */}
        <group ref={clockSecondHandRef} position={[0, 0, 0.046]}>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.008, 0.24, 0.005]} />
            <meshBasicMaterial color="#D94141" />
          </mesh>
        </group>
      </group>

      {/* --- STATUS WARNING LED (Wall) --- */}
      <mesh position={[-2.4, 2.4, -2.88]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={hasRestoredPower ? '#63D471' : '#D94141'}
          emissive={hasRestoredPower ? '#63D471' : '#D94141'}
          emissiveIntensity={1.5}
        />
      </mesh>
      <pointLight
        ref={statusLightRef}
        position={[-2.4, 2.4, -2.7]}
        color={hasRestoredPower ? '#63D471' : '#D94141'}
        intensity={0.6}
        distance={2.5}
      />
    </group>
  );
}
