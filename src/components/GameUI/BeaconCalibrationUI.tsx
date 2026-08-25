import { useGameState } from '../../game/state/useGameState';
import { soundEngine } from '../../game/audio/SoundEngine';
import { X, Zap, Compass, Radio, Activity, CheckCircle, Flame } from 'lucide-react';

export function BeaconCalibrationUI() {
  const beaconCalibrationOpen = useGameState((state) => state.beaconCalibrationOpen);
  const closeBeaconCalibration = useGameState((state) => state.closeBeaconCalibration);
  const beaconSettings = useGameState((state) => state.beaconSettings);
  const updateBeaconSettings = useGameState((state) => state.updateBeaconSettings);
  const isBeaconCalibrated = useGameState((state) => state.isBeaconCalibrated);
  const checkBeaconCalibration = useGameState((state) => state.checkBeaconCalibration);
  const openChoiceModal = useGameState((state) => state.openChoiceModal);

  if (!beaconCalibrationOpen) return null;

  const { frequency, power, azimuth } = beaconSettings;

  // Calculate alignment closeness
  const freqDiff = Math.abs(frequency - 13.13);
  const powerDiff = Math.abs(power - 85);
  const azimuthDiff = Math.min(Math.abs(azimuth - 240), 360 - Math.abs(azimuth - 240));

  const freqScore = Math.max(0, 1 - freqDiff / 0.5);
  const powerScore = Math.max(0, 1 - powerDiff / 25);
  const azimuthScore = Math.max(0, 1 - azimuthDiff / 60);

  const resonancePercent = Math.round(((freqScore + powerScore + azimuthScore) / 3) * 100);
  const isOptimal = resonancePercent >= 96;

  const handleFreqChange = (v: number) => {
    updateBeaconSettings({ frequency: Math.round(v * 100) / 100 });
    soundEngine.playCalibrationTone(resonancePercent);
  };

  const handlePowerChange = (v: number) => {
    updateBeaconSettings({ power: Math.round(v) });
    soundEngine.playCalibrationTone(resonancePercent);
  };

  const handleAzimuthChange = (v: number) => {
    updateBeaconSettings({ azimuth: Math.round(v) });
    soundEngine.playCalibrationTone(resonancePercent);
  };

  const handleCalibrate = () => {
    if (checkBeaconCalibration()) {
      closeBeaconCalibration();
      openChoiceModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-3xl bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#102A43] text-[#F5B960]">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
                BEACON OPTICAL RELAY CALIBRATION CONSOLE
              </h2>
              <p className="text-xs text-slate-400">
                Observation Deck Array • Black Tide Sector 13 Alignment
              </p>
            </div>
          </div>
          <button
            onClick={closeBeaconCalibration}
            className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calibration Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Column: Resonance Meter & Telemetry */}
          <div className="bg-[#07111F] p-5 rounded-xl border border-[#334155] flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[#1E293B] pb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#39D9E6]">
                <Activity className="w-4 h-4" />
                <span>OPTICAL RESONANCE GAUGE</span>
              </div>
              <span className={`text-xs font-bold ${isOptimal ? 'text-[#63D471]' : 'text-[#F5B960]'}`}>
                {resonancePercent}% SYNC
              </span>
            </div>

            {/* Big Resonance Bar */}
            <div className="w-full h-5 bg-[#0F172A] rounded-full overflow-hidden p-1 border border-[#334155]">
              <div
                className={`h-full rounded-full transition-all duration-150 ${
                  isOptimal
                    ? 'bg-[#63D471] shadow-[0_0_15px_#63D471]'
                    : resonancePercent > 60
                    ? 'bg-[#F5B960]'
                    : 'bg-[#39D9E6]'
                }`}
                style={{ width: `${resonancePercent}%` }}
              />
            </div>

            {/* Clue Reminder Box */}
            <div className="bg-[#0B132B] p-3 rounded-lg border border-[#1E3A8A] text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <span className="text-[10px] font-bold text-[#39D9E6] uppercase block">
                [ SPECIFICATIONS FROM CALIBRATION NOTE ]
              </span>
              <p>• Target Frequency: <strong className="text-[#F5B960]">13.13 MHz</strong> (Carrier Sync)</p>
              <p>• Output Power Gain: <strong className="text-[#F5B960]">85%</strong> (Arc Threshold)</p>
              <p>• Azimuth Alignment: <strong className="text-[#F5B960]">240° SW</strong> (Black Tide Shoals)</p>
            </div>

            {/* Lock Status Badge */}
            <div className="flex items-center justify-between bg-[#1E293B] p-2.5 rounded-lg text-xs">
              <span className="text-slate-400">BEACON STATUS:</span>
              <span className={`font-bold flex items-center gap-1.5 ${isBeaconCalibrated || isOptimal ? 'text-[#63D471]' : 'text-[#D94141]'}`}>
                {isBeaconCalibrated || isOptimal ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>CALIBRATED & PRIMED</span>
                  </>
                ) : (
                  <span>UNSYNCHRONIZED</span>
                )}
              </span>
            </div>
          </div>

          {/* Right Column: 3 Dials / Sliders */}
          <div className="space-y-4 bg-[#07111F]/60 p-4 rounded-xl border border-[#334155]">
            {/* Control 1: Frequency */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5 font-bold text-[#39D9E6]">
                  <Radio className="w-3.5 h-3.5" /> 1. Carrier Frequency
                </span>
                <span className="font-bold text-white">{frequency.toFixed(2)} MHz</span>
              </div>
              <input
                type="range"
                min="12.00"
                max="14.50"
                step="0.01"
                value={frequency}
                onChange={(e) => handleFreqChange(parseFloat(e.target.value))}
                className="w-full accent-[#39D9E6] h-2 bg-[#1E293B] rounded cursor-pointer"
              />
            </div>

            {/* Control 2: Power */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5 font-bold text-[#F5B960]">
                  <Zap className="w-3.5 h-3.5" /> 2. Transmitter Power Gain
                </span>
                <span className="font-bold text-white">{power}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={power}
                onChange={(e) => handlePowerChange(parseFloat(e.target.value))}
                className="w-full accent-[#F5B960] h-2 bg-[#1E293B] rounded cursor-pointer"
              />
            </div>

            {/* Control 3: Azimuth Direction */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5 font-bold text-[#93C5FD]">
                  <Compass className="w-3.5 h-3.5" /> 3. Azimuth Direction
                </span>
                <span className="font-bold text-white">{azimuth}° SW</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={azimuth}
                onChange={(e) => handleAzimuthChange(parseFloat(e.target.value))}
                className="w-full accent-[#93C5FD] h-2 bg-[#1E293B] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer & Action Buttons */}
        <div className="flex justify-between items-center border-t border-[#334155] pt-4">
          <button
            onClick={closeBeaconCalibration}
            className="px-4 py-2 bg-[#1E293B] hover:bg-[#334155] text-slate-300 rounded font-bold text-xs transition-colors"
          >
            Step Away [ESC]
          </button>

          <button
            onClick={handleCalibrate}
            disabled={!isOptimal && !isBeaconCalibrated}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
              isOptimal || isBeaconCalibrated
                ? 'bg-[#63D471] hover:bg-[#22c55e] text-black shadow-[0_0_20px_#63D471] hover:scale-105'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Engage Optical Beacon Array</span>
          </button>
        </div>
      </div>
    </div>
  );
}
