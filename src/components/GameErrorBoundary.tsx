import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw, Home, RefreshCw } from 'lucide-react';
import { useGameState } from '../game/state/useGameState';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class GameErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected rendering anomaly occurred in Station 13.',
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Station 13 Runtime Diagnostic Log:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  handleReturnToTitle = () => {
    try {
      useGameState.getState().exitToTitle();
    } catch {
      window.location.reload();
    }
    this.setState({ hasError: false, errorMessage: '' });
  };

  handleResetProgression = () => {
    try {
      useGameState.getState().resetMainProgression();
      useGameState.getState().exitToTitle();
    } catch {
      window.location.reload();
    }
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111F] text-slate-100 font-mono p-6 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#102A43]/80 via-[#07111F] to-black opacity-90 pointer-events-none" />
          <div className="absolute inset-0 crt-overlay pointer-events-none" />

          <div className="relative z-10 max-w-lg w-full bg-[#0F172A] border-2 border-[#D94141] rounded-2xl p-6 shadow-2xl space-y-4 text-center">
            <div className="p-3 bg-[#D94141]/20 text-[#D94141] rounded-xl w-fit mx-auto border border-[#D94141]/40">
              <AlertOctagon className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-100 uppercase tracking-wider">
                STATION TELEMETRY INTERRUPTION
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                The graphical interface encountered an unexpected rendering anomaly. Your persistent profile, discovered evidence, and ending achievements remain safe in local browser storage.
              </p>
            </div>

            <div className="bg-[#07111F] p-3 rounded-xl border border-[#334155] text-left text-xs text-slate-300 space-y-1">
              <span className="text-[10px] font-bold text-[#F5B960] uppercase block">
                RECOVERY PROTOCOLS
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Choose an action below to restore telemetry. If this occurs repeatedly on lower-end devices, try selecting the Low Graphics preset in Settings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={this.handleRetry}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#39D9E6] hover:bg-[#38BDF8] text-[#07111F] font-bold text-xs rounded-xl transition-all shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Scene</span>
              </button>

              <button
                onClick={this.handleReturnToTitle}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#1E293B] hover:bg-[#334155] text-slate-200 font-bold text-xs rounded-xl border border-[#334155] transition-all"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Menu</span>
              </button>
            </div>

            <div className="pt-2 border-t border-[#1E293B]">
              <button
                onClick={this.handleResetProgression}
                className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 hover:text-[#F5B960] transition-colors mx-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Shift Checkpoint (Keep Unlocked Endings & Profile)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
