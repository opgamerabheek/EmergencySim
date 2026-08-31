import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '../../stores/useSimulationStore';
import { Header } from '../shared/Header';
import { Button } from '../shared/Button';
import { LESSON_CARDS } from '../../data/decisions';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  RotateCcw,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { elapsedTime, decisions, resetSimulation } = useSimulationStore();
  const [expandedDecisionId, setExpandedDecisionId] = useState<string | null>(null);

  // Calculate score summary
  const totalDecisions = Math.max(decisions.length, 4);
  const safeCount = decisions.filter((d) => d.isSafe).length;
  // Score display placeholder (e.g., 8/10 or safeCount/totalDecisions)
  const scoreDisplay = `${safeCount > 0 ? safeCount * 2 + 2 : 8}/10`;
  const percentage = Math.round(((safeCount > 0 ? safeCount * 2 + 2 : 8) / 10) * 100);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleRetry = () => {
    resetSimulation();
    navigate('/simulation/fire');
  };

  const handleHub = () => {
    resetSimulation();
    navigate('/scenarios');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-[#F1F4F6] relative">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-10 space-y-12">
        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3F4826]/15 border border-[#3F4826]/30 text-xs font-mono-data text-[#3F4826]">
            <Award className="w-3.5 h-3.5 text-[#F5B416]" />
            <span>Post-Simulation Educational Reflection</span>
          </div>
          <h1 className="font-display font-black text-3xl md:text-5xl text-[#F1F4F6]">
            YOUR <span className="text-gradient-cyan">RESPONSE</span>
          </h1>
          <p className="text-sm font-mono-data text-[#7D8995]">Scenario: Apartment Fire</p>
        </div>

        {/* Top Summary Card */}
        <div className="glass-panel-elevated rounded-2xl p-8 max-w-xl mx-auto text-center space-y-6 border border-[#3F4826]/30 shadow-2xl">
          <div className="text-xs font-mono-data uppercase tracking-widest text-[#7D8995]">
            Decisions Understood
          </div>

          {/* Score Readout (Placeholder format e.g. 8/10) */}
          <div className="font-display font-black text-6xl md:text-7xl text-[#F1F4F6]">
            {scoreDisplay}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-[#050608] overflow-hidden p-0.5 border border-[#7D8995]/20">
            <div
              className="h-full rounded-full bg-gradient-cyan transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="inline-block px-4 py-1.5 rounded-full bg-[#3F4826]/15 border border-[#3F4826]/40 text-[#3F4826] font-display font-semibold text-sm">
            Good Response
          </div>

          {/* Stats Row */}
          <div className="pt-4 border-t border-[#7D8995]/20 flex items-center justify-center gap-8 text-xs font-mono-data text-[#7D8995]">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3F4826]" /> Response Time: {formatTime(elapsedTime || 165)}
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#515C32]" /> Safety Awareness: High
            </span>
          </div>
        </div>

        {/* Decisions Timeline List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-2 border-b border-[#7D8995]/20">
            <h3 className="font-display font-bold text-xl text-[#F1F4F6]">YOUR DECISIONS</h3>
            <span className="text-xs font-mono-data text-[#7D8995]">
              {decisions.length > 0 ? decisions.length : 4} Recorded Actions
            </span>
          </div>

          {/* Timeline Entries */}
          {(decisions.length > 0
            ? decisions
            : [
                {
                  decisionId: 'decision_1',
                  selectedOptionId: 'opt_1_a',
                  optionLabel: 'Investigated alarm source',
                  isSafe: true,
                  timestamp: 10,
                  feedback: 'Good choice. Early awareness helps assess threat while maintaining an exit path.',
                },
                {
                  decisionId: 'decision_2',
                  selectedOptionId: 'opt_2_a',
                  optionLabel: 'Closed kitchen door and evacuated',
                  isSafe: true,
                  timestamp: 35,
                  feedback: 'Closing interior doors isolates oxygen supply and slows thermal spread.',
                },
                {
                  decisionId: 'decision_3',
                  selectedOptionId: 'opt_3_b',
                  optionLabel: 'Opened door immediately without checking heat',
                  isSafe: false,
                  timestamp: 90,
                  feedback: 'Always feel doors for heat before opening to avoid dangerous heat or fire conditions.',
                },
                {
                  decisionId: 'decision_4',
                  selectedOptionId: 'opt_4_a',
                  optionLabel: 'Used Emergency Stairs exit',
                  isSafe: true,
                  timestamp: 165,
                  feedback: 'Emergency stairwells are fire-rated enclosures and the primary safe route.',
                },
              ]
          ).map((item, idx) => (
            <div
              key={idx}
              className={`p-4 md:p-5 rounded-xl border transition-all ${
                item.isSafe
                  ? 'bg-[#10161D]/90 border-l-4 border-l-[#3F4826] border-[#7D8995]/20'
                  : 'bg-[#10161D]/90 border-l-4 border-l-[#F5B416] border-[#7D8995]/20'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {item.isSafe ? (
                    <CheckCircle2 className="w-5 h-5 text-[#3F4826] shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#F5B416] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-semibold text-sm text-[#F1F4F6]">{item.optionLabel}</h4>
                    <p className="text-xs text-[#7D8995] mt-1 leading-relaxed">{item.feedback}</p>
                  </div>
                </div>

                {!item.isSafe && (
                  <button
                    onClick={() =>
                      setExpandedDecisionId(
                        expandedDecisionId === item.decisionId ? null : item.decisionId
                      )
                    }
                    className="text-xs font-mono-data text-[#F5B416] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    LEARN WHY {expandedDecisionId === item.decisionId ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                )}
              </div>

              {expandedDecisionId === item.decisionId && (
                <div className="mt-3 p-3 rounded-lg bg-[#050608]/60 border border-[#F5B416]/30 text-xs text-[#7D8995] leading-relaxed">
                  Opening a hot door without checking handle or frame temperature exposes occupants to thermal burns or smoke plumes. Always touch doors with the back of your hand first.
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key Educational Takeaway Cards */}
        <div className="space-y-6 max-w-4xl mx-auto pt-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#515C32]" />
            <h3 className="font-display font-bold text-xl text-[#F1F4F6]">
              KEY LESSON TAKEAWAYS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {LESSON_CARDS.map((lesson) => (
              <div
                key={lesson.id}
                className="glass-panel p-5 rounded-xl border border-[#3F4826]/20 flex flex-col justify-between space-y-3"
              >
                <div className="text-[10px] font-mono-data text-[#3F4826] uppercase tracking-wider">
                  {lesson.category}
                </div>
                <h4 className="font-display font-bold text-base text-[#F1F4F6]">{lesson.title}</h4>
                <p className="text-xs text-[#7D8995] leading-relaxed">{lesson.takeaway}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 pb-12">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleRetry}
            icon={<RotateCcw className="w-5 h-5 text-[#3F4826]" />}
          >
            TRY ANOTHER APPROACH
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={handleHub}
            icon={<LayoutGrid className="w-5 h-5" />}
          >
            SCENARIO HUB
          </Button>
        </div>
      </main>

      <footer className="w-full bg-[#0B1016] border-t border-[#7D8995]/15 py-6 px-4 text-center text-xs text-[#7D8995]">
        EmergencySim &copy; 2026 — Educational Safety Reflection Module.
      </footer>
    </div>
  );
};
