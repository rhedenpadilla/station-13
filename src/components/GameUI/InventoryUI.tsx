import { useGameState } from '../../game/state/useGameState';
import { INVENTORY_ITEMS, InventoryItem } from '../../game/constants/inventoryData';
import { X, Backpack, Key, Disc, FileText, Zap, Eye, Check } from 'lucide-react';

export function InventoryUI() {
  const inventoryOpen = useGameState((state) => state.inventoryOpen);
  const closeInventory = useGameState((state) => state.closeInventory);
  const inventory = useGameState((state) => state.inventory);
  const inspectedItemId = useGameState((state) => state.inspectedItemId);
  const setInspectedItem = useGameState((state) => state.setInspectedItem);

  if (!inventoryOpen) return null;

  const inspectedItem: InventoryItem | null = inspectedItemId ? INVENTORY_ITEMS[inspectedItemId] || null : null;

  const getItemIcon = (iconType: string) => {
    switch (iconType) {
      case 'fuse':
        return <Zap className="w-8 h-8 text-[#F5B960]" />;
      case 'key':
        return <Key className="w-8 h-8 text-[#F5B960]" />;
      case 'tape':
        return <Disc className="w-8 h-8 text-[#39D9E6]" />;
      case 'map':
      case 'note':
      default:
        return <FileText className="w-8 h-8 text-[#93C5FD]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#102A43] text-[#F5B960]">
              <Backpack className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
                STATION INVENTORY & ESSENTIALS
              </h2>
              <p className="text-xs text-slate-400">
                {inventory.length} / 6 Key Items Recovered
              </p>
            </div>
          </div>
          <button
            onClick={closeInventory}
            className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Grid: Item Slots & Inspection Pane */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: 6 Item Slots */}
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(INVENTORY_ITEMS).map((id) => {
              const item = INVENTORY_ITEMS[id];
              const isCollected = inventory.includes(id);
              const isSelected = inspectedItemId === id;

              return (
                <button
                  key={id}
                  disabled={!isCollected}
                  onClick={() => setInspectedItem(id)}
                  className={`p-3.5 rounded-xl border flex flex-col items-center text-center justify-between gap-2 transition-all ${
                    !isCollected
                      ? 'bg-[#07111F]/50 border-[#1E293B] opacity-40 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#102A43] border-[#39D9E6] shadow-[0_0_15px_rgba(57,217,230,0.3)] scale-[1.02]'
                      : 'bg-[#1E293B]/70 border-[#334155] hover:border-[#39D9E6]/60 hover:bg-[#1E293B]'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#07111F]/80">
                    {isCollected ? getItemIcon(item.iconType) : <div className="w-8 h-8 rounded border border-dashed border-slate-600 flex items-center justify-center text-[10px] text-slate-600">EMPTY</div>}
                  </div>
                  <div className="w-full">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block truncate">
                      {isCollected ? item.category : 'SLOT'}
                    </span>
                    <h3 className="text-xs font-bold text-slate-100 line-clamp-1">
                      {isCollected ? item.name : 'Unknown Item'}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Inspection Details Card */}
          <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] flex flex-col justify-between">
            {inspectedItem ? (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F5B960] border-b border-[#1E293B] pb-2">
                  <Eye className="w-4 h-4" />
                  <span>ITEM SPECIFICATION</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#39D9E6]">{inspectedItem.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    CATEGORY: {inspectedItem.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {inspectedItem.description}
                </p>

                <div className="bg-[#0B132B] p-3 rounded-lg border border-[#1E3A8A]/50 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                  <span className="text-[9px] text-[#39D9E6] font-bold uppercase block mb-1">
                    [ INSPECTION DETAIL ]
                  </span>
                  {inspectedItem.inspectionDetail}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <Backpack className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-xs font-mono">Select an inventory item on the left to inspect its details and usage hints.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-[#334155] pt-3 text-xs text-slate-400">
          <span>Press [I] or click close to return to station</span>
          <button
            onClick={closeInventory}
            className="px-5 py-2 bg-[#334155] hover:bg-[#475569] text-white rounded font-bold transition-colors"
          >
            Close [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
