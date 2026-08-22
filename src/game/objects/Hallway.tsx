import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';

export function Hallway() {
  const hasRestoredPower = useGameState((state) => state.hasRestoredPower);
  const generatorDoorUnlocked = useGameState((state) => state.generatorDoorUnlocked);

  const lightRef = useRef<THREE.PointLight>(null);
  const bulbMeshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Fluorescent flicker logic
    if (lightRef.current && bulbMeshRef.current) {
      if (!hasRestoredPower) {
        // High flicker in emergency mode
        const noise = Math.sin(t * 15) * Math.cos(t * 23);
        const isDim = noise > 0.4 || (Math.sin(t * 3) > 0.85);
        const intensity = isDim ? 0.2 : 1.2;
        lightRef.current.intensity = intensity;
        (bulbMeshRef.current.material as THREE.MeshBasicMaterial).color.set(
          isDim ? '#334155' : '#F5B960'
        );
      } else {
        // Stable bright light when power restored
        lightRef.current.intensity = 1.8;
        (bulbMeshRef.current.material as THREE.MeshBasicMaterial).color.set('#F5B960');
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* --- HALLWAY CORRIDOR (Width: 2.4m, Length: 9m, from Z = 3 to Z = 12) --- */}
      {/* Floor */}
      <mesh position={[0, 0, 7.5]} receiveShadow>
        <boxGeometry args={[2.4, 0.2, 9]} />
        <meshStandardMaterial color="#0F172A" roughness={0.8} metalness={0.4} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3.5, 7.5]}>
        <boxGeometry args={[2.4, 0.2, 9]} />
        <meshStandardMaterial color="#0B1120" roughness={0.9} />
      </mesh>

      {/* Left Wall (X = -1.2, continuous solid wall) */}
      <mesh position={[-1.2, 1.75, 7.5]} receiveShadow>
        <boxGeometry args={[0.2, 3.5, 9]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Right Wall (X = 1.2, with doorway to Generator Room at Z = 7.5) */}
      <group position={[1.2, 1.75, 7.5]}>
        {/* North segment (Z = 3 to 6.5) */}
        <mesh position={[0, 0, -2.5]} receiveShadow>
          <boxGeometry args={[0.2, 3.5, 3.5]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.3} />
        </mesh>
        {/* South segment (Z = 8.5 to 12) */}
        <mesh position={[0, 0, 2.5]} receiveShadow>
          <boxGeometry args={[0.2, 3.5, 3.5]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.3} />
        </mesh>
        {/* Doorway Header */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[0.2, 1, 2]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} />
        </mesh>
      </group>

      {/* --- OVERHEAD PIPES & CONDUITS --- */}
      <group position={[0, 3.2, 7.5]}>
        {/* Copper / Steel pipes */}
        <mesh position={[-0.8, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 9, 12]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[-0.68, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 9, 8]} />
          <meshStandardMaterial color="#52616B" metalness={0.8} />
        </mesh>
      </group>

      {/* --- FLICKERING OVERHEAD FLUORESCENT LIGHT FIXTURE --- */}
      <group position={[0, 3.35, 7.5]}>
        {/* Fixture Mount */}
        <mesh>
          <boxGeometry args={[0.3, 0.08, 1.8]} />
          <meshStandardMaterial color="#334155" metalness={0.7} />
        </mesh>
        {/* Fluorescent Tube Bulb */}
        <mesh ref={bulbMeshRef} position={[0, -0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.6, 12]} />
          <meshBasicMaterial color="#F5B960" />
        </mesh>
        {/* Point Light */}
        <pointLight
          ref={lightRef}
          position={[0, -0.2, 0]}
          color="#F5B960"
          intensity={1.2}
          distance={6}
          castShadow
        />
      </group>

      {/* --- DIRECTIONAL SIGNS --- */}
      {/* Left Wall Sign */}
      <group position={[-1.08, 2.1, 5.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[1.0, 0.35]} />
          <meshStandardMaterial color="#0F172A" roughness={0.5} />
        </mesh>
        <Text position={[0, 0.06, 0.01]} fontSize={0.065} color="#39D9E6">
          OBSERVATION DECK ▲
        </Text>
        <Text position={[0, -0.06, 0.01]} fontSize={0.05} color="#9FB3C8">
          ▼ RADIO CONTROL
        </Text>
      </group>

      {/* Generator Room Sign (Above door) */}
      <group position={[1.08, 2.6, 7.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[1.2, 0.3]} />
          <meshStandardMaterial color="#0F172A" roughness={0.5} />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.07} color="#F5B960">
          AUX GENERATOR
        </Text>
      </group>

      {/* Door Keypad / Status LED */}
      <group position={[1.08, 1.5, 6.2]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.3, 0.04]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.05, 0.025]}>
          <circleGeometry args={[0.03, 16]} />
          <meshBasicMaterial color={generatorDoorUnlocked ? '#63D471' : '#D94141'} />
        </mesh>
        <pointLight
          position={[0, 0.05, 0.1]}
          color={generatorDoorUnlocked ? '#63D471' : '#D94141'}
          intensity={0.4}
          distance={1.5}
        />
      </group>
    </group>
  );
}
