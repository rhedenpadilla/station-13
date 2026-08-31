import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';

export function ObservationDeck() {
  const hasCollectedFuse = useGameState((state) => state.hasCollectedFuse);
  const seaLightVisible = useGameState((state) => state.seaLightVisible);
  const isLightningActive = useGameState((state) => state.isLightningActive);

  const oceanRef = useRef<THREE.Mesh>(null);
  const seaBeaconRef = useRef<THREE.PointLight>(null);
  const fuseGlowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Ocean surface wave animation
    if (oceanRef.current) {
      oceanRef.current.position.y = -1.8 + Math.sin(t * 1.2) * 0.15;
    }

    // Fuse pulsing glow
    if (fuseGlowRef.current && !hasCollectedFuse) {
      fuseGlowRef.current.intensity = 0.5 + Math.sin(t * 5) * 0.3;
    }

    // Sea beacon pulse
    if (seaBeaconRef.current) {
      const show = seaLightVisible || isLightningActive;
      seaBeaconRef.current.intensity = show ? 3.5 : 0.0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* --- OBSERVATION DECK PLATFORM (Z = 12 to 20, Width: 8m) --- */}
      {/* Metal Grate Deck Floor */}
      <mesh position={[0, 0, 16]} receiveShadow>
        <boxGeometry args={[8, 0.2, 8]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} metalness={0.6} />
      </mesh>

      {/* Covered Deck Roof */}
      <mesh position={[0, 3.8, 16]}>
        <boxGeometry args={[8, 0.2, 8]} />
        <meshStandardMaterial color="#0F172A" roughness={0.8} />
      </mesh>

      {/* Support Pillars */}
      <mesh position={[-3.8, 1.9, 19.8]}>
        <boxGeometry args={[0.3, 3.8, 0.3]} />
        <meshStandardMaterial color="#334155" metalness={0.7} />
      </mesh>
      <mesh position={[3.8, 1.9, 19.8]}>
        <boxGeometry args={[0.3, 3.8, 0.3]} />
        <meshStandardMaterial color="#334155" metalness={0.7} />
      </mesh>

      {/* --- RUSTED PERIMETER SAFETY RAILINGS --- */}
      {/* South Railing (Front overlook facing ocean) */}
      <group position={[0, 0.6, 19.9]}>
        {/* Top rail */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[8, 0.08, 0.08]} />
          <meshStandardMaterial color="#52616B" roughness={0.7} metalness={0.8} />
        </mesh>
        {/* Mid rail */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[8, 0.05, 0.05]} />
          <meshStandardMaterial color="#52616B" roughness={0.7} metalness={0.8} />
        </mesh>
        {/* Vertical bars */}
        {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* East Railing */}
      <group position={[3.9, 0.6, 16]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[8, 0.08, 0.08]} />
          <meshStandardMaterial color="#52616B" metalness={0.8} />
        </mesh>
      </group>

      {/* West Railing */}
      <group position={[-3.9, 0.6, 16]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[8, 0.08, 0.08]} />
          <meshStandardMaterial color="#52616B" metalness={0.8} />
        </mesh>
      </group>

      {/* --- SUPPLY CABINET (Mounted on West Back Wall, X = -3.5, Z = 12.5) --- */}
      <group position={[-3.6, 1.5, 12.8]}>
        {/* Cabinet Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 1.2, 0.8]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Cabinet Door Frame */}
        <mesh position={[0.26, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.7, 1.1]} />
          <meshStandardMaterial color="#1E293B" roughness={0.5} />
        </mesh>
        <Text
          position={[0.27, 0.35, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.06}
          color="#F5B960"
        >
          SUPPLY / SPARES
        </Text>

        {/* Interior Fuse Item (if not collected) */}
        {!hasCollectedFuse && (
          <group position={[0.1, 0, 0]}>
            {/* Ceramic Fuse Tube */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, 0.22, 16]} />
              <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
            </mesh>
            {/* Metal Caps */}
            <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
              <meshStandardMaterial color="#F5B960" metalness={0.9} />
            </mesh>
            <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
              <meshStandardMaterial color="#F5B960" metalness={0.9} />
            </mesh>
            {/* Fuse Glow */}
            <pointLight
              ref={fuseGlowRef}
              position={[0.15, 0, 0]}
              color="#F5B960"
              intensity={0.6}
              distance={1.5}
            />
          </group>
        )}
      </group>

      {/* --- BEACON CALIBRATION CONSOLE (Observation Deck Overlook, X = 0, Z = 18.8) --- */}
      <group position={[0, 0.8, 18.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.0, 0.5]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.25, -0.26]} rotation={[-0.3, Math.PI, 0]}>
          <planeGeometry args={[1.1, 0.5]} />
          <meshBasicMaterial color="#0B132B" />
        </mesh>
        <Text position={[0, 0.35, -0.27]} rotation={[-0.3, Math.PI, 0]} fontSize={0.06} color="#39D9E6">
          BEACON CALIBRATION
        </Text>
        <Text position={[0, 0.22, -0.27]} rotation={[-0.3, Math.PI, 0]} fontSize={0.04} color="#F5B960">
          [PRESS E TO CALIBRATE]
        </Text>
      </group>

      {/* --- SIGNAL TOWER ACCESS LADDER & OVERHEAD HATCH (East side, X = 3.2, Z = 14.5) --- */}
      <group position={[3.2, 0, 14.5]}>
        {/* Ladder Rails */}
        <mesh position={[-0.2, 2.0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 4.0, 8]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} />
        </mesh>
        <mesh position={[0.2, 2.0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 4.0, 8]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} />
        </mesh>
        {/* Ladder Rungs */}
        {[0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 0.4, 8]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.9} />
          </mesh>
        ))}

        {/* Ceiling Hatch */}
        <mesh position={[0, 3.85, 0]}>
          <boxGeometry args={[1.0, 0.1, 1.0]} />
          <meshStandardMaterial color="#0F172A" metalness={0.9} />
        </mesh>

        {/* Access Sign */}
        <group position={[-0.4, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <Text fontSize={0.07} color="#39D9E6">
            ▲ SIGNAL TOWER
          </Text>
          <Text position={[0, -0.1, 0]} fontSize={0.045} color="#9FB3C8">
            UPPER BEACON DECK
          </Text>
        </group>
      </group>

      {/* --- STORMY OCEAN SURFACE (Deep Below Deck) --- */}
      <mesh ref={oceanRef} position={[0, -2.5, 30]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 100, 32, 32]} />
        <meshStandardMaterial
          color="#07111F"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* --- DISTANT MYSTERIOUS LIGHT AT SEA (Appears during lightning / signal) --- */}
      {(seaLightVisible || isLightningActive) && (
        <group position={[8, 3.5, 55]}>
          {/* Glowing Beacon Core */}
          <mesh>
            <sphereGeometry args={[1.2, 16, 16]} />
            <meshBasicMaterial color="#39D9E6" />
          </mesh>
          {/* Vertical Light Pillar */}
          <mesh position={[0, 15, 0]}>
            <cylinderGeometry args={[0.8, 3.0, 30, 16]} />
            <meshBasicMaterial color="#39D9E6" transparent opacity={0.35} />
          </mesh>
          <pointLight ref={seaBeaconRef} color="#39D9E6" intensity={4} distance={90} />
        </group>
      )}
    </group>
  );
}
