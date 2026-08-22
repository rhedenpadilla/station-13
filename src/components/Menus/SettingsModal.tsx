import { useGameState, GraphicsQuality } from '../../game/state/useGameState';
import { X, Volume2, Monitor, Trash2, Check } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function SettingsModal({ onClose }: Props) {
  const settings = useGameState((state) => state.settings);
  const updateSettings = useGameState((state) => state.updateSettings);
  const resetAllProgress = useGameState((state) => state.resetAllProgress);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-slate-100">
      <div className="relative w-full max-w-xl bg-[#0F172A] border-4 border-[#334155] rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col gap-6 font-mono">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-2.5">
            <Monitor className="w-5 h-5 text-[#39D9E6]" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
              Station Configuration & Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Sliders */}
        <div className="space-y-4 bg-[#07111F] p-4 rounded-lg border border-[#334155]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#39D9E6] uppercase tracking-wider mb-2">
            <Volume2 className="w-4 h-4" />
            <span>Audio Volume Levels</span>
          </div>

          {/* Master Volume */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Master Volume</span>
              <span className="text-[#39D9E6]">{Math.round(settings.masterVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.masterVolume}
              onChange={(e) => updateSettings({ masterVolume: parseFloat(e.target.value) })}
              className="w-full accent-[#39D9E6] h-2 bg-[#1E293B] rounded"
            />
          </div>

          {/* SFX Volume */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Radio & SFX Volume</span>
              <span className="text-[#39D9E6]">{Math.round(settings.sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.sfxVolume}
              onChange={(e) => updateSettings({ sfxVolume: parseFloat(e.target.value) })}
              className="w-full accent-[#39D9E6] h-2 bg-[#1E293B] rounded"
            />
          </div>

          {/* Ambience Volume */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Storm & Ambience Volume</span>
              <span className="text-[#39D9E6]">{Math.round(settings.ambienceVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.ambienceVolume}
              onChange={(e) => updateSettings({ ambienceVolume: parseFloat(e.target.value) })}
              className="w-full accent-[#39D9E6] h-2 bg-[#1E293B] rounded"
            />
          </div>
        </div>

        {/* Graphics Quality */}
        <div className="bg-[#07111F] p-4 rounded-lg border border-[#334155]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F5B960] uppercase tracking-wider mb-3">
            <Monitor className="w-4 h-4" />
            <span>Graphics Quality Preset</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['LOW', 'MEDIUM', 'HIGH'] as GraphicsQuality[]).map((quality) => (
              <button
                key={quality}
                onClick={() => updateSettings({ graphicsQuality: quality })}
                className={`py-2 rounded text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                  settings.graphicsQuality === quality
                    ? 'bg-[#39D9E6]/20 border-[#39D9E6] text-[#39D9E6]'
                    : 'bg-[#1E293B] border-[#334155] text-slate-400 hover:text-slate-200'
                }`}
              >
                {settings.graphicsQuality === quality && <Check className="w-3.5 h-3.5" />}
                {quality}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Adjusts rain particle density, shadow maps, and dynamic lighting for smoother laptop performance.
          </p>
        </div>

        {/* Reset Progress */}
        <div className="flex justify-between items-center border-t border-[#334155] pt-4">
          <button
            onClick={() => {
              if (confirm("Reset all saved endings and local checkpoint data?")) {
                resetAllProgress();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-[#D94141] hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Reset Local Progress
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#334155] hover:bg-[#475569] text-white rounded font-bold text-xs transition-colors"
          >
            Save & Return
          </button>
        </div>
      </div>
    </div>
  );
}
