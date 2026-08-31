import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../shared/Header';
import { ScenarioCard } from './ScenarioCard';
import { SCENARIOS } from '../../data/scenarios';
import { Sparkles, ShieldAlert, Home } from 'lucide-react';
import ReflectBackground from '@/components/originkit/ui/reflect-background';
import FluidText from '@/components/originkit/ui/fluid-text-custom-style';

export const ScenarioHub: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectScenario = (id: string) => {
    if (id === 'fire') {
      navigate('/simulation/fire');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-white font-quicksand relative overflow-hidden">
      {/* Reflect Background Layer - Behind all UI */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <ReflectBackground
          tint="#00E676"
          speed={30}
          scale={1.2}
          contrast={6}
          iterations={4}
          blur={8}
          opacity={25}
          animation={true}
          pointerStrength={20}
          backgroundColor="#050608"
        />
      </div>

      {/* Existing UI Content - Above reflect background */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Header />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-10 flex flex-col justify-between">
        {/* Top Navigation: Green-tinted Glass Home Button */}
        <div className="mb-6 flex items-center justify-start">
          <button
            onClick={() => navigate('/')}
            style={{ backgroundColor: 'rgba(50, 180, 100, 0.12)' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00E676]/30 backdrop-blur-md text-xs sm:text-sm font-medium text-white shadow-lg shadow-[#00E676]/10 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
            title="Return to EmergencySIM Home"
          >
            <Home className="w-4 h-4 text-white" />
            <span>Home</span>
          </button>
        </div>

        {/* Page Title Header */}
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass border border-white/10 text-xs font-mono-data text-white/70">
            <Sparkles className="w-3.5 h-3.5 text-white/80" />
            <span>Interactive Scenario Selection</span>
          </div>
          <div
            className="w-full h-12 md:h-[60px] overflow-hidden"
            role="heading"
            aria-level={1}
            aria-label="Choose Your Scenario"
          >
            <FluidText
              text="CHOOSE YOUR SCENARIO"
              font={{
                fontFamily: 'Quicksand',
                fontWeight: 500,
                fontSize: '48px',
                lineHeight: '1.25em',
                letterSpacing: '-0.025em',
                textAlign: 'left',
              }}
              color="#F1F4F6"
              paletteColors={["#F1F4F6"]}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <p className="text-base md:text-lg text-white/60 max-w-2xl font-light">
            Select a simulation scenario below to enter the interactive 3D training environment. Practice decision-making under spatial constraints.
          </p>
        </div>

        {/* Scenarios Grid (Available + Locked cards matching Reference 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SCENARIOS.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onSelect={handleSelectScenario}
            />
          ))}
        </div>

        {/* Bottom Educational Banner */}
        <div className="liquid-glass rounded-2xl p-6 md:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/80">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-display font-medium text-lg text-white">
                Non-Punitive Learning Philosophy
              </h4>
              <p className="text-sm text-white/60 max-w-xl font-light">
                Wrong choices are treated as constructive learning opportunities. You will never encounter "GAME OVER" or death screens.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono-data text-white/50 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            FEMA / Red Cross Sourced Guidelines
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#050608]/80 backdrop-blur-md border-t border-white/10 py-6 px-4 md:px-8 text-center text-xs text-white/50 font-light">
        EmergencySim &copy; 2026 — Base MVP Build. All scenarios backed by public safety standards.
      </footer>
      </div>
    </div>
  );
};
