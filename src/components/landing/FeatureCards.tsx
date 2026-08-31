import React from 'react';
import { Box, ShieldCheck, MapPin } from 'lucide-react';
import { Card } from '../shared/Card';

export const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: <Box className="w-8 h-8 text-[#3F4826]" />,
      title: 'Interactive 3D Learning',
      description: 'Explore realistic environments. See how emergency conditions unfold spatially.',
      badge: 'EXPLORE',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#F5B416]" />,
      title: 'Decision-Based Learning',
      description: 'Make real safety choices in context. Understand consequences without danger.',
      badge: 'RESPOND',
    },
    {
      icon: <MapPin className="w-8 h-8 text-[#515C32]" />,
      title: 'Spatial Awareness',
      description: 'Build mental maps of layouts. Know WHERE exits and equipment are located.',
      badge: 'LEARN',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
      {features.map((feature, idx) => (
        <Card
          key={idx}
          variant="glass"
          className="hover:border-[#3F4826]/40 hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-[#050608]/60 border border-[#7D8995]/20 group-hover:border-[#3F4826]/30 transition-colors">
              {feature.icon}
            </div>
            <span className="text-[10px] font-mono-data tracking-widest px-2 py-1 rounded bg-[#050608]/70 border border-[#7D8995]/20 text-[#7D8995]">
              {feature.badge}
            </span>
          </div>
          <h3 className="font-display font-bold text-lg text-[#F1F4F6] mb-2 group-hover:text-[#3F4826] transition-colors">
            {feature.title}
          </h3>
          <p className="text-sm text-[#7D8995] leading-relaxed">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  );
};
