import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';

export function SignalTower() {
  const signalTowerUnlocked = useGameState((state) => state.signalTowerUnlocked);
  const isBeaconCalibrated = useGameState((state) => state.isBeaconCalibrated);
  const isLightningActive = useGameState((state) => state.isLightningActive);

  const beaconLensRef = useRef<THREE.Group>(null);
  const beaconLightRef = useRef<THREE.SpotLight>(null);
  const beaconGlowRef = useRef<THREE.PointLight>(null);
  const radarDishRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Beacon optical rotor sweep
    if (beaconLensRef.current) {
      beaconLensRef.current.rotation.y = t * 1.8;
    }

    if (radarDishRef.current) {
      radarDishRef.current.rotation.y = -t * 0.9;
    }

    if (beaconLightRef.current && beaconGlowRef.current) {
      if (isBeaconCalibrated) {
        const pulse = 2.5 + Math.sin(t * 4) * 0.8;
        beaconLightRef.current.intensity = pulse * 2.0;
        beaconGlowRef.current.intensity = pulse;
      } else {
        beaconLightRef.current.intensity = 0.4;
        beaconGlowRef.current.intensity = 0.3;
      }
    }
  });

  return (
    <group position={[0, 4.0, 16.0]}>
      {/* --- UPPER SIGNAL TOWER PLATFORM (Y = 4.0 to 8.0, X = [-3.2, 3.2], Z = [-3.2, 3.2]) --- */}

      {/* Platform Metal Floor */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[6.4, 0.25, 6.4]} />
        <meshStandardMaterial color="#0F172A" roughness={0.7} metalness={0.6} />
      </mesh>

      {/* Glass Observation Dome / Roof Structure */}
      <mesh position={[0, 3.8, 0]}>
        <boxGeometry args={[6.4, 0.2, 6.4]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>

      {/* Support Framework Columns */}
      {[-3.0, 3.0].map((x) =>
        [-3.0, 3.0].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 1.9, z]}>
            <boxGeometry args={[0.25, 3.8, 0.25]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
        ))
      )}

      {/* High-Altitude Observation Windows Overlooking Gale */}
      {/* South Panoramic Window (Overlooking Ocean) */}
      <mesh position={[0, 1.8, 3.1]}>
        <planeGeometry args={[5.8, 2.2]} />
        <meshPhysicalMaterial
          color="#102A43"
          roughness={0.08}
          transmission={0.9}
          thickness={0.6}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* North Window */}
      <mesh position={[0, 1.8, -3.1]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[5.8, 2.2]} />
        <meshPhysicalMaterial
          color="#102A43"
          roughness={0.08}
          transmission={0.9}
          thickness={0.6}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* East Window */}
      <mesh position={[3.1, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5.8, 2.2]} />
        <meshPhysicalMaterial
          color="#102A43"
          roughness={0.08}
          transmission={0.9}
          thickness={0.6}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* West Window */}
      <mesh position={[-3.1, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5.8, 2.2]} />
        <meshPhysicalMaterial
          color="#102A43"
          roughness={0.08}
          transmission={0.9}
          thickness={0.6}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Safety Railings inside Tower */}
      <group position={[0, 0.5, 3.0]}>
        <mesh>
          <boxGeometry args={[6.0, 0.06, 0.06]} />
          <meshStandardMaterial color="#64748B" metalness={0.8} />
        </mesh>
      </group>

      {/* --- MASTER BEACON OPTICAL LENS (Center of Tower, [0, 1.8, 0]) --- */}
      <group position={[0, 1.6, 0]}>
        {/* Base Pillar */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.5, 0.7, 1.2, 16]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* Rotating Optical Fresnel Lens Ring */}
        <group ref={beaconLensRef}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.6, 16]} />
            <meshPhysicalMaterial
              color="#39D9E6"
              transmission={0.95}
              roughness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[0, 0.3, 0.45]}>
            <boxGeometry args={[0.15, 0.4, 0.1]} />
            <meshStandardMaterial color="#F5B960" metalness={0.9} />
          </mesh>
        </group>

        {/* Central Glowing Xenon Core */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={isBeaconCalibrated ? '#39D9E6' : '#F5B960'} />
        </mesh>

        <pointLight
          ref={beaconGlowRef}
          position={[0, 0.3, 0]}
          color={isBeaconCalibrated ? '#39D9E6' : '#F5B960'}
          intensity={2.0}
          distance={12}
        />

        <spotLight
          ref={beaconLightRef}
          position={[0, 0.3, 0]}
          color={isBeaconCalibrated ? '#39D9E6' : '#F5B960'}
          intensity={4.0}
          angle={Math.PI / 4}
          penumbra={0.4}
          distance={80}
        />
      </group>

      {/* --- UPPER BEACON CONTROL TERMINAL (South Wall Console, [0, 0.8, 2.2]) --- */}
      <group position={[0, 0.8, 2.2]} rotation={[0, Math.PI, 0]}>
        {/* Terminal Housing */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.1, 0.6]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* Terminal Screen Face */}
        <mesh position={[0, 0.2, 0.31]} rotation={[-0.3, 0, 0]}>
          <planeGeometry args={[1.2, 0.6]} />
          <meshBasicMaterial color="#0B132B" />
        </mesh>

        <Text position={[0, 0.32, 0.32]} rotation={[-0.3, 0, 0]} fontSize={0.065} color="#39D9E6">
          UPPER BEACON ARRAY
        </Text>

        <Text
          position={[0, 0.22, 0.32]}
          rotation={[-0.3, 0, 0]}
          fontSize={0.045}
          color={isBeaconCalibrated ? '#63D471' : '#F5B960'}
        >
          {isBeaconCalibrated ? 'CALIBRATION: 100% RESONANCE' : 'STANDBY: REQUIRES CALIBRATION'}
        </Text>

        <Text position={[0, 0.12, 0.32]} rotation={[-0.3, 0, 0]} fontSize={0.04} color="#9FB3C8">
          [PRESS E TO BROADCAST / RECAP]
        </Text>
      </group>

      {/* --- TOWER RADAR & TRANSMITTER MAST ON ROOF --- */}
      <group position={[0, 4.0, 0]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 2.4, 8]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.9} />
        </mesh>
        <group ref={radarDishRef} position={[0, 2.2, 0]}>
          <mesh rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.1, 0.2, 16]} />
            <meshStandardMaterial color="#64748B" metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* --- CLASSIFIED 1986 LOGBOOK ON WEST DESK ([-2.0, 0.7, 0]) --- */}
      <group position={[-2.2, 0.7, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.8, 0.6]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} />
        </mesh>
        {/* Dossier Document */}
        <mesh position={[0, 0.41, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.3]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
        </mesh>
        <Text position={[0, 0.43, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.035} color="#0F172A">
          1986 DOSSIER
        </Text>
      </group>

      {/* Ceiling Ambient Light */}
      <pointLight position={[0, 3.2, 0]} color="#39D9E6" intensity={1.2} distance={8} />

      {/* Lightning highlight */}
      {isLightningActive && (
        <pointLight position={[0, 2.5, 0]} color="#E0F2FE" intensity={4.0} distance={20} />
      )}
    </group>
  );
}
