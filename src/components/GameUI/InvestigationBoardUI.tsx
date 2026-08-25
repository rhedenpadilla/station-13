import { useState } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { EVIDENCE_DATABASE, EvidenceItem } from '../../game/constants/evidenceData';
import { OBJECTIVES } from '../../game/constants/gameData';
import {
  X,
  Search,
  Radio,
  FileText,
  Disc,
  Zap,
  ShieldAlert,
  HelpCircle,
  CheckCircle,
  Compass,
} from 'lucide-react';

export function InvestigationBoardUI() {
  const investigationBoardOpen = useGameState((state) => state.investigationBoardOpen);
  const closeInvestigationBoard = useGameState((state) => state.closeInvestigationBoard);
  const evidenceUnlocked = useGameState((state) => state.evidenceUnlocked);
  const currentObjectiveIndex = useGameState((state) => state.currentObjectiveIndex);

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);

  if (!investigationBoardOpen) return null;

  const currentObjective = OBJECTIVES[currentObjectiveIndex] || OBJECTIVES[0];
  const allEvidenceIds = Object.keys(EVIDENCE_DATABASE);
  const unlockedCount = evidenceUnlocked.length;

  const categories = [
    { id: 'ALL', label: 'All Files' },
    { id: 'RADIO', label: 'Radio Signals' },
    { id: 'BLACK_TIDE', label: 'Black Tide 1986' },
    { id: 'PERSONNEL', label: 'Station Staff' },
    { id: 'BEACON', label: 'Beacon Array' },
    { id: 'ANOMALIES', label: '01:13 Anomalies' },
  ];

  const getEvidenceIcon = (icon: string) => {
    switch (icon) {
      case 'radio':
        return <Radio className="w-5 h-5 text-[#39D9E6]" />;
      case 'tape':
        return <Disc className="w-5 h-5 text-[#F5B960]" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-[#F5B960]" />;
      case 'alert':
        return <ShieldAlert className="w-5 h-5 text-[#D94141]" />;
      case 'file':
      default:
        return <FileText className="w-5 h-5 text-[#93C5FD]" />;
    }
  };

  const activeEvidence = selectedEvidenceId
    ? EVIDENCE_DATABASE[selectedEvidenceId] || null
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      {/* Board Unit Cabinet */}
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#07111F] border-4 border-[#102A43] rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-[#102A43] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#102A43] text-[#39D9E6]">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
                STATION 13 INVESTIGATION BOARD
              </h2>
              <p className="text-xs text-slate-400">
                Evidence Files Discovered: {unlockedCount} / {allEvidenceIds.length} | Shift Time: 01:13 AM
              </p>
            </div>
          </div>

          {/* Active Directive Quick Header */}
          <div className="hidden md:flex items-center gap-2 bg-[#0F172A] border border-[#1E293B] px-3.5 py-1.5 rounded-lg text-xs">
            <Compass className="w-4 h-4 text-[#39D9E6] animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-[#39D9E6] font-bold">Directive #{currentObjective.id + 1}:</span>
            <span className="text-slate-300 truncate max-w-xs">{currentObjective.title}</span>
          </div>

          <button
            onClick={closeInvestigationBoard}
            className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto py-2 border-b border-[#102A43]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#39D9E6] text-[#07111F]'
                  : 'bg-[#0F172A] text-slate-400 hover:text-slate-200 hover:bg-[#1E293B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Board Main Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 overflow-y-auto py-4">
          {/* Left 2 Columns: Pinned Clues Grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 overflow-y-auto pr-1">
            {allEvidenceIds
              .filter((id) => {
                const item = EVIDENCE_DATABASE[id];
                if (selectedCategory === 'ALL') return true;
                return item.category === selectedCategory;
              })
              .map((id) => {
                const item = EVIDENCE_DATABASE[id];
                const isUnlocked = evidenceUnlocked.includes(id);
                const isSelected = selectedEvidenceId === id;

                return (
                  <div
                    key={id}
                    onClick={() => isUnlocked && setSelectedEvidenceId(id)}
                    className={`relative p-4 rounded-xl border flex flex-col justify-between gap-2 transition-all ${
                      !isUnlocked
                        ? 'bg-[#0F172A]/40 border-[#1E293B] opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#102A43] border-[#39D9E6] shadow-[0_0_15px_rgba(57,217,230,0.3)] cursor-pointer'
                        : 'bg-[#0F172A] border-[#1E293B] hover:border-[#39D9E6]/50 hover:bg-[#102A43]/50 cursor-pointer'
                    }`}
                  >
                    {/* Top Pin & Category Tag */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {isUnlocked ? getEvidenceIcon(item.icon) : <HelpCircle className="w-5 h-5 text-slate-600" />}
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          {isUnlocked ? item.category : 'UNDISCOVERED'}
                        </span>
                      </div>
                      <span className="text-[9px] text-[#F5B960] bg-[#1E293B] px-1.5 py-0.5 rounded">
                        {isUnlocked ? item.timestamp : '???'}
                      </span>
                    </div>

                    {/* Title & Summary Preview */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-100 line-clamp-1">
                        {isUnlocked ? item.title : 'Unclassified Station Anomaly'}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {isUnlocked ? item.summary : 'Search the station facilities and documents to reveal this connection.'}
                      </p>
                    </div>

                    {/* Thread links badge */}
                    {isUnlocked && item.connectedTo.length > 0 && (
                      <div className="text-[9px] text-[#39D9E6] font-mono flex items-center gap-1 border-t border-[#1E293B] pt-1.5 mt-1">
                        <span>🔗 Connected Links:</span>
                        <span className="text-slate-300 font-bold">{item.connectedTo.length} threads</span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Right Column: In-Depth Clue Dossier & Connection Map */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-[#1E293B] flex flex-col justify-between overflow-y-auto">
            {activeEvidence ? (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-[#1E293B] pb-2">
                  <span className="text-[10px] text-[#39D9E6] uppercase tracking-widest block mb-0.5">
                    CLASSIFIED FILE DOSSIER
                  </span>
                  <h3 className="text-base font-bold text-slate-100">{activeEvidence.title}</h3>
                  <span className="text-xs text-[#F5B960]">{activeEvidence.subtitle}</span>
                </div>

                <div className="bg-[#07111F] p-3 rounded-lg border border-[#1E293B] text-xs text-slate-200 leading-relaxed">
                  <span className="text-[9px] text-slate-400 uppercase block mb-1 font-bold">
                    SUMMARY OF FINDINGS:
                  </span>
                  {activeEvidence.summary}
                </div>

                {/* Connection Thread Nodes */}
                <div>
                  <span className="text-[10px] font-bold text-[#39D9E6] uppercase tracking-wider block mb-2">
                    EVIDENCE CONNECTION THREADS
                  </span>
                  <div className="space-y-1.5">
                    {activeEvidence.connectedTo.map((targetId) => {
                      const target = EVIDENCE_DATABASE[targetId];
                      const isTargetUnlocked = evidenceUnlocked.includes(targetId);

                      return (
                        <div
                          key={targetId}
                          onClick={() => isTargetUnlocked && setSelectedEvidenceId(targetId)}
                          className={`p-2 rounded-lg text-[11px] border flex items-center justify-between transition-colors ${
                            isTargetUnlocked
                              ? 'bg-[#102A43] border-[#39D9E6]/40 text-slate-200 hover:border-[#39D9E6] cursor-pointer'
                              : 'bg-[#07111F] border-[#1E293B] text-slate-500'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-[#D94141] font-bold">🧵</span>
                            <span className="truncate">{isTargetUnlocked && target ? target.title : 'Locked Related Clue'}</span>
                          </div>
                          {isTargetUnlocked && <CheckCircle className="w-3.5 h-3.5 text-[#39D9E6] flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <Search className="w-12 h-12 mb-3 opacity-30 text-[#39D9E6]" />
                <h4 className="text-sm font-bold text-slate-400">SELECT AN EVIDENCE CARD</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Click on any unlocked clue card on the left to read its full report and inspect connecting threads across the Black Tide timeline.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-[#102A43] pt-3 text-xs text-slate-400">
          <span>Press [TAB] or [B] to toggle Investigation Board</span>
          <button
            onClick={closeInvestigationBoard}
            className="px-6 py-2 bg-[#334155] hover:bg-[#475569] text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Return to Shift [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
