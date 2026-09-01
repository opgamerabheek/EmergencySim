import React from 'react';
import { Clock, Wind, Eye } from 'lucide-react';
import { SimulationPhase } from '../../types/simulation';

interface StatusIndicatorsProps {
  elapsedTime: number;
  smokeLevel: number;
  visibility: number;
  phase: SimulationPhase;
}

const smokeLabel = (level: number): { text: string; color: string } => {
  if (level < 0.15) return { text: 'Clear', color: '#A9C46C' };
  if (level < 0.4) return { text: 'Bad', color: '#F5B416' };
  if (level < 0.65) return { text: 'Worse', color: '#FF7043' };
  return { text: 'Critical', color: '#8F1D14' };
};

const visLabel = (vis: number): { text: string; color: string } => {
  if (vis > 0.7) return { text: 'Good', color: '#A9C46C' };
  if (vis > 0.4) return { text: 'Reduced', color: '#F5B416' };
  if (vis > 0.2) return { text: 'Worse', color: '#FF7043' };
  return { text: 'Blurred', color: '#8F1D14' };
};

const phaseLabel: Record<SimulationPhase, { text: string; color: string }> = {
  [SimulationPhase.EXPLORE]: { text: 'EXPLORING', color: '#3F4826' },
  [SimulationPhase.DETECTION]: { text: 'DETECTION', color: '#515C32' },
  [SimulationPhase.SMALL_FIRE]: { text: 'SMALL FIRE', color: '#515C32' },
  [SimulationPhase.GROWING]: { text: 'GROWING', color: '#515C32' },
  [SimulationPhase.CRITICAL]: { text: 'CRITICAL', color: '#30371D' },
  [SimulationPhase.COMPLETED]: { text: 'COMPLETED', color: '#3F4826' },
};

export const StatusIndicators: React.FC<StatusIndicatorsProps> = ({
  elapsedTime,
  smokeLevel,
  visibility,
  phase,
}) => {
  const smoke = smokeLabel(smokeLevel);
  const vis = visLabel(visibility);
  const pLabel = phaseLabel[phase];
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <div className="glass-panel rounded-2xl p-5 w-full md:w-52 flex flex-col gap-4.5 border border-[#3F4826]/20 shadow-2xl backdrop-blur-xl">
      {/* 1. Status / Phase Badge */}
      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#050608]/70 border border-[#7D8995]/20">
        <span
          className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
          style={{ backgroundColor: pLabel.color }}
        />
        <span
          className="text-xs font-mono-data font-bold tracking-wider"
          style={{ color: pLabel.color }}
        >
          {pLabel.text}
        </span>
      </div>

      {/* 2. Time Elapsed (informational only) */}
      <div className="space-y-1 pt-1 border-t border-[#7D8995]/15">
        <div className="flex items-center gap-2 text-[#7D8995]">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px] font-mono-data tracking-wider uppercase font-semibold">Time Elapsed</span>
        </div>
        <div className="pl-5">
          <span className="countdown font-mono-data text-2xl font-bold text-[#F1F4F6] tracking-tight">
            <span
              style={{ '--value': String(minutes).padStart(2, '0') } as React.CSSProperties}
              aria-live="polite"
              aria-label={String(minutes).padStart(2, '0')}
            >
              {String(minutes).padStart(2, '0')}
            </span>
            :
            <span
              style={{ '--value': String(seconds).padStart(2, '0'), '--digits': 2 } as React.CSSProperties}
              aria-live="polite"
              aria-label={String(seconds).padStart(2, '0')}
            >
              {String(seconds).padStart(2, '0')}
            </span>
          </span>
        </div>
      </div>

      {/* 3. Smoke Level */}
      <div className="space-y-1.5 pt-1 border-t border-[#7D8995]/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#7D8995]">
            <Wind className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono-data tracking-wider uppercase font-semibold">Smoke</span>
          </div>
          <span className="text-xs font-mono-data font-semibold" style={{ color: smoke.color }}>
            {smoke.text}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#050608]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${smokeLevel * 100}%`,
              backgroundColor: smoke.color,
            }}
          />
        </div>
      </div>

      {/* 4. Visibility */}
      <div className="space-y-1.5 pt-1 border-t border-[#7D8995]/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#7D8995]">
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono-data tracking-wider uppercase font-semibold">Visibility</span>
          </div>
          <span className="text-xs font-mono-data font-semibold" style={{ color: vis.color }}>
            {vis.text}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#050608]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${visibility * 100}%`,
              backgroundColor: vis.color,
            }}
          />
        </div>
      </div>
    </div>
  );
};
