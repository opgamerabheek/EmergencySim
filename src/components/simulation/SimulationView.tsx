import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '../../stores/useSimulationStore';
import { SimulationPhase } from '../../types/simulation';
import { HOTSPOTS } from '../../data/apartmentLayout';
import { DECISION_POINTS } from '../../data/decisions';
import { NavigationPanel } from './NavigationPanel';
import { StatusIndicators } from './StatusIndicators';
import { KnowEnvironmentMode } from './KnowEnvironmentMode';
import { DecisionModal } from './DecisionModal';
import { ContextPanel } from './ContextPanel';
import { PhoneCallUI } from './PhoneCallUI';
import { AlertTriangle, ArrowLeft, CheckCircle2, Flame, MapPin, Play } from 'lucide-react';
import Pixelcard from '@/components/originkit/ui/pixelcard';

export const SimulationView: React.FC = () => {
  const navigate = useNavigate();
  const [timeoutOpen, setTimeoutOpen] = useState(false);
  const [phoneSuccessVisible, setPhoneSuccessVisible] = useState(false);

  // Zustand State
  const {
    phase,
    elapsedTime,
    smokeLevel,
    visibility,
    selectedRoom,
    activeHotspotPanel,
    activeDecisionModalId,
    phoneCallActive,
    phoneCallCompleted,
    setPhase,
    setSelectedRoom,
    setActiveHotspotPanel,
    setActiveDecisionModalId,
    openPhoneCallUI,
    closePhoneCallUI,
    recordDecision,
    tickTimer,
    resetSimulation,
  } = useSimulationStore();

  // Local room camera visual representation
  const roomNames: Record<string, string> = {
    overview: 'Full Apartment Overview',
    living: 'Living Room',
    kitchen: 'Kitchen (Stove & Pantry)',
    bedroom: 'Bedroom',
    bathroom: 'Bathroom',
    hallway: 'Hallway & Emergency Exit Corridor',
  };

  const roomImages: Record<string, string> = {
    overview: '/assets/rooms/overview.jpg',
    living: '/assets/rooms/living-room.jpg',
    kitchen: '/assets/rooms/kitchen.jpg',
    bedroom: '/assets/rooms/bedroom.jpg',
    bathroom: '/assets/rooms/bathroom.jpg',
    hallway: '/assets/rooms/hallway.jpg',
  };

  // Timer interval during non-explore phase
  useEffect(() => {
    if (phase === SimulationPhase.EXPLORE || phase === SimulationPhase.COMPLETED || timeoutOpen) return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, tickTimer, timeoutOpen]);

  useEffect(() => {
    if (elapsedTime >= 180 && phase !== SimulationPhase.EXPLORE && phase !== SimulationPhase.COMPLETED) {
      setTimeoutOpen(true);
    }
  }, [elapsedTime, phase]);

  useEffect(() => {
    if (!phoneCallCompleted) return;

    setPhoneSuccessVisible(true);
    const dismissTimer = window.setTimeout(() => setPhoneSuccessVisible(false), 5000);
    return () => window.clearTimeout(dismissTimer);
  }, [phoneCallCompleted]);

  useEffect(() => {
    if (!timeoutOpen) return;

    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.62);
    gain.connect(audioContext.destination);

    const playTone = (frequency: number, startOffset: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startOffset);
      oscillator.connect(gain);
      oscillator.start(audioContext.currentTime + startOffset);
      oscillator.stop(audioContext.currentTime + startOffset + duration);
    };

    void audioContext.resume().then(() => {
      playTone(660, 0, 0.18);
      playTone(520, 0.25, 0.25);
    }).catch(() => {
      void audioContext.close();
    });

    return () => {
      void audioContext.close();
    };
  }, [timeoutOpen]);

  const handleRestartAfterTimeout = () => {
    setTimeoutOpen(false);
    resetSimulation();
  };

  const handleReturnHomeAfterTimeout = () => {
    setTimeoutOpen(false);
    resetSimulation();
    navigate('/');
  };

  // Handle Hotspot Click
  const handleHotspotClick = (id: string) => {
    if (id === 'phone') {
      openPhoneCallUI();
    } else {
      setActiveHotspotPanel(id);
    }
  };

  // Start Simulation from Explore Mode
  const handleStartSimulation = () => {
    setPhase(SimulationPhase.DETECTION);
  };

  // Advance simulation phase manually for testing/demo progression
  const handleNextPhase = () => {
    switch (phase) {
      case SimulationPhase.DETECTION:
        setPhase(SimulationPhase.SMALL_FIRE);
        break;
      case SimulationPhase.SMALL_FIRE:
        setPhase(SimulationPhase.GROWING);
        break;
      case SimulationPhase.GROWING:
        setPhase(SimulationPhase.CRITICAL);
        break;
      case SimulationPhase.CRITICAL:
        setPhase(SimulationPhase.COMPLETED);
        navigate('/results');
        break;
      default:
        break;
    }
  };

  // Active Hotspot data
  const currentHotspot = HOTSPOTS.find((h) => h.id === activeHotspotPanel);

  // Active Decision Point data
  const currentDecision = DECISION_POINTS.find((d) => d.id === activeDecisionModalId);

  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-[#F1F4F6] relative overflow-hidden select-none">
      {/* 1. TOP HEADER (Spacious, clean, non-competing) */}
      <header className="z-30 h-20 bg-[#0B1016]/90 border-b border-[#3F4826]/20 px-6 md:px-10 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              if (window.confirm('Leave simulation? Current progress will be lost.')) {
                resetSimulation();
                navigate('/scenarios');
              }
            }}
            className="flex items-center gap-2 text-xs font-mono-data text-[#7D8995] hover:text-white px-3.5 py-2 rounded-xl bg-[#10161D] border border-[#7D8995]/20 hover:border-[#3F4826]/40 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit to Hub
          </button>
          <div className="h-4 w-px bg-[#7D8995]/20 hidden md:block" />
          <span className="text-xs font-mono-data text-[#7D8995] hidden md:inline">
            Scenario: <strong className="text-white font-medium">Apartment Fire</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {phase !== SimulationPhase.EXPLORE && phase !== SimulationPhase.COMPLETED && (
            <button
              onClick={handleNextPhase}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#10161D] border border-[#515C32]/40 text-xs font-mono-data text-[#515C32] hover:bg-[#515C32]/10 transition-colors cursor-pointer"
              title="Advance emergency progression"
            >
              <Play className="w-3.5 h-3.5" /> Next Phase
            </button>
          )}

          <div className="text-xs font-mono-data px-4 py-1.5 rounded-full bg-[#10161D] border border-[#3F4826]/30 text-[#3F4826] font-semibold">
            {roomNames[selectedRoom] || selectedRoom}
          </div>
        </div>
      </header>

      {/* 2. MAIN VIEWPORT & OVERVIEW AREA */}
      <main className="flex-1 relative w-full h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden p-6 md:p-10">
        {phoneSuccessVisible && (
          <div
            role="alert"
            className="fixed right-4 top-24 z-[60] flex w-[min(22rem,calc(100%-2rem))] items-center gap-3 rounded-xl border border-[#A9C46C]/40 bg-[#2A3518]/95 px-4 py-3 text-sm text-[#D4E7A3] shadow-2xl shadow-black/40 backdrop-blur-md"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#A9C46C]" />
            <span>Good Job! A call can save your life in unexpected ways</span>
          </div>
        )}

        {timeoutOpen && (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#050608]/85 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="simulation-timeout-title"
          >
            <div className="w-full max-w-md rounded-3xl border border-[#FF7043]/40 bg-[#0B1016]/95 p-7 text-center shadow-2xl shadow-black/50">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FF7043]/40 bg-[#FF7043]/10 text-[#FF7043]">
                <AlertTriangle className="h-7 w-7 animate-pulse" />
              </div>
              <h2 id="simulation-timeout-title" className="font-display text-xl font-bold tracking-wide text-[#F1F4F6]">
                TIME LIMIT REACHED
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#7D8995]">
                It is dangerous to be that long in such situations. Better improve your reaction time!
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={handleRestartAfterTimeout}
                  className="rounded-xl border border-[#515C32] bg-[#3F4826] px-5 py-3 font-mono-data text-xs font-semibold text-white transition-colors hover:bg-[#515C32]"
                >
                  RESTART SIMULATION
                </button>
                <button
                  type="button"
                  onClick={handleReturnHomeAfterTimeout}
                  className="rounded-xl border border-[#7D8995]/30 bg-[#10161D] px-5 py-3 font-mono-data text-xs font-semibold text-[#F1F4F6] transition-colors hover:border-[#7D8995]/60"
                >
                  RETURN TO HOME
                </button>
              </div>
            </div>
          </div>
        )}
        {phase !== SimulationPhase.EXPLORE && phase !== SimulationPhase.COMPLETED && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 max-w-[calc(100%-2rem)] rounded-full border border-[#F5B416]/25 bg-[#10161D]/90 px-3.5 py-1.5 text-center text-[10px] sm:text-xs font-mono-data text-[#F5B416] shadow-lg shadow-[#F5B416]/10 backdrop-blur-md motion-safe:animate-[instruction-pulse_3.5s_ease-in-out_infinite]"
            aria-live="polite"
          >
            "Click the “Next Phase” button above to continue to the next questionnaire and discover more information!"
          </div>
        )}

        {/* SimulationViewport Container */}
        <div
          id="simulation-3d-viewport"
          className="absolute inset-0 w-full h-full bg-radial from-[#10161D] via-[#0B1016] to-[#050608] flex items-center justify-center transition-all duration-700"
        >
          {/* Environmental Fog/Smoke Effect Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              backgroundColor: phase === SimulationPhase.CRITICAL ? 'rgba(255,112,67,0.15)' : 'transparent',
              backdropFilter: `blur(${smokeLevel * 8}px)`,
              opacity: smokeLevel,
            }}
          />

          {/* Central 3D Viewing Container */}
          <div className="relative w-[92%] max-w-5xl h-[72%] rounded-3xl border border-[#3F4826]/20 bg-[#0B1016]/80 flex flex-col items-center justify-center p-8 text-center shadow-2xl overflow-hidden">
            {/* Blurred room reference image changes with the room navigation tabs */}
            <img
              key={selectedRoom}
              src={roomImages[selectedRoom] || roomImages.overview}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 z-0 h-full w-full scale-105 object-cover blur-md opacity-25 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 z-[1] bg-[#050608]/55 pointer-events-none" />

            {/* Pixelcard Background Effect (Active simulation only) */}
            {phase !== SimulationPhase.EXPLORE && (
              <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Pixelcard
                  colors={['#FF7043', '#F5B416', '#3F4826']}
                  gap={8}
                  speed={1.5}
                  pixelSize={2}
                  appearFrom="middle"
                  backgroundColor="transparent"
                  borderWidth={0}
                  radius={24}
                  padding={0}
                />
              </div>
            )}

            {/* Stove Fire Active Badge */}
            {(phase === SimulationPhase.SMALL_FIRE ||
              phase === SimulationPhase.GROWING ||
              phase === SimulationPhase.CRITICAL) && (
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                <div className="w-20 h-20 rounded-full bg-[#FF7043]/30 blur-lg animate-ping" />
                <div className="p-3.5 px-5 rounded-2xl bg-[#050608]/90 border border-[#FF7043] text-[#FF7043] shadow-2xl flex items-center gap-2.5 animate-bounce">
                  <Flame className="w-6 h-6" />
                  <span className="font-display font-bold text-xs tracking-wider uppercase">STOVE FIRE ACTIVE</span>
                </div>
              </div>
            )}

            {/* Central Heading & Description */}
            <div className="space-y-3 max-w-lg relative z-10 my-auto">
              <div className="text-[11px] font-mono-data text-[#3F4826] uppercase tracking-widest font-semibold">
                3D Simulation Viewport
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#F1F4F6] tracking-tight">
                {roomNames[selectedRoom]}
              </h3>
              <p className="text-xs sm:text-sm text-[#7D8995] leading-relaxed font-light max-w-md mx-auto pt-1">
                Use the room navigation panel on the left to change camera viewpoints. Click safety hotspots below to inspect equipment and exits.
              </p>
            </div>

            {/* Bottom Hotspot Controls Row */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-3 z-10 w-full px-6 max-w-3xl">
              {HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => handleHotspotClick(spot.id)}
                  className="h-10 px-4 rounded-xl bg-[#050608]/90 border border-[#3F4826]/40 text-xs font-medium text-[#F1F4F6] hover:border-[#3F4826] hover:scale-105 hover:bg-[#3F4826]/20 transition-all cursor-pointer shadow-lg flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#515C32] animate-pulse" />
                  <span>{spot.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top Overlay: Know Environment Mode Banner (if phase === EXPLORE) */}
        {phase === SimulationPhase.EXPLORE && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-full px-4 max-w-4xl">
            <KnowEnvironmentMode
              onStartSimulation={handleStartSimulation}
              selectedRoom={selectedRoom}
              onSelectRoom={setSelectedRoom}
            />
          </div>
        )}

        {/* Left Side: Room Navigation Panel */}
        <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
          <NavigationPanel selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
        </div>

        {/* Right Side: Status Indicators HUD */}
        <div className="absolute right-6 md:right-8 top-6 z-20 hidden sm:block">
          <StatusIndicators
            elapsedTime={elapsedTime}
            smokeLevel={smokeLevel}
            visibility={visibility}
            phase={phase}
          />
        </div>

        {/* Context Panel Modal (If Hotspot inspected) */}
        {currentHotspot && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <ContextPanel
              hotspot={currentHotspot}
              onClose={() => setActiveHotspotPanel(null)}
            />
          </div>
        )}

        {/* Decision Modal (If triggered by phase) */}
        {currentDecision && (
          <DecisionModal
            decision={currentDecision}
            onDecisionMade={(option) => {
              recordDecision({
                decisionId: currentDecision.id,
                selectedOptionId: option.id,
                optionLabel: option.label,
                isSafe: option.isSafe,
                timestamp: elapsedTime,
                feedback: option.feedback,
              });
              setActiveDecisionModalId(null);
            }}
          />
        )}

        {/* Phone Call Simulated UI Overlay */}
        {phoneCallActive && (
          <PhoneCallUI onClose={(completed) => closePhoneCallUI(completed)} />
        )}
      </main>
    </div>
  );
};
