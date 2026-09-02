import { Canvas } from '@react-three/fiber';
import { RadioRoom } from '../objects/RadioRoom';
import { Hallway } from '../objects/Hallway';
import { ObservationDeck } from '../objects/ObservationDeck';
import { GeneratorRoom } from '../objects/GeneratorRoom';
import { ArchiveRoom } from '../objects/ArchiveRoom';
import { SleepingQuarters } from '../objects/SleepingQuarters';
import { SignalTower } from '../objects/SignalTower';
import { WeatherEffects } from '../objects/WeatherEffects';
import { PlayerController } from '../systems/PlayerController';
import { useGameState } from '../state/useGameState';

export function StationScene() {
  const graphicsQuality = useGameState((state) => state.settings.graphicsQuality);

  const dpr: [number, number] =
    graphicsQuality === 'LOW' ? [0.75, 1] : graphicsQuality === 'MEDIUM' ? [1, 1.5] : [1, 2];

  const ambientIntensity = graphicsQuality === 'LOW' ? 0.32 : 0.25;

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows={graphicsQuality === 'HIGH'}
        dpr={dpr}
        camera={{ position: [0, 1.65, 0], fov: 72, near: 0.1, far: 100 }}
        gl={{
          antialias: graphicsQuality === 'HIGH',
          powerPreference: graphicsQuality === 'LOW' ? 'default' : 'high-performance',
          precision: graphicsQuality === 'LOW' ? 'mediump' : 'highp',
          stencil: false,
          depth: true,
        }}
      >
        {/* Base Ambient Storm Lighting */}
        <ambientLight intensity={ambientIntensity} color="#102A43" />

        {/* 3D Rooms and Station Geometry */}
        <RadioRoom />
        <Hallway />
        <ObservationDeck />
        <GeneratorRoom />
        <ArchiveRoom />
        <SleepingQuarters />
        <SignalTower />

        {/* Rain, Lightning, and Volumetric Atmosphere */}
        <WeatherEffects />

        {/* Player Camera, Collisions & Touch/Mouse System */}
        <PlayerController />
      </Canvas>
    </div>
  );
}
