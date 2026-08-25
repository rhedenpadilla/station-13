import { Canvas } from '@react-three/fiber';
import { RadioRoom } from '../objects/RadioRoom';
import { Hallway } from '../objects/Hallway';
import { ObservationDeck } from '../objects/ObservationDeck';
import { GeneratorRoom } from '../objects/GeneratorRoom';
import { ArchiveRoom } from '../objects/ArchiveRoom';
import { SleepingQuarters } from '../objects/SleepingQuarters';
import { WeatherEffects } from '../objects/WeatherEffects';
import { PlayerController } from '../systems/PlayerController';
import { useGameState } from '../state/useGameState';

export function StationScene() {
  const graphicsQuality = useGameState((state) => state.settings.graphicsQuality);

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows={graphicsQuality !== 'LOW'}
        camera={{ position: [0, 1.65, 0], fov: 72 }}
        gl={{ antialias: graphicsQuality === 'HIGH', powerPreference: 'high-performance' }}
      >
        {/* Base Ambient Storm Lighting */}
        <ambientLight intensity={0.25} color="#102A43" />

        {/* 3D Rooms and Station Geometry */}
        <RadioRoom />
        <Hallway />
        <ObservationDeck />
        <GeneratorRoom />
        <ArchiveRoom />
        <SleepingQuarters />

        {/* Rain, Lightning, and Volumetric Atmosphere */}
        <WeatherEffects />

        {/* Player Camera, Collisions & Touch/Mouse System */}
        <PlayerController />
      </Canvas>
    </div>
  );
}
