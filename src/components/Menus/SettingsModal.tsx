import { useGameState, GraphicsQuality, VirtualControlsMode } from '../../game/state/useGameState';
import { X, Volume2, Monitor, Trash2, Check, Smartphone, Eye, Sparkles } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function SettingsModal({ onClose }: Props) {
  const settings = useGameState((state) => state.settings);
  const updateSettings = useGameState((state) => state.updateSettings);
  const resetAllProgress = useGameState((state) => state.resetAllProgress);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-y-auto p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-2.5">
            <Monitor className="w-5 h-5 text-[#39D9E6]" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
              Station Configuration & Accessibility
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Sliders Section */}
        <div className="space-y-3.5 bg-[#07111F] p-4 rounded-xl border border-[#334155]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#39D9E6] uppercase tracking-wider">
            <Volume2 className="w-4 h-4" />
            <span>Audio Soundscape Levels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Master Volume */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Master Volume</span>
                <span className="text-[#39D9E6] font-bold">{Math.round(settings.masterVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.masterVolume}
                onChange={(e) => updateSettings({ masterVolume: parseFloat(e.target.value) })}
                className="w-full accent-[#39D9E6] h-2 bg-[#1E293B] rounded cursor-pointer"
              />
            </div>

            {/* SFX Volume */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>SFX & Footsteps</span>
                <span className="text-[#39D9E6] font-bold">{Math.round(settings.sfxVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.sfxVolume}
                onChange={(e) => updateSettings({ sfxVolume: parseFloat(e.target.value) })}
                className="w-full accent-[#39D9E6] h-2 bg-[#1E293B] rounded cursor-pointer"
              />
            </div>

            {/* Ambience Volume */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Storm & Ambience</span>
                <span className="text-[#39D9E6] font-bold">{Math.round(settings.ambienceVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.ambienceVolume}
                onChange={(e) => updateSettings({ ambienceVolume: parseFloat(e.target.value) })}
                className="w-full accent-[#39D9E6] h-2 bg-[#1E293B] rounded cursor-pointer"
              />
            </div>

            {/* Radio / Voice Volume */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Radio & Tapes</span>
                <span className="text-[#39D9E6] font-bold">{Math.round(settings.musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.musicVolume}
                onChange={(e) => updateSettings({ musicVolume: parseFloat(e.target.value) })}
                className="w-full accent-[#39D9E6] h-2 bg-[#1E293B] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Controls & Virtual Overlay Options */}
        <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F5B960] uppercase tracking-wider">
            <Smartphone className="w-4 h-4" />
            <span>Virtual Navigation & Controls</span>
          </div>

          <div>
            <span className="text-xs text-slate-300 block mb-2 font-medium">On-Screen Virtual Directional Buttons</span>
            <div className="grid grid-cols-3 gap-2">
              {(['AUTO', 'ALWAYS_ON', 'DISABLED'] as VirtualControlsMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateSettings({ virtualControlsMode: mode })}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                    settings.virtualControlsMode === mode
                      ? 'bg-[#39D9E6]/20 border-[#39D9E6] text-[#39D9E6]'
                      : 'bg-[#1E293B] border-[#334155] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {settings.virtualControlsMode === mode && <Check className="w-3.5 h-3.5" />}
                  {mode === 'AUTO' ? 'Auto-Detect' : mode === 'ALWAYS_ON' ? 'Always On' : 'Disabled'}
                </button>
              ))}
            </div>
          </div>

          {/* Mouse / Touch Sensitivity */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Mouse / Look Sensitivity</span>
              <span className="text-[#39D9E6] font-bold">{settings.mouseSensitivity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.5"
              step="0.1"
              value={settings.mouseSensitivity}
              onChange={(e) => updateSettings({ mouseSensitivity: parseFloat(e.target.value) })}
              className="w-full accent-[#39D9E6] h-2 bg-[#1E293B] rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Accessibility & Visual Options */}
        <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
            <Eye className="w-4 h-4" />
            <span>Accessibility & Visual Presets</span>
          </div>

          {/* Graphics Quality */}
          <div>
            <span className="text-xs text-slate-300 block mb-2 font-medium">Graphics Quality Preset</span>
            <div className="grid grid-cols-3 gap-2">
              {(['LOW', 'MEDIUM', 'HIGH'] as GraphicsQuality[]).map((quality) => (
                <button
                  key={quality}
                  onClick={() => updateSettings({ graphicsQuality: quality })}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
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
          </div>

          {/* Toggles: Subtitles, Reduced Flashing, Camera Shake */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <button
              onClick={() => updateSettings({ subtitlesEnabled: !settings.subtitlesEnabled })}
              className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-between ${
                settings.subtitlesEnabled
                  ? 'bg-[#102A43] border-[#39D9E6] text-[#39D9E6]'
                  : 'bg-[#1E293B] border-[#334155] text-slate-400'
              }`}
            >
              <span>Subtitles</span>
              <span className="text-[10px]">{settings.subtitlesEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => updateSettings({ reducedFlashing: !settings.reducedFlashing })}
              className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-between ${
                settings.reducedFlashing
                  ? 'bg-[#102A43] border-[#39D9E6] text-[#39D9E6]'
                  : 'bg-[#1E293B] border-[#334155] text-slate-400'
              }`}
            >
              <span>Photosensitive Mode</span>
              <span className="text-[10px]">{settings.reducedFlashing ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => updateSettings({ cameraShake: !settings.cameraShake })}
              className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-between ${
                settings.cameraShake
                  ? 'bg-[#102A43] border-[#39D9E6] text-[#39D9E6]'
                  : 'bg-[#1E293B] border-[#334155] text-slate-400'
              }`}
            >
              <span>Camera Shake</span>
              <span className="text-[10px]">{settings.cameraShake ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Reset Progress & Close */}
        <div className="flex justify-between items-center border-t border-[#334155] pt-4">
          <button
            onClick={() => {
              if (confirm("WARNING: Reset all saved endings, unlocked lore, and local checkpoint data?")) {
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
            className="px-6 py-2.5 bg-[#334155] hover:bg-[#475569] text-white rounded-lg font-bold text-xs transition-colors"
          >
            Save & Return
          </button>
        </div>
      </div>
    </div>
  );
}
