import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameState } from '../state/useGameState';

export function WeatherEffects() {
  const triggerLightning = useGameState((state) => state.triggerLightning);
  const isLightningActive = useGameState((state) => state.isLightningActive);
  const graphicsQuality = useGameState((state) => state.settings.graphicsQuality);

  // Lightning timer
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleNextLightning = () => {
      const delay = 7000 + Math.random() * 10000;
      timeout = setTimeout(() => {
        triggerLightning();
        scheduleNextLightning();
      }, delay);
    };

    scheduleNextLightning();
    return () => clearTimeout(timeout);
  }, [triggerLightning]);

  // Rain particle system
  const rainCount = graphicsQuality === 'LOW' ? 1200 : graphicsQuality === 'MEDIUM' ? 3000 : 6000;
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    const vel = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60; // X
      pos[i * 3 + 1] = Math.random() * 30; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 5; // Z
      vel[i] = 20 + Math.random() * 15;
    }

    return { positions: pos, velocities: vel };
  }, [rainCount]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < rainCount; i++) {
      arr[i * 3 + 1] -= velocities[i] * delta;
      // Slight storm wind tilt
      arr[i * 3] -= 4.0 * delta;

      if (arr[i * 3 + 1] < -2) {
        arr[i * 3 + 1] = 25 + Math.random() * 5;
        arr[i * 3] = (Math.random() - 0.5) * 60;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Rain Streaks */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={rainCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#9FB3C8"
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Lightning Flash Directional Light */}
      <directionalLight
        position={[-15, 30, -30]}
        intensity={isLightningActive ? 4.5 : 0.0}
        color="#D6E8FF"
      />

      {/* Atmospheric Exterior Fog */}
      <fogExp2 attach="fog" args={['#07111F', useGameState.getState().settings.reducedFog ? 0.018 : 0.045]} />
    </group>
  );
}
