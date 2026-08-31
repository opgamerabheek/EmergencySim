import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, User, Settings, HelpCircle, X, Volume2, Eye } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [volume, setVolume] = useState(80);
  const [highContrast, setHighContrast] = useState(false);

  const isSim = location.pathname.startsWith('/simulation');

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-20 bg-[#0B1016]/90 backdrop-blur-md border-b border-[#3F4826]/15 px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">

          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-wider text-[#F1F4F6]">
              EMERGENCY<span className="text-[#3F4826]">SIM</span>
            </span>

          </div>
        </Link>

        {/* Navigation Links */}
        {!isSim && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/scenarios"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/scenarios'
                  ? 'text-[#3F4826] font-semibold'
                  : 'text-[#7D8995] hover:text-[#F1F4F6]'
              }`}
            >
              Scenarios
            </Link>

            {/* Tier 3 Navigation (Disabled / Future functionality badge) */}
            <div className="relative group cursor-not-allowed">
              <span className="text-sm font-medium text-[#7D8995]/50 flex items-center gap-1.5">
                Academy
                <span className="text-[9px] font-mono-data px-1.5 py-0.5 rounded bg-[#10161D] text-[#7D8995]/70 border border-[#7D8995]/20">
                  TIER 3
                </span>
              </span>
            </div>
          </nav>
        )}

        {/* Controls & Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSettingsOpen(true)}
            className="w-10 h-10 rounded-lg bg-[#10161D] border border-[#7D8995]/20 flex items-center justify-center text-[#7D8995] hover:text-[#F1F4F6] hover:border-[#3F4826]/40 transition-all cursor-pointer"
            title="Settings & Accessibility"
          >
            <Settings className="w-5 h-5" />
          </button>

          <div
            className="w-10 h-10 rounded-lg bg-[#10161D] border border-[#7D8995]/20 flex items-center justify-center text-[#7D8995]/40 cursor-not-allowed relative"
            title="Profile (Tier 3 Future Feature)"
          >
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Basic Settings Drawer / Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-full max-w-md glass-panel-elevated rounded-xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#7D8995]/20">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#3F4826]" />
                <h3 className="font-display font-bold text-lg text-[#F1F4F6]">Quick Settings</h3>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="text-[#7D8995] hover:text-[#F1F4F6] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {/* Audio Volume */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#F1F4F6] flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#3F4826]" /> Master Audio
                  </span>
                  <span className="font-mono-data text-[#7D8995]">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-[#3F4826] bg-[#050608] h-2 rounded cursor-pointer"
                />
              </div>

              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between py-2 border-t border-[#7D8995]/15">
                <span className="text-sm text-[#F1F4F6] flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#515C32]" /> High Contrast UI
                </span>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    highContrast ? 'bg-[#3F4826]' : 'bg-[#10161D] border border-[#7D8995]/30'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      highContrast ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3 rounded-lg bg-[#050608]/60 border border-[#7D8995]/20 text-xs text-[#7D8995] font-mono-data">
                Tier 1 Scope: Settings provide basic audio and visual controls.
              </div>
            </div>

            <button
              onClick={() => setSettingsOpen(false)}
              className="w-full py-2.5 rounded-lg bg-gradient-cyan text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
