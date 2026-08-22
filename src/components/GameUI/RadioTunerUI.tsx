import { useEffect, useRef } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { X, Volume2, Radio, Activity, Zap } from 'lucide-react';

export function RadioTunerUI() {
  const currentFrequency = useGameState((state) => state.currentFrequency);
  const targetFrequency = useGameState((state) => state.targetFrequency);
  const signalLocked = useGameState((state) => state.signalLocked);
  const setFrequency = useGameState((state) => state.setFrequency);
  const closeRadioTuner = useGameState((state) => state.closeRadioTuner);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Oscilloscope waveform rendering
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const renderWave = () => {
      phase += 0.15;
      const width = canvas.width;
      const height = canvas.height;
      const diff = Math.abs(currentFrequency - targetFrequency);

      ctx.fillStyle = '#07111F';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(57, 217, 230, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Signal Waveform
      ctx.beginPath();
      ctx.lineWidth = 2;
      const isForbidden = Math.abs(currentFrequency - 13.66) < 0.03;
      ctx.strokeStyle = isForbidden ? '#D94141' : signalLocked ? '#63D471' : diff < 0.1 ? '#F5B960' : '#39D9E6';

      for (let x = 0; x < width; x++) {
        const normX = x / width;
        let y = height / 2;

        if (isForbidden) {
          // Chaotic screeching waveform
          y += Math.sin(normX * 40 + phase * 4) * 35 + (Math.random() - 0.5) * 20;
        } else if (diff < 0.08) {
          // Coherent modulated signal
          y += Math.sin(normX * 18 + phase) * 26 * Math.sin(phase * 0.4);
          y += (Math.random() - 0.5) * 4; // slight analog noise
        } else {
          // Static noise
          const noise = (Math.random() - 0.5) * Math.min(60, diff * 70);
          y += Math.sin(normX * 8 + phase * 2) * 10 + noise;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [currentFrequency, targetFrequency, signalLocked]);

  // Forbidden anomalous frequency hazard
  useEffect(() => {
    if (Math.abs(currentFrequency - 13.66) < 0.03) {
      const timer = setTimeout(() => {
        useGameState.getState().triggerGameOver(
          "ANOMALOUS OVERLOAD: You tuned directly into the forbidden 13.66 MHz carrier entity. The transmission shattered the receiver."
        );
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [currentFrequency]);

  const diff = Math.abs(currentFrequency - targetFrequency);
  const signalStrengthPercent = Math.max(5, Math.min(100, Math.round((1 - Math.min(diff, 1.2) / 1.2) * 100)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      {/* Radio Unit Cabinet */}
      <div className="relative w-full max-w-3xl bg-[#0F172A] border-4 border-[#334155] rounded-xl shadow-2xl overflow-hidden p-6 text-slate-100 flex flex-col gap-5">
        {/* Header bar */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-3">
            <Radio className="w-6 h-6 text-[#39D9E6]" />
            <div>
              <h2 className="text-lg font-bold font-mono tracking-wider text-slate-100 uppercase">
                AN/URC-113 High-Frequency Transceiver
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Station 13 Coastal Marine Band (12.00 MHz - 14.50 MHz)
              </p>
            </div>
          </div>
          <button
            onClick={closeRadioTuner}
            className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Column: CRT Oscilloscope & S-Meter */}
          <div className="flex flex-col gap-3">
            {/* CRT Screen */}
            <div className="relative rounded-lg overflow-hidden border-2 border-[#1E293B] bg-[#07111F] p-1 shadow-inner">
              <canvas
                ref={canvasRef}
                width={320}
                height={160}
                className="w-full h-40 block rounded crt-overlay"
              />
              <div className="absolute top-2 left-3 flex items-center gap-1.5 text-[10px] font-mono text-[#39D9E6]">
                <Activity className="w-3 h-3 animate-pulse" />
                <span>CARRIER OSCILLOSCOPE</span>
              </div>
            </div>

            {/* Signal Strength & Lock Indicator */}
            <div className="bg-[#1E293B] p-3 rounded-lg flex justify-between items-center border border-[#334155]">
              <div className="flex-1 mr-4">
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>SIGNAL STRENGTH (S-METER)</span>
                  <span className="text-[#39D9E6] font-bold">{signalStrengthPercent}%</span>
                </div>
                <div className="w-full h-3 bg-[#07111F] rounded-full overflow-hidden p-0.5 border border-[#334155]">
                  <div
                    className={`h-full rounded-full transition-all duration-100 ${
                      signalLocked ? 'bg-[#63D471]' : diff < 0.1 ? 'bg-[#F5B960]' : 'bg-[#39D9E6]'
                    }`}
                    style={{ width: `${signalStrengthPercent}%` }}
                  />
                </div>
              </div>

              {/* Status Lock LED */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all ${
                    signalLocked
                      ? 'bg-[#63D471] border-[#63D471] shadow-[0_0_12px_#63D471]'
                      : 'bg-[#D94141]/40 border-[#D94141]'
                  }`}
                />
                <span className="text-[9px] font-mono mt-1 text-slate-400">
                  {signalLocked ? 'LOCKED' : 'SEEKING'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Frequency Display & Controls */}
          <div className="flex flex-col gap-4 bg-[#07111F]/60 p-4 rounded-lg border border-[#334155]">
            {/* Big Digital Readout */}
            <div className="bg-[#07111F] border-2 border-[#1E293B] p-4 rounded-lg text-center shadow-inner">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                RECEIVER FREQUENCY
              </span>
              <div className="text-4xl font-mono font-black tracking-widest text-[#39D9E6] subtle-glow">
                {currentFrequency.toFixed(2)}{' '}
                <span className="text-lg font-normal text-slate-400">MHz</span>
              </div>
              <div className="text-xs font-mono text-[#F5B960] mt-1">
                {signalLocked
                  ? 'TRANSMISSION IN PROGRESS'
                  : 'OBJECTIVE TARGET: 13.13 MHz'}
              </div>
            </div>

            {/* Analog Dial Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                <span>12.00 MHz</span>
                <span className="text-[#39D9E6] font-bold">13.13 MHz</span>
                <span>14.50 MHz</span>
              </div>
              <input
                type="range"
                min="12.00"
                max="14.50"
                step="0.01"
                value={currentFrequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full accent-[#39D9E6] cursor-pointer h-2 bg-[#1E293B] rounded-lg"
              />
            </div>

            {/* Fine Tuning Step Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setFrequency(currentFrequency - 0.1)}
                className="bg-[#1E293B] hover:bg-[#334155] text-xs font-mono py-2 rounded border border-[#334155] transition-colors"
              >
                -0.10
              </button>
              <button
                onClick={() => setFrequency(currentFrequency - 0.01)}
                className="bg-[#1E293B] hover:bg-[#334155] text-xs font-mono py-2 rounded border border-[#334155] transition-colors"
              >
                -0.01
              </button>
              <button
                onClick={() => setFrequency(currentFrequency + 0.01)}
                className="bg-[#1E293B] hover:bg-[#334155] text-xs font-mono py-2 rounded border border-[#334155] transition-colors"
              >
                +0.01
              </button>
              <button
                onClick={() => setFrequency(currentFrequency + 0.1)}
                className="bg-[#1E293B] hover:bg-[#334155] text-xs font-mono py-2 rounded border border-[#334155] transition-colors"
              >
                +0.10
              </button>
            </div>
          </div>
        </div>

        {/* Footer / Instructions */}
        <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-t border-[#334155] pt-3">
          <div className="flex items-center gap-2 text-[#39D9E6]">
            <Zap className="w-4 h-4 text-[#F5B960]" />
            <span>Drag slider or click +/- to align needle with 13.13 MHz</span>
          </div>
          <button
            onClick={closeRadioTuner}
            className="px-4 py-2 bg-[#334155] hover:bg-[#475569] text-slate-100 rounded font-semibold text-xs transition-colors"
          >
            Leave Console [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
