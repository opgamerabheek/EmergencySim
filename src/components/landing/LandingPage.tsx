import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import { HeroScene } from './HeroScene';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative bg-[#050608] text-white font-poppins overflow-hidden flex flex-col justify-between">
      {/* Full-screen autoplaying, looping video background at z-0 */}
      <HeroScene />

      {/* Two-Panel Layout floating above video at z-10 */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row p-4 lg:p-6 gap-6 min-h-screen w-full box-border">
        {/* LEFT PANEL (~52% width) */}
        <section className="w-full lg:w-[52%] relative flex flex-col justify-between p-8 lg:p-12 min-h-[640px] lg:min-h-0 liquid-glass-strong rounded-3xl">
          {/* TOP LEFT: Decorative four-circle/four-petal symbol */}
          <div className="flex items-center justify-between w-full">
            <div className="grid grid-cols-2 gap-1 w-6 h-6" title="EmergencySim Symbol">
              <div className="w-2.5 h-2.5 rounded-full bg-white/40 shadow-sm" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/60 shadow-sm" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/60 shadow-sm" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/40 shadow-sm" />
            </div>
            
            {/* Direct Scenario Access Button */}
            <button
              onClick={() => navigate('/scenarios')}
              className="text-xs font-mono-data text-white/60 hover:text-white transition-colors cursor-pointer py-1 px-3 rounded-full liquid-glass"
            >
              /scenarios
            </button>
          </div>

          {/* MAIN HERO CENTER */}
          <div className="flex flex-col items-center text-center my-auto py-8 space-y-6">
            {/* Main Heading: EmergencyHappen.. */}
            <h1 className="font-serif-accent italic text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-tight">
              EmergencyHappen..
            </h1>

            {/* Subheading: WHAT WOULD YOU do? */}
            <div className="text-xl sm:text-2xl font-light text-white/90 tracking-wider">
              <span className="uppercase tracking-widest font-normal">WHAT WOULD YOU</span>{' '}
              <span className="font-serif-accent italic lowercase">do?</span>
            </div>

            {/* Main CTA Button: Explore Now with Download icon */}
            <div className="pt-2">
              <button
                onClick={() => navigate('/scenarios')}
                className="liquid-glass-strong rounded-full px-7 py-3.5 inline-flex items-center gap-4 text-sm font-medium text-white hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer shadow-lg"
              >
                <span>Explore Now</span>
                <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>

            {/* Small Navigation Pills: Explore, Respond, Learn */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/simulation/fire')}
                className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                Explore
              </button>
              <button
                onClick={() => navigate('/simulation/fire')}
                className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                Respond
              </button>
              <button
                onClick={() => navigate('/results')}
                className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                Learn
              </button>
            </div>
          </div>

          {/* BOTTOM LEFT: Preparedness Text Block */}
          <div className="text-center pt-4">
            <div className="text-xs uppercase tracking-widest text-white/50 font-medium mb-1">
              EMERGENCY PREPAREDNESS
            </div>
            <p className="text-sm text-white/70 font-light">
              Know what to do before you need to.
            </p>
          </div>
        </section>

        {/* RIGHT PANEL (~48% width, desktop visible) */}
        <section className="hidden lg:flex lg:w-[48%] flex-col justify-between gap-6 relative">
          {/* TOP RIGHT INFORMATION CARD */}
          <div className="liquid-glass rounded-3xl p-6 max-w-md self-end w-full">
            <h3 className="font-display font-semibold text-lg text-white mb-2 tracking-wide">
              EmergencySIM
            </h3>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              EmergencySim is an interactive 3D emergency-preparedness simulator that teaches people how to recognize hazards and make safer decisions during emergencies.
            </p>
          </div>

          {/* BOTTOM RIGHT FEATURE PANEL */}
          <div className="liquid-glass-strong rounded-[2.5rem] p-6 flex flex-col gap-4 w-full mt-auto">
            {/* Top Row: Two side-by-side cards */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => navigate('/simulation/fire')}
                className="liquid-glass rounded-3xl p-6 text-center hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
              >
                <h4 className="font-display text-sm font-semibold text-white tracking-widest mb-1 group-hover:text-white/90">
                  EXPLORE
                </h4>
                <p className="text-xs text-white/60 font-light">
                  Understand your surroundings
                </p>
              </div>

              <div
                onClick={() => navigate('/simulation/fire')}
                className="liquid-glass rounded-3xl p-6 text-center hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
              >
                <h4 className="font-display text-sm font-semibold text-white tracking-widest mb-1 group-hover:text-white/90">
                  RESPOND
                </h4>
                <p className="text-xs text-white/60 font-light">
                  Make decisions under pressure
                </p>
              </div>
            </div>

            {/* Bottom Row: One full-width card */}
            <div
              onClick={() => navigate('/results')}
              className="liquid-glass rounded-3xl p-6 text-center hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
            >
              <h4 className="font-display text-sm font-semibold text-white tracking-widest mb-1 group-hover:text-white/90">
                LEARN
              </h4>
              <p className="text-xs text-white/60 font-light">
                See what your choices mean
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
