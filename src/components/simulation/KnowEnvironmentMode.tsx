import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../shared/Button';

interface KnowEnvironmentModeProps {
  onStartSimulation: () => void;
  selectedRoom: string;
  onSelectRoom: (room: string) => void;
}

export const KnowEnvironmentMode: React.FC<KnowEnvironmentModeProps> = ({
  onStartSimulation,
  selectedRoom,
  onSelectRoom,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-5 max-w-4xl mx-auto">
      {/* Top Educational Banner */}
      <div className="glass-panel-elevated rounded-2xl p-6 sm:p-7 md:p-8 w-full border border-[#3F4826]/30 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 animate-fade-in">
        <div className="space-y-2.5 text-left flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3F4826]/15 border border-[#3F4826]/30 text-xs font-mono-data text-[#3F4826]">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B416]" />
            <span>Pre-Simulation Exploration</span>
          </div>
          <h2 className="font-display font-bold text-xl md:text-2xl text-[#F1F4F6] tracking-tight">
            KNOW YOUR ENVIRONMENT
          </h2>
          <p className="text-xs sm:text-sm text-[#7D8995] leading-relaxed font-light">
            Explore the 3D apartment layout before the emergency begins. Click safety hotspots to learn exit routes, detector locations, and safety equipment.
          </p>
        </div>

        <div className="shrink-0 flex items-center justify-start md:justify-end">
          <div className="group relative">
            <div
              id="start-simulation-tooltip"
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded-xl border border-[#A9C46C]/30 bg-[#18210F]/95 px-3 py-2 text-center opacity-0 shadow-lg shadow-[#3F4826]/20 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
            >
              <div className="-rotate-2 animate-bounce text-2xl font-black text-[#A9C46C]">Get Ready!</div>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={onStartSimulation}
              icon={<ArrowRight className="w-5 h-5" />}
              className="shadow-lg shadow-[#3F4826]/20 h-12 px-6"
              aria-describedby="start-simulation-tooltip"
            >
              START SIMULATION
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};
