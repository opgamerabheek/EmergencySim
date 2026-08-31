import React from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Info, MapPin } from 'lucide-react';
import { HotspotInfo } from '../../data/apartmentLayout';

interface ContextPanelProps {
  hotspot: HotspotInfo;
  onClose: () => void;
}

export const ContextPanel: React.FC<ContextPanelProps> = ({ hotspot, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="glass-panel-elevated rounded-2xl p-6 w-full max-w-md shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#3F4826]/15 border border-[#3F4826]/30">
            <ShieldCheck className="w-6 h-6 text-[#3F4826]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-[#F1F4F6]">{hotspot.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-[#7D8995] font-mono-data mt-0.5">
              <MapPin className="w-3 h-3" />
              {hotspot.positionLabel}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-[#050608]/50 text-[#7D8995] hover:text-[#F1F4F6] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-[#F1F4F6]/90 leading-relaxed mb-4">
        {hotspot.description}
      </p>

      {/* Importance */}
      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-[#050608]/40 border border-[#3F4826]/20">
        <Info className="w-4 h-4 text-[#515C32] shrink-0" />
        <span className="text-xs font-medium text-[#515C32]">{hotspot.importance}</span>
      </div>

      {/* Safety Tip */}
      <div className="p-4 rounded-xl bg-[#050608]/60 border border-[#F5B416]/20">
        <div className="text-[10px] font-mono-data tracking-wider uppercase text-[#F5B416] mb-2">
          Safety Guidance
        </div>
        <p className="text-xs text-[#7D8995] leading-relaxed">
          {hotspot.safetyTip}
        </p>
      </div>
    </motion.div>
  );
};
