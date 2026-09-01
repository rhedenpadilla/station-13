import { useState } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { SNAPSHOT_DATABASE, SnapshotItem } from '../../game/constants/snapshotData';
import {
  X,
  Camera,
  Clock,
  Radio,
  Eye,
  FileText,
  TowerControl as Tower,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function SnapshotJournalModal({ onClose }: Props) {
  const snapshots = useGameState((state) => state.snapshots);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string | null>(null);

  const allSnapshotKeys = Object.keys(SNAPSHOT_DATABASE);
  const discoveredCount = snapshots.length;
  const totalCount = allSnapshotKeys.length;

  const categories = [
    { id: 'ALL', label: 'All Entries' },
    { id: 'ALTERED_OBJECTS', label: 'Altered Objects' },
    { id: 'RADIO_ANOMALIES', label: 'Radio Anomalies' },
    { id: 'OCEAN_SIGHTINGS', label: 'Ocean Sightings' },
    { id: 'STATION_RECORDS', label: 'Station Records' },
    { id: 'SIGNAL_TOWER_EVENTS', label: 'Signal Tower Events' },
  ];

  const getSnapshotIcon = (iconType: string) => {
    switch (iconType) {
      case 'clock':
        return <Clock className="w-5 h-5 text-[#38BDF8]" />;
      case 'radio':
      case 'waves':
        return <Radio className="w-5 h-5 text-[#39D9E6]" />;
      case 'eye':
        return <Eye className="w-5 h-5 text-[#38BDF8]" />;
      case 'file':
        return <FileText className="w-5 h-5 text-[#F5B960]" />;
      case 'tower':
        return <Tower className="w-5 h-5 text-[#C084FC]" />;
      case 'sparkles':
      case 'photo':
      default:
        return <Sparkles className="w-5 h-5 text-[#F5B960]" />;
    }
  };

  const activeSnapshot = selectedSnapshotId ? SNAPSHOT_DATABASE[selectedSnapshotId] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#07111F] border-4 border-[#102A43] rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#102A43] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#102A43] text-[#F5B960]">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider text-slate-100">
                STATION 13 SNAPSHOT JOURNAL
              </h2>
              <p className="text-xs text-slate-400">
                Persistent Profile Discoveries: {discoveredCount} / {totalCount} Recorded ({Math.round((discoveredCount / totalCount) * 100)}%)
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

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto py-2 border-b border-[#102A43]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#F5B960] text-[#07111F]'
                  : 'bg-[#0F172A] text-slate-400 hover:text-slate-200 hover:bg-[#1E293B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 overflow-y-auto py-4">
          {/* Left 2 Columns: Snapshot Cards */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 overflow-y-auto pr-1">
            {allSnapshotKeys
              .filter((id) => {
                const item = SNAPSHOT_DATABASE[id];
                if (selectedCategory === 'ALL') return true;
                return item.category === selectedCategory;
              })
              .map((id) => {
                const item = SNAPSHOT_DATABASE[id];
                const isDiscovered = snapshots.includes(id);
                const isSelected = selectedSnapshotId === id;

                return (
                  <div
                    key={id}
                    onClick={() => isDiscovered && setSelectedSnapshotId(id)}
                    className={`p-4 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                      !isDiscovered
                        ? 'bg-[#0F172A]/40 border-[#1E293B] opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#102A43] border-[#F5B960] shadow-[0_0_15px_rgba(245,185,96,0.3)] cursor-pointer'
                        : 'bg-[#0F172A] border-[#1E293B] hover:border-[#F5B960]/50 hover:bg-[#102A43]/50 cursor-pointer'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {isDiscovered ? getSnapshotIcon(item.iconType) : <Lock className="w-5 h-5 text-slate-600" />}
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          {isDiscovered ? item.location : 'UNDISCOVERED LOCATION'}
                        </span>
                      </div>
                      <span className="text-[9px] text-[#39D9E6] bg-[#1E293B] px-1.5 py-0.5 rounded">
                        {isDiscovered ? item.timestampLabel : '???'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-100 line-clamp-1">
                        {isDiscovered ? item.title : 'Unrecorded Anomaly Event'}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {isDiscovered ? item.description : 'Encounter this event or station anomaly during a playthrough to record.'}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] border-t border-[#1E293B] pt-2 text-slate-500">
                      <span>Chapter: {isDiscovered ? item.chapter : '???'}</span>
                      {isDiscovered && (
                        <span className="text-[#63D471] flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ARCHIVED
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Right Column: Detailed Snapshot Inspection Dossier */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-[#1E293B] flex flex-col justify-between overflow-y-auto">
            {activeSnapshot ? (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-[#1E293B] pb-2">
                  <span className="text-[10px] text-[#F5B960] uppercase tracking-widest block mb-0.5 font-bold">
                    ARCHIVED JOURNAL ENTRY
                  </span>
                  <h3 className="text-base font-bold text-slate-100">{activeSnapshot.title}</h3>
                  <span className="text-xs text-[#39D9E6]">{activeSnapshot.location}</span>
                </div>

                {/* Prepared Visual Simulation Frame */}
                <div className="w-full h-36 rounded-lg bg-[#07111F] border-2 border-[#1E293B] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="mb-2 p-3 rounded-full bg-[#102A43] text-[#F5B960] shadow-md">
                    {getSnapshotIcon(activeSnapshot.iconType)}
                  </div>
                  <span className="text-xs font-bold text-slate-200 z-10">{activeSnapshot.title}</span>
                  <span className="text-[10px] text-slate-400 z-10 mt-0.5">{activeSnapshot.chapter}</span>
                </div>

                <div className="bg-[#07111F] p-3 rounded-lg border border-[#1E293B] text-xs text-slate-200 leading-relaxed">
                  <span className="text-[9px] text-slate-400 uppercase block mb-1 font-bold">
                    OBSERVATION DETAILS:
                  </span>
                  {activeSnapshot.description}
                </div>

                <div className="text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Sector:</span>
                    <strong className="text-slate-200">{activeSnapshot.location}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeline Phase:</span>
                    <strong className="text-[#39D9E6]">{activeSnapshot.chapter}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <strong className="text-[#F5B960]">{activeSnapshot.category}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <Camera className="w-12 h-12 mb-3 opacity-30 text-[#F5B960]" />
                <h4 className="text-sm font-bold text-slate-400">SELECT A SNAPSHOT ENTRY</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Click any recorded card on the left to review its anomaly description, sector notes, and acquisition metadata.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-[#102A43] pt-3 text-xs text-slate-400">
          <span>Snapshots persist across playthroughs and New Game+</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#334155] hover:bg-[#475569] text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Close Journal
          </button>
        </div>
      </div>
    </div>
  );
}
