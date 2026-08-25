import { useState, useEffect } from 'react';
import { useGameState } from '../../game/state/useGameState';
import { CASSETTE_TRANSCRIPTS } from '../../game/constants/gameData';
import { soundEngine } from '../../game/audio/SoundEngine';
import { X, Play, Square, Disc, Volume2, Radio, CheckCircle, HelpCircle } from 'lucide-react';

export function CassettePlayerUI() {
  const cassettePlayerOpen = useGameState((state) => state.cassettePlayerOpen);
  const closeCassettePlayer = useGameState((state) => state.closeCassettePlayer);
  const activeCassetteId = useGameState((state) => state.activeCassetteId);
  const completeTapeDecryption = useGameState((state) => state.completeTapeDecryption);
  const hasPlayedTapeA = useGameState((state) => state.hasPlayedTapeA);

  const [isPlaying, setIsPlaying] = useState(false);
  const [tapeProgress, setTapeProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setTapeProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + 1.2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!cassettePlayerOpen) return null;

  const isTapeA = activeCassetteId === 'cassette_tape_a';
  const transcript = isTapeA ? CASSETTE_TRANSCRIPTS.TAPE_A : CASSETTE_TRANSCRIPTS.TAPE_B;

  const handlePlay = () => {
    setIsPlaying(true);
    setTapeProgress(0);
    soundEngine.playUIClick();

    soundEngine.speakRadioTransmission(transcript, () => {
      setIsPlaying(false);
      setTapeProgress(100);
      if (isTapeA && !hasPlayedTapeA) {
        completeTapeDecryption();
      }
    });
  };

  const handleStop = () => {
    setIsPlaying(false);
    soundEngine.playUIClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-slate-100 font-mono select-none">
      <div className="relative w-full max-w-xl bg-[#0F172A] border-4 border-[#334155] rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#334155] pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#102A43] text-[#39D9E6]">
              <Disc className="w-6 h-6 animate-spin" style={{ animationDuration: isPlaying ? '3s' : '0s' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
                ARCHIVE TAPE RECORDER DECK
              </h2>
              <p className="text-xs text-slate-400">
                {isTapeA ? 'Cassette #1: "BLACK TIDE LOG - 1986"' : 'Cassette #2: "DISTRESS RELAY"'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              handleStop();
              closeCassettePlayer();
            }}
            className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vintage Tape Window Animation */}
        <div className="bg-[#07111F] p-6 rounded-xl border-2 border-[#1E293B] flex flex-col items-center gap-4 relative overflow-hidden">
          {/* Tape Cassette Shell */}
          <div className="relative w-full max-w-sm h-32 bg-[#1E293B] rounded-xl border-4 border-[#334155] p-3 flex justify-between items-center shadow-inner">
            {/* Left Reel */}
            <div className="w-16 h-16 rounded-full border-4 border-dashed border-[#94A3B8] bg-[#0F172A] flex items-center justify-center">
              <div
                className={`w-6 h-6 rounded-full bg-[#334155] border-2 border-[#94A3B8] ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '2s' }}
              />
            </div>

            {/* Center Label */}
            <div className="flex-1 mx-3 h-20 bg-[#F1F5F9] text-[#0F172A] rounded p-2 flex flex-col justify-between text-center">
              <span className="text-[9px] font-black uppercase tracking-wider">
                {isTapeA ? 'BLACK TIDE INCIDENT' : 'MAYDAY RECORDING'}
              </span>
              <span className="text-[10px] font-mono font-bold text-[#D94141]">
                {isTapeA ? 'OCT 13, 1986 / VANCE' : 'S.S. CALYPSO DISTRESS'}
              </span>
              <span className="text-[8px] text-slate-500">MAGNETIC STEREO REEL</span>
            </div>

            {/* Right Reel */}
            <div className="w-16 h-16 rounded-full border-4 border-dashed border-[#94A3B8] bg-[#0F172A] flex items-center justify-center">
              <div
                className={`w-6 h-6 rounded-full bg-[#334155] border-2 border-[#94A3B8] ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '2s' }}
              />
            </div>
          </div>

          {/* Playback Progress Bar */}
          <div className="w-full max-w-sm">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>REEL PROGRESS</span>
              <span className="text-[#39D9E6]">{Math.round(tapeProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#39D9E6] transition-all duration-100"
                style={{ width: `${tapeProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Live Audio Dialogue Subtitle Box */}
        <div className="bg-[#07111F] p-4 rounded-xl border border-[#334155] text-xs text-slate-200 leading-relaxed min-h-[80px]">
          <span className="text-[9px] font-bold text-[#39D9E6] uppercase tracking-widest block mb-1">
            [ TAPE AUDIO TRANSCRIPT ]
          </span>
          <p className="font-mono">{isPlaying ? transcript : 'Press PLAY to start magnetic reel playback and listen for clues.'}</p>
        </div>

        {/* Controls Bar */}
        <div className="flex justify-between items-center border-t border-[#334155] pt-4">
          <div className="flex gap-2.5">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
                isPlaying
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-[#39D9E6] hover:bg-[#22d3ee] text-[#07111F] hover:scale-105'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY REEL</span>
            </button>

            <button
              onClick={handleStop}
              disabled={!isPlaying}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
                !isPlaying
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-[#D94141] hover:bg-red-600 text-white'
              }`}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>STOP</span>
            </button>
          </div>

          <button
            onClick={() => {
              handleStop();
              closeCassettePlayer();
            }}
            className="px-4 py-2 bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white rounded font-bold text-xs transition-colors"
          >
            Leave Tape Deck [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
