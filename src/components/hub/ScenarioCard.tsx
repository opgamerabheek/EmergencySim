import React from 'react';
import { Lock, Clock, Award, ArrowRight, Flame, Waves, CloudLightning, Zap, School } from 'lucide-react';
import { ScenarioMeta } from '../../types/education';
import { Button } from '../shared/Button';

interface ScenarioCardProps {
  scenario: ScenarioMeta;
  onSelect: (id: string) => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onSelect }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'fire':
        return <Flame className="w-8 h-8 text-[#FF7043]" />;
      case 'flood':
        return <Waves className="w-8 h-8 text-[#3F4826]" />;
      case 'weather':
        return <CloudLightning className="w-8 h-8 text-[#F5B416]" />;
      case 'electrical':
        return <Zap className="w-8 h-8 text-[#F5B416]" />;
      case 'school':
        return <School className="w-8 h-8 text-[#515C32]" />;
      default:
        return <Flame className="w-8 h-8 text-[#FF7043]" />;
    }
  };

  if (scenario.isPlayable) {
    return (
      <div className="group relative rounded-2xl glass-panel-elevated border-2 border-[#556B2F] p-6 md:p-8 flex flex-col justify-between hover:border-[#515C32] transition-all duration-300 shadow-xl shadow-[#3F4826]/10 hover:shadow-[#3F4826]/25 hover:-translate-y-1">
        {/* Available Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-[#2A3518]/45 border border-[#A9C46C]/35 text-[#A9C46C] font-mono-data text-xs font-semibold tracking-wider">
            AVAILABLE
          </span>
          <div className="flex items-center gap-3 text-xs font-mono-data text-[#7D8995]">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#515C32]" /> {scenario.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#F5B416]" /> {scenario.duration}
            </span>
          </div>
        </div>

        {/* Thumbnail representation */}
        <div className="w-full h-44 rounded-xl bg-gradient-to-br from-[#18210F] via-[#10161D] to-[#FF7043]/20 relative overflow-hidden my-4 border border-[#556B2F]/40 flex items-center justify-center">
          <img
            src={scenario.image}
            alt={scenario.title}
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback styling if image fails
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10161D] via-transparent to-transparent" />
          <div className="absolute p-4 rounded-2xl bg-[#050608]/80 border border-[#FF7043]/40">
            {getIcon(scenario.id)}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3 my-2">
          <h3 className="font-display font-bold text-2xl text-[#F1F4F6] transition-colors">
            {scenario.title}
          </h3>
          <p className="text-sm text-[#7D8995] leading-relaxed">
            {scenario.description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full justify-between"
            onClick={() => onSelect(scenario.id)}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            START SCENARIO
          </Button>
        </div>
      </div>
    );
  }

  // Locked Card representation
  return (
    <div className="relative rounded-2xl bg-[#18210F]/85 border border-[#2A3518]/70 p-6 md:p-8 flex flex-col justify-between opacity-75 backdrop-blur-sm">
      {/* Locked Overlay Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full bg-[#10161D] border border-[#7D8995]/30 text-[#7D8995] font-mono-data text-xs font-medium tracking-wider flex items-center gap-1.5">
          <Lock className="w-3 h-3" /> COMING SOON
        </span>
        <span className="text-xs font-mono-data text-[#7D8995]/70">{scenario.difficulty}</span>
      </div>

      {/* Thumbnail placeholder */}
      <div className="w-full h-44 rounded-xl bg-[#050608] border border-[#7D8995]/15 relative overflow-hidden my-4 flex items-center justify-center">
        <div className="p-4 rounded-2xl bg-[#10161D]/80 border border-[#7D8995]/20 text-[#7D8995]/50">
          {getIcon(scenario.id)}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 my-2">
        <h3 className="font-display font-bold text-xl text-[#7D8995]">
          {scenario.title}
        </h3>
        <p className="text-sm text-[#7D8995]/70 leading-relaxed">
          {scenario.description}
        </p>
      </div>

      {/* Disabled CTA */}
      <div className="pt-4">
        <button
          disabled
          className="w-full py-3 px-6 rounded-xl bg-[#10161D] border border-[#7D8995]/20 text-[#7D8995]/50 font-display font-medium text-sm flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <Lock className="w-4 h-4" /> SCENARIO LOCKED
        </button>
      </div>
    </div>
  );
};
