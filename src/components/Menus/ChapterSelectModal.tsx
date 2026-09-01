import { useGameState } from '../../game/state/useGameState';
import { CHAPTER_LIST, ChapterInfo } from '../../game/constants/chapterData';
import {
  X,
  Play,
  Lock,
  Compass,
  Radio,
  Zap,
  FileText,
  TowerControl as Tower,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function ChapterSelectModal({ onClose }: Props) {
  const unlockedChapters = useGameState((state) => state.unlockedChapters);
  const hasCompletedBefore = useGameState((state) => state.hasCompletedBefore);
  const endingsUnlocked = useGameState((state) => state.endingsUnlocked);
  const startChapterReplay = useGameState((state) => state.startChapterReplay);

  const hasUnlockedAny =
    hasCompletedBefore ||
    endingsUnlocked.beacon ||
    endingsUnlocked.silentFrequency ||
    endingsUnlocked.unknownSignal;

  const handleSelectChapter = (chapter: ChapterInfo) => {
    startChapterReplay(chapter.id);
    onClose();
  };

  const getChapterIcon = (order: number) => {
    switch (order) {
      case 1:
        return <Radio className="w-5 h-5 text-[#39D9E6]" />;
      case 2:
        return <Zap className="w-5 h-5 text-[#F5B960]" />;
      case 3:
        return <FileText className="w-5 h-5 text-[#93C5FD]" />;
      case 4:
        return <Compass className="w-5 h-5 text-[#63D471]" />;
      case 5:
      default:
        return <Tower className="w-5 h-5 text-[#C084FC]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-y-auto p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#102A43] text-[#39D9E6]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
                TIMELINE CHAPTER SELECT (REPLAY MODE)
              </h2>
              <p className="text-xs text-slate-400">
                Jump to key milestone story sectors without overwriting your main campaign checkpoint.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safeguard Alert */}
        <div className="bg-[#102A43]/70 border border-[#39D9E6]/30 p-3.5 rounded-xl text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F5B960] flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[#39D9E6] font-bold block mb-0.5">REPLAY SAFEGUARD ACTIVE:</span>
            <p className="text-slate-300 leading-relaxed">
              Chapter replay launches a self-contained session with the required baseline items, puzzle states, and doors unlocked for that milestone. Your overall profile discoveries and endings history are always preserved.
            </p>
          </div>
        </div>

        {/* Chapter Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHAPTER_LIST.map((ch) => {
            const isUnlocked = hasUnlockedAny || unlockedChapters.includes(ch.id);

            return (
              <div
                key={ch.id}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-[#07111F] border-[#1E293B] hover:border-[#39D9E6]/60 hover:bg-[#102A43]/40 shadow-lg'
                    : 'bg-[#07111F]/40 border-[#1E293B] opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#0F172A] border border-[#1E293B]">
                      {getChapterIcon(ch.order)}
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                        MILESTONE #{ch.order}
                      </span>
                      <h3 className="text-sm font-bold text-slate-100">{ch.title}</h3>
                      <span className="text-xs text-[#F5B960]">{ch.subtitle}</span>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <span className="text-[9px] text-[#63D471] bg-[#102A43] px-2 py-0.5 rounded font-bold border border-[#63D471]/30">
                      AVAILABLE
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-500 bg-[#1E293B] px-2 py-0.5 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> LOCKED
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{ch.description}</p>

                <div className="flex justify-between items-center border-t border-[#1E293B] pt-2.5 mt-1 text-xs">
                  <span className="text-[10px] text-slate-400">Sector: {ch.startingSector}</span>
                  {isUnlocked ? (
                    <button
                      onClick={() => handleSelectChapter(ch)}
                      className="px-4 py-1.5 bg-[#39D9E6] hover:bg-[#22d3ee] text-[#07111F] font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow hover:scale-105"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Play Replay
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-500 italic">Complete shift to unlock</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-[#334155] pt-3">
          <span className="text-xs text-slate-400">
            {hasUnlockedAny ? 'All story milestones unlocked for replay.' : 'Complete at least 1 ending to unlock all chapters.'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#334155] hover:bg-[#475569] text-white rounded-lg font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
