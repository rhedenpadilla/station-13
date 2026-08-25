import { useEffect, useState } from 'react';
import { Radio, CloudRain, ShieldAlert } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  const tips = [
    "Tip: Keep your flashlight active while exploring the Observation Deck to prevent sanity collapse.",
    "Tip: Review the Investigation Board [TAB] to follow connecting threads between 1986 and tonight.",
    "Tip: The Archive tape recorder will decode hidden carrier frequencies from magnetic cassettes.",
    "Tip: The beacon array requires Frequency, Power, and Azimuth calibrated to 100% resonance.",
    "Tip: If you hear rhythmic static pulses, check the Radio Control Room console.",
  ];

  const [tipIndex] = useState(() => Math.floor(Math.random() * tips.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#07111F] text-slate-100 font-mono select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#102A43]/60 via-[#07111F] to-black opacity-90 pointer-events-none" />
      <div className="absolute inset-0 crt-overlay pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-2 text-xs text-[#39D9E6]">
        <Radio className="w-4 h-4 animate-pulse" />
        <span>INITIALIZING COASTAL STATION 13 SENSORS...</span>
      </div>

      {/* Center Atmospheric Loading Logo */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <div className="p-4 rounded-2xl bg-[#102A43] text-[#39D9E6] mb-4 shadow-[0_0_30px_rgba(57,217,230,0.3)] animate-pulse">
          <CloudRain className="w-12 h-12" />
        </div>

        <h2 className="text-2xl font-black tracking-widest text-slate-100 mb-2 uppercase">
          DEAD AIR: <span className="text-[#39D9E6]">SIGNAL 13</span>
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Synchronizing Auxiliary Generators, Oscilloscopes, and Optical Relays...
        </p>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-[#0F172A] rounded-full overflow-hidden p-0.5 border border-[#334155] mb-2">
          <div
            className="h-full bg-[#39D9E6] rounded-full transition-all duration-100 shadow-[0_0_10px_#39D9E6]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-slate-500 tracking-widest uppercase">
          {progress}% LOADED
        </span>
      </div>

      {/* Atmospheric Tip Box */}
      <div className="relative z-10 max-w-md bg-[#0F172A]/80 border border-[#1E293B] p-3.5 rounded-xl text-center text-xs text-slate-300">
        <span className="text-[9px] font-bold text-[#F5B960] uppercase block mb-1">
          OPERATIONAL DIRECTIVE TIP
        </span>
        <p>{tips[tipIndex]}</p>
      </div>
    </div>
  );
}
