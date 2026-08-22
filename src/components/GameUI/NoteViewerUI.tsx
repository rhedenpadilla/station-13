import { useGameState } from '../../game/state/useGameState';
import { X, FileText, Bookmark } from 'lucide-react';

export function NoteViewerUI() {
  const activeNote = useGameState((state) => state.activeNote);
  const closeNoteViewer = useGameState((state) => state.closeNoteViewer);

  if (!activeNote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      {/* Paper Document Card */}
      <div className="relative w-full max-w-xl bg-[#F8FAFC] text-[#0F172A] rounded-lg shadow-2xl p-8 border-4 border-[#94A3B8] flex flex-col gap-5 handwritten rotate-[-0.5deg]">
        {/* Top Header */}
        <div className="flex justify-between items-start border-b-2 border-[#CBD5E1] pb-4">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#1E293B]" />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#0F172A] uppercase">
                {activeNote.title}
              </h2>
              <p className="text-xs text-[#475569] font-sans font-medium">
                {activeNote.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={closeNoteViewer}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-700 transition-colors font-sans"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meta Info */}
        <div className="flex justify-between text-xs font-sans text-[#64748B] bg-slate-100 p-2 rounded">
          <span>DATE: {activeNote.date}</span>
          <span>LOGGED BY: {activeNote.author}</span>
        </div>

        {/* Note Body Content */}
        <div className="space-y-3.5 text-base leading-relaxed text-[#1E293B]">
          {activeNote.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Footer / Close CTA */}
        <div className="flex justify-between items-center border-t-2 border-[#CBD5E1] pt-4 mt-2 font-sans">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Bookmark className="w-3.5 h-3.5 text-[#F5B960]" />
            <span>Station Archive 13-D</span>
          </div>
          <button
            onClick={closeNoteViewer}
            className="px-5 py-2 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded font-medium text-xs transition-colors shadow"
          >
            Put Down Note [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
