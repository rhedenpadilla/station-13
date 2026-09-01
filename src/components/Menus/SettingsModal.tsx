import { useState } from 'react';
import { useGameState, GraphicsQuality, VirtualControlsMode } from '../../game/state/useGameState';
import {
  X,
  Volume2,
  Monitor,
  Trash2,
  Check,
  Smartphone,
  Eye,
  Sliders,
  AlertTriangle,
  RotateCcw,
  Type,
  Maximize2,
  SunMedium,
  Wind,
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function SettingsModal({ onClose }: Props) {
  const settings = useGameState((state) => state.settings);
  const updateSettings = useGameState((state) => state.updateSettings);
  const resetMainProgression = useGameState((state) => state.resetMainProgression);
  const resetAllProgress = useGameState((state) => state.resetAllProgress);

  const [activeTab, setActiveTab] = useState<'AUDIO' | 'CONTROLS' | 'ACCESSIBILITY' | 'RESET'>('CONTROLS');
  const [showFullResetConfirm, setShowFullResetConfirm] = useState(false);
  const [showMainResetConfirm, setShowMainResetConfirm] = useState(false);

  const handleFullReset = () => {
    resetAllProgress();
    setShowFullResetConfirm(false);
    onClose();
  };

  const handleMainReset = () => {
    resetMainProgression();
    setShowMainResetConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-y-auto p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-2.5">
            <Monitor className="w-5 h-5 text-[#39D9E6]" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
              STATION CONFIGURATION & ACCESSIBILITY
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-2 border-b border-[#334155] pb-2">
          <button
            onClick={() => setActiveTab('CONTROLS')}
            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'CONTROLS'
                ? 'bg-[#39D9E6] text-[#07111F]'
                : 'bg-[#1E293B] text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Controls & Layout</span>
            <span className="sm:hidden">Controls</span>
          </button>

          <button
            onClick={() => setActiveTab('ACCESSIBILITY')}
            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'ACCESSIBILITY'
                ? 'bg-[#39D9E6] text-[#07111F]'
                : 'bg-[#1E293B] text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Accessibility</span>
            <span className="sm:hidden">Access</span>
          </button>

          <button
            onClick={() => setActiveTab('AUDIO')}
            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'AUDIO'
                ? 'bg-[#39D9E6] text-[#07111F]'
                : 'bg-[#1E293B] text-slate-400 hover:text-slate-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Soundscape</span>
            <span className="sm:hidden">Audio</span>
          </button>

          <button
            onClick={() => setActiveTab('RESET')}
            className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'RESET'
                ? 'bg-[#D94141] text-white'
                : 'bg-[#1E293B] text-slate-400 hover:text-[#D94141]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Save</span>
            <span className="sm:hidden">Reset</span>
          </button>
        </div>

        {/* --- TAB 1: CONTROLS & VIRTUAL LAYOUT --- */}
        {activeTab === 'CONTROLS' && (
          <div className="space-y-4 animate-fade-in">
            {/* Virtual Controls Mode */}
            <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] space-y-3">
              <span className="text-xs text-slate-300 block font-bold uppercase text-[#39D9E6]">
                Virtual On-Screen Navigation Controls
              </span>
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

            {/* Layout Customization: Size, Opacity, Handedness */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#07111F] p-4 rounded-xl border border-[#334155]">
              {/* Button Size */}
              <div>
                <span className="text-xs text-slate-300 block mb-1.5 font-bold">Button Size</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['SMALL', 'MEDIUM', 'LARGE'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => updateSettings({ virtualControlSize: sz })}
                      className={`py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                        settings.virtualControlSize === sz
                          ? 'bg-[#39D9E6]/20 border-[#39D9E6] text-[#39D9E6]'
                          : 'bg-[#1E293B] border-[#334155] text-slate-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Opacity */}
              <div>
                <span className="text-xs text-slate-300 block mb-1.5 font-bold">Button Opacity</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['LOW', 'MEDIUM', 'HIGH'] as const).map((op) => (
                    <button
                      key={op}
                      onClick={() => updateSettings({ virtualControlOpacity: op })}
                      className={`py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                        settings.virtualControlOpacity === op
                          ? 'bg-[#39D9E6]/20 border-[#39D9E6] text-[#39D9E6]'
                          : 'bg-[#1E293B] border-[#334155] text-slate-400'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              {/* Handed Layout */}
              <div>
                <span className="text-xs text-slate-300 block mb-1.5 font-bold">Handed Layout</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['DEFAULT', 'MIRRORED'] as const).map((hd) => (
                    <button
                      key={hd}
                      onClick={() => updateSettings({ virtualControlHanded: hd })}
                      className={`py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                        settings.virtualControlHanded === hd
                          ? 'bg-[#39D9E6]/20 border-[#39D9E6] text-[#39D9E6]'
                          : 'bg-[#1E293B] border-[#334155] text-slate-400'
                      }`}
                    >
                      {hd === 'DEFAULT' ? 'Left D-Pad' : 'Right D-Pad'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interaction Mode & Hold Duration */}
            <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300 font-bold uppercase text-[#F5B960]">
                  Interaction Trigger Style
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateSettings({ interactMode: 'PRESS' })}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                    settings.interactMode === 'PRESS'
                      ? 'bg-[#F5B960]/20 border-[#F5B960] text-[#F5B960]'
                      : 'bg-[#1E293B] border-[#334155] text-slate-400'
                  }`}
                >
                  {settings.interactMode === 'PRESS' && <Check className="w-3.5 h-3.5" />}
                  Press to Interact [Instant]
                </button>

                <button
                  onClick={() => updateSettings({ interactMode: 'HOLD' })}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                    settings.interactMode === 'HOLD'
                      ? 'bg-[#F5B960]/20 border-[#F5B960] text-[#F5B960]'
                      : 'bg-[#1E293B] border-[#334155] text-slate-400'
                  }`}
                >
                  {settings.interactMode === 'HOLD' && <Check className="w-3.5 h-3.5" />}
                  Hold to Interact [Progress Ring]
                </button>
              </div>

              {settings.interactMode === 'HOLD' && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Hold Duration</span>
                    <span className="text-[#F5B960] font-bold">{settings.interactHoldDuration.toFixed(2)}s</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="1.5"
                    step="0.1"
                    value={settings.interactHoldDuration}
                    onChange={(e) => updateSettings({ interactHoldDuration: parseFloat(e.target.value) })}
                    className="w-full accent-[#F5B960] h-2 bg-[#1E293B] rounded cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Mouse Look Sensitivity */}
            <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155]">
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-bold">Mouse / Look Drag Sensitivity</span>
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

            {/* Layout Preview Simulation */}
            <div className="bg-[#07111F] p-3.5 rounded-xl border border-[#334155] space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
                VIRTUAL CONTROLS LIVE PREVIEW:
              </span>
              <div className="h-20 bg-[#0B132B] rounded-lg border border-[#1E293B] relative flex items-center justify-between px-4 overflow-hidden">
                {settings.virtualControlHanded === 'DEFAULT' ? (
                  <>
                    <div className="w-12 h-12 rounded-lg bg-[#39D9E6]/30 border border-[#39D9E6] flex items-center justify-center text-[10px] text-[#39D9E6] font-bold">
                      D-PAD
                    </div>
                    <div className="w-16 h-10 rounded-lg bg-[#F5B960]/30 border border-[#F5B960] flex items-center justify-center text-[10px] text-[#F5B960] font-bold">
                      INTERACT
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-10 rounded-lg bg-[#F5B960]/30 border border-[#F5B960] flex items-center justify-center text-[10px] text-[#F5B960] font-bold">
                      INTERACT
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-[#39D9E6]/30 border border-[#39D9E6] flex items-center justify-center text-[10px] text-[#39D9E6] font-bold">
                      D-PAD
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: ACCESSIBILITY & VISUALS --- */}
        {activeTab === 'ACCESSIBILITY' && (
          <div className="space-y-4 animate-fade-in">
            {/* Graphics Preset */}
            <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] space-y-2">
              <span className="text-xs text-slate-300 font-bold block uppercase text-[#38BDF8]">
                Graphics Quality & Shadows
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['LOW', 'MEDIUM', 'HIGH'] as GraphicsQuality[]).map((quality) => (
                  <button
                    key={quality}
                    onClick={() => updateSettings({ graphicsQuality: quality })}
                    className={`py-2 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                      settings.graphicsQuality === quality
                        ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]'
                        : 'bg-[#1E293B] border-[#334155] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {settings.graphicsQuality === quality && <Check className="w-3.5 h-3.5" />}
                    {quality}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography & Subtitle Sizes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#07111F] p-4 rounded-xl border border-[#334155]">
              <div>
                <span className="text-xs text-slate-300 block mb-1.5 font-bold">Subtitle Font Size</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['SMALL', 'MEDIUM', 'LARGE'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => updateSettings({ subtitleSize: sz })}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        settings.subtitleSize === sz
                          ? 'bg-[#39D9E6]/20 border-[#39D9E6] text-[#39D9E6]'
                          : 'bg-[#1E293B] border-[#334155] text-slate-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-300 block mb-1.5 font-bold">UI Font Family</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['MONO', 'SANS'] as const).map((font) => (
                    <button
                      key={font}
                      onClick={() => updateSettings({ fontFamily: font })}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        settings.fontFamily === font
                          ? 'bg-[#39D9E6]/20 border-[#39D9E6] text-[#39D9E6]'
                          : 'bg-[#1E293B] border-[#334155] text-slate-400'
                      }`}
                    >
                      {font === 'MONO' ? 'Atmospheric Mono' : 'Clean Sans-Serif'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* High Contrast & Motion Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#07111F] p-4 rounded-xl border border-[#334155]">
              <button
                onClick={() => updateSettings({ highContrastUI: !settings.highContrastUI })}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  settings.highContrastUI
                    ? 'bg-[#102A43] border-[#39D9E6] text-[#39D9E6]'
                    : 'bg-[#1E293B] border-[#334155] text-slate-400'
                }`}
              >
                <span>High-Contrast UI Borders</span>
                <span className="text-[10px]">{settings.highContrastUI ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  settings.reducedMotion
                    ? 'bg-[#102A43] border-[#39D9E6] text-[#39D9E6]'
                    : 'bg-[#1E293B] border-[#334155] text-slate-400'
                }`}
              >
                <span>Reduced Camera Motion & Sway</span>
                <span className="text-[10px]">{settings.reducedMotion ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => updateSettings({ reducedFog: !settings.reducedFog })}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  settings.reducedFog
                    ? 'bg-[#102A43] border-[#39D9E6] text-[#39D9E6]'
                    : 'bg-[#1E293B] border-[#334155] text-slate-400'
                }`}
              >
                <span>Reduced Exterior Fog (Clarity)</span>
                <span className="text-[10px]">{settings.reducedFog ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => updateSettings({ reducedFlashing: !settings.reducedFlashing })}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  settings.reducedFlashing
                    ? 'bg-[#102A43] border-[#39D9E6] text-[#39D9E6]'
                    : 'bg-[#1E293B] border-[#334155] text-slate-400'
                }`}
              >
                <span>Photosensitive (Reduced Flashes)</span>
                <span className="text-[10px]">{settings.reducedFlashing ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        )}

        {/* --- TAB 3: SOUNDSCAPE AUDIO --- */}
        {activeTab === 'AUDIO' && (
          <div className="space-y-4 bg-[#07111F] p-4 rounded-xl border border-[#334155] animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-[#39D9E6] uppercase tracking-wider">
              <Volume2 className="w-4 h-4" />
              <span>Synthesized Acoustic Levels</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Storm & Gale Ambience</span>
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

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Radio Voices & Tapes</span>
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
        )}

        {/* --- TAB 4: RESET & SAFEGUARD CONTROLS --- */}
        {activeTab === 'RESET' && (
          <div className="space-y-4 animate-fade-in">
            {/* Option A: Reset Main Progress */}
            <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5B960] uppercase">
                <RotateCcw className="w-4 h-4" />
                <span>Reset Main Campaign Progress</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clears only the active shift checkpoint, temporary puzzle progress, and current inventory. Your unlocked endings gallery, persistent evidence discoveries, snapshot journal, and custom settings remain completely intact.
              </p>
              <button
                onClick={() => setShowMainResetConfirm(true)}
                className="mt-2 px-4 py-2 bg-[#1E293B] hover:bg-[#F5B960] hover:text-[#07111F] text-[#F5B960] rounded-lg text-xs font-bold transition-colors"
              >
                Reset Main Shift Progress
              </button>
            </div>

            {/* Option B: Reset Everything */}
            <div className="bg-[#07111F] p-4 rounded-xl border border-[#D94141]/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94141] uppercase">
                <Trash2 className="w-4 h-4" />
                <span>Reset Everything (Complete Wipe)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Permanently wipes all local game data, including completed endings, chapter select milestones, snapshot journal entries, discovered lore archive, and custom settings.
              </p>
              <button
                onClick={() => setShowFullResetConfirm(true)}
                className="mt-2 px-4 py-2 bg-[#D94141]/20 hover:bg-[#D94141] text-[#D94141] hover:text-white border border-[#D94141]/50 rounded-lg text-xs font-bold transition-colors"
              >
                Reset Everything
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Modal for Reset Main Progress */}
        {showMainResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#0F172A] border-2 border-[#F5B960] p-5 rounded-xl max-w-md text-center space-y-3">
              <AlertTriangle className="w-8 h-8 text-[#F5B960] mx-auto" />
              <h3 className="text-sm font-bold text-slate-100 uppercase">Confirm Reset Main Progress</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                This will reset your current shift checkpoint back to 01:13 AM. Unlocked endings and Snapshot Journal entries will NOT be removed.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowMainResetConfirm(false)}
                  className="px-4 py-1.5 bg-[#1E293B] text-slate-300 rounded-lg text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMainReset}
                  className="px-4 py-1.5 bg-[#F5B960] text-black rounded-lg text-xs font-bold"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal for Reset Everything */}
        {showFullResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#0F172A] border-2 border-[#D94141] p-5 rounded-xl max-w-md text-center space-y-3">
              <Trash2 className="w-8 h-8 text-[#D94141] mx-auto" />
              <h3 className="text-sm font-bold text-slate-100 uppercase">Confirm Complete Data Wipe</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                WARNING: The following data will be PERMANENTLY removed:
              </p>
              <ul className="text-[11px] text-left text-red-300 bg-[#07111F] p-3 rounded-lg border border-[#D94141]/30 space-y-1">
                <li>• All 3 Unlocked Endings (The Beacon, Silent Frequency, Unknown Signal)</li>
                <li>• Timeline Chapter Select Milestones</li>
                <li>• Complete Snapshot Journal & Discovered Evidence Archive</li>
                <li>• Active Shift Checkpoints & Inventory</li>
                <li>• Custom Sound & Accessibility Settings</li>
              </ul>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowFullResetConfirm(false)}
                  className="px-4 py-1.5 bg-[#1E293B] text-slate-300 rounded-lg text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFullReset}
                  className="px-4 py-1.5 bg-[#D94141] text-white rounded-lg text-xs font-bold"
                >
                  Wipe All Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-[#334155] pt-3">
          <span className="text-xs text-slate-400">Settings are automatically persisted to local storage.</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#334155] hover:bg-[#475569] text-white rounded-lg font-bold text-xs transition-colors"
          >
            Save & Return
          </button>
        </div>
      </div>
    </div>
  );
}
