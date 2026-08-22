import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';

export function GeneratorRoom() {
  const hasRestoredPower = useGameState((state) => state.hasRestoredPower);

  const generatorTurbineRef = useRef<THREE.Group>(null);
  const indicatorLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Turbine rotation when powered
    if (generatorTurbineRef.current && hasRestoredPower) {
      generatorTurbineRef.current.rotation.x = t * 12;
    }

    // Emergency red blink before power restoration
    if (indicatorLightRef.current && !hasRestoredPower) {
      indicatorLightRef.current.intensity = Math.sin(t * 5) > 0 ? 0.9 : 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* --- ROOM STRUCTURE (X = 1.2 to 7.2, Z = 4.5 to 10.5, Height: 3.5m) --- */}
      {/* Floor */}
      <mesh position={[4.2, 0, 7.5]} receiveShadow>
        <boxGeometry args={[6, 0.2, 6]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} metalness={0.5} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[4.2, 3.5, 7.5]}>
        <boxGeometry args={[6, 0.2, 6]} />
        <meshStandardMaterial color="#0B1120" roughness={0.9} />
      </mesh>

      {/* East Outer Wall (X = 7.2) */}
      <mesh position={[7.2, 1.75, 7.5]} receiveShadow>
        <boxGeometry args={[0.2, 3.5, 6]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* North Wall (Z = 4.5) */}
      <mesh position={[4.2, 1.75, 4.5]} receiveShadow>
        <boxGeometry args={[6, 3.5, 0.2]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* South Wall (Z = 10.5) */}
      <mesh position={[4.2, 1.75, 10.5]} receiveShadow>
        <boxGeometry args={[6, 3.5, 0.2]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* --- INDUSTRIAL GENERATOR UNIT (Center of Room, X = 4.5, Z = 7.5) --- */}
      <group position={[4.5, 0.8, 7.5]}>
        {/* Main Engine Block */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.4, 1.8]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* Cylinder Heads */}
        {[-0.6, -0.2, 0.2, 0.6].map((x) => (
          <mesh key={x} position={[x, 0.8, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.3, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} />
          </mesh>
        ))}

        {/* Exhaust Pipe leading into ceiling */}
        <group position={[0.7, 1.2, -0.4]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 1.6, 16]} />
            <meshStandardMaterial color="#52616B" metalness={0.8} />
          </mesh>
        </group>

        {/* Turbine Cooling Fan */}
        <group ref={generatorTurbineRef} position={[-1.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} />
          </mesh>
          {/* Fan Blades */}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} rotation={[0, (i * Math.PI) / 4, 0]}>
              <boxGeometry args={[0.7, 0.02, 0.1]} />
              <meshStandardMaterial color="#64748B" metalness={0.9} />
            </mesh>
          ))}
        </group>
      </group>

      {/* --- ELECTRICAL FUSE PANEL (Mounted on East Wall, X = 7.08, Z = 7.5) --- */}
      <group position={[7.05, 1.6, 7.5]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Panel Metal Enclosure */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.4, 0.2]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Inner Panel Face */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[1.0, 1.2]} />
          <meshStandardMaterial color="#0F172A" roughness={0.5} />
        </mesh>

        <Text position={[0, 0.45, 0.12]} fontSize={0.065} color="#F5B960">
          MAIN BEACON FEEDER
        </Text>

        {/* Status Light */}
        <mesh position={[0, 0.28, 0.12]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color={hasRestoredPower ? '#63D471' : '#D94141'} />
        </mesh>
        <Text position={[0, 0.18, 0.12]} fontSize={0.045} color={hasRestoredPower ? '#63D471' : '#D94141'}>
          {hasRestoredPower ? 'STATUS: OPERATIONAL' : 'CIRCUIT BROKEN: NO FUSE'}
        </Text>

        {/* Fuse Socket Slot (Center) */}
        <group position={[0, -0.15, 0.12]}>
          {/* Socket Mount */}
          <mesh>
            <boxGeometry args={[0.4, 0.16, 0.05]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
          {/* Socket Terminals */}
          <mesh position={[-0.15, 0, 0.03]}>
            <boxGeometry args={[0.06, 0.1, 0.04]} />
            <meshStandardMaterial color="#F5B960" metalness={0.9} />
          </mesh>
          <mesh position={[0.15, 0, 0.03]}>
            <boxGeometry args={[0.06, 0.1, 0.04]} />
            <meshStandardMaterial color="#F5B960" metalness={0.9} />
          </mesh>

          {/* Fuse (Visible if restored power) */}
          {hasRestoredPower && (
            <group position={[0, 0, 0.06]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.04, 0.04, 0.24, 16]} />
                <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
              </mesh>
              <mesh position={[-0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.045, 0.045, 0.05, 16]} />
                <meshStandardMaterial color="#F5B960" metalness={0.9} />
              </mesh>
              <mesh position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.045, 0.045, 0.05, 16]} />
                <meshStandardMaterial color="#F5B960" metalness={0.9} />
              </mesh>
            </group>
          )}
        </group>

        {/* Panel Light Source */}
        <pointLight
          ref={indicatorLightRef}
          position={[0, 0.1, 0.4]}
          color={hasRestoredPower ? '#63D471' : '#D94141'}
          intensity={hasRestoredPower ? 1.8 : 0.8}
          distance={4}
          castShadow
        />
      </group>
    </group>
  );
}
