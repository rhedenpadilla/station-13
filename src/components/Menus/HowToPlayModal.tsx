import { X, Keyboard, Smartphone, Compass, Radio, Flashlight, Backpack, Search, Hand } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function HowToPlayModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-y-auto p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#102A43] text-[#39D9E6]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
                OPERATIONAL PROTOCOLS & CONTROLS
              </h2>
              <p className="text-xs text-slate-400">
                Station 13 Field Manual • Desktop & Touch Navigation Guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Column: Keyboard & Touch Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Keyboard & Mouse Controls Card */}
          <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#39D9E6] border-b border-[#1E293B] pb-2">
              <Keyboard className="w-4 h-4" />
              <span>DESKTOP KEYBOARD & MOUSE</span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between items-center bg-[#0F172A] p-2 rounded">
                <span className="text-white font-bold">[W / A / S / D] or [Arrows]</span>
                <span className="text-slate-400">Move Operator</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] p-2 rounded">
                <span className="text-white font-bold">Mouse Drag / Look</span>
                <span className="text-slate-400">Aim & Rotate Camera</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] p-2 rounded">
                <span className="text-white font-bold">[Left Shift]</span>
                <span className="text-slate-400">Sprint / Fast Walk</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] p-2 rounded">
                <span className="text-[#39D9E6] font-bold">[E] or Left Click</span>
                <span className="text-slate-400">Interact with objects</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] p-2 rounded">
                <span className="text-[#F5B960] font-bold">[F]</span>
                <span className="text-slate-400">Toggle Flashlight</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] p-2 rounded">
                <span className="text-[#F5B960] font-bold">[I]</span>
                <span className="text-slate-400">Open Inventory</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] p-2 rounded">
                <span className="text-[#38BDF8] font-bold">[TAB] / [B]</span>
                <span className="text-slate-400">Investigation Board</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] p-2 rounded">
                <span className="text-slate-400 font-bold">[ESC]</span>
                <span className="text-slate-400">Pause / Close Menus</span>
              </div>
            </div>
          </div>

          {/* Touch & On-Screen Virtual Controls Card */}
          <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F5B960] border-b border-[#1E293B] pb-2">
              <Smartphone className="w-4 h-4" />
              <span>TOUCH & ON-SCREEN CONTROLS</span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="bg-[#0F172A] p-2 rounded">
                <span className="text-white font-bold block mb-0.5">Lower-Left 4-Way D-Pad:</span>
                <span className="text-slate-400">Press and hold directional arrows (Up, Down, Left, Right) with cyan glow for continuous walking.</span>
              </div>

              <div className="bg-[#0F172A] p-2 rounded">
                <span className="text-white font-bold block mb-0.5">Right-Screen Look Zone:</span>
                <span className="text-slate-400">Swipe or drag anywhere on the right half of the screen to rotate camera freely.</span>
              </div>

              <div className="bg-[#0F172A] p-2 rounded">
                <span className="text-[#39D9E6] font-bold block mb-0.5">Interact [E] Button:</span>
                <span className="text-slate-400">Pulses with glowing cyan ring whenever you are near an inspectable item, console, or door.</span>
              </div>

              <div className="bg-[#0F172A] p-2 rounded">
                <span className="text-[#F5B960] font-bold block mb-0.5">Action Bar (Bottom Right):</span>
                <span className="text-slate-400">Dedicated buttons for Flashlight, Inventory [I], Investigation Board, and Pause.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Gameplay Tips */}
        <div className="bg-[#0B132B] p-4 rounded-xl border border-[#1E3A8A] text-xs text-slate-300 space-y-2 leading-relaxed">
          <span className="text-[10px] font-bold text-[#39D9E6] uppercase tracking-wider block">
            STATION SURVIVAL & INVESTIGATION PROTOCOL
          </span>
          <p>• <strong>Radio Tuning:</strong> Adjust frequencies smoothly. Watch the S-Meter gauge and oscilloscope waveform for coherent harmonic peaks.</p>
          <p>• <strong>Sanity Meter:</strong> Outside on the Observation Deck in the heavy squall, keep your flashlight ON to prevent temporal destabilization.</p>
          <p>• <strong>Investigation Board:</strong> Whenever you inspect documents or hear recordings, clues are pinned to your board with red connection threads.</p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end border-t border-[#334155] pt-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3 bg-[#39D9E6] hover:bg-[#22d3ee] text-[#07111F] rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
          >
            Understood • Return to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
