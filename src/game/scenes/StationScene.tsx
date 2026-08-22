import { Canvas } from '@react-three/fiber';
import { RadioRoom } from '../objects/RadioRoom';
import { Hallway } from '../objects/Hallway';
import { ObservationDeck } from '../objects/ObservationDeck';
import { GeneratorRoom } from '../objects/GeneratorRoom';
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

        {/* 3D Rooms and Geometry */}
        <RadioRoom />
        <Hallway />
        <ObservationDeck />
        <GeneratorRoom />

        {/* Rain, Lightning, and Fog */}
        <WeatherEffects />

        {/* Player Camera & Controls */}
        <PlayerController />
      </Canvas>
    </div>
  );
}
